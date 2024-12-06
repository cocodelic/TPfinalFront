const validateUpdateProduct = (form_state) => {
    const { title, stock, price, description, category } = form_state
    let errores = ''

    !title || title.length <= 4 || title.length > 20 ? errores += ('\n -El título debe tener entre 5 y 20 caracteres inclusive') : ''
    !price || isNaN(price) || price < 0    ? errores += ('\n -El precio debe ser un número mayor a 0') : ''
    !stock || isNaN(stock) || stock < 0    ? errores += ('\n -El stock debe ser un número mayor a 0') : ''
    !description ||description.length <= 8 ? errores += ('\n -La descripción debe tener 9 o más caracteres') : ''
    !category || category.length <= 3      ? errores += ('\n -La categoría debe tener 4 o más caracteres') : ''

    errores ? errores = 'Errores de validación:' + errores : ''

    return errores
}


export default validateUpdateProduct