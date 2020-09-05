import {Char} from '/modules.js'

export class Enemy extends Char{
    loop_logic = (player)=>{
        if(this.ia==true)this.intelligence(player)
    }
    constructor(args,pattern='Default',ia=false){
        
        let super_default_args = {x:60 , direction:-1}

        super({...super_default_args,...args},pattern)
        this.ia=ia
    }
    intelligence = (player)=>{
        if(this.request_ia_attack || Math.abs(player.x-this.x)<=10){
            let rand = Math.random()
            if(rand<=0.1) this.actions.weak_punch(this)
        }else{
            let rand = Math.random()
            let dir = translate_direction(this.direction)
            let opose = translate_direction(-this.direction)
            if(rand<0.1) this.actions[dir](this)
            else if(rand>0.95)this.actions[opose](this)
            else{
                this.Vx *= 0.8;
            }
        }
    }
}

function translate_direction(dir){
    if(dir==1)return "right"
    else return "left"
}
