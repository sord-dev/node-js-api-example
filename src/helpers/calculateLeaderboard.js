// gets all the users by stats, sorts them and returns top 3
function calculate(users, length = 3) {
  const stats = users.map((user) => ({name: user.username, stats: user.stats}));
  return stats.sort((a, z) => z.stats.level - a.stats.level).slice(0, length);
}

module.exports = calculate;
