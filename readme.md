##Blog App

* This is a blog post.
* This is made using HTML, CSS, Javascript, NodeJS, Express and mongo database.
* For styling the pages, semantic ui labrary is used.
* The various packages used in making the app can be found in package.json file(inside dependecies section).


#For running the app in the development mode:
*Use "node app.js" in terminal and open http://localhost:4000 to view it in the browser.



Name            Path                HTTP Verb     Purpose
===================================================================================================
Index          /blogs                 GET        Show all the blog posts
New            /blogs/new             GET        Show new form for adding a new post
Create         /blogs                 POST       Create a new post and then redirect to index page
Show           /blogs/:id             GET        Show information about one blog post
Edit           /blogs/:id/edit        GET        Show the form for editing the post
Update         /blogs/:id             PUT        Update the post and redirect to the show page
Delete         /blogs/:id             DELETE     Delete the post and redirect to index page
