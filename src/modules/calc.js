'use strict';
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

            if (totalValue.textContent !== total) {
                if (totalValue.textContent > total) {
                    push -= totalValue.textContent / 100; 
                }
            }

            const interval = setInterval(() => {

                totalValue.textContent = Math.ceil(+totalValue.textContent + push);
                if ((total - totalValue.textContent) * push < 1) {
                    clearInterval(interval);
                    totalValue.textContent = Math.round(total);
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

export default calc;