export default interface ICreatingChat
{
    Id: string;
    Name: string;
    Host: string;
    Password?: string;
    [key: string]: any;
}