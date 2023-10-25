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

const selectSkyList = document.getElementById('sky') as HTMLSelectElement;
const sensitivitySlider = document.getElementById('sensitivity') as HTMLInputElement;

sensitivitySlider.addEventListener('change', changeSensitivityValue);
selectSkyList.addEventListener('change', changeSkyValue);

export function saveSettingsToLocalStorage() {
    localStorage.setItem('AimplifySettings', JSON.stringify(currentSettings));
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
        currentSettings = JSON.parse(storedSettingsString);
    } else { throw Error }
} catch {
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
