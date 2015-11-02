/**
 * Created by williamjiang on 2015/5/6.
 */
var DataSourceModel = require('../models/DataSourceModel');

var DataSource = DataSourceModel.DataSource;



exports.createDS = function (req, res) {
    var reqDataSource = req.body;
    reqDataSource.create_time = Date.now();

    if (req.body.channelType == 'FTPInbound') {
        reqDataSource.channel = req.body.ftpInboundChannel;
        reqDataSource.channel.channel_type='FTPInbound';
    }


    if (req.body.channelType == 'FTPOutbound') {
        reqDataSource.channel = req.body.ftpOutboundChannel;
        reqDataSource.channel.channel_type='FTPOutbound';
    }

    if (req.body.channelType == 'EmailInbound') {
        reqDataSource.channel =req.body.emailInboundChannel;
        reqDataSource.channel.channel_type='EmailInbound';
    }

    if (req.body.channelType == 'EmailOutbound') {
        reqDataSource.channel = req.body.emailOutboundChannel;
        reqDataSource.channel.channel_type='EmailOutbound';
    }

    DataSource.create(reqDataSource,function (err, docu) {
        if (err) {
            console.log(err);
        } else {
            console.log('datasource:' + docu);
            res.json(docu);
        }
    });

};

exports.getAllDS = function (req, res) {
    DataSource.find({},{'transformer.xslt':0},function (error, docs) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        if (docs) {
            res.json(docs);
        }
    });
};

exports.getDSBySearchCon = function (req, res) {
    console.log(req.query.app_name);
    console.log(req.query.type);
    var con = {
        app_name: req.query.app_name
    };
    if (req.query.type) {
        con.type = req.query.type
    }
    ;

    DataSource.find(con,{'transformer.xslt':0},function (error, docs) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        if (docs) {
            console.log(docs);
            res.json(docs);
        }
    });

};


exports.getDSById = function (req, res) {
    var reqId = req.query.id;
    console.log('reqId:' + reqId);
    DataSource.find({'_id': reqId},{'transformer.xslt':0},function (error, doc) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        if (doc) {
            console.log('getDSById:' + doc);
            res.json(doc);
        }
    });
};

exports.removeDS = function (req, res) {
    var id = req.body._id;
    console.log("remove id:" + id);
    DataSource.remove({_id: id}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("remove datasource success");
            res.send("remove success");
        }
    });

};

exports.updateDS = function (req, res) {
    var reqDataSource=req.body;
    var id = req.body._id;
    if (req.body.channelType == "FTPInbound") {
        reqDataSource.channel=req.body.ftpInboundChannel;
        reqDataSource.channel.channel_type='FTPInbound';
    }

    if (req.body.channelType == "FTPOutbound") {
        reqDataSource.channel=req.body.ftpOutboundChannel;
        reqDataSource.channel.channel_type='FTPOutbound';
    }

    if (req.body.channelType == "EmailInbound") {
        reqDataSource.channel=req.body.emailInboundChannel;
        reqDataSource.channel.channel_type='EmailInbound';
    }

    if (req.body.channelType == "EmailOutbound") {
        reqDataSource.channel=req.body.emailOutboundChannel;
        reqDataSource.channel.channel_type='EmailOutbound';
    }
    reqDataSource.update_time=Date.now();

    DataSource.findByIdAndUpdate(id, {$set: reqDataSource}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("update datasource success");
            res.json(doc);
        }
    });

};

exports.getDataSourceCount = function (req, res) {
    DataSource.count(function (err, count) {
        if (err) {
            console.log(err);
        }
        res.send({'count': count});
    })

};

