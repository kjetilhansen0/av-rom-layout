export default function roomLayout() {

	const diagram = document.querySelector(".diagram");
	const diagramNumbersAll = document.querySelectorAll(".diagram li");
	const legend = document.querySelector(".legend");
	const legendItemsAll = document.querySelectorAll(".legend > ul > li");
	const gallery = document.querySelector(".gallery");



	//////////////////////////////////////////////////////////
	// legend, diagram and gallery item control
	//////////////////////////////////////////////////////////

	// legend - when hovering or clicking items, control matching elements in diagram and gallery

	legendItemsAll.forEach(legendItem => {

		const legendItemClass = legendItem.getAttribute("class");
		const legendItemButton = legendItem.querySelector("button");
		const matchingDiagramNumber = diagram.querySelector("." + legendItemClass);
		const noDiagramMatch = legendItem.getAttribute("data-no-diagram-match");
		const matchingGalleryItem = gallery.querySelector("." + legendItemClass);

		// legend item mouseover
		legendItemButton.addEventListener("mouseover", function() {

			// highlight matching diagram number
			if (noDiagramMatch !== "true") {
				matchingDiagramNumber.querySelector("button").classList.add("highlighted");
			}
		});

		// legend item mouseout
		legendItemButton.addEventListener("mouseout", function() {

			// remove all diagram number highlights
			diagramNumbersAll.forEach(number => {
				number.querySelector("button").classList.remove("highlighted");
			});
		});



		// legend item click

		legendItemButton.addEventListener("click", function() {

			// clear selected style from all legend buttons
			legend.querySelectorAll("button").forEach(button => {
				button.classList.remove("selected");
			});

			// clear selected style from all diagram buttons
			diagram.querySelectorAll("button").forEach(button => {
				button.classList.remove("selected");
			});

			// clear selected style from all gallery items
			gallery.querySelectorAll("button").forEach(button => {
				button.classList.remove("selected");
			});

			// add selected style to current legend button
			legendItemButton.classList.add("selected");

			// add selected style to matching diagram button
			if (noDiagramMatch !== "true") {
				matchingDiagramNumber.querySelector("button").classList.add("selected");
			}

			// add selected style to matching image
			matchingGalleryItem.querySelector("button").classList.add("selected");
		});



		// legend sub-level item click

		const legendSubLevelItemsAll = legendItem.querySelectorAll(".sub-level li");

		legendSubLevelItemsAll.forEach(legendSubLevelItem => {

			const subLevelButton = legendSubLevelItem.querySelector("button");
			const subLevelItemClass = legendSubLevelItem.getAttribute("class");
			const matchingGallerySubItem = gallery.querySelector("." + subLevelItemClass);

			subLevelButton.addEventListener("click", function() {

				// remove selected style from all legend sub-level buttons
				legendSubLevelItemsAll.forEach(item => {
					item.querySelector("button").classList.remove("selected");
				});

				// remove selected style from all images
				gallery.querySelectorAll("button").forEach(button => {
					button.classList.remove("selected");
				});

				// add selected style to current legend button
				subLevelButton.classList.add("selected");

				// add selected style to matching image
				matchingGallerySubItem.querySelector("button").classList.add("selected");
			});
		});
	});



	// diagram - when hovering or clicking items, control matching elements in legend and gallery

	diagramNumbersAll.forEach(diagramNumber => {

		const diagramNumberClass = diagramNumber.getAttribute("class");
		const diagramNumberButton = diagramNumber.querySelector("button");
		const matchingLegendItem = legend.querySelector("." + diagramNumberClass);
		const matchingGalleryItem = gallery.querySelector("." + diagramNumberClass);

		// diagram number mouseover
		diagramNumberButton.addEventListener("mouseover", function() {

			// highlight matching legend item
			matchingLegendItem.querySelector("button").classList.add("highlighted");
		});

		// diagram number mouseout
		diagramNumber.addEventListener("mouseout", function() {

			// remove all legend item highlights
			legendItemsAll.forEach(item => {
				item.querySelector("button").classList.remove("highlighted");
			});
		});



		// diagram number click

		diagramNumberButton.addEventListener("click", function() {

			// clear selected style from all diagram buttons
			diagram.querySelectorAll("button").forEach(button => {
				button.classList.remove("selected");
			});

			// clear selected style from all legend items
			legend.querySelectorAll("button").forEach(button => {
				button.classList.remove("selected");
			});

			// clear selected style from all images
			gallery.querySelectorAll("button").forEach(button => {
				button.classList.remove("selected");
			});

			// add selected class to current diagram button
			diagramNumberButton.classList.add("selected");

			// add selected class to matching legend item
			matchingLegendItem.querySelector("button").classList.add("selected");

			// add selected style to matching image
			matchingGalleryItem.querySelector("button").classList.add("selected");
		});
	});



	//////////////////////////////////////////////////////////
	// diagram numbers drag-drop
	//////////////////////////////////////////////////////////

	diagramNumbersAll.forEach(number => {
		dragElement(number);
	});

	function dragElement(elmnt) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		elmnt.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			const diagramHeight = diagram.offsetHeight;
			const diagramWidth = diagram.offsetWidth;

			// get the element's new position
			const newPosTop = elmnt.offsetTop - pos2;
			const newPosLeft = elmnt.offsetLeft - pos1;

			let newPosTopPercent = (newPosTop / diagramHeight) * 100;
			let newPosLeftPercent = (newPosLeft / diagramWidth) * 100;

			// left pos min/max
			if (newPosLeftPercent < 0) {
				newPosLeftPercent = 0;
			}
			else if (newPosLeftPercent > 100) {
				newPosLeftPercent = 100;
			}
			// top pos min/max
			if (newPosTopPercent < 0) {
				newPosTopPercent = 0;
			}
			else if (newPosTopPercent > 100) {
				newPosTopPercent = 100;
			}

			// set the element's new position
			// in pixels
			// elmnt.style.top = newPosTop + "px";
			// elmnt.style.left = newPosLeft + "px";
			// in percent
			elmnt.style.top = newPosTopPercent + "%";
			elmnt.style.left = newPosLeftPercent + "%";
		}

		function closeDragElement() {
			/* stop moving when mouse button is released:*/
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}



	//////////////////////////////////////////////////////////
	// gallery image zoom on click
	//////////////////////////////////////////////////////////

	gallery.querySelectorAll("button").forEach(galleryButton => {
		galleryButton.addEventListener("click", function() {
			galleryButton.classList.add("zoom");
		});
	});



	// exit zoom on click outside of image

	document.addEventListener("click", function(event) {

		const zoomedItem = gallery.getElementsByClassName("zoom");

		if (zoomedItem.length && !event.target.closest(".zoom")) {
			gallery.querySelector(".zoom").classList.remove("zoom");
		}
	});



	// exit zoom if press escape key

	document.addEventListener("keydown", function(event) {
		if(event.key == "Escape") {
			gallery.querySelector(".zoom").classList.remove("zoom");
		}
	});



	// prevent tabbing when zoomed

	document.addEventListener("keydown", function(event) {

		const zoomedItem = gallery.getElementsByClassName("zoom");

		if (zoomedItem.length && event.key === "Tab") {
			event.preventDefault();
		}
	});
}
