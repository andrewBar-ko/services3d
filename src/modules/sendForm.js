// eslint-disable-next-line strict
'use strict';

const sendForm = () => {
    const errorMessage = "Что-то пошло нет...",
        loadMessage = "Загрузка...",
        successMessage = "Спасибо!Мы с вами свяжемся! ";

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem; color: white";

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'

    });

    document.addEventListener('submit', e => {

        e.preventDefault();
        const target = e.target;

        target.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(target);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });

        const clearInputsForms = target => {
            const targetFormInputs = target.querySelectorAll('input');
            targetFormInputs.forEach(item => {
                item.value = '';
            });
        };

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

    });

    // Validator
    const isValidate = () => {
        document.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('[name="user_name"]')) {
                target.value = target.value.replace(/[^а-яА-ЯёЁ\s]/, '');
            }

            if (target.matches('[name="user_email"]')) {
                if (/^[\w-\\.]+@[\w-]+\.[a-z]{2,4}$/i.test(target.value)) {
                    target.setCustomValidity('');
                } else {
                    target.setCustomValidity('Введите значение в формате myemail@mail.ru');
                }
            }

            if (target.matches('[name="user_message"]')) {
                target.value = target.value.replace(/[^а-яА-ЯёЁ,.!?\s]/, '');
            }

            if (target.matches('[name="user_phone"]')) {
                target.value = target.value.replace(/[^\\+?[0-9]/i, '');
                if (/^\+?[78][0-9]{10}$/.test(target.value) ||
                /^\+?[378][0-9]{11}$/.test(target.value)) {
                    target.setCustomValidity('');
                } else {
                    target.setCustomValidity('Введите значение в формате +79273335544 или 89273335544');
                }
            }
        });
    };
    isValidate();

    document.body.addEventListener('input', isValidate);
};

export default sendForm;
