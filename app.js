const addButton = document.querySelector("header button");
const addMovieButton = document.querySelector(".btn--success");
const closeModalButton = document.querySelector(".btn--passive");
const inputs = document.querySelectorAll("input");
const addModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
let movies = [];


function toggleModal() {
    addModal.classList.toggle("visible");
    toggleBackdrop()
}

function closeAddModal() {
    toggleModal();
    clearInputs();
}

function toggleBackdrop() {
    backDrop.classList.toggle("visible");
}

function clearInputs() {
    for (const usrInput of inputs) {
        usrInput.value = "";
    }

}

function handleMovieAdd() {
    const title = inputs[0].value;
    const image = inputs[1].value;
    const rating = inputs[2].value;
    console.log(title, image, rating);
    if (
        title.trim() === "" ||
        image.trim() === "" ||
        rating.trim() === "" ||
        +rating < 1 ||
        +rating > 5
    ) {
        alert("Podaj poprawną wartość");
        return
    }

    const newMovie = {
        id: Math.random(),
        title,
        image,
        rating,
    };

    movies.push(newMovie);
    clearInputs();
    toggleModal();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating,
    );
}

function update() {
    if (movies.length === 0) {
        textBar.style.display = "block";
    } else {
        textBar.style.display = "none";
    }
}

function renderNewMovieElement(newMovie) {
    const {
        id,
        title,
        image,
        rating
    } = newMovie;
    const newMovieElement = document.createElement("li");
    const listRoot = document.getElementById("movie-list");
    newMovieElement.className = "movie-element";
    
    newMovieElement.innerHTML = `
    <div class="movie-element_image">
        <img src="${image}" alt="${title}">
    </div> 
    <div class = "movieElement_info"> 
    <button class="delete-button" >usuń</button>
    <h2>${title}</h2> 
    <p>${rating}/5star</p> 
    </div >
    `;
    
    
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id) );
    
    listRoot.append(newMovieElement);
}

function deleteMovieHandler(movieId) {

    const listRoot = document.getElementById("movie-list");
    let index = 0;
    const result = window.confirm("czy na pewno chcesz usunąć?")
    if (result) {
        for (const movie of movies) {
            if (movie.id === movieId ) {
                break;
            }
            index++;
        }
        movies.splice(index, 1);
        
        console.log(index, movies);
        
        listRoot.children[index].remove();
        

    } else {
        return true;
    }
    update();
}

addButton.addEventListener("click", toggleModal);
addMovieButton.addEventListener("click", handleMovieAdd);
closeModalButton.addEventListener("click", closeAddModal);
