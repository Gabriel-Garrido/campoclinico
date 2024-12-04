import React from "react";

function StudentTable({ students }) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border border-gray-300 text-left">Nombre</th>
          <th className="px-4 py-2 border border-gray-300 text-left">Apellido</th>
          <th className="px-4 py-2 border border-gray-300 text-left">RUT</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr
            key={student.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-4 py-2 border border-gray-300">{student.name}</td>
            <td className="px-4 py-2 border border-gray-300">{student.last_name}</td>
            <td className="px-4 py-2 border border-gray-300">{student.rut}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
