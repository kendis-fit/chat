export default interface IConnection
{
    SetConnect: (connect: SocketIOClient.Socket) => void;
}