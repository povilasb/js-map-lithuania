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
 * NOTE: SVG element is embedded with object tag. Limitation of this technique
 * is that it is restricted by the same-origin policy, svg must be hosted on
 * the same domain as the html file, otherwise the inner DOM of the object
 * will be inaccessible.
 *
 *  &copy; povilasb.com
 */

/**
 * @constructor
 */
var MapLithuania = function(mapId) {

	this.version = "0.1.0";

	this.mapId = mapId;

	this.getMapElementEventHandler = function(element, handler) {
		return function() {
			handler(element);
		}
	};

	var map = document.getElementById(mapId).contentDocument;
	this.counties = map.getElementsByClassName("lt-county");

};


/* Public functions. */


/**
 * Adds mouse over handler for county area.
 *
 * @param {Function} handler mouse over handler function. County name
 *	is passed to this function as the first parameter.
 */
MapLithuania.prototype.addCountyMouseOverHandler = function(handler) {
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
MapLithuania.ptototype.setActiveCounty = function(county) {
	var element = map.getElementById(county);
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


window['MapLithuania'] = MapLithuania;
MapLithuania.prototype['addCountyMouseOverHandler'] =
	MapLithuania.prototype.addCountyMouseOverHandler;
MapLithuania.prototype['setActiveCounty'] =
	MapLithuania.prototype.setActiveCounty;
