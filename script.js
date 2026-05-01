//Required elements for form manipulation 
const form = document.getElementById("word-search-form");
const errorHandling = document.getElementById("errorPopUp");
const displayDefinition = document.getElementById("showDefinition");
const displayPhonetic = document.getElementById("showPhonetic");
const playAudio = document.getElementById("playAudio");
const playAudioButton = document.getElementById("playAudioButton");
const defineAll = document.getElementById("showDefinitionb");
const displaySynonyms = document.getElementById("showSynonyms");
const initialOutput = document.getElementById("apiResults")
const searchBar = document.getElementById("searched-word")
let audioUrl;
let searchedWord;


form.addEventListener("submit", function(event){
    
    event.preventDefault();
    searchedWord =  document.querySelector("#searched-word").value;
     //Error handling for no input
    if(searchedWord == ""){
        errorHandling.textContent = "Empty input, please try again";
        return
    }
     // Clear error message
    errorHandling.textContent = '';

    
    //Display results of valid word search 
    //Error handling for missing synonymn and phonetic results
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`)
	.then(function(response){
		return response.json();
    })
   .then(function(data){
        const word = data[0].word;
        displayDefinition.innerHTML =  word;

        const phonetic = data[0].phonetic;
        displayPhonetic.innerHTML = phonetic || "No phonetics available";

        const audio = data[0].phonetics[0].audio;

        if(audio){
            playAudio.src = audio;
            playAudioButton.style.display = "block";
        }else{
            playAudioButton.style.display = "none"
        }

        playAudioButton.addEventListener("click", function(){
             playAudio.play();
        });
       

        const retrievedDefinitions = [];
        for( let i =0; i < data[0].meanings[0].definitions.length; i++){
            retrievedDefinitions.push(data[0].meanings[0].definitions[i].definition);
        }
        defineAll.innerHTML = " ";
        retrievedDefinitions.forEach((definition, index) => {
            defineAll.innerHTML += `<p>${index+1}. ${definition}</p>`;

        })

        const  wordSynonyms = [];
        for( let j =0; j < data[0].meanings[0].definitions.length; j++){
            const synonyms = data[0].meanings[0].definitions[j].synonyms;
            if(synonyms && synonyms.length > 0){
                for (let k =0; k < synonyms.length; k++){
                    wordSynonyms.push(synonyms[k]);
                }
            }
        }
        if(wordSynonyms.length > 0){
            displaySynonyms.innerHTML =  `<p>Synonymns: ${wordSynonyms} </p>`;
        }else {
            displaySynonyms.innerHTML=`<p>No synonyms available</p>`
        }  
  
  
    });
      
    form.reset();
   
});