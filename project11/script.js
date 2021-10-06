// Get DOM Element
const loader = document.getElementById('loader');
const filter = document.getElementById('filter-container');
const newsFeed = document.getElementById('news-feed');

// Create a global element for Api Update
let limit = 5;
let page = 1;

// Function to async fatch post from Api
async function fetchPosts() {
    // Fatch post from json placeholder Api
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json();
    return data;
};



// Function to rander the post
async function renderPosts() {
    const posts = await fetchPosts();
    // for each object in the post array, rander the post
    posts.forEach( post => {
        // Create a new div for the post
        const postDiv = document.createElement('div');
        // Assign the post class to the div
        postDiv.classList.add('post');
        // create a inner html for the main post div
        postDiv.innerHTML = `
        <div class="post-id">${post.id}</div>             
             <div class="post-conte">             
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
         </div>

        `;

        //Rander the postDiv in the DOM
        newsFeed.appendChild(postDiv);
    });
    

};


// Function to show loader Animation
function showLoader() {
    loader.classList.add('show');
    // Increment the page variable by 1
    page++;
    // Rande the post from the page new page 
    renderPosts();
    // Remove the loader
    loader.classList.remove('show');
};

function filterPost(e) {
    // save the input text as a filter keyword
    const filterKeryword = e.target.value.toLowerCase();
    // get all post data from DOM
    const posts = document.querySelectorAll('.post');
    // Process all posts in the posts node list
    posts.forEach( post => {
        // Get the title text
        const title = post.querySelector('.post-title').innerText;
        // Get the body text
        const body = post.querySelector('.post-body').innerText;
        // Check if filterKeyword exists in title or body
        if ( title.indexOf(filterKeryword) >= 0 || body.indexOf(filterKeryword) >= 0) {
            post.style.display = 'flex';
        }else {
            post.style.display = 'none';
        }

    })

};



// Event listner
// listen to scroll in browser windows
window.addEventListener('scroll', () => {
    // Destructing Properties from DOM
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // check if scroll to bottom of page
    if(scrollTop + clientHeight >= scrollHeight - 0.01) {
        // Display the loader animation
       showLoader();
        
    }
}); 

// listen to the input for filter post
filter.addEventListener('input', filterPost);

renderPosts();