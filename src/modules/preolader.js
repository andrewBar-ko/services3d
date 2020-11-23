// eslint-disable-next-line strict
'use strict';

const preoladerForm = () => {
    const preloader = document.querySelector('#page-preloader'),
        spinner = document.querySelector('.cssload-box-loading');

    setTimeout(() => {
        preloader.style.display = 'none';
        spinner.style.display = 'none';
    }, 500);

};

export default preoladerForm;
