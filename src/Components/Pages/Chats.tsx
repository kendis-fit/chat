import React, { useState } from "react";

import Menu from "../Menu";
import IChat from "./Interfaces/IChat";
import ChatApi from "../../Api/ChatApi";
import TableChat from "../Styles/TableChat";
import LogInModal from "../LogIn/LogInModal";
import IChatOffset from "./Interfaces/IChatOffset";
import ISelectChat from "./Interfaces/ISelectChat";
import useInfinityScroll from "../../Hooks/useInfinityScroll";

interface IChatsProps
{
    SetChat: (chat: ISelectChat) => void;
}

const Chats = (props: IChatsProps) => {

    const [chatOffset, setChatOffset] = useState<IChatOffset>({ Offset: 0, Size: 20 });
    const [isFetching, setIsFetching] = useInfinityScroll(GetChats);
    const [chats, setChats] = useState<IChat[]>([]);
    const [isReadAllChats, setIsReadAllChats] = useState(false);
    const [showLogin, setShowLogin] = useState({ Show: false, X: 0, Y: 0 });

    async function GetChats()
    {
        if (!isReadAllChats)
        {
            const newChats = await ChatApi.GetAll(chatOffset.Offset, chatOffset.Size);
            if (newChats.length !== 0)
            {
                setIsFetching(false);
                setChats([...chats, ...newChats]);
                setChatOffset({ Offset: chatOffset.Offset + 20, Size: chatOffset.Size });
            }
            else
            {
                setIsReadAllChats(true);
            }
        }
    }

    function ShowLogin(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, chat: ISelectChat)
    {
        props.SetChat(chat);
        setShowLogin({
            Show: true,
            X: e.screenX,
            Y: e.screenY
        });
    }

    return (
        <>
            <Menu />
            <TableChat>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount users</th>
                        <th>Is password</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chats.map((chat, key) =>
                        <tr key={key} onClick={(e) => ShowLogin(e, { Id: chat.Id, IsPassword: chat.IsPassword })}>
                            <td>
                                <span>{chat.Name}</span>
                            </td>
                            <td>
                                <span>{chat.Users}</span>
                            </td>
                            <td>
                                <span>{chat.IsPassword ? "Yes" : "No"}</span>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </TableChat>
            {
                isFetching && !isReadAllChats && "Fetching more list items..."
            }
            {
                showLogin.Show && <LogInModal X={showLogin.X} Y={showLogin.Y} />
            }
        </>
    );
}

export default Chats;