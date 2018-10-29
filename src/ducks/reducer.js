import axios from "axios";
let initialState = {
    user:{

    },
    campaigns:[],
    navbarView:"landingPage"    // "landingPage","loggedIn","canvasserView"
}

const GET_CAMPAIGNS = "GET_CAMPAIGNS";
const CHANGE_HANDLER = "CHANGE_HANDLER";
const CHECK_VIEW = "CHECK_VIEW";


export function getCampaigns(userid){
    
    return{
        type:GET_CAMPAIGNS,
        payload:axios.get("/api/campaigns/"+userid)
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
export function checkView(){
    return{
        type:CHECK_VIEW,
        payload:axios.get("/api/view")
    }
}


export default function reducer(state=initialState,action){
    switch (action.type) {
 
        case `${CHECK_VIEW}_PENDING`:
        console.log(action.type);
        return {
            ...state,
            isLoading: true
        };
        case `${CHECK_VIEW}_FULFILLED`:
        console.log(action.type);
        return {
            ...state,
            isLoading: false,
            navbarView: action.payload.data
        };
        case `${CHECK_VIEW}_REJECTED`:
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