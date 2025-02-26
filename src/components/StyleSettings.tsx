import { useState, useEffect } from "react";
import { saveSettings, getSettings, uploadImage } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StyleSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  titleSize: string;
  textSize: string;
  logo?: string;
  backgroundImage?: string;
}

const PREDEFINED_COLORS = [
  { name: "クラシック", primary: "#1a1a1a", secondary: "#4a4a4a" },
  { name: "オーシャン", primary: "#1e3a8a", secondary: "#3b82f6" },
  { name: "フォレスト", primary: "#064e3b", secondary: "#059669" },
  { name: "サンセット", primary: "#9f1239", secondary: "#e11d48" },
  { name: "アース", primary: "#78350f", secondary: "#b45309" },
  { name: "ラベンダー", primary: "#581c87", secondary: "#7c3aed" },
  { name: "ローズ", primary: "#9d174d", secondary: "#ec4899" },
  { name: "スレート", primary: "#334155", secondary: "#64748b" },
  { name: "エメラルド", primary: "#065f46", secondary: "#10b981" },
  { name: "ルビー", primary: "#991b1b", secondary: "#dc2626" },
];

const FONTS = [
  "Inter",
  "Roboto",
  "Poppins",
  "Playfair Display",
  "Montserrat",
  "Lora",
  "Source Sans Pro",
  "Merriweather",
  "Open Sans",
  "Raleway",
  "Nunito",
  "Ubuntu",
];

export default function StyleSettings() {
  const [settings, setSettings] = useState<StyleSettings>({
    primaryColor: "#1a1a1a",
    secondaryColor: "#4a4a4a",
    fontFamily: "Inter",
    titleSize: "24px",
    textSize: "16px",
    logo: "",
    backgroundImage: "",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const publicUrl = await uploadImage(file);
        setSettings((prev) => ({ ...prev, logo: publicUrl }));
      } catch (error) {
        console.error("Error uploading logo:", error);
      }
    }
  };

  useEffect(() => {
    const updateSettings = async () => {
      try {
        await saveSettings(settings);
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    };
    updateSettings();
    document.documentElement.style.setProperty(
      "--primary-color",
      settings.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      settings.secondaryColor,
    );
    document.documentElement.style.setProperty(
      "--font-family",
      settings.fontFamily,
    );
    document.documentElement.style.setProperty(
      "--title-size",
      settings.titleSize,
    );
    document.documentElement.style.setProperty(
      "--text-size",
      settings.textSize,
    );
  }, [settings]);

  const handleColorChange = (colorSet: {
    primary: string;
    secondary: string;
  }) => {
    setSettings((prev) => ({
      ...prev,
      primaryColor: colorSet.primary,
      secondaryColor: colorSet.secondary,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t("styleSettings")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>{t("colorTheme")}</Label>
          <div className="grid grid-cols-5 gap-4">
            {PREDEFINED_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color)}
                className={`group relative rounded-lg p-2 hover:bg-gray-100 transition-colors ${settings.primaryColor === color.primary ? "ring-2 ring-primary ring-offset-2" : ""}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <div
                      className="w-12 h-8 rounded-t-full"
                      style={{ background: color.primary }}
                    />
                    <div
                      className="w-12 h-4 rounded-b-full"
                      style={{ background: color.secondary }}
                    />
                  </div>
                  <span className="text-xs font-medium">{color.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t("fontFamily")}</Label>
          <Select
            value={settings.fontFamily}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, fontFamily: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("selectFont")} />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map((font) => (
                <SelectItem key={font} value={font}>
                  <span style={{ fontFamily: font }}>{font}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("titleSize")}</Label>
          <Select
            value={settings.titleSize}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, titleSize: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("selectTitleSize")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20px">{t("small")}</SelectItem>
              <SelectItem value="24px">{t("medium")}</SelectItem>
              <SelectItem value="28px">{t("large")}</SelectItem>
              <SelectItem value="32px">{t("extraLarge")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("textSize")}</Label>
          <Select
            value={settings.textSize}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, textSize: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("selectTextSize")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="14px">{t("small")}</SelectItem>
              <SelectItem value="16px">{t("medium")}</SelectItem>
              <SelectItem value="18px">{t("large")}</SelectItem>
              <SelectItem value="20px">{t("extraLarge")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("restaurantLogo")}</Label>
          <div className="flex flex-col gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="cursor-pointer"
            />
            {settings.logo && (
              <div className="relative w-40 h-16">
                <img
                  src={settings.logo}
                  alt="レストランロゴ"
                  className="w-full h-full object-contain"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2"
                  onClick={() => setSettings((prev) => ({ ...prev, logo: "" }))}
                >
                  {t("remove")}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t("landingPageBackground")}</Label>
          <div className="flex flex-col gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSettings((prev) => ({
                      ...prev,
                      backgroundImage: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="cursor-pointer"
            />
            {settings.backgroundImage && (
              <div className="relative w-full h-32">
                <img
                  src={settings.backgroundImage}
                  alt="背景画像プレビュー"
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, backgroundImage: "" }))
                  }
                >
                  {t("remove")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
