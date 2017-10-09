import properties from '../../Containers/Utils/const';
import axios from "axios";
import { error5xx,clearStateValue } from "../Helpers/helper";

export const LOGIN_DATA = "LOGIN_DATA";

function loginDataDispatch(data) {
  return {
    type: LOGIN_DATA,
    payload: {data: data, fetching: false}
  }
}

export function validateLoginData(loginData) {
  return (dispatch) => {
    var promise= new Promise(function(resolve,reject){
    		axios.post(properties.loginUrl,JSON.stringify(loginData),
                {
                  headers:{"Content-Type":"application/json",
                          "Authorization":localStorage.getItem('jwtToken'),}
                }).then((result)=>
                {
                  localStorage.setItem('jwtToken',result.data.token);
                  resolve(result.data);
                  dispatch(loginDataDispatch(result.data));
                }).catch((err)=>
                {  
                   if(err.response.status === 502)
                   {
                     dispatch(error5xx)
                     reject('502 bad request! server under maintenance')
                   }else{
                    reject('failure')
                   }
                })
	  })
    return promise;
  }
}


export function addFlashMessage(message){
    return (dispatch) =>{
      dispatch({
        type:"error",
        payload:message
      })
    }
}