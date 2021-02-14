import { Character } from '/FIGHT_ME/modules.js'

export class Enemy extends Character {
    frame_count = 0
    go_to = "left";
    constructor(player,args, pattern = 'default') {
        let super_default_args = { x: 70, direction: -1 }
        super({ ...super_default_args, ...args }, pattern)
        this.player = player
        this.toDo_onParentLoop = () => {
            if (this.can_move == true) this.intelligence()
        }
    }

    intelligence(){
        ///jump to scape attack
        this.JumpIfNeedsTo()
        if (this.PlayerIsNear()) {
            this.DecidesIf_WantToAttack()
        } else {
            this.walkToDecidedDirection() ///walks in the decided direction
            if (this.frame_count >= 30) {
                this.decideDirection()
                this.frame_count = 0
            }
            this.frame_count++
        }
    }

    JumpIfNeedsTo(){
        if (this.animRequest == "damage") {
            const rand = Math.random()
            if (rand <= 0.01) this.actions.jump(this)
        }
    }

    PlayerIsNear(){
        return Math.abs(this.player.x - this.x) <= 10
    }

    DecidesIf_WantToAttack(){
        const rand = Math.random()
        if (rand <= 0.1) this.actions.weak_punch(this)
        if (rand >= 0.96) this.actions.strong_punch(this)
    }

    walkToDecidedDirection(){
        this.actions[this.go_to](this)
    }

    decideDirection(){
            const rand = Math.random()
            const dir = translate_direction(this.direction)
            const opose = translate_direction(-this.direction)
            if (rand < 0.7) this.go_to = dir
            else if (rand > 0.8) this.go_to = opose
    }

}



function translate_direction(dir) {
    if (dir == 1) return "right"
    else return "left"
}
