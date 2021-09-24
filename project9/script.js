// DOM Elements
const balance = document.getElementById('balance')
const moneyCerdit  = document.getElementById('money-credit')
const moneyDebit = document.getElementById('money-debit')
const list = document.getElementById('list')
const form = document.getElementById('add-form')
const reason = document.getElementById('reason')
const amount = document.getElementById('amount')


// Array of transection
const Transection = [
    {id: 1, reason: 'salary' , amount: 5000},
    {id: 2, reason: 'Bill' , amount: -30},
    {id: 3, reason: 'Dinner' , amount: -20},
    {id: 4, reason: 'Lunch' , amount: -50},
    
];

// get transection data form storage
let transection = Transection;

// Functiom to display transection in DOM 
function displayTransection(transection){
    //  calculate if transection is  Credit of Debit 
    const type = transection.amount > 0 ? '+' : '-';
    // create a list item for the transection
    const transectionLI = document.createElement('li');
    // determin class based on transection type.. positive or negative
    transectionLI.classList.add(transection.amount > 0 ? 'credit' : 'debit' );
    // Assign the inner HTML for the transection li
    transectionLI.innerHTML = `
        ${transection.reason} <span>${transection.amount}</span>
        <button class="delete-btn">X</button>
    `;

    //Add the li in the  DOM under the transection history list
    list.appendChild(transectionLI);
} 


// Function to update all balances
function updateBalance() {
    /// Create a new array 
    const transectionAmmounts = transection.map( transection => transection.amount );
    // Calculate total balance value 
    const totalBalance = transectionAmmounts.reduce ( (acc, amount) => (acc += amount), 0 )
        //Calculate total balance for credit
        const creditBalance = transectionAmmounts .filter(amount => amount > 0)
                                              .reduce((acc , amount) => (acc += amount), 0  ); 

        //Calculate total balance for debit  
        const debitBalance = transectionAmmounts .filter(amount => amount < 0)
                                                 .reduce((acc , amount) => (acc += amount), 0  ); 


        //Update value in DOM for all values
        balance.innerHTML = `$${totalBalance}`;
        moneyCerdit.innerHTML = `$${creditBalance}`;
        moneyDebit.innerHTML = `$${debitBalance}`;

}

// Initilize Application
function init(){
    // Clear all history
    list.innerHTML = '';
    // Display all transection in DB in the DOM
    transection.forEach(displayTransection);
    updateBalance();
};

//function to create random id
function creatrId() {
    return Math.floor(Math.random() * 100000000000)
};

// function to Initialize history 
function addTransection(e) {
    e.preventDefault();

    // check if form has empty data 
    if (reason.value.trim() === '' || amount.value.trim() === '' ) {
        //Display alery massage
        alert('Please provide a valid reason and transection ammount')    
    } else{
        //Create an object
        const transection = {
            id: creatrId(),
            reason: reason.value,
            amount: +amount.value
        }
    }console.log(transection)
}

// Event listrners
// 1. listen for form submit to add a transection
form.addEventListener('submit',addTransection),

// called the Initilize Application function
init(); 

