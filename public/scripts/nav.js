let menuDisplay = document.getElementById("#nav-body");
let sidebar = document.getElementsById("#sidebar");

sidebar.addEventListener("mouseenter", function( event ) {
    // highlight the mouseenter target
    sidebar.style.backgroundColor= "purple";
  
    // reset the color after a short delay
    setTimeout(function() {
      event.target.style.color = "";
    }, 500);
  }, false);