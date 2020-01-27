import io from "socket.io-client";

export default (): Promise<SocketIOClient.Socket> => {
    return new Promise((res, rej) => {

        const connection = io.connect("http://localhost:5000");

        connection.on("connect", () => {

            try
            {
                if (connection.connected)
                {
                    res(connection);
                }
            }
            catch (error)
            {
                connection.disconnect();
                rej(error);
            }
        });

    });
}