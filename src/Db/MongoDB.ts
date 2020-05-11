import mongoose, { ConnectionOptions } from "mongoose";

export default class MongoDB
{
    private readonly connectionString: string;
    private readonly connectionOptions: ConnectionOptions;

    public constructor(connectionString: string, nameDatabase: string)
    {
        this.connectionString = connectionString;
        this.connectionOptions = {
            dbName: nameDatabase,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }

    public Run(errorEvent?: (error: any) => void): void
    {
        const callbackErrorDatabase = errorEvent || function(error: any) {
            console.log("MongoDB connection error", error);
            process.exit(0);
        };

        mongoose.connect(this.connectionString, this.connectionOptions);
        mongoose.connection.on("error", callbackErrorDatabase);
    }
}