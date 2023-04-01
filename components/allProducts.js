import React, {useState} from 'react'
import styles from '../pages/styles/products.module.css'
import { Slider } from '@mui/material';

function AllProducts({productsItem, categoryName, fetchedProducts, setFetchedProducts, searchFilter, setSortParam}) {
    const [value, setValue] = useState([0, 1000])
    const [sortText, setSortText] = useState('Popularity');
    const [showSort, setShowSort] = useState(false)

    const priceFiltering = async() => {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${value[0]}&price_max=${value[1]}&${searchFilter}`)
        const result = await res.json()
        setFetchedProducts(result)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeSortParam = (e, sortParam) => {
        setSortParam(sortParam);
        setShowSort(false)
        setSortText(e.target.textContent)
    }

    return (
        <section className={styles.mainProductSection}>
        <aside className={styles.aside}>
            <div className={styles.priceFiltering}>
                <h4 className={styles.priceFilteringHeader}>
                    <span>PRICE ($)</span>
                    <button onClick={priceFiltering}>APPLY</button>
                </h4>
                <Slider
                    getAriaLabel={() => 'Price Range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    className={styles.sliderColor}
                    min={0}
                    max={1000}
                />
                <div className={styles.priceFilterInputs}>
                    <input
                        type='number'
                        value={value[0]}
                        onChange={(e)=>setValue([e.target.value, value[1]])}
                    />
                    <input
                        type='number'
                        value={value[1]}
                        onChange={(e)=>setValue([value[0], e.target.value])}
                    />
                </div>
            </div>
        </aside>
        <div className={styles.mainProducts}>
            <h3>
                <span>{categoryName}</span>
                <div className={styles.sortingWrapper}>
                    <p style={{backgroundColor: showSort ? '#EDEDED' : null}} onClick={()=>setShowSort(!showSort)}>Sort By: {sortText}</p>
                    {showSort && <ul className={styles.sortContainer}>
                        <li onClick={(event)=>changeSortParam(event, 'default')}>Popularity</li>
                        <li onClick={(event)=>changeSortParam(event, 'descending')}>Price: Low to High</li>
                        <li onClick={(event)=>changeSortParam(event, 'ascending')}>Price: High to Low</li>
                    </ul>}
                </div>
            </h3>
            <p className={styles.totalProducts}>{fetchedProducts.length} products found</p>
            <ul className={styles.mainPageItems}>
                {productsItem}
            </ul>
        </div>
    </section>
    )
}

export default AllProducts