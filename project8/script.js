//Get elements from DOM.
const submit = document.getElementById('submit');
const search = document.getElementById('search');
const generate = document.getElementById('generate');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

//Function to search meal by using API
function searchMeal(e) {
    //prevrnt from submit and redirect (prevrnt from refresh)
    e.preventDefault();
    //get the value from search field
    const searchText = search.value;
    //check if search input field is empty
    if(searchText.trim()) {
        //Fatch data from API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            //Update results heading
            resultHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
            //Check if any meals returned fron API
            if(data.meals === null){
                resultHeading.innerHTML = `<h2> No result obtained from ${searchText} </h2>`
            } else{
                meals.innerHTML = data.meals.map( meal => `
                    <div class = "meal">
                        <img src="${meal.strMealThumb}"  alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}" >
                            <h3> ${meal.strMeal} </h3>
                        </div>
                    </div>
                `)
                .join('')

                //clear the search text
                search.value = '';
            }
        } )
        
    } else {
        alert('Please Enter what you want to search')
    };
};


//Event Listeners
// 1.Event Listeners for form submit
submit.addEventListener('submit', searchMeal)