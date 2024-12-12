import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { GlobeSizeContext } from "../context/globeSizeContext";
import {
    Chart,
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const { state } = useContext(GlobeSizeContext);
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Cho phép thay đổi tỷ lệ
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Satellites In The Ground Station Coverage Area",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
            },
        },
    };

    return <Bar data={state.chart_data} options={options} className="chart" />;
};

export default BarChart;
