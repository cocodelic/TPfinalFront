import React, { useContext } from 'react'
import BloqueInputLabel from '../../Components/BloqueInputLabel/BloqueInputLabel'
import { NavLink, useNavigate } from 'react-router-dom'
import './LoginScreen.css'
import { AuthContext } from '../../Context/AuthContext'

const LoginScreen = () => {

    const {setIsAuthenticated, login} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const loginData = new FormData(e.target)

        const formData = {
            email: loginData.get('email'),
            password: loginData.get('password')
        }

        const URL_POST_LOGIN = 'http://localhost:7000/api/auth/login'

        await fetch(URL_POST_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
            .then(async (res) => {

                const response = await res.json()
                
                setTimeout(() => {
                    if (response.code === 'LOGIN_SUCCESS') {
                        login(response.payload.accessToken)
                    }
                },
                    3000)
            })



    }
    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <BloqueInputLabel forIdName={'email'} label={'Email:'} />
                <BloqueInputLabel forIdName={'password'} label={'Password:'} />
                <button type='submit' >Iniciar sesión</button>
                <NavLink to={'/forgot-password'}>Olvidé mi contraseña</NavLink>
                <NavLink to={'/register'}>Registrarme</NavLink>
            </form>
        </div>
    )
}

export default LoginScreen