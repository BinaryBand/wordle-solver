javascript: (() => {
    const tiles = document.getElementsByClassName('Tile-module_tile__UWEHN');

    // { letter: number | null }
    const knowledge = {};

    for (let i in tiles) {
        const tile = tiles[i];

        if (!tile || !tile.getAttribute) {
            continue;
        }

        const state = tile.getAttribute('data-state');
        const letter = tile.innerText;

        if (state === 'absent') {
            knowledge[letter] = -2;
        }
        else if (state === 'present') {
            knowledge[letter] = -1;
        }
        else if (state === 'correct') {
            knowledge[letter] = i % 5;
        }
    }

    for (let letter in knowledge) {
        console.log(`${letter}: ${knowledge[letter]}`);
    }
})();