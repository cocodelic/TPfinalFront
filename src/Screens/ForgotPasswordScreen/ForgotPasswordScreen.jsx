import React from 'react'
import { NavLink } from 'react-router-dom'
import Form from '../../Components/Form/Form'

const ForgotPasswordScreen = () => {



    const initialFormState = {
        email: '',
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
        }
    ]

    const handleSubmit = async (e, form_state) => {

        const URL_BACKEND_POST_FORGOT_PASSWORD = 'https://t-pfinal-back.vercel.app/api/auth/forgot-password'

        const response = await fetch(URL_BACKEND_POST_FORGOT_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_state)
        })

        console.log(await response.json())
    }

    return (
        <div>
            <div className='linksContainer' style={{ position: 'absolute', right: '10px' }}>
                <NavLink className={'link'} style={{ position: 'absolute' }} to={'/'}>Home</NavLink>
            </div>
            <div className='formContainer'>
                <Form action={handleSubmit} form_fields={form_fields} initial_form_state={initialFormState} title={'Olvidé mi contraseña'} >
                    <button style={{ paddingBlock: '7px' }} type='submit' >Enviar email de recuperacion</button>
                    <NavLink to={'/register'} style={{ color: 'turquoise' }}>Volver</NavLink>
                </Form>
            </div>
        </div>
    )
}

export default ForgotPasswordScreen