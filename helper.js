"use strict";
exports.__esModule = true;
exports.closeMessageBox = exports.removeMissedTargets = void 0;
var game_logic_1 = require("./ts/game_logic/game_logic");
var deleteMeshAfterTime = 5.0;
/**
 *
 * @param {THREE.clock} clock
 */

exports.removeMissedTargets = removeMissedTargets;
function closeMessageBox() {
    var messageBox = document.querySelector('.message-box');
    messageBox.style.display = 'none';
}
exports.closeMessageBox = closeMessageBox;
