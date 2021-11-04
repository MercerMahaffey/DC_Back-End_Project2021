//in public --> js

let form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
})

//make a fetch

let newPost = {
    title: document.querySelector('#post-title').value,
    message: document.querySelector('#post-message').value
}

let results = await fetch('/', {
    method: "POST",

})

let messages = await results.json()
updateStatus(messages)



//grab the data all messages when the page loads
//attach to a dom element


//initialize post for each page
//render all of todos from db onto page
