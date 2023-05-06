import React, { useState } from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import StatesList from '../statesList'
import { lga } from '../../utils/lga'
import { supabase } from '../../lib/supabaseClient'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

function AddressForm({spacing, callback}) {
    const {user} = useSelector(state => state.user) 
    const {data: fetchAddress, error, isLoading} = useSWR('address', async()=> supabase.from('user')
            .select()
            .eq('user_id', user?.email))
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        country_code: "+234",
        phone_number: "",
        delivery_address: "",
        delivery_state: "",
        delivery_lga: "",
        isDefault: false
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    }   

    // console.log(fetchAddress?.data[0].id)

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(fetchAddress?.data.length){
            const {error} = await supabase
                .from('user')
                .update({address: [...fetchAddress?.data[0]?.address, formData]})
                .eq('id', fetchAddress?.data[0].id)
            if(error) return;
        } else {
            const {error} = await supabase
                .from('user')
                .insert({user_id: user?.email, address: [{...formData, isDefault: true}]})
            if(error) return;
        }
        callback()
    }

    return (
        <form className={styles.newAddressForm} onSubmit={handleSubmit}>
            <div style={{padding: spacing ? "1.25rem 30px" : "1rem 3rem"}} className={styles.formDetailsContainer}>
                <div className={styles.formInputNameWrapper}>
                    <div className={styles.formInputWrapper}>
                        <label className={styles.formInputLabel} htmlFor="first_name">First Name</label>
                        <input 
                            type="text" 
                            id='first_name' 
                            placeholder='Adekunle' 
                            className={styles.formInput}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formInputWrapper}>
                        <label className={styles.formInputLabel} htmlFor="last_name">Last Name</label>
                        <input 
                            type="text" 
                            id='last_name' 
                            placeholder='Chioma Muhammed' 
                            className={styles.formInput}
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="first_name">Mobile Phone Number</label>
                    <div className={styles.formInputNumberWrapper}>
                        <input 
                            type="text" 
                            id='country_code' 
                            disabled={true} 
                            className={`${styles.formInput} ${styles.countryCode}`} 
                            value={formData.country_code}
                            onChange={handleChange}
                        />
                        <input 
                            type="number" 
                            id='phone_number' 
                            className={`${styles.formInput} ${styles.mainNumber}`} 
                            placeholder='80800000'
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='button' className={styles.addMoreBtn}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Add more details
                    </button>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="delivery_address">Delivery Adress</label>
                    <textarea 
                        id='delivery_address' 
                        placeholder='Street Name / Building / Apartment No / Floor' 
                        className={`${styles.formInput} ${styles.formTextArea}`} 
                        value={formData.delivery_address}
                        onChange={handleChange}
                    />
                    <button type='button' className={styles.addMoreBtn}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Add more details
                    </button>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="delivery_state">State / Region</label>
                    <select 
                        id='delivery_state' 
                        className={styles.formInput} 
                        value={formData.delivery_state}
                        onChange={handleChange}
                    >
                        <option value="">Please Select</option>
                        <StatesList />
                    </select>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="deliver_lga">City</label>
                    <select 
                        id='delivery_lga' 
                        className={styles.formInput} 
                        value={formData.delivery_lga}
                        onChange={handleChange}
                    >
                        <option>Please Select...</option>
                        {
                            lga?.[formData.delivery_state]?.map((lga, index) => {
                                return <option key={index}>{lga}</option>
                            })
                        }
                    </select>
                </div>
                <p className={styles.formnotes}>*Required</p>
            </div>
            <div style={{padding: spacing ? "1.25rem 30px" : "1rem 3rem"}} className={styles.submitBtnContainer}>
                <button className={styles.submitBtn}>SAVE AND CONTINUE</button>
            </div>
        </form>
    )
}

export default AddressForm
