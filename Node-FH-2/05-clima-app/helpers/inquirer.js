import inquirer from "inquirer";
import "colors";

const questionsCollection = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {value: 1, name: `${ '1.'.green } Buscar ciudad`},
            {value: 2, name: `${ '2.'.green } Historial`},
            {value: 0, name: `${ '0.'.green } Salir`},
        ]
    }
]

// función para pintar nuestro menú gracias una lista interáctiva.
export const inquirerMenu = async () => {
    console.clear();
    console.log("===========================".green);
    console.log("   Seleccione una opción   ".white);
    console.log("===========================\n".green);

    const { opcion } = await inquirer.prompt(questionsCollection);

    return opcion;
};

// función para hacer una pausa 
export const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'continuar',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ]

    console.log('\n');

    await inquirer.prompt(question);
}

// función que nos permitirá obtener información del usuario.
export const obtenerInfo = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Escribe el lugar a buscar';
                }
                return true;
            }
        }
    ]

    console.log("\n")

    const { description } = await inquirer.prompt(question);

    return description;
}

// función para hacer listado de los resultados de búsqueda.
export const listarLugares = async ( lugares = [] ) => {
    const choices = lugares.map((lugar, id) => {
        const idx = `${id + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.name}`,
        }
    })

    choices.unshift({
        value: "0",
        name: "0.".red + " Cancelar"
    })

    const question = {
        type: 'list',
        name: 'id',
        message: 'Selecciona un resultado: ',
        choices
    } 

    const { id } = await inquirer.prompt(question);

    return id;
}

export const listarHistorial = async ( busquedas ) => {

    const busquedasEditadas = new Set(busquedas);
    const busquedasHistorial = [ ...busquedasEditadas ]

    const choices = busquedasHistorial.map((busqueda, id) => {
        const idx = `${id + 1}.`.green;
        return {
            name: `${idx} ${busqueda}`,
        }
    })

    const question = {
        type: 'list',
        name: 'busqueda',
        message: 'Historial de búsquedas: ',
        choices
    } 

    await inquirer.prompt(question);

    return;
}

// función para confirmar la eliminación de una tarea.
export const confirmar = async (message) => {
    const question = {
        type: 'confirm',
        name: 'confirmar',
        message
    }

    const { confirmar } = await inquirer.prompt(question);

    return confirmar;
} 

// función para hacer un checklist de tareas.
export const cheklistTareasCompletar = async ( tareas ) => {
    const choices = tareas.map((tarea, id) => {
        const idx = `${id + 1}.`.green;
        return {
            value: tarea.id,
            name: ` ${idx} ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false
        }
    })

    const question = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones: ',
        choices
    } 

    const { ids }= await inquirer.prompt(question);

    return ids;
}

