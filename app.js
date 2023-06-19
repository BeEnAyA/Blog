const express=require ("express")

const path=require("path")

const app=express()

const port = 5000;

const db= require("./Model/index");
const blogController= require("./Controller/blogController");


app.set("view engine","ejs");

require("./Config/dbConfig");

db.sequelize.sync({force:false});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'Uploads')));


app.listen(port, () => {
    console.log("Node server started at port 5000");
  });


  app.get("/", blogController.index);

  app.get("/createblog", blogController.createblog);