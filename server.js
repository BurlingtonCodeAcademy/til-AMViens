//required dependencies
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const { response } = require("express");

//local variables
const staticDir = path.resolve('./client/public')
const port = process.env.PORT || 5000;

//database setup
mongoose.connect("mongodb://localhost:27017/til", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
    
const tilDB = mongoose.connection;
tilDB.on("error", console.error.bind(console, "connection error:"))

const FormSchema = new mongoose.Schema({
    title: String,
    author: String,
    topic: String,
    content: String,
    date: Date
})

const FormModel = new mongoose.model("Form", FormSchema);

//Server setup

app.use(express.static(staticDir))
app.use(express.urlencoded({ extended: true }));

//post requests will create a new post unless duplicate title
app.post("/facts", async (req, res) => {
    let formInfo = req.body;
    let formObj = formModel.findOne({ title: formInfo.title });
    console.log(formObj);
    if (!formObj) {
        let newPost = new FormModel(formInfo);
        await newPost.save();
        res.redirect("/")
        res.status(200).send("Thanks for posting!")
    } else {
        res.status(404).send("something went wrong")
    }
})

//edit posts
app.post("/edit/:_id", async (req, res) => {
    let contents = req.body
    await FormModel.updateOne({_id: ObjectId(req.params.id)}, contents)
})

//list all posts
app.get("/api", async (req, res) => {
    const cursor = await FormModel.find({});
    let results = [];
    await cursor.forEach((formInfo) => {
        results.push(formInfo)
    });
    res.json(results)
})

//delete post
app.get("/delete/:id", async (req, res) => {
    await FormModel.findOneAndDelete({_id: ObjectId(req.params.id)})
    res.redirect("/")
})

//catch all
app.get("*", (req, res) => {
    res.sendFile(staticDir + "/index.html");
  });

//server port confirm
app.listen(port, () => {
    console.log("listening on port", port)
})
