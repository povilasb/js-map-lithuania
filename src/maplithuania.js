/**
 * LICENSE: Apache 2.0.
 *
 * This module follows Google JavaScript style guide.
 *
 * Available counties:
 *
 * - alytus;
 * - vilnius;
 * - kaunas;
 * - klaipeda;
 *   - neringa;
 * - utena;
 * - siauliai;
 * - panevezys;
 * - taurage;
 * - telsiai;
 * - marijampole.
 *
 *  &copy; povilasb.com
 */

window['mapLithuania'] = {
	version : '0.1.1'
};

/**
 * @namespace mapLithuania
 */
mapLithuania = window['mapLithuania'];


/**
 * @constructor
 * @param {String} containerId element id in which map <svg> will be inserted.
 */
mapLithuania.Map = function(containerId) {

	this.getMapElementEventHandler = function(element, handler) {
		return function() {
			handler(element);
		}
	};

	var svgContainer = document.getElementById(containerId);

	// TODO: uncomment the checks. Right now google compiler crashes
	// becuase of them. Reason unknown. Might be compiler bug.
	/*
	if (typeof svgcontainer == 'undefined') {
		var err = 'mapLithuania: Could not find element #'
			+ containerId;
		throw err;
	}

	if (typeof mapLithuania.strSvgMap == 'undefined') {
		throw 'mapLithuania: Compilation error - could not find ' +
			'map svg element string.';
	}
	*/

	svgContainer.insertAdjacentHTML("beforeend", mapLithuania.strSvgMap);

	this.map = document.getElementById("lt-county-map");
	this.counties = this.map.getElementsByClassName("lt-county");

};


/* Public functions. */


/**
 * Adds mouse over handler for county area.
 *
 * @param {Function} handler mouse over handler function. County name
 *	is passed to this function as the first parameter.
 */
mapLithuania.Map.prototype.addCountyMouseOverHandler = function(handler) {
	for (i = 0; i < this.counties.length; i++) {
		var mouseOverHandler = this.getMapElementEventHandler(
			this.counties[i].id, handler);
		this.counties[i].addEventListener("mouseover",
			mouseOverHandler);
	}
};


/**
 * Sets the specified county to be active (highlighted).
 *
 * @param {String} county name of county to be set active.
 */
mapLithuania.Map.prototype.setActiveCounty = function(county) {
	var element = this.map.getElementById(county);
	addClass(element, "active");
};


/* Private functions. */


/**
 * Checks if the specified dom element has the specified class name.
 *
 * @param element dom element.
 * @param className class to check.
 * @return {boolean} true of false.
 */
function hasClass(element, className) {
	return new RegExp('(\\s|^)' + className + '(\\s|$)').test(
		element.getAttribute('class'));
};

/**
 * Appends the specified class name to the specified dom element if it does
 * not have this class yet.
 *
 * @param element dom element.
 * @param className class to append.
 */
function addClass(element, className) {
	if (!hasClass(element, className)) {
		element.setAttribute('class', element.getAttribute('class')
			+ ' ' + className);
	}
};


/**
 * Removes the specified class name if one exists in the specified dom element
 * attribute 'class'.
 *
 * @param element dom element.
 * @param className class to remove.
 */
function removeClass(element, className) {
	var removedClass = element.getAttribute('class').replace(
		new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
	if (element.hasClass(className)) {
		element.setAttribute('class', removedClass);
	}
};


/* Exporting symbols for closure compiler. */

mapLithuania['Map'] = mapLithuania.Map;

mapLithuania.Map.prototype['addCountyMouseOverHandler'] =
	mapLithuania.Map.prototype.addCountyMouseOverHandler;

mapLithuania.Map.prototype['setActiveCounty'] =
	mapLithuania.Map.prototype.setActiveCounty;
