// DOM elements 
const main = document.getElementById('main');
const addUser = document.getElementById('add');
const doubleMoney= document.getElementById('double');
const millinonaires = document.getElementById('millinonaires');
const sort = document.getElementById('sort');
const Total = document.getElementById('sum');

let data = [];


async function getRandomUser(){
    const res =await  fetch('https://randomuser.me/api/')
    const data = await res.json();
    const user = data.results[0];
    
    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance : parseInt((Math.random()*1000000))

    };
    addData(newUser);

    updateDom();
}

function addData(newUser){
    data.push(newUser)
}

function updateDom(newUser = data){
    main.innerHTML = `<h2><strong>Users</strong> Wealth</h2>`;
    newUser.forEach(user => {

        const newdiv = document.createElement('div');
        newdiv.classList.add('user');
        newdiv.innerHTML = `<strong>${user.name}</strong> ${user.balance}`
        main.appendChild(newdiv);
    })
}
// console.log(data)

// function to multiply balance by 2;
function doubleWealth(){
    data = data.map(user => {
        return {...user , balance : user.balance * 2 };
    })
    updateDom()
}  

function filter(){
    data = data.filter(user => user.balance >= 1000000)
    updateDom();
}

function sorting(){
    data  = data.sort((a,b) => a.balance - b.balance);
    updateDom()
}


getRandomUser();
getRandomUser();

//  Event Listeners
addUser.addEventListener('click',getRandomUser);
doubleMoney.addEventListener('click',doubleWealth)
millinonaires.addEventListener('click',filter);
sort.addEventListener('click',sorting);



// function doubleWealth(){
//     data = data.map(tarmap(user , tarmap));
// }


// function tarmap(user){
//     return {...user , balance : user.balance *  2 } 
// }