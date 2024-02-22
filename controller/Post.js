const Post = require('../models/Post')
const Redis = require('../redis-store/redis')
const mainLayout = '../views/layouts/main';



const getPosts = async (req,res) => {
  try {
      const locals = {
        title: 'Dashboard',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }

      const redisData = await Redis.get("allPosts")
      let data = JSON.parse(redisData)
       
      if (data !== null) {
          res.render('Post-crud/dashboard', {
          locals,
          data,
          layout: mainLayout
        });
      }else {
       
        data = await Post.find();
        await Redis.set("allPosts", JSON.stringify(data))
       
        res.render('Post-crud/dashboard', {
          locals,
          data,
          layout: mainLayout
        });
       
      }
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
    
        
        res.render('Post-crud/add-post', {
          locals,
          layout: mainLayout
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
  
        
        const post = await Post.create(newPost);

        // Caching newly created post
        await Redis.set(post.id, JSON.stringify(post), 'EX', 604800)
        await Redis.del("allPosts")

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
      let data;

      const redisData = await Redis.get(slug)
      data = JSON.parse(redisData)
     
      if (data === null){
        data = await Post.findById({ _id: slug });
        await Redis.set(slug, JSON.stringify(data), 'EX', 604800)
      }
  
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
