export function limitCharacter_to_arenaWidth(character,arenaWidth){
    if(character.x<0){
        character.x=0;
        character.Vx =0
    }
    if(character.x>arenaWidth-character.width){
        character.x=arenaWidth-character.width;
        character.Vx =0
    }

    if(character.y>0){ //Blocks go through the ground
        character.y=0
        character.Vy = 0;
    }
}