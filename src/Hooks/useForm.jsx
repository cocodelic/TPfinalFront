import React, { useState } from "react";

const useForm = (initial_form_state) => {
    const [form_state, setFormState] = useState(initial_form_state)

    const handleChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        setFormState((currentValueState) => {
            return(
                {...currentValueState, [fieldName]: fieldValue}
            )
        })
        
    }
    return{form_state, handleChange}
}

export default useForm