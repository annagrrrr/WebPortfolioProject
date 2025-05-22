const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('', async (req, res) => {
    const locals = {
        title: "Portfolio",
        description: "This is my 3d-art portfolio"
    }

    try {
        const data = await Project.find();
        res.render('index', { locals, data });
    } catch (error) {
        console.log(error);
    }
});

// function insertProjectData () {
//     Project.insertMany([
//         {
//             name: "Project 2",
//             description: "Second project using blender.",
//             images: "/img/background-apps.png"
//         },
//     ])
// }
// insertProjectData();

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;