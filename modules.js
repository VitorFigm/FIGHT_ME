///this modules is to a way we rename and change path of modules without problems in the whole code

import {keyboard,key_events} from "/Fight_Game/resources/javascript/keyboard.js"
export {keyboard,key_events};

    ///char_actions
        //default
        import {Default} from "/Fight_Game/resources/javascript/char_actions/default/default.js"
        export {Default};

        import {default_loading_all_sprites} from "/Fight_Game/resources/javascript/char_actions/default/default_animations.js"
        export {default_loading_all_sprites};
        
    import {actions_obj} from "/Fight_Game/resources/javascript/char_actions/__main_object.js"
    export {actions_obj};
    

    import {load_sprite} from "/Fight_Game/resources/javascript/char_actions/load_sprites.js"
    export {load_sprite}

    ///classes
    import {Char} from "/Fight_Game/resources/javascript/classes/_char.js"
    export {Char}

    import {Enemy} from "/Fight_Game/resources/javascript/classes/enemy.js"
    export {Enemy} 

    import {Player} from "/Fight_Game/resources/javascript/classes/player.js"
    export {Player}

    ///game_logic
    import {arena_limit} from "/Fight_Game/resources/javascript/game_logic/arena_limit.js"
    export {arena_limit}

    import {colision} from "/Fight_Game/resources/javascript/game_logic/colisions.js"
    export {colision}

    import {velocity_logic,posChange} from "/Fight_Game/resources/javascript/game_logic/position_function.js"
    export {velocity_logic,posChange}
   

    import {canvas_draw} from "/Fight_Game/resources/javascript/game_logic/draw_in_canvas.js"
    export {canvas_draw}

        ///fight
        import {fight_P2P_colision_attack_loop} from "/Fight_Game/resources/javascript/game_logic/fight/fight_colision_and_attacks.js"
        export {fight_P2P_colision_attack_loop}

        import {Fight} from "/Fight_Game/resources/javascript/game_logic/fight/fight.js"
        export {Fight}

        import {change_dir} from "/Fight_Game/resources/javascript/game_logic/fight/change_direction.js"
        export {change_dir}

