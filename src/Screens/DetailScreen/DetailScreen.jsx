import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailScreen.css'

const DetailScreen = () => {
    const navigate  = useNavigate()

    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { productId } = useParams()

    const accessToken = sessionStorage.getItem('accessToken')

    const obtenerDetalleProducto = async () => {
        const responseHTTP = await fetch(`http://localhost:7000/api/product/detail/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
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

    const addProductToCartHandler = async () => {
        const responseHTTP = await fetch('http://localhost:7000/api/cart/' + productId, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

        const serverResponse = await responseHTTP.json()

        if(serverResponse.ok){
            alert('Producto agregado al carrito con éxito!')
            return
        }
        else{
            alert('Error al agregar producto!')
            navigate('/login')
        }
        
        
    }

    return (
        <main className='detail'>
            {
                isLoading ?
                    <h1>Cargando...</h1> :

                    <div className='information'>
                        <h1>{product.title}</h1>
                        <div className='right'>
                            <div className='descriptionPrice'>
                                <div>
                                    <h2>Descripción:</h2>
                                    <p className='texto'>{product.description}</p>
                                </div>
                                <div>
                                    <h2>Precio:</h2>
                                    <p className='texto'>{product.price}$</p>
                                </div>
                            </div>
                            <button onClick={addProductToCartHandler}>Agregar al carrito</button>
                        </div>
                    </div>

            }
        </main>
    )
}

export default DetailScreen