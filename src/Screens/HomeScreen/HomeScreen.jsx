import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const MyProductsScreen = () => {

    const { isAuthenticated } = useContext(AuthContext)

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showMenu,setShowMenu] = useState(window.innerWidth > 400 ? '' : 'none')

    const obtenerProductos = async () => {
        const response = await fetch('https://t-pfinal-back.vercel.app/api/product/', {
            method: 'GET'
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

    const handleShowMenu = () => {
        showMenu ? setShowMenu('') : setShowMenu('none')
        return
    }



    return (
        <>
            <header className='headerHome'>
                <div className='linksContainer'>
                <button className='headerOptions' onClick={handleShowMenu} style={{display: innerWidth > 400 ? 'none' : ''}}>Menu</button>
                    {isAuthenticated ?
                        <>
                            <NavLink to={'/myProducts'} className={'link'} style={{display: showMenu}}>Mis productos</NavLink>
                            <NavLink to={'/cart'} className={'link'} style={{display: showMenu}}>Carrito</NavLink>
                        </> :
                        <>
                            <NavLink className={'link'} to={'/login'} style={{display: showMenu}}>Iniciar sesión</NavLink>
                            <NavLink className={'link'} to={'/register'} style={{display: showMenu}}>Registrarme</NavLink>
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