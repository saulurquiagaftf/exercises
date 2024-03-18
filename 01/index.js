const readline = require('readline');

class Product {
  constructor(name, quantity, unitPrice) {
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  getTotalPrice() {
    return this.quantity * this.unitPrice;
  }
}

class Order {
  constructor(id) {
    this.id = id;
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  getTotal() {
    let total = 0;
    for (let product of this.products) {
      total += product.getTotalPrice();
    }
    return total;
  }

  printInfo() {
    console.log(`- Orden ${this.id}, Total: ${this.getTotal()}`);
    console.log("Productos: ");
    this.products.forEach((product, index) => {
      console.log(`   Producto ${index + 1}: Nombre ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.unitPrice}`)
    })
  }
}

const orders = [];
let orderCounter = 1;

function generateOrderId() {
  const orderId = "PO" + orderCounter.toString().padStart(3, "0");
  orderCounter++;
  return orderId;
}

function showMenu() {
  console.log("---------------------------------------------------------------");
  console.log("Elija lo que desea hacer:");
  console.log("1. Listar ordenes");
  console.log("2. Buscar Orden");
  console.log("3. Crear Orden");
  console.log("4. Salir");

  rl.question('Opcion: ', (opcion) => {

    opcion = parseInt(opcion);

    // Verificamos la opción ingresada y ejecutamos la función correspondiente
    switch (opcion) {
      case 1:
        listOrders();
        break;
      case 2:
        searchOrder();
        break;
      case 3:
        createOrder();
        break;
      case 4:
        rl.close();
        process.exit();
      default:
        console.log("Opción inválida");
        showMenu();
    }
  });
}

function listOrders() {
  if (orders.length === 0) {
    console.log("No hay órdenes disponibles.");
  } else {
    orders.forEach((order, _) => {
      order.printInfo();
    });
  }
  showMenu();
}

function searchOrder() {
  
  rl.question('Ingrese el ID de la orden: ', (id) => {
    // Verificamos si existe una orden con el ID proporcionado
    const order = orders.find(order => order.id === id);

    if (order) {
      showOrderInfo(order);
    } else {
      console.log("No se encontro orden :(");
    }

    showMenu();
  });
}


function createOrder() {
  
  const orderId = generateOrderId();

  console.log("------------ Orden %s  ------------", orderId);

  const order = new Order(orderId);

  showOrderMenu(order);
}

function showOrderMenu(order) {
  console.log("¿Qué desea hacer?");
  console.log("1. Agregar Producto");
  console.log("2. Finalizar");

  rl.question('Opcion: ', (opcion) => {
    opcion = parseInt(opcion);

    switch (opcion) {
      case 1:
        addProduct(order);
        break;
      case 2:
        orders.push(order);
        showMenu();
        break;
      default:
        console.log("Opción inválida");
        showOrderMenu(order);
    }
  });
}

function addProduct(order) {
  rl.question('Ingrese el nombre del producto: ', (nombre) => {
    rl.question('Ingrese la cantidad del producto: ', (cantidad) => {
      rl.question('Ingrese el precio del producto: ', (precio) => {
        cantidad = parseInt(cantidad);
        precio = parseFloat(precio);

        // Verificar si cantidad es un número entero y precio es un número decimal
        if (!Number.isInteger(cantidad) || isNaN(precio)) {
          console.log("Valor incorrecto. La cantidad debe ser un numero entero y el precio debe ser un numero decimal.");
          addProduct(order);
          return;
        }

        // Añadir el producto a la orden
        const product = new Product(nombre, cantidad, precio);
        order.addProduct(product);
        console.log("Success :) Producto agregado.");

        showOrderMenu(order);
      });
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mostramos el menú de opciones
showMenu();