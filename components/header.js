import style from './header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

function Header() {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <span className={style.title}>Kahala <span className={style.orange}>Store</span></span>
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
                <p className={style.headerMenu}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Cart</span>
                </p>
            </div>
        </header>
    )
}

export default Header
