///this modules is to a way we rename and change path of modules without problems in the whole code

import {keyboard,key_events} from "/resources/javascript/keyboard.js"
export {keyboard,key_events};

    ///char_actions
    import {Default} from "/resources/javascript/char_actions/default.js"
    export {Default};
    import {actions_obj} from "/resources/javascript/char_actions/__main_object.js"
    export {actions_obj};
    

    import {load_sprite} from "/resources/javascript/char_actions/load_sprites.js"
    export {load_sprite}

    ///classes
    import {Char} from "/resources/javascript/classes/_char.js"
    export {Char}

    import {Enemy} from "/resources/javascript/classes/enemy.js"
    export {Enemy} 

    import {Player} from "/resources/javascript/classes/player.js"
    export {Player}

    ///game_logic
    import {arena_limit} from "/resources/javascript/game_logic/arena_limit.js"
    export {arena_limit}
    
    import {P2P_colision_attack_loop} from "/resources/javascript/game_logic/colision_and_attacks.js"
    export {P2P_colision_attack_loop}

    import {canvas_draw} from "/resources/javascript/game_logic/draw_in_canvas.js"
    export {canvas_draw}

        ///main
        import {Fight} from "/resources/javascript/game_logic/main/fight.js"
        export {Fight}

