import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPlace } from "redux/actions/places/places"; // Asegúrate de que la ruta sea correcta
import axios from "axios";

const PlaceForm = ({ createPlace, onPlaceCreated, selectedDate, selectedUnit, user }) => {
  const [formData, setFormData] = useState({
    teacher_name: "",
    start_time: "",
    end_time: "",
    is_place_available: true,
    observation: "",
    subject: null,
  });

  const [subjects, setSubjects] = useState([]); // Lista de asignaturas disponibles
  const [loadingSubjects, setLoadingSubjects] = useState(false); // Estado de carga para asignaturas
  const [error, setError] = useState(null); // Manejo de errores

  const fetchSubjects = async (user, setLoadingSubjects, setSubjects, setError) => {
    if (user?.university) {
      setLoadingSubjects(true);
      try {
        // Ajusta la URL para que coincida con la ruta correcta
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/campoclinico/subjects_by_university/${user.university}/`
        );
        const subjectsData = response.data.subjects || [];
        setSubjects(subjectsData);
        setError(null);
        console.log("Asignaturas cargadas:", subjectsData);
      } catch (err) {
        console.error("Error al obtener las asignaturas:", err);
        setError("No se pudieron cargar las asignaturas.");
      } finally {
        setLoadingSubjects(false);
      }
    } else {
      setError("El usuario no tiene una universidad asociada.");
    }
  };

  useEffect(() => {
    fetchSubjects(user, setLoadingSubjects, setSubjects, setError);
    console.log("user en placeform:", user);
  }, []); // Ejecutar cuando `user` cambie

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!selectedDate) return "Debe seleccionar una fecha.";
    if (!selectedUnit) return "Debe seleccionar una unidad.";
    if (!formData.subject) return "Debe seleccionar una asignatura.";
    if (!formData.teacher_name) return "El nombre del profesor es obligatorio.";
    if (!formData.start_time) return "La hora de inicio es obligatoria.";
    if (!formData.end_time) return "La hora de término es obligatoria.";
    if (formData.start_time >= formData.end_time) {
      return "La hora de inicio debe ser anterior a la hora de término.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    if (!selectedUnit || !selectedUnit) {
      setError("Debe seleccionar una unidad válida.");
      return;
    }
  
    try {
      const newPlace = {
        ...formData,
        subject: Number(formData.subject), // Convertir subject a número
        date: selectedDate.toISOString().split("T")[0],
        ClinicFieldUnity: Number(selectedUnit), // Convertir selectedUnit a número
      };
  
      console.log("Datos enviados a la API:", newPlace);
  
      const createdPlace = await createPlace(newPlace);
      onPlaceCreated(createdPlace);
  
      // Resetear formulario después de crear el cupo
      setFormData({
        teacher_name: "",
        start_time: "",
        end_time: "",
        is_place_available: true,
        observation: "",
        subject: null,
      });
      setError(null);
    } catch (error) {
      console.error("Error al crear el cupo:", error);
      setError("Hubo un error al intentar crear el cupo. Por favor, inténtelo nuevamente.");
    }
  };
  

  console.log('selectedUnit.value en form');
  console.log(selectedUnit);
  
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      {/* Lista desplegable de asignaturas */}
      <select
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      >
        <option value="">Seleccione una asignatura</option>
        {loadingSubjects ? (
          <option disabled>Cargando asignaturas...</option>
        ) : (
          subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.subject_name}
            </option>
          ))
        )}
      </select>

      <input
        type="text"
        name="teacher_name"
        placeholder="Nombre del Profesor"
        value={formData.teacher_name}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="time"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="time"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <textarea
        name="observation"
        placeholder="Observaciones"
        value={formData.observation}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          !selectedDate || !selectedUnit || !formData.subject
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-700"
        }`}
        disabled={!selectedDate || !selectedUnit || !formData.subject}
      >
        Crear Cupo
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user || null,
});

export default connect(mapStateToProps, { createPlace })(PlaceForm);
