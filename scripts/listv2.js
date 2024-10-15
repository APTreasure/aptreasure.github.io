// Requirements Popup
var popupShown = localStorage.getItem('popupShown') === 'true';
var popupBg = document.querySelector('.popupBg');
var popup = document.querySelector('.popup');
var filterButton = document.querySelector('.filter');

function showPopup() {
    if (!popupShown) {
        popupBg.classList.add('visible');
        popup.classList.add('visible');
    }
}

function closePopup() {
    popupBg.classList.remove('visible');
    popup.classList.remove('visible');
    popupShown = true;
    localStorage.setItem('popupShown', 'true');
}

function resetPopup() {
    popupShown = false;
    localStorage.setItem('popupShown', 'false');
    filterButton.textContent = "Reset!";

    setTimeout(() => {
        filterButton.textContent = "Test";
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && popupBg.classList.contains("visible") && popup.classList.contains("visible")) {
        closePopup();
    }
});




document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".gameButton");

    buttons.forEach(function(button) {
        if (!button.classList.contains('popupButton')) {
            var span = button.querySelector(".buttonText");
            var buttonWave = button.querySelector(".buttonWave");

            if (span && buttonWave) {
                var textContent = span.textContent.trim(); // Use textContent of the span element

                if (textContent === "Download") {
                    buttonWave.style.backgroundColor = "#00aaff";

                } else if (textContent === "Magnet") {
                    buttonWave.style.backgroundColor = "#6A5ACD";
                    button.onclick = function() {
                        showPopup();
                    }

                } else if (textContent === "Open" || textContent === "Open Page") {
                    buttonWave.style.backgroundColor = "#00aa00";

                } else if (textContent === "Not Available" || textContent === "Patched" || textContent == "Deprecated") { // Corrected typo in "Not Available"
                    buttonWave.style.backgroundColor = "#202530";
                    button.style.cursor = "not-allowed";
                    button.href = "javascript:void(0);";
                    button.target = "";
                    span.style.opacity = "0.5";

                } else if (textContent === "Coming Soon" || textContent === "Future Release") {
                    buttonWave.style.backgroundColor = "#883300";
                    button.style.cursor = "not-allowed";
                    button.href = "javascript:void(0);";
                    button.target = "";
                    span.style.opacity = "0.5";

                } else {
                    buttonWave.style.backgroundColor = "#502020";
                    span.style.opacity = "0.5";
                    span.textContent = "Styling Error";
                    button.style.cursor = "not-allowed";
                    button.href = "javascript:void(0);";
                    button.target = "";
                    button.style.pointerEvents = "none";
                }
            }
        }
    });
});


document.querySelectorAll('.gameButton').forEach(button => {
    if (!button.classList.contains('popupButton')) {
        button.addEventListener('mouseover', () => {
            button.parentElement.querySelector('.downInfo').classList.add('adjusted-margin');
        });
        button.addEventListener('mouseout', () => {
            button.parentElement.querySelector('.downInfo').classList.remove('adjusted-margin');
        });
    }
});






const parrotImgs = document.querySelectorAll('.parrot');

function switchImage(event) {
  const currentImg = event.target;
  const isAnimated = currentImg.src.includes('parrot_animated.webp');

  if (!isAnimated) {
    currentImg.src = 'images/parrot_animated.gif';

    currentImg.classList.add('parrothover');

    const intervalId = setInterval(() => {
      if (!currentImg.matches(':hover')) {

        currentImg.src = 'images/parrot.png';
        clearInterval(intervalId);
        currentImg.classList.remove('parrothover');

      }
    }, 2160);
  }
}

parrotImgs.forEach(parrotImg => {
  parrotImg.addEventListener('mouseover', switchImage);
});

parrotImgs.forEach(parrotImg => {
  parrotImg.addEventListener('mouseout', () => {
    clearInterval(intervalId);
    parrotImg.classList.remove('parrothover');
  });
});








function addItem(containerSelector, gameIcon, gameTitle, buttonText, gameVers = '', downAuthor = '', downHost = '', openInNewTab = false, buttonLink = '', roundCorners = true) {
    let container = document.querySelector(`#${containerSelector}.container`);

    if (!container) {
        container = document.createElement('div');
        container.id = containerSelector;
        container.className = 'container';
        document.body.appendChild(container);
    }

    const row = document.createElement('div');
    row.className = 'row';
    
    const icon = document.createElement('img');
    icon.className = 'gameIcon';
    icon.src = `icons/${gameIcon}.png`;
    
    const gameInfo = document.createElement('div');
    gameInfo.className = 'gameInfo';
    const title = document.createElement('p');
    title.className = 'gameTitle';
    title.textContent = gameTitle;

    const version = document.createElement('p');
    version.className = 'gameVers';
    if (gameVers != '' && gameVers[0] !== '.') {
        version.textContent = 'v' + gameVers;
    } else if (gameVers[0] === '.') {
        version.textContent = gameVers.replace(/^\./, '');
    } else {
        version.textContent = gameVers;
    }
    gameInfo.appendChild(title);
    gameInfo.appendChild(version);
    
    const downInfo = document.createElement('div');
    downInfo.className = 'downInfo';
    const author = document.createElement('p');
    author.className = 'downAuthor';
    if (downAuthor != '') {
        author.textContent = `by ${downAuthor}`;
    } else {
        author.textContent = ``;
    }
    const host = document.createElement('p');
    host.className = 'downHost';
    if (downHost != '') {
        host.textContent = `via ${downHost}`;
    } else {
        host.textContent = ``;
    }
    downInfo.appendChild(author);
    downInfo.appendChild(host);
    
    const link = document.createElement('a');
    link.href = buttonLink;
    link.className = 'gameButton';
    if (openInNewTab) {
        link.target = '_blank';
    }
    link.addEventListener('mouseover', () => {
        link.parentElement.querySelector('.downInfo').classList.add('adjusted-margin');
    });
    link.addEventListener('mouseout', () => {
        link.parentElement.querySelector('.downInfo').classList.remove('adjusted-margin');
    });

    const linkText = document.createElement('span');
    linkText.className = 'buttonText';
    linkText.textContent = buttonText;
    const buttonWave = document.createElement('div');
    buttonWave.className = 'buttonWave';
    link.appendChild(linkText);
    link.appendChild(buttonWave);
    
    row.appendChild(icon);
    row.appendChild(gameInfo);
    row.appendChild(downInfo);
    row.appendChild(link);
    
    container.appendChild(row);
}




// If ANYONE can code this better, please do
document.querySelector('.search').addEventListener('input', function() {
    let searchValue = this.value.trim().toLowerCase();
    let searchContainer = document.getElementById('00input');
    let containers = document.querySelectorAll('.container');

    async function filterRows() {
        for (let container of containers) {
            if (container === searchContainer) continue; // Skip the search container

            let rows = container.querySelectorAll('.row');
            let anyVisible = false;

            rows.forEach(row => {
                let gameTitleElement = row.querySelector('.gameTitle');
                let originalGameTitle = gameTitleElement.textContent.trim();
                let gameTitle = gameTitleElement.textContent.trim().toLowerCase();
                let cleanGameTitle = gameTitle.replace(/[^\w\s]/g, '');
                let imageID = row.querySelector('.gameIcon').src.replace(/^.+\/([^\/]+)\.png$/, '$1');
                let titleWords = gameTitle.split(' ');

                let combinedLetters = '';
                titleWords.forEach(word => {
                    combinedLetters += word.charAt(0);
                });

                // Check if the combined letters match the search query or if the row title contains the search query
                let found = combinedLetters.startsWith(searchValue) || gameTitle.includes(searchValue) || cleanGameTitle.includes(searchValue);

                if (searchValue && !found) {
                    row.style.opacity = '0';
                    setTimeout(() => {
                        row.style.display = 'none';
                        updateContainerHeight(container);
                    }, 200); // Wait for 200 ms before setting display to none
                } else {
                    row.style.display = 'flex';

                    gameTitleElement.innerHTML = highlightMatch(originalGameTitle, searchValue);
                    setTimeout(() => {
                        row.style.opacity = '1';
                        updateContainerHeight(container);
                    }, 200); // Set opacity to 1 after 200 ms
                    anyVisible = true;
                }
            });

            if (!anyVisible) {
                container.style.opacity = '0';
                container.style.height = '0';
                setTimeout(() => {
                    container.style.display = 'none';
                }, 200); // Hide container after 200 ms if no rows are visible
            } else {
                container.style.opacity = '1';
                container.style.display = 'block';
                updateContainerHeight(container);
            }
        }
    }



    function updateContainerHeight(container) {
        const visibleRows = container.querySelectorAll('.row');
        let totalHeight = 0;
        visibleRows.forEach(row => {
            if (row.style.display !== 'none') {
                totalHeight += row.offsetHeight + 10; // Add row height and row bottom margin
            }
        });
        container.style.height = `${totalHeight}px`;
    }



    function highlightMatch(text, query) {
        if (!query.trim()) return text;
        console.clear();
    
        // Normalize the text and query by removing special characters and converting to lowercase
        const normalize = str => str.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        let normalizedText = normalize(text);
        let normalizedQuery = normalize(query);
    
        console.log("Normalized Text: ", normalizedText);
        console.log("Normalized Query: ", normalizedQuery);
    
        // Find positions in the normalized text where the normalized query matches
        let positions = [];
        let offset = normalizedText.indexOf(normalizedQuery);
        while (offset !== -1) {
            positions.push(offset);
            offset = normalizedText.indexOf(normalizedQuery, offset + 1);
        }
    
        console.log("Query Positions Found: ", positions);
    
        // Highlight matching text
        if (positions.length > 0) {
            let highlightedText = text;
            positions.reverse().forEach(pos => {
                let endPos = pos + query.length;
    
                // Check for special characters within the range from text[offset] to query.length + offset
                let hasSpecialCharacterInRange = false;
                for (let i = pos; i < endPos; i++) {
                    if (text[i] && text[i].match(/[^a-z0-9\s]/gi)) {
                        hasSpecialCharacterInRange = true;
                        console.log("true");
                        break;
                    } else {
                        console.log("false");
                    }
                }

                // Adjust the end position if a special character is found directly before the highlighted text
                for (let i = pos - 1; i >= 0; i--) {
                    if (text[i].match(/[^a-z0-9\s]/gi)) {
                        pos++;
                        endPos ++; // Add one more character to the end position
                        break; // Stop the loop once a special character is found
                    }
                }
                
                if (hasSpecialCharacterInRange) {
                    endPos ++;
                }

                let originalTextMatch = text.slice(pos, endPos);
                console.log("Original Text Match: ", originalTextMatch);
    
                highlightedText = highlightedText.substring(0, pos) +
                    `<span style="color: #ffd700; border-radius: 4px; background-color: rgba(255, 215, 0, 0.1); padding: 0 0px; margin: 0 1px;">${originalTextMatch}</span>` +
                    highlightedText.substring(endPos);
            });
            return highlightedText;
        }
    
        // If no exact match found, highlight based on first letter
        let words = text.split(' ');
        let nyoom = -1
        let highlightedWords = words.map(word => {
            nyoom++;
            console.log(`${nyoom}. ${word[0]} ${word}`);
            if (nyoom < query.length && query[nyoom].toLowerCase() === word[0].toLowerCase()) {
                return `<span style="color: rgb(156, 141, 255); border-radius: 4px; background-color: rgba(156, 141, 255, 0.1);">${word[0]}</span>${word.slice(1)}`;
            } else {
                return word;
            }
        });
        return highlightedWords.join(' ');
    }
    

    
    clearTimeout(this._timeout); // Clear any previous timeout
    this._timeout = setTimeout(filterRows, 200);
});
