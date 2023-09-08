import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const { limit } = req.query

    try {
        const prods = await productModel.find().limit(limit)
        res.status(200).send({ respuesta: 'OK', mensaje: prods })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
    }
})

productRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error })
    }
})

productRouter.post('/', async (req, res) => {
    console.log('Solicitud POST para agregar un producto recibida');
  
    try {
      // Aquí puedes agregar el código para crear y guardar un nuevo producto en la base de datos
      const { title, description, price, stock, category, code, thumbnails } = req.body;
  
      console.log('Datos recibidos en la solicitud:');
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Price:', price);
      console.log('Stock:', stock);
      console.log('Category:', category);
      console.log('Code:', code);
      console.log('Thumbnails:', thumbnails);
  
      // Crea un nuevo producto utilizando el modelo y los datos recibidos
      const newProduct = new productModel({
        title,
        description,
        price,
        stock,
        category,
        code,
        thumbnails
      });
  
      console.log('Nuevo producto a crear:');
      console.log(newProduct);
  
      // Guarda el nuevo producto en la base de datos
      const savedProduct = await newProduct.save();
  
      console.log('Producto guardado correctamente:');
      console.log(savedProduct);
  
      // Responde con el producto recién creado
      res.status(201).json({ respuesta: 'OK', mensaje: savedProduct });
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      res.status(500).send('Error al agregar el producto.');
    }
  });
  

productRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, stock, status, code, price, category } = req.body

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category })
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto actualizado' })
        else
            res.status(404).send({ respuesta: 'Error en actualizar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar producto', mensaje: error })
    }
})

productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findByIdAndDelete(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' })
        else
            res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
    }
})


export default productRouter