"use strict";
exports.__esModule = true;
var settings_1 = require("./ts/game_logic/settings.js");
function closeMessageBox() {
    var messageBox = document.querySelector('.message-box');
    messageBox.style.display = 'none';
    document.body.requestPointerLock();
}
function closeSettings() {
    var settingsDiv = document.querySelector('#settings');
    settingsDiv.style.display = 'none';
    document.body.requestPointerLock();
}
function handleSkyChange() {
    var selectElement = document.getElementById("sky");
    var selectedValue = selectElement.value;
    switch (selectedValue) {
        case "space":
            settings_1.currentSettings.skyboxTextures = settings_1.SkyboxTexture.Space;
            break;
        case "black":
            settings_1.currentSettings.skyboxTextures = settings_1.SkyboxTexture.Black;
            break;
    }
}
