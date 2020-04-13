const express = require("express");

const router = express.Router();

//require firebase
const firebase = require("firebase");

//init firestore database
const db = firebase.firestore();
//create empty array

//reference to collections
const blogposts = db.collection("blogposts");

router.get("/", (req,res) => {
    const blogpostsArray = [];
    //get blogposts
    blogposts
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //push document into array everytime the query loops over existing articles
            blogpostsArray.push(doc.data());
        });
        return res.send(blogpostsArray);
    })
    .catch(function (error) {
          console.log("Error:", error);
          return res.send(error);
    });
});

module.exports = router;