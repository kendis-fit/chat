import { SET_CHAT } from "../Constants/Actions";

type Action = {
    type: string,
    value: string
}

const Chat = (state = {}, action: Action) => {
    switch (action.type)
    {
        case SET_CHAT:
            return action.value;
        default:
            return state;
    }
}

export default Chat;