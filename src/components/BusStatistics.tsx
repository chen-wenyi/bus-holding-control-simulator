'use client';

import { useSimStore } from "@/store/useSimStore";

const BusStatistics = () => {
    const busStatistics = useSimStore((state) => state.busStatistics);
    const busesOnRoad = useSimStore((state) => state.busOperation.busesOnRoad);
    const passengerCapacity = useSimStore((state) => state.busOperation.passengerCapacity);

    if (!Array.isArray(busesOnRoad)) {
        console.warn("busesOnRoad 数据异常:", busesOnRoad);
        return null;
    }

    const totalPassengersOnRoad = busesOnRoad.reduce((acc, bus) => {
        if (!Array.isArray(bus.value)) return acc;
    
        const busPassengers = bus.value.reduce((sum, stop) => {
            if (Array.isArray(stop.occupancy) && stop.occupancy.length === 2) {
                return sum + stop.occupancy[1];
            }
            return sum;
        }, 0);
    
        return acc + busPassengers;
    }, 0);
    

    const avgOccupancy =
        busStatistics.totalBusesOperated > 0
            ? busStatistics.totalPassengers / busStatistics.totalBusesOperated
            : 0;

      const avgWaitingTime =
      busStatistics.totalPassengers > 0
        ? busStatistics.totalWaitingTime / busStatistics.totalPassengers
        : 0;

    const avgTravelTime =
      busStatistics.totalPassengers > 0
        ? busStatistics.totalTravelTime / busStatistics.totalPassengers
        : 0;

    const avgHoldingTime =
      busStatistics.totalBusesOperated > 0
        ? busStatistics.totalHoldingTime / busStatistics.totalBusesOperated
        : 0;

    console.log("🚀 Debug:", {
        totalPassengersOnRoad,
        busesOnRoadLength: busesOnRoad.length,
        avgOccupancy
    });

    return (
      <div className="text-sm">
        <div className="grid grid-cols-[1.5fr_1fr] gap-1">
          <div className="whitespace-nowrap">Average Waiting:</div>
          <div className="text-left">{avgWaitingTime.toFixed(2)} min</div>
  
          <div className="whitespace-nowrap">Average Travel:</div>
          <div className="text-left">{avgTravelTime.toFixed(2)} min</div>
  
          <div className="whitespace-nowrap">Average Holding:</div>
          <div className="text-left">{avgHoldingTime.toFixed(2)} min</div>
  
          <div className="whitespace-nowrap">Average Occupancy:</div>
          <div className="text-left">{avgOccupancy.toFixed(2)}</div>
        </div>
  
        <div className="mt-1">
          <div className="whitespace-nowrap">
            Total Number of Bunching: {busStatistics.totalBunching}
          </div>
        </div>
      </div>
    );
};

export default BusStatistics;
