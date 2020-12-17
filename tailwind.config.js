const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                lightBlue: colors.lightBlue,
                blueGray: colors.blueGray,
            },
            fontFamily: {
                display: ["Cinzel\\ Decorative", "cursive"],
            },
            minHeight: {
                0: "0px",
                0.5: "0.125rem",
                1: "0.25rem",
                1.5: "0.375rem",
                2: "0.5rem",
                2.5: "0.625rem",
                3: "0.75rem",
                3.5: "0.875rem",
                4: "1rem",
                5: "1.25rem",
                6: "1.5rem",
                7: "1.75rem",
                8: "2rem",
                9: "2.25rem",
                10: "2.5rem",
                11: "2.75rem",
                12: "3rem",
                14: "3.5rem",
                16: "4rem",
                20: "5rem",
                24: "6rem",
                28: "7rem",
                32: "8rem",
                36: "9rem",
                40: "10rem",
            },
        },
        // colors: {
        //   gray: colors.trueGray,
        //   indigo: colors.indigo,
        //   red: colors.rose,
        //   yellow: colors.amber,
        //   lightblue: colors.lightBlue,
        // }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
