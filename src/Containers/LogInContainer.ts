import { connect } from "react-redux";

import LogIn from "../Components/LogIn/LogIn";
import { SetConnection } from "../Actions/ConnectionActions";

const mapStateToProps = (state: any) => ({
    Id: state.Chat.Id,
    IsPassword: state.Chat.IsPassword    
});

const mapDispatchToProps = (dispatch: any) => ({
    SetConnection: (connection: SocketIOClient.Socket) => dispatch(SetConnection(connection))
});

const LogInContainer = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default LogInContainer;