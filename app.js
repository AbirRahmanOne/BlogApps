const express = require('express') ;
const morgan = require('morgan') ;
const mongoose = require('mongoose') ;
const blogRouter = require('./routes/blogRoutes') ;
const connectDB = require('./config/db') ;

//express app
const app = express() ;
//port number
const port = 3000 ;

// connect to mongodb & listen for requests
connectDB() ;

//register view engine
app.set('view engine', 'ejs') ;

// middleware & static files
app.use(express.static('public')) ;
app.use(express.urlencoded({extended: true})) ;
app.use(morgan('dev')) ;


// routes
app.get('/', (req, res)=>{
    res.redirect('/blogs')
})


app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'});
})

// blog router ..
app.use('/blogs', blogRouter) ;




// 404 pages
app.use( (req, res)=>{
    res.render('404');
})


app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)

})
