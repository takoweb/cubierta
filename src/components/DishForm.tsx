import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DishFormProps {
  onSubmit: (dish: {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
  }) => void;
  initialData?: {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
  };
  isEditing?: boolean;
}

export default function DishForm({
  onSubmit,
  initialData,
  isEditing = false,
}: DishFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (initialData?.image) {
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dish = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      category: formData.get("category") as string,
      image: imagePreview || initialData?.image || "",
    };
    onSubmit(dish);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditing ? t("editMenuItem") : t("addMenuItem")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              id="name"
              name="name"
              placeholder="料理名を入力"
              required
              defaultValue={initialData?.name}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              id="description"
              name="description"
              placeholder="説明を入力"
              required
              defaultValue={initialData?.description}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Input
              id="price"
              name="price"
              placeholder="価格を入力"
              required
              defaultValue={initialData?.price}
            />
          </div>

          <div className="space-y-2">
            <Input
              id="category"
              name="category"
              placeholder="カテゴリーを入力"
              required
              defaultValue={initialData?.category}
            />
          </div>

          <div className="space-y-2">
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {(imagePreview || initialData?.image) && (
              <div className="mt-2">
                <img
                  src={imagePreview || initialData?.image}
                  alt="プレビュー"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isEditing ? "保存" : "追加"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
