import {checkColision}  from '/FIGHT_ME/modules.js'
export function fight_P2P_colision(player,enemy){
    const A_onTop_of_B = (ref1,ref2)=>{
        return ref1.y+ref1.height <= ref2.y 
    }
    if( checkColision(player,enemy,7) ){
        player.Vx=0
        enemy.Vx=0
        ///jump block
        if(  A_onTop_of_B(player,enemy) || A_onTop_of_B(enemy,player)  ) {
            player.Vy = -player.Vy 
            enemy.Vy = -enemy.Vy
        }
    }
    ///Attack colision
    if( checkColision(player,enemy,6,1) ){
        apply_attack()
    }

    function apply_attack(DamageMultiplier=1){
        let func = (ref1,ref2) =>{
            if( ref1.damage != undefined ){
                ref2.hp-= ref1.damage*DamageMultiplier;
                ref2.actions.damage(ref2)
                ///audio
                if(ref1.damage<=5)audios.weak_dmg.play()
                else audios.strong_dmg.play()
    
                ref2.got_damage = true
                ref1.damage=undefined ///reset damage
            }
        }
        func(player,enemy)
        func(enemy,player)
        
    }
}

