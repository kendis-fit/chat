import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../root.css";
import Chats from "./Pages/Chats";
import CreateChat from "./Pages/CreateChat";
import { ProjectTitle, Menu, MenuItem } from "./Styles/Main";

const App = () => {
	return (
		<main>
			<BrowserRouter>
				<ProjectTitle>Chat.js</ProjectTitle>
				<Menu>
					<MenuItem to="/create">Create chat</MenuItem>
					<MenuItem to="/chats">Chats</MenuItem>
				</Menu>
				<Switch>
					<Route path="/create" component={CreateChat} />
					<Route path="/chats" component={Chats} />
				</Switch>
			</BrowserRouter>
		</main>
	);
}

export default App;