export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  created_at: string;
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

// Save dish to localStorage
export const saveDish = async (dish: Omit<Dish, "id" | "created_at">) => {
  try {
    const dishes = getDishes();
    const newDish = {
      ...dish,
      id: Math.random().toString(36).substring(2),
      created_at: new Date().toISOString(),
    };

    dishes.push(newDish);
    localStorage.setItem("dishes", JSON.stringify(dishes));
    return newDish;
  } catch (error) {
    console.error("Error saving dish:", error);
    throw new Error("メニューの保存中にエラーが発生しました。");
  }
};

// Get dishes from localStorage
export const getDishes = () => {
  try {
    const dishes = localStorage.getItem("dishes");
    return dishes ? JSON.parse(dishes) : [];
  } catch (error) {
    console.error("Error getting dishes:", error);
    return [];
  }
};

// Save settings to localStorage
export const saveSettings = async (settings: StyleSettings) => {
  try {
    localStorage.setItem("styleSettings", JSON.stringify(settings));
    return settings;
  } catch (error) {
    console.error("Error saving settings:", error);
    throw new Error("設定の保存中にエラーが発生しました。");
  }
};

// Get settings from localStorage
export const getSettings = async () => {
  try {
    const settings = localStorage.getItem("styleSettings");
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error("Error getting settings:", error);
    return null;
  }
};

// Convert image file to base64
export const uploadImage = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
