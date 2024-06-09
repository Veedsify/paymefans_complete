import { Button } from "@/components/ui/button";
import CalendarDateRangePicker from "@/page-components/calendar/calendar-date-range-picker";
import DashBoardTab from "@/page-components/dashboard/data-tabs";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <DashBoardTab />
    </>
  );
}
