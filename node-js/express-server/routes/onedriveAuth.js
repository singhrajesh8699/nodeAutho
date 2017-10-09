let userId='';
let properties=require('../utils/properties');
let zyloSourceAuthQuery =require('../models/Sequelize/zyloSourceAuthQuery');
var ClientOAuth2 = require('client-oauth2')

var githubAuth = new ClientOAuth2({
  clientId: properties.odclientid,
  clientSecret: properties.odsecretKey,
  accessTokenUri: 'https://login.live.com/oauth20_token.srf',
  authorizationUri: 'https://login.live.com/oauth20_authorize.srf',
  redirectUri: properties.odcallbackurl,
  scopes:['wl.offline_access,onedrive.readwrite']
})


module.exports.onedriveClient=function(req,res){
  userId=req.body.userId;
  var url= githubAuth.code.getUri()
  res.send(JSON.stringify({ url:url}));
}

module.exports.onedriveCallBack=function(req,res){
   githubAuth.code.getToken(req.originalUrl)
    .then(function (user) {
       /* user.refresh().then(function (updatedUser) {
        console.log(updatedUser !== user) 
        console.log("updatedUser",updatedUser)
      })
 
      user.sign({
        method: 'get',
        url: 'https://login.live.com'
      })*/
      console.log(user.accessToken)
      var config={
          accessToken:user.accessToken,
          clientId:properties.odclientid,
          clientSecret:properties.odsecretKey,
          redirectUri:properties.odcallbackurl
        }
      var zyloData={
        source_type:'onedrive',
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

    })
}
