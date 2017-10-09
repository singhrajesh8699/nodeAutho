let userId='';
let properties=require('../utils/properties');
let zyloSourceAuthQuery =require('../models/Sequelize/zyloSourceAuthQuery');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
	  properties.gdclientid,
	  properties.gdsecretKey,
	  properties.gdcallbackurl
	);

	google.options({
	  version: 'v2',	
	  auth: oauth2Client
	});

module.exports.oauth2Client=function(req,res){
	userId=req.body.userId;
	var scopes = [
	  'https://www.googleapis.com/auth/drive.file'
	];

	var url = oauth2Client.generateAuthUrl({
	  access_type: 'online',
	  scope: scopes,
	});
	res.send(JSON.stringify({ url:url}));
}

module.exports.oauth2Callback=function(req,res){
    var code=req.query.code;
    console.log(code);
    oauth2Client.getToken(code, function (err, tokens) {
	  if (err) {
	     res.send("Token not received")
	  }else{
	  	console.log('tokens :',tokens.access_token);
	  	var config={
	    	accessToken:tokens.access_token,
	        clientId:properties.gdclientid,
	        clientSecret:properties.gdsecretKey,
	        redirectUri:properties.gdcallbackurl
        }
	    var zyloData={
	    	source_type:'googledrive',
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
	  }
	});
}