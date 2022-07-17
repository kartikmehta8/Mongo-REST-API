"strict mode";
const express = require("express");

/* Importing the Schema. */
const Post = require("../models/Post");

const router = express.Router();

/*
ROUTE: /posts
TYPE: GET
DETAIL: Sends all the Posts after fetching from the database to the ROUTE.
*/
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

/*
ROUTE: /posts/id
TYPE: GET
DETAIL: Sends the Post of ID(id) after fetching from the database to the ROUTE.
*/
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

/*
ROUTE: /posts
TYPE: POST
DETAIL: Captures the information from the body and saves it into the database.
*/
router.post("/", (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    post.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.json({ message: err }));
});

/*
ROUTE: /posts/id
TYPE: UPDATE/PATCH
DETAIL: Updates the information of ID(id) post and saves it into the database.
*/
router.patch("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                },
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

/*
ROUTE: /posts/id
TYPE: DELETE
DETAIL: Deletes the information of ID(id).
*/
router.delete("/:id", (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((data) => {
            res.json({ message: data });
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
