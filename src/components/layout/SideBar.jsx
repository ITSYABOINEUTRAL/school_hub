import {
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const SideBar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-800 text-slate-100 p-4">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <AcademicCapIcon className="h-7 w-7 text-slate-400" />
          School Hub
        </h1>
        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-400 text-white hover:bg-slate-800">
            <ChartBarIcon className="h-5 w-5" />
            Dashboard
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800">
            <UserGroupIcon className="h-5 w-5" />
            Students
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800">
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Assignments
          </a>
        </nav>
      </aside>
  )
}

export default SideBar