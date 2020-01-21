import React, { useState } from "react";

import Menu from "../Menu";
import IChat from "./Interfaces/IChat";
import ChatApi from "../../Api/ChatApi";
import TableChat from "../Styles/TableChat";
import IChatOffset from "./Interfaces/IChatOffset";
import useInfinityScroll from "../../Hooks/useInfinityScroll";

const Chats = () => {

    const [chatOffset, setChatOffset] = useState<IChatOffset>({ Offset: 0, Size: 20 });
    const [isFetching, setIsFetching] = useInfinityScroll(GetChats);
    const [chats, setChats] = useState<IChat[]>([]);
    const [isReadAllChats, setIsReadAllChats] = useState(false);

    async function GetChats()
    {
        if (!isReadAllChats)
        {
            const newChats = await ChatApi.GetAll(chatOffset.Offset, chatOffset.Size);
            if (newChats.length !== 0)
            {
                setChats([...chats, ...newChats]);
                setChatOffset({ Offset: chatOffset.Offset + 20, Size: chatOffset.Size });
                setIsFetching(false);
            }
            else
            {
                setIsReadAllChats(true);
            }
        }
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
                        <tr key={key} onClick={() => window.location.href = `/chats/${chat.Id}`}>
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
        </>
    );
}

export default Chats;