import IUser from "./IUser";
import IConnection from "./IConnection";

export default interface IListUser extends IConnection
{
    Users: IUser[];
}