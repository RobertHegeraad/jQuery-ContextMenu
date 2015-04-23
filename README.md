ContextMenu
===========

Easily customizable Context menu jQuery plugin that replaces the default context menu for specific elements.

Demo:
------------------------------------------------------------------------------------------------------

<http://codepen.io/RobertHegeraad/pen/EfipC/>

Heres how it works:
------------------------------------------------------------------------------------------------------

First initialize the ContextMenu plugin.

```javascript
$('body').contextmenu();
```

Next you can create a menu for every type of element, i.e. if i want a menu for images i can add the context data attribute to an image element like so.

```html
<img data-context="myImageMenu" src="path/to/image.jpg"/>
```

Now you can add a menu to the ./js/menu.json file. Here is an example for the <img> element.

The key of the menu is equal to the data-context attribute that we gave the image element. This way it knows which menu's belong to which elements.

```javascript
{
	"width": 300,
	"theme": "light",
	"myImageMenu": [
		{
			"title": "Save",
			"link": "#item1",
			"note": "save to computer"
		},
		{
			"title": "Save As",
			"submenu": [
				{ "title": "PDF" },
				{ "title": "DOCX" },
				{
					"title": "More",
					"submenu": [
						{ "title": "PPT" },
						{ "title": "HTML" }
					]
				},
				{
					"title": "Settings",
					"disable": true,
					"callback": "settingsCallback"
				}
			]
		},
		{
			"title": "Settings",
			"callback": "settingsCallback"
		}
	]
}
```

Every object in the array is an item that can have a few different properties.

Here are all the properties a menu item can have.

```javascript
{
	'title': 'The Title',		// The that is displayed to the left on the menu item
	'link': '#anchorlink',		// An optional link for when the user clicks on the menu item
	'note': 'small note',		// A small text that is displayed to the right on the menu item
	'submenu': [ { 'title': 'Sub-menu Title 1' }, { 'title': 'Sub-menu Title 2' } ],		// A submenu for the menu item, this is an array containing menu item objects of it's own
	'disable': true,		// Option to disable the menu item
	'callback': itemCallback		// Optional callback function that will be called when the users clicks on the menu item
}
```


Additional options you can pass to the contextMenu plugin
------------------------------------------------------------------------------------------------------

```javascript
$('body').contextmenu({
	'width': 300,		// The width of the menu in pixels, default is 240
	'theme': 'light'	// 'light' or 'dark' theme for the menu, default is 'light'
});
```

Custom themes
------------------------------------------------------------------------------------------------------
You can have a custom theme in ./js/themes.json for every menu you create. Here is an example with the two default theme.

```javascript
{
	"light": {
	    "DefaultBackground": "#f9f9f9",
	    "DefaultBackgroundHover": "#eeeeee",
	    "DisabledBackgroundHover": "#f9f9f9",
	    "TextColor": "#333333",
	    "LinkColor": "#333333",
	    "NoteColor": "#555555",
	    "DisabledColor": "#999999",
	    "ArrowColor": "#333333",
	    "fontSize": 12
	},
	"dark": {
	    "DefaultBackground": "#333333",
	    "DefaultBackgroundHover": "#444444",
	    "DisabledBackgroundHover": "#333333",
	    "TextColor": "#f9f9f9",
	    "LinkColor": "#f9f9f9",
	    "NoteColor": "#555555",
	    "DisabledColor": "#777777",
	    "ArrowColor": "#f9f9f9",
	    "fontSize": 12
	}
}
```