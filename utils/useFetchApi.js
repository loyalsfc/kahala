import React, { useState } from 'react'
import useSWR from 'swr'

function useFetchApi(path){
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const {data, error, isLoading} = useSWR(`/api/${path}`, fetcher)

    return {
        data, isError: error, isLoading 
    }
}

export default useFetchApi
