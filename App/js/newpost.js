const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
    let input = document.querySelector('input[type="file"]');
    const title = document.getElementById("form-post-title").value;
    const content = document.getElementById("form-post-content").value;
    let formData = new FormData();
    formData.append('post-image', input.files[0]);
    formData.append('title', title);
    formData.append('content', content);

    fetch(API_URL, {
        method: 'POST',
        body: formData
    }).then((response) => {
        console.log(response.status, response.body);
        setTimeout(()=>{
            window.location.href = "/home.html";
        }, 1000)
    }).catch((error) => {
        console.log(error);
    })
}