import { createContext, useState, useEffect, useReducer } from "react";

const init_state = {
    showSideBar: window.innerWidth >= 1200 ? true : false,
    satellite_tles: {},
    chart_data: {
        labels: ["10:32", "10:33", "10:34", "10:35", "10:36", "10:37"],
        datasets: [
            {
                label: "Number of satellite in coverage",
                data: [1, 3, 5, 3, 4, 2],
                backgroundColor: "rgba(40, 44, 52, 0.7)",
                borderColor: "rgba(40, 44, 52, 1)",
                borderWidth: 1,
            },
        ],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "toggle_sidebar":
            return { ...state, showSideBar: !state.showSideBar };
        case "add_data":
            return {
                ...state,
                chart_data: {
                    labels: [
                        ...state.chart_data.labels.slice(1),
                        action.payload.time,
                    ],
                    datasets: [
                        {
                            ...state.chart_data.datasets[0],
                            data: [
                                ...state.chart_data.datasets[0].data.slice(1),
                                action.payload.num,
                            ],
                        },
                    ],
                },
            };

        case "ADD_TLES":
            return {
                ...state,
                satellite_tles: {
                    ...state.satellite_tles,
                    ...action.payload,
                },
            };

        default:
            throw new Error("Unknown action type!");
    }
}
const calcGlobeSize = (windowWidth, windowHeight) => {
    if (windowWidth >= 1200) {
        return {
            width: windowWidth - 246 - 80 - 540,
            height: windowHeight * 0.5,
        };
    } else if (windowWidth >= 700) {
        return {
            width: windowWidth - 246 - 80,
            height: windowHeight * 0.8,
        };
    }
    return {
        width: windowWidth - 40,
        height: windowHeight * 0.4,
    };
};

const calcTlesHeight = (width, height) => {
    if (width >= 1200) {
        return height - 60 - 120;
    }

    return height;
};

export const GlobeSizeContext = createContext();

export const GlobeSizeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, init_state);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [globeSize, setGlobeSize] = useState(
        calcGlobeSize(window.innerWidth, window.innerHeight)
    );
    const [tlesSize, setTlesSize] = useState(
        calcTlesHeight(window.innerWidth, window.innerHeight)
    );
    const [contentMargin, setContentMargin] = useState(
        state.showSideBar && window.innerWidth >= 1200
            ? 246
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
        setTlesSize(window.innerWidth, window.innerHeight);
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
            value={{
                windowSize,
                globeSize,
                contentMargin,
                state,
                dispatch,
                tlesSize,
            }}
        >
            {children}
        </GlobeSizeContext.Provider>
    );
};
