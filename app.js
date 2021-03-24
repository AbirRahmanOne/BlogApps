const express = require('express') ;
const morgan = require('morgan') ;
const mongoose = require('mongoose') ;
const Blog = require('./models/blog') ;

//express app
const app = express() ;
//port number
const port = 3000 ;

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://test1234:test1234@cluster0.c4kqu.mongodb.net/blogNinja?retryWrites=true&w=majority" 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => app.listen(port))
    .catch( err => console.log(err)) ;



// mongoose & mongo tests
app.get('/createBlog', (req, res)=>{
    const blog = new Blog({
        title: 'new Blog 4',
        snippet: 'About my new blogs 2',
        body: 'More about my test new blogs...'
    })

    blog.save()
        .then( result =>{
            res.send(result) ;
        })
        .catch( err => {
            console.log(err);
        });
})

app.get('/blogs', (req, res)=>{
    Blog.find()
        .then( result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/blog/id', (req, res)=>{
    Blog.findById("605a3e8723d2ac1756301deb")
        .then(result =>{
            res.send(result);
        })
        .catch( err => {
            console.log(err) ;
        })
})



//register view engine
app.set('view engine', 'ejs') ;

// middleware & static files
app.use(express.static('public')) ;






app.use(morgan('dev')) ;

app.get('/', (req, res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'});
})


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });


// 404 pages
app.use( (req, res)=>{
    res.render('404');
})

/*
// Listen to the port 
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)

})
*/