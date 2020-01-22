import IUser from "./IUser";

export default interface IListUser
{
    Users: IUser[];
    Socket: SocketIOClient.Socket;
}