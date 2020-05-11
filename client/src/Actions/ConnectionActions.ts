import { SET_CONNECTION } from "../Constants/Actions";

export const SetConnection = (connection: SocketIOClient.Socket) => ({
    type: SET_CONNECTION,
    value: connection
})