const submit = document.querySelector(".submit");
const input = document.querySelector("#search");
const notification = document.querySelector(".notification");
const responceCountry = document.querySelector(".response-country");
const lastSearched = document.querySelector(".grid");
const clearAll = document.querySelector(".clear-all-button");



window.addEventListener("load",getFromLocalStorage);
clearAll.addEventListener("click",clearLocalstorage);
submit.addEventListener('click', ()=>{


    if(input.value ===""){
        notification.textContent = "No Country Searched "
        setTimeout(() => {
            notification.textContent = "";
        }, 2000);
    } 

    const country =input.value;
    const url = `https://restcountries.eu/rest/v2/name/${country}`
    
    function fetchData(){
            
            fetch(url)
                .then(response => {
                    if(!response.ok){
                        throw error("error")
                    }
                    return response.json();
                })
                .then(data => {
                    renderCountry(data);
                    
                })
                .catch(error => {
                    console.log(error);
                    
        });
    }
    input.value = ''
    fetchData()
    const renderCountry=(country)=>{

        
        // localStorage.setItem('data',lastSearch);

        let flag= country[0].flag;
        let name = country[0].name;
        let capital = country[0].capital;
        let area = country[0].area;
        let population = country[0].population;
        let language = country[0].languages[0].name;
        let currency = country[0].currencies[0].name;
        
        
        const populationToMilions = numFormatter(population);

        // console.log(flag,name,capital,area,population,language,currency);

        let renderCountry = `<div class="country">
                                <img class="flag" src="${flag}" >
                                <h1 class="name">${name}</h1>
                                <h2 class="capital">${capital}</h2>
                                <div class="country-data">
                                    <div class="population">
                                        <img src="./Images/population.png">
                                        <h3>${populationToMilions}</h3>
                                    </div>
                                    <div class="area">
                                        <img src="./Images/area.png">
                                        <h3>${area+"km2"}</h3>
                                    </div>
                                    <div class="language">
                                        <img src="./Images/translate.png">
                                        <h3>${language}</h3>
                                    </div>
                                    <div class="curency">
                                        <img src="./Images/money.png">
                                        <h3>${currency}</h3>
                                    </div>
                                </div>
                            </div>`

        responceCountry.innerHTML = renderCountry;
        
        countryObject={ 
            flag:flag,
            name:name,
            capital:capital,
            area:area,
            population:population,
            language:language,
            currency:currency
        }
        updateLocalStorage(countryObject);
    }
  
});

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M';
    }else if(num < 900){
        return num; 
    }
}

function updateLocalStorage(value){
    

    let tasks;

    let exist = localStorage.getItem('tasks')

    if(exist === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(value)

    localStorage.setItem('tasks', JSON.stringify(tasks))
    getFromLocalStorage()

}

function getFromLocalStorage(){
    let exist = localStorage.getItem('tasks')

    
    if(exist){
        let localStorageItems = JSON.parse(localStorage.getItem('tasks'));
        

        lastSearched.innerHTML = localStorageItems
            .map(item=>  `<div class="country last">
                            <img class="flag" src="${item.flag}" >
                            <h1 class="name">${item.name}</h1>
                            <h2 class="capital">${item.capital}</h2>
                            <div class="country-data">
                                <div class="population">
                                    <img src="./Images/population.png">
                                    <h3>${numFormatter(item.population)}</h3>
                                </div>
                                <div class="area">
                                    <img src="./Images/area.png">
                                    <h3>${item.area}</h3>
                                </div>
                                <div class="language">
                                    <img src="./Images/translate.png">
                                    <h3>${item.language}</h3>
                                </div>
                                <div class="curency">
                                    <img src="./Images/money.png">
                                    <h3>${item.currencies}</h3>
                                </div>
                            </div>
                        </div>`
    
            ).join('')

    }
    
}

function clearLocalstorage(){
    localStorage.removeItem('tasks');
    
    const lastSearched = document.querySelectorAll(".last")
    if(lastSearched.length>0){
        lastSearched.forEach(item=>item.remove())
    }
    
}

