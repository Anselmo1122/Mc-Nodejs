const fs = require("fs");
require("colors");

/**
 * Función que crea un archivo ".txt" de la tabla
 * de multiplicar del número "unidad" especificado, hasta
 * el número indicado en "limite".
 * @param {number} unidad
 * @param {number} limite
 */

const crearArchivo = (unidad = 5, limite = 10, listar = false) => {

  return new Promise((resolve, reject) => {
    if (unidad && limite) {

      let consola = "";
      let data = "";

      for (let i = 0; i <= limite; i++) {
        data += `      ${String(unidad).blue} x ${i} = ${`${unidad * i}`.cyan}\n`;
        consola += `      ${unidad} x ${i} = ${unidad * i}\n`;
      }


      if (listar) {
        console.log("\n ======================".zebra)
        console.log(`     Tabla del ${unidad} `)
        console.log(" ======================\n".zebra)
        console.log(data)
        console.log("\n ======================\n".zebra)
      }


      fs.writeFileSync(`./out/tabla-${unidad}.txt`, data);

      resolve(`tabla-${unidad}.txt`.rainbow.underline);
    } else {
      reject(`Ha ocurrido un error: comprueba los datos ingresados.`)
    }
  })

};

module.exports = { crearArchivo };
