'use strict';

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
                    const remStatus = () => statusMessage.textContent = '';
                    setTimeout(() => {
                        remStatus();
                    }, 2500);
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

export default sendForm;