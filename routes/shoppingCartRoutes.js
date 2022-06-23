const ShoppingCart = require('../models/storage')
const express = require('express')

const { Router } = express

const shoppingCart = new ShoppingCart('./models/shoppingCart.json')

const router = Router()

router.get('/:id/products', async(req,res)=>{
  const shoppingCartID = req.params.id

  const cart = await shoppingCart.getById(shoppingCartID)

  res.send(cart.products)
})


router.post('/',async (req,res)=>{
  const item = {...req.body,...{products:[]} }  
  const response = await shoppingCart.save(item)
  res.json(response)
})

router.post('/:id/products',async (req,res)=>{
  const product = req.body
  const shoppingCartID = req.params.id

  const cart = await shoppingCart.getById(shoppingCartID)

  cart.products.push(product)

  const response = await shoppingCart.save(cart)
  res.json(response)
})


router.delete('/:id',async (req,res)=>{
  const {id} = req.params

  const item = await shoppingCart.getById(id)

  if(typeof item === 'undefined'){
    res.json({'error':'carrito no encontrado'}) 
  }else{
    shoppingCart.deleteById(id);

    res.json({'message':'carrito se elimino'}) 
  }
})

router.delete('/:id/products/:id_prod',async (req,res)=>{
  const {id, id_prod} = req.params

  const cart = await shoppingCart.getById(id)

  if(typeof cart === 'undefined'){
    res.json({'error':'carrito no encontrado'}) 
  }else{
    const products = cart.products

    const idx = products.findIndex(p => p.id == id_prod) 

    products.splice(idx , 1)   

    cart.products = products
    
    const response = await shoppingCart.save(cart)

    res.json(response) 
  }
})

module.exports=router;