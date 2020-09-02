import {fight_P2P_colision_attack_loop} from '/modules.js'
import {arena_limit} from '/modules.js'
import {canvas_draw} from '/modules.js'
import {velocity_logic,posChange} from '/modules.js'

export class Fight{
    loop = (obj1,obj2,args)=>{
        ///player loop logic
        obj1.loop_logic()
        obj2.loop_logic()

        ///game logic loops

        arena_limit(obj1,100)
        arena_limit(obj2,100)
        

        velocity_logic(obj1,0)
        velocity_logic(obj2,0)

        fight_P2P_colision_attack_loop(obj1,obj2)

        posChange(obj1)
        posChange(obj2)
        
        ///draw  (needs to be the last loop)
        canvas_draw(obj1,obj2 ,args.canvas_id , args.ground_y)

        requestAnimationFrame( ()=>{this.loop(obj1,obj2,args)} )

    }

    constructor(obj1, obj2 , args={canvas_id:"canvas" , ground_y:80,arena_width:100}){
        ///loop logics
        requestAnimationFrame( ()=>{this.loop(obj1,obj2,args)} )

    }


}