import React, { useState } from "react";

function CreateStudentForm({ selectedCareer, selectedSemester, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    second_last_name: "",
    rut: "",
    phone: "",
    email: "",
    emergency_name: "",
    emergency_number: "",
    student_address: "",
    observation: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // Controla la visibilidad del formulario

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCareer && selectedSemester) {
      const studentData = {
        ...formData,
        career: Number(selectedCareer),
        semester: Number(selectedSemester),
      };
      onCreate(studentData);
      setFormData({
        name: "",
        last_name: "",
        second_last_name: "",
        rut: "",
        phone: "",
        email: "",
        emergency_name: "",
        emergency_number: "",
        student_address: "",
        observation: "",
      });
      setIsFormVisible(false); // Oculta el formulario después de enviar los datos
    } else {
      alert("Por favor selecciona una carrera y un semestre.");
    }
  };

  return (
    <div>
      {/* Botón para mostrar/ocultar el formulario */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        {isFormVisible ? "Ocultar Formulario" : "Agregar Estudiante"}
      </button>

      {/* Formulario visible solo si isFormVisible es true */}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 bg-gray-100 p-4 rounded shadow-md space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-700">Agregar Estudiante</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="second_last_name"
              placeholder="Segundo Apellido"
              value={formData.second_last_name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="rut"
              placeholder="RUT"
              value={formData.rut}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="emergency_name"
              placeholder="Nombre de Contacto de Emergencia"
              value={formData.emergency_name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="emergency_number"
              placeholder="Teléfono de Emergencia"
              value={formData.emergency_number}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <input
            type="text"
            name="student_address"
            placeholder="Dirección"
            value={formData.student_address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            name="observation"
            placeholder="Observaciones"
            value={formData.observation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-300"
          >
            Guardar Estudiante
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateStudentForm;
