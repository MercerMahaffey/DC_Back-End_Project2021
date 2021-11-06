let submitUserInfoButton = document.querySelector('#submitUserInfoButton');
let usernameText = document.querySelector('#usernameText');
let emailText = document.querySelector('#emailText');
let githubText = document.querySelector('#githubText');
let javascriptCheck = document.querySelector('#javascriptCheck');
let htmlCheck = document.querySelector('#htmlCheck');
let cssCheck = document.querySelector('#cssCheck');

submitUserInfoButton.addEventListener('click', async (e) => {
    
    let username = usernameText.value;
    let email = emailText.value;
    let github = githubText.value;
    let languagesString = '';
    if(javascriptCheck.checked){
        languagesString += 'javascript, '
    }
    if(htmlCheck.checked){
        languagesString += 'html, '
    }
    if(cssCheck.checked){
        languagesString += 'css, '
    }
    
    if(!usernameText.value){
        username = usernameText.getAttribute('placeholder')
    }
    if(!emailText.value){
        email = emailText.getAttribute('placeholder')
    }
    if(!githubText.value){
        github = githubText.getAttribute('placeholder')
    }

    languagesString = languagesString.substring(0, languagesString.length-2);

    let updatedInfoObj = {
        username,
        email,
        github,
        languages: languagesString
    }

    let rawResult = await fetch('/update-account', {
        method: "put",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(updatedInfoObj)
    })
    await rawResult.json();
    window.location = "/account-information"
    
})

