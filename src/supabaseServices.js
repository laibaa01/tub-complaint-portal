import { supabase } from './supabaseClient'; 

// 1. Complaint ko Supabase mein save karne ka function
export const insertComplaint = async (complaintData) => {
  try {
    const { data, error } = await supabase
      .from('complaints') 
      .insert([complaintData])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Supabase Error:", error.message);
    return { data: null, error: error.message };
  }
};