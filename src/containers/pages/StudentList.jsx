import Layout from "hocs/layouts/Layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_students } from "redux/actions/students/students";

function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    dispatch(get_students());
  }, [dispatch]);

  console.log('Students in component:', students&&students.results.students);

  return (
    <Layout>

      <section className="bg-white mb-28 py-8">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Lista de Estudiantes
          </h1>
          {students && students&&students.results.students.length > 0 ? (
            <div className=" container ">
            <ul className="space-y-4">
              {students&&students.results.students.map((student) => (
                <li key={student.id} className="p-4 border rounded-lg shadow">
                  <p className="text-lg font-medium">
                    {student.name} {student.last_name}
                  </p>
                  <p className="text-gray-600">RUT: {student.rut}</p>
                </li>
                
              ))}
            </ul>
            </div>
          ) : (
            <p className="text-gray-500">No hay estudiantes disponibles.</p>
          )}
          
        </div>
      </section>

    </Layout>
  );
}

export default StudentList;
