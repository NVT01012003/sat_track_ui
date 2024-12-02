import { createContext, useState, useEffect, useReducer } from "react";

const init_state = {};

function reducer(state, action) {
    switch (action.type) {
        case "sidebar_switch":
            return { ...state, showSideBar: !state.showSideBar };
        default:
            throw new Error("Unknown action type");
    }
}

const calcGlobeSize = (windowWidth, windowHeight) => {
    if (windowWidth >= 1200) {
        return {
            width: windowWidth - 286 - 340,
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
    const [state, dispatch] = useReducer(reducer, {
        showSideBar: window.innerWidth >= 1200 ? true : false,
    });
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [globeSize, setGlobeSize] = useState(
        calcGlobeSize(window.innerWidth, window.innerHeight)
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
                ? 246
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
