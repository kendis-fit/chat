export default interface ILogin
{
    Id: string;
    Login: string;
    Password?: string;
    [key: string]: any;
}