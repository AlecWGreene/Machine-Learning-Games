var t_string = "[";
for(let i = 0; i < 26; i++){
    t_string += "[";
    for(let j = 0; j < 29; j++){
        (j < 28) ? t_string += ", " : " ";
    }
    (i < 25) ? t_string += "]," : " ";
}
t_string += "]";

console.log(pacman_map);