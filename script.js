var atacar = document.getElementById('botao_atacar')
var buscarInimigo = document.getElementById('buscar_inimigo')
var loja = document.getElementById('loja')
var resultadoDiv = document.getElementById('resultado');
var vidaPersonagem = document.getElementById('vida');
var experienciaPersonagem= document.getElementById('experiencia');

var personagem = {
    'nome':'Personagem',
    'vida': 100,
    'dano':10,
    'experiencia':0,
    'nivel': 1,
    'experienciaParaNivel': 100
};

function updatePersonagem() {
    if (personagem !== null) {
        vidaPersonagem.innerHTML = `Sua vida: ${personagem.vida}`;
        experienciaPersonagem.innerHTML = `Nível: ${personagem.nivel} (${personagem.experiencia}/${personagem.experienciaParaNivel})`;
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
        'nome':'Inimigo',
        'vida': Math.floor(Math.random() * (100 - 10 + 1)) + 10,
        'dano': Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        'experiencia': Math.floor(Math.random() * (1000 - 100 + 1)) + 100
    }
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
        'nivel': 1
    };

});

atacar.addEventListener('click', function() {
    if (personagem !== null && inimigo !== null){
        if(inimigo.vida && personagem.vida > 0){
            inimigo.vida -= personagem.dano;
            personagem.vida -= inimigo.dano;
            

            if (inimigo.vida <= 0){
                resultadoDiv.innerHTML = `Você derrotou um ${inimigo.nome} e ganhou ${inimigo.experiencia}!`;
                personagem.experiencia += inimigo.experiencia;
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
        updatePersonagem()
    };
});