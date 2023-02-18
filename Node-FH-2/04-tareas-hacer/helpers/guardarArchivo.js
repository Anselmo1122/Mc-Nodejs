import fs from "fs";

const archivo = "./database/db.json";

export const guardarDB = data => {

    fs.writeFileSync(archivo, JSON.stringify(data));

}

export const leerDB = () => {

    if ( fs.existsSync(archivo) ) {
        const info = fs.readFileSync(archivo, { encoding: "utf-8" });
        const data = JSON.parse( info );

        return data;
    }

    return null;
}

