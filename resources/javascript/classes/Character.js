import {actions_obj} from '/FIGHT_ME/modules.js'

export class Character{
    ///actions control
    main_loop;   /////loop of the child class
    loop_logic = (opponent)=>{
        this.main_loop(opponent)
        this.doRequested_FunctionsInLoop()
    }

    doRequested_FunctionsInLoop(){
        const request = this.request_to_loop
        if(request !=undefined){
            for(const func of request){
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
    inDraw_play ///on the draw_on_canvas module, this variable request to call functions on a specific frame of an animation
    anim_hierarchy = 0; //the hierarchy of the animation that is playing, the higher hierarchy can block the playing  of lower hierarchy animations 
    
    constructor(args, pattern){
        const default_args = {
            x:20,
            y:0,
            direction:1,
            width:10,
            height:40,
            can_move:true
        }
        Object.assign(this,{...default_args,...args})

        this.actions = actions_obj[pattern] ///get a patern of functions to do when a key of a action is pressed
        this.sprites = this.actions.get_all_sprites()
        let stand_sprite = this.sprites['stand_anim']
         ///width to use in ratio calculation in draw_on_canvas module 
         stand_sprite.img.onload = ()=>{
            this.base_width = stand_sprite.img.width/stand_sprite.cols
         }   
    }
}




