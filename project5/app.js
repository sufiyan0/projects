const addUser = document.getElementById('add');
const ddoubleMoney = document.getElementById('double');
const filter = document.getElementById('millinonaires');
const sort = document.getElementById('sort');
const totalWealth = document.getElementById('sum');
const main = document.getElementById('main');

let data = [];
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json();
    
    const user = data.results[0];
    // console.log(user);
    const newUser = {
        name: user.name.title + ' '+user.name.first + ' ' + user.name.last,
        balance: (Math.random()*1000000).toFixed(0)
    }
    addData(newUser)

    updateDom()
    
}

function addData(newUser){
    data.push(newUser);
}

function updateDom(newUser = data){
    main.innerHTML = ' <h2><strong>Users</strong> Wealth</h2>'
    newUser.forEach(user => {
        const newDiv= document.createElement('div');
        newDiv.classList.add('user');
        newDiv.innerHTML = `<strong>${ user.name}</strong> ${user.balance}`
        main.appendChild(newDiv)
    })
}


function doubleMoney(){
    data =  data.map(user => {
        return{ ...user , balance : user.balance * 2}
    })
    updateDom()
}

function filterwealth(){
    data =  data.filter(user => user.balance >= 1000000);
    updateDom()
}

function sorting(){
    data = data.sort((a,b) => a.balance - b.balance);
    updateDom();
}

function calculateWealth(){
    const balance = data.reduce((acc,user) => (acc += (+user.balance) ),0)
    const balanceElement = document.createElement('div');
    balanceElement.innerHTML = `<h3> Total Balance : ${balance}</h3>`;
    main.appendChild(balanceElement);
}

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();


addUser.addEventListener('click',getRandomUser);
ddoubleMoney.addEventListener('click',doubleMoney);
filter.addEventListener('click',filterwealth);
sort.addEventListener('click',sorting);
totalWealth.addEventListener('click',calculateWealth);