const validateRegister = (form_state) => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
    const { email, password, name } = form_state

    let errores = ''

    !regex.test(email)   ? errores += ('\n -El valor ingresado no es un email válido.') : ''
    password.length <= 7 ? errores += ('\n -La contraseña debe tener 8 o más caracteres.') : ''
    name.length <= 4     ? errores += ('\n -El nombre debe tener 5 o más caracteres.') : ''


    errores ? errores = 'Error de validación:' + errores : ''

    return errores

}


export default validateRegister