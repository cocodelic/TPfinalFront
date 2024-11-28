import React from 'react'
import { BloqueInputLabel } from '../index'
import './RegisterScreen.css'
import { NavLink, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'



const RegisterScreen = () => {
    const initialFormState = {
        password: '',
        name: '',
        email: ''
    }

    const { form_state, handleChange } = useForm(initialFormState)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const URL_POST_REGISTER = 'http://localhost:7000/api/auth/register'

        const res = await fetch(URL_POST_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form_state)
        })

        const response = await res.json()

        console.log(response)


        setTimeout(() => {
            if (response.code === 'REGISTER_SUCCESS') {
                return navigate('/login')
            }
            return
        },
            3000)

    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Registrate</h1>
                <BloqueInputLabel forIdName={'email'} label={'Email:'} onChange={handleChange}/>
                <BloqueInputLabel forIdName={'name'} label={'Nombre:'} onChange={handleChange} />
                <BloqueInputLabel forIdName={'password'} label={'Password:'} type={'password'} onChange={handleChange} />
                <button type='submit' >Iniciar sesión</button>
                <NavLink to={'/login'}>Ya tengo cuenta</NavLink>
            </form>
        </div>
    )
}

export default RegisterScreen