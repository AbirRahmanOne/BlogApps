const Blog = require('../models/blog') ;


const blog_index = (req, res) =>{
    Blog.find().sort({ createdAt: -1 })
        .then( (data)=>{
            res.render('index', {title: 'Home', blogs: data } )
        })
        .catch( (err)=> {
            console.log(err);
        })
}


const blog_details = (req, res) =>{
    const id = req.params.id ;
    Blog.findById(id)
        .then(data =>{
            res.render('details', {title: "Blog Details", blog: data} )
        })
        .catch(err=>{
            console.log(err);
        })
}


const blog_create_get = (req, res) =>{
    res.render('create', { title: 'Create a new blog' });
}


const blog_create_post = (req, res) => {
    const blog = new Blog(req.body) ;

    blog.save()
        .then( (result)=>{
            console.log('Data successfully saved..');
            res.redirect('/');
        })
        .catch( (err)=>{
            console.log(err);
        })
}

const blog_delete = (req, res) =>{
    const id = req.params.id ;

    Blog.findByIdAndDelete(id)
        .then(data =>{
            res.json({
                redirect: '/blogs'
            });
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}