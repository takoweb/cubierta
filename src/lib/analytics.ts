interface ViewData {
  total: number;
  lunch: number;
  afternoon: number;
  dinner: number;
}

interface YearData {
  [month: string]: ViewData;
}

interface AnalyticsData {
  [year: string]: YearData;
}

export const saveVisitorData = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = currentDate.getMonth().toString();
  const hour = currentDate.getHours();

  // Get time slot
  const getTimeSlot = (hour: number) => {
    if (hour >= 11 && hour < 14) return "lunch";
    if (hour >= 14 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 23) return "dinner";
    return null;
  };

  const timeSlot = getTimeSlot(hour);
  if (!timeSlot) return;

  // Get existing data
  const viewsData: AnalyticsData = JSON.parse(
    localStorage.getItem("viewsData") || "{}",
  );

  // Initialize if needed
  if (!viewsData[year]) viewsData[year] = {};
  if (!viewsData[year][month]) {
    viewsData[year][month] = {
      total: 0,
      lunch: 0,
      afternoon: 0,
      dinner: 0,
    };
  }

  // Update counts
  viewsData[year][month].total += 1;
  viewsData[year][month][timeSlot] += 1;

  // Save to localStorage
  localStorage.setItem("viewsData", JSON.stringify(viewsData));

  // Save to file
  const formattedDate = `${year}-${String(Number(month) + 1).padStart(2, "0")}`;
  const timeOfDay = timeSlot;
  const data = `${formattedDate},${timeOfDay},${new Date().toISOString()}\n`;

  // Create a Blob and download it
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `visitor_data_${formattedDate}.csv`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
