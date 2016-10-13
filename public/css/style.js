import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "textarea": {
        "height": 15 * vh,
        "width": "100%"
    },
    "rec": {
        "height": 23 * vh,
        "overflowY": "scroll !important"
    },
    "userRecipe": {
        "overflowY": "scroll !important"
    },
    "userGList": {
        "overflowY": "scroll !important"
    },
    "userFrid": {
        "overflowY": "scroll !important"
    },
    "sRecipes": {
        "overflowY": "scroll !important"
    },
    "createR": {
        "overflowY": "scroll !important"
    },
    "createS": {
        "overflowY": "scroll !important"
    },
    "createF": {
        "overflowY": "scroll !important"
    },
    "userStuff": {
        "height": "30vh !important"
    },
    "card": {
        "height": 45 * vh,
        "overflowY": "scroll"
    },
    "form": {
        "paddingTop": 3 * vh
    },
    "maxs": {
        "fontSize": 0.8
    },
    "area": {
        "height": 100 * vh,
        "width": 100 * vw
    },
    "pic": {
        "height": 100 * vh,
        "width": 100 * vw,
        "zIndex": -1,
        "position": "absolute"
    },
    "h1center-align": {
        "color": "#FAEBD7"
    },
    "putty": {
        "backgroundColor": "rgba(248, 248, 255, 0.5)"
    }
});