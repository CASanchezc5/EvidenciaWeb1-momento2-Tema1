// Array para almacenar los usuarios registrados
let users = [
  { username: "usuario1", password: "123" },
  // Agrega más usuarios si es necesario
];

let tasks = [];

// Función para agregar un nuevo usuario
function addUser(username, password) {
  users.push({ username: username, password: password });
}

// Función para validar el inicio de sesión
function validateLogin(username, password) {
  return users.some(
    (user) => user.username === username && user.password === password
  );
}

// Función para mostrar el menú y obtener la opción del usuario
function showMenu() {
  return parseInt(
    prompt(
      "Seleccione una opción:\n" +
        "1. Lista de tareas\n" +
        "2. Agregar tarea\n" +
        "3. Completar tarea\n" +
        "4. Tareas activas\n" +
        "5. Tareas finalizadas\n"
    )
  );
}

// Función para generar un ID único para cada tarea
function generateId() {
  return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

/// Función para agregar una tarea
function addTask() {
  let name = prompt("Ingrese el nombre de la tarea:");
  let description = prompt("Ingrese la descripción de la tarea:");
  let id = generateId();
  let state = "pendiente"; // Por defecto, la tarea se agrega como pendiente
  tasks.push({
    id: id,
    name: name,
    description: description,
    state: state,
    completed: false,
  });
  console.log("Tarea agregada exitosamente.");
}

// Función para listar todas las tareas
function listTasks() {
  console.log("Listado de tareas:");
  tasks.forEach((task) => {
    console.log(
      `${task.id}. ${task.name} - ${task.description} - ${task.state}(${
        task.completed ? "Completada" : "Pendiente"
      })`
    );
  });
}

// Función para completar una tarea
function completeTask() {
  let id = parseInt(prompt("Ingrese el ID de la tarea que desea completar:"));
  let task = tasks.find((task) => task.id === id);
  if (task) {
    if (!task.completed) {
      task.completed = true;
      console.log("Tarea completada exitosamente.");
    } else {
      console.log("¡Esta tarea ya está completada!");
    }
  } else {
    console.log("No se encontró ninguna tarea con ese ID.");
  }
}

// Función para filtrar tareas finalizadas
function filterCompletedTasks() {
  console.log("Tareas completadas:");
  let completedTasks = tasks.filter((task) => task.completed);
  if (completedTasks.length === 0) {
    console.log("No hay tareas completadas.");
  } else {
    completedTasks.forEach((task) =>
      console.log(`${task.id}. ${task.name} - ${task.description}`)
    );
  }
}

// Función para filtrar tareas activas (pendientes)
function filterActiveTasks() {
  console.log("Tareas activas:");
  let activeTasks = tasks.filter((task) => !task.completed);
  if (activeTasks.length === 0) {
    console.log("No hay tareas activas.");
  } else {
    activeTasks.forEach((task) =>
      console.log(`${task.id}. ${task.name} - ${task.description}`)
    );
  }
}

// Función principal
function main() {
  let loggedIn = false;
  let attempts = 0;

  while (!loggedIn && attempts < 3) {
    let username = prompt("Iniciar Sesión \nIngrese su nombre de usuario:");
    let password = prompt("Iniciar Sesión \nIngrese su contraseña:");

    // Validar inicio de sesión
    loggedIn = validateLogin(username, password);

    if (!loggedIn) {
      let register = prompt(
        "¿Desea registrar un nuevo usuario? (Sí/No)"
      ).toLowerCase();
      if (register === "sí" || register === "si") {
        let newUser = prompt(
          "Registrar \nIngrese el nombre de usuario para el nuevo registro:"
        );
        let newPassword = prompt(
          "Registrar \nIngrese la contraseña para el nuevo registro:"
        );
        addUser(newUser, newPassword);
        console.log("Nuevo usuario registrado con éxito.");
      }

      attempts++;
      console.log(
        "Nombre de usuario o contraseña incorrectos. Intentos restantes: " +
          (3 - attempts)
      );
    }
  }

  if (loggedIn) {
    console.log("Inicio de sesión exitoso.");

    let option;
    do {
      option = showMenu();

      switch (option) {
        case 1:
          listTasks();
          break;
        case 2:
          addTask();
          break;
        case 3:
          filterCompletedTasks();
          break;
        case 4:
          filterActiveTasks();
          break;
        case 5:
          completeTask();
          break;
        case 6:
          console.log("Gracias por usar la aplicación.");
          break;
        default:
          console.log("Opción inválida.");
      }
    } while (option !== 4);
  } else {
    console.log("Se ha excedido el número máximo de intentos. Adiós.");
  }
}

// Función para iniciar la aplicación
function startApp() {
  while (true) {
    main();
    let decision = prompt(
      "¿Desea salir de la aplicación? (Sí/No)"
    ).toLowerCase();
    if (decision === "sí" || decision === "si") {
      console.log("Hasta luego.");
      break;
    }
  }
}

// Iniciar la aplicación
startApp();
