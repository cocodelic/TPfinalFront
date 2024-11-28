import React from 'react'
import BloqueInputLabel from '../../Components/BloqueInputLabel/BloqueInputLabel'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPasswordScreen = () => {

    const { resetToken } = useParams()

    const [form, formState] = useState({
        password: ''
    })

    const handleOnChange = (e) => {
        const key = e.target.name
        const value = e.target.value

        formState((prevForm) => {
            return { ...prevForm, [key]: value }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        const URL_BACKEND_POST_RESET_PASSWORD = 'http://localhost:7000/api/auth/reset-password'

        const response = await fetch(URL_BACKEND_POST_RESET_PASSWORD, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                form: form,
                token: resetToken

            })
        })

        console.log(await response.json())
    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>Reestablecimiento de password</h1>
                <BloqueInputLabel className={'container'} forIdName='password' label='Ingrese su nuevo password: ' onChange={handleOnChange} />
                <button type='submit'>Resetear password</button>
            </form>
        </div>
    )
}

export default ResetPasswordScreen