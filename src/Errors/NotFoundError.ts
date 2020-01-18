import IError from "./Interfaces/IError";

export default class NotFoundError extends Error implements IError
{
    private readonly type: string = "notFound";

    public constructor(message: string)
    {
        super(message);
    }

    public get Type(): string
    {
        return this.type;
    }

    public get Message(): string | undefined
    {
        return this.message;
    }

}