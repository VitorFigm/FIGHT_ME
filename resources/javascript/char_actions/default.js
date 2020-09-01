import {load_sprite} from '/modules.js'

export const Default ={
    name:"Default",

    get_all_sprites: loading_all_sprites,

    action_of_key:{
        68:'right',
        65:'left',
        87:'up',
        74:'weak-punch',
        73:'strong-punch',
    },  
    move: (obj,v,ev) =>{
        if(ev=="press")obj.v=v
        if(ev=="press")obj.v=0
    },
    right: (obj,ev) =>{
        obj.actions.move(obj,1,ev)
    },
    ////////
    left: (obj,ev) =>{
        obj.actions.move(obj,-1,ev)
    },
    ////////
    up: (obj)=> {
        if(!obj.jumping){
            obj.actions.jump(obj)
        }
    },
    ////////
    jump:(obj) =>{
            obj.jumping = true;
            if(obj.y!=0 || obj.y==0 && !obj.jump_falling ){ ///cases when it changes position
                //jumping
                if(obj.y >=-obj.jump_limit && !obj.jump_falling)obj.y-=1.5;
                //falling
                if(obj.y==-obj.jump_limit) obj.jump_falling = true 
                if(obj.jump_falling)  obj.y+=1.5;
            }
            //loop
            if(obj.y!=0)window.requestAnimationFrame(  ()=>obj.actions.jump(obj)  )

            //reset
            if(obj.y==0 && obj.jump_falling ) {
                obj.jump_falling = false;
                obj.jumping = false;
            }
    },
    weak_punch: (obj) =>{
        if(obj.damage==0){
            obj.x++;
            obj.damage = 4
            setTimeout(()=>obj.damage = 0,2000)
        }
        
    }   
        
}



function loading_all_sprites(){///to load sprites used in actions to a object that will be returned
        let sprites = {
            stand_anim:{
                img:load_sprite("/resources/chars/Default/standpose_3x22x60.svg"),
                frames:60,
                rows:3,
                cols:22,
            },
            weak_punch:{
                img:load_sprite("/resources/chars/Default/weakpunch_3x15x40_.svg"),
                frames:40,
                rows:3,
                cols:15,
            },
            strong_punch:{
                img:load_sprite("/resources/chars/Default/strongpunch_4x17x60.svg"),
                frames:69,
                rows:4,
                cols:17,
            },
            jump:{
                img:load_sprite("/resources/chars/Default/jump_4x13x40.svg"),
                frames:40,
                rows:4,
                cols:13,
            },
            jumping_in_air:{
                img:load_sprite("/resources/chars/Default/jumpinair_4x10x40.svg"),
                frames:40,
                rows:4,
                cols:13,
            },
            jumping_in_air:{
                img:load_sprite("/resources/chars/Default/jumpinair_4x10x40.svg"),
                frames:40,
                rows:4,
                cols:13,
            },
            air_kick:{
                img:load_sprite("/resources/chars/Default/airkick_4x14x50.svg"),
                frames:40,
                rows:4,
                cols:13,
            },
            damage:{
                img:load_sprite("/resources/chars/Default/damage_3x20x60.svg"),
                frames:40,
                rows:4,
                cols:13,
            },
            walk:{
                img:load_sprite("/resources/chars/Default/walkcicle_6x15x90.svg"),
                frames:40,
                rows:4,
                cols:13,
            },
        }

        return sprites
}