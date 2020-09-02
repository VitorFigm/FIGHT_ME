import {default_loading_all_sprites} from '/modules.js'

export const Default ={
    name:"Default",

    get_all_sprites: default_loading_all_sprites,

    action_of_key:{
        68:'right',
        65:'left',
        87:'jump',
        74:'weak_punch',
        73:'strong_punch',
    },  
    move: (obj , v_limit , direction , ev , a=0.1 ,  fric=0.05, fric_change = 0.01 ) =>{
       
        let conds = anim_conds(obj,"walk",1)

        acelerate(obj,a,v_limit,direction)
        
        if(conds[1]){
            
        }
        

        if( ev=="press" &&  conds[0] ){
            obj.anim_request = undefined
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
        obj.Vy= -1
    },
    weak_punch: (obj) =>{
        let cond = anim_conds(obj,"weak_punch",'max')
        if( cond ){
            obj.Vx = 0.2    
            obj.anim_request = "_weak_punch"
            
            obj.play_function = {}
            obj.play_function.in = "end"
            obj.play_function.get = ()=>{
                obj.Vx = 0
            }

        }

        if(obj.damage==0){
            obj.damage = 4
            
        }
        
    },
    strong_punch: (obj) =>{
        let cond = anim_conds(obj,"strong_punch",'max')
        if( cond ){
            obj.Vx = obj.Vx*0.6
            obj.anim_request = "_strong_punch"
            
            obj.play_function = {}
            obj.play_function.in = "end"
            obj.play_function.get = ()=>{
                obj.Vx = 0
            }

        }

        if(obj.damage==0){
            obj.damage = 4
            
        }
        
    }, 
        
}

function anim_conds(obj,anim,hierarchy,direction){ ///conditions pattern and define hierachy
    
    let cond_to_play;
    let cond_generic;

    if(hierarchy=="max"){
        cond_to_play = obj.anim_request!=anim && obj.anim_hierarchy!="max"

        if(cond_to_play) obj.anim_hierarchy = hierarchy

        return cond_to_play
    }else{
        cond_to_play =  obj.anim_request!=anim && obj.anim_hierarchy <=hierarchy && obj.anim_hierarchy!="max"
        cond_generic = obj.anim_hierarchy <=hierarchy && obj.anim_hierarchy!="max"
        

        if(cond_to_play) obj.anim_hierarchy = hierarchy

        return [cond_to_play,cond_generic]
    }
}

function acelerate(obj,a,limit,direction){
    obj.fric =0;
    obj.Ax = a*direction   ///acelerates
    if(Math.abs(obj.Vx) > limit)obj.Vx = limit*direction; ///limits speed
}

