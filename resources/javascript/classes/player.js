import {Character} from '/FIGHT_ME/modules.js'

import {keyboard} from '/FIGHT_ME/modules.js'


export class Player extends Character{
    constructor(args, patern='Default'){
        super(args,patern)

        this.main_loop = ()=>{ 
            this.keyboard_action_loop()
        }
        
    }
    keyboard_action_loop = () =>{
        if(this.can_move){
            ///keyboard actions
            for(let i in keyboard)
            ///if key of the action i is pressed, calls the funtion of that action
            if(keyboard[i]!=undefined){
                let action = this.actions.action_of_key[i] ///gets the name of the action of the key
                if(action!=undefined)
                this.actions[action]( this , keyboard[i] )  //calls the function of the action
                if(keyboard[i] =="release")keyboard[i] = undefined
            }
        }
    }

    
}




