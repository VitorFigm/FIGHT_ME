import {Character} from process.env.BASE_URL+'/modules.js'

import {keyboard} from process.env.BASE_URL+'/modules.js'


export class Player extends Character{
    constructor(args, patern='default'){
        super(args,patern)

        this.toDo_onParentLoop = ()=>{ 
            this.keyboard_action_loop()
        }
        
    }
    keyboard_action_loop = () =>{
        if(this.can_move){
            ///keyboard actions
            for(let i in keyboard){
                ///if key of the action i is pressed, calls the funtion of that action
                if(keyboard[i]!=undefined){
                    let action = this.actions.action_of_key[i.toLowerCase()] ///gets the name of the action of the key
                    if(action!=undefined)
                    this.actions[action]( this , keyboard[i] )  //calls the function of the action
                    if(keyboard[i] =="release")keyboard[i] = undefined
                }}
        }
    }

    
}




