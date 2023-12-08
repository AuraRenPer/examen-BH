import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [imagen, setImagen] = useState(null); // Nuevo estado para la imagen
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('cantidad', cantidad);
        formData.append('imagen', imagen); // Agregar la imagen al FormData

        await axios.put(`http://localhost:8080/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        navigate('/');
    };


    useEffect(() => {
        getProductById();
    }, [id]); // Agrega [id] como dependencia para que se vuelva a llamar cuando cambia el ID

    const getProductById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products/${id}`);
            console.log(response.data); // Verifica si estás recibiendo los datos esperados
            setNombre(response.data.nombre);
            setPrecio(response.data.precio);
            setCantidad(response.data.cantidad); // Ajusta esta línea según la estructura de tu producto
        } catch (error) {
            console.error("Error fetching product by ID:", error);
        }
    };

    return (
        <div>
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <input
                        type="text"
                        className="input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Actualiza el nombre"
                    />
                </div>
                <div className="field">
                    <label className="label">Precio</label>
                    <input type="text" className="input" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Actualiza el precio" />
                </div>
                <div className="field">
                    <label className="label">Cantidad</label>
                    <input type="text" className="input" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Actualiza el precio" />
                </div>
                <div className="field">
                    <label className="label">Imagen</label>
                    <div className="file has-name">
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImagen(e.target.files[0])}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">Seleccionar archivo...</span>
                            </span>
                            <span className="file-name">{imagen ? imagen.name : "Ningún archivo seleccionado"}</span>
                        </label>
                    </div>
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