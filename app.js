const express = require('express')
const bodyParser = require('body-parser')
const ejs =require('ejs')
const app = express()
const _ = require('lodash')
let posts= []

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")

app.get('/',function(req,res){
    res.render('Home',{posts:posts})
})
app.get('/about',function(req,res){
    res.render('about')
})
app.get('/contact',function(req,res){
    res.render('contact')
})
app.get('/compose',function(req,res){
    res.render('compose');
})

app.post('/compose', function (req,res) {
    const post = {
        postTitle:req.body.postTitle,
        content:req.body.content
    }
    posts.push(post)
    res.redirect('/')
})
app.get('/posts/:post',function(req,res){
    const requestedTitle= _.lowerCase(req.params.post)
    posts.forEach((post)=>{
        const storedTitle =_.lowerCase (post.postTitle)
        const storedContent = post.content
        if(storedTitle==requestedTitle){
            res.render('post',{title : storedTitle, content : storedContent })
        }
        

    })
})






app.listen(3000,function(){
    console.log('server is listenning on the port 3000')
})
app.use(express.static("public"))