import axios from "axios";
let initialState = {
    user:{

    },
    campaigns:[],
    navbarView:"landingPage"    // "landingPage","loggedIn","canvasserView"
}

const GET_CAMPAIGNS = "GET_CAMPAIGNS";
const CHANGE_HANDLER = "CHANGE_HANDLER";


export function getCampaigns(userid){
    
    return{
        type:GET_CAMPAIGNS,
        payload:axios.get("http://localhost:4000/api/campaigns/"+userid)
    }
}
export function changeHandler(name,value){
    console.log(initialState)
    return{
        type:CHANGE_HANDLER,
        payload:{
            name,
            value
        }
    }
}


export default function reducer(state=initialState,action){
    switch (action.type) {
 
        case `${GET_CAMPAIGNS}_PENDING`:
        console.log(action.type);
        return {
            ...state,
            isLoading: true
        };
        case `${GET_CAMPAIGNS}_FULFILLED`:
        console.log(action.type);
        return {
            ...state,
            isLoading: false,
            campaigns: action.payload.data
        };
        case `${GET_CAMPAIGNS}_REJECTED`:
        console.log(action.type);
      return {
        ...state,
        isLoading: false,
      }
      case CHANGE_HANDLER:
    //   let copyOfState = {...state};
    //   copyOfState =copyOfState.houseToAdd[action.payload.name] = action.payload.value;
        return{
            // copyOfState
            ...state,
            [action.payload.name]:action.payload.value
        }
        default:
            return state;
    }
}