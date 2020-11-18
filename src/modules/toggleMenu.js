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

export default toggleMenu;
