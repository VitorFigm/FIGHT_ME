import {colision} from "/FIGHT_WITH_ME/modules.js"
export function fight_P2P_colision_attack_loop(obj1,obj2){  ///colision and attack betwen players
    ///blocks go through
    let top_of = (ref1,ref2)=>{
        return ref1.y+ref1.height <= ref2.y 
    }
    if( colision(obj1,obj2,7) ){
        obj1.Vx=0
        obj2.Vx=0
        ///jump block
        
        if(  top_of(obj1,obj2) || top_of(obj2,obj1)  ) {
            obj1.Vy = -obj1.Vy 
            obj2.Vy = -obj2.Vy
        }
    }

    ///attacks
    if( colision(obj1,obj2,6,1) ){
        apply_attack(obj1,obj2)
    }

}

function apply_attack(obj1,obj2,mult=1){ ////mult: damage bonus
    let func = (ref1,ref2) =>{
        if( ref1.damage != undefined ){
            ref2.hp-= ref1.damage*mult;
            ref2.actions.damage(ref2)
            ///audio
            if(ref1.damage<=5)audios.weak_dmg.play()
            else audios.strong_dmg.play()

            ref2.got_damage = true
            ref1.damage=undefined ///reset damage
        }
    }
    func(obj1,obj2)
    func(obj2,obj1)
    
}