'use client';

import { useSimStore } from "@/store/useSimStore";

const BusStatistics = () => {
    const busStatistics = useSimStore((state) => state.busStatistics);

    return (
        <div className="text-sm">
            <div className="grid grid-cols-[1.5fr_1fr] gap-1">
                <div className="whitespace-nowrap">Avg Waiting Time:</div>
                <div className="text-left">{busStatistics.avgWaitingTime.toFixed(2)} min</div>

                <div className="whitespace-nowrap">Avg Passenger Travel:</div>
                <div className="text-left">{busStatistics.avgTravelTime.toFixed(2)} min</div>

                <div className="whitespace-nowrap">Avg Bus Travel Time:</div>
                <div className="text-left">{busStatistics.avgBusTravelTime.toFixed(2)} min</div>

                <div className="whitespace-nowrap">Avg Holding Time:</div>
                <div className="text-left">{busStatistics.avgHoldingTime.toFixed(2)} min</div>

                <div className="whitespace-nowrap">Avg Bus Occupancy:</div>
                <div className="text-left">{busStatistics.avgOccupancy.toFixed(2)}%</div>
            </div>

            <div>
                <div className="whitespace-nowrap pt-1">
                    Total Number of Bunching:
                     {busStatistics.totalBunching}
                </div>
            </div>
        </div>
    );
};

export default BusStatistics;