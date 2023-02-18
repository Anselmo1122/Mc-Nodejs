import inquirer from "inquirer";
import "colors";

const questionsCollection = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {value: '1',name: `${ '1.'.green } Crear tarea`},
            {value: '2',name: `${ '2.'.green } Listar tareas`},
            {value: '3',name: `${ '3.'.green } Listar tareas completadas`},
            {value: '4',name: `${ '4.'.green } Listar tareas pendientes`},
            {value: '5',name: `${ '5.'.green } Completar tarea(s)`},
            {value: '6',name: `${ '6.'.green } Borrar tarea`},
            {value: '0',name: `${ '0.'.green } Salir`},
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
export const obtenerInfo = async () => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message: 'Descripción: ',
            validate(value) {
                if (value.length === 0) {
                    return 'Escribe una descripción';
                }
                return true;
            }
        }
    ]

    console.log("\n")

    const { description } = await inquirer.prompt(question);

    return description;
}

// función para hacer listado de tareas.
export const listadoTareasBorrar = async ( tareas ) => {
    const choices = tareas.map((tarea, id) => {
        const idx = `${id + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        }
    })

    choices.unshift({
        value: "0",
        name: "0.".red + " Cancelar"
    })

    const question = {
        type: 'list',
        name: 'id',
        message: '¿Qué tarea desea borrar?',
        choices
    } 

    const { id } = await inquirer.prompt(question);

    return id;
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

