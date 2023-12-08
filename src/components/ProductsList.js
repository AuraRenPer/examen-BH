import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const ListProduct = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        const products = await axios.get('http://localhost:8080/products')
        setProducts(products.data)
    }
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            getProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    return (
        <div>
            <h1>Listado de productos</h1>
            <Link to="/add" className="button is-primary mt-5">Añadir nuevo producto</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th width="150">Acciones</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>
                                <Link to={`/edit/${product.id}`} className="button is-small is-info">Editar</Link>
                                &nbsp;
                                <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">Borrar</button>
                            </td>
                            <td>{index + 1}</td>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.cantidad}</td>
                            <td>
                                {product.imagen && ( 
                                    <img
                                        src={`http://localhost:8080uploads/${product.imagen}`} 
                                        alt={product.nombre}
                                        style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                    />
                                )}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
};
export default ListProduct