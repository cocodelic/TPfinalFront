import React from 'react'
import useForm from '../Hooks/useForm'
import useMap from '../Hooks/useMap'

const Form = ({ form_fields, initial_form_state, action }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        action(form_state)
    }

    const { form_state, handleChange } = useForm(initial_form_state)


    return (
        <form onSubmit={handleSubmit}>
            <FieldsList form_state={form_state} form_fields={form_fields} handleChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
    )
}


const FieldsList = ({ form_state, form_fields, handleChange }) => {
    console.log(form_state)

    return (

        form_fields.map((tags_group, index) => {
            const { field, label, div } = tags_group

            const tagsMap = new Map()
            tagsMap.set(
                'input',
                <input onChange={handleChange} value={form_state[field.props.name]} {...field.props} />
            )
            tagsMap.set(
                'textarea',
                <textarea onChange={handleChange} value={form_state[field.props.name]} {...field.props} />
            )
            tagsMap.set(
                'select',
                <select onChange={handleChange} {...field.props}>
                    {field.options}
                </select>
            )
            
            return (
                <div key={index} {...div.props}>
                    <label {...label.props}>{label.text}</label>
                    {tagsMap.get(field.type)}
                </div>
            )
        })
    )
}

export default Form