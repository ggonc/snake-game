window.onload = function(){
    let stage = document.getElementById("stage");
    let ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush); // Fica esperando um evento acontecer
    setInterval(game, 100);

    const vel = 1;

    let vx = vy = 0; // Velocidade inicial da cobra
    let px = py = 10; // Posição inicial da cobra
    let tamanhoCasas = 20; // Define o tamanho de cada quadrado no tabuleiro (20px x 20 px)
    let quantidadeCasas = 20; // Define a quantidade de quadrados no tabuleiro
    let applex = 15; // Posição inicial X da maçã
    let appley = 15; // Posição inicial y da maçã
    
    let trail = []; // Define o rastro
    tail = 5;   // Define o tamanho da cauda

    function game(){
        px += vx;
        py += vy;
        // Esses ifs permitem a cobra aparecer do outro lado do tabuleiro caso atinja a parede
        if(px < 0){
            px = quantidadeCasas - 1;
        }
        if(px > quantidadeCasas - 1){
            px = 0;
        }
        if(py < 0){
            py = quantidadeCasas - 1;
        }
        if(py > quantidadeCasas - 1){
            py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(applex*tamanhoCasas, appley*tamanhoCasas, tamanhoCasas, tamanhoCasas);

        ctx.fillStyle = "gray";
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tamanhoCasas, trail[i].y*tamanhoCasas, tamanhoCasas, tamanhoCasas);
            if (trail[i].x == px && trail[i].y == py){ // Verifica se a cobre encosta nela mesma (Game Over)
                vx = vy = 0;
                tail = 5;
                px = py = 10;
            }
        }

        trail.push({x:px, y:py});
        //console.log(trail);
        while (trail.length > tail){
            trail.shift();
        }

        // Verifica se a cobra pegou a maçã. Caso sim, altera a maçã para uma posição aleatória
        if (applex == px && appley == py){
            tail++;
            applex = Math.floor(Math.random()*quantidadeCasas);
            appley = Math.floor(Math.random()*quantidadeCasas);
        }
    }

    function keyPush(event){
        switch (event.keyCode){
            case 37: // Left
            vx = -vel;
            vy = 0;
            break;
            case 38: // Up
            vx = 0;
            vy = -vel;
            break;
            case 39: // Right
            vx = vel;
            vy = 0;
            break;
            case 40: // Down
            vx = 0;
            vy = vel;
            break;
        }
    }
}