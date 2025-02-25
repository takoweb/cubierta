import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  };

  const NavItems = () => (
    <>
      <Link
        to="/"
        className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
      >
        <Home className="h-4 w-4" />
        メニューページを見る
      </Link>
      <Button
        variant="ghost"
        className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        ログアウト
      </Button>
    </>
  );

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex justify-center flex-1 md:flex-none md:justify-start">
            <Link to="/admin" className="flex items-center">
              {localStorage.getItem("styleSettings") ? (
                JSON.parse(localStorage.getItem("styleSettings") || "{}")
                  .logo ? (
                  <img
                    src={
                      JSON.parse(localStorage.getItem("styleSettings") || "{}")
                        .logo
                    }
                    alt="レストランロゴ"
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    CUBIERTA
                  </span>
                )
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  CUBIERTA
                </span>
              )}
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavItems />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[280px]">
                <div className="flex flex-col gap-4 mt-6">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
