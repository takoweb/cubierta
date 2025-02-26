import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-url.supabase.co";
const supabaseAnonKey = "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  created_at?: string;
}

export interface StyleSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  titleSize: string;
  textSize: string;
  logo?: string;
  backgroundImage?: string;
}

export const saveDish = async (dish: Omit<Dish, "id" | "created_at">) => {
  const { data, error } = await supabase.from("dishes").insert([dish]).select();
  if (error) throw error;
  return data[0];
};

export const getDishes = async () => {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const saveSettings = async (settings: StyleSettings) => {
  const { data, error } = await supabase
    .from("settings")
    .upsert({ id: 1, ...settings })
    .select();
  if (error) throw error;
  return data[0];
};

export const getSettings = async () => {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
};

// Helper function to upload image to Supabase Storage
export const uploadImage = async (file: File, bucket: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return publicUrl;
};
