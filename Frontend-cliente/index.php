<?php
	session_start();
	if(isset($_SESSION['id_usuario'])){
		header("Location: inicio.php");
    };

    //user-inicio;
    if( isset($_POST["mandar2"])){
        echo 'Aqui';
        $user=$_POST['user'];
        $id=$_POST['id'];
        $_SESSION['id_usuario']=$user;
        $_SESSION['id_identificador']=$id;
        header("Location: inicio.php");
    };
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
        <div class="card">
            <div class="card-header">
                <h3 class="">Iniciar sesion</h3>
            </div>
            <div class="card-body">
                <!--form-->
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/person.svg">
                        </span>
                        <!--input id="user-inicio" type="text" class="form-control" placeholder="username"-->
                        <input id="user-inicio" name="User" type="email" class="form-control" placeholder="Correo" value="lindamorrison@eventage.com">
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/lock.svg">
                        </span>
                        <input id="pass-inicio" name="Pass" type="password" class="form-control" placeholder="password" value="Koffee">
                    </div>
                    <div class="d-flex justify-content-center pt-5">
                        <!--a id="iniciar" href="./inicio.html" class="btn login_btn login-color" role="button">Iniciar</a-->
                        <button id="iniciar" class="btn btn-outline-success my-2 my-sm-0 login-color" type="submit">
                            Ingresar</button>
                    </div>
                    <div class="pt-3" id="alerta"></div>
                    <div class="texto_login"><a class="texto_login" href="registro.php">¿No tienes una cuenta?</a></div>
                <!--/form-->
            </div>
        </div>
    </div>
    <div class="fade">
        <form action="<?php $_SERVER["PHP_SELF"]; ?>" method="POST">
            <input type="text" name="user" id="caja_valor" value="">
            <input type="text" name="id" id="caja_valor2" value="">
            <button id="iniciar2" name="mandar2" class="btn btn-outline-success my-2 my-sm-0 login-color" type="submit">
                Ingresar</button>
        </form>
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