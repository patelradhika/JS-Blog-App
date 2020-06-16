const express = require("express");
const app = express();
const Post = require('./api/models/post.js');
const postsData = new Post();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});

const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}

var upload = multer({ storage: storage });


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.get('/api/posts', (req, res) => {
    res.status(200).send(postsData.get());
})

app.get('/api/posts/:post_id', (req, res) => {
    let post = postsData.get_individual_post(req.params["post_id"]);
    if (post) {
        return res.status(200).send(post);
    } else {
        return res.status(404).send("Not Found!");
    }
})

app.post('/api/posts', upload.single("post-image"), (req, res) => {
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }

    postsData.add(newPost);
    return res.status(201).send(newPost);
})


app.listen(3000, () => {
    console.log("Listening on local host 3000.");
})