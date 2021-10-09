// Get  elements from DOM 
const newsFeed = document.getElementById('news-feed');
const filter = document.getElementById('filter');
const loader = document.getElementById('loader');


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



renderPosts();