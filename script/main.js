/* eslint-disable no-use-before-define */
window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    // Таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const addZero = n => (n < 10 ? "0" + n : n);

        const getTimeRemaining = () => {

            const dateStop = new Date(deadline).getTime(),
                dateNew = new Date().getTime(),
                timeRemaining = (dateStop - dateNew) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };

        };

        const updateClock = () => {

            const timer = getTimeRemaining();

            const trueClock = (timeValue, timeSelector) => (timeValue <= 0 ?
                timeSelector.textContent = '00' :
                timeSelector.textContent = addZero(timeValue));

            trueClock(timer.hours, timerHours);
            trueClock(timer.minutes, timerMinutes);
            trueClock(timer.seconds, timerSeconds);


            if (timer.timeRemaining <= 0) {
                clearInterval(timeInterval);

            }

        };
        updateClock();
        // !!!!!!!!!!!!!!!
        const timeInterval = setInterval(updateClock, 1000);

    };
    countTimer('10 november 2020');

    // Меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li'),
            closeBtn = document.querySelector('.close-btn');
        // Открытие/закрытие меню с помощью добавления класса
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        // по мени
        btnMenu.addEventListener('click', handlerMenu);
        // по крестику
        closeBtn.addEventListener('click', handlerMenu);
        //при переходе в определенный блок
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

    };
    toggleMenu();

    // Модальное окно
    const togglePopup = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

    };
    togglePopup();
});
