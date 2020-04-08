const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

//require firebase
const firebase = require("firebase");
//get config so we can communicate with firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8lGR3cXo81GAJQqY3nhXsx2X3Dig6a70",
    authDomain: "dynweb-exercise-four.firebaseapp.com",
    databaseURL: "https://dynweb-exercise-four.firebaseio.com",
    projectId: "dynweb-exercise-four",
    storageBucket: "dynweb-exercise-four.appspot.com",
    messagingSenderId: "728469348627",
    appId: "1:728469348627:web:7d0cacc3c3aae89c463ae6"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//create empty array
const blogpostsArray = [];
//reference to collections
const blogposts = db.collection("blogposts");
//get blogposts
const allBlogPosts = blogposts
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            //push document into array everytime the query loops over existing articles
            blogpostsArray.push(doc.data());
        });
    })
    .catch(function (error) {
          console.log("Error:", error);
    });

// get single blog post
const documentToGet = "sample-post";
const singleBlogPost = blogposts
    .doc(documentToGet)
    .get()
    .then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
    .catch(function (error) {
        console.log("Error:", error)
    });

//import routes
const indexRoute = require("./routes/index.js");
const postRoute = require("./routes/post.js");
const createRoute = require("./routes/createArticle.js");


//create base route
//send JSON array as response
app.get('/', (req, res) => res.send(blogpostsArray));

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);