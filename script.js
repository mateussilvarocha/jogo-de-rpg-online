var atacar = document.getElementById('botao_atacar')
var buscarInimigo = document.getElementById('buscar_inimigo')
var loja = document.getElementById('loja')
var resultadoDiv = document.getElementById('resultado');
var vidaPersonagem = document.getElementById('vida');
var experienciaPersonagem= document.getElementById('experiencia');
var inventario = document.getElementById('inventario');
var pocao = document.getElementById('pocao');

var personagem = {
    'nome':'Personagem',
    'vida': 100,
    'dano':10,
    'experiencia':0,
    'inventario':{
        'moedas':0,
        'pocao':0,
        'espada':{}
    },
    'nivel': 1,
    'experienciaParaNivel': 100
};

function updatePersonagem() {
    if (personagem !== null) {
        vidaPersonagem.innerHTML = `Sua vida: ${personagem.vida}`;
        experienciaPersonagem.innerHTML = `Nível: ${personagem.nivel} (${personagem.experiencia}/${personagem.experienciaParaNivel})`;
        if(personagem.inventario.espada.hasOwnProperty('dano')){
            inventario.innerHTML = `Inventario: <br>
            Moedas ${personagem.inventario.moedas} <br>
            Dano de Espada ${personagem.inventario.espada.dano} <br>
            Poção ${personagem.inventario.pocao}`
        }else{
            inventario.innerHTML = `Inventario: 
            Moedas ${personagem.inventario.moedas} <br>
            Poção ${personagem.inventario.pocao}`
        }
    }
}

updatePersonagem()

function upar() {
    while(personagem.experiencia >= personagem.experienciaParaNivel) {
        personagem.experiencia -= personagem.experienciaParaNivel;
        personagem.nivel += 1;
        personagem.dano += personagem.nivel * personagem.dano
        personagem.vida = 100 * personagem.nivel;
        personagem.experienciaParaNivel = personagem.nivel * 100;
    }
}

buscarInimigo.addEventListener('click', function(){
    inimigo = {
        nome: 'Inimigo',
        vida: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
        dano: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        experiencia: Math.floor(Math.random() * (1000 - 100 + 1)) + 100
    };
    inimigo.moedas = inimigo.experiencia / inimigo.vida - inimigo.dano;

    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `Você encontrou um ${inimigo.nome} com ${inimigo.vida} de vida e ${inimigo.dano} de dano.`;

});

//Button Recomeçar
var button = document.createElement("button");
button.innerText = "Recomeçar";
button.addEventListener("click", function() {
    personagem = {
        'nome':'Personagem',
        'vida': 100,
        'dano':10,
        'experiencia':0,
        'inventario':{
            'moedas':0,
            'pocao':0,
            'espada':{}
    },
        'nivel': 1,
        'experienciaParaNivel': 100
    };

});

atacar.addEventListener('click', function() {
    if (personagem !== null && inimigo !== null){
        if(inimigo.vida && personagem.vida > 0){
            let persDano;
            if(personagem.inventario.espada.hasOwnProperty('dano')){
                persDano = personagem.dano + personagem.inventario.espada.dano;
            }else{
                persDano = personagem.dano
            }

            inimigo.vida -= persDano;
            personagem.vida -= inimigo.dano;
            

            if (inimigo.vida <= 0){
                resultadoDiv.innerHTML = `Você derrotou um ${inimigo.nome} e ganhou ${inimigo.experiencia} de experiencia, e ${inimigo.moedas} de moedas!`;
                personagem.experiencia += inimigo.experiencia;
                personagem.inventario.moedas += inimigo.moedas
                upar()
                inimigo = null;
                

            }else if(personagem.vida <= 0){
                resultadoDiv.innerHTML = `Você morreu, volte ao jogo clicando em recomeçar!`;
                document.getElementById("container").appendChild(button);
                personagem = null;
            }else {
                resultadoDiv.innerHTML = `Você atacou o ${inimigo.nome}! Vida do Inimigo: ${inimigo.vida}.`;
            };
        };
        updatePersonagem();
    };
});

function comprar(item){
    if (item == 'pocao'){
        if (personagem.inventario.moedas >= 5){
            personagem.inventario[item] += 1;
            personagem.inventario.moedas -= 5;
        }else{
            console.log('Você tem poucas moedas');
        };

    }else if(item == 'espada'){
        if (personagem.inventario.moedas >= 15){
            if(personagem.inventario.espada.hasOwnProperty('dano')){
                personagem.inventario.item.dano + 5;
                personagem.inventario.moedas -= 15;

            }else{
                personagem.inventario[item] = {'dano':5};
                personagem.inventario.moedas -= 15;

            }
        }else{
            console.log('Você tem poucas moedas');
        }
    }
    updatePersonagem() 
}

loja.addEventListener('click',function(){
    resultadoDiv.innerHTML = `
    Poção <input type="button" value="Comprar" onclick="comprar('pocao')"> <br>
    Espada <input type="button" value="Comprar" onclick="comprar('espada')"> <br>
    `;
                
});

pocao.addEventListener('click', function(){
    if (personagem.inventario.pocao > 0){
    resultadoDiv.innerHTML += 'usou 1 poção<br>'
    personagem.inventario.pocao -= 1
    personagem.vida += 25
    }else {
        console.log('Você não tem poção')
    };
});

