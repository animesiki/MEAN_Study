/**
 * Created by williamjiang on 2015/5/6.
 */
var user = require('./user');
var datasource = require('./datasource');
var dmtpApp = require('./dmtpApp');
var upload = require('./uploadFile');
var download = require('./downloadFile');


module.exports = function (app) {
    //app.get('/login',user.showLoginPage);
    app.post('/loginCheck', user.loginCheck);
    app.get('/logOut', user.logOut);
    app.get('/getAllApps', dmtpApp.getAllApps);
    app.get('/getAppCount', dmtpApp.getAppCount);
    app.get('/getAllDS', datasource.getAllDS);
    app.get('/searchDSByCon', datasource.getDSBySearchCon);
    app.post('/createDS', datasource.createDS);
    app.post('/updateDS', datasource.updateDS);
    app.get('/getDSById', datasource.getDSById);
    app.post('/removeDS', datasource.removeDS);
    app.get('/getDataSourceCount', datasource.getDataSourceCount);
    app.post('/uploadFile', upload.uploadFile);
    app.get('/downloadFile', download.downloadFile);
}
