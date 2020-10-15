import { Character } from '/FIGHT_ME/modules.js'

export class Enemy extends Character {
    frame_count = 0
    go_to = "left";
    constructor(args, pattern = 'Default') {
        let super_default_args = { x: 70, direction: -1 }
        super({ ...super_default_args, ...args }, pattern)
        this.main_loop = (player) => {
            if (this.can_move == true) this.intelligence(player)
        }
    }
    intelligence = (player) => {
        ///jump to scape attack
        JumpIfNeedsTo(this)
        if (PlayerIsNear(player, this)) {
            DecidesIf_WantToAttack(this)
        } else {
            this.actions[this.go_to](this) ///walks in the decided direction
            ////decide which diretion to go
            decideDirection(this)
            this.frame_count++
        }
    }
}


function JumpIfNeedsTo(enemy) {
    if (enemy.anim_request == "damage") {
        const rand = Math.random()
        if (rand <= 0.01) enemy.actions.jump(enemy)
    }
}
function PlayerIsNear(player, enemy) {
    return Math.abs(player.x - enemy.x) <= 10
}

function DecidesIf_WantToAttack(enemy) {
    const rand = Math.random()
    if (rand <= 0.1) enemy.actions.weak_punch(enemy)
    if (rand >= 0.96) enemy.actions.strong_punch(enemy)
}

function decideDirection(enemy) {
    if (enemy.frame_count >= 30) {
        const rand = Math.random()
        const dir = translate_direction(enemy.direction)
        const opose = translate_direction(-enemy.direction)
        if (rand < 0.7) enemy.go_to = dir
        else if (rand > 0.8) enemy.go_to = opose
        enemy.frame_count = 0
    }
}


function translate_direction(dir) {
    if (dir == 1) return "right"
    else return "left"
}
