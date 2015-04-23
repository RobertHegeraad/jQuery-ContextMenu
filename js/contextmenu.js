(function($, window, document, undefined) {
    var config = {
        'width': 240,
        'theme': 'light' // light or dark theme
    };

    var methods = {

        /*
         * Overwrite default configuration
         */
        init: function(options) {
            // Extend the configuration
            $.extend(config, options);
        },

        /** ------------------------------------------------------------------------
         * Create the contextmenu
         */
        createMenu: function(options, x, y, submenu) {
            
            if(options != undefined) {

                var ul = $('<ul class="menu ' + config.theme + '"></ul>');

                // Is this a sub-menu?
                if(submenu === true) {
                    ul.addClass('sub-menu').css({
                        'top': y + 'px',
                        'right': x + 'px',
                        'width': config.width + 'px'
                    });
                } else {
                    ul.css({
                        'top': y + 'px',
                        'left': x + 'px',
                        'width': config.width + 'px'
                    });
                }
                
                for(var i=0; i<options.length; i++) {
                    var li = $('<li>').addClass('menu-item');

                    ul.append(li);


                    // Is the item disabled
                    if(options[i].disable === true) {
                        var title = $('<span>' + options[i].title + '</span>');
                        li.addClass('menu-item-disabled');
                    } else {
                        // Is the item a link?
                        if(options[i].link) {
                            var title = $('<a href="' + options[i].link + '">' + options[i].title + '</a>');
                            li.addClass('menu-item-link');
                        } else {
                            var title = $('<span>' + options[i].title + '</span>');
                            li.addClass('menu-item-title');                            
                        }
                    }

                    li.append(title);

                    // Does the item have a note?
                    if(options[i].note) {
                        var note = $('<span class="menu-item-note">' + options[i].note + '</span>');

                        li.append(note);
                    }

                    // Does the item have a sub-menu? if so, show an arrow to the right
                    if(options[i].submenu) {
                        var arrow = $('<span class="sub-menu-arrow"></span>');

                        li.append(arrow);


                        var menu = methods.createMenu(options[i].submenu, config.width * -1, 0, true);
                        
                        li.append(menu);
                    }

                    // Does the item have a callback function?
                    if(options[i].callback && options[i].disable !== true) {
                        li.data('callback', options[i].callback);
                    }
                }

                return ul;
            }

            return '';
        },

        /** ------------------------------------------------------------------------
         * Click handler for when the user has clicked on any element on the page,
         * It then checks if the element has a context data attribute set, if so the
         * menu will be created and displayed on the page for that element.
         */
        windowClickHandler: function(e) {
            // Remove the old menu
            $('.menu').remove();

            // Was the right mouse button clicked?
            if(e.which == 3) {

                var context = $(e.target).data('context');

                if(context !== undefined) {
                    $('body').append(methods.createMenu(config[context],
                                     e.pageX,
                                     e.pageY,
                                     false));
                }
            }
        },

        /** ------------------------------------------------------------------------
         * Click handler for when the user has clicked on an item from the contextmenu
         * It then checks if the item has a callback function attached to it.
         */
        itemClickHandler: function(e) {
            // Get the callback and call it
            var callback = $(this).data('callback');

            // Was a callback function set for this item?
            if(typeof window[callback] == 'function') {
                window[callback]();
            }
        }
        
    };

    $.fn.contextmenu = function(options) {
        
        methods.init(options);

        // When the user clicks on the page
        $(window).on('mouseup.contextmenu', methods.windowClickHandler);

        // Prevent the context menu from showing
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);

        $(document).on('mouseup', '.menu-item', methods.itemClickHandler);

        return this;
    }

}(jQuery, window, document));

$('body').contextmenu({
  'width': 300,
  'myImageMenu': [
    {
      'title': 'View',
      'link': 'http://www.online-image-editor.com/styles/2013/images/example_image.png',
      'note': 'view in browser'
    },
    {
      'title': 'Save As',
      'submenu': [
        { 'title': 'JPG', 'callback': 'jpgCallback' },
        { 'title': 'PNG', 'callback': 'pngCallback' }
      ]
    },
    {
      'title': 'Settings',
      'callback': settingsCallback
    }
  ]
});

function jpgCallback() {
	  console.log('User wants to save as jpg');
}

function pngCallback() {
	  console.log('User wants to save as jpg');
}

function settingsCallback() {
	  console.log('User wants to access settings');
}