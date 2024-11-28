import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailScreen = () => {

    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { productId } = useParams()

    const obtenerDetalleProducto = async () => {
        const responseHTTP = await fetch(`http://localhost:7000/api/product/detail/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        })

        const responseServer = await responseHTTP.json()

        return responseServer
    }

    useEffect(() => {
        obtenerDetalleProducto().then((response) => {
            const product = response.payload.product

            setProduct((prevProduct) => product)
            setIsLoading(false)
        })
    }, [])

    return (
        <div>
            {
                isLoading ?
                    <h1>Cargando...</h1> :
                    <>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <span>{product.price}$</span>
                    </>
            }
        </div>
    )
}

export default DetailScreen