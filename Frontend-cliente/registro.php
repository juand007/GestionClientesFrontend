<?php
    session_start();
    //si existe una sesion abierta lo redirecciona a pg de inicio
    //si no se queda en la actual (esta).
    if(isset($_SESSION['id_usuario'])){
      header("Location: inicio.php");
      $variable=$_SESSION['id_usuario'];
      $id_user=$_SESSION['id_identificador'];
    }
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>
        Usuario
    </title>
    <!--Made with love by Mutiullah Samim -->

    <!-- Bootstrap barra-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <link rel="stylesheet" href="estilos/login.css">
</head>

<body>
    <div class="container d-flex justify-content-center">
        <div class="card card-registro">
            <div class="card-header">
                <h3 class="">Crea un cuenta</h3>
            </div>
            <div class="card-body">
                <form id="form_registro">
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/person.svg">
                        </span>
                        <input id="user-regis" type="text" class="form-control" placeholder="username" value="">
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/person.svg">
                        </span>
                        <input id="correo-regis" type="email" class="form-control" placeholder="correo" value="">
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/lock.svg">
                        </span>
                        <input id="pass-regis" type="password" class="form-control" placeholder="password" value="">
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/person.svg">
                        </span>
                        <input id="telefono-regis" type="text" class="form-control" placeholder="telefono" value="">
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/person.svg">
                        </span>
                        <input id="codepostal-regis" type="text" class="form-control" placeholder="Codigo postal" value="">
                    </div>
                    <div class="d-flex justify-content-center">
                        <!--a id="iniciar" href="./inicio.html" class="btn login_btn login-color" role="button">Iniciar</a-->
                        <button id="iniciar_registro" class="btn btn-outline-success my-2 my-sm-0 login-color"
                            type="submit">
                            Iniciar</button>
                    </div>
                    <div class="pt-3" id="alerta-regis"></div>
                    <div class="texto_login"><a class="texto_login" href="index.php">Ya tengo una cuenta</a></div>
                </form>
            </div>
        </div>
    </div>

    <!-- Importaciones -->
    <!-- Importaciones -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <!--script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script-->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"></script>
    <script src="javasc/login.js"></script>
</body>

</html>