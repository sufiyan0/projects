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

    selectedMeal.innerHTML = '';

};

// Function to get details of selected meal
function getMeal(mealId) {
    //fetch meal details through mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        displayMealDetails(meal);
    });
}

// Function to render meal display in UI
function displayMealDetails(meal) {
    meals.innerHTML = '';
    resultHeading.innerHTML = '';
    const ingredients = [];
    // loop for ingredients attribute
    for ( let i = 1; i<= 20; i++) {
        if (meal[`strIngredient${i}`]){
            // Push all the ingredients and measurement into the ingredients array
            ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]} `);
        } else { 
            break;
        }
        
    };

    //rander data into UI
    selectedMeal.innerHTML = `
    <div class = "selected-meal-details">
        <h1>${meal.strMeal}  </h1>
        <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}" />
        <div class = "selected-meal-info" >
            ${meal.strCategory ? `<p> ${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p> ${meal.strArea}</p>` : ''}
        </div>

        <h2> Ingredients </h2>
        <ul>
            ${ingredients.map( ingredient => `<li> ${ingredient} </li>` ).join(' ') }
        </ul>

        <h2> Instructions for Cooking </h2>
        <div class = "selected-meal-instruction">
        <p> ${meal.strInstructions} </p>
        </div>

    </div>

    `;
};


//Event Listeners
// 1.Event Listeners for form submit
submit.addEventListener('submit', searchMeal)

// 2.listen to check on meals
meals.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealid');
        //fetch details of meal   
        getMeal(mealId);
     }

}); 