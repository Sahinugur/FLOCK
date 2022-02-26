const users = [];

const addUser = ({ userId, name, id }) => {
  name = name.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.id === id && user.name === name
  );

  if (!name || !id) return { error: "Username and id are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { userId, name, id };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (userId) => users.find((user) => user.userId === userId);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
