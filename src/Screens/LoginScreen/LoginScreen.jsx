import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './LoginScreen.css'
import { AuthContext } from '../../Context/AuthContext'
import Form from '../../Components/Form/Form'

const LoginScreen = () => {

    const {login } = useContext(AuthContext)


    const initialFormState = {
        email: '',
        password: '',
    }


    const form_fields = [
        {
            label: {
                text: 'Email: ',
                props: {
                    htmlFor: 'email'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: 'su_email_aquí@prueba.com',
                    id: 'email',
                    name: 'email',
                    type: 'email'
                }
            },
            div: {
                props: {

                }
            }
        },
        {
            label: {
                text: 'Contraseña: ',
                props: {
                    htmlFor: 'password'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: 'ContraseñaSecreta123',
                    id: 'password',
                    name: 'password',
                    type: 'password'
                }
            },
            div: {
                props: {

                }
            }
        }
    ]


    const handleSubmit = async (e, form_state) => {

        const URL_POST_LOGIN = 'http://localhost:7000/api/auth/login'

        await fetch(URL_POST_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form_state)
        })
            .then(async (res) => {
                const response = await res.json()
                if (response.code === 'LOGIN_SUCCESS') {
                    login(response.payload.accessToken)
                }
                else{
                    alert(response.message)
                    return
                }
            })
    }

    return (
        <>
            <div>
                <div className='linksContainer' style={{position: 'absolute', right: '10px'}}>
                    <NavLink className={'link'} style={{ position: 'absolute' }} to={'/'}>Home</NavLink>
                </div>
                <div className='formContainer'>
                    <Form action={handleSubmit} form_fields={form_fields} initial_form_state={initialFormState} title={'Inicia sesión'} >
                        <button type='submit' style={{ paddingBlock: '7px' }} >Iniciar sesión</button>
                        <NavLink to={'/forgot-password'} style={{ color: 'turquoise' }}>Olvidé mi contraseña</NavLink>
                        <NavLink to={'/register'} style={{ color: 'turquoise' }}>Registrarme</NavLink>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default LoginScreen