const Cards = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500">🎓 Students</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">6</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500">🎓 Teachers</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">9</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500">🎓 Assignments</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">12</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500">🎓 Assignments</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">12</p>
        </div>              
    </div>
  )
}

export default Cards