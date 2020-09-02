import {colision} from "/modules.js"
export function fight_P2P_colision_attack_loop(obj1,obj2){  ///colision and attack betwen players

    //colision functions
    let colide = colision(obj1,obj2)
    console.log(colide.check)
    ///go through block
    if(colide.check){
        let stop = (obj,axis) => {
            obj['V'+axis] = 0
            obj['A'+axis] = 0
        }

        switch(colide.Ytype){
            case "1headOf2":
                stop(obj1,'y')
            break
            case "2headOf1":
                stop(obj2,'y')
            break
            case "normal":
                stop(obj1,'x')
                stop(obj2,'x')
        }
    }

}

function apply_attack(obj1,obj2){
    if(! isNaN(obj2.damage) )
    {
        obj1.hp-= obj2.damage;
        if(obj2.damage!=0)obj2.damage="wait" ///reset damage
    }

    if(! isNaN(obj1.damage) )
    {
        obj2.hp-= obj1.damage;
        if(obj1.damage!=0)obj1.damage="wait"  ///reset damage
    }

}