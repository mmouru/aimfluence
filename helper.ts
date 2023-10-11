
function closeMessageBox() {
    const messageBox : HTMLDivElement = document.querySelector('.message-box')!;
    messageBox.style.display = 'none';
    document.body.requestPointerLock();
}

function closeSettings() {
    const settingsDiv = document.querySelector('#settings') as HTMLDivElement;
    settingsDiv.style.display = 'none';
    document.body.requestPointerLock();
}
