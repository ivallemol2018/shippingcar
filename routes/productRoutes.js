const Product = require('../models/storage')
const requireLogin = require('../middlewares/requireLogin');
const express = require('express')

const { Router } = express

const product = new Product('./models/product.json')

const router = Router()

router.get('/',async (req,res)=>{
  const items = await product.getAll()
  res.send(items)
})

router.get('/:id',async (req,res)=>{
  const { id } = req.params
  const item = await product.getById(id)

  if(typeof item === 'undefined'){
    res.json({'error':'producto no encontrado'}) 
  }else{
    res.json(item);
  }
})

router.post('/',requireLogin,async (req,res)=>{
  const item = req.body
  await product.save(item)
  res.json({'message':'producto se grabo '})
})

router.put('/:id',requireLogin,async (req,res)=>{
  const {id} = req.params
  
  const itemUpdated = await product.getById(id)

  if(typeof itemUpdated === 'undefined'){
    res.json({'error':'producto no encontrado'}) 
  }else{
    let item = req.body

    item = {id, ...item}

    product.save(item)
    res.json({'message':'Producto se actualizo satisfactoriamente'})  
  }  
})

router.delete('/:id',requireLogin,async (req,res)=>{
  const {id} = req.params

  const item = await product.getById(id)

  if(typeof item === 'undefined'){
    res.json({'error':'producto no encontrado'}) 
  }else{
    product.deleteById(id);
    const items = product.getAll()

    res.send(items)
  }
})

module.exports=router;