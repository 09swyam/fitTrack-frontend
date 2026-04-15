import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const WeeklyCaloriesChart = ({ data, dailyGoal }) => {

  const formatted = data.map((item) => {
    const [y, m, d] = item.date.split("-");
    const date = new Date(y, m - 1, d);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      consumed: item.consumed,
    };
  });

  const first = formatted[0]?.fullDate;
  const last = formatted[formatted.length - 1]?.fullDate;

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-lg w-full">
      
      <h2 className="font-bold text-lg mb-4 text-success">
        Last 7 Days Calories Intake ({first} - {last})
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis domain={[0, dailyGoal]} />

            <Tooltip />

            <ReferenceLine
              y={dailyGoal}
              stroke="#22c55e"
              strokeDasharray="4 4"
            />

            <Bar
              dataKey="consumed"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default WeeklyCaloriesChart;