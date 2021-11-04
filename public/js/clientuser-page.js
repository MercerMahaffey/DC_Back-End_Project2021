//in public --> js

let createPostUser = document.querySelector('#createPostUser')

// let users = (params) => {

// }

// add listener
createPostUser.addEventListener("submit", async () => {
    // back end is set up to create posts via json object
    // implement front end to create post with data from "form"
    let results = await fetch("/")
})