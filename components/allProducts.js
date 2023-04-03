import React, {useState, useMemo, useEffect} from 'react'
import styles from '../pages/styles/products.module.css'
import { Slider } from '@mui/material';
import ProductsList from './productsList';

function AllProducts({categoryName, products, searchFilter}) {
    const [fetchedProducts, setFetchedProducts] = useState(products);
    const [sortParam, setSortParam] = useState('default');
    const [value, setValue] = useState([1, 1000]);
    const [sortText, setSortText] = useState('Popularity');
    const [showSort, setShowSort] = useState(false);

    const productsItem = useMemo(() => fetchedProducts.sort((a, b) => {
        if(sortParam === "ascending"){
            return b.price - a.price
        } else if(sortParam === "descending"){
            return a.price - b.price
        } else {
            return a.id - b.id
        }
    }).map(item => {
        return <ProductsList key={item?.id} item={item} />
    }), [fetchedProducts, sortParam])

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
                    min={1}
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
