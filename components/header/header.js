import style from './header.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCartShopping, faEnvelope, faHeart, faSearch, faStore, faUser, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

function Header() {
    const [showDropDown, setShowDropDown] = useState(false)
    const {cart}  = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    
    return (
        <header className={style.header}>
            <div className={style.container}>
                <Link href='/'>
                    <span className={style.title}>Kahala <span className={style.orange}>Store</span></span>
                </Link>
                <div className={style.searchFormWrapperDeakTop}>
                    <SearchForm />
                </div>
                <div  
                    onClick={()=>setShowDropDown(!showDropDown)} 
                    className={`${style.headerMenu} ${style.userMenu}`}
                >
                    <FontAwesomeIcon icon={faUser} size='xl'/>
                    <span className={style.headerMenuTitle}>{user ? `Hi, ${user?.name.split(" ")[0]} ` : 'Account'} <FontAwesomeIcon icon={faAngleDown} size='xs'/></span>
                    {showDropDown &&
                        <>
                            {user ? (
                                <div className={style.userMenuDropDownContainer}>
                                    <ul className={style.dropDownMenu}>
                                        <li><FontAwesomeIcon icon={faUser}/> My Account</li>
                                        <li>
                                            <Link href='/customer/order'>
                                                <FontAwesomeIcon icon={faStore}/> Orders
                                            </Link>
                                        </li>
                                        <li><FontAwesomeIcon icon={faEnvelope}/> Inbox</li>
                                        <li><FontAwesomeIcon icon={faHeart}/> Saved Items</li>
                                        <li><FontAwesomeIcon icon={faVrCardboard}/> Vouchers</li>
                                    </ul>
                                    <div className={style.signOutBtnWrapper}>
                                        <button onClick={()=>signOut()} className={style.signOut}>Log out</button>
                                    </div>
                                </div>
                            ):(
                                <div className={style.userMenuDropDownContainer}>
                                    <div className={style.signBtnWrapper}>
                                        <Link href="/auth">
                                            <button className={style.signBtn}>Sign in</button>
                                        </Link>
                                    </div>
                                    <ul className={style.dropDownMenu}>
                                        <li><FontAwesomeIcon icon={faUser}/> My Account</li>
                                        <li><FontAwesomeIcon icon={faStore}/> Orders</li>
                                        <li><FontAwesomeIcon icon={faHeart}/> Saved Items</li>
                                    </ul>
                                </div>
                            )}
                        </>
                    }
                </div>
                <p className={`${style.headerMenu} ${style.help}`}>
                    <FontAwesomeIcon icon={faQuestionCircle} size='xl'/>
                    <span className={style.headerMenuTitle}>Help <FontAwesomeIcon icon={faAngleDown} size='xs'/></span>
                </p>
                <Link href="/cart">
                    <p className={style.headerMenu}>
                        <span className={style.cartItemsCountWrapper}>
                            {cart.totalProducts !== 0 && <span className={style.cartItemsCount}>{cart.totalProducts}</span>}
                            <FontAwesomeIcon icon={faCartShopping} size='xl'/>
                        </span>
                        <span className={style.headerMenuTitle}>Cart</span>
                    </p>
                </Link>
            </div>
            <div className={style.searchFormWrapperMobile}>
                <SearchForm />
            </div>
        </header>
    )
}

function SearchForm(){
    const router = useRouter()
    const searchInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push({
            pathname: '/catalog/search',
            query: {q: searchInput.current.value}
        })
    }
    return(
        <form onSubmit={handleSubmit} className={style.inputContainer}>
            <div className={style.inputWrapper}>
                <span><FontAwesomeIcon icon={faSearch}/></span>
                <input type="search" ref={searchInput} className={style.searchInput} placeholder='Search for product, brands and categories ' />
            </div>
            <button className={style.searchButton}>SEARCH</button>
        </form>
    )
}

export default Header
