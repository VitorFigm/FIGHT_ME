import {actions_obj} from "/[repo]/modules.js"

export class Char{
    ///actions control
    main_loop;   /////loop of the child class
    loop_logic = (opponent)=>{
        this.main_loop(opponent)
        let request = this.request_to_loop
            if(request !=undefined){
                for(let func of request){
                    func()
                }
            }
    }
    //fight control
    damage;
    hp= 100; 
    //velocity
    Vx = 0; 
    Vy = 0;
    //aceleration
    Ax=0
    Ay =0
    //friction
    fric = 0

    ///anim control
    inDraw_play ///in the draw_in_canvas module, this variable request to call functions in a specific frame of an animation

    anim_hierarchy = 0; //the hierarchy of the animation that is playing, the higher hierarchy can block the playing  of lower hierarchy animations 

    constructor(args, pattern='Default'){
        let default_args = {x:20 , y:0 , direction:1 , width:10 , height:40, can_move:true}
        Object.assign(this,{...default_args,...args})

        this.actions = actions_obj[pattern] ///get a patern of functions to do when a key of a action is pressed
        this.sprites = this.actions.get_all_sprites()
        let stand_sprite = this.sprites['stand_anim']
         ///to keep ratio in canvas draw
         stand_sprite.img.onload = ()=>{
            this.base_width = stand_sprite.img.width/stand_sprite.cols
         }
    }

    
}




