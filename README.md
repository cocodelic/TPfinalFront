# Proyecto final | Front-End

Las features son: 

1. Rutas protegidas.
2. Logueo, registro, validación de email, reestablecimiento de contraseña.
3. CRUD de productos.
4. Carrito de compras por usuario con funcionalidad de agregar y eliminar.
5. Hooks y componentes reutilizables para ajustar el código al principio Dry.

Usuario de prueba con productos agregados:

email: constanzacatalano@gmail.com
password: Delicatessen

Este es mi proyecto final de front-end, una tienda online donde el usuario puede registrarse, loguearse, gestionar productos y agregar cosas al carrito de compras. La idea es crear una experiencia de compra sencilla, pero completa. La verdad es que hubo momentos bastante complicados, pero al final estoy contenta con cómo quedó todo.

Este proyecto tiene varias funcionalidades importantes:

    Rutas protegidas: Algunas páginas, como el carrito o la gestión de productos, solo pueden ser vistas por usuarios logueados.
       
    Logueo y registro: Los usuarios pueden crear una cuenta, ingresar su correo y contraseña, y acceder al sitio. También implementé la validación de email y la opción de restablecer la contraseña si la olvidan.

    CRUD de productos: Los usuarios pueden agregar, editar y eliminar productos, simulando un panel de administración básico.

    Carrito de compras: Los usuarios pueden agregar productos al carrito y eliminar los que ya no quieran, todo se guarda en la base de datos para cada usuario.

    Hooks y componentes reutilizables: Utilicé hooks para que el código sea más limpio y reutilizable. Al principio traté de aplicar el principio DRY para no escribir código repetido.

Durante el desarrollo pasaron varias cosas que me costaron, pero aprendí un montón. La primera gran dificultad fue con las rutas protegidas. Al principio no lograba que los usuarios sin sesión activa pudieran ser redirigidos a la página de login si intentaban acceder a una página restringida. 

Otra parte que fue dificil fue la validación de formularios, especialmente para el registro de usuario y el restablecimiento de contraseña. No era tan sencillo mostrar los errores de manera clara para el usuario y que fueran fáciles de entender.

El CRUD de productos también fue un desafío. Al principio me costó integrar todo bien con la API y hacer que las respuestas llegaran de manera correcta. Hubo varios momentos en los que los productos no se agregaban correctamente o no se mostraban en la lista. Tuve que mejorar el manejo de las respuestas y hacer que todo fuera más confiable.

Por último, el carrito de compras fue algo que me llevó más tiempo de lo que esperaba. Quería que la experiencia fuera lo más fluida posible, pero al principio, los botones para agregar y eliminar productos no eran tan fáciles de usar como quería. Después de varios ajustes y pruebas, finalmente logré que fuera más intuitivo.

