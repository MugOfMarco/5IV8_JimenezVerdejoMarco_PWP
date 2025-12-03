import sql from '../config/dbconfig.js';

class Product{
    constructor(product){
        this.categoyid = product.categoyid;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;

    }

    //vamor a crear un nuevo producto
    static create(newProduct, result){
        if(!newProduct.categoyid || !newProduct.name || !newProduct.id){
            sql.query('INSERT INTO products values (?,?,?,?)', 
                newProduct[newProduct.id 
                , newProduct.categoyid
                , newProduct.name
                , newProduct.price
                , newProduct.stock], 
                (err, res) =>{
                if(err){
                    console.log('Error al insertar el producto', err);
                    result(err, null);
                    return;
                }
                console.log('Producto creado correctamente', {id: res.insertId, ...newProduct});
                result(null, {id: res.insertId, ...newProduct});
            });

        } else {
            sql.query('INSERT INTO products (categoyid, name, price, stock) values (?,?,?,?)',
            [newProduct.categoyid, newProduct.name, newProduct.price, newProduct.stock],
            (err, res) =>{
                if(err){
                    console.log(`Error al insertar el producto con el nombre ${newProduct.Productname}`, err);
                    result(err, null);
                    return;
                }   else {
                    console.log('Producto creado correctamente', {id: res.insertId, ...newProduct});
                    result(null, {id: res.insertId, ...newProduct});
                }
            });
        }
    }
    


}
