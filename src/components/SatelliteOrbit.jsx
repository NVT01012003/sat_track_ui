import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
// import * as satellite from "satellite.js";

const SatelliteOrbit = () => {
    const globeRef = useRef(null);

    useEffect(() => {
        const globe = Globe()(globeRef.current)
            .globeImageUrl(
                "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            )
            .bumpImageUrl(
                "//unpkg.com/three-globe/example/img/earth-topology.png"
            )
            .backgroundColor("#fff")
            .showAtmosphere(true)
            .atmosphereColor("#3a228a")
            .atmosphereAltitude(0.2);

        globe
            .pointsData(
                [...Array(50).keys()].map(() => ({
                    lat: (Math.random() - 0.5) * 180,
                    lng: (Math.random() - 0.5) * 360,
                    size: Math.random() * 10,
                }))
            ) // Tạo các điểm ngẫu nhiên
            .pointAltitude("size") // Độ cao
            .pointColor(() => "red"); // Màu điểm

        return () => {
            globeRef.current.innerHTML = ""; // Cleanup on unmount
        };
    }, []);

    return <div ref={globeRef}></div>;
};

export default SatelliteOrbit;
