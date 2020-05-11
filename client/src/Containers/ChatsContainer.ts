import { connect } from "react-redux";

import Chats from "../Components/Pages/Chats";
import { SetChat } from "../Actions/ChatActions";
import ISelectChat from "../Components/Pages/Interfaces/ISelectChat";

const mapDispatchToProps = (dispatch: any) => ({
    SetChat: (chat: ISelectChat) => dispatch(SetChat(chat))
});

const ChatsContainer = connect(null, mapDispatchToProps)(Chats);

export default ChatsContainer;