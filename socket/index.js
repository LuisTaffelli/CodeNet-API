const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

   //send and get post
   socket.on("reloadPostInfo", (post) => {
    console.log(post);

    io.emit("getPost", post.post);
  });

  //send about a notification
  socket.on("sendNotification", ({ senderName, receiverName, id, userImage, type }) => {
    const receiver = getUser(receiverName);

    // if(senderName !== receiverName){
      io.to(receiver?.socketId).emit("getNotification", {
        senderName,
        id,
        userImage,
        type
      });
    // }
  });

  // follow/unfollow
  socket.on("setFollow", ({info, receiverName})=>{
    const receiver = getUser(receiverName);

    console.log(receiver)

    // if(senderName !== receiverName){
      io.emit("getFollow", {
        info,
        receiverName
      });
  })

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
