/*:
 * @target MZ
 * @plugindesc Randomly change battle BGM 
 * @author DevWithCoffee
 *
 * @help filename: BGMBattleRandom.js
 * Script is just a modification of Rpg Maker's native function
 * so it is not necessary to credit the author and
 * it can be used in commercial projects
 *
 * Config:
 * Set BGM files on list
 * Turn On/Off through "Plugin Command"
 * Change BGM list through "Plugin Command"
 *
 * Note: Volume, Pitch and Pan will keep the default set in
 *       System1 -> Music -> Battle
 *
 * @param Active
 * @type boolean
 * @desc To define the ON or OFF
 * @default true
 *
 * @param files
 * @text BGM Battles
 * @desc List BGM Battle files
 * @type file[]
 * @dir audio/bgm
 * @default ["Battle1","Battle2","Battle3","Battle4","Battle5","Battle6","Battle7","Battle8"]
 *
 * @command Active
 * @text Enable/Disable
 * @desc Turn On/Off
 *
 * @arg Active
 * @text Active
 * @type boolean
 * @default true
 * @desc Turn On/Off
 *
 * @command files
 * @text Change BGM files
 * @desc Select files
 *
 * @arg files
 * @text Change BGM files
 * @desc Select files
 * @type file[]
 * @dir audio/bgm
 * @default []
 */

(() => {
	const pluginName = "BGMBattleRandom";
	var parameters = PluginManager.parameters(pluginName);

	PluginManager.registerCommand(pluginName, 'Active', args => {
		$gameSystem.BGMBattleRandom.Active = args.Active;
	});
	PluginManager.registerCommand(pluginName, 'files', args => {
		$gameSystem.BGMBattleRandom.files = args.files;
	});

	Game_System.prototype.initialize = function() {
		this._saveEnabled = true;
		this._menuEnabled = true;
		this._encounterEnabled = true;
		this._formationEnabled = true;
		this._battleCount = 0;
		this._winCount = 0;
		this._escapeCount = 0;
		this._saveCount = 0;
		this._versionId = 0;
		this._savefileId = 0;
		this._framesOnSave = 0;
		this._bgmOnSave = null;
		this._bgsOnSave = null;
		this._windowTone = null;
		this._battleBgm = null;
		this._victoryMe = null;
		this._defeatMe = null;
		this._savedBgm = null;
		this._walkingBgm = null;
		this.BGMBattleRandom = {"Active":parameters.Active, "files":parameters.files};
	};
	
	Scene_Battle.prototype.initialize = function() {
		if($gameSystem.BGMBattleRandom.Active == "true"){
			var dsbgm = $dataSystem.battleBgm;
			var sortbgm = JSON.parse($gameSystem.BGMBattleRandom.files);
			if(sortbgm.length > 0){
				$gameSystem.setBattleBgm({"name":sortbgm[Math.floor(Math.random() * sortbgm.length)],"pan":dsbgm.pan,"pitch":dsbgm.pitch,"volume":dsbgm.volume});
			}
		}
		Scene_Message.prototype.initialize.call(this);
	};
})();

