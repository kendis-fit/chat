import React, { useState, createRef } from "react";

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
    const [showLogin, setShowLogin] = useState({ Show: false, X: "0", Y: "0" });

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

    function ShowLogin(e: React.RefObject<HTMLTableRowElement>, chat: ISelectChat)
    {
        if (e.current === null) return;

        const rect = e.current.getBoundingClientRect();
        const x = rect.left;
        const y = rect.bottom;

        props.SetChat(chat);
        setShowLogin({
            Show: true,
            X: x + "px",
            Y: y + "px"
        });
    }

    return (
        <>
            <Menu />
            {
                chats.length !== 0 ? <TableChat>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount users</th>
                            <th>Is password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chats.map((chat, key) => {

                                const ref = createRef<HTMLTableRowElement>();

                                return <tr key={key} ref={ref} onClick={() => ShowLogin(ref, { Id: chat.Id, IsPassword: chat.IsPassword })}>
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
                            })
                        }
                    </tbody>
                </TableChat> : "There aren't chats"
            }
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