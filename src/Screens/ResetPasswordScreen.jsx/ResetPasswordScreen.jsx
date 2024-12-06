import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../Components/Form/Form'

const ResetPasswordScreen = () => {

    const navigate = useNavigate()

    const { resetToken } = useParams()

    const initialFormState = {
        password: '',
        passwordRepeat: ''
    }


    const form_fields = [
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
                    placeholder: 'milanesa123',
                    id: 'password',
                    name: 'password',
                    type: 'password'
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
                    placeholder: 'milanesa123',
                    id: 'passwordRepeat',
                    name: 'passwordRepeat',
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

        if(form_state.password != form_state.passwordRepeat){
            console.log('La contraseña no es igual en ambos campos')
            return 
        }

        const URL_BACKEND_POST_RESET_PASSWORD = 'http://localhost:7000/api/auth/reset-password/'

        const password = {
            password: form_state.password
        }

        const response = await fetch(URL_BACKEND_POST_RESET_PASSWORD + resetToken, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                token: resetToken

            })
        })

        const serverResponse = await response.json()

        serverResponse.ok ? navigate('/login') : ''
    }

    return (
        <div className='formContainer'>
            <Form action={handleSubmit} form_fields={form_fields} initial_form_state={initialFormState} title={'Reestablecer la contraseña'} >
                <button style={{paddingBlock: '7px'}} type='submit' >Resetear contraseña</button>
            </Form>
        </div>
    )
}

export default ResetPasswordScreen