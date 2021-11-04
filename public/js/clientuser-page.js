//in public --> js

// let form = document.querySelector('form')

// form.addEventListener('submit', async (e) => {
//     e.preventDefault()
// })

// //make a fetch

// let newPost = {
//     title: document.querySelector('#post-title').value,
//     message: document.querySelector('#post-message').value
// }

// let results = await fetch('/', {
//     method: "POST",

// })

// let messages = await results.json()
// updateStatus(messages)



//grab the data all messages when the page loads
//attach to a dom element


//initialize post for each page
//render all of todos from db onto page




let photoUpload = document.querySelector("#photoUpload")
let photoUploadLink = document.querySelector("#photoUploadLink")


// constants required for cloudinary photo upload
const cloudinaryURL = "https://api.cloudinary.com/v1_1/dc-backend-project2021/image/upload"
const cloudinaryUploadPreset = "wq5dyhd4"

// Photo/Video link to trigger input tag "photoUpload"
photoUploadLink.addEventListener("click", (e) => {
    e.preventDefault()
    photoUpload.click()
})

// input tag triggered by above event listener
photoUpload.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", cloudinaryUploadPreset)

    fetch(cloudinaryURL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.secure_url !== ""){
            const uploadedFileURL = data.secure_url
            console.log(uploadedFileURL);
        }
    })
    .catch(err => console.error(err))
})
