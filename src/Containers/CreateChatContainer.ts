import { connect } from "react-redux";

import ChatApi from "../Api/ChatApi";
import CreateChat from "../Components/Pages/CreateChat";
import ICreateChat from "../Components/Pages/Interfaces/ICreatingChat";

const mapDispatchToProps = (dispatch: any) => ({
    SetChat: (chat: ICreateChat) => dispatch(ChatApi.Create(chat))
});

const CreateChatContainer = connect(null, mapDispatchToProps)(CreateChat);

export default CreateChatContainer;