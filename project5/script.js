const addUser = document.getElementById('add');
const ddoubleMoney = document.getElementById('double');
const filter = document.getElementById('millinonaires');
const sort = document.getElementById('sort');
const totalWealth = document.getElementById('sum');
const main = document.getElementById('main');


let data  = [];
async function randomUsre(){
    const res = await fetch('https://randomuser.me/api/')
    const data = await  res.json();

    // console.log(data);
        const user = data.results[0];
        const newUser = {
            name : `${user.name.title} ${user.name.first} ${user.name.last} `,
            balance : (Math.random()*1000000).toFixed(0)
        }

        addData(newUser);
        console.log(newUser);
}

function addData(newUser){
    data.push(newUser);

    updateDom();
}

function updateDom(newUser = data){
    main.innerHTML = '<h2><strong>Users</strong> Wealth</h2>';
    newUser.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `<strong>${user.name}</strong>${user.balance}`;
        main.appendChild(userDiv);
    })


}

// function getRandomUser(){
    // fetch('https://randomuser.me/api/')
    // .then (res => res.json())
    // .then (data =>{
        // const user = data.results[0];
        // console.log(user)

        // const userName = {
            // const name:`${user.name.title} ${user.name.first} ${user.name.last} `, 
            // const balance : 
            
            // console.log(name)
        // }
        // const userName =`${user.name.title} ${user.name.first} ${user.name.last}` ;
        // console.log(userName);
    // }) 
// }

function doubleWealth(){
    
}

addUser.addEventListener('click',randomUsre);

randomUsre();
randomUsre();
randomUsre();
randomUsre();
randomUsre();

// getRandomUser();