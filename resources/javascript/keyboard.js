///show if a key is pressed or not and the key that we need to press to do the action

export const keyboard = {}

export function key_events(){
    window.onkeydown = (e)=>{
        keyboard[e.keyCode] = "press"
    }

    window.onkeyup = (e)=>{
        keyboard[e.keyCode] = "release"
    }
 
}