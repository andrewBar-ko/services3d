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

    // Preloader
    const preoladerForm = () => {
        const preloader = document.querySelector('#page-preloader'),
            spinner = document.querySelector('.cssload-box-loading');

        setTimeout(() => {
            preloader.style.display = 'none';
            spinner.style.display = 'none';
        }, 500);

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
                    document.body.style.overflowY = 'hidden';
                    requestAnimationFrame(showPopup);
                }
            });

        });

        popupClose.addEventListener('click', () => {
            document.body.style.overflowY = '';
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

    // Add dot
    const addDot = () => {

        const portfolioItem = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot);
        });

        portfolioDots.children[0].classList.add('dot-active');

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

    // Работа с img src
    const setCommandImg = () => {

        const commandRow = document.querySelector('#command .row');

        const mouseImg = e => {

            const target = e.target;

            if (target.classList.contains('command__photo')) {

                const lastSrc = target.src;

                target.src = target.dataset.img;
                target.dataset.img = lastSrc;

            }
        };

        commandRow.addEventListener('mouseover', mouseImg);
        commandRow.addEventListener('mouseout', mouseImg);

    };

    // Сalculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 10;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;


            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            }
            if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (!!typeValue && !!squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            const animeTotal = (elem, value) => {
                let push = value / 100;

                const interval = setInterval(() => {

                    if (+elem.textContent >= value) {
                        elem.textContent = value;
                        clearInterval(interval);
                    } else {
                        elem.textContent = Math.round(+elem.textContent + push);
                        push += elem.textContent / 100;
                    }

                }, 10);

                return Math.round(elem.textContent);
            };

            totalValue.textContent = animeTotal(totalValue, total);
        };

        calcBlock.addEventListener('input', e => {
            const target = e.target;

            if (target.matches('select') ||
            target.matches('input')) {
                countSum();
            }
        });
        // Enter Only Numbers!
        const enterOnlyNumbers = () => {

            calcBlock.addEventListener('input', e => {

                if (e.target.matches('.calc-square') ||
                e.target.matches('.calc-count') ||
                e.target.matches('.calc-day')) {
                    e.target.value = e.target.value.replace(/\D/g, '');
                }
            });
        };
        enterOnlyNumbers();

    };

    // Send AJAX Form
    const sendForm = () => {
        const errorMessage = "Что-то пошло нет...",
            loadMessage = "Загрузка...",
            successMessage = "Спасибо!Мы с вами свяжемся! ";

        const statusMessage = document.createElement("div");
        statusMessage.style.cssText = "font-size: 2rem; color: white";

        // Validator
        const isValid = e => {

            const target = e.target;

            if (target.matches('.form-phone')) {
                target.value = target.value.replace(/[^+\d]/g, '');
            }
            if (target.name === 'user_name') {
                target.value = target.value.replace(/[^а-яё ]/gi, '');
            }
            if (target.matches('.mess')) {
                target.value = target.value.replace(/[^а-яё ,.]/gi, '');
            }

        };
        //для каждой формы
        document.querySelectorAll("form").forEach(form => {

            const processForm = e => {

                e.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body)

                    .then(() => {
                        statusMessage.textContent = successMessage;
                        form.querySelectorAll("input").forEach(item => item.value = "");
                        // const remStatus = () => statusMessage.textContent = '';
                        // setInterval(remStatus, 2500);
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });

            };

            form.addEventListener("submit", processForm);
            form.addEventListener('input', isValid);
        });

        const postData = body => new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) {
                    return;
                }

                if (request.readyState !== 200) {
                    resolve();
                } else {
                    reject(request.status);
                }
            });

            // Настройка запроса, метод POST к файлу php
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        });

    };

    countTimer('09 november 2020');
    toggleMenu();
    togglePopUp();
    tabs();
    addDot();
    setCommandImg();
    calc(100);
    sendForm();
    slider();
    preoladerForm();

});
