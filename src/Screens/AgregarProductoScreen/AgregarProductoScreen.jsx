import React from 'react'
import useForm from '../../Hooks/useForm'
import { NavLink, useNavigate } from 'react-router-dom'
import Form from '../../Components/Form/Form'
import validateNewProduct from '../../Helpers/validateNewProduct'

const AgregarProductoScreen = () => {

    const navigate = useNavigate()

    const initialFormState = {
        title: '',
        price: '',
        description: '',
        stock: '',
        category: ''
    }

    const form_fields = [
        {
            label: {
                text: 'Título: ',
                props: {
                    htmlFor: 'title'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: 'Titulo producto',
                    id: 'title',
                    name: 'title'
                }
            },
            div: {
                props: {

                }
            }
        },
        {
            label: {
                text: 'Precio: ',
                props: {
                    htmlFor: 'price'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: '999999',
                    id: 'price',
                    name: 'price'
                }
            },
            div: {
                props: {

                }
            }
        },
        {
            label: {
                text: 'Descripción: ',
                props: {
                    htmlFor: 'description'
                }
            },
            field: {
                type: 'textarea',
                props: {
                    placeholder: 'Es un producto muy bueno',
                    id: 'description',
                    name: 'description'
                }
            },
            div: {
                props: {

                }
            }
        },
        {
            label: {
                text: 'Cantidad: ',
                props: {
                    htmlFor: ''
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: '2',
                    id: 'stock',
                    name: 'stock'
                }
            },
            div: {
                props: {

                }
            }
        },
        {
            label: {
                text: 'Categoría: ',
                props: {
                    htmlFor: 'category'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: '',
                    id: 'category',
                    name: 'category'
                }
            },
            div: {
                props: {

                }
            }
        }
    ]

    const handleSubmit = async (e, form_state) => {
        const errores = validateNewProduct(form_state)

        if(errores){
            return alert(errores)
        }

        const res = await fetch('http://localhost:7000/api/product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(form_state)
        })

        const response = await res.json()

        if(response.ok){
            alert('Producto agregado con éxito!')
            navigate('/myProducts')
        }
        else{
            alert('Sesión expirada.')
            navigate('/login')
        }


    }

    return (
            <div className='formContainer'>
                <Form action={handleSubmit} form_fields={form_fields} initial_form_state={initialFormState} title={'Nuevo producto'} >
                    <button style={{ paddingBlock: '7px' }} type='submit' >Agregar producto</button>
                    <NavLink to={'/myProducts'} style={{ color: 'turquoise' }}>Volver</NavLink>
                </Form>
            </div>
    )
}

export default AgregarProductoScreen