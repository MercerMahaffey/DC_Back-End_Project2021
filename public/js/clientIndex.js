let grabPost = async () => {
    let response = await fetch('/posts');
    let records = await response.json();
    console.log(records[0]);
}
grabPost()

