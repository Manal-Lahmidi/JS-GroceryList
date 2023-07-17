$(function() {
    /* This is a shorthand for the $(document).ready() event in jQuery. It ensures that the 
	  code inside the function is executed once the DOM is fully loaded and ready. */

	var callback = function(event) {
		event.preventDefault();
		// This prevents the default form submission behavior when the buttons are clicked.

		var input = $('input[type=text][name=item]'),
		// selects the input element of type "text" with the name attribute set to "item"
			value = input.val(),
			// retrieves the value entered in the input field
			
			need = ($(event.target).attr('id') === 'addNeed'),
			// checks whether the clicked button has the ID "addNeed" to determine if it's a need or have item.
			
			item = $('<li><input type="checkbox" name="item"> ' + value + ' <a href="#">&#10006</a></li>'),
			// creates a new list item (<li>) element with a checkbox, the entered value, and a remove link (<a>)
			
			list = (need) ? $('ul').first() : $('ul').last();
			// It selects the first unordered list (ul) if it's a need item, or the last unordered list if it's a have item
		
		input.val("");// clears the input field after adding the item
		input.focus();// sets the focus back to the input field

		if (value === "") return;// checks if the value is empty and returns early if so, preventing the creation of an empty list item

		if (!need) {
			item.find('input').attr('checked', true);// checks if it's a have item and sets the "checked" attribute of the input checkbox to true
		}
		item.appendTo(list);// appends the newly created list item to the selected list.
	}
    // The 'callback' function is defined to handle the click event on the addHave or addNeed buttons.

	$('#addHave, #addNeed').click(callback);//
	// attaches the callback function as the event handler for the click event on elements with the IDs "addHave" and "addNeed" (the buttons)
	
	$('ul').on('click', 'li a', function(event){
		$(event.target).parent('li').remove();
	});
	/* Attaches an event handler for click events on anchor elements within list items (li) in any unordered list (ul).
	   When an anchor element is clicked, the corresponding list item is removed from the DOM.*/

	$('ul').on('click', 'input[type=checkbox]', function(event){
		var listItem = $(event.target).parent('li'),
			list = (event.target.checked) ? $('ul').last() : $('ul').first();
		listItem.appendTo(list);
	});
	/* Attaches an event handler for click events on checkbox inputs within list items (li) in any unordered list (ul).
	   When a checkbox is clicked, the corresponding list item is moved to either the last unordered list (ul) if the checkbox
	   is checked, or the first unordered list (ul) if the checkbox is unchecked.*/
});
