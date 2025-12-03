import { parse } from 'path'; // Aunque 'parse' se importa, no se utiliza en el código
import Product from '../models/productmodel.js';

//Crear y guardar un nuevo producto
export const create = (req, res) => {
    // 1. Validar la solicitud (Request)
    // Se corrigen las validaciones: 'name' debe ser un string (no vacio), 
    // 'price' y 'stock' deben ser números (usamos isNaN)
    if (!req.body.name || isNaN(req.body.price) || isNaN(req.body.stock)) {
        res.status(400).send({
            message: 'El contenido no puede estar vacío y el precio/stock deben ser números.'
        });
        return;
    }

    // 2. Crear un objeto Producto
    // Corregida la variable 'categoyid' a 'categoryid'
    const newProduct = new Product({
        categoryid: req.body.categoryid, // Propiedad corregida
        name: req.body.name,
        price: parseFloat(req.body.price), // Asegurar que price es un número flotante
        stock: parseInt(req.body.stock, 10) // Asegurar que stock es un entero
    });

    // La lógica de asignación manual de 'id' al modelo 'Product' no es estándar
    // si la base de datos es la que genera el ID (que es lo común).
    // Si quieres incluir el ID en la data, se incluye en 'newProduct' si existe,
    // pero usualmente se deja que el modelo lo maneje.
    // He eliminado la lógica compleja e incorrecta del id y la he simplificado:
    // **Si usas MySQL, no deberías asignar el ID manualmente a menos que sea necesario.**
    
    // Si necesitas que el ID se pase para *otro* propósito (e.g., logging), lo puedes mantener,
    // pero no se lo asigna directamente al modelo `Product` de esta forma.
    let id = req.body.id;
    if (id) {
        console.log(`ID opcional proporcionado: ${id}`);
        // newProduct.id = id; // Si necesitas forzar el ID, lo agregas aquí, pero no es común en `create`.
    }

    console.log('Nuevo producto a crear: ', newProduct);

    // 3. Guardar el producto en la base de datos
    Product.create(newProduct, (err, data) => {
        if (err) {
            // Manejo de errores 500
            res.status(500).send({
                message: err.message || 'Ocurrió un error al crear el producto.'
            });
            return;
        }
        
        // 4. Respuesta exitosa (Status 200 por defecto)
        // Corregido 'meesage' a 'message', 'Produc' a 'Producto' y 'categoryid' en el mensaje
        res.send({
            message: `Producto ${data.name} con ID ${data.id} creado correctamente (Categoría ID: ${data.categoryid})`, 
            data: data
        });
    });
};