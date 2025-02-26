import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mevigdsbylvsyjstqffg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ldmlnZHNieWx2c3lqc3RxZmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MzMxNTksImV4cCI6MjA1NjEwOTE1OX0.BERPbTvtzFBDZS1-x_-iXa2QE9aRTqpiHcoVbRFhjww";

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
    return data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};

export const saveSettings = async (settings: StyleSettings) => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .upsert({ id: 1, ...settings })
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
      .select("*")
      .eq("id", 1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

export const uploadImage = async (file: File, bucket: string) => {
  try {
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
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("画像のアップロード中にエラーが発生しました。");
  }
};

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

    if (error) {
      console.error("Supabase error, falling back to localStorage:", error);
      const localDishes = localStorage.getItem("dishes");
      if (localDishes) {
        return JSON.parse(localDishes);
      }
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    const localDishes = localStorage.getItem("dishes");
    if (localDishes) {
      return JSON.parse(localDishes);
    }
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
    // Convert camelCase to snake_case
    const dbSettings = {
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
      .upsert({ id: 1, ...dbSettings })
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
      .select("*")
      .eq("id", 1)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    if (!data) return null;

    // Convert snake_case back to camelCase
    return {
      primaryColor: data.primary_color,
      secondaryColor: data.secondary_color,
      fontFamily: data.font_family,
      titleSize: data.title_size,
      textSize: data.text_size,
      logo: data.logo,
      backgroundImage: data.background_image,
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

// Helper function to upload image to Supabase Storage
export const uploadImage = async (file: File, bucket: string) => {
  try {
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
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("画像のアップロード中にエラーが発生しました。");
  }
};
