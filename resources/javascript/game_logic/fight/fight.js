import { fight_P2P_colision } from '/FIGHT_ME/modules.js'
import { limitCharacter_to_arenaWidth } from '/FIGHT_ME/modules.js'
import { canvas_draw } from '/FIGHT_ME/modules.js'
import { velocityLogic, positionChange } from '/FIGHT_ME/modules.js'
import { changeDirection } from '/FIGHT_ME/modules.js'

export class Fight {
    constructor(player, enemy, args={}) {
        hideCursor()
        //loop logics
        requestAnimationFrame(() => { this.loop(player, enemy, args) })
        readyFight_Messages(player, enemy)
        players_canMove_afterTime(player,enemy,3000)
    }

    loop = (player, enemy, args) => {
        const { canvas_id = "canvas", ground_y = 80, arena_width = 100 } = args
        ///calling player loop logic function
        player.loop_logic()
        enemy.loop_logic(player)
        ///game logic loops
        velocityLogic(player, 0)
        velocityLogic(enemy, 0)
        fight_P2P_colision(player, enemy)
        positionChange(player)
        positionChange(enemy)
        limitCharacter_to_arenaWidth(player, arena_width)
        limitCharacter_to_arenaWidth(enemy, arena_width)
        ///draw  (needs to be the last loop)
        canvas_draw(player, enemy, canvas_id, ground_y, this)
        //keep player and enemy face to face
        changeDirection(player, enemy)
        if (player.hp != 0 && enemy.hp != 0) {
            requestAnimationFrame(() => { this.loop(player, enemy, args) })
        } else {
            ///result
            FightResult(player)
        }
    }
}

function readyFight_Messages(){
    showElement_afterTime('get_ready', 1000)
    showElement_afterTime('fight', 2000)
    hideElement_afterTime('get_ready', 2000)
    hideElement_afterTime('fight', 3000)
}

function FightResult(player){
    gameEndAnimation()
    showCursor()
    showElement('result_menu')
    show_result(player)
}

function gameEndAnimation() {
    document.getElementById("messages").classList.add('gameEnd')
}

function show_result(player) {
    let result = document.getElementById("result")
    if (player.hp == 0) {
        result.innerHTML = "YOU LOSE"
        result.classList.add('lose')
    } else {
        result.innerHTML = "YOU WIN"
        result.classList.add('win')
    }
}



function hideCursor() {
    document.getElementsByTagName('body')[0].classList.add('cursor_off')
}
function showCursor() {
    document.getElementsByTagName('body')[0].classList.remove('cursor_off')
}

function showElement(element) {
    document.getElementById(element).classList.remove('invisible')
}
function showElement_afterTime(element, time) {
    setTimeout(
        () => showElement(element)
        , time)
}

function hideElement(element) {
    document.getElementById(element).classList.add('invisible')
}

function hideElement_afterTime(element, time) {
    setTimeout(
        () => hideElement(element)
        , time)
}

function players_canMove_afterTime(player,enemy,time) {
    setTimeout(
        () => {
            player.can_move = true; enemy.can_move = true
        }
        , time)
}