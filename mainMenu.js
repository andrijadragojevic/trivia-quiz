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

location.href = "quiz.html";

}
