var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: __dirname+'/uploads/' });
var streamingS3 = require('streaming-s3');
var zlib = require('zlib');
var AWS = require('aws-sdk');
var aws =require('../models/AWSConfiguration/aws')
var logger = require("../logger");
var rimraf = require('rimraf');
var s3 = new aws.AWS.S3();
var properties=require('../utils/properties.js');
var CryptoJS = require("crypto-js");



function uploadFile(readerStream,file,fileObject,count,req,res){
  var fileName=fileObject.originalname;	
  var ContentType=fileObject.mimetype//'text/plain';
  if(file.match(/\.(log)$/))
	{ 
	  fileName=file;
	  ContentType='text/plain';	
	}
  var dt = new Date();
  var currDat = dt.toUTCString();
  var uploader=new streamingS3(readerStream, {accessKeyId: properties.accessKeyId, secretAccessKey:properties.secretAccessKey },
	  {
	    Bucket: properties.bucketName,
	    Key: fileObject.originalname.split('.')[0]+' '+currDat+'/'+fileName,
	    ContentType:ContentType
	  });
 	uploader.begin();
	uploader.on('finished', function (resp, stats) {
	  if(count==2){
	      res.writeHead(200, {'Content-Type': 'text/html'});
		  res.write("successfully upload");
	      res.end(); 
	    } 	
	  if(!file.match(/\.(log)$/)){ 
		  var dashBoardData={
	   	  	userId:req.body.userId,
	   	  	fileName:fileObject.originalname,
	   	  	source:"Flat File",
	   	  	destination:"ZyloTech Platform",
	   	  	date:currDat,
	   	  	size:fileObject.size+'bytes',
	   	  	status:"Upload"
	   	  }
	   	  var dashBoard = require('../models/Sequelize/insertDashBoard.js');  
	   	  dashBoard.insertDashBoard(dashBoardData);
   	  }
      fs.unlink(__dirname+'/uploads/'+file)
	  logger.debug("successfully upload file :",fileName);
	    
	});
	uploader.on('error', function (e) {
	  console.log('Upload error: ', e);
	  logger.debug("error while uploading file :",fileObject.originalname);
	  logger.debug("Error",e);
	  fs.unlink(__dirname+'/uploads/'+file)
	  rimraf(__dirname+'/uploads', function () { console.log('done'); });
	 });
}
 
function uploadCallBack(fileObject,filename){
  return new Promise(function(resolve,reject){
	logger.info("successfully upload file :",fileObject.originalname,function (err, level, msg, meta) {
		resolve('success')
	});
  })	 
}

module.exports.s3upload = function (req, res, next) {
	
    if (!req.file){
    	    logger.debug("No files were uploaded")
      return res.status(400).send('No files were uploaded.');
    } 
    let fileObject = req.file;
    var filename=fileObject.originalname.split("."); 
	uploadCallBack(fileObject,filename).then(function(resolve){
	  fs.readdir(__dirname+'/uploads', (err, files) => {
		logger.debug("readdirSync",err);
        if(!files || files.length === 0) {
        	rimraf(__dirname+'/uploads', function () { console.log('done'); });
		    console.log('provided folder'+ __dirname+'/uploads'+'is empty or does not exist.');
		    logger.debug('provided folder'+ __dirname+'/uploads'+'is empty or does not exist.');
		    return res.status(400).send('provided folder'+ __dirname+'/uploads'+'is empty or does not exist.');
		   }
		var count=1;  
		files.forEach(function (file){
			
	        var readerStream = fs.createReadStream(__dirname+'/uploads/'+file);
		    uploadFile(readerStream,file,fileObject,count++,req,res);
	    })
	   	
	  }) 
	}).catch(function(err){
		logger.debug("uploadCallBack",err);
	})
	 
};

module.exports.getSObjectList=function(req,res){
	var params = {Bucket: properties.bucketName};
	s3.listObjects(params, function(err, data) {
	   if (err) console.log(err, err.stack); 
	   else {
	   	   res.send(data.Contents);
	    }   
    })
}

module.exports.s3download=function(req, res){
    var folder= req.body.file;
    var fileNm=folder.split('/')[1];
    var params = {Bucket: properties.bucketName, Key:folder};

    var stream= s3.getObject(params);
		stream.createReadStream().pipe(res);
		stream.on('error', function(err){
		    logger.debug("stream Error",err);
	    });
		stream.on('finish', function(){
		    logger.debug("File successfully Download :", fileNm);
		});

    s3.listObjects({Bucket: properties.bucketName}, function(err, data) {
	   	var bucketList=data.Contents;
        var currDat = new Date().toUTCString();
	   	bucketList.map(function(data){
	   		if(data.Key==folder){
	   	      var dashBoardData={
		   	  	userId:req.body.userId,
		   	  	fileName:fileNm,
		   	  	source:"Zylotech Platform",
		   	  	destination:"Local System",
		   	  	date:currDat,
		   	  	size:data.Size+'bytes',
		   	  	status:"Download"
		   	  }
	   	      var dashBoard = require('../models/Sequelize/insertDashBoard.js');  
	   	      dashBoard.insertDashBoard(dashBoardData);
	   		}
	   	})
	   	 
    })
    
};


module.exports.browserUpload=function(req,res){
 console.log(req.body)
 var filename=req.body.filename;
 var filetype=req.body.filetype  
 var params = {
    Bucket: properties.bucketName,
    Key: filename,
    ContentType: filetype,
    ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', params, function(err, data) {
    	if(err){
    	  console.log(err)	
    	  res.send(JSON.stringify({serverdata:'something broke'}));
    	}else{
    	  console.log(data)
    	  res.send(data);
    	}
    });
}

/*function xamzDate(d){
	var mm=(d.getUTCMonth()+1)<=9?'0'+d.getUTCMonth()+1:d.getUTCMonth()+1;
	var dd=(d.getUTCDate()<=9)?'0'+d.getUTCDate():d.getUTCDate();
	var hh =(d.getUTCHours()<=9)?'0'+d.getUTCHours():d.getUTCHours();
	var mn=(d.getUTCMinutes()<=9)?'0'+d.getUTCMinutes():d.getUTCMinutes();
	var ss=(d.getUTCSeconds()<=9)?'0'+d.getUTCSeconds():d.getUTCSeconds();
	var dt=d.getUTCFullYear()+''+mm+''+dd+'T'+hh+''+mn+''+ss+'Z';
	return dt.toString();
}

function awscredential(AWSAccessKeyId,date){

	return AWSAccessKeyId+'%2F'+date+'%2Fus-east-1%2Fs3%2Faws4_request';
}

function signkey(secretKey,date){
  return CryptoJS.HmacSHA256(CryptoJS.HmacSHA256(CryptoJS.HmacSHA256(CryptoJS.HmacSHA256("AWS4" + secretKey,date),"us-east-1"),"s3"),"aws4_request")
}

function stringtosign(xamzalgo,xamzdate,awsCredential,secretKey){secretKey
  return xamzalgo+xamzdate+xamzdate.split('T')[0]+'%2Fus-east-1%2Fs3%2Faws4_request'+secretKey;
}

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

 var AWSAccessKeyId='AKIAJKESL7HTU6HA2BQQ';
 var secretKey='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';
 var d=new Date;
 var xamzdate=xamzDate(d);
 var xamzalgo="AWS4-HMAC-SHA256";
 var awsCredential=awscredential(AWSAccessKeyId,xamzdate.split('T')[0]);
 var signKey=signkey(secretKey,xamzdate.split('T')[0]);
 var stringToSign=stringtosign(xamzalgo,xamzdate,awsCredential,secretKey);
 console.log(CryptoJS.HmacSHA256(signKey,stringToSign))
 var awsignature=toHex(CryptoJS.HmacSHA256(signKey,stringToSign));

 var serverData={
 	AWSAccessKeyId:AWSAccessKeyId,
 	secretKey:secretKey,
 	xamzdate:xamzdate,
 	xamzalgo:xamzalgo,
 	awsCredential:awsCredential,
 	signKey:signKey,
 	stringToSign:stringToSign,
 	awsSignature:awsignature
 }
*/

