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

    // Меню
    const toggleMenu = () => {

        const handlerMenu = () => {

            const target = event.target;

            const displayMenu = () => {
                document.querySelector('menu').classList.toggle('active-menu');
            };

            if (target.closest('.menu') ||
				(!target.closest('menu') &&
					document.querySelector('menu').classList.contains('active-menu'))) {
                displayMenu();
            }
            if (target.closest('menu') && target.closest('[href^="#"]')) {
                displayMenu();
            }
        };

        document.body.addEventListener('click', handlerMenu);
    };

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
                if (window.innerWidth > 768) {
                    popupData.count = popupData.startPos;
                    requestAnimationFrame(showPopup);
                }
            });

        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    // // Скролл при click на href = '#';
    const smoothLinks = document.querySelectorAll('menu ul>li a, a[href="#service-block"]');

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

    // Tabs
    const tabs = () => {

        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {

            for (let i = 0; i < tabContent.length; i++) {

                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }

            }

        };

        tabHeader.addEventListener('click', event => {

            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });

    };

    // Slider id = portfolio
    const slider = () => {

        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide = currentSlide < slide.length - 1 ? currentSlide + 1 : 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (target.matches('.portfolio-btn, .dot')) {
                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');

                if (target.matches('#arrow-right')) {
                    currentSlide++;
                } else if (target.matches('#arrow-left')) {
                    currentSlide--;
                } else if (target.matches('.dot')) {
                    dot.forEach((elem, index) => {
                        if (elem === target) {
                            currentSlide = index;
                        }
                    });
                }

                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }
                if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            }
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();
    };

    countTimer('09 november 2020');
    toggleMenu();
    togglePopUp();
    tabs();
    slider();
});
