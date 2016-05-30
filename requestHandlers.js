/**
 * Created by asistent on 30.05.2016.
 */

var querystring = require("querystring"),
    fs = require('fs'),
    formidable = require("formidable");

exports.start = function (res) {
    console.log("Request handler 'start' was called.");

    var body = '<html><head>' +
        '<meta http-equiv="CONTENT-TYPE" content="text/html; charset=UTF-8">' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file">' +
        '</form>' +
        '</body>' +
        '</html>';

    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
    res.write(body);
    res.end();
};

exports.upload = function (res, req) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = '.';
    console.log("about to parse");
    form.parse(req, function (err, fields, files) {
        console.log("parsing done");
        if (files.upload) {
            fs.rename(files.upload.path, "/tmp/test.png", function (err) {
                if (err) {
                    fs.unlink("/tmp/test.png");
                    fs.rename(files.upload.path, "/tmp/test.png");
                }
            });
            res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
            res.write("received image: <br>");
            res.write("<img  src='/show'>");
            res.end();
        } else {
            res.writeHead(302, {'Location': '/'});
            res.end();
        }

    });
};

exports.show = function (res) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function (err, file) {
        if(err) {
            res.writeHead(500, {"Content-type": "text/plain"});
            res.write(err + '\n');
            res.end();
        } else {
            res.writeHead(200, {"content-Type": "image/png"});
            res.write(file, "binary");
            res.end();
        }
    })
};