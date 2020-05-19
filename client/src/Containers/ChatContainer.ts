import { connect } from "react-redux";

import Chat from "../Components/Pages/Chat";

const mapStateToProps = (state: any, hasOwnProps: any) => ({
    Socket: state.Connection,
    Id: hasOwnProps.match.params.id
});

const ChatContainer = connect(mapStateToProps, null);

export default ChatContainer(Chat);