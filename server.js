/**
 * Created by asistent on 29.05.2016.
 */

var http = require('http'),
    url = require('url'),
    PORT = 8080;

exports.start = function (route, handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('request for ' + pathname + ' received.');
        route(handle, pathname, res, req);
    }).listen(PORT, function () {
        console.log("listen port http://localhost:" + PORT);
    });
};