const fs = require('fs');
const PATH = "./data.json";

class Posts {
    get = () => {
        return this.readPosts();
    };

    get_individual_post = (postId) => {
        const blogPosts = this.readPosts();
        return blogPosts.find((post) => post.id == postId);
    };

    add = (post) => {
        let blogPosts = this.readPosts();
        blogPosts.unshift(post);
        this.storePosts(blogPosts);
    };

    readPosts = () => {
        try {
            return JSON.parse(fs.readFileSync(PATH, 'utf8'));
        } catch (err) {
            console.error(err)
            return false;
        }
    };

    storePosts = (data) => {
        try {
            fs.writeFileSync(PATH, JSON.stringify(data));
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = Posts;