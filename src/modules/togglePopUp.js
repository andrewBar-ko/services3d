// eslint-disable-next-line strict
'use strict';

const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content'),
        inputForms = document.querySelectorAll('form>input'),
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
        inputForms.textContent.value = '';
    });
};

export default togglePopUp;
