import {actions_obj} from "/modules.js"

export class Char{
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
        let default_args = {x:0 , y:0 , direction:1 , width:10 , height:40, can_move:true}
       
        Object.assign(this,{...default_args,...args})
        
        this.actions = actions_obj[pattern] ///get a patern of functions to do when a key of a action is pressed
        this.sprites = this.actions.get_all_sprites()
    }

    
}




