///this modules is to a way we rename and change path of modules without problems in the whole code

import {keyboard,key_events} from "/[repo]/resources/javascript/keyboard.js"
export {keyboard,key_events};

    ///char_actions
        //default
        import {Default} from "/[repo]/resources/javascript/char_actions/default/default.js"
        export {Default};

        import {default_loading_all_sprites} from "/[repo]/resources/javascript/char_actions/default/default_animations.js"
        export {default_loading_all_sprites};
        
    import {actions_obj} from "/[repo]/resources/javascript/char_actions/__main_object.js"
    export {actions_obj};
    

    import {load_sprite} from "/[repo]/resources/javascript/char_actions/load_sprites.js"
    export {load_sprite}

    ///classes
    import {Char} from "/[repo]/resources/javascript/classes/_char.js"
    export {Char}

    import {Enemy} from "/[repo]/resources/javascript/classes/enemy.js"
    export {Enemy} 

    import {Player} from "/[repo]/resources/javascript/classes/player.js"
    export {Player}

    ///game_logic
    import {arena_limit} from "/[repo]/resources/javascript/game_logic/arena_limit.js"
    export {arena_limit}

    import {colision} from "/[repo]/resources/javascript/game_logic/colisions.js"
    export {colision}

    import {velocity_logic,posChange} from "/[repo]/resources/javascript/game_logic/position_function.js"
    export {velocity_logic,posChange}
   

    import {canvas_draw} from "/[repo]/resources/javascript/game_logic/draw_in_canvas.js"
    export {canvas_draw}

        ///fight
        import {fight_P2P_colision_attack_loop} from "/[repo]/resources/javascript/game_logic/fight/fight_colision_and_attacks.js"
        export {fight_P2P_colision_attack_loop}

        import {Fight} from "/[repo]/resources/javascript/game_logic/fight/fight.js"
        export {Fight}

        import {change_dir} from "/[repo]/resources/javascript/game_logic/fight/change_direction.js"
        export {change_dir}

