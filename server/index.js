import express from 'express'
import {Server, Socket} from 'socket.io'
import {createServer} from 'http'
import {router} from './router.js'
import {getUsersInRoom, removeUser, getUser, addUser} from './users.js'

const PORT = process.env.PORT || 5000

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log(`We have a new connection!!!`)

    socket.on('join', ({name, room}, cb) => {
        console.log('id: socket.id', socket.id)
        const {user, error} = addUser({id: socket.id, name, room})

        if(error) return cb(error)

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!`})

        socket.join(user.room)

        cb()
    })

    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', {user: user.name, text: message})

        cb()
    })

    socket.on('disconnect', () => {
        console.log("User has left!!!")
    })
})

app.use(router)

httpServer.listen(PORT, () => console.log(`Server is running on port 5000`))

