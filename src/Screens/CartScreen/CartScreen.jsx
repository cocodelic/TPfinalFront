import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './CartScreen.css'
import useForm from '../../Hooks/useForm'
import { AuthContext } from '../../Context/AuthContext'

const CartScreen = () => {

    const { logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const [showPanel, setShowPanel] = useState('none')
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const accessToken = sessionStorage.getItem('accessToken')

    const obtenerProductos = async () => {
        const response = await fetch('http://localhost:7000/api/product/user/', {
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
            obtenerProductos().then((response) => {
                response.status === 'fail' ? setProducts([]) : setProducts(() => response.payload.products)

                setIsLoading(() => false)
            })
        }
    }
        ,
        [isLoading, products]
    )
    const handleShowPanel = () => {
        if (showPanel) {
            return setShowPanel((prevShowPanel) => '')
        } {
            return setShowPanel((prevShowPanel) => 'none')
        }
    }


    return (
        <>
            <header className='headerHome'>
                <div className='linksContainer'>
                    <NavLink className={'link'} to={'/'}>Home</NavLink>
                </div>
            </header>
            <main>
                <h1 className='titulo'>Mis productos</h1>
                <ul className='productsContainer'>
                    {
                        isLoading ?
                            <h2>Cargando...</h2> :
                            products.length > 0 ?
                                products.map((product, index) => {
                                    return (
                                        <ProductCard products={products} product={product} key={index} setProducts={setProducts} accessToken={accessToken} />
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

const ProductCard = ({ product, accessToken }) => {

    const { title, price, description, stock, category, id } = product

    const handleDeleteProduct = async () => {
        const responseHTTP = await fetch(`http://localhost:7000/api/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }) //por qué después de hacer el fetch se actualizan mis productos en el front si yo no modifico el state con la función cambiadora?
        console.log('dentro del handle: ', id)
        const serverResponse = await responseHTTP.json()
        console.log(serverResponse)
        if (serverResponse.ok) {
            setShowProductSettings(false)
            const productosRestantes = products.filter((product) => product.id !== id)
            setProducts(productosRestantes)
        }
        return console.log(serverResponse)
    }




    return (
        <div style={{ position: 'relative' }}>
            <div className='productSettings'>
                <div style={{padding: '8px'}} >❌</div>

            </div>
            <NavLink to={`/detail/${id}`} className='producto'>
                <h2>{title}</h2>
                <span>precio: {price}$</span>
                <span>stock: {stock}</span>
                <span>Categorias: {category}</span>
                <span>{description}</span>
                <span>id:{id}</span>
            </NavLink>
        </div>
    )
}

export default CartScreen