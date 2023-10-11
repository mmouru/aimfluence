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
