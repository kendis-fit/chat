import { connect } from "react-redux";

import CreateChat from "../Components/Pages/CreateChat";
import { SetConnect } from "../Actions/ConnectionActions";

const mapDispatchToProps = (dispatch: any) => ({
    SetConnect: (connect: SocketIOClient.Socket) => dispatch(SetConnect(connect))
});

const CreateChatContainer = connect(null, mapDispatchToProps)(CreateChat);

export default CreateChatContainer;