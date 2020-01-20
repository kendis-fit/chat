import { connect } from "react-redux";

import CreateChat from "../Components/Pages/CreateChat";
import { SetConnection } from "../Actions/ConnectionActions";

const mapDispatchToProps = (dispatch: any) => ({
    SetConnection: (connection: SocketIOClient.Socket) => dispatch(SetConnection(connection))
});

const CreateChatContainer = connect(null, mapDispatchToProps)(CreateChat);

export default CreateChatContainer;