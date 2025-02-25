import React, { useState, useEffect } from "react";
import DishForm from "./DishForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, Palette } from "lucide-react";
import StyleSettings from "./StyleSettings";
import AdminNavbar from "./AdminNavbar";
import SearchHeader from "./SearchHeader";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedDishes = localStorage.getItem("dishes");
    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
    }
  }, []);

  const handleAddDish = (dish: Omit<Dish, "id">) => {
    const newDish = {
      ...dish,
      id: Date.now().toString(),
    };

    const updatedDishes = [...dishes, newDish];
    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
    setShowForm(false);
  };

  const handleEditDish = (dish: Omit<Dish, "id">) => {
    if (!editingDish) return;

    const updatedDishes = dishes.map((d) =>
      d.id === editingDish.id ? { ...dish, id: editingDish.id } : d,
    );

    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
    setEditingDish(null);
  };

  const handleDeleteDish = (id: string) => {
    const updatedDishes = dishes.filter((dish) => dish.id !== id);
    setDishes(updatedDishes);
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
  };

  const startEditing = (dish: Dish) => {
    setEditingDish(dish);
    setShowForm(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    document.querySelectorAll(".highlight").forEach((el) => {
      const text = el.textContent || "";
      el.replaceWith(text);
    });

    if (term) {
      const regex = new RegExp(term, "gi");
      const elements = document.querySelectorAll("h3, p");
      let firstMatch: Element | null = null;

      elements.forEach((el) => {
        const text = el.textContent || "";
        if (text.match(regex)) {
          el.innerHTML = text.replace(
            regex,
            (match) => `<span class="highlight bg-yellow-200">${match}</span>`,
          );
          if (!firstMatch) firstMatch = el;
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <SearchHeader onSearch={handleSearch} />
      <div className="border-b bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            {showSettings ? "デザイン設定を隠す" : "デザイン設定"}
          </Button>
          {!editingDish && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              {showForm ? "キャンセル" : "メニューを追加"}
            </Button>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {showSettings && <StyleSettings />}

          {showForm ? (
            <DishForm onSubmit={handleAddDish} />
          ) : editingDish ? (
            <DishForm
              onSubmit={handleEditDish}
              initialData={editingDish}
              isEditing
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <div key={dish.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => startEditing(dish)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteDish(dish.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-2 whitespace-pre-line">
                    {dish.description}
                  </p>
                  <div className="text-sm text-gray-500 flex justify-between items-center">
                    <span className="font-medium">{dish.category}</span>
                    <span className="font-bold">
                      {dish.price.includes("円")
                        ? dish.price
                        : `${dish.price}円`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
