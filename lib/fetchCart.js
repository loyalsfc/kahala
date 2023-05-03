import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./supabaseClient";

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await supabase.from('cart').select();
    return response.data;
})