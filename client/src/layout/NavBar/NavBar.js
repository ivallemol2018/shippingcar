import { Link } from 'react-router-dom' 
import React from 'react'
//Componentes
import CartWidget from '../../components/CartWidget/CartWidget'
import Button from '@mui/material/Button'

//Base de datos

//Estilos
import './NavBar.scss'

function NavBar() {

    return (
        <header className='main-header'>
            <div className='container-logo'>
                <Link to={'/'}></Link>
            </div>
            <ul className='navbar'>
                <li key='1'>
                    <Button>
                        <Link to=''>Home</Link>
                    </Button>
                </li>
            </ul>
            <CartWidget />
        </header>
    )
}

export default NavBar;