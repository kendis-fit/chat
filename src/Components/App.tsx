import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Home from "./Pages/Home";
import ChatContainer from "../Containers/ChatContainer";
import ChatsContainer from "../Containers/ChatsContainer";
import { ProjectTitle, BlockProject } from "./Styles/Header";
import CreateChatContainer from "../Containers/CreateChatContainer";

const App = () => {
	return (
		<main>
			<BrowserRouter>
				<BlockProject>
					<ProjectTitle onClick={() => window.location.href = "/"}>Chat.js</ProjectTitle>
				</BlockProject>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/create" component={CreateChatContainer} />
					<Route exact={true} path="/chats" component={ChatsContainer} />
					<Route path="/chats/:id" component={ChatContainer} />
				</Switch>
			</BrowserRouter>
		</main>
	);
}

export default App;