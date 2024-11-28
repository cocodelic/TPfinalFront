import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const MyProductsScreen = () => {

    const { isAuthenticated } = useContext(AuthContext)

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const obtenerProductos = async () => {
        const response = await fetch('http://localhost:7000/api/product/', {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwibmFtZSI6ImxhdXRhcm8xMjMiLCJlbWFpbCI6ImxhdXRhcm9taWNlbGlAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzI3MjYzMTIsImV4cCI6MTczMjgxMjcxMn0.57E1ldWe-ztZor5pHIwtIIM44VX9gCSkSOkqzoVWkGI'
            }
        })

        const products = await response.json()

        return products
    }
    useEffect(() => {
        if (isLoading) {
            obtenerProductos().then((response) => {
                setProducts(() => response.payload.products)
                setIsLoading(() => false)
            })
        }
    }
        ,
        [isLoading]
    )


    return (
        <>
            <header className='headerHome'>
                <div className='linksContainer'>
                    {isAuthenticated ?
                        <>
                            <NavLink to={'/myProducts'} className={'link'}>Mis productos</NavLink>
                            <NavLink to={'/cart'} className={'link'}>Carrito</NavLink>
                        </> :
                        <>
                            <NavLink className={'link'} to={'/login'}>Iniciar sesión</NavLink>
                            <NavLink className={'link'} to={'/register'}>Registrarme</NavLink>
                        </>
                    }
                </div>
            </header>
            <main>
                <h1 className='titulo'>Productos</h1>
                <ul className='productsContainer'>
                    {
                        isLoading ?
                            <h2>Cargando...</h2> :
                            products.map((product, index) => {
                                return (
                                    <ProductCard product={product} key={index} />
                                )
                            }
                            )
                    }
                </ul>
            </main>
        </>
    )
}

const ProductCard = ({ product }) => {

    const { title, price, description, id } = product

    return (
        <NavLink to={`/detail/${id}`} className='producto'>
            <h2>{title}</h2>
            <span>{price}$</span>
            <span>{description}</span>
        </NavLink>
    )
}

export default MyProductsScreen