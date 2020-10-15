import {default_loading_all_sprites} from '/FIGHT_ME/modules.js'

export const Default ={
    name:"Default",
    get_all_sprites: default_loading_all_sprites,
    action_of_key:{
        'd':'right',
        'a':'left',
        'w':'jump',
        'j':'weak_punch',
        'i':'strong_punch',
    },

    damage:(obj) =>{
        if(obj.anim_request!="jump"){ ///jump cancels damage animation
            obj.hitCount = (obj.hitCount+1) || 1
            ///after 3 hits, the play will be able to move
            if(obj.hitCount<=3){
                obj.anim_hierarchy = {walk:'block', weak_punch:'block', strong_punch:'block'} 
                //blocks thoses animation of playing
            }else{
                obj.anim_hierarchy = 1;
                obj.hitCount=0
            }
            obj.anim_request = "_damage"
            obj.inDraw_play = []
        }
    },

    move: (obj , v_limit , direction , ev , args={} ) =>{
        const {a=0.1 ,  fric=0.05, fric_change = 0.01} = args
        const _canPlay = canPlay(obj,"walk",1,true)
        if(_canPlay.animations ) PlayAnimation("walk",1,obj)
        if(_canPlay.functions){
            obj.hitCount=0 ///referent to the damage function
            acelerate(obj,a,v_limit,direction)
            obj.reverse_anim = obj.direction==direction?false:true
        }
        if(ev=="release" && _canPlay.functions){
            obj.Ax =0 
            obj.fric+= fric_change    ///makes friction fallow the animation
            if(obj.fric > fric)obj.fric = fric
            
        }
    },

    right: (obj,ev) =>{ 
        obj.actions.move(obj, 0.5, 1 ,ev)
    },  

    ////////
    left: (obj,ev) =>{
        obj.actions.move(obj, 0.5, -1 ,ev)
    },

    ////////
    jump:(obj) =>{
        const _canPlay = canPlay(obj,"jump",4,false)
        if(_canPlay.animations){
            PlayAnimation("jump",4,obj)
            stop(obj)
            obj.request_to_loop[0] = ()=>{
                if(obj.Vy>0){
                    obj.reverse_anim = true
                    obj.anim_request = "_jump"
                    obj.request_to_loop = []
                }
            }
            obj.inDraw_play[0] = {
                in:'end',
                func:  ()=>{
                    obj.Vy= -6
                    obj.anim_request = "_jumping_in_air"
                    obj.anim_hierarchy = {walk:'block_anim'}
                    obj.inDraw_play = []

                }
            }
            
        }
    },
    weak_punch: (obj) =>{
        const _canPlay = canPlay(obj,"weak_punch",2,false)
        if( _canPlay.animations ){
            PlayAnimation("weak_punch",4,obj)
            stop(obj)
            obj.Vx = 0.6*obj.direction   
            obj.inDraw_play[0] = {
                in:30,
                func:  ()=>{
                    obj.damage = 5
                }
            }
            obj.inDraw_play[1] = {
                in:"end",
                func:  ()=>{
                    obj.Vx = 0
                    obj.damage = undefined
                } 
            }
        }
    }, 
    strong_punch: (obj) =>{
        const _canPlay = canPlay(obj,"strong_punch",2,false)
        if( _canPlay.animations ){
            PlayAnimation("strong_punch",4,obj)
            stop(obj)
            obj.Vx = 0.3*obj.direction   
            obj.inDraw_play[0] = {
                in:40,
                func:  ()=>{
                    obj.damage = 10
                }
            }
            obj.inDraw_play[1] = {
                in:"end",
                func:  ()=>{
                    obj.Vx = 0
                    obj.damage = undefined
                }
            }   
        }
    }, 
        
}
function PlayAnimation(anim,hierarchy,obj){
        obj.anim_hierarchy= hierarchy
        obj.anim_request = "_"+anim
}

function canPlay(obj, anim, hierarchy , AnimationOverlaps_self=true){
    let canPlayAnimations; 
    let canPlayFunctions;
    if(typeof(obj.anim_hierarchy)==="number")
        [canPlayAnimations, canPlayFunctions] = AllowPlaying__Number__(obj,anim,AnimationOverlaps_self, obj.anim_hierarchy, hierarchy)
    else
        [canPlayAnimations, canPlayFunctions] = AllowPlaying__Object__(anim,obj.anim_hierarchy)
    ///request animation
    return {animations:canPlayAnimations, functions:canPlayFunctions}
}

function AllowPlaying__Number__(obj,anim,AnimationOverlaps_self, currentHierarchy, hierarchy){
    let canPlayAnimations,canPlayFunctions; 
    if(AnimationOverlaps_self){
        canPlayAnimations =  obj.anim_request!=anim  && currentHierarchy <=hierarchy 
        canPlayFunctions = currentHierarchy <= hierarchy
    }else{
        canPlayAnimations =  obj.anim_request!=anim && currentHierarchy < hierarchy
        canPlayFunctions = currentHierarchy < hierarchy
    }
    return [canPlayAnimations, canPlayFunctions]
}

function AllowPlaying__Object__(anim,currentHierarchy){
    let canPlayAnimations = true
    let canPlayFunctions = true
    for(let i in currentHierarchy){
        if(currentHierarchy[i]=="block_anim"){  ///only blocks animation
            if(anim == i){
                canPlayAnimations = false
                canPlayFunctions = true
            }
        }else if(currentHierarchy[i]=="block"){ ///blocks actions
            if(anim == i){
                canPlayAnimations = false
                canPlayFunctions = false
            }
        }
    }
    return [canPlayAnimations, canPlayFunctions]
}

function acelerate(obj,a,limit,direction){
    obj.fric =0;
    obj.Ax = a*direction   ///acelerates
    if(Math.abs(obj.Vx) > limit)obj.Vx = limit*direction; ///limits speed
}
function stop(obj){
    obj.reverse_anim = false
    obj.Vx=0
    obj.Ax=0
    obj.inDraw_play = []
    obj.request_to_loop = []
}
