import React, {useState, useMemo, useEffect} from 'react';
import styles from '../pages/styles/products.module.css';
import { Slider } from '@mui/material';
import ProductsList from './productlist/productsList';
import ReactPaginate from 'react-paginate';
import { client } from '../utils/utils';

function AllProducts({categoryName, products, searchFilter, category}) {
    const [fetchedProducts, setFetchedProducts] = useState(products);
    const [sortParam, setSortParam] = useState('default');
    const [priceRange, setPriceRange] = useState({min: 1, max: 1000000})
    const [value, setValue] = useState([1, 1000000]);
    const [sortText, setSortText] = useState('Popularity');
    const [showSort, setShowSort] = useState(false);
    //Pagination set page number
    const [pageNumber, setPageNumber] = useState(0)

    //Set items per page
    const itemsPerPage = 20;

    //Setting current page
    const currentPageOffset = pageNumber * itemsPerPage;

    //Set page count
    const pageCount = Math.ceil(fetchedProducts.length / itemsPerPage);

    //Fetch least and highest product price
    useEffect(()=>{
        //set products
        setFetchedProducts(products)
        //Get the lowest value
        const low = fetchedProducts.reduce((prev, current) => {
            return (prev.amount < current.amount) ? prev : current 
        });
        //Get the highest value
        const high = fetchedProducts.reduce((prev, current) => {
            return (prev.amount > current.amount) ? prev : current 
        });
        setValue([low.amount,high.amount]);
        setPriceRange({min: low.amount, max: high.amount})
    },[products])

    // page change
    const handlePageChange = ({selected}) => {
        console.log(selected)
        setPageNumber(selected)
    }

    //scrolling to top when page changed
    const pageChange = () => {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        })
    }


    //Mapping through the products items
    const productsItem = useMemo(() => fetchedProducts.sort((a, b) => {
        //Sorting the products items based on the user preference
        if(sortParam === "ascending"){
            return b.amount - a.amount;
        } else if(sortParam === "descending"){
            return a.amount - b.amount;
        } else if (sortParam === "rating"){
            return b.rating.score - a.rating.score
        }else {
            return products;
        }
    }).slice(currentPageOffset, currentPageOffset + itemsPerPage).map(item => {
        return <ProductsList key={item?._id} item={item} />
    }), [fetchedProducts, sortParam, currentPageOffset])

    //Filtering price of item friom API endpoint
    const priceFiltering = async() => {
        console.log(value)
        const result = await client.fetch(`*[category._ref == "${category}" && amount > ${value[0]-1} && amount < ${value[1]+1} ]`);
        console.log(result)
        setFetchedProducts(result);
    }

    //Setting new value for Price range slider
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Changing the sorting parameter
    const changeSortParam = (e, sortParam) => {
        //Set the sort keyword
        setSortParam(sortParam);
        //Set whether to show the sorting modal
        setShowSort(false);
        //Get the currently sort title
        setSortText(e.target.textContent);
    }

    return (
    <section className={styles.mainProductSection}>
        <aside className={styles.aside}>
            <div className={styles.priceFiltering}>
                <h4 className={styles.priceFilteringHeader}>
                    <span>PRICE (₦)</span>
                    <button onClick={priceFiltering}>APPLY</button>
                </h4>
                <Slider
                    getAriaLabel={() => 'Price Range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    className={styles.sliderColor}
                    min={priceRange.min}
                    max={priceRange.max}
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
                        <li onClick={(event)=>changeSortParam(event, 'rating')}>Price: Rating</li>
                    </ul>}
                </div>
            </h3>
            <p className={styles.totalProducts}>{fetchedProducts.length} products found</p>
            <ul className={styles.mainPageItems}>
                {productsItem}
            </ul>
            {pageCount.length > 1 &&
                <div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageChange}
                        onClick={pageChange}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        className={styles.paginationContainer}
                        previousClassName={styles.nextClass}
                        nextClassName={styles.nextClass}
                        pageClassName={styles.pagesLi}
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        activeClassName={styles.active}
                        renderOnZeroPageCount={null}
                    />
                </div>
            }
        </div>
    </section>
    )
}

export default AllProducts
