import { connect } from "react-redux";

import Chat from "../Components/Pages/Chat";

const mapStateToProps = (state: any) => ({
    Socket: state.Connection
});

const ChatContainer = connect(mapStateToProps, null)(Chat);

export default ChatContainer;