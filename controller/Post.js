const Post = require('../models/Post')

const adminLayout = '../views/layouts/main';


const getPosts = async (req,res) => {
    try {
        const locals = {
          title: 'Dashboard',
          description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }
    
        const data = await Post.find();
        res.render('Post-crud/dashboard', {
          locals,
          data,
          layout: adminLayout
        });
    
      } catch (error) {
        console.log(error);
      }
}


const addPostView = async (req,res) => {
    try {
        const locals = {
          title: 'Add Post',
          description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }
    
        const data = await Post.find();
        res.render('Post-crud/add-post', {
          locals,
          layout: adminLayout
        });
    
      } catch (error) {
        console.log(error);
      }
}

const addPost = async (req,res) => {
    try {
        try {
          const newPost = new Post({
            title: req.body.title,
            body: req.body.body
          });
    
          await Post.create(newPost);
          res.redirect('/dashboard');
        } catch (error) {
          console.log(error);
        }
    
      } catch (error) {
        console.log(error);
      }
}

const viewPost = async (req,res) => {
    try {
        let slug = req.params.id;
    
        const data = await Post.findById({ _id: slug });
    
        const locals = {
          title: data.title,
          description: "Simple Blog created with NodeJs, Express & MongoDb.",
        }
    
        res.render('post', { 
          locals,
          data,
          currentRoute: `/post/${slug}`
        });
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
    getPosts,
    addPostView,
    addPost, 
    viewPost   
}