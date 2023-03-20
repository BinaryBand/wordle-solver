javascript:(() => {
    const tiles = document.getElementsByClassName('Tile-module_tile__UWEHN');

    // { letter: number | null }
    const knowledge = {};

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];

        if (!tile || !tile.getAttribute) {
            continue;
        }

        const state = tile.getAttribute('data-state');
        const letter = tile.innerText.toLowerCase();

        if (state === 'absent' && !knowledge[letter]) {
            knowledge[letter] = -1;
        }
        else if (state === 'present' && !knowledge[letter]) {
            knowledge[letter] = i % 5;
        }
        else if (state === 'correct') {
            knowledge[letter] = i % 5 + 5;
        }
    }

    fetch('https://raw.githubusercontent.com/BinaryBand/wordle-solver/master/words.json')
        .then((response) => response.json())
        .then((words) => {
            let letters = Object.keys(knowledge);

            for (let i = 0; i < letters.length; i++) {
                const letter = letters[i];

                if (knowledge[letter] === -1) {
                    words = words.filter((word) => {
                        return !word.includes(letter);
                    });
                }
                else if (knowledge[letter] < 4) {
                    words = words.filter((word) => {
                        const index = knowledge[letter];
                        return word[index] !== letter && word.includes(letter);
                    });
                }
                else {
                    words = words.filter((word) => {
                        const index = knowledge[letter] - 5;
                        return word[index] === letter;
                    });
                }
            }

            alert(words[0]);
        })
        .catch(alert);
})();