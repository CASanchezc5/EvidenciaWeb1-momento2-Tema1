/*Tema # 1
Desarrollar una aplicación por consola que permita seleccionar de un menú de opciones (Lista tareas, agregar tareas, completar tareas, salir) la opción que se quiera desarrollar
1. Se debe validar un inicio de sesión que tendrá como máximo 3 intentos. Una vez se cumplan los 3 intentos se debe finalizar la ejecución
2. Cualquier persona se podrá registrar e iniciar sesión, y podrá visualizar el listado de tareas y poder manipularlo
3. Implementar una función que pueda filtrar las tareas finalizadas y una que filtre las tareas activas
4. La aplicación siempre estará en ejecución y finalizará solo si el cliente decide finalizar
  a. Las tareas deben tener la siguiente información: id, nombre, descripción, estado
  b. El id no se puede repetir para ninguna tarea
*/

let usuariosRegistrados = [];

let usuarioActual = null;

function registrarUsuario() {
  let nuevoUsuario = {
    usuario: prompt("Registro de Usuario \nIngrese un nombre de usuario:"),
    contraseña: prompt("Registro de Usuario \nIngrese una contraseña:"),
  };

  usuariosRegistrados.push(nuevoUsuario);
  console.log("¡Registro exitoso! Ahora puede iniciar sesión.");
}

function iniciarSesion() {
  let intentos = 3;

  while (intentos > 0) {
    let usuarioIngresado = prompt(
      "Inicio de Sesión \nIngrese su nombre de usuario:"
    );
    let contraseñaIngresada = prompt(
      "Inicio de Sesión \nIngrese su contraseña:"
    );

    let usuarioValido = usuariosRegistrados.find(
      (usuario) =>
        usuario.usuario === usuarioIngresado &&
        usuario.contraseña === contraseñaIngresada
    );

    if (usuarioValido) {
      usuarioActual = usuarioValido;
      console.log(
        "Inicio de sesión exitoso. Bienvenido,",
        usuarioValido.usuario
      );
      mostrarMenu();
      return true;
    } else {
      console.log("Credenciales incorrectas. Por favor, intente nuevamente.");
      intentos--;
      if (intentos > 0) {
        console.log("Intentos restantes:", intentos);
      } else {
        console.log("Se han agotado los intentos. Adiós.");
      }
    }
  }
  return false;
}

// Definimos un arreglo para almacenar las tareas
let tareas = [];

// Función para agregar una nueva tarea
function agregarTarea(id, nombre, descripcion, estado) {
  // Verificamos si el ID de la tarea ya existe
  if (tareas.some((tarea) => tarea.id === id)) {
    console.log(
      "Error: El ID de la tarea ya existe. Por favor, elija otro ID único."
    );
    return;
  }

  let nuevaTarea = {
    id: id,
    nombre: nombre,
    descripcion: descripcion,
    estado: estado,
  };
  tareas.push(nuevaTarea);
  console.log("Tarea agregada con éxito.");
}

// Función para completar una tarea según su ID
function completarTarea(id) {
  let tarea = tareas.find((t) => t.id === id);

  if (tarea) {
    tarea.estado = "Finalizada";
    console.log("Tarea completada con éxito.");
  } else {
    console.log("Error: No se encontró ninguna tarea con el ID especificado.");
  }
}

// Función para filtrar las tareas finalizadas
function filtrarTareasFinalizadas() {
  return tareas.filter((tarea) => tarea.estado === "Finalizada");
}

// Función para filtrar las tareas activas
function filtrarTareasActivas() {
  return tareas.filter((tarea) => tarea.estado === "Activa");
}

function mostrarMenu() {
  console.log("Menú de opciones:");
  console.log("1. Ver tareas");
  console.log("2. Agregar tarea");
  console.log("3. Completar tarea");
  console.log("4. Salir");

  let opcion = prompt("Ingrese el número de la opción deseada:");

  switch (opcion) {
    case "1":
      // Lógica para ver las tareas
      console.log("Listado de tareas:");
      // Lógica para ver las tareas
      console.log("Listado de tareas:");
      console.log(tareas);

      mostrarMenu();
      break;
    case "2":
      // Lógica para agregar tarea
      let id = parseInt(prompt("Ingrese el ID de la tarea:"));
      let nombre = prompt("Ingrese el nombre de la tarea:");
      let descripcion = prompt("Ingrese la descripción de la tarea:");
      let estado = "Activa"; // Por defecto, la tarea se agrega como activa
      agregarTarea(id, nombre, descripcion, estado);
      mostrarMenu();
      break;
    case "3":
      // Lógica para completar tarea
      let idTareaCompletar = parseInt(
        prompt("Ingrese el ID de la tarea a completar:")
      );
      completarTarea(idTareaCompletar);
      mostrarMenu();
      break;
    case "4":
      // Filtrar tareas finalizadas
      console.log("Tareas finalizadas:");
      console.log(filtrarTareasFinalizadas());
      mostrarMenu();
      break;
    case "5":
      // Filtrar tareas activas
      console.log("Tareas activas:");
      console.log(filtrarTareasActivas());
      mostrarMenu();
    default:
      console.log("Opción no válida. Por favor, seleccione una opción válida.");
      mostrarMenu();
      break;
  }
}

function iniciarAplicacion() {
  console.log("Bienvenido a la aplicación de tareas.");
  registrarUsuario();
  iniciarSesion();
}

iniciarAplicacion();
