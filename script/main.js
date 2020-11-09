/* eslint-disable no-use-before-define */
window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    // Таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        let timeInterval = 0;

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
                clearInterval(this.timeInterval);
            }

        };
        updateClock();
        // eslint-disable-next-line no-unused-vars
        timeInterval = setInterval(updateClock, 1000);

    };
    countTimer('09 november 2020');

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
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            popupData = {
                count: -445,
                speed: 15,
                startPos: -445,
                endPos: 0
            };

        const showPopup = () => {

            if (popupData.startPos > popupData.endPos) {
                popupData.count -= popupData.speed;
            } else {
                popupData.count += popupData.speed;
            }

            popupContent.style.transform = `translateY(${popupData.count}px)`;

            if (popupData.startPos > popupData.endPos ?
                popupData.count > popupData.endPos :
                popupData.count < popupData.endPos) {
                requestAnimationFrame(showPopup);
            }
        };

        popupBtn.forEach(elem => {

            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width > 768) {
                    popupData.count = popupData.startPos;
                    requestAnimationFrame(showPopup);
                }
            });

        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();

    // Скролл при click на href = '#';
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    for (const smoothLink of smoothLinks) {

        smoothLink.addEventListener('click', e => {

            e.preventDefault();

            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });
    }

});
