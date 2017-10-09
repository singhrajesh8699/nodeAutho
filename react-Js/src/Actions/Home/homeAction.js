import properties from '../../Containers/Utils/const';
import axios from "axios";
import { error5xx,clearStateValue } from "../Helpers/helper";

export const Home_DATA = "Home_DATA";

function dashBoadDataDispatch(data) {
  return {
    type: Home_DATA,
    payload: {data: data, fetching: false}
  }
}

export function dashBoadRecord(userId) {
  return (dispatch) => {
    		axios.post(properties.dashBoadRecordUrl,JSON.stringify(userId),
                {
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem('jwtToken'),
                    }
                }).then((result)=>
                {
                  dispatch(dashBoadDataDispatch({authorization:true,records:result.data.records}))
                }).catch((err)=>
                {  
                  if(err.response.status === 401)
                  {
                   dispatch(dashBoadDataDispatch({authorization:false,records:[]})) 
                  }else{
                   dispatch(error5xx)
                  }
                })
  }
}


