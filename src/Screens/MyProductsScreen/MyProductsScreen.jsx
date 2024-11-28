import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './MyProductsScreen.css'
import useForm from '../../Hooks/useForm'
import { AuthContext } from '../../Context/AuthContext'

const MyProductsScreen = () => {

    const {logout} = useContext(AuthContext)

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

    const handleShowProductSettings = () => {
        console.log('dentro del handleShowProductsSettings: ',id)
        showProductSettings ?
            setShowProductSettings(false) :
            setShowProductSettings(true)
    }

    const handleShowInputsUpdate = () => {
        if(showInputsUpdate) {
            setShowInputsUpdate(false)
            setShowProductSettings(true)
        }else{
            setShowInputsUpdate(true)
            setShowProductSettings(false)
        }
    }

    const { title, price, description, stock, category, id } = product

    const { form_state, handleChange } = useForm({
        title: title,
        price: price,
        description: description,
        stock: stock,
        category: category,

    })

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

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        handleShowInputsUpdate()
        setShowProductSettings(false)

        const responseHTTP = await fetch('http://localhost:7000/api/product/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(form_state)
        })

        const responseServer = await responseHTTP.json()
        console.log(responseServer.ok)

        responseServer.ok ? setProducts(products) : ''
    }



    return (
        <div style={{ position: 'relative' }}>
            <div className='productSettings'>
                <div onClick={handleShowProductSettings} >⚙️</div>
                {showProductSettings ?
                    <ol className='productOptions'>
                        <li onClick={handleDeleteProduct} className='option'>Eliminar</li>
                        <li onClick={handleShowInputsUpdate} className='option'>Editar</li>
                    </ol> :
                    <></>
                }
            </div>

            {
                showInputsUpdate ?
                    <form onSubmit={handleUpdateProduct} className='producto'>
                        <div>
                            <label htmlFor='title'>Titulo</label>
                            <input name='title' id='title' onChange={handleChange} placeholder={title} className='inputUpdate' />
                        </div>
                        <div>
                            <label htmlFor='price'>Precio</label>
                            <input name='price' id='price' onChange={handleChange} placeholder={price} className='inputUpdate' />
                        </div>
                        <div>
                            <label htmlFor='stock'>stock</label>
                            <input name='stock' id='stock' onChange={handleChange} placeholder={stock} className='inputUpdate' />
                        </div>
                        <div>
                            <label htmlFor='description'>Descripcion</label>
                            <textarea name='description' id='description' onChange={handleChange} placeholder={description} className='inputUpdate' style={{ resize: 'none' }} />
                        </div>
                        <button type='submit'>Actualizar producto</button>
                    </form> :
                    <NavLink to={`/detail/${id}`} className='producto'>
                        <h2>{title}</h2>
                        <span>precio: {price}$</span>
                        <span>stock: {stock}</span>
                        <span>Categorias: {category}</span>
                        <span>{description}</span>
                        <span>id:{id}</span>
                    </NavLink>
            }
        </div>
    )
}

export default MyProductsScreen