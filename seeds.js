var mongoose = require("mongoose"),
    Blog     = require("./models/blogs");




var data = [
    {
        title: "A Dog",
        image: "https://images.unsplash.com/photo-1518914781460-a3ada465edec?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        body: "The dog (Canis familiaris when considered a distinct species or Canis lupus familiaris when considered a subspecies of the wolf) is a member of the genus Canis (canines), which forms part of the wolf-like canids, and is the most widely abundant terrestrial carnivore.The dog and the extant gray wolf are sister taxa as modern wolves are not closely related to the wolves that were first domesticated, which implies that the direct ancestor of the dog is extinct.The dog was the first species to be domesticated, and has been selectively bred over millennia for various behaviors, sensory capabilities, and physical attributes."
    },
    {
        title: "Banyan Tree",
        image: "https://images.unsplash.com/photo-1524564494469-044724f7f059?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        body: "A banyan, also spelled 'banian', is a fig that begins its life as an epiphyte,i.e. a plant that grows on another plant, when its seed germinates in a crack or crevice of a host tree or edifice. 'Banyan' often specifically denominates Ficus benghalensis (the 'Indian banyan'), which is the national tree of India, though the name has also been generalized to denominate all figs that share a common life cycle and used systematically in taxonomy to denominate the subgenus Urostigma."
    }
]

function seedDB() {
    //remove all the posts
    Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("all posts removed");
        //add few posts
        data.forEach(function(post){
            Blog.create(post, function(err, blog){
                if(err){
                    console.log(err);
                } else {
                    console.log(blog);
                }
            });
        });
    });
}

module.exports = seedDB;
