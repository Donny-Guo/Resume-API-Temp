const express = require("express"); // import express
const router = express.Router(); // instantiate the router
const { Experiences } = require("../database/experience"); // import experience.js
let experiences = [];


router.use("/", (req, res, next) => {
    console.log("This is a middleware within /api");
    next();
});

router.get("/intro", (req, res) => {
    // take a json object, convert it to a json-like string
    // then send it to our client with the status code of 200 (OK)
    res.status(200).json({
        name: "Dongping Guo",
        university: "Cal State East Bay",
        major: "Computer Science",
    })
});

router.get("/experiences", async(_, res) => {
    // through Experiences model, find all experiences within the experiences collection
    // the object passed within the find() method is the query object
    await Experiences.find({})
        .then((experiences) => res.status(200).json({message: experiences, ok: true}))
        .catch((err) => res.status(500).json({message: err, ok: false}))
});

router.put("/:id", (req, res) => {
    const expIndex = parseInt(req.params.id);

    if (expIndex >= 0 && expIndex < experiences.length) {
        // update the experience at the found index
        experiences[expIndex] = {...experiences[expIndex], ...req.body};
        res.status(200).json({message: "Experiences updated successfully"});
    } else {
        res.status(404).json({message: "Experiences not found"});
    }
});

router.delete("/:id", (req, res) => {
    const expIndex = parseInt(req.params.id);
    if (expIndex >= 0 && expIndex < experiences.length) {
        // delete one experience at found index
        experiences.splice(expIndex, 1);
        res.status(200).json({message: "Experience deleted successfully"});
    } else {
        res.status(404).json({message: "Experience not found"});
    }
});

router.post("/experiences", (req, res) => {
    const newExperience = req.body;
    experiences.push(newExperience);
    res.status(201).json({message: "New job was added!"});
});

module.exports = router;