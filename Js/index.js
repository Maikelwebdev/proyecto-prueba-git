//Declaraciones y llamadas
let nav2Coins = document.querySelector('#nav2Coins');
let selectCoins = document.querySelector('#selectCoins');
const url = "https://api.nomics.com/v1/currencies/ticker?key=fb5b5c9e8fcfcff6f3f853406e6d5d0006e3f10a";
var coinId;
// &ids=BTC,ETH,IOT

//intervalo se ceba de los datos de un estado

//rellenamos el select con las coins
fetch(url)
    .then(response => response.json())
    .then(data => rellenarSelect(data));


//Funcion rellenar Select donde se crea el evento de onchange
function rellenarSelect(data) {
    //rellenamos el select con una coin en cada option
    for (const coin of data) {
        let opcionCoin = document.createElement('option');
        opcionCoin.textContent = coin.id;
        selectCoins.append(opcionCoin);
    }

    setTimeout(() => {
        [{ id: coinId }] = data
        llamarCoin(coinId);
    }, 1000);

    //añadimos el evento para que llame a la coin
    selectCoins.addEventListener('change', (e) => {
        coinId = e.target.value;
        llamarCoin(coinId)
    })

    setInterval(getCoinById, 2000);
}

function getCoinById() {
    if (!coinId) {
        return;
    }
    llamarCoin(coinId);
}

//Fetch a la coin seleccionada y luego llamada a la funcion de muestra de la coin
function llamarCoin(coinId) {
    let filtro = "&ids=" + coinId;

    fetch(url + filtro)
        .then(response => response.json())
        .then(data => mostrarCoin(data));

    console.log("Se esta haciendo fetch de:" + coinId);

}


//Funcion llamada desde el fetch donde se muestra la coin elegida
function mostrarCoin(data) {
    nav2Coins.textContent = "";
    for (const criptocoin of data) {
        //Crear div de la moneda
        let divCoin = document.createElement('div');
        divCoin.classList.add("divCoin");
        //id,precio y foto
        let idCripto = document.createElement('div');
        idCripto.textContent = criptocoin.name;
        let precioCriptoEnDolares = document.createElement('div');
        precioCriptoEnDolares.textContent = criptocoin.price.substring(0, 8) + " $/" + criptocoin.id;


        let precioDolaresCripto = document.createElement('div');
        precioDolaresCripto.textContent = (1 / criptocoin.price);
        precioDolaresCripto.textContent = precioDolaresCripto.textContent.substring(0, 10) + " " + criptocoin.id + "/$";

        let marcoImgCripto = document.createElement('div');
        let imgCripto = document.createElement('img');
        imgCripto.src = criptocoin.logo_url;
        imgCripto.style.width = "100px";
        imgCripto.style.height = "100px";
        marcoImgCripto.append(imgCripto);
        //append de la moneda al nav2Coins
        divCoin.append(idCripto, precioCriptoEnDolares, precioDolaresCripto, marcoImgCripto);
        nav2Coins.append(divCoin);
    }
}