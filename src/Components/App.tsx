import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import Chats from "./Pages/Chats";
import { ProjectTitle, BlockProject } from "./Styles/Header";
import CreateChatContainer from "../Containers/CreateChatContainer";

const App = () => {
	return (
		<main>
			<BrowserRouter>
				<BlockProject>
					<ProjectTitle to="/">Chat.js</ProjectTitle>
				</BlockProject>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/create" component={CreateChatContainer} />
					<Route path="/chats" component={Chats} />
					<Route path="/chat/:id" component={Chat} />
				</Switch>
			</BrowserRouter>
		</main>
	);
}

export default App;