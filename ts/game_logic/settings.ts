import { changeSkyBoxTexture } from "../models/environment";

enum SkyboxTexture {
    Space = "space",
    Black = "black"
};

interface Settings {
    sensitivity: number,
    sounds: boolean,
    skyboxTextures: SkyboxTexture,
    crosshairColor: string,
    hitsounds: boolean,
};

const selectSkyList = document.getElementById('sky') as HTMLSelectElement;
const sensitivitySlider = document.getElementById('sensitivity') as HTMLInputElement;

sensitivitySlider.addEventListener('change', changeSensitivityValue);
selectSkyList.addEventListener('change', changeSkyValue);

function changeSensitivityValue() {
    
    const newSensitivity = parseFloat(sensitivitySlider.value);
    currentSettings.sensitivity = newSensitivity;
}

function changeSkyValue() {
    console.log("Moroo")
    const selectedSky = selectSkyList.value;
    console.log(selectedSky)
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
}

const currentSettings: Settings = {
    sensitivity: 0.5,
    sounds: true,
    skyboxTextures: SkyboxTexture.Space,
    crosshairColor: "white",
    hitsounds: true
};

export {currentSettings, SkyboxTexture}
