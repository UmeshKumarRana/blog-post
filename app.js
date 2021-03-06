var bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();
    Blog             = require("./models/blogs")
    seedDB           = require("./seeds");
    
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());   //the only requirement is that this code must be written after body-parser
app.use(methodOverride("_method"));
seedDB();

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
})

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
})

//CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    // console.log(req.body);  this will contain both html code and script code
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // console.log("===========");
    // console.log(req.body);  this will only contain html code
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //then redirect to the index
            res.redirect("/blogs")
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Blog.findByIdAndUpdate(id=req.params.id, newData=req.body.blog(in this case), callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs"); 
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(4000, function(){
    console.log("SERVER IS RUNNING!");
});
