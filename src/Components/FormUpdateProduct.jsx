import React from 'react'

const FormUpdateProduct = ({ action, handleChange, form_state }) => {
    return (
            <form onSubmit={action} className='producto'>
                <div className='grupo'>
                    <label htmlFor='title'>Titulo</label>
                    <input name='title' id='title' onChange={handleChange} placeholder={form_state.title} className='inputUpdate' />
                </div>
                <div className='grupo'>
                    <label htmlFor='price'>Precio</label>
                    <input name='price' id='price' onChange={handleChange} placeholder={form_state.price} className='inputUpdate' />
                </div>
                <div className='grupo'>
                    <label htmlFor='stock'>stock</label>
                    <input name='stock' id='stock' onChange={handleChange} placeholder={form_state.stock} className='inputUpdate' />
                </div>
                <div className='grupo'>
                    <label htmlFor='description'>Descripcion</label>
                    <textarea name='description' id='description' onChange={handleChange} placeholder={form_state.description} className='inputUpdate' style={{ resize: 'none' }} />
                </div>
                <button type='submit'>Actualizar producto</button>
            </form>
    )
}

export default FormUpdateProduct