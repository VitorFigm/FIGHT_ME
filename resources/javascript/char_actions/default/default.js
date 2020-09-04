import {default_loading_all_sprites} from '/modules.js'

export const Default ={
    name:"Default",

    get_all_sprites: default_loading_all_sprites,

    action_of_key:{
        68:'right',
        65:'left',
        87:'jump',
        74:'weak_punch',
        73:'strong_punch_or_kick',
    },  
    damage:(obj) =>{
        if(obj.anim_request!="damage" && obj.anim_request!="jump"){
            obj.anim_hierarchy = "block_anim:walk block:weak_punch block:strong_punch"
            obj.anim_request = "_damage"
            obj.inDraw_play = []
        }
    },
    move: (obj , v_limit , direction , ev , a=0.1 ,  fric=0.05, fric_change = 0.01 ) =>{
        obj.jump_Vx = 3*v_limit*direction //jump velocity
        let conds = anim_conds(obj,"stand_anim",1)
        if(conds[1]){
            acelerate(obj,a,v_limit,direction)
        }
        

        if(ev=="release" && conds[1]){
            obj.Ax =0 

            obj.fric+= fric_change    ///makes friction fallow the animation
            if(obj.fric > fric)obj.fric = fric
            
        }
    },
    right: (obj,ev) =>{
        obj.actions.move(obj, 0.8, 1 ,ev)
    },  
    ////////
    left: (obj,ev) =>{
        obj.actions.move(obj, 0.8, -1 ,ev)
    },
    ////////
    jump:(obj) =>{
        let cond = anim_conds(obj,"jump",4,false)
        if(cond[0]){
            obj.Vx = 0
            obj.Ax = 0
            obj.inDraw_play = []
            obj.inDraw_play[0] = {
                in:'end',
                func:  ()=>{
                    obj.Vy= -6
                    if(obj.jump_Vx!=undefined){
                        obj.Vx = obj.jump_Vx
                    }   
                    
                    obj.anim_request = "_jumping_in_air"
                    obj.inDraw_play = []

                }
            }
            
        }
    },
    weak_punch: (obj) =>{
        let cond = anim_conds(obj,"weak_punch",2,false)
        if( cond[0] ){
            obj.Ax = 0
            obj.Vx = 0.6*obj.direction   
            obj.inDraw_play = []
            obj.inDraw_play[0] = {
                in:20,
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
    strong_punch_or_kick: (obj) =>{
        if(obj.y!=0) obj.actions.air_kick(obj)
        else obj.actions.strong_punch(obj)
    },
    air_kick: (obj) =>{
        if( obj.anim_request != "air_kick" ){
            obj.anim_request = "_air_kick"
            obj.inDraw_play = []
            obj.inDraw_play[0] = {
                in:40,
                func:  ()=>{
                    obj.damage = 5
                }
            }
            obj.inDraw_play[1] = {
                in:"end",
                func:  ()=>{
                    obj.damage = undefined
                }
            }
        }
    },
    strong_punch: (obj) =>{
        let cond = anim_conds(obj,"strong_punch",2,false)
        if( cond[0] ){
            obj.Ax = 0
            obj.Vx = 0.3*obj.direction   
            obj.inDraw_play = []
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

function anim_conds(obj, anim, hierarchy , overlap_self=true){ ///conditions pattern and define hierachy of animations(to avoid multiples conditionals)
    let cond_to_play; 
    let cond_generic;


    let Hcurrent = obj.anim_hierarchy

    if( typeof(Hcurrent)== "number"){
        

        if(overlap_self){
            cond_to_play =  obj.anim_request!=anim && Hcurrent <=hierarchy 
            cond_generic = Hcurrent <= hierarchy
        }else{
            cond_to_play =  obj.anim_request!=anim && Hcurrent < hierarchy
            cond_generic = Hcurrent < hierarchy
        }
    
    }else{
        cond_to_play = true
        cond_generic = true
        let array = Hcurrent.split(" ")
        for(let i of array){
            i = i.split(":")
            if(i[0]=="block_anim"){  ///only blocks animation
                if(anim == i[1]){
                    cond_to_play = false
                    cond_generic = true
                }
            }else if(i[0]=="block"){ ///blocks actions
                if(anim == i[1]){
                    cond_to_play = false
                    cond_generic = false
                }
            }
        }
    }
    
    if(cond_to_play){
        obj.anim_hierarchy= hierarchy
        obj.anim_request = "_"+anim
    }
    
    return [cond_to_play , cond_generic]
    
    
}

function acelerate(obj,a,limit,direction){
    obj.fric =0;
    obj.Ax = a*direction   ///acelerates
    if(Math.abs(obj.Vx) > limit)obj.Vx = limit*direction; ///limits speed
}

