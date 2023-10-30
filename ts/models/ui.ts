
import * as THREE from 'three';
import { stopGame } from '../game_logic/game_logic';
import { gameStartTime } from '../game_logic/game_logic';

const stopWatchElement = document.getElementById('time') as HTMLParagraphElement;

/**
 * Function to update stopwatch timer in UI
 * @param currentElapsedTime number, current elapsed time since
 */
function updateUserInterfaceStopWatchTime(currentElapsedTime: number) {
    let stopWatch = (currentElapsedTime - gameStartTime);
    stopWatch = Math.round(60 - stopWatch);
    let stopWatchString: string
    if (stopWatch < 10) {
        stopWatchString = "0:0" + stopWatch.toString();
    } else if (stopWatch === 60) {
        stopWatchString = "1:00";
    } else { stopWatchString = "0:" + stopWatch.toString() };

    stopWatchElement.textContent = stopWatchString;
    if ( stopWatch <= 0) {
        stopWatchElement.textContent = "1:00";
        stopGame();
    }
};

export { updateUserInterfaceStopWatchTime };
