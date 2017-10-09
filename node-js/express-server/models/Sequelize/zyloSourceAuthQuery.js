var Model = require('./models');

module.exports.insert=function(zyloData){
 return Model.zyloSourceAuthTable.sync({force: false}).then(function () {
	return  Model.zyloSourceAuthTable.create(zyloData).then(function(){
		      console.log("zyloSourceAuth record inserted")
		      return true;
		    }).catch(function(error) {
		        console.log(error)
		        return false;
	 })
  }) 
};