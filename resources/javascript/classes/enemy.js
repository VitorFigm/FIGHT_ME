import {Char} from '/FIGHT_ME/modules.js'

export class Enemy extends Char{
    frame_count = 0
    go_to = "left";
    constructor(args,pattern='Default',){
        
        let super_default_args = {x:70 , direction:-1}

        super({...super_default_args,...args},pattern)


        this.main_loop = (player)=>{
            if(this.can_move==true)this.intelligence(player)
        }


    }
    intelligence = (player)=>{
        ///jump to scape attack
        if(this.anim_request=="damage"){
            const rand = Math.random()
            if(rand<=0.01)this.actions.jump(this)
        }
        if(this.request_ia_attack || Math.abs(player.x-this.x)<=10){
            const rand = Math.random()
            if(rand<=0.1) this.actions.weak_punch(this)
            if(rand>=0.96) this.actions.strong_punch(this)
        }else{
            this.actions[this.go_to](this)
            ////decide which diretion to go
            if(this.frame_count>=30){
                const rand = Math.random()
                const dir = translate_direction(this.direction)
                const opose = translate_direction(-this.direction)
                    if(rand<0.7) this.go_to = dir
                else if(rand>0.8) this.go_to = opose
                this.frame_count=0
            }
            this.frame_count++
        }
    }
    
}

function translate_direction(dir){
    if(dir==1)return "right"
    else return "left"
}
