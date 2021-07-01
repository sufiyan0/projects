const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(Occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie')

let ticketPrice = +movie.value;

function uptadeCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected' );
    const uptadeCount = selectedSeats.length;
    count.innerText = uptadeCount;
    total.innerText = uptadeCount * ticketPrice;
}

container.addEventListener('click', function(e){
     if(e.target.classList.contains('seat')
        //  !e.target.classList.contains('Occupied')
    ){
         e.target.classList.toggle('selected')
        uptadeCount();
     }   
 })

 movie.addEventListener('change', e => {
    ticketPrice= +e.target.value
    uptadeCount();
 })











