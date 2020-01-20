require("dotenv").config();

import MongoDB from "./Db/MongoDB";
import Cors from "./Middlewares/Cors";
import WebServer from "./Server/WebServer";
import SocketServer from "./Server/SocketServer";

const port = process.env["PORT"] || 3000;
const connectionString = process.env["CONNECTION_STRING"];

if (!connectionString)
{
    console.log("You should add connection string for mongodb in environment 'connectionString'");
    process.exit(0);
}
else
{
    const database = new MongoDB(connectionString, "ChatDB");
    database.Run();
}

const webServer = new WebServer(port);
webServer.AddMiddleware(Cors);
webServer.InitControllers(`${__dirname}/Controllers`);

const sockerServer = new SocketServer(webServer.Server);
sockerServer.InitSockets(`${__dirname}/Sockets`);
sockerServer.Run();

webServer.Run();