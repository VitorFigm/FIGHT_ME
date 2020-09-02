import {colision} from "/modules.js"
export function fight_P2P_colision_attack_loop(obj1,obj2){  ///colision and attack betwen players

    //colision functions
    let colide = colision(obj1,obj2)

    ///go through block

    if(colide.check){
        switch(colide.Ytype){
            case "1headOf2":
                obj1.block_y = obj1.y
            break
            case "2headOf1":
                obj2.block_y = obj2.y
            break
            case "normal":
                let f = (obj)=>{
                    obj.Vx = 0
                    obj.Ax = 0
                    obj.fric = 0
                }
                f(obj1)
                f(obj2)     
                switch(colide.Xtype){
                    case 'right':
                        obj1.x = obj2.x - obj1.width
                    break
                    case 'left':
                        obj1.x = obj2.x + obj2.width
                    break                        
                }            
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