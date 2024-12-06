import React from 'react'
import useForm from '../../Hooks/useForm'

const Form = ({ form_fields, initial_form_state, action, title, children }) => {

    
    const { form_state, handleChange } = useForm(initial_form_state)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        action(e, form_state)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 style={{ color: 'white' }}>{title}</h1>
            <FieldsList form_state={form_state} form_fields={form_fields} handleChange={handleChange} />
            {children}
        </form>
    )
}


const FieldsList = ({ form_state, form_fields, handleChange }) => {

    return (

        form_fields.map((tags_group, index) => {
            const { field, label, div } = tags_group

            const tags = {
                'input': <input style={{ padding: '5px' }} onChange={handleChange} value={form_state[field.props.name]} {...field.props} />,
                'textarea': <textarea style={{ padding: '5px', resize: 'none' }} onChange={handleChange} value={form_state[field.props.name]} {...field.props} />,
                'select': <select style={{ padding: '5px' }} onChange={handleChange} {...field.props}>
                {field.options}
            </select>
            }

            return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} {...div.props}>
                    <label style={{ color: 'white' }} {...label.props}>{label.text}</label>
                    {tags[field.type]}
                </div>
            )
        })
    )
}

export default Form