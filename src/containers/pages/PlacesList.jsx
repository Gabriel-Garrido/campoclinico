import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPlaces, assignStudentToPlace } from "redux/actions/places/places";

function PlacesList({ places, getPlaces, assignStudentToPlace, user }) {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);

  console.log('user.university en placelist ', user.university);
  

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        await getPlaces(user&&user.university); // Se asegura que getPlaces no cause problemas
      } catch (error) {
        console.error("Error al cargar los cupos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleAssign = async (placeId) => {
    if (studentId) {
      try {
        await assignStudentToPlace(placeId, studentId);
        setStudentId(""); // Limpiar el input después de la asignación
        // Refrescar los datos después de asignar un estudiante
        getPlaces();
      } catch (error) {
        console.error("Error al asignar estudiante:", error);
      }
    } else {
      alert("Por favor, ingrese un ID de estudiante antes de asignar.");
    }
  };

  return (
    <Layout>
      <section className="bg-white py-8">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Lista de Cupos Clínicos
          </h1>
          <div className="mb-4">
            <input
              type="text"
              className="border p-2 rounded w-full md:w-1/2"
              placeholder="Ingrese ID de estudiante"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          {loading ? (
            <p className="text-gray-500">Cargando cupos...</p>
          ) : places && places.length > 0 ? (
            <div className="container">
              <ul className="space-y-4">
                {places.map((place) => (
                  <li
                    key={place.id}
                    className={`p-4 border rounded-lg shadow ${
                      place.is_place_available
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <p className="text-lg font-medium">
                      Fecha: {place.date} | Horario: {place.start_time} -{" "}
                      {place.end_time}
                    </p>
                    <p className="text-gray-600">
                      {place.is_place_available
                        ? "Cupo disponible"
                        : `Ocupado por: ${place.student?.name} ${place.student?.last_name}`}
                    </p>
                    {place.is_place_available && (
                      <button
                        onClick={() => handleAssign(place.id)}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Asignar estudiante
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No hay cupos disponibles.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  places: state.places?.places || [], // Asegurar que el estado esté inicializado
  user: state.auth.user || [],
});

export default connect(mapStateToProps, { getPlaces, assignStudentToPlace })(
  PlacesList
);
