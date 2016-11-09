var express = require('express');
var User = require('../models/users');
var Profile = require('../models/profiles');
var router = express.Router();


router.post('/login',function(req,res){
   User.find({username:req.body.username,password:req.body.password},function(err,user){
       if(err) {
        console.log(err); 
      }
      if (!err && user !== null&&user.length>0) {
          console.log(user);
        Profile.find({uname:user[0].username},function(err,profileObj){
            if(err) {
                console.log(err); 
            }
            res.send(profileObj);
        });
      } else{
        res.send(null);
      }
   });
   
});


router.post('/register',function(req,res){
   console.log(req);
   User.find({username:req.body.uname},function(err,user){
       if(err) {
        console.log(err); 
      }
      if(user.length==0){
         var userSave=new User({username:req.body.uname,password:req.body.password});
         userSave.save(function(err,save){
            if(err){
                console.log(err);
            }
            var profileSave=new Profile({fname:req.body.fname,lname:req.body.lname,uname:req.body.uname});
            profileSave.save(function(err,save){
                if(err){
                    console.log(err);
                }
                res.send(true);
            });
         });
      }else{
          res.send(false);
      }
   });
   
});


module.exports = router;
