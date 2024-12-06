import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './MyProductsScreen.css'
import useForm from '../../Hooks/useForm'
import { AuthContext } from '../../Context/AuthContext'
import validateUpdateProduct from '../../Helpers/validateUpdateProduct'
import FormUpdateProduct from '../../Components/FormUpdateProduct'

const MyProductsScreen = () => {

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
        showPanel ? setShowPanel('') : setShowPanel('none')
        return
    }


    return (
        <>
            <header className='headerHome'>
                <div>
                    <button onClick={handleShowPanel}>Admin Panel</button>
                    <div className='hamburgerMenu'>
                        <button onClick={() => navigate('/add-product')} style={{ display: showPanel }}>Agregar producto</button>
                    </div>
                </div>
                <div className='linksContainer'>
                    <NavLink className={'link'} to={'/'}>Home</NavLink>
                    <NavLink onClick={logout} className={'link'}>Cerrar sesión</NavLink>

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
                                <h1>El usuario no posee productos</h1>
                    }
                </ul>
            </main>
        </>
    )
}

const ProductCard = ({ product, setProducts, accessToken, products }) => {
    const [showProductSettings, setShowProductSettings] = useState(false)
    const [showInputsUpdate, setShowInputsUpdate] = useState(false)

    const navigate = useNavigate()

    let { title, price, description, stock, category, id } = product

    const handleShowProductSettings = () => {
        showProductSettings ?
            setShowProductSettings(false) :
            setShowProductSettings(true)
    }

    const handleShowInputsUpdate = () => {
        if (showInputsUpdate) {
            setShowInputsUpdate(false)
            setShowProductSettings(false)
        } else {
            setShowInputsUpdate(true)
            setShowProductSettings(false)
        }
    }


    const { form_state, handleChange } = useForm({
        title: title,
        price: price,
        description: description,
        stock: stock,
        category: category,

    })

    const handleDeleteProduct = async () => {
        if (confirm('Está seguro que desea eliminar el producto ' + title + ' ?')) {
            const responseHTTP = await fetch(`http://localhost:7000/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })

            const serverResponse = await responseHTTP.json()

            if (serverResponse.ok) {
                setShowProductSettings(false)
                const productosRestantes = products.filter((product) => product.id !== id)
                setProducts(productosRestantes)
                return
            } else {
                alert('Error de servidor. Intente nuevamente.')
            }
        }
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        const errores = validateUpdateProduct(form_state)
        if (errores) {
            alert(errores)
            return
        }

        const responseHTTP = await fetch('http://localhost:7000/api/product/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(form_state)
        })

        const responseServer = await responseHTTP.json()

        if (responseServer.ok) {
            handleShowInputsUpdate()
            setShowProductSettings(false)
            navigate(0)
        } else {
            return alert('Error del servidor. Intente nuevamente.')
        }
    }



    return (
        <div style={{ position: 'relative' }}>
            <div className='productSettings'>
                <div >
                    {showInputsUpdate ?
                        <span onClick={handleShowInputsUpdate}>
                            ❌
                        </span> :
                        <span onClick={handleShowProductSettings}>
                            ⚙️
                        </span>}
                </div>
                {showProductSettings ?
                    <>
                        <ol className='productOptions'>
                            <li onClick={handleDeleteProduct} className='option'>Eliminar</li>
                            <li onClick={handleShowInputsUpdate} className='option'>Editar</li>
                        </ol>
                    </> :
                    ''
                }
            </div>

            {
                showInputsUpdate ?
                    <FormUpdateProduct action={handleUpdateProduct} handleChange={handleChange} form_state={form_state} /> :
                    <NavLink to={`/detail/${id}`} className='producto'>
                        <h2>{title}</h2>
                        <span>precio: {price}$</span>
                        <span>stock: {stock}</span>
                    </NavLink>
            }
        </div>
    )
}

export default MyProductsScreen