export default interface ICreatingChatAction
{
    SetConnection: (connection: SocketIOClient.Socket) => void;
}