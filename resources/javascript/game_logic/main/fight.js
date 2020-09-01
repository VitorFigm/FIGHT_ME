import {P2P_colision_attack_loop} from '/modules.js'
import {arena_limit} from '/modules.js'
import {canvas_draw} from '/modules.js'

export class Fight{
    ///properties
    colision = false
    colision_type = ""
    ///internal loop logics
    arena_limit = arena_limit
    P2P_colision_attack_loop = P2P_colision_attack_loop
    canvas_draw = canvas_draw

    loop = (obj1,obj2,args)=>{
        ///player loop logic
        obj1.loop_logic()
        obj2.loop_logic()
        ///game logic loops
        this.arena_limit(obj1,obj2,args.arena_width)
        this.P2P_colision_attack_loop(obj1,obj2,this)
        ///draw  (needs to be the last loop)
        this.canvas_draw(obj1,obj2 ,args.canvas_id , args.ground_y)

        requestAnimationFrame( ()=>{this.loop(obj1,obj2,args)} )

    }

    constructor(obj1, obj2 , args={canvas_id:"canvas" , ground_y:50,arena_width:100}){
        ///loop logics
        requestAnimationFrame( ()=>{this.loop(obj1,obj2,args)} )

    }


}