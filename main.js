//nadefinování proměnné, která je potřebná pro sestavení url adresy, ze které  se získávají data o počasí
const api = {
    key: "ffc776ac72e238e24e81b8201fc0b9a1",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

//Získání řetězce z vyhledávače
const vyhledavani = document.querySelector('.vyhledavani');
vyhledavani.addEventListener('keypress', setQuery);
//volání finkce, která získá informace o počasí v daném městě
function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(vyhledavani.value);
        //console.log(vyhledavani.value);
        //Kontrola, zda název již není v poli.
        if(!pamet.includes(vyhledavani.value)){
            pamet.push(vyhledavani.value);//Pokud ne, vloží se název do pole.
            localStorage.setItem("pole", pamet);//Pole je uloženo do localStorage
            displayHist();//Volána funkce pro zobrazení historie
        }
        
    }
    
}
let pamet = new Array();//Pole, do kterého se ukládají názvy měst.
let tmp = localStorage.getItem("pole");//Pole, do kterého se načítají data z localstorage
//Kontorla, zda je pole tmp obsazeno nějakými daty.
if(tmp){
    pamet = tmp.split(",");//Pokud ano, pole je upraveno na podobu, se kterou je možné pracovat. 
}
//Funkce pro zobrazení historie
function displayHist(){
    document.getElementById("historie").innerHTML = null;
    //Ciklus, který prochází pole, kde jsou uložena města a vypisuje je.
    for(var i = 0; i < pamet.length; i++)
    {
        //console.log("Obsah pole");
        //console.log(pamet[i]);
        document.getElementById("historie").innerHTML = document.getElementById("historie").innerHTML + pamet[i] + "<br>";
    }
}
//Volání funkce zobrazení historie
displayHist();   
//Uložení pole s uloženými městy do localStorage.
localStorage.setItem("pole", pamet);

//Podmínka, která zobrzí poslední vyhledávané město ve vyhledávači po opětovném načtení stránky
if(localStorage.getItem("posledni") != null){
    var reload = document.querySelector('#zadani');
    reload.value = localStorage.getItem("posledni");//Vypíše název města
    getResults(reload.value);//Zobrazí předpověď pro dané město
}
 

//Funkce získá data o počasí a uloží je do proměnné data
function getResults(mesto){
    
    fetch(`${api.baseurl}forecast?q=${mesto}&units=metric&APPID=${api.key}`)
        .then(data => {
            return data.json();
        }).then(displayResults);
    
    
}
//Funkce pro zobrazování dat v aplikaci
function displayResults(data){
    //Vypýše souhrn dat o počasí v požadovaném městě do konzole
    
    

    
    console.log(data);
    
    //Vypíše název města do aplikace
    var mesto = document.querySelector('.lokace .mesto');
    mesto.innerText = `${data.city.name}`;
    //Vypsání datumu v češtině
    var mesice = ["", " leden", " únor", " březen", " duben", " květen", " červen", " červenec", " srpen", " září", " říjen", " listopad", " prosinec"];

    var dat = data.list[0].dt_txt.substr(8, 2);

    var mesic;
    var index_mesic = data.list[0].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesic){
            mesic = mesice[i];
        }
    }

    var rok = data.list[0].dt_txt.substr(0, 4);


    var datum = document.querySelector('.lokace .datum');
    datum.innerText = dat + "." + mesic + " " + rok;
    //Vypsání aktuální teploty v češtině
    var teplota = document.querySelector('.aktualni .teplota');
    teplota.innerHTML = `${Math.round(data.list[0].main.temp).toFixed(0)}<span>°C</span>`;

    
    
    //Zobrazí obrázek počasí podle aktuální předpovědi
    var pocasi = document.querySelector('.aktualni .pocasi');
    pocasi.innerHTML = `<img src="obrazky/${data.list[0].weather[0].icon}.png"></img>`;
    //Vypíše minimální a maximání naměřené hodnoty
    var extremy = document.querySelector('.extremy');
    extremy.innerHTML = `${Math.round(data.list[0].main.temp_min)}°C / ${Math.round(data.list[0].main.temp_max)}°C`;

    
    //vypsání informací o počasí 3 hodiny později
    var datI = data.list[1].dt_txt.substr(8, 2);

    var mesicI;
    var index_mesicI = data.list[1].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicI){
            mesicI = mesice[i];
        }
    }

    var datum1 = document.querySelector('.dlouhodoba .blok .datum1');
    datum1.innerText = datI + "." + mesicI;

    var cas1 = document.querySelector('.dlouhodoba .blok .cas1');
    cas1.innerText = data.list[1].dt_txt.substr(11, 5);

    var teplota1 = document.querySelector('.dlouhodoba .blok .teplota1');
    teplota1.innerHTML = `${Math.round(data.list[1].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi1 = document.querySelector('.dlouhodoba .blok .pocasi1');
    pocasi1.innerHTML = `<img src="obrazky/${data.list[1].weather[0].icon}.png"></img>`;

    //Výpis informací o počasí o 6 hodin později
    var datII = data.list[2].dt_txt.substr(8, 2);

    var mesicII;
    var index_mesicII = data.list[2].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicII){
            mesicII = mesice[i];
        }
    }

    var datum2 = document.querySelector('.dlouhodoba .blok .datum2');
    datum2.innerText = datII + "." + mesicII;

    var cas2 = document.querySelector('.dlouhodoba .blok .cas2');
    cas2.innerText = data.list[2].dt_txt.substr(11, 5);

    var teplota2 = document.querySelector('.dlouhodoba .blok .teplota2');
    teplota2.innerHTML = `${Math.round(data.list[2].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi2 = document.querySelector('.dlouhodoba .blok .pocasi2');
    pocasi2.innerHTML = `<img src="obrazky/${data.list[2].weather[0].icon}.png"></img>`;

    //Výpis informací o počasí o 9 hodin později
    var datIII = data.list[3].dt_txt.substr(8, 2);

    var mesicIII;
    var index_mesicIII = data.list[3].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicIII){
            mesicIII = mesice[i];
        }
    }

    var datum3 = document.querySelector('.dlouhodoba .blok .datum3');
    datum3.innerText = datIII + "." + mesicIII;

    var cas3 = document.querySelector('.dlouhodoba .blok .cas3');
    cas3.innerText = data.list[3].dt_txt.substr(11, 5);

    var teplota3 = document.querySelector('.dlouhodoba .blok .teplota3');
    teplota3.innerHTML = `${Math.round(data.list[3].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi3 = document.querySelector('.dlouhodoba .blok .pocasi3');
    pocasi3.innerHTML = `<img src="obrazky/${data.list[3].weather[0].icon}.png"></img>`;

    //Výpis informací o 12 hodin později
    var datIV = data.list[4].dt_txt.substr(8, 2);

    var mesicIV;
    var index_mesicIV = data.list[4].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicIV){
            mesicIV = mesice[i];
        }
    }

    var datum4 = document.querySelector('.dlouhodoba .blok .datum4');
    datum4.innerText = datIV + "." + mesicIV;

    var cas4 = document.querySelector('.dlouhodoba .blok .cas4');
    cas4.innerText = data.list[4].dt_txt.substr(11, 5);

    var teplota4 = document.querySelector('.dlouhodoba .blok .teplota4');
    teplota4.innerHTML = `${Math.round(data.list[4].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi4 = document.querySelector('.dlouhodoba .blok .pocasi4');
    pocasi4.innerHTML = `<img src="obrazky/${data.list[4].weather[0].icon}.png"></img>`;

    //Výpis informací o 15 hodin později
    var datV = data.list[5].dt_txt.substr(8, 2);

    var mesicV;
    var index_mesicV = data.list[5].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicV){
            mesicV = mesice[i];
        }
    }

    var datum5 = document.querySelector('.dlouhodoba .blok .datum5');
    datum5.innerText = datV + "." + mesicV;

    var cas5 = document.querySelector('.dlouhodoba .blok .cas5');
    cas5.innerText = data.list[5].dt_txt.substr(11, 5);

    var teplota5 = document.querySelector('.dlouhodoba .blok .teplota5');
    teplota5.innerHTML = `${Math.round(data.list[5].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi5 = document.querySelector('.dlouhodoba .blok .pocasi5');
    pocasi5.innerHTML = `<img src="obrazky/${data.list[5].weather[0].icon}.png"></img>`;

    //Výpis informací o 18 hodin později
    var datVI = data.list[6].dt_txt.substr(8, 2);

    var mesicVI;
    var index_mesicVI = data.list[6].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicVI){
            mesicVI = mesice[i];
        }
    }

    var datum6 = document.querySelector('.dlouhodoba .blok .datum6');
    datum6.innerText = datVI + "." + mesicVI;

    var cas6 = document.querySelector('.dlouhodoba .blok .cas6');
    cas6.innerText = data.list[6].dt_txt.substr(11, 5);

    var teplota6 = document.querySelector('.dlouhodoba .blok .teplota6');
    teplota6.innerHTML = `${Math.round(data.list[6].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi6 = document.querySelector('.dlouhodoba .blok .pocasi6');
    pocasi6.innerHTML = `<img src="obrazky/${data.list[6].weather[0].icon}.png"></img>`;

    //Výpis informací o 21 hodin později
    var datVII = data.list[7].dt_txt.substr(8, 2);

    var mesicVII;
    var index_mesicVII = data.list[7].dt_txt.substr(5, 2);
    for(i = 0; i <= mesice.length; i++){
        if(i == index_mesicVII){
            mesicVII = mesice[i];
        }
    }

    var datum7 = document.querySelector('.dlouhodoba .blok .datum7');
    datum7.innerText = datVII + "." + mesicVII;

    var cas7 = document.querySelector('.dlouhodoba .blok .cas7');
    cas7.innerText = data.list[7].dt_txt.substr(11, 5);

    var teplota7 = document.querySelector('.dlouhodoba .blok .teplota7');
    teplota7.innerHTML = `${Math.round(data.list[7].main.temp).toFixed(0)}<span>°C</span>`;

    var pocasi7 = document.querySelector('.dlouhodoba .blok .pocasi7');
    pocasi7.innerHTML = `<img src="obrazky/${data.list[7].weather[0].icon}.png"></img>`;
    //historie
    //Uložení posledního hledaného města do localStorage
    localStorage.setItem("posledni",vyhledavani.value);

    
   //console.log("Ulozeni pole");
  
    
}





