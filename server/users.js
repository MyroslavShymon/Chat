let users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(user => user.room === room && user.name === name);

    if (existingUser) return {error: "Username is taken"}

    const user = {id, name, room}

    users.push(user)

    return {user}
}

const removeUser = (id) => {
    users = users.filter(user => user.id !== id)

    return getUser(id)
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)


export { addUser, getUser, removeUser, getUsersInRoom}
