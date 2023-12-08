import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AddProduct = () => {
    const [nombre, setTitle] = useState('')
    const [precio, setPrice] = useState(0)
    const navigate = useNavigate()
    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/products', {
            nombre: nombre,
            precio: precio
        })
        navigate("/")
    }
    return (
        <div>
            <form onSubmit={ saveProduct }>
                <div className="field">
                    <label className="label">Name</label>
                    <input type="text" className="input" value={ nombre } onChange={ (e) => setTitle(e.target.value) } placeholder="nama" />
                </div>
                <div className="field">
                    <label className="label">Price</label>
                    <input type="text" className="input" value={ precio } onChange={ (e) => setPrice(e.target.value) } placeholder="harga" />
                </div>
                <div className="field">
                    <button className="button is-primary">Guardar Producto</button>&nbsp;
                    <button className="button is-warning" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    )
};
export default AddProduct;