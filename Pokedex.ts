
/// <reference lib="es2015" />

async function GetData(mon: string) 
{
    // The user will input this value.
    // It is converted to lowercase because they are all lowercase in the API
    let pokemon = mon.toLowerCase();
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);

        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }

        const pokemonData = await response.json();
        
        // 'pokemonData' is implicitly of type any, so check and cast it
        if (typeof pokemonData === 'object' && pokemonData !== null) 
        {
            // Show all of the data in the console
            console.log(pokemonData);
            

            // Define pokemon traits
            // Name
            let pokemonName = pokemonData.name;
            // Type(s)
            let type1 = pokemonData.types[0].type.name;
            let type2 = ""
            if (pokemonData.types.length > 1)
            {
                type2 = pokemonData.types[1].type.name;
            }
            // Abilities
            let pokemonAbilities = pokemonData.abilities;


            // Capitalize first letters
            pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            type1 = type1.charAt(0).toUpperCase() + type1.slice(1);
            if (type2 != "")
            {
                type2 = type2.charAt(0).toUpperCase() + type2.slice(1)
            }


            // Display pokemon traits
            // Name
            const displayName = document.getElementById("Name");
            if (displayName)
            {
                displayName.textContent = (`Name: ${pokemonName}`);
            }
            // Types
            const displayTypes = document.getElementById("Type");
            if (displayTypes)
            {
                displayTypes.textContent = (`Types: ${type1 + " " + type2}`)
            }
            // Abilities
            const displayAbilities = document.getElementById("Abilities");
            if (displayAbilities)
            {
                displayAbilities.textContent = "Abilities: ";
                for (let i=0; i < pokemonData.abilities.length; i++)
                {
                    let ability = pokemonAbilities[i].ability.name;
                    ability = ability.charAt(0).toUpperCase() + ability.slice(1);
                    displayAbilities.textContent += ability;
                    if (pokemonData.abilities.length > i+1)
                    {
                        displayAbilities.textContent += ", ";
                    }
                }
            }
        }
        

    } catch (error: any) 
    {
        console.error('Error fetching Pokemon data:', error.message);
    }
}


// Call the function to get the Pokemon data
const typingField = document.getElementById("typingField") as HTMLInputElement;
typingField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const inputValue: string = typingField.value;
        GetData(inputValue);
    }
});
