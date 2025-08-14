const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

server.on('connection', (ws) => {
    console.log('クライアントが接続しました');
    ws.on('message', (message) => {
        console.log(`受け取ったメッセージ: ${message}`);
        try {
            const data = JSON.parse(message);
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (e) {
            console.error(`エラー: ${e}`);
        }
    });
    ws.on('close', () => {
        console.log('クライアントが切断しました');
    });
});

console.log(`WebSocketサーバーが ws://localhost:${process.env.PORT || 8080} で起動しました`);