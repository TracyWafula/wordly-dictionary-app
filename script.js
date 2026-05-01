const form = document.getElementById("word-search-form");
const errorHandling = document.getElementById("errorPopUp");
const displayDefinition = document.getElementById("showDefinition");
const displayPhonetic = document.getElementById("showPhonetic");
const playAudio = document.getElementById("playAudio");
const playAudioButton = document.getElementById("playAudioButton");
const defineAll = document.getElementById("showDefinitionb");
const displaySynonyms = document.getElementById("showSynonyms");
const initialOutput = document.getElementById("apiResults")

let audioUrl;
let searchedWord;

//The display div is hiddent until fetching is trigerred.
// function hideDisplayDiv(){
//     initialOutput.style.display = "block";
// }


form.addEventListener("click", function(event){
    event.preventDefault();
    searchedWord =  document.querySelector("#searched-word").value;
     //Error Handling 
    if(!searchedWord){
        // Empty input
        errorHandling.textContent = "Invalid input, please try again";
        return;
    }
    
    // if (!/^[A-Za-z]+$/.test(searchedWord)) {
    // errorMessage.textContent = 'Please enter a valid email address.';
    //     return;
    //   }
    
     // Clear error message
    errorHandling.textContent = '';

    //Display word searched in  dictionary API 

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`)
	.then(function(response){
		return response.json();
    })
   .then(function(data){
        const word = data[0].word;

        const phonetic = data[0].phonetic;

        displayDefinition.innerHTML =  word;
        
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
    

  
        


    
    
    
});