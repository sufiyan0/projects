const firstCurrency = document.getElementById('currency-one');
const ammountOne = document.getElementById('amount-one');
const secondCurrency = document.getElementById('currency-two');
const ammountTwo = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rate = document.getElementById('rate');
const slass = document.querySelector('currencyT')



function calculate(){
    const  currencyOneCode = firstCurrency.value;
    const currencyTwoCode = secondCurrency.value;
    console.log(currencyOneCode);

    fetch(`https://v6.exchangerate-api.com/v6/74880aa99ce819a75abe767a/pair/${currencyOneCode}/${currencyTwoCode}`)
    .then(res => res.json())
    .then(data =>{ 
        const conversionRate = data.conversion_rate;
        rate.innerText = ` 1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode} `;
        ammountTwo.value= (ammountOne.value * conversionRate).toFixed(2);

    })
}

//events listner for currency change..
firstCurrency.addEventListener('change', calculate);
ammountOne.addEventListener('input', calculate);
secondCurrency.addEventListener('change', calculate);
ammountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const tamp = firstCurrency.value;
    firstCurrency.value = secondCurrency.value
    secondCurrency.value = tamp
    calculate();
})


