import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPlaces, assignStudentToPlace } from "redux/actions/places/places";
import { ClipLoader } from "react-spinners";
import FilterPanel from "../../components/placesList/FilterPanel";
import ScheduleList from "../../components/placesList/ScheduleList";
import PlaceForm from "../../components/placesList/PlaceForm";
import StudentListDrawer from "../../components/placesList/StudentListDrawer";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";


function PlacesList({ places, getPlaces, assignStudentToPlace, user }) {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false); // Controla la visibilidad del drawer
  const [selectedPlace, setSelectedPlace] = useState(null); // Cupo seleccionado
  const [formVisible, setFormVisible] = useState(false); // Controla la visibilidad del formulario

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
              place.ClinicFieldUnity.id === selectedUnit.value)
        )
      );
    } else {
      setFilteredPlaces([]); // No mostrar cupos si no se selecciona una fecha
    }
  }, [selectedDate, selectedInstitution, selectedUnit, places]);

  const handleAssign = (place) => {
    setSelectedPlace(place); // Configura el cupo seleccionado
    setDrawerVisible(true); // Abre el drawer
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPlace(null); // Limpia el cupo seleccionado
  };

  console.log('selectedUnit');
  console.log(selectedUnit.value);

  console.log('selectedPlace');
  console.log(selectedPlace);
  

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
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            places={places}
          />

          {/* Lista de Cupos */}
          <div className="col-span-2">
            <div className="col-span-1 mb-4">
              {selectedDate && (
                <div className="flex mb-4">
                  <h2 className="text-xl font-bold">Crear Cupo</h2>
                <button
                  onClick={() => setFormVisible(!formVisible)}
                  className=" px-4 rounded hover:bg-blue-100"
                >
                  {formVisible ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                </div>
              )}
              {formVisible && (
                <PlaceForm
                  selectedDate={selectedDate}
                  selectedUnit={selectedUnit.value}
                  onPlaceCreated={(newPlace) => getPlaces(user.university)}
                />
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-4">
                <ClipLoader color="#2563EB" loading={loading} size={50} />
              </div>
            ) : selectedDate ? (
              filteredPlaces.length > 0 ? (
                <ScheduleList
                  filteredPlaces={filteredPlaces}
                  handleAssign={handleAssign} // Llama a handleAssign para abrir el drawer
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

      {/* Drawer para mostrar estudiantes */}
      <StudentListDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        selectedPlace={selectedPlace}
        assignStudentToPlace={assignStudentToPlace}
        refreshPlaces={() => getPlaces(user.university)}
      />
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
