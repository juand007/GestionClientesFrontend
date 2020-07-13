var USER = "admin";
var PASSWORD = "1234";
var alerta;

$(document).ready(function () {
    console.log("ready!");
    alerta = document.getElementById("alerta");
});

function ir_a_inicio() {
    // alert("Gracias por visitar nuestra pagina")
    location.href = "./inicio.html"
}



//Click en el boton iniciar
$("#iniciar").click(function (e) {
    e.preventDefault();
    let user = document.getElementById("user-inicio").value;
    let pass = document.getElementById("pass-inicio").value;

    if (user != "" && pass != "") {
        if (USER == user && PASSWORD == pass) {
            //document.getElementById("demo").innerHTML = "Buscando..."; //colocar valores en una etiqueta
            mostrarMensaje("Ingresando", "sucess");
            ir_a_inicio();
        } else {
            mostrarMensaje("Usuario no registrado", "danger");
        }
    } else {
        mostrarMensaje("Llene los campos", "danger");
    }
});

function mostrarMensaje(mensaje, tipo_alerta) {
    alerta.innerHTML = `<div class="alert alert-${tipo_alerta}" role="alert">
        <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}

/*--Futira implementacion de una base de datos en la nube y consultar ahi el login*/

//Click en el boton iniciar
$("#iniciar_registro").click(function (e) {
    e.preventDefault();
    let user = document.getElementById("user-regis").value;
    let correo = document.getElementById("correo-regis").value;
    let pass = document.getElementById("pass-regis").value;
    let telefono = document.getElementById("telefono-regis").value;
    let alerta = document.getElementById("alerta-regis");

    if (user != "" && correo != "" && pass != "") {
        //document.getElementById("demo").innerHTML = "Buscando..."; //colocar valores en una etiqueta
        alerta.innerHTML = `<p class="temporal">Ingresando...</p>`;
        document.getElementById("alerta-regis").style.color = "green";
        setTimeout(function () { document.querySelector('.temporal').remove(); }, 2000);
        ir_a_inicio();
    } else {

    }
});

var url = 'https://cryptic-beach-67438.herokuapp.com/cliente/';

//metodo GET
function obtenerDatos() {
    //$('#tablaCoopID').html(``);
    //client?id=1&name=%22James%20Bond%22
    document.getElementById("tableIDcoop").innerHTML = ``;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        /*
        for (var i = 0, len = data.length; i < len; i++) {
            objeto_coop.agregarFila(tablaID, data[i].id, data[i].nombre, data[i].buses, data[i].estado);
        }
        reiniciarAtributos();
        const tasks = JSON.parse(data);*/
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.nombre}</td>
            <td>${task.buses}</td>
            <td>${task.estado}</td>
            <td><button class="task-delete btn btn-danger">Delete</button></td>
            </tr>`
        });
        $('#tableIDcoop').html(template);
        reiniciarAtributos();
    }).catch(err => {
        console.log(err);
    });
}
