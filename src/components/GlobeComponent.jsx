import React, { useEffect, useRef, useContext } from "react";
import Globe from "globe.gl";
// import * as satellite from "satellite.js";
import { GlobeSizeContext } from "../context/globeSizeContext";

const GlobeComponent = () => {
    const globeRef = useRef(null);
    const { globeSize, windowSize } = useContext(GlobeSizeContext);

    const generateCircle = (centerLat, centerLng, radiusKm, segments = 64) => {
        const points = [];
        const EarthRadius = 6371; // km
        const angularDistance = radiusKm / EarthRadius;

        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2; // Chia đều các góc
            const lat = Math.asin(
                Math.sin(centerLat * (Math.PI / 180)) *
                    Math.cos(angularDistance) +
                    Math.cos(centerLat * (Math.PI / 180)) *
                        Math.sin(angularDistance) *
                        Math.cos(angle)
            );
            const lng =
                centerLng * (Math.PI / 180) +
                Math.atan2(
                    Math.sin(angle) *
                        Math.sin(angularDistance) *
                        Math.cos(centerLat * (Math.PI / 180)),
                    Math.cos(angularDistance) -
                        Math.sin(centerLat * (Math.PI / 180)) * Math.sin(lat)
                );
            points.push([lng * (180 / Math.PI), lat * (180 / Math.PI)]);
        }
        return points;
    };

    useEffect(() => {
        const globe = Globe()(globeRef.current)
            .globeImageUrl(
                "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            ) // Earth map
            .bumpImageUrl(
                "//unpkg.com/three-globe/example/img/earth-topology.png"
            )
            .backgroundColor("#282c34") // Background color
            .showAtmosphere(true) // Display atmosphere
            // .atmosphereColor("#3a228a") // Atmosphere color
            .atmosphereColor("#ffffff4d")
            .atmosphereAltitude(0.2) // Atmosphere altitude
            .width(globeSize.width)
            .height(globeSize.height);

        // Locations
        const locations = [
            {
                lat: 21.0285,
                lng: 105.8542,
                size: 0.1,
                color: "red",
                label: "Hanoi",
            }, // Hà Nội
        ];

        // Display coverage
        globe
            .pointsData(locations)
            .pointLat((d) => d.lat)
            .pointLng((d) => d.lng)
            .pointColor((d) => d.color)
            .pointRadius((d) => d.size)
            .pointLabel((d) => d.label)
            .pointLabel(
                (d) => `
            <div style="color: ${d.color}; background: white; padding: 2px 5px; border-radius: 3px;">
              ${d.label}
            </div>
          `
            );
        // Coverage radius
        const radiusKm = 1000; // 1000Km

        // Generate circle
        const circlePoints = generateCircle(
            locations[0].lat,
            locations[0].lng,
            radiusKm
        );

        // Create GeoJSON
        const geoJsonData = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [circlePoints],
                    },
                    properties: {
                        name: "Circle around Hanoi",
                    },
                },
            ],
        };

        // Thêm vòng tròn vào Globe
        globe
            .polygonsData(geoJsonData.features)
            .polygonCapColor(() => "rgba(200, 0, 0, 0.3)") // Màu trong suốt
            .polygonSideColor(() => "rgba(255, 100, 100, 0.5)") // Màu cạnh
            .polygonStrokeColor(() => "rgba(255, 0, 0, 1)") // Màu viền
            .polygonAltitude(() => 0.05); // Độ cao của polygon

        // Cleanup function
        return () => {
            globeRef.current.innerHTML = ""; // Xóa nội dung globe
        };
    }, [globeSize]);

    return (
        <div
            ref={globeRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            className="earth"
        ></div>
    );
};

export default GlobeComponent;
