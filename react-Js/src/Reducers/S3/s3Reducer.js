import { CLEAR_STATE_VALUE,ERROR_5XX} from "../../Actions/Helpers/helper";

export default function reducer(state={
    data: null,
    fetching: true,
    sobjtList:[],
  }, action) {

  switch(action.type) {
    case 'S3_DATA':
      return {...state,data:action.payload,fetching:action.fetching} ;
    case 'S3_Bucket_ObjectList':
      return  {...state,sobjtList:action.payload,fetching:action.fetching};
    case 'browsers3upload':
      return {...state,browsers3upload:action.payload,fetching:action.fetching}  
    case CLEAR_STATE_VALUE:
      return null;
    case ERROR_5XX:
      return null;
  }
  return state;
}