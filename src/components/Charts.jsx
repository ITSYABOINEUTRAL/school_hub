
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const studentData = [
  { month: "Jan", students: 20 },
  { month: "Feb", students: 25 },
  { month: "Mar", students: 22 },
  { month: "Apr", students: 30 },
  { month: "May", students: 35 },
  { month: "Jun", students: 40 },
];

const genderData = [
  { name: "Male", value: 55 },
  { name: "Female", value: 45 },
];

const COLORS = ["#3B82F6", "#EC4899"];

// Custom tooltip for the line chart
const StudentsTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
      <p className="mb-1 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="text-xl font-bold tracking-tight text-slate-800">
        {payload[0].value}
      </p>

      <p className="mt-0.5 text-xs font-medium text-blue-600">
        Total students
      </p>
    </div>
  );
};

// Custom tooltip for the pie chart
const DistributionTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-700">
        {payload[0].name}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-900">
        {payload[0].value}%
      </p>
    </div>
  );
};

// Custom legend for the pie chart
const CustomLegend = ({ payload }) => (
  <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
    {payload?.map((entry) => (
      <div
        key={entry.value}
        className="flex items-center gap-2 text-sm text-slate-600"
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: entry.color }}
        />

        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function Charts() {
  const totalStudents =
    studentData[studentData.length - 1].students;

  const previousStudents =
    studentData[studentData.length - 2].students;

  const growth = Math.round(
    ((totalStudents - previousStudents) / previousStudents) * 100
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Students Overview */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">

        {/* Chart heading */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-800">
              Students Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Student enrollment over time
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-700">
              +{growth}%
            </span>
          </div>
        </div>

        {/* Highlighted statistic */}
        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total students
            </p>

            <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
              {totalStudents}
            </p>
          </div>

          <p className="pb-1 text-xs text-slate-400">
            Latest month
          </p>
        </div>

        {/* Beautiful line chart */}
        <div className="mt-5 h-[250px] w-full sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={studentData}
              margin={{
                top: 15,
                right: 12,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="studentsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#3B82F6"
                    stopOpacity={0.22}
                  />

                  <stop
                    offset="75%"
                    stopColor="#3B82F6"
                    stopOpacity={0.06}
                  />

                  <stop
                    offset="100%"
                    stopColor="#3B82F6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                tickMargin={15}
                padding={{ left: 8, right: 8 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 11,
                }}
                tickMargin={12}
                domain={[0, 50]}
                ticks={[0, 10, 20, 30, 40, 50]}
                allowDecimals={false}
              />

              <Tooltip
                content={<StudentsTooltip />}
                cursor={{
                  stroke: "#CBD5E1",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="students"
                stroke="none"
                fill="url(#studentsGradient)"
                activeDot={false}
                isAnimationActive={false}
              />

              <Area
                type="monotone"
                dataKey="students"
                stroke="#3B82F6"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                activeDot={{
                  r: 7,
                  fill: "#FFFFFF",
                  stroke: "#3B82F6",
                  strokeWidth: 3,
                }}
                dot={{
                  r: 4,
                  fill: "#FFFFFF",
                  stroke: "#3B82F6",
                  strokeWidth: 2.5,
                }}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart footer */}
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />

            <span className="text-xs font-medium text-slate-500">
              Student enrollment
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            Jan – Jun
          </span>
        </div>
      </section>

      {/* Student Distribution */}
      <section className="min-w-0 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">

        <div className="mb-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-800">
            Student Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Breakdown by gender
          </p>
        </div>

        <div className="h-[300px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="46%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                cornerRadius={5}
                stroke="none"
                label={({ percent }) =>
                  `${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip content={<DistributionTooltip />} />

              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
