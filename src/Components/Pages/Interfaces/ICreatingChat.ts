export default interface ICreatingChat
{
    Name: string;
    Host: string;
    Password?: string;
    [key: string]: any;
}