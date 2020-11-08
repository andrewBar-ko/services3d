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
                // Для отображения дней нужно - hours = Math.floor() % 24;
                // Потом прописать:
                // days = Math.floor(timeRemaining / 60 / 60 / 24);

            return { timeRemaining, hours, minutes, seconds };

        };

        function updateClock() {

            const timer = getTimeRemaining();

            timerHours.textContent = `${addZero(timer.hours)}`;
            timerMinutes.textContent = `${addZero(timer.minutes)}`;
            timerSeconds.textContent = `${addZero(timer.seconds)}`;

            if (timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        }
        updateClock();
    };

    setInterval(countTimer, 1000, '10 november 2020');
});
