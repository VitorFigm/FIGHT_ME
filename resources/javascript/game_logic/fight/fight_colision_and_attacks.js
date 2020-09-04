import {colision} from "/modules.js"
export function fight_P2P_colision_attack_loop(obj1,obj2){  ///colision and attack betwen players
    ///blocks go through
    if( colision(obj1,obj2,7) ){
        let stop = (obj)=>{
            obj.Vx=0;
        }
        stop(obj1);stop(obj2)
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
            ref2.got_damage = true
            ref1.damage=undefined ///reset damage
        }
    }
    func(obj1,obj2)
    func(obj2,obj1)
    
}