const users = [];

// id from socket instance
const addUser = ({ id, name, game }) => {
    name = name.trim().toLowerCase();
    game = game.trim().toLowerCase();

    // If same user is trying to sign up for same game, return error
    const existingUser = users.find((user) => user.game === game && user.name === name);

    if (existingUser) {
        return { error: 'Username is taken' }
    }

    const user = { id, name, game };

    return { user: user }
};

const removeUser = (id) => {
    // If user matches user's index, remove user from array
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
};

// If user matches on id, we know user exists
const getUser = (id) => users.find((user) => user.id === id);

// Get all users in Game
const getUsersInGame = (game) => {
    const filteredUsers = users.filter((user) => user.game === game)
    console.log("users", filteredUsers);
    return filteredUsers;
};

module.exports = { addUser, removeUser, getUser, getUsersInGame, users };
