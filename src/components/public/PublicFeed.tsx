import MenuCard from "./MenuCard";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { getDishes as getSupabaseDishes } from "@/lib/supabase";

const getTimeSlot = (hour: number) => {
  if (hour >= 11 && hour < 14) return "lunch";
  if (hour >= 14 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 23) return "dinner";
  return null;
};

export default function PublicFeed() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const data = await getSupabaseDishes();
        setDishes(data);
      } catch (error) {
        console.error("Error loading dishes:", error);
      }
    };
    loadDishes();
    setLoading(false);
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
    <div className="min-h-screen bg-gray-50">
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: localStorage.getItem("styleSettings")
            ? JSON.parse(localStorage.getItem("styleSettings") || "{}")
                .backgroundImage
              ? `url(${JSON.parse(localStorage.getItem("styleSettings") || "{}").backgroundImage})`
              : undefined
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 0,
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8 relative">
          {localStorage.getItem("styleSettings") &&
            JSON.parse(localStorage.getItem("styleSettings") || "{}")
              .backgroundImage && (
              <div className="absolute inset-0 bg-black/40 -mx-4 -my-8" />
            )}
          <h1
            className="text-3xl font-bold text-center mb-8 relative"
            style={{
              color:
                localStorage.getItem("styleSettings") &&
                JSON.parse(localStorage.getItem("styleSettings") || "{}")
                  .backgroundImage
                  ? "white"
                  : "var(--primary-color)",
            }}
          >
            メニュー
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[200px] w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))
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
  );
}
