var Model = require('./models');

module.exports.validateUser=function(req,res){
   Model.User.findAll({
       where: {
           username: req.body.username,
        }
    }).then(function(result) {
    	if(result.length==0){
          res.send(JSON.stringify({"uniquser":true}));
    	}else{
    	  res.send(JSON.stringify({"uniquser":false}));
    	}
    }).catch(function(err){
    	console.log(err)
    	res.send(JSON.stringify({"error":"database error"}));
    });
};

module.exports.validateEmail=function(req,res){
   Model.User.findAll({
       where: {
           email: req.body.email,
        }
    }).then(function(result) {
    	if(result.length==0){
        res.send(JSON.stringify({"uniqemail":true}));
    	}else{
    	  res.send(JSON.stringify({"uniqemail":false}));
    	}
    }).catch(function(err){
    	console.log(err)
    	res.send(JSON.stringify({"error":"database error"}));
    });
};


exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
        Model.User.findAll({
          where: {
              username: req.body.username,
            }
          }).then(function(result) {
              
            if(result.length==0){
                res.send(JSON.stringify({allow:false}));
            }else{
              result.map(function(record){
                if(roles.indexOf(record.roles) > -1){
                  res.send(JSON.stringify({allow:true}));
                }else{
                  res.send(JSON.stringify({allow:false}));
                }
              })
            }
          }).catch(function(err){
            console.log(err)
            res.send(JSON.stringify({"error":"database error"}));
          });
    }
}