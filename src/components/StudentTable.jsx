
export default function StudentsTable({ students }) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Students
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Overview of student performance
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
          {students.length} students
        </span>
      </div>

      {/* Responsive table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Class</th>
              <th className="px-4 py-3 text-right font-semibold">
                Score
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="transition-colors duration-200 hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <span className="font-semibold text-slate-800">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {student.classLevel}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <span
                      className={`inline-flex min-w-14 justify-center rounded-lg px-3 py-1.5 font-semibold ${
                        student.score >= 70
                          ? "bg-emerald-50 text-emerald-700"
                          : student.score >= 50
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {student.score}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-12 text-center"
                >
                  <p className="font-medium text-slate-600">
                    No students found
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Student records will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
