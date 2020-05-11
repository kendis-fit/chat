import IMessage from "./IMessage";
import IConnection from "./IConnection";

export default interface IListMessage extends IConnection
{
    Messages: IMessage[];
}