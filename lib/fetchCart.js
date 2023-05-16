import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./supabaseClient";

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    const response = await supabase.from('cart').select().eq('user_id', userId);
    return response.data;
})

export const fetchSaves = createAsyncThunk('save/fetchSave', async(userId) => {
    const response = await supabase.from('saves').select().eq('user_id', userId);
    return response.data
})