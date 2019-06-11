// any action that are commited
//such as fetching creating a new post
import { LOGIN_POST } from '../actions/types';

const initialState = {
  loginData : ''
}


export default function(state = initialState,action){

  switch (action.type) {

    case LOGIN_POST:
    return{
      ...state,
      loginData: action.payload
    };
    default:
      return state;
  }
}
