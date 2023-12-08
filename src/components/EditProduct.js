import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const EditProduct = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()
    const { id } = useParams()
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/products/update/${id}`, {
            title: title,
            price: price
        })
        navigate("/")
    }
    useEffect(() => {
        getProductById()
    }, [])
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setTitle(response.data.title)
        setPrice(response.data.price)
    }
    return (
        <div>
            <form onSubmit={ updateProduct }>
                <div className="field">
                    <label className="label">Nombre</label>
                    <input type="text" className="input" value={ title } onChange={ (e) => setTitle(e.target.value) } placeholder="Actualiza el nombre" />
                </div>
                <div className="field">
                    <label className="label">Precio</label>
                    <input type="text" className="input" value={ price } onChange={ (e) => setPrice(e.target.value) } placeholder="Actualiza el precio" />
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