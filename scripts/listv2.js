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
