export default interface IConnection
{
    SetConnection: (connection: SocketIOClient.Socket) => void;
}