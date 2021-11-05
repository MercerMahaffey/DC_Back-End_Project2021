//in public --> js

let form = document.getElementById('postSubmit')

//make a fetch

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    // console.log('form');

    let newPost = {
        title: document.querySelector('#post-title').value,
        content: document.querySelector('#post-message').value,
        imgurl: "imgURL"
    }

    let results = await fetch('/user_posts', {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newPost)
    })

    // let posts = await results.json()
    // updateStatus(posts)
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

displayStatus()







