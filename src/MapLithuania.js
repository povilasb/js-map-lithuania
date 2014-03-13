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

var MapLithuania = function(mapId) {

	this.version = "0.1.0";

	this.mapId = mapId;

	this.getMapElementEventHandler = function(element, handler) {
		return function() {
			handler(element);
		}
	};

	var map = document.getElementById(mapId).contentDocument;
	var counties = map.getElementsByClassName("lt-county");


	/* Public methods */

	/**
	 * Adds mouse over handler for county area.
	 *
	 * @param handler mouse over handler function. County name
	 *	is passed to this function as the first parameter.
	 */
	this.addCountyMouseOverHandler = function(handler) {
		for (i = 0; i < counties.length; i++) {
			var mouseOverHandler = this.getMapElementEventHandler(
				counties[i].id, handler);
			counties[i].addEventListener("mouseover",
				mouseOverHandler);
		}
	}

};


window.MapLithuania = MapLithuania;
