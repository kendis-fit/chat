import io from "socket.io-client";

export default (): Promise<SocketIOClient.Socket> => {
    return new Promise((res, rej) => {

        const connection = io.connect(`${process.env["REACT_APP_CHAT_SOCKET_SERVER"]}`);
        const timeoutConnection = setTimeout(() => {
            connection.close();
            rej(new Error("Connection timeout"));
        }, 5000);

        connection.on("connect", () => {

            try
            {
                clearTimeout(timeoutConnection);
                res(connection);
            }
            catch (error)
            {
                connection.disconnect();
                rej(error);
            }
        });

    });
}