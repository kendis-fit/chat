import { SET_CONNECT } from "../Constants/Actions";

export const SetConnect = (connect: SocketIOClient.Socket) => ({
    type: SET_CONNECT,
    value: connect
})