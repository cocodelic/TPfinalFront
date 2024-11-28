import React from 'react'
import useForm from '../../Hooks/useForm'
import BloqueInputLabel from '../../Components/BloqueInputLabel/BloqueInputLabel'
import { useNavigate } from 'react-router-dom'

const AgregarProductoScreen = () => {

    const navigate = useNavigate()

    const seller_id = sessionStorage.getItem('seller_id')

    const initialFormState = {
        title: '',
        price: '',
        description: '',
        stock: '',
        category: '',
        seller_id: seller_id,
        image_base64: null
    }

    const { form_state, handleChange } = useForm(initialFormState)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const URL_POST_REGISTER = 'http://localhost:7000/api/product/'
        console.log(form_state)
        const res = await fetch(URL_POST_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(form_state)
        })

        const response = await res.json()

        console.log(response)

        response.ok ? navigate('/myProducts') : ''

    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Nuevo producto</h1>
                <BloqueInputLabel forIdName={'title'} label={'Título:'} onChange={handleChange} />
                <BloqueInputLabel forIdName={'price'} label={'Precio:'} onChange={handleChange} />
                <BloqueInputLabel forIdName={'stock'} label={'Cantidad:'} onChange={handleChange} />
                <BloqueInputLabel forIdName={'description'} label={'Descripción:'} onChange={handleChange} />
                <BloqueInputLabel forIdName={'category'} label={'Categoría/s:'} onChange={handleChange} />
                <BloqueInputLabel forIdName={'image_base64'} label={'Imagen:'} onChange={handleChange} />
                <button type='submit'>Agregar</button>
            </form>
        </div>
    )
}

export default AgregarProductoScreen