import { createContext, useState, useEffect, useReducer } from "react";

const init_state = {
    showSideBar: window.innerWidth >= 1200 ? true : false,
    satellite_tles: [
        {
            tle0: "0 ISS (ZARYA)",
            tle1: "1 25544U 98067A   24337.69815449  .00018847  00000-0  33543-3 0  9994",
            tle2: "2 25544  51.6392 200.5348 0006936 293.3311 173.4353 15.50149230484682",
            tle_source: "Space-Track.org",
            sat_id: "XSKZ-5603-1870-9019-3066",
            norad_cat_id: 25544,
            updated: "2024-12-02T18:37:20.778062+0000",
        },
        {
            tle0: "NEMO-HD",
            tle1: "1 46277U 20061F   24337.52430901  .00015562  00000+0  52060-3 0  9992",
            tle2: "2 46277  97.2753  36.6103 0000187 150.0273 210.0980 15.31060848235651",
            tle_source: "Celestrak (SatNOGS)",
            sat_id: "RQZT-2978-8493-5026-5902",
            norad_cat_id: 46277,
            updated: "2024-12-02T16:37:30.650279+0000",
        },
        {
            tle0: "0 UPMSAT-2",
            tle1: "1 46276U 20061E   24336.86180815  .00046736  00000-0  96169-3 0  9999",
            tle2: "2 46276  97.2750  42.1438 0000440 183.3166 176.8081 15.45811691235962",
            tle_source: "Space-Track.org",
            sat_id: "UCSJ-1439-6113-9699-8457",
            norad_cat_id: 46276,
            updated: "2024-12-02T00:37:39.579587+0000",
        },
        {
            tle0: "ION-MK01",
            tle1: "1 46274U 20061C   24336.92187995  .00031183  00000+0  80660-3 0  9998",
            tle2: "2 46274  97.2768  38.6760 0003273 187.0589 173.0611 15.39025699235690",
            tle_source: "Celestrak (active)",
            sat_id: "GTBY-0816-3198-7674-7320",
            norad_cat_id: 46274,
            updated: "2024-12-02T04:37:33.083285+0000",
        },
        {
            tle0: "FLORIPASAT-1",
            tle1: "1 44885U 19093G   24337.40784220  .00012861  00000+0  11941-2 0  9992",
            tle2: "2 44885  97.8319  59.0594 0012240 115.8437 244.4047 14.94475117268451",
            tle_source: "Celestrak (SatNOGS)",
            sat_id: "ZAOV-7296-2730-4478-2104",
            norad_cat_id: 44885,
            updated: "2024-12-02T16:37:30.471576+0000",
        },
        {
            tle0: "METEOR-M2 2",
            tle1: "1 44387U 19038A   24337.50717517  .00000450  00000+0  21558-3 0  9991",
            tle2: "2 44387  98.8509 307.6016 0001283 147.5828 212.5429 14.24079116281347",
            tle_source: "Celestrak (SatNOGS)",
            sat_id: "DNDH-4105-0956-2682-2917",
            norad_cat_id: 44387,
            updated: "2024-12-02T16:37:30.215207+0000",
        },
        {
            tle0: "0 D-STAR ONE SPARROW",
            tle1: "1 43881U 18111F   24336.98054517  .00031395  00000-0  14651-2 0  9993",
            tle2: "2 43881  97.6180 244.8865 0008509 162.7803 197.3721 15.19749773322889",
            tle_source: "Space-Track.org",
            sat_id: "QTXY-8933-7836-7484-6250",
            norad_cat_id: 43881,
            updated: "2024-12-02T08:37:30.024876+0000",
        },
    ],
};

function reducer(state, action) {
    switch (action.type) {
        case "toggle_sidebar":
            return { ...state, showSideBar: !state.showSideBar };
        default:
            throw new Error("Unknown action type!");
    }
}
const calcGlobeSize = (windowWidth, windowHeight) => {
    if (windowWidth >= 1200) {
        return {
            width: windowWidth - 286 - 540,
            height: windowHeight * 0.6,
        };
    } else if (windowWidth >= 700) {
        return {
            width: windowWidth - 286 - 80,
            height: windowHeight * 0.8,
        };
    }
    return {
        width: windowWidth - 40,
        height: windowHeight * 0.4,
    };
};

export const GlobeSizeContext = createContext();

export const GlobeSizeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, init_state);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [globeSize, setGlobeSize] = useState(
        calcGlobeSize(window.innerWidth, window.innerHeight)
    );
    const [contentMargin, setContentMargin] = useState(
        state.showSideBar && window.innerWidth >= 1200
            ? 266
            : window.innerWidth < 1200
            ? 0
            : 40
    );

    const handleResize = () => {
        setGlobeSize(calcGlobeSize(window.innerWidth, window.innerHeight));
        setWindowSize(window.innerWidth);
        setContentMargin(
            state.showSideBar && window.innerWidth >= 1200
                ? 266
                : window.innerWidth < 1200
                ? 0
                : 40
        );
    };

    // effect hooks
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <GlobeSizeContext.Provider
            value={{ windowSize, globeSize, contentMargin, state, dispatch }}
        >
            {children}
        </GlobeSizeContext.Provider>
    );
};
