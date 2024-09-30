'use client'
const { extendTheme } = require("@chakra-ui/react");
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'



export const theme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                color: 'gray.200',
                bg: mode('white', 'gray.800')(props),
                lineHeight: 'base',
                minHeight: '100vh',
            },
        }),
    },
    colors: {
        transparent: 'transparent',
        light: {
            "50": "#0f0f0f",
            "100": "#0f0f0f",
            "200": "#0f0f0f",
            "300": "#0f0f0f",
            "400": "#0f0f0f",
            "500": "#f7f7f7",
            "600": "#dedede",
            "700": "#c4c4c4",
            "800": "#00838F",
            "900": "#006064",
        },
        dark: {
            "50": "#0f0f0f",
            "100": "#0f0f0f",
            "200": "#0f0f0f",
            "300": "#0f0f0f",
            "400": "#0f0f0f",
            "500": "#0f0f0f",
            "600": "#292929",
            "700": "#424242",
            "800": "#00838F",
            "900": "#006064",
        },
        primary: {
            "50": "#E0F7FA",
            "100": "#B2EBF2",
            "200": "#80DEEA",
            "300": "#4DD0E1",
            "400": "#26C6DA",
            "500": "#00BCD4",
            "600": "#00ACC1",
            "700": "#0097A7",
            "800": "#00838F",
            "900": "#006064",
        },
        secondary: {
            "50": "#F8BBD0",
            "100": "#F48FB1",
            "200": "#F06292",
            "300": "#EC407A",
            "400": "#E91E63",
            "500": "#D81B60",
            "600": "#C2185B",
            "700": "#AD1457",
            "800": "#880E4F",
            "900": "#BF360C",
        },
        error: {
            "50": "#FFEBEE",
            "100": "#FFCDD2",
            "200": "#EF9A9A",
            "300": "#E57373",
            "400": "#EF5350",
            "500": "#F44336",
            "600": "#E53935",
            "700": "#D32F2F",
            "800": "#C62828",
            "900": "#B71C1C",
        },
        success: {
            "50": "#E8F5E9",
            "100": "#C8E6C9",
            "200": "#A5D6A7",
            "300": "#81C784",
            "400": "#66BB6A",
            "500": "#4CAF50",
            "600": "#43A047",
            "700": "#388E3C",
            "800": "#2E7D32",
            "900": "#1B5E20",
        },
        gray: {
            "50": "#FAFAFA",
            "100": "#F5F5F5",
            "200": "#EEEEEE",
            "300": "#E0E0E0",
            "400": "#BDBDBD",
            "500": "#9E9E9E",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
        },
        purple: {
            "400": "#5b02c7",
            "500": "#4f02ad",
            "600": "#440194",
        },
        plum: {
            "400": "#f7b2f7",
            "500": "#DDA0DD",
            "600": "#c48dc4",
        }
        // ...
    },
    components: {
        Button: {
            variants: {
                link: {
                    color: "doenet.mainBlue",
                    textDecoration: 'none',
                    fontWeight: '400',
                    _hover: {
                        textDecoration: 'none'
                    }
                }
            }
        },
        // {
        //     _hover: {
        //         bg: 'blue',

        //     },
        //     variants: {
        //         'dark-shadow': {
        //             bg: 'black',
        //             hover: 'red',
        //             _hover: 'red'
        //         },
        //         'primary-shadow': {
        //             bg: 'yellow.500',
        //         },
        //         // 4. We can override existing variants
        //         solid: (props: StyleFunctionProps) => ({
        //             bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        //         }),
        //         // 5. We can add responsive variants
        //         sm: {
        //             bg: 'blue.500',
        //             fontSize: 'md',
        //         },
        //     },
        //     defaultProps: {
        //         size: 'md',
        //         variant: 'solid',
        //     },
        // },
    },
});

// components: {
//     Button: {
//         baseStyle: {
//             fontWeight: "normal",
//                 letterSpacing: ".5px",
//                     _focus: {
//                 outline: "2px solid #2D5994",
//                     outlineOffset: "2px"
//             },
//             _disabled: {
//                 bg: "#E2E2E2",
//                     color: "black"
//             }
//         },
//         variants: {
//             // We can override existing variants
//             solid: {
//                 bg: "doenet.mainBlue",
//                     color: "white",
//                         _hover: {
//                     bg: "doenet.solidLightBlue",
//                         color: "black",
//                             _disabled: { bg: "doenet.mainGrey" }
//                 }
//             },
//             outline: {
//                 borderColor: "#2D5994",
//                     _hover: {
//                     bg: "doenet.solidLightBlue",
//                         _disabled: { bg: "#E2E2E2" }
//                 }
//             },
//             ghost: {
//                 _hover: {
//                     bg: "doenet.solidLightBlue",
//                         _disabled: { bg: "#E2E2E2" }
//                 }
//             },
//             link: {
//                 color: "doenet.mainBlue"
//                 // _disabled: { bg: "white" }
//             }
//         }
//     }
// }