const empleados = [
  {
    id: 1,
    nombre: "Carles",
  },
  {
    id: 2,
    nombre: "Fabio",
  },
  {
    id: 3,
    nombre: "María",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado
      ? resolve(empleado)
      : reject(`Empleado con el id ${id} no existe.`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario
      ? resolve(salario)
      : reject(`Empleado con id ${id} no tiene salario.`);
  });
};

const id = 3;

// Esta solución no resuelve la problemática anterior
// getEmpleado(id)
//   .then((empleado) => console.log(empleado))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.log(err));

// Ha esto lo podemos llamar "el Promise Hell"
// getEmpleado(id)
//   .then((empleado) => {
//     getSalario(id)
//       .then((salario) => {
//         console.log("El empleado ", empleado, "tiene un salario de ", salario);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err)
//   });

// Esta es una mejor solución

// let nombre;

// getEmpleado(id)
//   .then((empleado) => {
//     nombre = empleado;
//     return getSalario(id);
//   })
//   .then((salario) => {
//     console.log("El empleado", nombre, "tiene un salario de", salario, "$");
//   })
//   .catch((err) => console.log(err));

const getInfoEmpleado = async (id) => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `El empleado ${empleado} tiene un salario de ${salario}.`;
  } catch (error) {
    throw error;
  }
};

getInfoEmpleado(id)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
