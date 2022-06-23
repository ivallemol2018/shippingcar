import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
//Componentes
import { useCartContext } from '../context/CartContext'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import Modal from '../components/Modal/Modal'
import IconButton from '@mui/material/IconButton'
import Check from '../assets/images/check.gif'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'

//Base de datos
// import db from "../firebase"
/// import { addDoc, collection } from "firebase/firestore"

//Table 
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

//Estilos
import CartScss from './Cart.scss'

const CartWidget = () => {

    const { cartList, removeOne, emptyCart, totalAmount } = useCartContext();
    const [openModal, setOpenModal] = useState(false);
    const [successOrder, setSuccessOrder] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();



    return (
        <>
            <div className='Checkout-container'>
                    <h1>Carrito</h1>
                { typeof cartList.id === 'undefined' ? (

                    <div className='NoItems-container'>
                        <p>¡No hay productos en el carrito!</p>
                        <Link to='/'>
                            <Button variant="outlined">Ver productos</Button>
                        </Link>
                    </div>
                ) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Descripcion</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {cartList.products.map((prod) => (
                                <TableRow key={prod.id}>
                                    <TableCell>{prod.nombre}</TableCell>
                                    <TableCell align="right">{prod.quantity}</TableCell>
                                    <TableCell align="right">$ {prod.precio}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Eliminar">
                                            <IconButton onClick={() => removeOne(cartList.id,prod.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">$ {totalAmount()}</TableCell>
                                <TableCell align="right"><Link to={'/'}><Button variant="outlined">Seguir comprando</Button></Link></TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                    <>
                        {( typeof cartList.id !== 'undefined')
                        &&
                        <div className='btnVolver-container'>
                            <Button variant="outlined" onClick={emptyCart}>Vaciar carrito</Button>
                        </div>}
                    </>
            </div>
        </>
    )
}

export default CartWidget;