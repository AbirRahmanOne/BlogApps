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

//register view engine
app.set('view engine', 'ejs') ;

// middleware & static files
app.use(express.static('public')) ;
app.use(express.urlencoded({extended: true})) ;
app.use(morgan('dev')) ;


// routes
app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'});
})

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });
  

app.get('/', (req, res)=>{
    res.redirect('/blogs')
})


app.get('/blogs', (req, res)=>{
    Blog.find().sort({ createdAt: -1 })
        .then( (result)=>{
            res.render('index', {title: 'Home', blogs: result } )
        })
        .catch( (err)=> {
            console.log(err);
        })
    
})



// Post request : creating new blog 
app.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body) ;

    blog.save()
        .then( (result)=>{
            console.log('Data successfully saved..');
            res.redirect('/');
        })
        .catch( (err)=>{
            console.log(err);
        })
})



app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id ;
    Blog.findById(id)
        .then(data =>{
            res.render('details', {title: "Blog Details", blog: data} )
        })
        .catch(err=>{
            console.log(err);
        })
})





app.delete('/blogs/:id', (req, res)=>{
    const id  = req.params.id ;

    Blog.findByIdAndDelete(id)
        .then( data =>{
            res.json( {
                redirect : '/blogs'
            });
        })
        .catch( err => {
            console.log(err);
        });
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