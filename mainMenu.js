
document.getElementById("numberOfQuestions").value = sessionStorage.getItem("numberOfQuestions") ?? 10;
document.querySelector(`label[for="numberOfQuestions"]>h1`).innerHTML = `${sessionStorage.getItem("numberOfQuestions") ?? '10'}`;



function start() {

let categories = ["arts_and_literature","film_and_tv","food_and_drink","general_knowledge","geography","history","music","science",
    "society_and_culture","sport_and_leisure"];

let selectedCategories = [];

categories.forEach(category => {

    let checkbox = document.querySelector(`input[value='${category}']:checked`);

    if (checkbox != null) {
        selectedCategories.push(checkbox.value);
    }

})

selectedCategories = selectedCategories.join(",");

if (selectedCategories.length > 0) {
    selectedCategories = `categories=${selectedCategories}&`;
}

sessionStorage.setItem("selectedCategories",JSON.stringify(selectedCategories))
sessionStorage.setItem("numberOfQuestions",`${document.getElementById("numberOfQuestions").value}`)

location.href = "quiz.html";

}

document.getElementById("numberOfQuestions").addEventListener( "input", (event) => {
    document.querySelector(`label[for="numberOfQuestions"]>h1`).innerHTML = document.getElementById("numberOfQuestions").value;
})

