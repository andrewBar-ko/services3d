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

export default setCommandImg;