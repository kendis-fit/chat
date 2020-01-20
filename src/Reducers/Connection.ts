import { SET_CONNECTION } from "../Constants/Actions";

type Action = {
    type: string,
    value: SocketIOClient.Socket
}

const Connection = (state = {}, action: Action) => {
    switch (action.type)
    {
        case SET_CONNECTION:
            return action.value;
        default:
            return state;
    }
}

export default Connection;