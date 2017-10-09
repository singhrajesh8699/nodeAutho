var crypto = require('crypto'),
    request = require('request'),
	url = require('url');
var express = require('express');
var app = express();
let userId='';
let properties=require('../utils/properties');
let zyloSourceAuthQuery =require('../models/Sequelize/zyloSourceAuthQuery');

module.exports.dropboxClient=function (req, res) {
	userId=req.body.userId;
	res.send(JSON.stringify({ url:url.format({
		protocol: 'https',
		hostname: 'www.dropbox.com',
		pathname: '1/oauth2/authorize',
		query: {
			client_id: properties.dbclientid,
			response_type: 'code',
			redirect_uri: properties.dbcallbackurl
		}
	})}));
}

module.exports.dropboxCallBack=function (req, res) {

	if (req.query.error) {
		return res.send('ERROR ' + req.query.error + ': ' + req.query.error_description);
	}
	// exchange access code for bearer token
	request.post('https://api.dropbox.com/1/oauth2/token', {
		form: {
			code: req.query.code,
			grant_type: 'authorization_code',
			redirect_uri: properties.dbcallbackurl
		},
		auth: {
			user: properties.dbclientid,
			pass: properties.dbsecretKey
		}
	}, function (error, response, body) {
		var data = JSON.parse(body);
		if (data.error) {
			return res.send('ERROR: ' + data.error);
		}

		// extract bearer token
		var token = data.access_token;
        console.log(data.access_token)

        var config={
	    	accessToken:data.access_token,
	        clientId:properties.dbclientid,
	        clientSecret:properties.dbsecretKey,
	        redirectUri:properties.dbcallbackurl
        }
	    var zyloData={
	    	source_type:'dropbox',
	    	config:config,
	    	status:1,
	    	client_id:userId
	    }
	    var status=zyloSourceAuthQuery.insert(zyloData);
	    if(status){
	    	res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('Documents are shared successfully to zylotech');
			res.end();
	    }else{
	        res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('Something Broken!');
			res.end();
	    }
	});
}