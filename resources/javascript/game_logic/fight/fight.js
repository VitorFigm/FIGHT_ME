import {fight_P2P_colision_attack_loop} from '/modules.js'
import {arena_limit} from '/modules.js'
import {canvas_draw} from '/modules.js'
import {velocity_logic,posChange} from '/modules.js'
import {change_dir} from '/modules.js'

export class Fight{

    loop = (obj1,obj2,args)=>{
        ///player loop logic
        obj1.loop_logic()
        obj2.loop_logic(obj1)

        ///game logic loops
        arena_limit(obj1,100)
        arena_limit(obj2,100)
        

        velocity_logic(obj1,0)
        velocity_logic(obj2,0)

        fight_P2P_colision_attack_loop(obj1,obj2)
        posChange(obj1)
        posChange(obj2)
        
        ///draw  (needs to be the last loop)
        canvas_draw(obj1,obj2 ,args.canvas_id , args.ground_y, this)

        change_dir(obj1,obj2)
        if(obj1.hp!=0 && obj2.hp!=0){
            requestAnimationFrame( ()=>{this.loop(obj1,obj2,args)} )
        }else{
            ///result
            document.getElementById("canvas").style.animation = "canvas_end 1s forwards"
            document.getElementsByTagName('body')[0].style.cursor = null ///show cursor
            document.getElementById("result_menu").style.display = "flex"
            let result = document.getElementById("result")
            if(obj1.hp==0){
                result.innerHTML = "YOU LOSE"
                result.style.color = "red"
            }else{
                result.innerHTML = "YOU WIN"
                result.style.color = "green"
            }
            
        }
    }

    constructor(obj1, obj2 , args={canvas_id:"canvas" , ground_y:80,arena_width:100}){
        ///hide cursor
        document.getElementsByTagName('body')[0].style.cursor = "none"
        ///loop logics
        requestAnimationFrame( ()=>{this.loop(obj1,obj2,args)} )
        //ready fight messages
        setTimeout(
            document.getElementById("get_ready").style.display = "flex"
        ,1000)
        setTimeout(
            ()=>{document.getElementById("fight").style.display = "flex";
            document.getElementById("get_ready").style.display = "none"}
        ,2000)
        setTimeout(
            ()=>{document.getElementById("fight").style.display = "none";
        obj1.can_move=true;obj2.can_move=true}
        ,3000)

    }


}

