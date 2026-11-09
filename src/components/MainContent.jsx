import { students } from "../data";
import Cards from "./Cards";
import Charts from "./Charts";
import StudentsTable from "./StudentTable";

const MainContent = () => {
  return (
    <main className="p-6">
      <Cards />
      <Charts />
      <StudentsTable students={students} />
    </main>
  );
};

export default MainContent;