function PlaceItem({ place, handleAssign }) {
    const {
      id,
      date,
      start_time,
      end_time,
      is_place_available,
      student,
      ClinicFieldUnity,
      subject,
    } = place;
  
    return (
      <li
        className={`p-4 border rounded-lg shadow ${
          is_place_available ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <p className="text-lg font-medium">
          Fecha: {date} | Horario: {start_time} - {end_time}
        </p>
        <p className="text-gray-600">
          {is_place_available
            ? "Cupo disponible"
            : `Ocupado por: ${student?.name} ${student?.last_name}`}
        </p>
        <p className="text-sm text-gray-500">
          Unidad: {ClinicFieldUnity?.ClinicFieldUnity_name} | Materia:{" "}
          {subject?.subject_name}
        </p>
        {!is_place_available && (
          <p className="text-sm text-gray-400">Observaciones: {place.observation}</p>
        )}
        {is_place_available && (
          <button
            onClick={() => handleAssign(id)}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Asignar estudiante
          </button>
        )}
      </li>
    );
  }
  
  export default PlaceItem;
  