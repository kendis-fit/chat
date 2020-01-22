import { connect } from "react-redux";

import Chat from "../Components/Pages/Chat";

const mapStateToProps = (state: any, ownProps: any) => ({
    Id: ownProps.match.params.id,
    Socket: state.Connection
});

const ChatContainer = connect(mapStateToProps, null)(Chat);

export default ChatContainer;