import { Router } from "express";

export default interface IController
{
    Name: string;
    Router(): Router;
}