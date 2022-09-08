import server from './app'
const port = 8443;
const host = "127.0.0.1";
server.listen(port, () => {
    console.log(`[-] Server Listening on Port ${port}`);
});