import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPlaces, assignStudentToPlace } from "redux/actions/places/places";
import { ClipLoader } from "react-spinners";
import FilterPanel from "../../components/placesList/FilterPanel";
import ScheduleList from "../../components/placesList/ScheduleList";

function PlacesList({ places, getPlaces, assignStudentToPlace, user }) {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null); // Asegúrate de definirlo aquí

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        if (user?.university) {
          await getPlaces(user.university);
        }
      } catch (error) {
        console.error("Error al cargar los cupos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [getPlaces, user]);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      setFilteredPlaces(
        places.filter(
          (place) =>
            place.date === dateStr &&
            (!selectedInstitution ||
              place.ClinicFieldUnity.ClinicFieldIntitution.id ===
                selectedInstitution.value) &&
            (!selectedUnit ||
              place.ClinicFieldUnity.id === selectedUnit.value) // Filtrar por unidad seleccionada
        )
      );
    } else {
      setFilteredPlaces([]); // No mostrar cupos si no se selecciona una fecha
    }
  }, [selectedDate, selectedInstitution, selectedUnit, places]);

  const handleAssign = async (placeId) => {
    if (studentId) {
      try {
        await assignStudentToPlace(placeId, studentId);
        setStudentId("");
        getPlaces(user.university);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mx-auto max-w-screen-xl">
          {/* Panel de Filtros */}
          <FilterPanel
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedInstitution={selectedInstitution}
            setSelectedInstitution={setSelectedInstitution}
            selectedUnit={selectedUnit} // Pasa el estado de unidad
            setSelectedUnit={setSelectedUnit} // Pasa la función actualizadora
            places={places}
          />

          {/* Lista de Cupos */}
          <div className="col-span-2">
            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Ingrese ID de estudiante"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <ClipLoader color="#2563EB" loading={loading} size={50} />
              </div>
            ) : selectedDate ? (
              filteredPlaces.length > 0 ? (
                <ScheduleList
                  filteredPlaces={filteredPlaces}
                  handleAssign={handleAssign}
                />
              ) : (
                <p className="text-gray-500">
                  No hay cupos disponibles para la fecha seleccionada.
                </p>
              )
            ) : (
              <p className="text-gray-500">
                Selecciona una fecha para ver los cupos disponibles.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  places: state.places?.places || [],
  user: state.auth.user || null,
});

export default connect(mapStateToProps, { getPlaces, assignStudentToPlace })(
  PlacesList
);
