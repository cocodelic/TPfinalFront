import React from 'react'
import Form from '../../Components/Form'
import { useUserContext } from '../../Context/UserContext'


const PruebaScreen = () => {
    const initial_form_state = {
        name: '',
        surname: '',
        description: '',
        option: ''
    }

    const actionPrueba = (form_state) => {
        console.log(form_state)
    }

    const form_fields = [
        {
            label: {
                text: 'Nombre: ',
                props: {
                    htmlFor: 'name'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: 'Ingrese su nombre.',
                    id: 'name',
                    name: 'name'
                }
            },
            div: {
                props: {
                    style: {backgroundColor: 'red'}
                }
            }
        },
        {
            label: {
                text: 'Apellido: ',
                props: {
                    htmlFor: 'surname'
                }
            },
            field: {
                type: 'input',
                props: {
                    placeholder: 'Ingrese su apellido.',
                    id: 'surname',
                    name: 'surname'
                }
            },
            div: {
                props: {
                    style: {backgroundColor: 'blue'}
                }
            }
        },
        {
            label: {
                text: 'Descripcion: ',
                props: {
                    htmlFor: 'description'
                }
            },
            field: {
                type: 'textarea',
                props: {
                    placeholder: 'Ingrese su nombre.',
                    id: 'description',
                    name: 'description'
                }
            },
            div: {
                props: {
                    style: {backgroundColor: 'yellow'}
                }
            }
        },
        {
            label: {
                text: 'Opciones: ',
                props: {
                    htmlFor: 'option'
                }
            },
            field: {
                type: 'select',
                options: [<option key={0} value=''>Elige una opción</option>,<option key={1}>uno</option>,<option key={2}>dos</option>]
                ,
                props: {
                    placeholder: 'Ingrese su nombre.',
                    id: 'option',
                    name: 'option'
                }
            },
            div: {
                props: {
                    style: {backgroundColor: 'green'}
                }
            }
        }
    ]

    const userContext = useUserContext()
    console.log(userContext)

    return (
        <Form form_fields={form_fields} initial_form_state={initial_form_state} action={actionPrueba} />
    )
}

export default PruebaScreen