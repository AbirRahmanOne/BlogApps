const express = require('express') ;

//express app
const app = express() ;

//register view engine
app.set('view engine', 'ejs') ;

//port number
const port = 3000 ;


app.get('/', (req, res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req,res)=>{
    res.render('about', {title:'About'});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

// 404 pages
app.use( (req, res)=>{
    res.render('404');
})
// Listen to the port 
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)

})