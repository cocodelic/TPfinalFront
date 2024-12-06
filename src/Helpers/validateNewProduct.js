const validateNewProduct = (form_state) => {
    const { title, stock, price, description, category } = form_state

    let errores = ''

    title.length <= 4 ? errores += ('\n -El título debe tener 5 o más caracteres') : ''
    !price || isNaN(price) || price < 0 ? errores += ('\n -El precio debe ser un número mayor a 0') : ''
    !stock || isNaN(stock) || stock < 0 ? errores += ('\n -El stock debe ser un número mayor a 0') : ''
    description.length <= 8 ? errores += ('\n -La descripción debe tener 9 o más caracteres') : ''
    category.length <= 3 ? errores += ('\n -La categoría debe tener 4 o más caracteres') : ''

    errores ? errores = 'Errores de validación:' + errores : ''

    return errores
}


export default validateNewProduct