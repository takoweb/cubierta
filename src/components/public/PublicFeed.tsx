import MenuCard from "./MenuCard";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { getDishes, getSettings, type StyleSettings } from "@/lib/supabase";
import InfoSection from "@/components/InfoSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const getTimeSlot = (hour: number) => {
  if (hour >= 11 && hour < 14) return "lunch";
  if (hour >= 14 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 23) return "dinner";
  return null;
};

export default function PublicFeed() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<StyleSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dishesData, settingsData] = await Promise.all([
          getDishes(),
          getSettings(),
        ]);
        setDishes(dishesData || []);
        setSettings(settingsData);
      } catch (error) {
        console.error("Error loading data:", error);
        setDishes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Only increment view count if user is not authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      import("@/lib/analytics").then(({ saveVisitorData }) => {
        saveVisitorData();
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: settings?.backgroundImage
              ? `url(${settings.backgroundImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          <Navbar />
          <InfoSection />
          <div className="max-w-6xl mx-auto px-4 py-8 relative">
            {settings?.backgroundImage && (
              <div className="absolute inset-0 bg-black/40 -mx-4 -my-8" />
            )}
            <h1
              className="text-3xl font-bold text-center mb-8 relative"
              style={{
                color: settings?.backgroundImage
                  ? "white"
                  : settings?.primaryColor || "var(--primary-color)",
              }}
            >
              メニュー
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {loading ? (
                <Loading />
              ) : dishes.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-lg text-gray-500">
                    メニューがまだ追加されていません
                  </p>
                </div>
              ) : (
                dishes.map((dish) => (
                  <MenuCard
                    key={dish.id}
                    name={dish.name}
                    description={dish.description}
                    image={dish.image}
                    price={dish.price || "1,500"}
                    category={dish.category || "メイン"}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
