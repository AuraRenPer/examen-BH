import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bulma/css/bulma.min.css';

const AddProduct = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [imagen, setImage] = useState(null);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('imagen', imagen);

        await axios.post('http://localhost:8080/products', formData);
        navigate('/');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="container">
            <form onSubmit={saveProduct} encType="multipart/form-data">
                <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Nombre"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Precio</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            placeholder="Precio"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Cantidad</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="Precio"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="input"
                        />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Guardar Producto
                        </button>
                    </div>
                    <div className="control">
                        <button
                            type="button"
                            className="button is-warning"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
