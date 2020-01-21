import React, { useState } from "react";

import Menu from "../Menu";
import IChat from "./Interfaces/IChat";
import ChatApi from "../../Api/ChatApi";
import IChatOffset from "./Interfaces/IChatOffset";
import useInfinityScroll from "../../Hooks/useInfinityScroll";

const Chats = () => {

    const [chatOffset, setChatOffset] = useState<IChatOffset>({
        Offset: 0,
        Size: 20
    });

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
            <ul style={{ height: "100%", overflowY: "scroll" }}>
                {
                    chats.map((chat, key) => 
                    <li key={key}>
                        <div>
                            <span>{chat.Name}</span>
                        </div>
                        <div>
                            <span>{chat.Users}</span>
                        </div>
                        <div>
                            <span>{chat.IsPassword}</span>
                        </div>
                    </li>)
                }
            </ul>
            {
                isFetching && !isReadAllChats && "Fetching more list items..."
            }
        </>
    );
}

export default Chats;