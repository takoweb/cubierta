import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const NavItems = () => (
    <>
      {isAuthenticated ? (
        <Link
          to="/admin"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          管理画面へ戻る
        </Link>
      ) : (
        <Link
          to="/login"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          ログイン
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-white border-b relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex justify-center flex-1 md:flex-none md:justify-start">
            <Link to="/" className="flex items-center">
              {localStorage.getItem("styleSettings") ? (
                JSON.parse(localStorage.getItem("styleSettings") || "{}")
                  .logo ? (
                  <img
                    src={
                      JSON.parse(localStorage.getItem("styleSettings") || "{}")
                        .logo
                    }
                    alt="Restaurant logo"
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
