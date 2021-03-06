<div class="row">
    <div class="col-md-4 mx-auto">
        <div class="card mt-4 text-center">
            <div class="card border-primary mb-3 h2">
                <div class="card-header font-italic text-danger"
                    style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">
                    ~ SportStore ~
                </div>
                <div class="card-header font-italic text-info"
                    style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">
                    Registrar Compra
                </div>
            </div>
            <div class="card-body" style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">
                <form action="/compras/registrarCompra" method="POST">
                    <div class="form-group">
                        <input type="producto" name="ProductoCompra" class="form-control" placeholder="Producto"
                            style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">
                    </div>
                    <div class="form-group">
                        <input type="cantidad" name="Cantidad" class="form-control" placeholder="Cantidad"
                            style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">
                    </div>
                    <div class="form-group">
                        <button type="AgregarProductos" class="btn btn-primary btn-block btn-info"
                            style="font-family: 'Times New Roman', Times, serif; color: aliceblue;">
                            Agregar producto
                        </button>
                    </div>
                </form>
                <form action='/compras/finalCompra' method="POST">
                    <div class="form-group">
                        <center>
                            <button class="btn btn-primary btn-block btn-lg" type="submit"
                                style=" background-color:rgb(14, 141, 180); color-text:aliceblue; height:50px; font-size:25px;">
                                <!--<a href="/mostrar/carrito" class="text-primary">
                                            finalCompra	
                                        </a>-->
                                Terminar compra
                            </button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>