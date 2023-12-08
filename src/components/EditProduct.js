import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const [nombre, setTitle] = useState('');
    const [precio, setPrice] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/products/update/${id}`, {
            nombre: nombre,
            precio: precio,
        });
        navigate('/');
    };

    useEffect(() => {
        getProductById();
    }, [id]); // Agrega [id] como dependencia para que se vuelva a llamar cuando cambia el ID

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setTitle(response.data.nombre); // Asegúrate de usar el nombre correcto del campo del producto
        setPrice(response.data.precio);
    };

    return (
        <div>
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <input type="text" className="input" value={ nombre } onChange={ (e) => setTitle(e.target.value) } placeholder="Actualiza el nombre" />
                </div>
                <div className="field">
                    <label className="label">Precio</label>
                    <input type="text" className="input" value={ precio } onChange={ (e) => setPrice(e.target.value) } placeholder="Actualiza el precio" />
                </div>
                <div className="field">
                    <button className="button is-primary">Actualizar</button>&nbsp;
                    <button className="button is-warning" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    )
};
export default EditProduct;