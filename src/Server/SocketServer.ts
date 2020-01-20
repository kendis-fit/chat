import fs from "fs";
import http from "http";
import io, { Server, Socket } from "socket.io";

type RunSocket = (socket: Socket) => void;

export default class SocketServer
{
    private readonly ioServer: Server;
    private readonly listSockets: RunSocket[];

    public constructor(server: http.Server)
    {
        this.ioServer = io(server);
        this.ioServer.origins("*:*");
        this.listSockets = [];
    }

    public InitSockets(path: string): void
    {
        fs.readdir(path, (err, files) => {
            if (err)
            {
                throw new Error(`Path ${path} doesn't exist`);
            }
            files.forEach(file => {
                if (file.endsWith(".js"))
                {
                    if (!file.endsWith("Socket.js"))
                    {
                        console.log(`INFO: Socket '${file}' should name with suffix 'Socket'`);
                    }
                    const socket = require(`${path}/${file}`).default;
                    this.AddSocket(socket);
                }
            });
        });
    }

    public AddSocket(runSocket: RunSocket): void
    {
        this.listSockets.push(runSocket);
    }

    public Run(): void
    {
        this.ioServer.on("connection", (socket: Socket) => this.listSockets.forEach(runSocket => runSocket(socket)));
    }
}