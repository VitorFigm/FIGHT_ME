///this modules is to a way we rename and change path of modules without problems in the whole code


import {keyboard,key_events} from "./resources/javascript/keyboard.js"
export {keyboard,key_events};

    ///char_actions
        //default
        import {Default} from "./resources/javascript/char_actions/default/default.js"
        export {Default};

        import {default_loading_all_sprites} from "./resources/javascript/char_actions/default/default_animations.js"
        export {default_loading_all_sprites};
        
    import {actions_obj} from "./resources/javascript/char_actions/main_object.js"
    export {actions_obj};
    

    import {load_sprite} from "./resources/javascript/char_actions/load_sprites.js"
    export {load_sprite}

    ///classes
    import {Char} from "./resources/javascript/classes/char.js"
    export {Char}

    import {Enemy} from "./resources/javascript/classes/enemy.js"
    export {Enemy} 

    import {Player} from "./resources/javascript/classes/player.js"
    export {Player}

    ///game_logic
    import {arena_limit} from "./resources/javascript/game_logic/arena_limit.js"
    export {arena_limit}

    import {colision} from "./resources/javascript/game_logic/colisions.js"
    export {colision}

    import {velocity_logic,posChange} from "./resources/javascript/game_logic/position_function.js"
    export {velocity_logic,posChange}
   

    import {canvas_draw} from "./resources/javascript/game_logic/draw_in_canvas.js"
    export {canvas_draw}

        ///fight
        import {fight_P2P_colision_attack_loop} from "./resources/javascript/game_logic/fight/fight_colision_and_attacks.js"
        export {fight_P2P_colision_attack_loop}

        import {Fight} from "./resources/javascript/game_logic/fight/fight.js"
        export {Fight}

        import {change_dir} from "./resources/javascript/game_logic/fight/change_direction.js"
        export {change_dir}

