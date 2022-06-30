var my_custom_selects = document.getElementsByClassName("my-custom-select");

function custom_select_init(select, select_button, select_list, selected_items) {
	var selection_type = select.getAttribute("data-type");
	var item_counter = select.getAttribute("data-counter");
	var initial_button_text = select_button.innerHTML;
	var select_list_items = select_list.getElementsByTagName("li");
	// event listener on the select button to toggle the select list
	select_button.addEventListener("click", function () {
		if (select_list.style.display == "none") {
			select_list.style.display = "block";
		} else {
			select_list.style.display = "none";
		}
	});
	// event listener on the select list items to select the item and update the select button text
	for (var j = 0; j < select_list_items.length; j++) {
		select_list_items[j].addEventListener("click", function () {
			// in case of multiple type selection, add the item to the selected items list
			if (selection_type == "multiple") {
				if (this.classList.contains("selected")) {
					this.classList.remove("selected");
				} else {
					this.classList.add("selected");
				}
				// update the button text
				select_button.innerHTML = "";
				if (selected_items.length > item_counter) {
					select_button.innerHTML =
						"<span>" + selected_items.length + "</span> selected";
				} else {
					if (selected_items.length == 0) {
						select_button.innerHTML = initial_button_text;
					} else {
						for (var k = 0; k < selected_items.length; k++) {
							select_button.innerHTML += selected_items[k].innerHTML + ", ";
						}
					}
				}
				// remove the last comma
				if (select_button.innerHTML.substr(-2) == ", ") {
					select_button.innerHTML =
						select_button.innerHTML.substr(0, select_button.innerHTML.length - 2);
				}
			}
			// in case of single type selection, update the select button text
			else {
				// if clicked on the same item, remove the selection
				if (this.classList.contains("selected")) {
					for (var k = 0; k < select_list_items.length; k++) {
						select_list_items[k].classList.remove("selected");
					}
					this.classList.remove("selected");
					select_button.innerHTML = initial_button_text;
				}
				else {
					for (var k = 0; k < select_list_items.length; k++) {
						select_list_items[k].classList.remove("selected");
					}
					this.classList.add("selected");
					select_button.innerHTML = this.innerHTML;
				}
			}
		});
	}
	
	// event listener on the document to close the select list if the user clicks outside of it
	document.addEventListener("click", function (event) {
		if (!select_button.contains(event.target) && !select_list.contains(event.target)) {
			select_list.style.display = "none";
		}
	});	
}

// initialize the custom selects
for (let index = 0; index < my_custom_selects.length; index++) {
	const select = my_custom_selects[index];
	const select_button = select.getElementsByTagName("button")[0];
	const select_list = select.getElementsByTagName("ul")[0];
	const selected_items = select_list.getElementsByClassName("selected");
	select_list.style.display = "none";
	custom_select_init(select, select_button, select_list, selected_items);
}