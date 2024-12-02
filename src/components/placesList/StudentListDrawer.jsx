import React, { useEffect, useState } from "react";
import { getStudentsBySubject } from "redux/actions/students/students"; // Crear esta acción para obtener estudiantes por ramo

function StudentListDrawer({ visible, onClose, selectedPlace, assignStudentToPlace, refreshPlaces }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchStudents = async () => {
      if (selectedPlace) {
        setLoading(true);
        try {
          const fetchedStudents = await getStudentsBySubject(selectedPlace.subject.id);
          setStudents(fetchedStudents);
        } catch (error) {
          console.error("Error al cargar estudiantes:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudents();
  }, [selectedPlace]);

  const handleAssign = async (studentId) => {
    try {
      await assignStudentToPlace(selectedPlace.id, studentId);
      refreshPlaces(); // Refresca los cupos
      onClose(); // Cierra el drawer
    } catch (error) {
      console.error("Error al asignar estudiante:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform ${
        visible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Seleccionar Estudiante</h2>
        <button className="text-red-500 mb-4" onClick={onClose}>
          Cerrar
        </button>
        {loading ? (
          <p>Cargando estudiantes...</p>
        ) : (
          <div>
          <ul className="space-y-2">
            {students.map((student) => (
              <li
              key={student.id}
              className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAssign(student.id)}
              >
                {student.name} {student.last_name}
              </li>
            ))}
          </ul>
            </div>
        )}
      </div>
    </div>
  );
}

export default StudentListDrawer;
