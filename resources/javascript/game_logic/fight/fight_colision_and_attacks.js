import {colision} from "/modules.js"
export function fight_P2P_colision_attack_loop(obj1,obj2){  ///colision and attack betwen players

    //colision functions
    let errorx = 4
    let colide_block_x = colision(obj1,obj2, errorx + 0.001 )
    let colide_block_y = colision(obj1,obj2, 0.001)   ///y needs a larger colision block

    let colide_attack = colision(obj1,obj2, errorx + 0.001 -0.2)
    ///damage and attacks
    if(colide_attack.check) {
        obj2.request_ia_attack = true
        let type = colide_attack.Ytype
        if(type=="1headOf2"||type=="2headOf1"){apply_attack(obj1,obj2,3)}
        else apply_attack(obj1,obj2)
    } else  obj2.request_ia_attack = false

      ///go through block y 
    if(colide_block_y.check){
        switch(colide_block_y.Ytype){
            case "1headOf2":
                apply_attack(obj1,obj2,3)
                obj1.block_y = obj1.y
            break
            case "2headOf1":
                apply_attack(obj1,obj2,3)
                obj2.block_y = obj2.y
            break
        }
    }
      ///go through block x
      let stop = (ref1) => {ref1.Vx=0;ref1.Ax=0}
    if(colide_block_x.check){
        obj1.Vx = -obj2.Vx 
        obj2.Vx = -obj1.Vx 
        switch(colide_block_x.Xtype){
            case 'right':
                stop(obj1);stop(obj2)
                obj1.x = obj2.x - obj1.width + errorx
            break
            case 'left':
                stop(obj1);stop(obj2)
                obj1.x = obj2.x + obj2.width - errorx
            break                        
        }  
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