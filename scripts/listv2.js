// Requirements Popup
var popupShown = false;

function showPopup() {
    if (!popupShown) {
        document.getElementById('popup').classList.add('visible');
        popupShown = true;
    }
}

function closePopup() {
    document.getElementById('popup').classList.remove('visible');
}



// List Items
function addListItem(iconSrc, name, version, source, downloadLink, openInNewTab = true, downloadLinkText, hexColor = null) {
    
    
    
    return
    var letter = name.charAt(0).toUpperCase(); // Get the first letter of the name

    // Create a new listObj div
    var newListObj = document.createElement('div');
    newListObj.className = 'listObj';

    // Create an image element for the icon
    var iconElement = document.createElement('img');
    iconElement.className = 'icon';
    iconElement.src = "icons/" + iconSrc + ".png";

    // Create paragraph elements for other details
    var nameElement = document.createElement('p');
    nameElement.className = 'name';
    nameElement.textContent = name;

    var versionElement = document.createElement('p');
    versionElement.className = 'vers';
    versionElement.textContent = version;

    var sourceElement = document.createElement('p');
    sourceElement.className = 'serv';
    sourceElement.textContent = source;

    var downloadElement = document.createElement('a');
    downloadElement.className = downloadLink.startsWith('magnet:') ? 'down r' : 'down';
    downloadElement.href = downloadLink;
    downloadElement.textContent = downloadLinkText || (downloadLink.startsWith('magnet:') ? 'Magnet' : 'Download');

    // Open link in a new tab if specified
    if (openInNewTab && !downloadLink.startsWith('magnet:')) {
        downloadElement.target = '_blank';
    } else if (downloadLink.startsWith('magnet:')) {
        // Add onclick attribute for magnet links
        downloadElement.setAttribute('onclick', 'showPopup()');
    }

    if (hexColor) {
        downloadElement.style.color = hexColor;
    }

    // Append elements to the new listObj div
    newListObj.appendChild(iconElement);
    newListObj.appendChild(nameElement);
    newListObj.appendChild(versionElement);
    newListObj.appendChild(sourceElement);
    newListObj.appendChild(downloadElement);

    // Append the new listObj to the main container and the corresponding letter container
    document.getElementById('listContainer').appendChild(newListObj);
    document.getElementById(letter).appendChild(newListObj);

    var categories = document.querySelectorAll('.list');
    categories.forEach(function (category) {
        // Check if the category has no list items
        if (category.children.length <= 0) {
            category.style.display = 'none'; // Hide the category
        } else {
            category.style.display = 'block'; // Show the category
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll("a");

    buttons.forEach(function(button) {
        var span = button.querySelector(".buttonText");
        var buttonWave = button.querySelector(".buttonWave");

        if (span && buttonWave) {
            var textContent = span.textContent.trim(); // Use textContent of the span element

            if (textContent === "Download") {
                buttonWave.style.backgroundColor = "#00aaff";
            } else if (textContent === "Magnet") {
                buttonWave.style.backgroundColor = "#6A5ACD";
            } else if (textContent === "Not Available") { // Corrected typo in "Not Available"
                buttonWave.style.backgroundColor = "#ff6969";
                button.style.cursor = "not-allowed";
                button.href = "javascript:void(0);";
                button.target = "";
            } else {
                buttonWave.style.backgroundColor = "#ffffff";
            }
        }
    });
});


document.querySelectorAll('.gameButton').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.parentElement.querySelector('.downInfo').classList.add('adjusted-margin');
    });
    button.addEventListener('mouseout', () => {
        button.parentElement.querySelector('.downInfo').classList.remove('adjusted-margin');
    });
});






const parrotImgs = document.querySelectorAll('.parrot');

// Function to switch images
function switchImage(event) {
  const currentImg = event.target;
  const isAnimated = currentImg.src.includes('parrot_animated.webp');

  // Check if the current image is static and not already animated
  if (!isAnimated) {
    // Switch to the animated image
    currentImg.src = 'images/parrot_animated.webp';

    // Add the parrothover class
    currentImg.classList.add('parrothover');

    // Check if the mouse is still over the image every 3 seconds
    const intervalId = setInterval(() => {
      if (!currentImg.matches(':hover')) {
        // If the mouse is not over the image, switch back to static image
        currentImg.src = 'images/parrot.png';
        clearInterval(intervalId); // Stop checking once the image is switched
        // Remove the parrothover class
        currentImg.classList.remove('parrothover');
      }
    }, 3000);
  }
}

// Add mouseover event listener to trigger animation
parrotImgs.forEach(parrotImg => {
  parrotImg.addEventListener('mouseover', switchImage);
});

// Add mouseout event listener to stop animation if mouse leaves the image
parrotImgs.forEach(parrotImg => {
  parrotImg.addEventListener('mouseout', () => {
    clearInterval(intervalId); // Stop checking if mouse leaves the image
    // Remove the parrothover class
    parrotImg.classList.remove('parrothover');
  });
});








function addItem(containerSelector, gameIcon, gameTitle, buttonText, gameVers = '', downAuthor = '', downHost = '', openInNewTab = false, buttonLink = '') {
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
    if (gameVers != '') {
        version.textContent = 'v' + gameVers;
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




document.querySelector('.search').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase();
    let searchContainer = document.getElementById('00input');
    let containers = document.querySelectorAll('.container');

    async function filterRows() {
        for (let container of containers) {
            if (container === searchContainer) continue; // Skip the search container

            let rows = container.querySelectorAll('.row');
            let anyVisible = false;
            let containerHeight = 0;

            rows.forEach(row => {
                let gameTitle = row.querySelector('.gameTitle').textContent.toLowerCase();
                if (searchValue && !gameTitle.includes(searchValue)) {
                    row.style.opacity = '0';
                    setTimeout(() => {
                        row.style.display = 'none';
                        updateContainerHeight(container);
                    }, 200); // Wait for 200 ms before setting display to none
                } else {
                    row.style.display = 'flex';
                    setTimeout(() => {
                        row.style.opacity = '1';
                        updateContainerHeight(container);
                    }, 200); // Set opacity to 1 after 200 ms
                    anyVisible = true;
                }
            });

            if (!anyVisible) {
                setTimeout(() => {
                    container.style.display = 'none';
                }, 200); // Hide container after 200 ms if no rows are visible
            } else {
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

    clearTimeout(this._timeout); // Clear any previous timeout
    this._timeout = setTimeout(filterRows, 200);
});
