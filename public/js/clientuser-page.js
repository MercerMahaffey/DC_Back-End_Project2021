
let appendHere = document.querySelector('#appendHere');
let commentSubmit = document.querySelector('#commentSubmit')
// let photoUploadUserPost = document.querySelector("#photoUploadUserPost")

photoUploadUserPost.addEventListener("change", () => {
    console.log("changed");
    let labelVal = label.innerHTML
    let fileName = e.target.value.split("/").pop()
    console.log(fileName);
})

let grabPost = async () => {
    let response = await fetch('/user_posts');
    // console.log("grabbing post");
    // let results = await fetch('/user_posts');
    let records = await response.json();
    console.log(records);
    printPost(records)
    // let posts = await results.json();
    // updateStatus(posts)
    console.log("grabbing posts");
}

let printPost = async (allPostsData) => {
    // console.log("printing post");
    let usersArrayRaw = await fetch('/username');
    let usersArray = await usersArrayRaw.json();
    // console.log(usersArray);
    // console.log(usersArray);
    let useridRaw = await fetch('/userid');
    let userid = await useridRaw.json();
    // console.log(userid);
    let htmlBlock = '';
    // let allUsers = JSON.stringify(allPostsData)
    allPostsData.forEach(user => {
        let userPosts = user.posts;
        
        userPosts.forEach(post => {
            let userImage = '';
            usersArray.forEach(usersArrayUser => {
                if(usersArrayUser.id == post.userid){
                    userImage = usersArrayUser.userimage
                    
                }
            });
            let postComments = post.comments;
            let commentsHtmlBlock = '';
            // console.log(postComments);
            postComments.forEach(comment => {
                // console.log(typeof comment.userid);
                // console.log(comment.userid);
                // console.log('hello');
                // console.log(allPostsData);
                // console.log(allPostsData[comment.userid-1]);
                // let commentName = '';
                // console.log(allPostsData);
                let commentName = 'noName';
                usersArray.forEach(usersArrayUser => {
                    if(usersArrayUser.id === comment.userid){
                        commentName = usersArrayUser.username;
                        // if same user as logged in
                        if(userid === comment.userid){
                            commentsHtmlBlock += `<div id="${comment.id}" style="color: black;" ><span id="deleteComment" class="btn btn-danger">Delete</span><span style="font-weight: bold; font-size: 20px;"> ${commentName}: </span>${comment.content}</div> <br>`
                        }
                        else{
                            commentsHtmlBlock += `<div id="${comment.id}" style="color: black;" ><span style="font-weight: bold; font-size: 20px;">${commentName}: </span>${comment.content}</div> <br>`
                        }
                        
                    }
                    
                })
                
                    // console.log(usersArray[comment.userid-1]);
                    // let user = await fetch('/username');
                    // let userName = await user.json();

                    // console.log(userName);
                
                // let commentName = allPostsData[comment.userid-1].username;
                // console.log(commentName);
                
            })
            
            // console.log(commentsHtmlBlock);
            //if the post contains an image
            if(post.imgurl){
                // console.log(post.userid);
                // if users post
                if(post.userid === userid){
                    // console.log("same user");
                    htmlBlock += `<div class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                            <div id="${post.id}" class="card-body p-0 d-flex">
                            <figure class="avatar me-3"><img src="${userImage}" alt="image" class="shadow-sm rounded-circle w45"></figure>
                            
                            <h4 id="nameArea" class="fw-700 text-grey-900 font-xssss mt-1">${user.username}<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">${post.createdAt.substring(0,10)} ${post.createdAt.substring(11,16)}</span></h4>
                            <a href="#" class="ms-auto"></a>
                            <h4 id="deletePost" class="btn btn-danger" >Delete Post</h4>
                        </div>
                        <div class="card-body p-0 me-lg-5">
                            <h5 class="text-danger">${post.languages}</h5>
                            <h1>${post.title}</h1>
                            <p class="fw-500 lh-26 font-xssss w-100 mb-2">${post.content}</p>
                        </div>
                        <div class="card-body d-block p-0 mb-3">
                            <div class="row ps-2 pe-2">
                                
                                <div class="col-sm-12 p-1"><a href="${post.imgurl}" data-lightbox="roadtr"><img src="${post.imgurl}" class="rounded-3 w-100" alt="image"></a></div>                                        
                            </div>
                        </div>
                        <form class="${user.id}" action="/comments/${post.id}" method="post">
                            <input class="typeCommentArea" type="text" placeholder="Add a comment." name="content"></input>

                            <div>
                                <button class="commentSubmitButton" id="commentSubmit" type="submit">Post</button>
                            </div>
                        </form>
                        <div id="${post.id}" class="commentSection card-body d-flex p-0">
                            
                            
                            <a  style="cursor:pointer;" class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i id="commentButton" class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span id="commentButton" class="d-none-xss">${post.comments.length} Comments.</span></a><div id="comments" class="visually-hidden">` + commentsHtmlBlock + `</div></div></div><br></br>`
                }
                else{
            htmlBlock += `<div class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                        <div class="card-body p-0 d-flex">
                            <figure class="avatar me-3"><img src="${userImage}" alt="image" class="shadow-sm rounded-circle w45"></figure>
                            
                            <h4 id="nameArea" class="fw-700 text-grey-900 font-xssss mt-1">${user.username}<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">${post.createdAt.substring(0,10)} ${post.createdAt.substring(11,16)}</span></h4>
                            <a href="#" class="ms-auto"></a>
                        </div>
                        <div class="card-body p-0 me-lg-5">
                            <h5 class="text-danger">${post.languages}</h5>
                            <h1>${post.title}</h1>
                            <p class="fw-500 lh-26 font-xssss w-100 mb-2">${post.content}</p>
                        </div>
                        <div class="card-body d-block p-0 mb-3">
                            <div class="row ps-2 pe-2">
                                
                                <div class="col-sm-12 p-1 feedImage"><a href="${post.imgurl}" data-lightbox="roadtr"><img src="${post.imgurl}" class="rounded-3 w-100" alt="image"></a></div>                                        
                            </div>
                        </div>
                        <form class="${user.id}" action="/comments/${post.id}" method="post">
                            <input class="typeCommentArea" type="text" placeholder="Add a comment." name="content"></input>

                            <div>
                                <button class="commentSubmitButton" id="commentSubmit" type="submit">Post</button>
                            </div>
                        </form>
                        <div id="${post.id}" class="commentSection card-body d-flex p-0">
                            
                            
                            <a  style="cursor:pointer;" class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i id="commentButton" class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span id="commentButton" class="d-none-xss">${post.comments.length} Comments.</span></a><div id="comments" class="visually-hidden">` + commentsHtmlBlock + `</div></div></div><br></br>`
                }
            }
            // no picture
            else{
                // if users post
                if(post.userid === userid){
                    // console.log("same user");
                    htmlBlock += `<div class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                        <div id="${post.id}" class="card-body p-0 d-flex">
                            <figure class="avatar me-3"><img src="${userImage}" alt="image" class="shadow-sm rounded-circle w45"></figure>
                            
                            <h4 id="nameArea" class="fw-700 text-grey-900 font-xssss mt-1">${user.username}<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">${post.createdAt.substring(0,10)} ${post.createdAt.substring(11,16)}</span></h4>
                            <a href="#" class="ms-auto"></a>
                            <h4 id="deletePost" class="deletePost btn btn-danger" >Delete Post</h4>
                        </div>
                        <div class="card-body p-0 me-lg-5">
                            <h5 class="text-danger">${post.languages}</h5>
                            <h1>${post.title}</h1>
                            <p class="fw-500 lh-26 font-xssss w-100 mb-2">${post.content}</p>
                        </div>
                        
                        <form class="${user.id}" action="/comments/${post.id}" method="post">
                            <input class="typeCommentArea" type="text" placeholder="Add a comment." name="content"></input>

                            <div>
                                <button class="commentSubmitButton" id="commentSubmit" type="submit">Post</button>
                            </div>
                        </form>
                        <div id="${post.id}" class="commentSection card-body d-flex p-0">
                            
                            
                            <a  style="cursor:pointer;" class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i id="commentButton" class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span id="commentButton" class="d-none-xss">${post.comments.length} Comments.</span></a><div id="comments" class="visually-hidden">` + commentsHtmlBlock + `</div></div></div><br></br>`
                }
                // if not users post
                else{
                htmlBlock += `<div class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                        <div class="card-body p-0 d-flex">
                            <figure class="avatar me-3"><img src="${userImage}" alt="image" class="shadow-sm rounded-circle w45"></figure>
                            
                            <h4 id="nameArea" class="fw-700 text-grey-900 font-xssss mt-1">${user.username}<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">${post.createdAt.substring(0,10)} ${post.createdAt.substring(11,16)}</span></h4>
                            <a href="#" class="ms-auto"></a>
                        </div>
                        <div class="card-body p-0 me-lg-5">
                            <h5 class="text-danger">${post.languages}</h5>
                            <h1>${post.title}</h1>
                            <p class="fw-500 lh-26 font-xssss w-100 mb-2">${post.content}</p>
                        </div>
                        
                        <form class="${user.id}" action="/comments/${post.id}" method="post">
                            <input class="typeCommentArea" type="text" placeholder="Add a comment." name="content"></input>

                            <div>
                                <button class="commentSubmitButton" id="commentSubmit" type="submit">Post</button>
                            </div>
                        </form>
                        <div id="${post.id}" class="commentSection card-body d-flex p-0">
                            
                            
                            <a  style="cursor:pointer;" class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i id="commentButton" class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span id="commentButton" class="d-none-xss">${post.comments.length} Comments.</span></a><div id="comments" class="visually-hidden">` + commentsHtmlBlock + `</div></div></div><br></br>`
                }
            }


                    
        })
    })
    appendHere.innerHTML = appendHere.innerHTML + htmlBlock;
    // commentButtonEventFunction()

}

grabPost()

let commentsSection = document.querySelector('#comments')

appendHere.addEventListener('click', (e) =>{
    // console.log(e.target.id);
    // if(e.target.id ==="createPostUserButton"){
    //     console.log('sending post');
    //     let newPost = {
    //         title: document.querySelector('#post-title').value,
    //         content: document.querySelector('#post-message').value,
    //         // imgurl: "imgURL"
    //     }
    //     console.log(newPost);
    
    //     let results = await fetch('/user_posts', {
    //         method: "POST",
    //         headers: { "Content-type": "application/json; charset=UTF-8" },
    //         body: JSON.stringify(newPost)
    //     })
    
    //     let posts = await results.json()
    //     grabPost()
    // }
    if(e.target.id === "commentButton"){
        // console.log(e.target.parentElement.parentElement.childNodes[2])
        if (e.target.parentElement.parentElement.childNodes[2].className === "none"){
            e.target.parentElement.parentElement.childNodes[2].className = "visually-hidden"
        }
        else if (e.target.parentElement.parentElement.childNodes[2].className === "visually-hidden"){
            e.target.parentElement.parentElement.childNodes[2].className = "none"
        }
    }
    if(e.target.id === "commentSubmit"){
        // e.preventDefault();

    }
    if(e.target.id ==="deletePost"){
        let postid = e.target.parentElement.id;
        // console.log(e.target.parentElement.id);
        // console.log("deleting post");
        fetch(`/posts/deletepost/${postid}`,{
            method: "DELETE"})
        // let posts = await results.json()
        // console.log('running after fetch');
        location.reload();
        // grabPost()
    }
    if(e.target.id ==="deleteComment"){
        let commentid = e.target.parentElement.id;
        // console.log(e.target.parentElement.id);
        // console.log("deleting comment");
        fetch(`/posts/deletecomment/${commentid}`,{
            method: "DELETE"})
        // let posts = await results.json()
        // console.log('running after fetch');
        location.reload();
        // grabPost()
    }
})
