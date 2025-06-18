const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Request = require('../models/Request');
const fs = require('fs');
const path = require('path');

router.get('', async (req, res) => {
    const locals = {
        title: "Portfolio",
        description: "This is my 3d-art portfolio"
    }

    try {
        const data = await Project.find();
        res.render('index', { locals, data});
    } catch (error) {
        console.log(error);
    }
});

router.get('/project/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Project.findById({ _id: slug });

    const locals = {
      name: data.name,
      description: "This is my 3d-art portfolio",
      hideHeader: true
    }

    res.render('project', { 
      locals,
      data
    });
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
    const locals = {
        title: "Contact",
        description: "Contact me!",
        hideHeader: true
    };
    res.render('contact', { locals
    });
});

router.get('/request-sent', (req, res) => {
    res.render('request-sent');
});

//create request
router.post('/contact', async (req, res) => {
    
    try {
        try {
            const { name, email, request } = req.body;
            const logMessage = `[${new Date().toISOString()}] Request from ${name} (${email}): ${request}\n`;
            const logFilePath = path.join(__dirname, '../logs/requests.log');

            fs.appendFile(logFilePath, logMessage, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            const newRequest = new Request({
                name: req.body.name,
                email: req.body.email,
                request: req.body.request
            });

            await Request.create(newRequest);
            console.log(req.body);
            res.redirect('/request-sent');

        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;