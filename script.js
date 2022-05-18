window.onload = function(){
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d"); //é onde fica a parte visual do programa
    
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);  //função jogo atualiza a cada 60ms
    
    const vel = 1;  //quantas casas a cobra anda a cada chamada da função jogo
    var vx = vy = 0;  //velocidades que a cobra inicia o jogo (ou seja, parada)
    var px = py = 10; //pontos no canvas em que a cobra inicia o jogo
    var apple_x = apple_y = 15; //pontos no canvas em que a maçã inicia o jogo
    
    var tam_p = 20;   //tamanho das peças que tem no canvas
    var qt_p = 20; //qtd de peças que tem no canvas
    
    var trail = [] //rastro da minha cobra
    tail = 5;   //tamanho inicial do rabo da cobra


    function game(){
        //sempre que a função for chamada, eu preciso atualizar a posição da cabeça da cobra
        px += vx 
        py += vy

        //caso a cobra colida com as paredes, ela atravessa pro outro lado
        if(px < 0){     //colide com a esquerda
            px = qt_p - 1;
        }
        else if(px > qt_p-1){    //colide com a direita
            px = 0;
        }
        else if(py < 0){       //colidiu com baixo
            py = qt_p-1;
        }
        else if(py > qt_p-1){      //colidiu com cima
            py = 0;
        }



        ctx.fillStyle = "black"     //cor do fundo do canvas
        ctx.fillRect(0,0, stage.width, stage.height);

        ctx.fillStyle = "red"       //cor da maça
        ctx.fillRect(apple_x*tam_p, apple_y*tam_p, tam_p, tam_p);

        ctx.fillStyle = "gray"      //cor da cobra
        for(var i=0; i<trail.length; i++){
            ctx.fillRect(trail[i].x*tam_p, trail[i].y*tam_p, tam_p-1, tam_p-1);
            
            if(trail[i].x == px && trail[i].y == py){   //se cabeça ta batendo nela msm
                vx = vy = 0;
                tail = 5
            }
        }

        trail.push({ x:px, y:py })
        while(trail.length > tail){
            trail.shift();
        }

        if (apple_x == px && apple_y == py){
            tail++;
            apple_x = Math.floor(Math.random()*qt_p);
            apple_y = Math.floor(Math.random()*qt_p);
        }

    }

    function keyPush(event){
        switch(event.keyCode){
            case 37:    //left
                vx = -vel;
                vy = 0;
                break;
            case 38:    //up
                vx = 0;
                vy = -vel;
                break;
            case 39:    //right
                vx = vel;
                vy = 0;
                break;
            case 40:    //down
                vx = 0;
                vy = vel;
                break;
            default: 
                break;
        }
    }

}