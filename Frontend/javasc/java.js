//Oculta el menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(document).ready(function () {
    console.log("ready!");
    var pg_clientes = document.getElementById("TAB_Cliente");
    if (pg_clientes != null) {
        cargarClientes();
    }
});

$("#wrapper").toggleClass("toggled");

var ID_cliente_editando = 0;
var alerta = document.getElementById("alerta_cliente");
var btn_guardar = document.getElementById("guardar_cliente");
var editando = false;

var url_clientes = "https://cryptic-beach-67438.herokuapp.com/";
var url_clientes_ip = "http://cryptic-beach-67438.herokuapp.com/api/listar";
var url_carrito = "https://cryptic-beach-67438.herokuapp.com/interfaz";
var url_facturas = "https://facturacionapp9.herokuapp.com/api/";
var url_solicitudes = "https://springtest999.herokuapp.com/api/solicituddevolucion/";
var url_cliente_no = "https://cryptic-beach-67438.herokuapp.com/api";

/* TAB_Factura
TAB_Cliente
TAB_devoluciones
TAB_sugerencias */


var facturas;

function cargarFacturas(e) {
    e.preventDefault();
    var id_cliente = document.getElementById("txt_buscar_factura").value;
    if (id_cliente != "") {
        let url = url_facturas + "cliente?id=" + id_cliente;
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            facturas = data;
            let template = '';
            data.forEach(task => {
                template +=
                    `<tr>
                <td>${task.id}</td>
                <td>${task.idCliente}</td>
                <td>${task.fecha}</td>
                <td>${task.hora}</td>
                <td>${task.total}</td>
                <td>${task.estado}</td>
                <td>
                <button class="btn btn-secondary task-ver-factura" data-toggle="modal" data-target="#exampleModal1">
                Ver
                </button>
                </td>
                </tr>`;
            });
            template += `
            <tr class='noSearch hide'>
                <td colspan="5"></td>
            </tr>`;
            console.log("factura-lista");
            $('#body_tabla_facturas').html(template);
        }).catch(err => {
            console.log(err);
        });
    }

}

function cargarSolicitudes(e) {
    e.preventDefault();
    var id_cliente = document.getElementById("txtBuscarDevol").value;
    if (id_cliente != "") {
        let url = url_solicitudes + "idcliente=" + id_cliente;
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            let template = '';
            data.forEach(task => {
                template +=
                    `<tr>
                <td>${task.idSolicitud}</td>
                <td>${task.fechaDeRegistro}</td>
                <td>${task.idFactura}</td>
                <td>${task.idCliente}</td>
                <td>${task.motivoDevolucion}</td>
                <td>${task.estadoAprobacion}</td>
                </tr>`
            });
            template += `
                <tr class='noSearch hide'>
                    <td colspan="5"></td>
                </tr>`;
            $('#bodyTablaDevol').html(template);
        }).catch(err => {
            console.log(err);
        });
    }
}

function verProductosDevolucion() {
    let modal = document.getElementById("modalDevoluciones");
    modal.innerHTML = `<div class="modal-dialog " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Productos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div></div>
      <div class="modal-body">
        <form>
        <table class="table table-hover table-bordered tabla_content" id="tablaDetalle">
        <thead class="thead-dark">
          <tr>
            <th>Id_Producto</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody id="tableIDcoop">
          <!--contenteditable="true"-->
          <tr>
            <td>123</td>
            <td>Tv Samsung</td>
          </tr>
          <tr>
            <td>345</td>
            <td>Cocina Indurama 34R</td>
          </tr>
          <tr class='noSearch hide'>
            <td colspan="5"></td>
          </tr>
        </tbody>
      </table>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
    `;
    //alert("click");
    console.log("sad");
}

function cargarClientesNoRegistrados() {
    let url = url_clientes_ip;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.direccionIp}</td>
            <td>${task.idCarrito}</td>
            <td>${task.fecha}</td>
            <td>
            <button class="task-delete-ip btn btn-danger">
                Delete
            </button>
            </td>
            </tr>`
        });
        template += `
            <tr class='noSearch hide'>
                <td colspan="5"></td>
            </tr>`;
        $('#bodyTablaIps').html(template);
    }).catch(err => {
        console.log(err);
    });
}

function guardarClientes(e) {
    e.preventDefault();
    let usuario = document.getElementById('usuario').value;
    let correo = document.getElementById('correo').value;
    let contraseña = document.getElementById('contraseña').value;
    let telefono = document.getElementById('telefono').value;
    let saldo = document.getElementById('saldo').value;
    let estado = document.getElementById('estado').value;
    // Validacion de campos vacios
    if (usuario === '' || correo === '' || contraseña === '' || estado === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    }
    if (editando == true) { //se esta editando
        editarCliente(usuario, correo, contraseña, telefono, saldo, estado);
        return;
    }
    nuevoCliente(usuario, correo, contraseña, telefono, 0, estado);
}

//metodo POST
function nuevoCliente(usuario, correo, contraseña, telefono, saldo, estado) {
    obtenerID_carrito();
    if (idCarrito != "") {
        var data = { name: usuario, email: correo, password: contraseña, phone: telefono, saldo: saldo, state: estado, id_carrito: idCarrito };
        let url = url_clientes + "/cliente";
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data_res) {
            console.log("Respuesta: " + data_res);
            cambiar_texto(false, btn_guardar);
            limpiar("entrada_cliente");
            mostrar_mensaje('Exito', alerta, 'success');
            cargarClientes();
        }).catch(function (error) {
            console.log('Error post: ' + error);
            mostrar_mensaje('No se pudo agregar', alerta, 'danger');
        });
    }
}

//metodo PUT
function editarCliente(usuario, correo, contraseña, telefono, saldo, estado) {
    var data = { id: ID_cliente_editando, name: usuario, email: correo, password: contraseña, phone: telefono, state: estado };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar);
        limpiar("entrada_cliente");
        editando = false;
        mostrar_mensaje('Se ha modificado', alerta, 'success');
        cargarClientes();
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta, 'danger');
    });
}

//metodo GET
function cargarClientes() {
    let url = url_clientes + "cliente/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.email}</td>
            <td>${task.password}</td>
            <td>${task.phone}</td>
            <td>${task.saldo}</td>
            <td>${task.state}</td>
            <td>
            <button class="task-ver btn btn-secondary">
              Editar
            </button>
            </td>
            <td>
                <button class="task-delete btn btn-danger">
                Delete
                </button>
            </td>
            </tr>`
        });
        template += `
        <tr class='noSearch hide'>
            <td colspan="5"></td>
        </tr>`
        console.log("listo");
        $('#body_tabla_clientes').html(template);
    }).catch(err => {
        console.log(err);
    });
}

//metodo DELETE
function eliminarClientes() {
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = element.cells[0].innerText;
        let url = url_clientes + "/cliente?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        });
    }
}

//metodo DELETE
function eliminarClientesIP() {
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = element.cells[0].innerText;
        let url = url_cliente_no + "?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        });
    }
}

function agregarAlCarrito(e) {
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    const idProducto = datos[0].innerText;
}

function agregar_Ip() {
    var idCarritoaux;
    var idIpaux;
    var fecha = new Date();
    var f = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    var aux = url_carrito;
    fetch(aux).then(function (response) {
        return response.json();
    }).then(function (data) {
        var vector = [data];
        vector.forEach(task => {
            idCarritoaux = task.idCarrito;
            idIpaux = task.ip;
        });
        //alert(f + " " + idCarritoaux + " " + idIpaux);
        if (f != null && idCarritoaux != null && idIpaux != null) {
            var data = { direccionIp: idIpaux, idCarrito: idCarritoaux, fecha: f };
            let url = url_cliente_no;
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data_res) {
                console.log("Respuesta: " + data_res);
                cargarClientesNoRegistrados();
            }).catch(function (error) {
                console.log('Error post: ' + error);
            });
        }
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
    });

}



$(document).on('click', '#buscar_facturas', cargarFacturas);

$(document).on('click', '#buscar_devoluciones', cargarSolicitudes);

$(document).on('click', '#tab_clientes', cargarClientes);

$(document).on('click', '#tab_clientes_no', cargarClientesNoRegistrados);

$(document).on('click', '.task-delete', eliminarClientes);

$(document).on('click', '.task-delete-ip', eliminarClientesIP);

$(document).on('click', '.agregar_a_carrito', agregarAlCarrito);

$(document).on('click', '#generar_cliente', agregar_Ip);

$(document).on('click', '.task-ver', (e) => {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    const idPersona = datos[0].innerText;
    console.log(idPersona);
    ID_cliente_editando = idPersona;
    $('#usuario').val(datos[1].innerText);
    $('#correo').val(datos[2].innerText);
    $('#contraseña').val(datos[3].innerText);
    $('#telefono').val(datos[4].innerText);
    $('#saldo').val(datos[5].innerText);
    $('#estado').val(datos[6].innerText);
    editando = true;
    cambiar_texto(true, btn_guardar);
    e.preventDefault();
});

$(document).on('click', '.task-ver-factura', (e) => {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    const idFactura = datos[0].innerText;
    let template = '';
    facturas.forEach(task => {
        if (task.id === idFactura) {
            task.items.forEach(lista => {
                template +=
                    `<tr>
                <td>${lista.id}</td>
                <td>${lista.nombre}</td>
                <td>${lista.unidades}</td>
                <td>${lista.precioUnitario}</td>
                </tr>`;
            });
        }
    });
    $('#body_tabla_modal').html(template);
    e.preventDefault();
});

$(document).on('click', '#guardar_cliente', guardarClientes);

var idCarrito = "";
//metodo GET
function obtenerID_carrito() {
    var aux = url_carrito;
    fetch(aux).then(function (response) {
        return response.json();
    }).then(function (data) {
        var vector = [data];
        vector.forEach(task => {
            idCarrito = task.idCarrito;
            //ip_user = task.ip;
        });
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
    });
}

function mostrar_mensaje(mensaje, elemento, tipo_alerta) {
    elemento.innerHTML = `<div class="alert alert-${tipo_alerta} campo" role="alert">
    <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}

function cambiar_texto(band, element) {
    if (band == true) {
        element.setAttribute('value', "Guardar cambios");
    } else {
        element.setAttribute('value', "Ingresar nuevo");
    }
}

function limpiar(card) {
    document.getElementById(card).reset();
}

/*---Busquedas de las tablas */
/*La busqueda se realizan al ingresar texto en el input*/

function doSearch() {
    const tableReg = document.getElementById('tablaFactura');
    const searchText = document.getElementById('txt_buscar_factura').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}

function doSearchCliente() {
    const tableReg = document.getElementById('tablaCliente');
    const searchText = document.getElementById('txt_buscar_cliente').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}

function doSearchClienteNo() {
    const tableReg = document.getElementById('tablaClienteNo');
    const searchText = document.getElementById('txt_buscar_cliente_no').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}

function doSearchDevol() {
    const tableReg = document.getElementById('tablaDevolucion');
    const searchText = document.getElementById('txtBuscarDevol').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}

function doSearchSuge() {
    const tableReg = document.getElementById('tablaSuge');
    const searchText = document.getElementById('txt_buscar_suge').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}