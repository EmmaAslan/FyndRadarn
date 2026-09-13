import { supabase } from "../config/supabaseClient";

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const signIn = async () => {}

export const signOut = async () => {}

export const getCurrentUser = () => {}

export const onAuthStateChange = () => {}

