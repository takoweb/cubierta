import { supabase } from "./supabase";

export const login = async (username: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from("staff_credentials")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error) {
      console.error("Login error:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};
