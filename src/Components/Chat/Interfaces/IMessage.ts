import IAuthor from "./IAuthor";

export default interface IMessage
{
    Author?: IAuthor;
    Content: string;
    CreatedAt: Date;
}