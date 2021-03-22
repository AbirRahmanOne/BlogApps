const express = require('express') ;

//express app
const app = express() ;

//register view engine
app.set('view engine', 'ejs') ;

//port number
const port = 3000 ;


app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/about', (req,res)=>{
    res.render('about');
})


// 404 pages
app.use( (req, res)=>{
    res.render('404');
})
// Listen to the port 
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)

})