import {Char} from '/modules.js'

import {actions_obj} from '/resources/javascript/char_actions/__main_object.js'

export class Enemy extends Char{
    loop_logic = ()=>{
        
    }
    constructor(args,pattern='Default'){

        let super_default_args = {x:60 , direction:1}

        super({...super_default_args,...args},pattern)
    }


    
}




