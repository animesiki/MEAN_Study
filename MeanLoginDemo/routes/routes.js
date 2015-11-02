/**
 * Created by williamjiang on 2015/5/6.
 */
var user=require('./user');


module.exports=function(app){

    app.post('/loginCheck',user.loginCheck);
    app.get('/allUser',user.allUser);
    app.post('/href',user.href);
    app.post('/nameCheck',user.nameCheck);
    app.post('/SignUp',user.SignUp);

}