import IMessage from "./IMessage";
import IConnection from "./IConnection";

export default interface IListUser extends IConnection
{
    Messages: IMessage[];
}