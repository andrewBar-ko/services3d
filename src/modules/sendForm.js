// eslint-disable-next-line strict
'use strict';

const sendForm = () => {
    const errorMessage = "Что-то пошло нет...",
        loadMessage = "Загрузка...",
        successMessage = "Спасибо!Мы с вами свяжемся! ";

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem; color: white";

    document.addEventListener('submit', e => {

        e.preventDefault();
        const target = e.target;

        const formData = new FormData(target);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });

        // eslint-disable-next-line no-use-before-define
        postData(body)

            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200!');
                }
                statusMessage.textContent = successMessage;
                // eslint-disable-next-line no-use-before-define
                clearInputsForms(target);
                const remStatus = () => statusMessage.textContent = '';
                setTimeout(() => {
                    remStatus();
                }, 2500);
            })
            .catch(error => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });

        const clearInputsForms = target => {
            const targetFormInputs = target.querySelectorAll('input');
            targetFormInputs.forEach(item => {
                item.value = '';
            });
        };

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
        const processForm = form => {

            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            // eslint-disable-next-line no-unused-vars
            form.addEventListener("submit", processForm);
            form.addEventListener('input', isValid);
        };

    });

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'

    });

};

export default sendForm;
