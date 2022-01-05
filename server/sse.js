import express from 'express';
import cors from 'cors';
import events from 'events';

const app = express();
const PORT = 5000;
const emitter = new events.EventEmitter();//observable

//middlewares
app.use(cors());
app.use(express.json());

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    emitter.on('newMessage', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})

app.post('/new-message', (req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    res.status(200);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
