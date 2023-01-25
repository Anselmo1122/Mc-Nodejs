const deadpool = {
    nombre: "Wade",
    apellido: "Winston",
    poder: "Regeneración",
    getNombre() {
        return `${ this.nombre } ${ this.apellido } ${ this.poder }`
    }
}

console.log( deadpool.getNombre() );

// Código Innecesario
// let nombre = deadpool.nombre;
// let apellido = deadpool.apellido;
// let poder = deadpool.poder;

console.log("------------------------------")

// Sintaxis de desestructuración
const { nombre, apellido, poder } = deadpool
console.log(nombre, apellido, poder)

console.log("------------------------------")

const heroes = [ "Deadpool", "Superman", "Batman" ]

// const h1 = heroes[0]
// const h2 = heroes[1]
// const h3 = heroes[2]

const [ , , h3 ] = heroes;

console.log(h3)

console.log("------------------------------")

function imprimeHeroe( { nombre, apellido, poder, edad = 23 } ) {
    console.log(nombre, apellido, poder, edad)
}

imprimeHeroe(deadpool);



