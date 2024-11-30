import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";

const FilterPanel = ({
  selectedDate,
  setSelectedDate,
  selectedInstitution,
  setSelectedInstitution,
  selectedUnit,
  setSelectedUnit,
  places,
}) => {
  // Lista única de instituciones extraídas de los cupos
  const institutions = [
    ...new Map(
      places.map((place) => [
        place.ClinicFieldUnity.ClinicFieldIntitution.id,
        {
          value: place.ClinicFieldUnity.ClinicFieldIntitution.id,
          label: place.ClinicFieldUnity.ClinicFieldIntitution.intitution_name,
        },
      ])
    ).values(),
  ];

  // Lista única de unidades filtradas por institución seleccionada
  const units = selectedInstitution
    ? [
        ...new Map(
          places
            .filter(
              (place) =>
                place.ClinicFieldUnity.ClinicFieldIntitution.id ===
                selectedInstitution.value
            )
            .map((place) => [
              place.ClinicFieldUnity.id,
              {
                value: place.ClinicFieldUnity.id,
                label: place.ClinicFieldUnity.ClinicFieldUnity_name,
              },
            ])
        ).values(),
      ]
    : [];

  // Filtrar los cupos según la unidad seleccionada
  const filteredPlaces =
    selectedInstitution && selectedUnit
      ? places.filter(
          (place) =>
            place.ClinicFieldUnity.ClinicFieldIntitution.id ===
              selectedInstitution.value &&
            place.ClinicFieldUnity.id === selectedUnit.value
        )
      : [];

  // Asignar clases a las fechas que tienen cupos disponibles
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const hasAvailablePlaces = filteredPlaces.some(
        (place) => place.date === dateStr && place.is_place_available
      );
      return hasAvailablePlaces ? "bg-green-200 text-green-900" : null;
    }
    return null;
  };

  return (
    <div className="col-span-1">
      {/* Selector de Instituciones */}
      <Select
        options={institutions}
        value={selectedInstitution}
        onChange={(institution) => {
          setSelectedInstitution(institution);
          setSelectedUnit(null); // Resetear la unidad al cambiar la institución
        }}
        placeholder="Filtrar por institución"
        isClearable
        className="mb-4"
      />

      {/* Selector de Unidades */}
      <Select
        options={units}
        value={selectedUnit}
        onChange={setSelectedUnit}
        placeholder="Filtrar por unidad"
        isClearable
        isDisabled={!selectedInstitution} // Deshabilitar hasta que se seleccione una institución
        className="mb-4"
      />

      {/* Calendario con fechas destacadas */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
        className="border rounded"
        tileDisabled={() => !selectedInstitution || !selectedUnit} // Deshabilitar días si no hay institución o unidad seleccionada
      />

      {/* Mensajes de estado */}
      {!selectedInstitution && (
        <p className="text-sm text-red-500 mt-2">
          Selecciona una institución para continuar.
        </p>
      )}
      {selectedInstitution && !selectedUnit && (
        <p className="text-sm text-red-500 mt-2">
          Selecciona una unidad para habilitar el calendario.
        </p>
      )}
    </div>
  );
};

export default FilterPanel;
