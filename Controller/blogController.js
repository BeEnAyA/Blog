const db = require("../Model/index");
const Blogs = db.blog;

exports.index = async (req, res) => {
  const blogs = await Blogs.findAll();
  console.log(blogs);
  res.render("index", { data: blogs });
};

exports.renderCreateBlog = async (req, res) => {
  res.render("createblog");
};

exports.createBlog = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;

  await Blogs.create({
    title: title,
    description: description,
    image: "http://localhost:5000/" + image,
  });
  res.redirect("/");
};

exports.singleBlog = async (req, res) => {
  const blog = await Blogs.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.render("singleblog", { blog: blog[0] });
};

exports.deleteBlog = async (req, res) => {
  await Blogs.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/");
};

exports.editBlog = async (req, res) => {
  const blog = await Blogs.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.render("edit", { blog: blog[0] });
};

exports.updateBlog = async (req, res) => {
  updatedData = {
    title: req.body.title,
    description: req.body.description,
  };

  //Update image only if new image is selected
  if (req.file) {
    const image = "http://localhost:5000/" + req.file.filename;
    updatedData.image = image;
  }

  await Blogs.update(updatedData, {
    where: {
      id: req.params.id,
    },
  })
  console.log("Updated successfully")
  res.redirect("/")
}
