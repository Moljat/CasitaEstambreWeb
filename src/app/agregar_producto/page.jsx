import React from 'react';

const AgregarProducto = () => {
    return (
        <div>
            <h1>Agregar Producto</h1>
            <form>
                <div>
                    <label htmlFor="nombre">Nombre del Producto:</label>
                    <input type="text" id="nombre" name="nombre" />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion"></textarea>
                </div>
                <div>
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" />
                </div>
                <div>
                    <label htmlFor="categoria">Categoría:</label>
                    <select id="categoria" name="categoria">
                        <option value="ropa">Ropa</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AgregarProducto;