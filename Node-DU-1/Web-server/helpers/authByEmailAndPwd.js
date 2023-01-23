import { USERS_BBDD } from "../bbdd.js";

const authByEmailAndPwd = (email, password) => {
  const user = USERS_BBDD.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) throw new Error();
  else return user;
};

export default authByEmailAndPwd;
