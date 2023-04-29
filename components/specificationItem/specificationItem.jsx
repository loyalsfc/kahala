import React from 'react'
import style from './specificationItem.module.css'

function SpecificationItem({title, children}) {
    return (
        <article className={style.wrapper}>
            <div className={style.container}>
                <h5 className={style.title}>{title}</h5>
                <div className={style.markup}>{children}</div>
            </div>
        </article>
    )
}

export default SpecificationItem
