export default interface ILogInProps
{
    Id: string;
    IsPassword: boolean;
    SetConnection: (socket: SocketIOClient.Socket) => void;
}