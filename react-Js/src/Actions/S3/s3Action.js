import properties from '../../Containers/Utils/const';
import axios from "axios";
import { error5xx,clearStateValue } from "../Helpers/helper";
var fileDownload = require('react-file-download');

export function fileUpload(file) {
    const formData = new FormData();
    formData.append('uploadFile',file);
    formData.append('userId',localStorage.getItem('userId'));
	return (dispatch) => {
    var promise= new Promise(function(resolve,reject){
	    	axios.post(properties.fileUploadUrl,formData,
            {
              headers: {'content-type': 'multipart/form-data',
                        "Authorization":localStorage.getItem('jwtToken'),}
            }
			  ).then((result)=>
            {
              resolve(result.data);
              dispatch({type: 'S3_DATA',payload:result.data,fetching:false});
			 }).catch((err)=>
            {  
               reject('failure')
               dispatch(error5xx)
            })
      })
    return promise;
  }
}

export function  getSObjectList(){
 return (dispatch) => {
      dispatch({type: 'S3_Bucket_ObjectList',payload:[],fetching:true});
       axios.get(properties.sObjectUrl,{
              headers: {"Authorization":localStorage.getItem('jwtToken')}
       }).then((result)=>{
              dispatch({type: 'S3_Bucket_ObjectList',payload:result.data,fetching:false});
       }).catch((err)=>{  
            console.log(err)
            dispatch(error5xx)
       })
  }
}

export function downloadFile(folderNm){
  var fileNm=folderNm.file.split('/')[1];
  return (dispatch) => {
       axios.post(properties.downloadFileUrl,JSON.stringify(folderNm),{
            headers: {'content-type': 'application/json',
                      "Authorization":localStorage.getItem('jwtToken'),}
        }).then((result)=>
        {
          fileDownload(result.data, fileNm);
       }).catch((err)=>
            {  console.log(err)
               dispatch(error5xx)
            })
  }
} 


export function browsers3upload(serverData){
  return (dispatch) => {
       axios.post(properties.browseruploadUrl,serverData,{
            headers: {"Authorization":localStorage.getItem('jwtToken')}
        }).then((result)=>
        {
          dispatch({type: 'browsers3upload',payload:result.data,fetching:false});
        }).catch((err)=>{  
          console.log(err)
          dispatch(error5xx)
        })
  }
}

