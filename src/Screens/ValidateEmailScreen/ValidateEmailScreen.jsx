import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ValidateEmailScreen.css'

const ValidateEmailScreen = () => {

    const { validationToken } = useParams()

    const navigate = useNavigate()

    const [count, setCount] = useState(5)

    const [texto, setTexto] = useState('')

    const validateEmailFetch = async () => {
        const responseHTTP = await fetch(`http://localhost:7000/api/auth/validate-email/${validationToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })

        const responseServer = await responseHTTP.json()

        return responseServer.status
    }

    useEffect(() => {
        validateEmailFetch().then((status) => {
            if (status === 'fail') {
                setTexto('Su correo electrónico ya se encuentra validado.')
            }else{
                setTexto('Su correo electrónico fue validado con éxito!')
            }
            const intervalId = setInterval(() => {
                setCount((prevCount) => prevCount - 1)
                if (count === 0) {
                    clearInterval(intervalId)
                }
            }, 1000)
        })
    },
        []
    )

    useEffect(() => {
        if (count === 0) {
            navigate('/')
        }
    },
        [count]
    )



    return (
        <div className='container'>
            <h1>
                {texto}
            </h1>
            <span>Usted será redirigido a <strong>HOME</strong> en {count} segundos</span>
        </div>
    )
}

export default ValidateEmailScreen