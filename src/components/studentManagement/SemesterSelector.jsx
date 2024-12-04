import React from "react";

function SemesterSelector({ semesters, selectedSemester, setSelectedSemester, disabled }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="semester-selector"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Semestre:
      </label>
      {semesters && semesters.length > 0 ? (
        <select
          id="semester-selector"
          className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setSelectedSemester(e.target.value)}
          value={selectedSemester || ""}
          disabled={disabled}
        >
          <option value="">Seleccione un semestre</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.semester_number}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-gray-500">No hay semestres disponibles.</p>
      )}
    </div>
  );
}

export default SemesterSelector;
