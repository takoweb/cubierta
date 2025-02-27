import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/lib/auth";
import { getSettings } from "@/lib/supabase";

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [logo, setLogo] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (data?.logo) {
          setLogo(data.logo);
        }
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const isAuthenticated = await login(username, password);
      if (isAuthenticated) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin");
      } else {
        setError("認証情報が無効です");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("ログイン中にエラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          {logo ? (
            <div className="flex justify-center mb-4">
              <Link to="/">
                <img
                  src={logo}
                  alt="レストランロゴ"
                  className="h-16 w-auto object-contain cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <Link to="/">
              <CardTitle className="cursor-pointer hover:text-primary/80">
                CUBIERTA スタッフログイン
              </CardTitle>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="username"
                name="username"
                placeholder="ユーザー名"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="パスワード"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
