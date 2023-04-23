
class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = { id, name, room};
    this.users.push(user);
    return this.users;
  }

  getUser(id) {
    let user = this.users.filter((user) => user.id === id )[0];
    return user;
  }

  getUsers() {
    return this.users;
  }

  getUsersFromRoom(room) {
    let userInRoom = this.users.filter((user) => user.room === room);
    return userInRoom;
  }

  deleteUser(id) {
    let userRemoved = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return userRemoved;
  }

}

module.exports = {
  Users,
}