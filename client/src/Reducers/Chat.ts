import { SET_CHAT } from "../Constants/Actions";
import ISelectChat from "../Components/Pages/Interfaces/ISelectChat";

type Action = {
    type: string,
    value: ISelectChat
}

const initialState: ISelectChat | null = null;

const Chat = (state = initialState, action: Action) => {
    switch (action.type)
    {
        case SET_CHAT:
            return action.value;
        default:
            return state;
    }
}

export default Chat;