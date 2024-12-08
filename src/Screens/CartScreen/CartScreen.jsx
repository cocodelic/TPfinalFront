import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './CartScreen.css'

const CartScreen = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const accessToken = sessionStorage.getItem('accessToken')

    const getCartProducts = async () => {
        const response = await fetch('https://t-pfinal-back.vercel.app/api/cart/', {
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + accessToken
            }
        })
        const products = await response.json()

        return products
    }

    useEffect(() => {
        if (isLoading) {
            getCartProducts().then((response) => {
                response.status === 'fail' ? setProducts([]) : setProducts(() => response.payload.products)

                setIsLoading(() => false)
            })
        }
    }
        ,
        [isLoading, products]
    )

    return (
        <>
            <header className='headerHome'>
                <div className='linksContainer'>
                    <NavLink className={'link'} to={'/'}>Home</NavLink>
                    <NavLink className={'link'} to={'/myProducts'}>Mis productos</NavLink>
                </div>
            </header>
            <main>
                <h1 className='titulo'>Mi carrito</h1>
                <ul className='productsContainer'>
                    {
                        isLoading ?
                            <h2>Cargando...</h2> :
                            products.length > 0 ?
                                products.map((product, index) => {
                                    return (
                                        <ProductCard product={product} key={index} />
                                    )
                                }
                                ) :
                                <h1>No posees productos en tu carrito</h1>
                    }
                </ul>
            </main>
        </>
    )
}

const ProductCard = ({ product}) => {
    const accessToken = sessionStorage.getItem('accessToken')
    const navigate = useNavigate()

    const { title, price, description, stock, category, id, quantity } = product

    const handleRemoveProductFromCart = async () => {
        if(confirm(`¿Está seguro que desea eliminar '${title}' de su carrito?`)){
            console.log('Entra el fetch')
            const responseHTTP = await fetch(`https://t-pfinal-back.vercel.app/api/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            })

            console.log('Responsehttp: ' + responseHTTP)

            const responseServer = await responseHTTP.json()

            console.log('Responseserver: ' + responseServer)
            console.log(responseServer)
            if(responseServer.ok){
                alert('Producto eliminado con éxito.')
                navigate(0)
                return
            }else{
                alert('Error al eliminar el producto.')
            }
        }
    }
    



    return (
        <div style={{ position: 'relative' }}>
            <div className='productSettings'>
                <span onClick={handleRemoveProductFromCart} style={{padding: '8px'}}>❌</span>
            </div>
            <NavLink to={`/detail/${id}`} className='producto'>
                <h2>{title}</h2>
                <span>precio: {price}$</span>
                <span>Categorias: {category}</span>
                <span>{description}</span>
                <span>Cantidad: {quantity}</span>
            </NavLink>
        </div>
    )
}

export default CartScreen