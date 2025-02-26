import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set",
  );
}

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
  primary_color: string;
  secondary_color: string;
  font_family: string;
  title_size: string;
  text_size: string;
  logo?: string;
  background_image?: string;
}

export const saveDish = async (dish: Omit<Dish, "id" | "created_at">) => {
  try {
    const { data, error } = await supabase
      .from("dishes")
      .insert([dish])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error saving dish:", error);
    throw new Error("メニューの保存中にエラーが発生しました。");
  }
};

export const getDishes = async () => {
  try {
    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};

export const saveSettings = async (settings: {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  titleSize: string;
  textSize: string;
  logo?: string;
  backgroundImage?: string;
}) => {
  try {
    const dbSettings = {
      id: 1,
      primary_color: settings.primaryColor,
      secondary_color: settings.secondaryColor,
      font_family: settings.fontFamily,
      title_size: settings.titleSize,
      text_size: settings.textSize,
      logo: settings.logo,
      background_image: settings.backgroundImage,
    };

    const { data, error } = await supabase
      .from("settings")
      .upsert(dbSettings)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error saving settings:", error);
    throw new Error("設定の保存中にエラーが発生しました。");
  }
};

export const getSettings = async () => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select()
      .eq("id", 1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    if (!data) return null;

    return {
      primaryColor: data.primary_color || "#1a1a1a",
      secondaryColor: data.secondary_color || "#4a4a4a",
      fontFamily: data.font_family || "Inter",
      titleSize: data.title_size || "24px",
      textSize: data.text_size || "16px",
      logo: data.logo || undefined,
      backgroundImage: data.background_image || undefined,
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

export const uploadImage = async (file: File, bucket: string) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("画像のアップロード中にエラーが発生しました。");
  }
};
