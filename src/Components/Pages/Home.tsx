import React from "react";

import Menu from "../Menu";
import { BlockInformation } from "../Styles/HomeInformation";

const Home = () => {
    return (
        <>
            <Menu />
            <BlockInformation>
                <h2>Info about project</h2>
            </BlockInformation>
        </>
    );
}

export default Home;