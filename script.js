const search = () => {
    const input = document.getElementById('input-field');
    document.getElementById("search-result").textContent = '';
    document.getElementById('main-details').textContent = '';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;
    if (input.value === '') {

    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data))

    }
    input.value = '';
};

const displayResult = data => {
    const resultUi = document.getElementById("search-result");
    data.drinks.forEach(singleResult => {
        const result = document.createElement('div');
        result.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${singleResult.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${singleResult.strDrink}</h5>
                    <p class="card-text">${singleResult.strInstructions.slice(0, 100)}</p>
                </div>
                <a onclick='details(${singleResult.idDrink})' class="btn btn-primary">Details</a>
            </div>
        </div>
        `;
        resultUi.appendChild(result);
    });
};

const details = data => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.drinks[0]))
};

const showDetails = details => {
    const mainDetails = document.getElementById('main-details');
    modalVisibility('visible')
    mainDetails.innerHTML = `
    <div class="card mb-3 mx-auto" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${details.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${details.strDrink}</h5>
                <h6 class="card-title">Category: ${details.strCategory}</h6>
                <p class="card-text">${details.strInstructions}</p>
            </div>
            </div>
        </div>
        <button onclick="modalVisibility('hidden')" class="btn btn-primary">Close</button>
    </div>
    `;
};
const modalVisibility = data => {
    document.getElementById('modal-bg').style.visibility = data;
}