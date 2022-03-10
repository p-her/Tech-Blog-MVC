const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  
    res.render('homepage');
})
router.get('/home', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (req.session.loggedIn) {
                res.redirect('/');
                return;
            }
            
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/post/:id',(req, res) =>{
  
   Post.findOne({
       where: {
           username: req.params.username
       },
       attributes: [
           'id',
           'title',
           'post_content',
           'created_at'
       ],
       include: [
           {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
               include:{
                   model: User,
                   attributes: ['username']
               }
           }
       ]
   })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id '});
            return;
        }
        const post = dbPostData.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.get('/login',(req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login')
})




router.get('/signup',(req, res) => {
    res.render('signup')
})




module.exports = router;