///this modules is to a way we rename and change path of modules without problems in the whole code


import {keyboard,key_events} from "./resources/javascript/keyboard.js"
export {keyboard,key_events};

    ///character_actions
        //default
        import {defaultActions} from "./resources/javascript/char_actions/default/defaultActions.js"
        export {defaultActions};

        import {default_loading_all_sprites} from "./resources/javascript/char_actions/default/default_animations.js"
        export {default_loading_all_sprites};
    
    ///classes
    import {Character} from "./resources/javascript/classes/Character.js"
    export {Character}

    import {Enemy} from "./resources/javascript/classes/enemy.js"
    export {Enemy} 

    import {Player} from "./resources/javascript/classes/player.js"
    export {Player}

    ///game_logic
    import {limitCharacter_to_arenaWidth} from "./resources/javascript/game_logic/arena_limit.js"
    export {limitCharacter_to_arenaWidth}

    import {checkColision} from "./resources/javascript/game_logic/colisions.js"
    export {checkColision}

    import {velocityLogic,positionChange,changeDirection} from "./resources/javascript/game_logic/position_function.js"
    export {velocityLogic,positionChange, changeDirection}
   

    import {canvas_draw} from "./resources/javascript/game_logic/draw_on_canvas.js"
    export {canvas_draw}

        ///fight
        import {fight_P2P_colision} from "./resources/javascript/game_logic/fight/fight_colision.js"
        export {fight_P2P_colision}

        import {Fight} from "./resources/javascript/game_logic/fight/fight.js"
        export {Fight}

