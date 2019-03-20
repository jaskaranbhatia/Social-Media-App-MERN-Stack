const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post Validation
const validatePostInput = require('../../validation/post');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

router.get('/test',(req,res)=>{
    res.json({
        msg : "Posts Works"
    });
});


//Delete a post request private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user : req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post => {
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized : 'User not authorized'});
            }
            post.remove()
            .then(()=>res.json({success : true}))
            .catch(err => res.status(404).json({postnotfound:'Post not found'}));
        })
    })  
});


//route to get single post by id
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostfound : 'No post found with that id'}));
});


//Get route for posts public
router.get('/',(req,res)=>{
    Post.find().sort({date : -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});


//@Create a post private route
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);

    if(!isValid){
        //if any errors
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text : req.body.text,
        name : req.body.name,
        avatar: req.body.avatar,
        user : req.user.id
    });

    newPost.save().then(post => res.json(post));
});


//Like a post request private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user : req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({alreadyliked : 'user already liked the post'});
            }
            post.likes.unshift({user:req.user.id});
            
            post.save()
            .then(post => res.json(post));
        })
    })  
});


//UnLike a post request private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user : req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({notliked : 'user has not liked the post'});
            }
           const removeIndex = post.likes
           .map(item=>item.user.toString())
           .indexOf(req.user.id)

           post.likes.splice(removeIndex,1);
           post.save().then(post => res.json(post));
        })
    })  
});


//Add a comment route private
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);

    if(!isValid){
        //if any errors
        return res.status(400).json(errors);
    }
    
    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text : req.body.text,
            name : req.body.name,
            avatar : req.body.avatar,
            user : req.user.id
        }

        post.comments.unshift(newComment);

        post.save()
        .then(post => res.json(post));
    })
    .catch(err=>res.status(404).json({nopostfound:'no post found'}));
});


//Delete a comment route private

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);

    if(!isValid){
        //if any errors
        return res.status(400).json(errors);
    }
    
    Post.findById(req.params.id)
    .then(post => {
        //Check to see if comment exists
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
            return res.status(404).json({commentdoesnotexists : 'Comment does not exists'});
        }

        const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex,1);
        post.save()
        .then(post=>res.json(post));
    })
    .catch(err=>res.status(404).json({nopostfound:'no post found'}));
});




module.exports = router;