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

  // No need to save to file, just store in localStorage
};
