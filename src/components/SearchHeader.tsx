import React from "react";
import { Input } from "./ui/input";
import { Search, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { t } from "@/lib/i18n";

interface SearchHeaderProps {
  onSearch?: (term: string) => void;
}

const SearchHeader = ({ onSearch = () => {} }: SearchHeaderProps) => {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear().toString(),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth().toString(),
  );
  const [viewsData, setViewsData] = useState<{
    [key: string]: {
      [key: string]: {
        total: number;
        lunch: number;
        afternoon: number;
        dinner: number;
      };
    };
  }>({});

  useEffect(() => {
    const views = JSON.parse(localStorage.getItem("viewsData") || "{}");
    setViewsData(views);
  }, []);

  const currentViews = viewsData[selectedYear]?.[selectedMonth] || {
    total: 0,
    lunch: 0,
    afternoon: 0,
    dinner: 0,
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 sticky top-0 z-10 space-y-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="pl-10 w-full"
            placeholder={t("searchMenuItems")}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Analytics Section */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          {/* Date Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="年" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: 5 },
                  (_, i) => currentDate.getFullYear() - i,
                ).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}年
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="月" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i + 1}月
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Views */}
          <Badge
            variant="secondary"
            className="px-4 py-2 text-base flex items-center gap-2 justify-center sm:justify-start"
          >
            <Users className="h-4 w-4" />
            <span>閲覧数: {currentViews.total.toLocaleString()}回</span>
          </Badge>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Badge
            variant="outline"
            className="px-3 py-2 flex justify-between items-center"
          >
            <span>ランチ (11-14時):</span>
            <span className="font-semibold">
              {currentViews.lunch.toLocaleString()}回
            </span>
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-2 flex justify-between items-center"
          >
            <span>午後 (14-18時):</span>
            <span className="font-semibold">
              {currentViews.afternoon.toLocaleString()}回
            </span>
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-2 flex justify-between items-center"
          >
            <span>ディナー (18-23時):</span>
            <span className="font-semibold">
              {currentViews.dinner.toLocaleString()}回
            </span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
