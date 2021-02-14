import {default_loading_all_sprites} from process.env.BASE_URL+'/modules.js'

export const defaultActions ={
    name:"Default",
    get_all_sprites: default_loading_all_sprites,
    action_of_key:{
        'd':'right',
        'a':'left',
        'w':'jump',
        'j':'weak_punch',
        'i':'strong_punch',
    },

    damage:(character) =>{
        if(character.animRequest!="jump"){ ///jump cancels damage animation
            character.hitCount = (character.hitCount+1) || 1
            ///after 3 hits, the play will be able to move
            if(character.hitCount<=3){
                character.animHierarchy = {walk:'block', weak_punch:'block', strong_punch:'block'} 
                //blocks thoses animation of playing
            }else{
                character.animHierarchy = 1;
                character.hitCount=0
            }
            character.animRequest = "_damage"
            character.onDrawCall = []
        }
    },

    move: (character , v_limit , direction , ev , args={} ) =>{
        const {a=0.1 ,  fric=0.05, fric_change = 0.01} = args
        const _canPlay = canPlay(character,"walk",1,true)
        if(_canPlay.animations ) PlayAnimation("walk",1,character)
        if(_canPlay.functions){
            character.hitCount=0 ///referent to the damage function
            acelerate(character,a,v_limit,direction)
            character.reverseAnim = character.direction==direction?false:true
        }
        if(ev=="release" && _canPlay.functions){
            character.Ax =0 
            character.fric+= fric_change    ///makes friction fallow the animation
            if(character.fric > fric)character.fric = fric
            
        }
    },

    right: (character,ev) =>{ 
        character.actions.move(character, 0.5, 1 ,ev)
    },  

    ////////
    left: (character,ev) =>{
        character.actions.move(character, 0.5, -1 ,ev)
    },

    ////////
    jump:(character) =>{
        const _canPlay = canPlay(character,"jump",4,false)
        if(_canPlay.animations){
            PlayAnimation("jump",4,character)
            stop(character)
            clearFunctionRequests(character)
            character.request_to_loop[0] = ()=>{
                if(character.Vy>0){
                    character.reverseAnim = true
                    character.animRequest = "_jump"
                    character.request_to_loop = []
                }
            }
            character.onDrawCall[0] = {
                onFrame:'finalFrame',
                func:  ()=>{
                    character.Vy= -6
                    character.animRequest = "_jumping_in_air"
                    character.animHierarchy = {walk:'blockAnim'}
                    character.onDrawCall = []

                }
            }
            
        }
    },
    weak_punch: (character) =>{
        const _canPlay = canPlay(character,"weak_punch",2,false)
        if( _canPlay.animations ){
            PlayAnimation("weak_punch",4,character)
            stop(character)
            clearFunctionRequests(character)
            character.Vx = 0.6*character.direction   
            character.onDrawCall[0] = {
                onFrame:30,
                func:  ()=>{
                    character.damage = 5
                }
            }
            character.onDrawCall[1] = {
                onFrame:"finalFrame",
                func:  ()=>{
                    character.Vx = 0
                    character.damage = undefined
                } 
            }
        }
    }, 
    strong_punch: (character) =>{
        const _canPlay = canPlay(character,"strong_punch",2,false)
        if( _canPlay.animations ){
            PlayAnimation("strong_punch",4,character)
            stop(character)
            clearFunctionRequests(character)
            character.Vx = 0.3*character.direction   
            character.onDrawCall[0] = {
                onFrame:40,
                func:  ()=>{
                    character.damage = 10
                }
            }
            character.onDrawCall[1] = {
                onFrame:"finalFrame",
                func:  ()=>{
                    character.Vx = 0
                    character.damage = undefined
                }
            }   
        }
    }, 
        
}

function acelerate(character,a,limit,direction){
    character.fric =0;
    character.Ax = a*direction   ///acelerates
    if(Math.abs(character.Vx) > limit)character.Vx = limit*direction; ///limits speed
}

function stop(character){
    character.reverseAnim = false
    character.Vx=0
    character.Ax=0
}

function clearFunctionRequests(character){
    character.onDrawCall = []
    character.request_to_loop = []
}

function PlayAnimation(anim,hierarchy,character){
        character.animHierarchy= hierarchy
        character.animRequest = "_"+anim
}

function canPlay(character, animToPlay , hierarchy , AnimationOverlaps_self=true){
    let canPlayAnimations
    let canPlayFunctions
    if(typeof(character.animHierarchy)==="number")
        AllowPlaying__Number__(character.animHierarchy)
    else
        AllowPlaying__Object__(character.animHierarchy)
    ///request animation
    return {animations:canPlayAnimations, functions:canPlayFunctions}
    
    function AllowPlaying__Number__(currentHierarchy){
        if(AnimationOverlaps_self){
            canPlayAnimations =  character.animRequest!=animToPlay  && currentHierarchy <=hierarchy 
            canPlayFunctions = currentHierarchy <= hierarchy
        }else{
            canPlayAnimations =  character.animRequest!=animToPlay && currentHierarchy < hierarchy
            canPlayFunctions = currentHierarchy < hierarchy
        }
    }

    function AllowPlaying__Object__(currentHierarchy){
        canPlayAnimations = true
        canPlayFunctions = true
        for(let i in currentHierarchy){
            if(currentHierarchy[i]=="blockAnim"){  ///only blocks animation
                if(animToPlay == i){
                    canPlayAnimations = false
                    canPlayFunctions = true
                }
            }else if(currentHierarchy[i]=="block"){ ///blocks functions
                if(animToPlay == i){
                    canPlayAnimations = false
                    canPlayFunctions = false
                }
            }
        }
    }

}
