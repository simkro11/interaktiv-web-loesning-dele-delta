function toggleLink() {
    var checkBox = document.getElementById("checkToUnlock");
    var link = document.getElementById("myLink");

    if (checkBox.checked == true){
        // Unlock: restore link behavior and style
        link.style.pointerEvents = "auto";
        link.style.color = "white";
        link.style.textDecoration = "underline";
    } else {
        // Lock: disable link behavior and change style
        link.style.pointerEvents = "none";
        link.style.color = "black";
        link.style.textDecoration = "none";
    }
}