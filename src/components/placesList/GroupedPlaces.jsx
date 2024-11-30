import React from "react";

const GroupedPlaces = ({ timeRange, places, handleAssign }) => (
  <div className="p-4 border rounded-lg shadow">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Horario: {timeRange}
    </h2>
    <ul className="space-y-4">
      {places.map((place) => (
        <li
          key={place.id}
          className={`p-4 border rounded-lg shadow ${
            place.is_place_available ? "bg-green-100" : "bg-red-100"
          }`}
        >
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
);

export default GroupedPlaces;
