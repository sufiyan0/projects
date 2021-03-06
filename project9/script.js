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
    // {id: 1, reason: 'salary' , amount: 5000},
    // {id: 2, reason: 'Bill' , amount: -30},
    // {id: 3, reason: 'Dinner' , amount: -20},
    // {id: 4, reason: 'Lunch' , amount: -50},
    
];

// get transection data form storage
let transections = Transection;

// Functiom to display transection in DOM 
function displayTransection(transections){
    //  calculate if transection is  Credit of Debit 
    const type = transections.amount > 0 ? '+' : '-';
    // create a list item for the transection
    const transectionLI = document.createElement('li');
    // determin class based on transection type.. positive or negative
    transectionLI.classList.add(transections.amount > 0 ? 'credit' : 'debit' );
    // Assign the inner HTML for the transection li
    transectionLI.innerHTML = `
       ${transections.reason} <span>${transections.amount}</span>
        <button class="delete-btn" onclick = "deleteData(${transections.id})" >X</button>
    `;

    //Add the li in the  DOM under the transection history list
    list.appendChild(transectionLI);
} 




// Function to update all balances
function updateBalance() {
    /// Create a new array 
    const transectionAmmounts = transections.map( transections => transections.amount );
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
    transections.forEach(displayTransection);
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
        const transectioon = {
            id: creatrId(),
            reason: reason.value,
            amount: +amount.value
        }
        // Push the new transection in to the transection array
        transections.push(transectioon); 
        //Dispaly the new transection in to the DOM
        displayTransection(transectioon);
        // Update all Balance
        updateBalance();
        //Empty form fields
        reason.value = '';
        amount.value = '';
    }
};

function deleteData(id) {
    // filter out the transection with the provided id
    transections = transections.filter( transection => transection.id !== id);
    // inisilize the app by update the DOM
    init();
     
};



// Event listrners
// 1. listen for form submit to add a transection
form.addEventListener('submit',addTransection),

// called the Initilize Application function
init(); 

