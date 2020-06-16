const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPost = () => {
    let postId = getPostIdParam();
    let url = `${API_URL}${postId}`

    fetch(url, {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        buildPost(data);
    });
}

const buildPost = (blog) => {
    const postImage = API_BASE_URL + blog.post_image;
    const postDate = new Date(parseInt(blog.added_date)).toDateString();

    document.getElementsByTagName("header")[0].style.backgroundImage = `url(${postImage})`;
    document.getElementById("individual-post-title").innerText = blog.title;
    document.getElementById("individual-post-date").innerText = postDate;
    document.getElementById("individual-post-content").innerText = blog.content;
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}