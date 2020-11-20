// eslint-disable-next-line strict
'use strict';

const sendForm = () => {
    const errorMessage = "Что-то пошло нет...",
        loadMessage = "Загрузка...",
        successMessage = "Спасибо!Мы с вами свяжемся! ";

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem; color: white";

    const getForms = form => {
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

        const processForm = e => {
            const target = e.target;
            e.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
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

        const postData = body => fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'

        });
    };

    document.addEventListener('submit', item => getForms(item));

};

export default sendForm;
