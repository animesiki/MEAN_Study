/**
 * Created by williamjiang on 2015/5/6.
 */
var path = require('path');
var UsersModel=require('../model/UsersModel');

var User=UsersModel.User;



exports.loginCheck=function(req,res){
    console.log("request:"+req);
    console.log("request body:"+req.body);

    var name=req.body.name;
    var password=req.body.password;
    console.log(name);
    User.findOne({name:name,password:password},function(error,doc){
        if(error){
            console.log(error);
            res.send(error);
        }
        if(doc){
            console.log(doc);
            res.send({redirect: '/index',user:doc});
        }

    });


};




exports.allUser=function(req,res){
    User.find({},{name:1,password:1,email:1,_id:1},function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log(result);
        res.json(result);
    });
};

exports.href=function(req,res){
    var ident=req.body.ident;
    console.log(ident);
    if(ident=="signup"){
        res.send({redirect:"/signup"});
    }else{
        res.send({redirect:"/login"});
    }
};


exports.nameCheck=function(req,res){
    console.log("request:"+req);
    console.log("request body:"+req.body);

    var name=req.body.name;
    console.log(name);
    User.findOne({name:name},function(error,doc){
        if(error){
            console.log(error);
            res.send(error);
        }
        console.log(doc);
        if(doc){
            res.send({hint:"name exist"});
        }else{
            res.send({hint:"correct"});
        }

    });

};



exports.SignUp=function(req,res){
    console.log("request:"+req);
    console.log("request body:"+req.body);

    var name=req.body.name;
    var password=req.body.password;
    var email=req.body.email;
    console.log(name);
    User.create({name:name,password:password,email:email},function(error,doc){
        if(error){
            console.log(error);
            res.send(error);
        }
        if(doc){
            console.log(doc);
            res.send({hint:"Sign up success, pls login",redirect:"/login"});
        }

    });

};