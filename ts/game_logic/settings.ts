import * as THREE from 'three';
import { changeSkyBoxTexture } from "../models/environment";

/**
 * Settings for gameplay
 */
enum SkyboxTexture {
    Space = "space",
    Black = "black"
};

type CrosshairRGBColor = {
    r: number;
    g: number;
    b: number
}

interface Settings {
    sensitivity: number,
    sounds: boolean,
    skyboxTextures: SkyboxTexture,
    crosshairColor: CrosshairRGBColor,
    crosshairLength: number;
    hitsounds: boolean,
    hiscore: number
};
const closeSettingsButton = document.getElementById('saveSettings') as HTMLElement;

closeSettingsButton.addEventListener('click', saveSettingsToLocalStorage);

const selectSkyList = document.getElementById('sky') as HTMLSelectElement;
const sensitivitySlider = document.getElementById('sensitivity') as HTMLInputElement;

sensitivitySlider.addEventListener('change', changeSensitivityValue);
selectSkyList.addEventListener('change', changeSkyValue);

export function saveSettingsToLocalStorage() {
    console.log("MORO")
    const currentSettingsString = JSON.stringify(currentSettings);
    console.log(currentSettingsString);
    localStorage.setItem('AimplifySettings', currentSettingsString);
};

function changeSensitivityValue() {
    const newSensitivity = parseFloat(sensitivitySlider.value);
    currentSettings.sensitivity = newSensitivity;
};

function changeSkyValue() {
    const selectedSky = selectSkyList.value;
    switch(selectedSky) {
        case "space":
            currentSettings.skyboxTextures = SkyboxTexture.Space;
            changeSkyBoxTexture(currentSettings.skyboxTextures);
            break;
        case "black":
            currentSettings.skyboxTextures = SkyboxTexture.Black;
            changeSkyBoxTexture(currentSettings.skyboxTextures);
            break;
    }
};

let currentSettings : Settings;

// First try to get previous settings from local storage

try {
    const storedSettingsString = localStorage.getItem('AimplifySettings');
    if (storedSettingsString) {
        const foundSettings = JSON.parse(storedSettingsString);
        console.log("found settings", foundSettings.skyboxTextures)
        currentSettings = {
            sensitivity: foundSettings.sensitivity,
            sounds: foundSettings.sounds,
            skyboxTextures: foundSettings.skyboxTextures,
            crosshairColor: foundSettings.crosshairColor,
            hitsounds: foundSettings.hitsounds,
            crosshairLength: foundSettings.crosshairLength,
            hiscore: foundSettings.hiscore
        };
        changeSkyBoxTexture(currentSettings.skyboxTextures);
        console.log(currentSettings.sensitivity.toString());
        sensitivitySlider.value = currentSettings.sensitivity.toString();
    } else { throw Error }
} catch (err){
    console.log("ERROR ERROR", err)
    // if no settings found setup backup
    currentSettings = {
        sensitivity: 0.5,
        sounds: true,
        skyboxTextures: SkyboxTexture.Space,
        crosshairColor: {r: 255, g: 255, b: 0},
        hitsounds: true,
        crosshairLength: 0.2,
        hiscore: 0
    };
}

export {currentSettings, SkyboxTexture}
