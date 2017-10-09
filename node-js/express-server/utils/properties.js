
let databaseInfo;
let accessKeyId;
let secretAccessKey;
let bucketName;
let sfcallbackUrl;
let gdcallbackUrl;
let dbcallbackUrl;
let odcallbackUrl;
let sfclientid;
let sfsecretkey;

var DEPLOYMENT_TYPE = process.env.DEPLOYMENT_TYPE;
console.log('DEPLOYMENT_TYPE', DEPLOYMENT_TYPE);

if (DEPLOYMENT_TYPE == "prod") {
	databaseInfo = 'postgres://postgres:zylotech@localhost:5432/zylotech';
	sfcallbackUrl='https://sftp-back.zylotech.com/salesforceauth';
    accessKeyId='AKIAJOQR32K6VQ6DR7KA';
    secretAccessKey='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';
    bucketName='internalapp';
    gdcallbackUrl='https://sftp-back.zylotech.com/googledrive';
    dbcallbackUrl='https://sftp-back.zylotech.com/dropboxauth';
    odcallbackUrl='https://sftp-back.zylotech.com/onedriveauth';
    sfclientid='3MVG9d8..z.hDcPJZTeC3ZMSU6S80KnrJTqXOq1wev_IzwOMpnSEwZZI3tPFu2fcPiBCNxfH9Sp3ub1fQhtWN';
    sfsecretkey='8156536948963593088';
} else {
	databaseInfo = 'postgres://rajesh:rajesh@localhost:5432/rajesh';
	sfcallbackUrl='http://localhost:8080/salesforceauth';
    accessKeyId='AKIAJKESL7HTU6HA2BQQ';
    secretAccessKey='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';
    bucketName='prudhvitest';
    gdcallbackUrl='http://localhost:8080/googledrive';
    dbcallbackUrl='http://localhost:8080/dropboxauth';
    odcallbackUrl='http://localhost:8080/onedriveauth';
    sfclientid='3MVG9d8..z.hDcPJZTeC3ZMSU6cQPEGiiKIDThVps27T0EMzF1daJKVoFsi1bAk0hs70ZVoBkoMFZrPiu59Db';
    sfsecretkey='4040975969475467807';
}

module.exports ={
	secretKey: "r2a9j1e1s1h9s9i3ngh",
    databaseInfo: databaseInfo,
    bucketName:bucketName,
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey,
    saleforcelogin:'https://login.salesforce.com',

    sfcallbackUrl:sfcallbackUrl,
    sfclientid:sfclientid,
    sfsecretkey:sfsecretkey,

    gdcallbackurl:gdcallbackUrl,
    gdclientid:'337866883611-318ttm2qmls8t43v3h3jlv8slotdv45k.apps.googleusercontent.com',
    gdsecretKey:'cSyysbCMw0bR2OtYalTVOs1i',

    dbcallbackurl:dbcallbackUrl,
    dbclientid:'jmawfifbdf3y79v',
    dbsecretKey:'ckfj2tv5rao3hjh',

    odcallbackurl:odcallbackUrl,
    odclientid:'e42f7594-5162-403a-9ca1-56d879cc7cc1',
    odsecretKey:'a28AD6iFZEvKty2h9bjijMe',
}
