'use strict';

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

export default countTimer;
