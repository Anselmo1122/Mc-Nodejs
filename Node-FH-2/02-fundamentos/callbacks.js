
const getUserById = (id, callback) => {
    let user = {
        id,
        name: "Anselmo"
    }

    console.log(user)

    setTimeout(() => {
        callback(user);
    }, 1500);
}

getUserById(10, (user) => {
    console.log(user.id)
    console.log(user.name.toUpperCase())
});