import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone } from "lucide-react";

interface InfoSectionProps {
  title1?: string;
  content1?: string;
  title2?: string;
  content2?: string;
  title3?: string;
  content3?: string;
}

export default function InfoSection({
  title1 = "営業時間",
  content1 = "ランチ: 11:00 - 14:00\nディナー: 17:00 - 22:00\n定休日: 月曜日",
  title2 = "アクセス",
  content2 = "〒123-4567\n東京都渋谷区渋谷1-2-3\n渋谷駅から徒歩5分",
  title3 = "ご予約・お問い合わせ",
  content3 = "TEL: 03-1234-5678\nEmail: info@cubierta.jp",
}: InfoSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0 rounded-none">
          <div className="h-2" style={{ backgroundColor: "#e52f92" }} />
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
              <div
                className="p-3 mr-4 rounded-full"
                style={{
                  backgroundColor: "#f8d7e7",
                }}
              >
                <Clock className="h-6 w-6" style={{ color: "#e52f92" }} />
              </div>
              <h3 className="font-bold text-lg">{title1}</h3>
            </div>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {content1}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0 rounded-none">
          <div className="h-2" style={{ backgroundColor: "#e52f92" }} />
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
              <div
                className="p-3 mr-4 rounded-full"
                style={{
                  backgroundColor: "#f8d7e7",
                }}
              >
                <MapPin className="h-6 w-6" style={{ color: "#e52f92" }} />
              </div>
              <h3 className="font-bold text-lg">{title2}</h3>
            </div>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {content2}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0 rounded-none">
          <div className="h-2" style={{ backgroundColor: "#e52f92" }} />
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
              <div
                className="p-3 mr-4 rounded-full"
                style={{
                  backgroundColor: "#f8d7e7",
                }}
              >
                <Phone className="h-6 w-6" style={{ color: "#e52f92" }} />
              </div>
              <h3 className="font-bold text-lg">{title3}</h3>
            </div>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {content3}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
