import * as THREE from 'three';
import { changeSkyBoxTexture } from "../models/environment";
import { updateCrosshairLength, updateCrosshairColor } from '../models/crosshair';

/**
 * Settings for gameplay
 */
enum SkyboxTexture {
    Space = "space",
    Black = "black"
};

export type CrosshairRGBColor = {
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
const selectSkyList = document.getElementById('sky') as HTMLSelectElement;
const sensitivitySlider = document.getElementById('sensitivity') as HTMLInputElement;
const crosshairLengthSlider = document.getElementById('crosshair-length') as HTMLInputElement;
const soundsOn = document.getElementById('sounds') as HTMLInputElement;

// crosshair color
const crosshairRed = document.getElementById('crosshair-red') as HTMLInputElement;
const crosshairGreen = document.getElementById('crosshair-green') as HTMLInputElement;
const crosshairBlue = document.getElementById('crosshair-blue') as HTMLInputElement;

closeSettingsButton.addEventListener('click', saveSettingsToLocalStorage);
sensitivitySlider.addEventListener('change', changeSensitivityValue);
crosshairLengthSlider.addEventListener('change', changeCrosshairLength);
soundsOn.addEventListener('change', changeWhetherSoundsAreOnOrOff);
selectSkyList.addEventListener('change', changeSkyValue);

crosshairRed.addEventListener('change', changeCrosshairColor);
crosshairGreen.addEventListener('change', changeCrosshairColor);
crosshairBlue.addEventListener('change', changeCrosshairColor);

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

function changeWhetherSoundsAreOnOrOff() {
    if (soundsOn.checked) {
        currentSettings.sounds = true;
    } else {currentSettings.sounds = false}
};

function changeCrosshairColor(event: any) {
    let newValue = parseInt(event.target.value);
    console.log("moro");
    switch(event.target.id) {
        case('crosshair-red'):
            currentSettings.crosshairColor.r = newValue;
            break;
        case('crosshair-green'):
            currentSettings.crosshairColor.g = newValue;
            break;
        case('crosshair-blue'):
            currentSettings.crosshairColor.b = newValue;
            break;
    }
    updateCrosshairColor(currentSettings.crosshairColor);
};

function changeCrosshairLength() {
    const newLength = parseFloat(crosshairLengthSlider.value);
    console.log(newLength);
    currentSettings.crosshairLength = newLength;
    updateCrosshairLength(currentSettings.crosshairLength);
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

// default settings
let currentSettings = {
    sensitivity: 0.5,
    sounds: true,
    skyboxTextures: SkyboxTexture.Space,
    crosshairColor: {r: 255, g: 255, b: 0},
    hitsounds: true,
    crosshairLength: 0.2,
    hiscore: 0
};

// First try to get previous settings from local storage

function checkForSettingsInLocalStorage() {
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
            selectSkyList.value = currentSettings.skyboxTextures;
            updateCrosshairLength(currentSettings.crosshairLength);
            crosshairLengthSlider.value = currentSettings.crosshairLength.toString();
            soundsOn.checked = currentSettings.sounds ? true : false;
            console.log(currentSettings)
        } else { throw Error }
    } catch (err){
        console.log("ERROR ERROR", err)
        // if no settings found setup backup
        
    }
}



export { currentSettings, SkyboxTexture, checkForSettingsInLocalStorage }
