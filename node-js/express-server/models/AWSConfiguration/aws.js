var AWS = require('aws-sdk');
var zlib     = require('zlib');
var streamingS3 = require('streaming-s3');
var properties=require('../../utils/properties');

try{
AWS.config.update({ accessKeyId: properties.accessKeyId, 
	secretAccessKey: properties.secretAccessKey});
AWS.config.region = 'eu-west-1';

var AwsKey={accessKeyId: properties.accessKeyId, secretAccessKey: properties.secretAccessKey}

module.exports.AWS=AWS;

module.exports.AwsKey=AwsKey;
}catch(err){
	console.log(err)
}