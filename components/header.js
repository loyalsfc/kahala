import style from './header.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'

function Header() {
    const {cart}  = useSelector(state => state.cart)
    
    return (
        <header className={style.header}>
            <div className={style.container}>
                <Link href='/'>
                    <span className={style.title}>Kahala <span className={style.orange}>Store</span></span>
                </Link>
                <form className={style.inputContainer}>
                    <div className={style.inputWrapper}>
                        <span><FontAwesomeIcon icon={faSearch}/></span>
                        <input type="search" className={style.searchInput} placeholder='Search for product, brands and categories ' />
                    </div>
                    <button className={style.searchButton}>SEARCH</button>
                </form>
                <p className={style.headerMenu}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Account</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </p>
                <p className={style.headerMenu}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <span>Help</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </p>
                <Link href="/cart">
                    <p className={style.headerMenu}>
                        <span className={style.cartItemsCountWrapper}>
                            <span className={style.cartItemsCount}>{cart.totalProducts}</span>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <span>Cart</span>
                    </p>
                </Link>
            </div>
        </header>
    )
}

export default Header
