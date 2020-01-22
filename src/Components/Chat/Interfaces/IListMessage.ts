import IMessage from "./IMessage";

export default interface IListMessage
{
    Messages: IMessage[];
    Socket: SocketIOClient.Socket;
}