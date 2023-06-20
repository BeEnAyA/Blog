const db = require("../Model/index");
const Blogs = db.blog;

exports.index=async(req,res)=>{
    const blogs=await Blogs.findAll();
    console.log(blogs);
    res.render('index',{name:'hello'});
}

exports.renderCreateBlog= async(req,res)=>{
    res.render("createblog");
}

exports.createBlog= async(req,res)=>{
    const {title,description}=req.body
    const image=req.file.filename

    await Blogs.create({
        title:title,
        description:description,
        image:image,
    });

    res.redirect('/')
}

