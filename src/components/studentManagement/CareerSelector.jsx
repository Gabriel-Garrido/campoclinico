import React from "react";

function CareerSelector({ careers, selectedCareer, setSelectedCareer }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="career-selector"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Carrera:
      </label>
      {careers && careers.length > 0 ? (
        <select
          id="career-selector"
          className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setSelectedCareer(e.target.value)}
          value={selectedCareer || ""}
        >
          <option value="">Seleccione una carrera</option>
          {careers.map((career) => (
            <option key={career.id} value={career.id}>
              {career.career_name}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-gray-500">No hay carreras disponibles.</p>
      )}
    </div>
  );
}

export default CareerSelector;
