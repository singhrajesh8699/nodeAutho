
let URL;

//URL = 'http://sftp-back.zylotech.com'
URL = 'http://localhost:8080';


const properties={
	loginUrl: URL + '/login',
	renderSignUpUrl: URL + '/rendersignup',
	signupUrl: URL + '/signup',
	validateUsername: URL + '/validateusername',
	validateEmail: URL + '/validateemail',
    dashBoadRecordUrl: URL + '/dashBoadRecord',
    fileUploadUrl: URL + '/uploadFile',
    'sObjectUrl': URL + '/sobjectlist',
    'downloadFileUrl': URL + '/downloadfile',
    'browseruploadUrl':URL+'/browsers3upload',
    'salesforce': URL + '/salesforcelogin',
    'eloqua': URL + '/eloqualogin',
    'googledrive': URL + '/googledrivelogin',
    'dropbox': URL + '/dropboxlogin',
    'onedrive': URL + '/onedrivelogin',
}

export default properties;
