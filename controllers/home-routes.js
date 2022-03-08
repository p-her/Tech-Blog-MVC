const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');


router.get('/', (req, res) => {
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
            
        })
})

router.get('/home',(req, res) =>{
  
    res.render('homepage')
})


router.get('/login',(req, res) => {
    res.render('login')
})


router.get('/signup',(req, res) => {
    res.render('signup')
})








module.exports = router;