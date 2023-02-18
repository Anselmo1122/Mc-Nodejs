import { Tarea } from "./tarea.js";
import "colors";

export class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    // Creamos un método getter para obtener las tareas.
    get listadoArr() {
        const listado = [];

        /* 
            Object y su método "Keys" nos retornará 
            un "String[]" de las "Keys" del objeto pasado. 
        */
        Object.keys(this._listado).forEach( tarea => listado.push(this._listado[tarea]))

        return listado;
    }

    cargarTareas( tareas = [] ) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );

        // Añadimos una tarea a nuestro listado.
        this._listado[tarea.id] = tarea;
    }

    listar() {
        this.listadoArr.forEach((tarea, id) => {
            console.log(`\n ${ `${id + 1}.`.green } ${tarea.desc} :: ${ tarea.completadoEn ? "Completada".green : "Pendiente".red }`)
        })
    }
    
    listarCompletadasPendientes( boolean ) {
        this.listadoArr.forEach( ( tarea, id ) => {
            if (boolean) {
                if(tarea.completadoEn !== null) console.log(`\n ${ `${id + 1}.`.green } ${ tarea.desc } :: ${ tarea.completadoEn.green }`);
            } else {
                if(tarea.completadoEn === null) console.log(`\n ${ `${id + 1}.`.green } ${ tarea.desc } :: ${ "Pendiente".red }`);
            }
        } )
    }

    borrar ( id ) {
        delete this._listado[id];
    }

    toggleCompletadas ( ids ) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        })
        this.listadoArr.forEach((tarea) => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}