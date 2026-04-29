const form = document.getElementById("word-search-form");
const errorHandling = document.getElementById("errorPopUp");
const displayDefinition = document.getElementById("definition");
let searchedWord;


function displaySearchedWord(newWord){
    const wordTyped = document.createElement("p")
    wordTyped.textContent = newWord;
    displayDefinition.append(wordTyped)
}


form.addEventListener("submit", function(event){
    event.preventDefault();
    searchedWord =  document.querySelector("#searched-word").value;
  

    
    // //Display fetched definition
    // displaySearchedWord(searchedWord);
    

     //Error Handling 
    if(!searchedWord){
        //Empty input
        errorHandling.textContent = "No input received, please type in a valid word"
        return;
    }
    // Clear error message
      errorHandling.textContent = '';

    //Display word searched in  dictionary API 

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`)
	.then(function(response){
		return response.json();
    })
   .then(function(data){

        // const enteredWord = data.word[0];
        const word = data[0].word;

        const phonetic = data[0].phonetic;

        const retrievedDefinition = data[0].meanings[0].definitions[0].definition


        displayDefinition.innerHTML = "Word: " + word + "\n" + 
                                    "Phonetic: " + phonetic + "\n" + 
                                    "Meaning: " + retrievedDefinition;
    })
    form.reset();


   

});
