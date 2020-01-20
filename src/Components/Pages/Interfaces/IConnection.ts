import ICreatingChat from "./ICreatingChat";

export default interface ICreatingChatAction
{
    SetChat: (chat: ICreatingChat) => void;
}