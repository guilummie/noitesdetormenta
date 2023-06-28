/*:
 * @target MZ
 * @plugindesc Ao desferir um acerto crítico ou um golpe super efetivo, o jogador ganha um turno extra.
 * @author Caethyril (Modificado por Lummie)
 * @url https://forums.rpgmakerweb.com/index.php?threads/153960/
 * @help Gratuito para usar e/ou modificar para qualquer projeto, sem necessidade de crédito.
 */

let extraTurn = false;

void (() => {
  'use strict';
  let extraTurnsGiven = 0;
  void (alias => {
    Game_Action.prototype.apply = function(target) {
      alias.apply(this, arguments);
      let effective = target.result().critical;
      if (this.item().damage && this.item().damage.elementId) {
        for (const elementId of [this.item().damage.elementId]) {
          if (target.elementRate(elementId) > 1) {
            effective = true;
            break;
          }
        }
      }
      if (effective) {
        extraTurn = true;
      }
    };
  })(Game_Action.prototype.apply);
  void (alias => {
    BattleManager.startTurn = function() {
      alias.apply(this, arguments);
      extraTurnsGiven = 0;
    };
  })(BattleManager.startTurn);
  void (alias => {
    BattleManager.endBattlerActions = function(battler) {
      alias.apply(this, arguments);
      if (extraTurnsGiven < 1 && extraTurn) {
        battler.initTpbChargeTime(true);
        AudioManager.playSe({name: 'Flash2', pan: 0, pitch: 150, volume: 90});
        extraTurnsGiven++;
      }
      extraTurn = false;
    };
  })(BattleManager.endBattlerActions);
})();
