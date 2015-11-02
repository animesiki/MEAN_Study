/**
 * Created by JIANGWI on 5/22/2015.
 */
var fs = require('fs');
var DataSourceModel = require('../models/DataSourceModel');
var DataSource = DataSourceModel.DataSource;
var path = require('path');


exports.downloadFile = function (req, res) {
    var dataSourceId = req.query.id;
    var dataSource;
    //find datasource transformer and xslt
    DataSource.findOne({_id: dataSourceId}, function (error, doc) {
        if (error) {
            console.log(error);
        }
        dataSource = doc;
        var xsltBuffer =dataSource.transformer.xslt;
        var xsltName =dataSource.transformer.xslt_name;
        res.attachment(xsltName);
        res.write(xsltBuffer);
        res.end();
    });


};