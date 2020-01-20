import fs from "fs";
import http, { Server } from "http";
import express, { Application } from "express";

import IController from "../Controllers/Interfaces/IController";

export default class WebServer
{
    private readonly app: Application;
    private readonly port: number|string;
    private httpServer: Server|null;

    public constructor(port: number|string)
    {
        this.app = express();
        this.port = port;
        this.httpServer = null;
    }

    public InitControllers(path: string): void
    {
        fs.readdir(path, (err, files) => {

            if (err)
            {
                throw new Error(`Path ${path} doesn't exist`);
            }
            files.forEach(file => {
                if (file.endsWith(".js"))
                {
                    if (!file.endsWith("Controller.js"))
                    {
                        console.log(`INFO: Controller '${file}' should name with suffix 'Controller'`);
                    }
                    const Controller = require(`${path}/${file}`).default;
                    this.AddController(new Controller());
                }
            });
        });
    }

    public AddMiddleware(middleware: any): void
    {
        this.app.use(middleware);
    }

    public AddController(controller: IController): void
    {
        this.app.use(controller.Name, controller.Router());
    }

    public Run(runEvent?: () => void): void
    {
        const port = this.port;
        const callbackServerRun = runEvent || function() { console.log(`Server has been running by port ${port}`) };

        this.Server.listen(port, callbackServerRun);
    }

    public get Server(): Server
    {
        if (this.httpServer === null)
        {
            this.httpServer = http.createServer(this.app);
        }
        return this.httpServer;
    }
}