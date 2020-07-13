function ir_a_inicio() {
    // alert("Gracias por visitar nuestra pagina")
    location.href = "inicio.php";
}

let alerta_registro = document.getElementById("alerta-regis");
var alerta_login = document.getElementById("alerta");
var url = 'https://cryptic-beach-67438.herokuapp.com/cliente';
var url_carrito = "https://cryptic-beach-67438.herokuapp.com/interfaz";

var id = "";
var user = "";

//metodo GET
function obtenerDatos(correo, pass) {
    //-----------
    console.log(correo);
    console.log(pass);
    var aux = url;
    aux = url + "/login?email=" + correo + "&password=" + pass;
    fetch(aux).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        var vector = [data];
        //ir_a_inicio();
        //const tasks = JSON.parse(data);
        vector.forEach(task => {
            //console.log(task.id);
            //console.log(task.name);
            id = task.id;
            user = task.name;
        });
        console.log("Aqui:" + user);
        mostrar_mensaje(alerta_login, "Ingresando...", "success");
        envio();
        //ir_a_inicio();
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error);
        mostrar_mensaje(alerta_login, "Usuario no registrado", "danger");
    });
}

function obtenerTodos() {
    fetch(aux)
        .then(response => response.json())
        .then(data => {
            for (let valor of data) {
                console.log(valor.id);
                console.log(valor.name);
            }
        })
        .catch(err => console.log(err))
}

function enviar(e) {
    e.preventDefault();
    let correo = document.getElementById("user-inicio").value;
    let pass = document.getElementById("pass-inicio").value;
    if (correo != "" && pass != "") {
        obtenerDatos(correo, pass);
    } else {
        mostrar_mensaje(alerta_login, "Llene los campos", "danger");
    }
}

$(document).on('click', '#iniciar', enviar);

function mostrar_mensaje(elemento, mensaje, tipo) {
    elemento.innerHTML = `<div class="alert alert-${tipo}" role="alert">
        <strong>${mensaje}</strong></div>`;
    setTimeout(function () {
        var a = document.querySelector('.alert');
        if (a != null) {
            a.remove();
        }
    }, 2000);
}

function envio() {
    var user_cliente = document.getElementById("caja_valor");
    user_cliente.value = `${user}`;
    var id_cliente = document.getElementById("caja_valor2");
    id_cliente.value = `${id}`;
    var obj = document.getElementById("iniciar2");
    obj.click();
}

//Click en el boton Registros

$("#iniciar_registro").click(function (e) {
    e.preventDefault();
    let user = document.getElementById("user-regis").value;
    let correo = document.getElementById("correo-regis").value;
    let pass = document.getElementById("pass-regis").value;
    let telefono = document.getElementById("telefono-regis").value;
    let codepostal = document.getElementById("codepostal-regis").value;

    if (user != "" && correo != "" && pass != "") {
        ingresarDatos(user, correo, pass, telefono, codepostal);
    } else {
        mostrar_mensaje(alerta_registro, "Llene los campos", "danger");
    }
});

//metodo POST
function ingresarDatos(user, correo, pass, telefono, codepostal) {
    obtenerID_carrito();
    if (idCarrito != "") {
        var data = { name: user, email: correo, password: pass, phone: telefono, postalCode: codepostal, id_carrito : idCarrito };
        var aux = url;
        fetch(aux, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data_res) {
            console.log("Respuesta: " + data_res);
            mostrar_mensaje(alerta_registro, " Exito ", "success");
        }).catch(error => console.error('Error:', error));
    }
}


var idCarrito = "";
var ip_user = "";

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
        mostrar_mensaje(alerta_login, "Usuario no registrado", "danger");
    });
}

/*
    fetch(aux, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
*/

/* for (var clave in data){
    if (data.hasOwnProperty(clave)) {
      console.log("La clave es " + clave+ " y el valor es " + data[clave]);
    }
  } */
/* Object.keys(data).forEach(function (key) {
    console.log(key+" : "+data[key]);
});
for (let valor of data) {
    valor.id;
    valor.name;
} */


/*
async function validar2() {
    console.log((await obtenerDatos().then(function (pokemon) {
        console.log("Llega: " + pokemon);
        if (pokemon) {
            valor = true;
        }else{
            valor = false;
        }
    })));
}

function sleep(lf_ms) {
    return new Promise(resolve => setTimeout(resolve, lf_ms));
}

 function validar() {
    var respuesta = false;
    await sleep(1000);
    console.log((await obtenerDatos().then(function (pokemon) {
        console.log("Fin fetch: " + pokemon);
        respuesta = pokemon;
    })));
    return respuesta;
} */
