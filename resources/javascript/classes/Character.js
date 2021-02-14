import {defaultActions} from (process.env.BASE_URL+'/modules.js')
const allActionPaterns = {
    'default':defaultActions
}

export class Character{
    ///actions control
    toDo_onParentLoop;
    toDo_onGameLoop = (opponent)=>{
        this.toDo_onParentLoop(opponent)
        this.doRequestedFunctionsOnLoop()
    }

    doRequestedFunctionsOnLoop(){
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
    onDrawCall ///on the draw_on_canvas module, this variable request to call functions on a specific frame of an animation
    animHierarchy = 0; //the hierarchy of the animation that is playing, the higher hierarchy can block the playing  of lower hierarchy animations 
    
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

        this.actions = allActionPaterns[pattern] ///get a patern of functions to do when a key of a action is pressed
        this.sprites = this.actions.get_all_sprites()
        let standSprite = this.sprites['stand_anim']
         ///width to use in ratio calculation in draw_on_canvas module 
         standSprite.spriteImage.onload = ()=>{
            this.base_width = standSprite.spriteImage.width/standSprite.cols
         }   
    }
}




