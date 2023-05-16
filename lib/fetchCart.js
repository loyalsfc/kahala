import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./supabaseClient";

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, table) => {
    const response = await supabase.from(table).select().eq('user_id', userId);
    return response.data;
})