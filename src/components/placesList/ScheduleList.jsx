import React from "react";
import GroupedPlaces from "./GroupedPlaces";

const ScheduleList = ({ filteredPlaces, handleAssign }) => {
  const groupPlacesByTimeRange = () => {
    const grouped = {};
    filteredPlaces.forEach((place) => {
      const timeRange = `${place.start_time} - ${place.end_time}`;
      if (!grouped[timeRange]) {
        grouped[timeRange] = [];
      }
      grouped[timeRange].push(place);
    });
    return grouped;
  };

  const groupedPlaces = groupPlacesByTimeRange();

  return Object.keys(groupedPlaces).length > 0 ? (
    <div className="space-y-6">
      {Object.keys(groupedPlaces).map((timeRange) => (
        <GroupedPlaces
          key={timeRange}
          timeRange={timeRange}
          places={groupedPlaces[timeRange]}
          handleAssign={handleAssign}
        />
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No hay cupos disponibles para los filtros seleccionados.
    </p>
  );
};

export default ScheduleList;
