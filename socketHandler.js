const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`id:${socket.id} has been connected`);

    socket.on('getMessage', (message) => {
      socket.emit('getMessage', message);
    });

    socket.on('getMessageElse', (message) => {
      socket.broadcast.emit('getMessage', message);
    });

    socket.on('getMessageAll', (message) => {
      io.sockets.emit('getMessage', message);
    });

    socket.on('joinRoom', ({ userName, roomName }) => {
      console.log(userName, roomName);
      socket.join(roomName);
      console.log(socket)
      socket.broadcast
        .to(roomName)
        .emit('getMessage', `${userName} has joined the room`);
      socket.emit('getMessage', `Welcome to Room ${roomName} `);
    });

    socket.on('leaveRoom', ()=>{
      console.log(socket.id)
    })

  });
};
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if (error) return callback(error);

//     socket.emit('message', {
//       user: 'admin',
//       text: `${user.name}, Welcome to the room ${user.room}`,
//     });
//     socket.broadcast.to(user.room).emit('message', {
//       user: 'admin',
//       text: `${user.name}, has joined the room.`,
//     });
//     socket.join(user.room);
//     io.to(user.room).emit('roomData', {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);
//     console.log(user);
//     io.to(user.room).emit('message', { user: user.name, text: message });
//     io.to(user.room).emit('roomData', {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });

//     callback();
//   });

//   socket.on('disconnection', () => {
//     const user = removeUser(socket.id);
//     console.log('Trigger Disconnection');
//     console.log(user);
//     if (user) {
//       io.to(user.room).emit('message', {
//         user: 'admin',
//         text: `${user.name} has left the chat.`,
//       });
//     }
//   });
