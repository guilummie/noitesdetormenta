/*:
 * @target MZ
 * @plugindesc Sound per character on dialogue.
 * @author DevWithCoffee
 *
 * @help RMMZ-SpeedDialogue.js
 * The Script is just a modification of Rpg Maker's native function
 * so it's free to develop commercial games
 *
 * @param Speed
 * @type number
 * @desc Set Speed
 * @default 10
 * @min 0
 * @max 20
 *
 * @command Speed
 * @text Change Config
 * @desc Change the speed dialog here.
 *
 * @arg Speed
 * @text Speed
 * @type number
 * @default 10
 * @min 0
 * @max 20
 * @desc Select the Speed
 */

(() => {
	const pluginName = "RMMZ-SpeedDialogue";
	var parameters = PluginManager.parameters(pluginName);
	
    PluginManager.registerCommand(pluginName, 'Speed', args => {
		parameters.Speed = args.Speed;
		PluginManager.loadScript(pluginName);
    });

	Window_Base.prototype.processCharacter = function(textState) {
		this._waitCount = parameters['Speed'];
		this._showFast = true;
		
		const c = textState.text[textState.index++];
		if (c.charCodeAt(0) < 0x20) {
			this.flushTextState(textState);
			this.processControlCharacter(textState, c);
		} else {
			textState.buffer += c;
		}
	};
})();