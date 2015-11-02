/**
 * Created by JIANGWI on 5/22/2015.
 */
var fs = require('fs');

exports.uploadFile = function (req, res) {
    var file = req.files.file;
    var path = file.path;
    var fileName = file.originalname;

    fs.readFile(path, function (error, data) {
        if (error) {
            console.log(error);
        }
        res.send({'content': data, 'xsltName': fileName});
    });

};