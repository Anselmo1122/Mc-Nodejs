// Importación desestructurada de funciones en inquirer.js
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
    inquirerMenu,
    pausa,
    obtenerInfo,
    listadoTareasBorrar,
    confirmar,
    cheklistTareasCompletar,
} from "./helpers/inquirer.js";

// Importación de la clase Tareas
import { Tareas } from "./models/tareas.js";

const main = async () => {
    let opt = "";
    const misTareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // Aquí debemos cargar las tareas.
        misTareas.cargarTareas(tareasDB);
    }

    /*
        Este bucle hará que nuestra aplicación se
        renderice de forma constante. En caso de que
        nuestra opción sea "0", salimos del bucle y
        por lo tanto de la ejecución del programa.
    */
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const data = await obtenerInfo();
                misTareas.crearTarea(data);
                break;
            case "2":
                misTareas.listar();
                break;
            case "3":
                misTareas.listarCompletadasPendientes(true);
                break;
            case "4":
                misTareas.listarCompletadasPendientes(false);
                break;
            case "5":
                const ids = await cheklistTareasCompletar(misTareas.listadoArr);
                if ( ids ) misTareas.toggleCompletadas(ids);
                break;
            case "6":
                const id = await listadoTareasBorrar(misTareas.listadoArr);
                if (id !== "0") {
                    const ok = await confirmar("\n ¿Está seguro?");

                    if (ok) misTareas.borrar(id);
                }
                break;
        }

        guardarDB(misTareas.listadoArr);

        await pausa();

        if (opt === "0") console.clear();
    } while (opt !== "0");
};

/* 
    Llamamos a "main()" función que
    iniciará nuestro programa.
*/

main();
