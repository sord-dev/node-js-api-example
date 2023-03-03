const users = require("../config/users.json");

function User({ username = null, password = null }) {
  let userIds = users.map((user) => user.id);
  let maxId = Math.max(...userIds);

  let stats = { level: 0, progress: 0 };

  let user = {
    id: maxId + 1,
    username,
    password,
    stats,
  };

  return user;
}

module.exports = User;
