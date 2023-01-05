

const express = require("express");
const bodyParser = require("body-parser");
//const { render } = require("ejs");
const _ = require('lodash');
const mongoose=require('mongoose');
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
mongoose.connect('mongodb+srv://admin-meghna:iPfW8bn8MGFeT4v5@cluster0.hgmrodx.mongodb.net/postsDB');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postSchema=new mongoose.Schema({
  title:String,
  content:String
});
const Post=mongoose.model("Post",postSchema);

app.get("/",(req,res)=>{
  
  Post.find(function(err,results)
  {
    if(!err)
    {
      res.render("home",{homeContent:homeStartingContent,newposts:results}); //to use ejs templates
    }
  })
  
  
});
app.get("/about",(req,res)=>{
  res.render("about",{aboutContent:aboutContent}); //to use ejs templates
});
app.get("/contact",(req,res)=>{
  res.render("contact",{contactContent:contactContent}); //to use ejs templates
});
app.get("/compose",(req,res)=>{
  res.render("compose"); //to use ejs templates
});
app.post("/compose",(req,res)=>{
  const p=new Post({
    title: req.body.title,
    content: req.body.postbody
  });
  p.save(function(err)
  {
    if(!err)
    res.redirect("/");
  });
  
})
//_.kebabCase('Foo Bar');
// => 'foo-bar'
//_.lowerCase('--Foo-Bar--');
// => 'foo bar'

app.get("/posts/:postId",(req,res)=>{ //dynamic url
  var para=req.params.postId;
  Post.findOne({_id:para},function(err,results){
    if(!err)
    {
      res.render("post",{contentTitle:results.title,content:results.content});
    }
    else
    console.log(results._id);
  });   
});
//lodash

// for(var i=0;i<posts.length;i++)
//     {
//       const pName=_.lowerCase(posts[i].postTitle)
//       if(pName===para)
//        {
//         res.render("post",{contentTitle:posts[i].postTitle,content:posts[i].postBody});
//       }
//       else{
//         console.log("Match not found!");
//       }
//     }

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
