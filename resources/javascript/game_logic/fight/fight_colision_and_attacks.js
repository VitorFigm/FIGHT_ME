import {colision} from "/modules.js"
export function fight_P2P_colision_attack_loop(obj1,obj2){  ///colision and attack betwen players

    //colision functions
    let errorx = 4
    let colide_block_x = colision(obj1,obj2, errorx + 0.001 )
    let colide_block_y = colision(obj1,obj2, 0.001 )   ///y needs a larger colision block

    let colide_attack = colision(obj1,obj2, errorx + 0.001 -0.2)

    ///damage and attacks
    if(colide_attack.check) apply_attack(obj1,obj2)

      ///go through block y 
    if(colide_block_y.check){
        switch(colide_block_y.Ytype){
            case "1headOf2":
                obj1.block_y = obj1.y
            break
            case "2headOf1":
                obj2.block_y = obj2.y
            break
        }
    }
      ///go through block x
    if(colide_block_x.check){
        switch(colide_block_x.Xtype){
            case 'right':
                obj1.x = obj2.x - obj1.width + errorx
            break
            case 'left':
                obj1.x = obj2.x + obj2.width - errorx
            break                        
        }  
    }
}

function apply_attack(obj1,obj2){
    let func = (ref1,ref2) =>{
        if( ref1.damage != undefined ){
            ref2.hp-= ref1.damage;
            ref2.anim_request = "_damage"
            ref1.damage=undefined ///reset damage
            console.log(ref2.hp)
        }
    }
    func(obj1,obj2)
    func(obj2,obj1)
    
}