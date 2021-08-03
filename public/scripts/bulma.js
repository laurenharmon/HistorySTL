(function () {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

function init() {

    // Grab the tab links and content divs from the page
    let tabListItems = document.getElementById('tabs').childNodes;
    for ( let i = 0; i < tabListItems.length; i++ ) {
      if ( tabListItems[i].nodeName == "LI" ) {
        let tabLink = getChildWithTagName( tabListItems[i], 'A' );
        let id = getHash( tabLink.getAttribute('href') );
        tabLinks[id] = tabLink;
        contentDivs[id] = document.getElementById( id );
      }
    }

    // Assign onclick events to the tab links, and
    // highlight the first tab
    let i = 0;

    for ( let id in tabLinks ) {
      tabLinks[id].onclick = showTab;
      if ( i == 0 ) {
          tabLinks[id].className = "tabContent selected";
      } else {
          contentDivs[id].className = "tabContent hide"
      }
      i++;
    }
  }


  function showTab() {
    let selectedId = getHash( this.getAttribute('href') );

    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for ( let id in contentDivs ) {
      if ( id == selectedId ) {
        tabLinks[id].className = 'selected';
        contentDivs[id].className = 'tabContent';
      } else {
        tabLinks[id].className = '';
        contentDivs[id].className = 'tabContent hide';
      }
    }

    // Stop the browser following the link
    return false;
  }


  function getFirstChildWithTagName( element, tagName ) {
    for ( let i = 0; i < element.childNodes.length; i++ ) {
      if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
  }

  function getHash( url ) {
    let hashPos = url.lastIndexOf ( '#' );
    return url.substring( hashPos + 1 );
  }

