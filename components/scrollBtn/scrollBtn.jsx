import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import style from './scrollBtn.module.css'

function ScrollBtn() {
    return (
        <button className={style.btn}>
            <FontAwesomeIcon icon={faAngleUp} />
        </button>
    )
}

export default ScrollBtn
