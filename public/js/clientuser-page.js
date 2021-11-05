//in public --> js

let form = document.getElementById('postSubmit')
let photoUpload = document.querySelector("#photoUpload") // input tag to upload photo/video
let photoUploadLink = document.querySelector("#photoUploadLink") // anchor tag "Photo/Video"


//make a fetch

// form.addEventListener('submit', async (e) => {
//     e.preventDefault()

//     let title = document.querySelector('#post-title').value
//     let content = document.querySelector('#post-message').value
//     const formData = new FormData()

//     formData.append(title, title)
//     formData.append(content, content)

//     // let newPost = {
//     //     title: document.querySelector('#post-title').value,
//     //     content: document.querySelector('#post-message').value,
//     // }

//     let results = await fetch('/user_posts', {
//         method: "POST",
//         body: formData
//     })

//     // let posts = await results.json()
//     // updateStatus(posts)
// })

photoUploadLink.addEventListener("click", (e) => {
    e.preventDefault()
    photoUpload.click()
})

///grab data display all messages when the page loads

const displayStatus = async () => {

    let results = await fetch('/user_posts');

    let posts = await results.json();
    updateStatus(posts)
}



//HTML block

const updateStatus = (postsArr) => {
    let htmlBlock = "";

    postsArr.forEach((element) => {

        htmlBlock += '     <div class="">';
        htmlBlock += '       <div class="">';
        htmlBlock += '         <div class="">';
        htmlBlock += '           <div class="">';
        htmlBlock += '             <div class="post-title">' + element.title + '</div>';
        htmlBlock += '           </div>';
        htmlBlock += '          <div>';
        htmlBlock += '           <div class="post-message">' + element.content + '</div>';
        htmlBlock += '          </div>';
        htmlBlock += '         </div>';
        htmlBlock += '        </div>';
        htmlBlock += '      </div>';
    })

    //attach to a dom element

}

// displayStatus()




//initialize post for each page
//render all of todos from db onto page

            // don't use this per veronica. Use cloudinary on the backend.
            // let photoUpload = document.querySelector("#photoUpload")
            // let photoUploadLink = document.querySelector("#photoUploadLink")


            // // constants required for cloudinary photo upload
            // const cloudinaryURL = "https://api.cloudinary.com/v1_1/dc-backend-project2021/image/upload"
            // const cloudinaryUploadPreset = "wq5dyhd4"

            // // Photo/Video link to trigger input tag "photoUpload"
            // photoUploadLink.addEventListener("click", (e) => {
            //     e.preventDefault()
            //     photoUpload.click()
            // })

            // // input tag triggered by above event listener
            // photoUpload.addEventListener("change", (e) => {
            //     const file = e.target.files[0]
            //     const formData = new FormData()
            //     formData.append("file", file)
            //     formData.append("upload_preset", cloudinaryUploadPreset)

            //     fetch(cloudinaryURL, {
            //         method: "POST",
            //         body: formData
            //     })
            //     .then(response => response.json())
            //     .then(data => {
            //         if(data.secure_url !== ""){
            //             const uploadedFileURL = data.secure_url
            //             console.log(uploadedFileURL);
            //         }
            //     })
            //     .catch(err => console.error(err))
            // })



