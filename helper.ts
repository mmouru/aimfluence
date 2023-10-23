
import { currentSettings, SkyboxTexture } from "./ts/game_logic/settings.js";

function closeMessageBox() {
    const messageBox = document.querySelector('.message-box') as HTMLDivElement;
    messageBox.style.display = 'none';
    document.body.requestPointerLock();
}

function closeSettings() {
    const settingsDiv = document.querySelector('#settings') as HTMLDivElement;
    settingsDiv.style.display = 'none';
    document.body.requestPointerLock();
}

function handleSkyChange() {
    const selectElement = document.getElementById("sky") as HTMLSelectElement;
    const selectedValue = selectElement.value;
    switch (selectedValue) {
        case "space":
            currentSettings.skyboxTextures = SkyboxTexture.Space;
            break;
        case "black":
            currentSettings.skyboxTextures = SkyboxTexture.Black;
            break;
    }
}
