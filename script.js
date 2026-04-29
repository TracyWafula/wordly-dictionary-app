const form = document.getElementById("word-search-form");
const errorHandling = document.getElementById("errorPopUp");
const displayDefinition = document.getElementById("definition");


function displaySearchedWord(newWord){
    const wordTyped = document.createElement("p")
    wordTyped.textContent = newWord;
    displayDefinition.append(wordTyped)
}


form.addEventListener("submit", function(event){
    event.preventDefault();
    const searchedWord =  document.querySelector("#searched-word").value;
  
    //Display fetched definition
    // displaySearchedWord(searchedWord);
    // form.reset();

    //Display word searched in  dictionary API 

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/${searchedword}")
	.then(function(response){
		return response.json();
    })
   .then(function(data){
		const foundMeaning = 
		"Meaning: " + data[0].meaning[0].definitions[0].definitions[0]
    })


    //Error Handling 
    if(!searchedWord){
        //Empty input
        errorHandling.textContent = "No input received, please type in a valid word"
        return;
    }
    // Clear error message
      errorHandling.textContent = '';

});
