import properties from '../../Containers/Utils/const';
import axios from "axios";
import { error5xx,clearStateValue } from "../Helpers/helper";

export const REGISTER_DATA = "REGISTER_DATA";

function registerDataDispatch(data) {
  return {
    type: REGISTER_DATA,
    payload: {data: data, fetching: false}
  }
}

export function registerData(registerData) {
   return (dispatch) => {
    dispatch(registerDataDispatch(registerData));
  }
}

export function validateUserName(serverData) {
	 return (dispatch) => {
      axios.post(properties.validateUsername,JSON.stringify({username:serverData.username}),
            {
              headers:{"Content-Type":"application/json",
                      "Authorization":localStorage.getItem('jwtToken'),}
            }
        ).then((result)=>
            {
              console.log(result.data)
              serverData.uniquser=result.data.uniquser;
              dispatch(registerDataDispatch(serverData));
        }).catch((err)=>
            {  
              console.log(err)
              dispatch(error5xx)
            })
  }
}

export function validateEmail(serverData) {
   return (dispatch) => {
      axios.post(properties.validateEmail,JSON.stringify({email:serverData.email}),
            {
              headers:{"Content-Type":"application/json",
                      "Authorization":localStorage.getItem('jwtToken'),}
            }
        ).then((result)=>
            {
              console.log(result.data)
              serverData.uniqemail=result.data.uniqemail;
              dispatch(registerDataDispatch(serverData));
        }).catch((err)=>
            {  
              console.log(err)
              dispatch(error5xx)
            })
  }
}

export function sendRegistrationData(serverData) {
	return (dispatch) => {
          dispatch({type: REGISTER_DATA,payload: {data: serverData, fetching: true}});
	    	axios.post(properties.signupUrl,JSON.stringify(serverData),
            {
              headers:{"Content-Type":"application/json",
                      "Authorization":localStorage.getItem('jwtToken'),}
            }
			  ).then((result)=>
            {
              console.log(result.data)
              serverData.insert=result.data.insert;
			        dispatch(registerDataDispatch(serverData));
        }).catch((err)=>
            {  
              console.log(err)
              dispatch(error5xx)
            })
  }
}


