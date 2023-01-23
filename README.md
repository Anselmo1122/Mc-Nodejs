# Notas - NodeJS

---

## NodeJS - Desarrollo útil

### ¿Qué es NodeJS?

Es un entorno de ejecución de JavaScript que nos permite ejecutar este lenguaje fuera del navegador, esto se debe a que utiliza el motor V8 de Chrome.

### Características de NodeJS:

- Interactuar con el sistema operativo (archivos, red).
- Ejecutar JavaScript en modo servidor.
- Backend web, cli apps, etc.

### ¿Como funciona NodeJS?

Al escribir nuestro código JavaScript, este será ejecutado gracias al Motor V8 usado en node y su Call Stack o pila de llamadas que permitirá ejecutar el código de forma secuencial. En node también contamos con una serie de utilidades para interactuar con el sistema operativo, las cuales llamamos Bindings, los Bindings son Apis con forma de librería que nos permiten interactuar con código C o C++, lo que nos da acceso al uso de HTTP, CRYPTO, etc.

Sin embargo, los Bindings presentan un problema, y es que trabajan de forma asíncrona, por lo que su uso tendría un impacto en el rendimiento, para solucionar esto se implementa una librería escrita en C llamada LIBUV, la cual aporta a NodeJS un Event Loop, gestionando así una serie de eventos asignados a una serie de nucleos que posteriormente devolverán la respuesta a la pila de llamadas.

 

![nodeImg1.png](Notas%20-%20NodeJS/nodeImg1.png)

### Diferente implementación, diferentes usos

- A diferencia del navegador en NodeJS no necesitamos implementar una interfaz gráfica, mientras que en el navegador es imprescindible.
- En el navegagor contamos con una WebAPI para interactuar con elementos del DOM, y en NodeJS con una serie de utilidades y herramientas para interactuar con el sistema operativo.
- En NodeJs se usa la librería LIBUV, y en el navegador se usa LIBEVENT, cada una similar en funcionallidad pero no en su uso.

### Es hora de descargar e instalar NodeJS

[Descarga | Node.js](https://nodejs.org/es/download/)

![nodeImg2.png](Notas%20-%20NodeJS/nodeImg2.png)

Datos sobre la actividad y mantenimiento de versiones de NodeJS 2023.

### Global vs Window

Como ya sabemos al ejecutar JavaScript en el navegador tenemos acceso a un objeto global llamado “window”, este es el objeto padre, es la raíz para el resto de objetos, como es el caso de “document”, en NodeJS no contamos con un objeto “window” pero sí existe un objeto llamado “global”  padre de otros importantes como “process”. Al ver la información que está en este objeto global podemos ver de forma general datos que describen el sistema operativo y procesos que se han ejecutado.

```jsx
// vemos que en NodeJS "window" está indefinido
console.log(window)

// vemos información sobre el objeto "global"
console.log(global)
```

### Sistema de módulos CommonJS y ESM

Un sistema de módulos es una utilidad o herramienta que permite la comunicación entre diferentes archivos con partes de código que pueden ser implementadas en cualquier parte del proyecto, un sistema modular permite una mejor organización de las funcionalidades, y propósitos de cada archivo según sea necesario, entre otros beneficios.

Un módulo no es más que una parte de código que puede ser utilizada por otros módulos.

Con un sistema de módulos podemos:

- Encapsular funcionalidad e incrementar la reusabilidad.
- Mejorar la estructura de nuestros proyectos.
- Mejorar la seguridad.

### CommonJS(CJS)

Sistema por defecto utilizado en NodeJS.

### ECMAScript Modules(ESM)

Sistema oficial de JavaScript para la gestión de módulos.

Para definir cual de estos sistemas implementar podemos definir en nuestro “package.json” una clave “type” con un valor que puede ser “commonjs” o “module”, también podemos forzar nuestros archivos a implementar alguno de estos sistemas con las extensiones “.cjs” y “.mjs”.

---

### Servidor web HTTP

### ¿En qué se basa la comunicación?

Establecer un lenguaje y un medio común entre los diferentes participantes, en nuestros caso máquinas.

### Modelo OSI

Estándar de interconexión de sistemas.

![nodeImg3.png](Notas%20-%20NodeJS/nodeImg3.png)

### Protocolo HTTP

Estándar de la capa de transporte que nos permitirá comunicarnos con los clientes.

Basado en petición/respuesta. El cliente pide primero y nosotros respondemos.

Nosotros también podemos realizar peticiones como si fuéramos clientes a otros servidores.

Contiene ciertas funciones que definen funcionalidad de capas inferiores (sesión y presentación).

Para comunicarnos utilizamos una cadena de texto (URL) como identificador del host y del recurso.

![nodeImg4.png](Notas%20-%20NodeJS/nodeImg4.png)

Esta sería una url común: **https://desarrolloutil.com/account/data**

Nos va a permitir solicitar o enviar diferentes tipos de datos o recursos.

### Solicitud HTTP

Se transforma la información de la URL en una solicitud, que es lo que se envía.

**https://desarrolloutil.com/account/data**

- Request Line
    - GET /account/data HTTP/1.1
- Headers
    - Host: desarrolloutil.com
    - Authorization: Bearer f1213vffjkq1324f
    - Cookie: gid=2345sfw3;1di=32fkfieesf
- Body / Payload
    - En este caso el body no existe, es una petición GET en la que nos solicita un recurso.

### Respuesta HTTP

El servidor procesa la solicitud y emite una respuesta.

Similar a la solicitud pero con algunas diferencias en la primera línea y en las cabeceras.

- Status Line
    - HTTP/1.1 200 OK
- Headers
    - Content-Type: text/html
    - Content-Length: 220
    - Referrer-Policy: origin-when-cross-origin
- Body / Payload
    
    ```html
    <html>
    	<head>
    		<title>Desarrollo Útil</title>
    	</head>
    </html>
    ```
    

### HTTP en Node

Node nos da herramientas para comunicarnos con el SO, red…

Vamos a montar un servidor que se comunique mediante HTTP.

- Nativo —> http
- Terceros —> express, fastify, hapi, koa…

Servidor mediante “http”:

```jsx
import { createServer } from "http";

const httpServer = createServer((req, res)=>{
    console.log("Solicitud recibida");

    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);

    let data = ""
    let chunkIndex = 0
    req.on("data", (chunk) => {
        data += chunk;
        chunkIndex++;
        console.log(chunkIndex);
    })

    req.on("end", () => {
        console.log(data)
        res.end("Te he enviado la respuesta");
    })
})

httpServer.listen(3000)
```

A continuación vamos a crear un servidor con la librería “express”, esta librería es la más extendida a día de hoy para gestionar las peticiones y solicitudes, nos va permitir sustituir la librería nativa “http”.

[Express - Node.js web application framework](https://expressjs.com/)

Servidor mediante “express”:

```jsx
import express, { json } from "express";

const port = 3000;
const expressServer = express();

/* 
	Un Middleware es una función que se ejecuta para 
	múltiples endpoints antes de su ejecución.
*/

// Middleware que hace un parseo del body formato json.
expressServer.use(express.json());

// Middleware que hace un parseo del body formato txt.
expressServer.use(express.text());

expressServer.get("/mi-cuenta/:id", (req, res) => {
    console.log(`Parámetro de url: ${req.params.id}`)
    console.log(req.headers)
    console.log(`Valor de cabecera "host": ${req.get('host')}`)

    res.send("Tu cuenta personal.")
    // res.status(401).send({
    //     errorMessage: "No autorizado",
    // })
})

expressServer.post("/producto", (req, res) => {
    req.body.id
        ? req.body = {id: `${req.body.id} verified`}
        : req.body = "He usado tu texto mi querido cliente."

    console.log(req.body);

    res.send();
})

expressServer.listen(port, () => {
    console.log(`Servidor desplegado en el puerto ${port}`);
})
```

### Variables de entorno

las variables de entorno son variables dinámicas que varían según el entorno en el que se ejecuta la aplicación, suelen representar datos que describen los procesos y momentos en los que se encuentra la aplicación, tales como, el desarrollo, testeo, producción, etc. Las variables de entorno se suelen especificar en un archivo con la extensión “.env”.

```jsx
const PORT = 3000
const DB_URL = "https://mongocloud/mydatabasexyz..."
```

Ejemplo de una variable de entorno.

Los archivos “.env” no se deben subir al repositorio, para evitar esto y ayudar a que una persona sepa qué variables de entorno debe colocar, es habitual colocar un archivo “.env.example” que servirá como plantilla.

```jsx
const PORT = 3000
const DB_URL = DB_URL
```

Para acceder a nuestras variables de entorno desde nuestros archivos podemos instalar una pequeña dependencia llamada “dotenv”, para ello debemos ejecutar el siguiente comando.

```jsx
npm install dotenv
```

Una vez instalada podremos configurarlo para acceder a nuestras variables a través del objeto “process.env.VARIABLE”.

```jsx
import dotenv from "dotenv";

dotenv.config()

const PORT = process.env.PORT
```

### Las rutas en express

Una ruta o “Router” en su sintaxis, no es más que una sección o agrupación en la aplicación en la que se gestiona un conjunto de rutas, esto nos permitirá organizar mejor el código, ya que estaremos creando un archivo por cada conjunto de rutas y sus respectivos middlewares.

Nuestro código en “routes/account.js”

```jsx
import express from "express";
import { USERS_BBDD } from "../bbdd.js";

// Creamos nuestra ruta.
const accountRouter = express.Router();

// Creamos nuestro propio middleware.
accountRouter.use((req, res, next) => {

    console.log(req.ip);
    /*
        next representa a la siguiente función a ejecutar, puede ser la 
        la función correspondiente a la request o el siguiente middleware.
    */
    next()

})

// Obtener los detalles de una cuenta a partir de guid.
accountRouter.get("/:guid", (req, res) => {

    let { guid } = req.params;
    let user = USERS_BBDD.find((user) => user.guid === guid)

    if (!user) return res.status(404).send()
    return res.send(user)

})

```

Nuestro código en “index.js”

```jsx
const expressServer = express();

expressServer.use(express.json());
expressServer.use(express.text());

/*
    Si no especificamos una dirección para nuestras
    rutas, por defecto esta iniciará desde la raíz y
    eso puede ocasionar conflictos.
*/

expressServer.use("/account", accountRouter)

expressServer.get("/product", (req, res) => {
    res.send()
})

```

### Autenticación y Autorización

### Autenticación

- Mecanismo para comprobar que alguien es quien dice ser.
- Verificar la identidad de un usuario en nuestro sistema.
- Sólo puedes entrar a la oficina si eres un empleado.

### Autorización

- Mecanismo para comprobar que alguien tiene acceso a algo.
- Relacionado con roles, nos especifica derechos o privilegios de acceso a recursos.
- Sólo accedes a la planta 5 de la oficina si eres gerente. El resto de trabajadores no tienen permiso.

Nuestro código en “routes/auth.js”

```jsx
import { Router } from "express";
import authByEmailAndPwd from "../helpers/authByEmailAndPwd.js";

// Creamos nuestro router para procesos de autenticación.
const authRouter = Router();

// Endpoint de acceso público.
authRouter.get("/publico", (req, res) => {
  return res.send("Ruta de acceso público.");
});

// Endpoint de autenticación mediante "email" y "password".
authRouter.post("/autenticado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailAndPwd(email, password);

    return res.send(`Usuario "${user.name}" autenticado.`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

// Endpoint de autorización en caso de ser "admin".
authRouter.post("/autorizado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailAndPwd(email, password);

    if (user.role !== "admin") return res.sendStatus(403);

    return res.send(
      `Usuario "${user.name}" está autorizado ya que es "${user.role}".`
    );
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authRouter;
```

Nuestro código en “helpers/authByEmailAndPwd.js”

```jsx
import { USERS_BBDD } from "../bbdd.js";

const authByEmailAndPwd = (email, password) => {
    const user = USERS_BBDD.find(
        (user) => user.email === email && user.password === password
    );
    if (!user) throw new Error();
    else return user;
};

export default authByEmailAndPwd;
```

### Sesión y Token ( Autenticación )

### Autenticación por sesión

![nodeImg5.png](Notas%20-%20NodeJS/nodeImg5.png)

### Autenticación por token

![nodeImg6.png](Notas%20-%20NodeJS/nodeImg6.png)

### Diferencias

**Sesión**

- Sólo es un ID.
- Envío automático al dominio.
- Validación menos segura.

**Token**

- Puede contener información.
- Envío de cabecera “manual”.
- Validación más segura.

Ruta de una autenticación por sesión en “routes/authSessionRouter.js”

```jsx
import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS_BBDD } from "../bbdd.js";
import authByEmailAndPwd from "../helpers/authByEmailAndPwd.js";

// Creamos nuestro router para procesos de autenticación.
const authSessionRouter = Router();

// Almacenamos las sesiones en memoria.
const sessions = [];

// Endpoint de autenticación mediante inicio de sesión.
authSessionRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailAndPwd(email, password);

    const sessionID = nanoid();
    sessions.push({ sessionID, guid });

    res.cookie("sessionID", sessionID, {
      httpOnly: true,
    })

    return res.send();
  } catch (error) {
    return res.sendStatus(401);
  }
});

// Solicitud autenticada con sesión para obtener el perfil del usuario.
authSessionRouter.get("/profile", (req, res) => {
  const { cookies } = req;

  if (!cookies.sessionID) return res.sendStatus(401);

  const userSession = sessions.find(
    (session) => session.sessionID === cookies.sessionID
  );

  if (!userSession) return res.sendStatus(401);

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);

  if (!user) return res.sendStatus(401);

  delete user.password;

  return res.send(user);
});

export default authSessionRouter;
```

El token debe cumplir de forma obligatoria con las siguientes características:

- Contener información: cuando generamos el token debemos poder introducirle información, en este caso información sobre el usuario.
- Duración de validéz: debemos poder darle un tiempo de caducidad al token.
- Tiene que ser verificable: a través de una firma creada por nosotros, podemos verificar si el token fué alterado o si fué reemplazado.

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

- Cabecera del token (definimos algoritmo y tipo de token).

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- Datos o información del token.

```json

{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

- Función que genera el token (codigo base 64) junto con la firma a partir de la información anterior.

```jsx
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  
	your-256-bit-secret
)
```

La acción de generar un token normalmente se hace utilizando una librería, una de la más conocidas es [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), pero en nuestro caso haremos uso de la librería [jose](https://www.npmjs.com/package/jose).

Ruta de una autenticación por token en “routes/authTokenRouter.js”

```jsx
import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
import authByEmailAndPwd from "../helpers/authByEmailAndPwd.js";
import { jwtVerify, SignJWT } from "jose";

// Creamos nuestro router para procesos de autenticación.
const authTokenRouter = Router();

// Endpoint de autenticación mediante "email" y "password".
authTokenRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailAndPwd(email, password);

    // Generar y devolver el token.

    const jwtConstructor = new SignJWT({ guid });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (error) {
    return res.sendStatus(401);
  }
});

// Solicitud autenticada con token para obtener el perfil del usuario.
authTokenRouter.get("/profile", async (req, res) => {

  // Obtener token de la cabecera y comprobar su autenticidad y caducidad.
  const { authorization } = req.headers;

  if(!authorization) return res.sendStatus(401)

  try {
    const encoder = new TextEncoder();

    // Función para verificar validez del token.
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    
    const user = USERS_BBDD.find((user) => user.guid === payload.guid);

    if (!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);
  } catch(error) {
    return res.sendStatus(401)
  }
});

export default authTokenRouter;
```

### Validaciones y Data transfer object

### Validaciones

Consisten en comprobar que la información tiene el formato o tipo correcto.

Como ya sabemos la validaciones tienen lugar en varias partes de una aplicación, en la parte del backend estas varían según la capa en la que se encuentre la información a validar. Hasta ahora en prácticas anteriores hemos recibido un objeto con “email” y “password” por parte del usuario, hemos validado su existencia pero no su formato u otras características que deba tener esa información, es hora de ir un poco más allá y definir un esquema de validación para esta información que nos pasa el usuario.

### Data transfer object (DTO)

Es un objeto que contiene información que se transfiere entre procesos.

Desde el cliente pasaremos información que llamaremos “DTO”, y en el servidor obtenemos el “DTO” y lo validamos.

Para validar el “DTO” pasado por el usuario hariamos algo como esto:

```jsx
const DTOPropertyNames = ["email", "password"];

const validateLoginDTO = (req, res, next) => {
  if (typeof req.body !== "object") return res.sendStatus(400);

  const bodyPropertys = Object.keys(req.body);

  const validateDTO =
    DTOPropertyNames.length === bodyPropertys.length &&
    DTOPropertyNames.every((DTOProperty) =>
      bodyPropertys.includes(DTOProperty)
    );

  if(!validateDTO) return res.sendStatus(400)
  
  next();
};

export default validateLoginDTO;
```

Como podemos observar en el código anterior, cada vez se vuelven más complejas las validaciones, no seguimos un estandar, entre otras cosas, en fin, no es una buena práctica validar de esta forma, es mucho mejor utilizar un par de paquetes que nos permitirán hacer esto de mejor manera, como veremos a continuación.

Paquetes:

- [ajv](https://ajv.js.org/guide/why-ajv.html): nos permite validar JSON schemas.
- [ajv-formats](https://www.npmjs.com/package/ajv-formats): para dar formatos a nuestros esquemas.
- [ajv-errors](https://www.npmjs.com/package/ajv-errors): para dar mensajes de error.
- [@sinclair/typebox](https://www.npmjs.com/package/@sinclair/typebox): nos ayudará a sustituir nuestras configuraciones por funciones simples.

```jsx
import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import Ajv from "ajv";

const loginSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El tipo debe ser un string",
        format: "Debe contener un correo electrónico válido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El tipo de password debe ser un string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier");
addErrors(ajv);
const validate = ajv.compile(loginSchema);

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);

  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "/n" }));

  next();
};

export default validateLoginDTO;
```

En este código, a pesar de que en un inicio parezca algo confuso por los paquetes e implementaciones, en realidad, no lo es, primero lo que hacemos es definir un JSON schema con el paquete “@sinclair/typebox”, luego creamos una instancia de la clase “Ajv” que nos ayudará a validar este esquema, le añadimos formatos y errores, para después validarlo y gestionar los errores de una forma más cómoda.

---

### Bases de datos / Implementación con Mongoose

Bases de datos SQL, NoSQL y cómo usarlas.

### ¿Qué es una base de datos?

Conjunto de datos estructurados y almacenados perteneciente a un mismo contexto.

### Tipos de bases de datos

Se pueden clasificar de muchas formas:

Transaccionales, relacionales, documentales…

Normalmente las solemos clasificar de la siguiente forma:

### SQL

Atomicity, Consistency, Isolation and Durability (ACID).

- PostgreSQL
- SQLServer
- MySQL

### NoSQL

Basically Available, Soft state and Eventual consistency (Base).

- mongoDB
- Neo4j
- redis

### Diagrama de conexión

Backend —> TCP/UDP — PORT: 3565 — SGBD —> Database

Librerías: 

- Driver: Nos permite conectar con el SGBD.
- Query builder: Construir mensajes en el lenguaje del SGBD.
- ORM/ODM: Mapear la forma de los datos de la BD a la forma que utilizamos en JS.

En nuestro caso utilizaremos el ODM [mongoose](https://mongoosejs.com/), para instalarlo ejecutaremos el siguiente comando.

```jsx
npm i -E mongoose
```

Para crear nuestra base de datos entraremos a la web oficial de [mongodb](https://www.mongodb.com/), crearemos una cuenta con el plan gratuito y registraremos un nombre de usuario y contraseña para nuestra bbdd, la contraseña tendremos que copiarla para usarla posteriormente.

Una vez configurada y creada nuestra base de datos en la nube, veremos que ésta se encuentra vacia, para empezar a trabajar con ella debemos hacer click en la opción de conectar, esto nos generará una URL que nos permitirá conectarnos a la base de datos, colocamos nuestra contraseña en la URL y la guardamos en una variable de entorno.

Código de conexión a base de datos

```jsx
const bootstrap = async () => {
	await mongoose.connect(process.env.DB_URL);

	expressServer.listen(PORT, () => {
		console.log("Servidor desplegado en el puerto 3000");
	}
}

bootstrap();
```

Schema: un esquema en mongodb es una representación del formato de los datos que se almacenarán en la bbdd, es necesario definir un esquema por cada entidad de información.

Model: un modelo en mongodb es un objeto que necesita de un nombre y un esquema, este nos da una serie de métodos que nos permiten interactuar con la colección de datos que le corresponden.