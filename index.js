const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "cat",
        imageURL:"https://plus.unsplash.com/premium_photo-1677545182067-26ac518ef64f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        caption: "This is my first photo",
    },
    {
        id: uuidv4(),
        username: "dog",
        imageURL: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525",
        caption : "It's me!"
    },
    {
        id: uuidv4(),
        username: "puppy",
        imageURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cute_dog.jpg/1200px-Cute_dog.jpg?20140729055059",
        caption:"i am puppy!"
    }
]

// View all posts
app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts });
});

// Form
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

// form filled and redirect to the view post
app.post("/posts", (req, res) => {
    let { username ,imageURL, caption } = req.body;
    let id = uuidv4();
    posts.push({ id, username ,imageURL, caption });
    res.redirect("/posts"); 
});

// post with id
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    if (!post) {
        res.send("Post not found");
      } else {
        res.render("show.ejs", { post });
      }
});

// for update post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newCaption = req.body.caption;
    let post = posts.find((p) => id === p.id);
    post.caption = newCaption;
    console.log(post);
    res.redirect("/posts");
});

// for edit post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

// for delete post
app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
});

