import axios from "axios";
let initialState = {
    user:{

    },
    campaigns:[],
    navbarView:"landingPage",    // "landingPage","loggedIn","canvasserView"
    canvassers:[],
    selectedCanvasser:{}
}

const GET_CAMPAIGNS = "GET_CAMPAIGNS";
const CHANGE_HANDLER = "CHANGE_HANDLER";
const CHECK_VIEW = "CHECK_VIEW";
const GET_CANVASSERS = "GET_CANVASSERS";
const SET_SELECTED_CANVASSER = "SET_SELECTED_CANVASSER";


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
export function getCanvassers(){
    return{
        type:GET_CANVASSERS,
        payload:axios.get("/api/canvassers")
    }
}
export function selectCanvasser(canvasser){
    return{
        type:SET_SELECTED_CANVASSER,
        payload:canvasser
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
        case `${GET_CANVASSERS}_PENDING`:
        console.log(action.type);
        return {
            ...state,
            isLoading: true
        };
        case `${GET_CANVASSERS}_FULFILLED`:
        console.log(action.type);
        return {
            ...state,
            isLoading: false,
            canvassers: action.payload.data
        };
        case `${GET_CANVASSERS}_REJECTED`:
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
      case SET_SELECTED_CANVASSER:
        return{
            // copyOfState
            ...state,
            selectedCanvasser:action.payload
        }
        default:
            return state;
    }
}