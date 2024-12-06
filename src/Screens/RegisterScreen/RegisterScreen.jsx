import React from 'react'
import './RegisterScreen.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Form from '../../Components/Form/Form'
import validateRegister from '../../Helpers/validateRegister'


const RegisterScreen = () => {
    const initialFormState = {
        password: '',
        name: '',
        email: ''
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
                text: 'Nombre: ',
                props: {
                    htmlFor: 'name'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: 'Natalia natalia',
                    id: 'name',
                    name: 'name'
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

    const navigate = useNavigate()

    const actionRegister = async (e, form_state) => {


        const errores = validateRegister(form_state)

        if (errores) {
            alert(errores)
            return
        }

        const URL_POST_REGISTER = 'https://t-pfinal-back.vercel.app/api/auth/register'

        const res = await fetch(URL_POST_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form_state)
        })

        const response = await res.json()

        console.log(response)

        if (response.code === 'REGISTER_SUCCESS') {
            return navigate('/login')
        }
        return
    }


    return (
        <div>
            <div className='linksContainer' style={{ position: 'absolute', right: '10px' }}>
                <NavLink className={'link'} style={{ position: 'absolute' }} to={'/'}>Home</NavLink>
            </div>
            <div className='formContainer'>
                <Form action={actionRegister} form_fields={form_fields} initial_form_state={initialFormState} title={'Registrate'} >
                    <button style={{ paddingBlock: '7px' }} type='submit' >Registrarme</button>
                    <NavLink to={'/login'} style={{ color: 'turquoise' }}>Ya tengo cuenta</NavLink>
                </Form>
            </div>
        </div>
    )
}

export default RegisterScreen