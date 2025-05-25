const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Request = require('../models/Request');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const mainLayout = '../views/layouts/main';
const jwtSecret = process.env.JWT_SECRET;


//check login
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        return res.status(401).json({ message: 'Unauthorized'});
    }
}


//login page
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "This is my 3d-art portfolio"
        }

        res.render('admin/index', { locals, layout: mainLayout });
    } catch (error) {
        console.log(error);
    }
});

//requests page
router.get('/requests', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "This is my 3d-art portfolio"
        }
        const data = await Request.find();
        res.render('admin/requests', { locals, data, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});

//check credentials
router.post('/admin', async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret )
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

//admin dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
    
    try {
        const locals = {
            title: 'Dashboard',
            description: 'This is my 3d-art portfolio'
        }

        const data = await Project.find();
        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }
});

//admin new project create
router.get('/add-project', authMiddleware, async (req, res) => {
    
    try {
        const locals = {
            title: 'Add project',
            description: 'This is my 3d-art portfolio'
        }

        const data = await Project.find();
        res.render('admin/add-project', {
            locals,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }
});

//post create proj
router.post('/add-project', authMiddleware, async (req, res) => {
    
    try {
        try {
            const newProject = new Project({
                name: req.body.name,
                description: req.body.description,
                cover: req.body.cover
                //add images
            });

            await Project.create(newProject);
            res.redirect('/dashboard');

        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
});

//edit project
router.get('/edit-project/:id', authMiddleware, async (req, res) => {
  try {

    const locals = {
      title: "Edit project",
      description: "This is my 3d-art portfolio",
    };

    const data = await Project.findOne({ _id: req.params.id });

    res.render('admin/edit-project', {
      locals,
      data,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error);
  }

});


//edit project put
router.put('/edit-project/:id', authMiddleware, async (req, res) => {
    
    try {
        await Project.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            cover: req.body.cover
        });

        res.redirect(`/edit-project/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
});

//delete project
router.delete('/delete-project/:id', authMiddleware, async (req, res) => {
    try {
        await Project.deleteOne( { _id: req.params.id } );
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
});

//delte request
router.delete('/delete-request/:id', authMiddleware, async (req, res) => {
    try {
        await Request.deleteOne( { _id: req.params.id } );
        res.redirect('/requests');

    } catch (error) {
        console.log(error);
    }
});

//log out
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})
// router.post('/admin', async (req, res) => {
//     try {

//         const { username, password } = req.body;
//         console.log(req.body);
//         res.redirect('/admin');
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         try {
//             const user = await User.create({ username, password: hashedPassword })
//             res.status(201).json({ message: 'User Created', user })
//         } catch (error) {
//             if(error.code === 11000) {
//                 res.status(409).json({ message: 'User already in use'});
//             }
//             res.status(500).json({ message: 'Internal server error' })
//         }

//     } catch (error) {
//         console.log(error);
//     }
// });

module.exports = router;
