import { SET_CONNECT } from "../Constants/Actions";

const Connection = (state = {}, action) => {
    switch (action.type)
    {
        case SET_CONNECT:
            return action.value;
        default:
            return state;
    }
}

export default Connection;