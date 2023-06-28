//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.75;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.75] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x41f3d3=_0x4926;function _0x2500(){const _0x58bc54=['WjwCy','bgmVolume','XAPcC','IconParam2','EquipMenu','KljPx','repeat','reserveCommonEvent','isNumpadPressed','WIN_ICO_HELP','onLoad','params','isActiveTpb','Game_Picture_show','mainAreaTop','makeTargetSprites','enemies','Plus1','changeClass','addOnceParallelInterpreter','loading','IuLey','InputRect','PositionY','Game_Actor_changeClass','areButtonsOutsideMainUI','forceStencil','ScreenResolution','_startPlaying','HWVag','xparamFlatBonus','updateDashToggle','BKSP','Bitmap_blt','_stored_powerDownColor','uGVtX','_statusWindow','ShowJS','buttons','expGaugeColor2','NUMPAD7','VIEWPORT','PictureID','Scene_Base_createWindowLayer','yCNpU','_animation','_backgroundSprite','ColorSystem','isPointAnimationPlaying','buttonAssistOffset4','GRD','Ikwun','getLastGamepadUsed','removeFauxAnimation','drawTextTopAligned','BgFilename1','sMwri','deflate','MRG','makeDocumentTitle','Window_Base_createTextState','JLRXi','maxScrollY','ValueJS','toLocaleString','isFullDocumentTitle','pNlja','nzepb','TTLMI','dropItems','blendFunc','remove','isLoopVertical','Window_Selectable_processCursorMove','OUTCUBIC','BlurFilter','sPFiG','CommandBgType','Smooth','RIGHT','isNormalPriority','CRSEL','command355','Input_update','YFuqu','_scrollDuration','BgFilename2','NewGameBoot','FunctionName','createButtonAssistWindow','Graphics_defaultStretchMode','sqrt','_statusEquipWindow','ExtJS','StartID','setSideView','stop','sv_actors','skipBranch','Scene_Item_create','233334vejozU','EUkSI','background','initialize','LRXpN','buttonAssistWindowSideRect','ApplyEasing','round','drawActorSimpleStatus','ListRect','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','F6key','canUse','IconSParam6','defaultInputMode','overallHeight','QVrhZ','mainFontSize','damageColor','_shakePower','outlineColorDmg','buttonAssistCancel','loadWindowskin','_backgroundFilter','charAt','altKey','XParamVocab1','Window_NameInput_cursorRight','CategoryRect','Window_NameInput_cursorPageup','mFjHQ','levelUpRecovery','adjustPictureAntiZoom','_destroyCanvas','oVZdt','vertical','isSideButtonLayout','yTdXX','jTlXu','restore','paramMax','xPJUa','FUNC','getBackgroundOpacity','scale','isBusy','ColorTPGauge1','setEasingType','Game_Interpreter_command111','Conditional\x20Branch\x20Script\x20Error','FINAL','StatusEquipBgType','EALil','KeyTAB','WIN_OEM_FJ_TOUROKU','Game_Picture_initBasic','createMenuButton','_menuButton','Layer','Window_Selectable_drawBackgroundRect','piLRc','nhMML','random','subjectHitRate','ESC','ColorDeath','menu','_sideButtonLayout','transform','getLastPluginCommandInterpreter','buttonAssistKey3','buttonAssistOk','Mydxz','system','BuyRect','refreshScrollBarBitmap','Weapon-%1-%2','makeCoreEngineCommandList','drawActorNickname','sceneTerminationClearEffects','dFKfr','setSkill','vPAhC','_pictureCoordinatesMode','XParamVocab7','centerCameraCheckData','KeySHIFT','Game_Map_scrollDown','storeMapData','0.00','toUpperCase','Sprite_Gauge_gaugeRate','MDF','VOLUME_UP','EXR','isMaskingEnabled','faceHeight','item','drawGauge','buttonAssistText5','cyOGi','scrollLeft','Scene_Menu_create','updateKeyText','_forcedBattleSys','COMMA','\x20Origin:\x20%1','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','command357','_lastX','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','ENTER','Spriteset_Base_isAnimationPlaying','_targets','%1〘Choice\x20%2〙\x20%3%1','setWindowPadding','inBattle','LoadError','mainAreaBottom','backOpacity','sparamPlus2','_balloonQueue','klalz','_digitGrouping','tqfaG','TextJS','tpGaugeColor1','rywdO','OpenURL','constructor','gpldd','mpColor','SbosZ','HKixb','Game_Picture_x','XParameterFormula','ONE','gMsKZ','MAX_SAFE_INTEGER','BarThickness','process_VisuMZ_CoreEngine_RegExp','isScrollBarVisible','ButtonFadeSpeed','NUMPAD5','TimeProgress','concat','ParseEnemyNotetags','length','ScaleX','(\x5cd+\x5c.?\x5cd+)>','destroyed','wUeRL','dLikJ','scrollDown','scaleMode','updateScrollBarVisibility','GoldFontSize','Window_Base_initialize','seek','_currentBgs','AuBLh','iJUxS','_screenX','tilesetFlags','paramX','bgs','NUMPAD9','drawCharacter','Map%1.json','_stored_mpGaugeColor1','Game_Map_scrollRight','maxTp','get','opacity','createSpriteset','drawIconBySize','OUTELASTIC','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','stringKeyMap','_startDecrypting','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','LbIeO','Input_onKeyDown','buttonAssistOffset2','IzhHK','alphabetic','canEquip','aVRWC','xparamRateJS','(\x5cd+)>','AZcjU','_active','setActorHomeRepositioned','makeDeepCopy','encounterStepsMinimum','initCoreEngine','XOPHL','contents','wXfcJ','createPointAnimationQueue','drawValue','UMznI','Spriteset_Base_update','LUK','parameters','CONVERT','fCNtb','_centerCameraCheck','subtitle','iQAxZ','MAXHP','_clickHandler','switchModes','retrieveFauxAnimation','IconXParam1','TCR','F18','NoTileShadows','initMembersCoreEngine','destroy','learnings','mhOnX','aAdph','_mp','AnimationID','LvExpGauge','GIoWC','_rate','cursorPagedown','lsNhv','_movementDuration','_hideTileShadows','xparamRate','_dimmerSprite','measureTextWidth','powerUpColor','keyMapper','isGamepadTriggered','Linear','IconXParam4','xparamFlatJS','Scene_MenuBase_mainAreaHeight','ListBgType','KeyboardInput','gradientFillRect','open','ZnErv','eUDOg','_pictureName','gainGold','itemEva','_cache','qZfoH','statusEquipWindowRect','Window_Base_drawFace','rJOZT','KeyUnlisted','PqZPk','stencilOp','Input_clear','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','BlurStrength','ExtractStrFromMap','LineHeight','bitmapHeight','XParamVocab5','SkillMenu','234730zUxboD','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','fillAll','_buttonAssistWindow','HIT','ParseClassNotetags','_hp','paramName','bodyColor','DigitGroupingDamageSprites','kZTNt','TGR','Scene_Map_createSpritesetFix','allTiles','ItemRect','buttonAssistText%1','GrWtR','ColorTPGauge2','allowShiftScrolling','IZsKq','ExtDisplayedParams','itemBackColor2','aKDRa','gAKFy','DisplayedParams','loadBitmap','tileHeight','Game_Character_processMoveCommand','DOUBLE_QUOTE','jBrdK','pDbSA','ColorMPGauge2','determineSideButtonLayoutValid','checkSubstitute','VariableJsBlock','Scene_Map_createSpriteset_detach','targetScaleY','aFoje','stencilFunc','createCustomParameter','ceil','_pagedownButton','GfzmZ','_upArrowSprite','key%1','_mainSprite','jpzLB','pKAXN','buttonAssistOffset3','Bitmap_resize','Window_TitleCommand_selectLast','ParseArmorNotetags','SIzIQ','RightMenus','JSON','CustomParamType','F11','XParamVocab9','ItemPadding','oMWoa','AudioChangeBgmPitch','pos','FSDjU','FDR','_cancelButton','pop','OUTBOUNCE','FHoWC','JeZll','AXxLM','EnableNameInput','updateShadow','isSceneBattle','catchLoadError','setAction','TRG','_commonEventLayers','playLoad','bukRx','kTlQk','Bitmap_clearRect','AllTroops','targetObjects','numActions','helpAreaTopSideButtonLayout','indexOf','paramRate2','Scene_Options_create','SParamVocab5','Sprite_Picture_loadBitmap','OPEN_CURLY_BRACKET','test','createCustomBackgroundImages','OS_KEY','toLowerCase','ooBIC','drawGameVersion','_smooth','_bgsBuffer','EXCLAMATION','updateMainMultiply','setActorHome','WIN_ICO_CLEAR','skillTypes','Window_NameInput_cursorDown','listWindowRect','paintOpacity','printError','CEV','nItal','XIJjY','ExportStrFromAllTroops','Scene_Map_update','%2%1%3','eUyoO','Window','tpCostColor','quit','NewGameCommonEvent','createKeyJS','QTFoe','value','fadeSpeed','HANJA','WIN_OEM_COPY','setEnemyAction','IconSParam1','pitch','PictureFilename','currentValue','FontSmoothing','DOLLAR','startShake','IsIvr','GameEnd','setLastPluginCommandInterpreter','sin','CodeJS','isGamepadConnected','HsgyE','Mirror','AllMaps','Sprite_Animation_setViewport','updateOpacity','AudioChangeBgsPan','offColor','_baseTexture','LdIXe','getCoreEngineScreenShakeStyle','_stored_crisisColor','MRF','%1:\x20Exit\x20','ColorCTGauge1','loadSystem','cNBja','createPointAnimationSprite','setupBattleTestItems','asin','DETACH_PICTURE_CONTAINER','playBuzzer','hpGaugeColor2','PictureEasingType','fcpJt','retrievePointAnimation','removeAnimation','clone','Window_Base_destroyContents','StatusMenu','layoutSettings','setMute','prototype','makeInputButtonString','onKeyDownKeysF6F7','updatePointAnimations','buttonAssistWindowRect','drawCircle','Unnamed','_listWindow','NUM_LOCK','removeOnceParallelInterpreter','drawParamName','hdFCQ','drawBackgroundRect','ParseItemNotetags','mev','isCursorMovable','MenuLayout','_changingClass','_drawTextBody','isRepeated','SnapshotOpacity','note','Window_Selectable_itemRect','exportAllMapStrings','Rate2','ZERO','paramPlus','QEEWu','HYPHEN_MINUS','F19','createScrollBarSprites','META','hYgUz','shift','powerDownColor','removeAllFauxAnimations','Pixelated','roHst','addChildToBack','SCaTz','backgroundBitmap','blockWidth','Scene_Battle_update','_storedStack','isTouchedInsideFrame','gCutE','mLigm','QwertyLayout','IconXParam9','StatusBgType','Scene_MenuBase_helpAreaTop','setCoreEngineScreenShakeStyle','GoldMax','onInputBannedWords','endAnimation','CancelText','eventsXyNt','liHTT','Clihw','Armor-%1-%2','NONCONVERT','_inputWindow','name','10TUgOkL','framebuffer','INBOUNCE','setTargetAnchor','Game_Picture_move','resize','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Scene_Boot_updateDocumentTitle','HnGNH','Scene_Status_create','CLOSE_PAREN','Class-%1-%2','NxLFQ','CAPSLOCK','SwitchActorText','expRate','PAUSE','fillText','DimColor1','textAlign','mapId','Title','wiynQ','sparamFlatJS','advanced','characters','_startLoading','uQpKY','PHA','requiredWtypeId1','nw.gui','Spriteset_Battle_createEnemies','SUHTd','hide','IconParam1','QWeJa','filter','paramRate1','jhWYu','_pointAnimationQueue','STB','contains','NUMPAD0','ShowItemBackground','_drawTextOutline','MapOnceParallel','OptionsRect','MyKpg','ActorMPColor','isAnimationPlaying','kwGcb','processKeyboardDigitChange','destroyCoreEngineMarkedBitmaps','_opacity','isExpGaugeDrawn','hMdMB','drawFace','MainMenu','SmartEventCollisionPriority','MultiKeyFmt','scrollbar','setAttack','successRate','anchor','sparamRate','IconParam5','setFrame','HASH','SVovs','ctGaugeColor1','TextManager_param','repositionCancelButtonSideButtonLayout','pointX','GoldOverlap','DrawItemBackgroundJS','turn','Ogxko','ItemHeight','makeActionList','_fauxAnimationSprites','JmRaJ','WJvyC','clearForcedGameTroopSettingsCoreEngine','GoldRect','_stored_maxLvGaugeColor1','_lastPluginCommandInterpreter','showPointAnimations','_margin','_target','setCoreEngineUpdateWindowBg','_statusParamsWindow','activate','enableDigitGroupingEx','startAnimation','\x0a\x0a\x0a\x0a\x0a','STRUCT','xOVmo','SellRect','evaded','Scene_Battle_createSpriteset','SUBTRACT','initDigitGrouping','Flat1','vBVvj','skills','_stored_hpGaugeColor2','escape','_effectsContainer','SEMICOLON','horizontal','isActor','_cacheScaleY','viewport','targetX','ExtractStrFromTroop','PLAY','original','kCXFX','Graphics_centerElement','Game_Actor_levelUp','Sprite_destroy','_scene','events','Bitmap_gradientFillRect','checkScrollBarBitmap','centerX','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','horz','oLgrO','ParseActorNotetags','scaleX','PGDN','BottomHelp','areButtonsHidden','_shakeDuration','wtypeId','FontShadows','adjustBoxSize','createFauxAnimation','ForceNoPlayTest','updateCurrentEvent','filterArea','updateScrollBarPosition','etypeId','processSoundTimings','sparamRateJS','uyPsS','animationBaseDelay','Game_Event_isCollidedWithEvents','QoL','ExportStrFromAllMaps','drawCurrencyValue','LINEAR','iirSQ','AudioChangeBgsPitch','outbounce','result','MCR','SubfolderParse','Rewjg','initialBattleSystem','Speed','Window_NameInput_processHandling','resetTextColor','playCancel','FuBWM','ColorCTGauge2','_centerElementCoreEngine','loadSystemImages','hideButtonFromView','Scene_Map_updateMain','applyCoreEasing','alwaysDash','Scene_Boot_onDatabaseLoaded','ImprovedAccuracySystem','updateScrollBars','_lastCommandSymbol','_commandList','updatePlayTestF7','_hovered','F22','_maxDigits','enableDigitGrouping','reduce','_targetOffsetX','IconSet','visible','refreshWithTextCodeSupport','WRppN','startAutoNewGame','meVolume','targets','KnGTf','displayY','_hideButtons','_actorWindow','ADD','isEnabled','BottomButtons','retreat','DATABASE','_currentMap','cursorUp','Scene_Battle_createSpriteset_detach','render','SceneManager_initialize','_defaultStretchMode','trim','playTestF6','ItemMenu','playBgm','itemLineRect','sv_enemies','IconXParam7','ExportString','processCursorHomeEndTrigger','update','end','YexBu','updateClose','_mapNameWindow','_onceParallelInterpreters','HelpRect','Game_Interpreter_command355','fillStyle','WIN_OEM_PA1','loadTitle1','up2','type','_stored_systemColor','WIN_OEM_FJ_MASSHOU','StatusParamsRect','maxCols','openingSpeed','ZIshi','jPaCp','substring','WIN_OEM_RESET','hit','OTB','destroyScrollBarBitmaps','_coreEasingType','KEEP','_coreEngineShakeStyle','ReDEY','isTpb','mpCostColor','_digitGroupingEx','makeCommandList','TPB\x20WAIT','createFauxAnimationQueue','TRAIT_PARAM','traitsPi','_refreshBack','thickness','_CoreEngineSettings','_colorCache','parallaxes','Gold','TPB\x20ACTIVE','CONTEXT_MENU','pMHgd','BarBodyColor','titles2','QOtoN','VisuMZ_2_BattleSystemETB','OffBarColor','_helpWindow','isMVAnimation','buttonAssistKey2','gaugeBackColor','ParamArrow','processCursorMoveModernControls','Game_BattlerBase_initMembers','SParamVocab2','PDR','terms','textWidth','UsZAQ','Tilemap_addShadow','pNTjq','setupNewGame','volume','IconSParam9','uiAreaHeight','getInputButtonString','OUTBACK','Icon','processAlwaysEscape','BgType','Sprite_Battler_startMove','_destroyInternalTextures','KWgsQ','3966083XUCBlP','buttonAssistText2','pzrJK','TIMwk','buttonAreaHeight','removeAnimationFromContainer','VisuMZ_2_BattleSystemSTB','initCoreEasing','_repositioned','sparamFlatBonus','MAX_GL_TEXTURES','setupButtonImage','1752EHOEts','valueOutlineColor','EOQYJ','DisplayLockX','App','updatePositionCoreEngineShakeRand','createContents','PERIOD','_scaleX','ParseSkillNotetags','focus','Spriteset_Base_destroy','cdltN','SceneManager_isGameActive','nah','playEscape','paramBaseAboveLevel99','NumberRect','oWyyR','EQUALS','gmKjN','format','TyYJy','ExtractStrFromList','updateBgmParameters','ControllerButtons','targetSpritePosition','isMagical','DigitGroupingGaugeSprites','normal','GoldChange','_targetX','createCommandWindow','optionsWindowRect','isPressed','VisuMZ_2_BattleSystemCTB','BoxMargin','FadeSpeed','PictureEraseAll','src','EVA','Bitmap_drawTextOutline','_createInternalTextures','ColorMaxLvGauge1','popScene','ZObON','OutlineColorDmg','updateAnchor','MAMcv','pictureButtons','updatePictureCoordinates','KGDsX','_refreshArrows','nfnvQ','JzWtH','buttonY','F7key','processKeyboardBackspace','150XqFSRD','MULTIPLY','XParamVocab8','VKqft','_skillTypeWindow','removePointAnimation','isSpecialCode','tilesets','gYYYD','GOLsB','clear','DocumentTitleFmt','Game_Interpreter_updateWaitMode','hMPZT','refresh','LevelUpFullMp','tlKqQ','_screenY','SceneManager_onKeyDown','Sprite_AnimationMV_processTimingData','PRmzf','clearOnceParallelInterpreters','imageSmoothingEnabled','WnnMH','SParamVocab0','lineHeight','filters','_allTextHeight','Scene_Map_createSpriteset','_stored_normalColor','REC','clearStencil','INOUTELASTIC','xVXeY','_updateFilterArea','SPACE','scrollUp','drawCurrentParam','dESPN','IVhNn','TWhne','INOUTQUAD','pJTaq','TextCodeClassNames','GoldIcon','numRepeats','IconSParam2','showDevTools','83048DfRVrb','VOnmC','BattleSystem','targetEvaRate','QUESTION_MARK','〘Common\x20Event\x20%1:\x20%2〙\x20End','currentLevelExp','YxigX','ItemBgType','worldTransform','itemHit','_context','currentClass','XParamVocab3','AMPERSAND','subject','ALT','hNibp','Bitmap_fillRect','Input_updateGamepadState','keyboard','isEventTest','_texture','XParamVocab2','BTestWeapons','reservePlayTestNewGameCommonEvent','Symbol','skillId','NUM','alpha','_storedMapText','MapNameTextCode','WIN_OEM_ENLW','adjustSprite','_sellWindow','processPointAnimationRequests','number','helpAreaTop','saveViewport','HRG','pvAoC','neldu','URL','statusParamsWindowRect','PZPuN','Window_MapName_refresh','paramBase','ParamMax','_data','_editWindow','uCBds','WIN_OEM_CUSEL','xparamFlat1','nmaaG','_tempActor','Sprite_Animation_processSoundTimings','Bitmap_drawText','cursorDown','top','sparamFlat1','center','context','lMZaU','VOLUME_MUTE','McDrq','souGq','sQfze','Basic','targetScaleX','tPmaz','_makeFontNameText','process_VisuMZ_CoreEngine_CustomParameters','Scene_Map_initialize','match','select','iyQJY','ZnpNZ','CyTwI','WIN_OEM_ATTN','textSizeEx','boxWidth','faces','Subtitle','Game_Temp_initialize','createDigits','_backSprite','HAfMk','addLoadListener','HelpBgType','MknMx','disable','Chance','Padding','commandWindowRect','Plus','save','BuyBgType','createTroopNote','_coreEasing','_targetScaleX','command111','stretch','ColorMaxLvGauge2','_scrollBarVert','Sprite_Picture_updateOrigin','paramRate','updatePositionCoreEngine','catchNormalError','_profileWindow','_pauseSignSprite','applyForcedGameTroopSettingsCoreEngine','createTitleButtons','XftWO','windowRect','scaleY','Window_NameInput_processTouch','vIyYU','processKeyboardHome','IconXParam8','battlerHue','_downArrowSprite','LevelUpFullHp','_number','_muteSound','Window_NameInput_cursorUp','onEscapeSuccess','_movementWholeDuration','NUMPAD6','getGamepads','onInputOk','DetachBattlePictureContainer','GnKWH','gainSilentTp','resetBattleSystem','toFixed','integer','removeChild','REPLACE','_shakeSpeed','TtsnN','_origin','status','CDbyq','<JS\x20%1\x20%2:[\x20](.*)>','Spriteset_Base_initialize','slotWindowRect','NameMenu','mainAreaTopSideButtonLayout','drawActorLevel','DrawIcons','clearCachedKeys','keyRepeatWait','NUMPAD1','OutlineColorGauge','animationNextDelay','style','measureText','hpGaugeColor1','expGaugeColor1','iiRdv','STENCIL_TEST','ButtonAssist','RepositionActors','TextCodeNicknames','drawBackground','Origin','yScrollLinkedOffset','ctrl','INOUTSINE','_registerKeyInput','_troopId','Spriteset_Base_updatePosition','runCombinedScrollingTextAsCode','Scene_Battle_createSpritesetFix','_stored_expGaugeColor2','SCROLLBAR','NUMPAD2','updateOrigin','endAction','drawTextEx','font-smooth','exit','setValue','EgKsJ','smoothSelect','titles1','ColorGaugeBack','Window_NumberInput_start','initBasic','buyWindowRect','startNormalGame','battlebacks1','Game_Picture_y','maxVert','mlhZL','createCancelButton','FontSize','Bitmap_measureTextWidth','ZzKyY','STR','EditBgType','updatePositionCoreEngineShakeHorz','setupScrollBarBitmap','_playtestF7Looping','process_VisuMZ_CoreEngine_Functions','OUTCIRC','max','Rate1','(\x5cd+)([%％])>','makeEncounterCount','text%1','JBbwa','zHTtW','Scene_GameEnd_createBackground','mainAreaHeightSideButtonLayout','createFauxAnimationSprite','picture','XMKYY','description','FontWidthFix','CTRL','2967zkixBn','object','Rate','jsonToZip','animations','ColorTPCost','drawActorExpGauge','maxScrollX','setMoveEasingType','goldWindowRect','attackSkillId','Window_StatusBase_drawActorSimpleStatus','dIoqA','ParamChange','data/','%1\x0a','isSideView','initCoreEngineScreenShake','processTimingData','BTestArmors','setViewportCoreEngineFix','kOmNY','OUTQUART','clearRect','MINUS','strokeRect','CRVEb','_stored_ctGaugeColor1','resetFontSettings','BACKSPACE','ButtonHeight','EndingID','cancel','State-%1-%2','pqiOE','ofNMM','StatusRect','zsVxe','OffBarOpacity','iFxix','LJXLm','xparamFlat2','pagedown','slice','vSwcv','KiWkO','\x5c}❪SHIFT❫\x5c{','Tgbyv','_lastGamepad','valueOutlineWidth','updateFauxAnimations','_backSprite2','areTileShadowsHidden','getBattleSystem','Window_Selectable_cursorUp','gLGuk','colSpacing','BattleManager_processEscape','getColor','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','contentsBack','height','_scaleY','isKeyItem','JLqWY','setViewport','processTouch','COLON','clamp','Plus2','DataManager_setupNewGame','GmSQV','getControllerInputButtonMatch','_centerElement','nqgVq','MhiRK','FGSSV','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','scrollY','cancelShowButton','fmaOe','itemPadding','Sprite_Button_initialize','lLzXk','bind','_baseSprite','rYzcV','Mdelq','renderNoMask','1.4.4','backspace','_animationQueue','pageup','Game_Map_scrollUp','getColorDataFromPluginParameters','removeAllPointAnimations','_clientArea','updateMove','updateWaitMode','_goldWindow','_targetY','iconWidth','fillRect','F14','ColorManager_loadWindowskin','VKyfk','targetContentsOpacity','Game_Interpreter_command122','process_VisuMZ_CoreEngine_Settings','StatusParamsBgType','startMove','Game_Interpreter_command105','Game_Picture_calcEasing','Actor-%1-%2','calcEasing','dimColor1','setHandler','ParseTilesetNotetags','Wait','OpenSpeed','Game_Actor_paramBase','_customModified','padZero','img/%1/','createBackground','darwin','INQUINT','onActorChange','setLastGamepadUsed','maxItems','index','isPhysical','CustomParamIcons','SkillTypeBgType','clvSe','EISU','IconParam3','updateEffekseer','ScreenShake','SNksi','playOnceParallelInterpreter','changeTextColor','ParamName','PBajO','updateDocumentTitle','BTestAddedQuantity','Color','JTOea','rqJpy','itemHitImprovedAccuracy','children','Manual','_lastY','createBuffer','setBackgroundOpacity','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','targetOpacity','_stored_powerUpColor','TAUnu','setupCoreEngine','OpenConsole','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','doesNameContainBannedWords','isClosed','OUTQUINT','windowOpacity','XItEm','WxTOb','Window_NameInput_initialize','tpColor','CommonEventID','LRVle','paramMaxJS','loadGameImagesCoreEngine','Untitled','down','setBackgroundType','gaugeLineHeight','IconSParam8','DKKmA','min','633YziZxv','isGamepadButtonPressed','SEPARATOR','WIN_OEM_WSCTRL','maxTurns','skillTypeWindowRect','_logWindow','NhaNp','openURL','replace','SParamVocab3','IconIndex','setColorTone','HTDFI','MEV','SellBgType','updateBackOpacity','horzJS','pIXvg','getLevel','_displayX','_phase','Renderer','INOUTQUART','Match','Input_setupEventHandlers','_stored_maxLvGaugeColor2','writeFile','exportAllTroopStrings','sSIra','getButtonAssistLocation','ANdDF','VisuMZ_2_BattleSystemOTB','outlineColorGauge','registerCommand','enable','MwCEo','isOpenAndActive','send','_currentBgm','VisuMZ_2_BattleSystemPTB','home','Game_Picture_scaleX','_windowskin','RPGMAKER_VERSION','animationShouldMirror','cMJqX','_categoryWindow','paramPlusJS','nSetz','_lastOrigin','ItemBackColor1','getCombinedScrollingText','mainAreaHeight','scaleSprite','updateCoreEasing','isAnimationForEach','Window_StatusBase_drawActorLevel','_targetOpacity','ooxyX','SideButtons','Scene_Boot_startNormalGame','Game_Event_start','BaseTexture','ColSpacing','CoreEngine','_spriteset','Game_Screen_initialize','mhp','Scene_MenuBase_createBackground','font','bitmap','Settings','Scene_Base_create','ExportAllMapText','_pictureCoordinatesWindow','CallHandlerJS','atbActive','performEscape','Graphics','randomInt','F12','AutoStretch','AudioChangeBgmVolume','CrisisRate','_pollGamepads','dJuwj','DefaultMode','dashToggle','cnRnA','Game_Action_itemEva','PageChange','Flat','drawIcon','_buttonType','Keyboard','SjKsh','consumeItem','xparam','createDimmerSprite','itemWindowRect','DummyRect','KANA','origin','Window_NumberInput_processDigitChange','_setupEventHandlers','Scene_Unlisted','Control\x20Variables\x20Script\x20Error','setupFont','loadMapData','ModernControls','fontSize','LESS_THAN','IconXParam3','ACKun','ExportCurMapText','BACK_QUOTE','AudioChangeBgsVolume','scrollX','AGI','Duration','STENCIL_BUFFER_BIT','addAnimationSpriteToContainer','Scene_Skill_create','nRVvs','log','join','Game_Action_numRepeats','checkCoreEngineDisplayCenter','_inputString','ConvertParams','getCustomBackgroundSettings','right','_itemWindow','OAhgl','DEF','jOUSA','process_VisuMZ_CoreEngine_ControllerButtons','AutoScrollLockX','Sprite_Gauge_currentValue','jsQuickFunc','CustomParamAbb','setupCoreEasing','processHandling','orhMB','glfsk','ItemStyle','_pictureContainer','ETB','Enemy','isCancelled','paramRateJS','processKeyboardDelete','onButtonImageLoad','cursorPageup','gpKZl','sparamPlus','buttonAssistOffset%1','playTestF7','move','textHeight','isBottomHelpMode','buttonAssistText4','clearZoom','useDigitGroupingEx','Mute','isRightInputMode','pointY','setupCustomRateCoreEngine','drawGameSubtitle','CRFCo','BannedWords','getLastUsedGamepadType','Game_BattlerBase_refresh','createPageButtons','BasicParameterFormula','systemColor','_blank','targetY','PTB','pagedownShowButton','SceneManager_exit','isCollidedWithEvents','onNameOk','MZBOz','return\x200','sparam','NUMPAD3','process_VisuMZ_CoreEngine_Notetags','XParamVocab4','xparamPlus1','setGuard','IconParam4','ColorExpGauge1','UNDERSCORE','Sprite_Actor_setActorHome','param','XQpcx','isDying','text','LATIN1','OmcBR','playCursorSound','isPlaying','IIorn','TextStr','setCommonEvent','INQUAD','moveMenuButtonSideButtonLayout','DashToggleR','80vWAhLX','enabled','qEXGD','_actor','jCQlI','_backSprite1','CommandRect','KeyItemProtect','RegExp','zoomScale','Window_Base_createContents','active','playMiss','AudioChangeBgmPan','InputBgType','process_VisuMZ_CoreEngine_jsQuickFunctions','_stored_expGaugeColor1','initMembers','clipboard','sellWindowRect','findSymbol','SystemLoadAudio','_height','paramchangeTextColor','ColorHPGauge1','BattleManager_update','NumberBgType','DummyBgType','setup','ColorPowerUp','addWindow','CTB','isOptionValid','setClickHandler','create','addChild','TILDE','LDGVL','catchException','stypeId','maxLvGaugeColor2','sYiPf','width','sparamRate1','pbtxx','POcGJ','_onLoad','_targetAnchor','Scene_Base_terminateAnimationClearBugFix','rkaeM','F20','isHandled','blt','Scene_Base_terminate','_pointAnimationSprites','PIPE','checkCacheKey','TocRh','【%1】\x0a','onload','Scene_MenuBase_createPageButtons','buttonAssistText3','%1%2','centerSprite','tileWidth','yQqPW','isPlaytest','%1/','nTTgF','Window_Selectable_processTouch','loadTitle2','terminate','ASTERISK','GroupDigits','applyEasing','MDR','DebugConsoleLastControllerID','duration','_subject','ANdzZ','needsUpdate','lastAnimationSprite','DIrNh','Window_Gold_refresh','ATK','EREOF','NameInputMessage','getControllerInputButtonString','createAnimationSprite','Window_Scrollable_update','processDigitChange','_stored_tpGaugeColor1','Bzpid','processCursorMove','processMoveCommand','pages','evade','Scene_Name_onInputOk','AnimationPoint','onKeyDown','smooth','CSGvH','setSize','oHMkl','Troop%1','deselect','pan','updateMain','shake','actor','maxBattleMembers','list','connected','sparamRate2','KaRGt','floor','isSmartEventCollisionOn','touchUI','SDWso','IconXParam6','Scene_Boot_loadSystemImages','createJsQuickFunction','Window_NameInput_refresh','AggzN','<%1\x20%2:[\x20]','_numberWindow','equips','BackOpacity','ybWJd','getPointAnimationLayer','isAnimationOffsetXMirrored','VisuMZ_2_BattleSystemFTB','boxHeight','expParams','IucCt','cursorLeft','isNextScene','JjaSe','uiAreaWidth','tpedC','traitObjects','([\x5c+\x5c-]\x5cd+)([%％])>','LEFT','Game_Party_consumeItem','offset','drawItem','displayName','SystemSetSideView','itemBackColor1','isWindowMaskingEnabled','destroyContents','Window_NameInput_cursorPagedown','scrollbarHeight','operand','seNdL','PRINTSCREEN','openness','aEbbk','BdvWK','PRINT','maxLevel','isMenuButtonAssistEnabled','cjPra','F16','iconHeight','fAOJC','innerWidth','tGWSm','Window_ShopSell_isEnabled','INBACK','_battleField','paramValueByName','_bgmBuffer','ExportAllTroopText','itemHeight','gHBSW','isAlive','CustomParam','YsNxp','RequireFocus','ALWAYS','JtMaD','Bitmap_initialize','PictureShowIcon','flush','ParseWeaponNotetags','WIN_OEM_FJ_JISHO','BattleManager_checkSubstitute','OOJpP','_encounterCount','QPkmK','AccuracyBoost','mkoIj','start','_gamepadWait','helpWindowRect','dvUNy','normalColor','Scene_Shop_create','WIN_OEM_PA2','itemSuccessRate','_pressed','RepositionEnemies130','VPcod','Rpohm','mainCommandWidth','updateOnceParallelInterpreters','updatePosition','〘Common\x20Event\x20%1:\x20%2〙\x20Start','selectLast','SideView','buttonAssistText1','SParamVocab8','editWindowRect','autoRemovalTiming','WMIkn','level','CCizp','_slotWindow','loadIconBitmap','isMapScrollLinked','ARRAYSTRUCT','updateLastTarget','cursorRight','processKeyboardEnd','MODECHANGE','〘Show\x20Text〙\x0a','gDPry','urdmP','setHome','Scene_Map_createMenuButton','ActorBgType','string','eva','AKPbl','VisuMZ_2_BattleSystemBTB','maxHorz','_dummyWindow','_image','OiCdH','endBattlerActions','exec','updatePositionCoreEngineShakeVert','zXmXt','AvBNq','image-rendering','sparamPlus1','MMykb','WindowLayer_render','UdJik','rgba(0,\x200,\x200,\x201.0)','isSceneMap','upPSs','initVisuMZCoreEngine','CLEAR','contentsOpacity','Window_EquipItem_isEnabled','updatePositionCoreEngineShakeOriginal','setAnchor','SLASH','button','RepositionEnemies','1784056WoTxAN','enemy','drawGameTitle','anchorCoreEasing','ParseAllNotetags','none','INELASTIC','PixelateImageRendering','Game_Action_setAttack','updatePictureAntiZoom','Game_Picture_updateMove','buttonAssistWindowButtonRect','_isPlaytest','ColorMPGauge1','ProfileBgType','itemRect','YBgJH','ProfileRect','Window_Base_drawText','Sprite_AnimationMV_updatePosition','osMdw','UEBSu','down2','NUMPAD4','addCommand','DDhSY','and\x20add\x20it\x20onto\x20this\x20one.','SCALE_MODES','CategoryBgType','HELP','xparamPlus','ShowDevTools','cos','DetachMapPictureContainer','xparamPlusJS','isItem','_closing','enter','missed','_lastScrollBarValues','checkSmartEventCollision','erasePicture','INSERT','Actor','XParamVocab0','QnCPT','CLOSE_BRACKET','scrollRight','SaveMenu','SrNzo','Scene_Battle_createCancelButton','ScaleY','code','ColorCrisis','MAXMP','makeFontBigger','Game_Action_itemHit','_isButtonHidden','randomJS','updatePadding','GoldBgType','smallParamFontSize','responseText','isOpen','isBottomButtonMode','CNT','Game_Action_updateLastTarget','buttonAssistKey%1','drawParamText','%1〘End\x20Choice\x20Selection〙%1','inputWindowRect','toString','buttonAssistKey5','Game_Map_setup','VisuMZ_1_BattleCore','OUTSINE','Game_Troop_setup','ShowActorLevel','PreserveNumbers','padding','profileWindowRect','title','_battlerName','XParamVocab6','IconXParam5','Window_NameInput_cursorLeft','Game_Interpreter_PluginCommand','overallWidth','waiting','showFauxAnimations','mPaMT','SParameterFormula','isLoopHorizontal','HOME','_animationSprites','drawSegment','_isWindow','PositionX','WIN_OEM_BACKTAB','oczkO','pow','SystemSetWindowPadding','EVAL','_cacheScaleX','_stored_deathColor','setupValueFont','tboDn','ATTN','_opening','_commandWindow','DECIMAL','_stored_tpCostColor','maxLvGaugeColor1','pictures','isItemStyle','CustomParamNames','Opacity','titleCommandWindow','GET','_mode','createPointAnimationTargets','swGPt','markCoreEngineModified','UpdatePictureCoordinates','mute','win32','_windowLayer','ActorRect','OZBNj','hpColor','SlotRect','〘Scrolling\x20Text〙\x0a','drawGoldItemStyle','SRpws','》Comment《\x0a%1\x0a','_tilemap','platform','_displayY','Window_Base_drawCharacter','Game_Picture_scaleY','ParseStateNotetags','bgsVolume','requestFauxAnimation','dyXRo','drawText','SParamVocab7','Page','ImgLoad','left','parseForcedGameTroopSettingsCoreEngine','CJqmm','_optionsWindow','_inputSpecialKeyCode','refreshActor','processEscape','Max','INOUTEXPO','xJlMn','push','JUNJA','SdEvy','StatusEquipRect','Flat2','Location','PictureEraseRange','_playTestFastMode','yLLTW','statusWindowRect','calcCoreEasing','keyCode','moveCancelButtonSideButtonLayout','currencyUnit','isUseModernControls','dYhme','coreEngineRepositionEnemies','ItemBackColor2','split','eeiaH','child_process','Scene_Map_updateScene','originalJS','pressed','_list','acSui','yHTBI','nickname','_stored_tpGaugeColor2','INOUTCIRC','SystemSetFontSize','canAttack','OkText','isGamepadAxisMoved','FwoVw','BnJxI','Param','setTopRow','forceOutOfPlaytest','reserveNewGameCommonEvent','playCursor','OptionsBgType','call','redraw','CIRCUMFLEX','mirror','isInputting','SCROLL_LOCK','currentExp','MvAnimationRate','isTriggered','maxVisibleItems','translucentOpacity','Type','defineProperty','MAT','alignBottom','ControllerMatches','BACK_SLASH','rfUZl','SkillTypeRect','buttonAssistSwitch','INOUTCUBIC','Skill-%1-%2','_width','centerY','itypeId','FTB','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','RowSpacing','INCUBIC','ADcOs','processKeyboardHandling','GREATER_THAN','UQcGl','F13','processFauxAnimationRequests','OUTEXPO','IDs','useDigitGrouping','taUaq','JIzIz','categoryWindowRect','IconXParam0','wholeDuration','buttonAssistKey4','TitleCommandList','_duration','bgm','outlineColor','VisuMZ_1_OptionsCore','DfSHR','paramY','ALTGR','DTB','innerHeight','setMainFontSize','setSideButtonLayout','ARRAYNUM','DefaultStyle','_moveEasingType','_pageupButton','en-US','command105','WIN_OEM_FJ_ROYA','axes','Scene_MenuBase_createCancelButton','jNOso','createPointAnimation','tab','paramFlatBonus','SystemLoadImages','parse','bZHRu','apply','AcCDl','NEAREST','ARRAYEVAL','mmp','DZbWY','OPEN_PAREN','Version','getKeyboardInputButtonString','levelUp','playOk','Game_System_initialize','Finish','KUDhx','includes','setActionState','_targetScaleY','temXA','useFontWidthFix','consumable','KANnw','_forcedTroopView','Scene_Equip_create','goewE','updateData','WIN_ICO_00','seVolume','globalAlpha','INQUART','avUPw','setBattleSystem','getInputMultiButtonStrings','writeText','bEnBB','Bitmap_drawCircle','isEnemy','ZOREQ','batch','_updateGamepadState','CRI','ColorMPCost','gameTitle','fbvJt','isArrowPressed','MenuBg','CZgyb','txsdb','_onKeyDown','ColorHPGauge2','VisuMZ_4_UniqueTileEffects','map','isNwjs','BTB','buttonAssistKey1','IconSParam3','tpGaugeColor2','_anchor','displayX','Window_Base_drawIcon','Window_Base_update','#%1','textColor','fromCharCode','default','_timerSprite','Scene_Map_updateMainMultiply','show','ghecX','_buyWindow','option','WIN_OEM_FINISH','createEnemies','bitmapWidth','pfCxh','textBaseline','_stored_ctGaugeColor2','Scene_Title_drawGameTitle','paramWidth','TitlePicButtons','GetParamIcon','Input_shouldPreventDefault','lscvg','DOWN','zKuiY','rightArrowWidth','cnywF','EnableJS','PRESERVCONVERSION(%1)','onDatabaseLoaded','_onKeyPress','_scrollBarHorz','DELETE','version','maxGold','IconSParam0','initialLevel','gaugeHeight','initButtonHidden','updateTransform','_offsetY','Game_Map_scrollLeft','requestPointAnimation','_fauxAnimationQueue','deactivate','vert','animationId','Total','dimColor2','mpGaugeColor2','gaugeRate','RevertPreserveNumbers'];_0x2500=function(){return _0x58bc54;};return _0x2500();}(function(_0x49df7b,_0x3a99da){const _0x17c682=_0x4926,_0x54baef=_0x49df7b();while(!![]){try{const _0x22ab67=-parseInt(_0x17c682(0x569))/0x1*(-parseInt(_0x17c682(0x36d))/0x2)+parseInt(_0x17c682(0x4b4))/0x3*(-parseInt(_0x17c682(0x63b))/0x4)+parseInt(_0x17c682(0xa2f))/0x5+-parseInt(_0x17c682(0x3a7))/0x6*(-parseInt(_0x17c682(0x3d7))/0x7)+-parseInt(_0x17c682(0x741))/0x8+parseInt(_0x17c682(0x924))/0x9+parseInt(_0x17c682(0x23c))/0xa*(-parseInt(_0x17c682(0x361))/0xb);if(_0x22ab67===_0x3a99da)break;else _0x54baef['push'](_0x54baef['shift']());}catch(_0x12aeb9){_0x54baef['push'](_0x54baef['shift']());}}}(_0x2500,0x4e480));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2ec9e4){const _0x2b309d=_0x4926;return _0x2ec9e4[_0x2b309d(0x464)]&&_0x2ec9e4[_0x2b309d(0x4b1)][_0x2b309d(0x85f)]('['+label+']');})[0x0];VisuMZ[label][_0x41f3d3(0x5b1)]=VisuMZ[label][_0x41f3d3(0x5b1)]||{},VisuMZ['ConvertParams']=function(_0x1d5578,_0x56ad74){const _0x4b5891=_0x41f3d3;for(const _0x9e3c7f in _0x56ad74){if(_0x9e3c7f[_0x4b5891(0x420)](/(.*):(.*)/i)){const _0x2b4d71=String(RegExp['$1']),_0x3e4d9e=String(RegExp['$2'])[_0x4b5891(0x97e)]()[_0x4b5891(0x30b)]();let _0x4d69ed,_0x9d0de1,_0x17b0da;switch(_0x3e4d9e){case _0x4b5891(0x3f3):_0x4d69ed=_0x56ad74[_0x9e3c7f]!==''?Number(_0x56ad74[_0x9e3c7f]):0x0;break;case _0x4b5891(0x841):_0x9d0de1=_0x56ad74[_0x9e3c7f]!==''?JSON['parse'](_0x56ad74[_0x9e3c7f]):[],_0x4d69ed=_0x9d0de1[_0x4b5891(0x883)](_0x484e81=>Number(_0x484e81));break;case _0x4b5891(0x7a7):_0x4d69ed=_0x56ad74[_0x9e3c7f]!==''?eval(_0x56ad74[_0x9e3c7f]):null;break;case _0x4b5891(0x854):_0x9d0de1=_0x56ad74[_0x9e3c7f]!==''?JSON[_0x4b5891(0x84f)](_0x56ad74[_0x9e3c7f]):[],_0x4d69ed=_0x9d0de1[_0x4b5891(0x883)](_0x5b494d=>eval(_0x5b494d));break;case _0x4b5891(0xa65):_0x4d69ed=_0x56ad74[_0x9e3c7f]!==''?JSON[_0x4b5891(0x84f)](_0x56ad74[_0x9e3c7f]):'';break;case'ARRAYJSON':_0x9d0de1=_0x56ad74[_0x9e3c7f]!==''?JSON[_0x4b5891(0x84f)](_0x56ad74[_0x9e3c7f]):[],_0x4d69ed=_0x9d0de1[_0x4b5891(0x883)](_0x34b369=>JSON[_0x4b5891(0x84f)](_0x34b369));break;case _0x4b5891(0x94e):_0x4d69ed=_0x56ad74[_0x9e3c7f]!==''?new Function(JSON['parse'](_0x56ad74[_0x9e3c7f])):new Function(_0x4b5891(0x622));break;case'ARRAYFUNC':_0x9d0de1=_0x56ad74[_0x9e3c7f]!==''?JSON[_0x4b5891(0x84f)](_0x56ad74[_0x9e3c7f]):[],_0x4d69ed=_0x9d0de1['map'](_0x22c2cb=>new Function(JSON[_0x4b5891(0x84f)](_0x22c2cb)));break;case _0x4b5891(0x49e):_0x4d69ed=_0x56ad74[_0x9e3c7f]!==''?String(_0x56ad74[_0x9e3c7f]):'';break;case'ARRAYSTR':_0x9d0de1=_0x56ad74[_0x9e3c7f]!==''?JSON[_0x4b5891(0x84f)](_0x56ad74[_0x9e3c7f]):[],_0x4d69ed=_0x9d0de1[_0x4b5891(0x883)](_0x132b08=>String(_0x132b08));break;case _0x4b5891(0x29b):_0x17b0da=_0x56ad74[_0x9e3c7f]!==''?JSON[_0x4b5891(0x84f)](_0x56ad74[_0x9e3c7f]):{},_0x1d5578[_0x2b4d71]={},VisuMZ['ConvertParams'](_0x1d5578[_0x2b4d71],_0x17b0da);continue;case _0x4b5891(0x718):_0x9d0de1=_0x56ad74[_0x9e3c7f]!==''?JSON['parse'](_0x56ad74[_0x9e3c7f]):[],_0x4d69ed=_0x9d0de1[_0x4b5891(0x883)](_0x47ffd0=>VisuMZ[_0x4b5891(0x5eb)]({},JSON[_0x4b5891(0x84f)](_0x47ffd0)));break;default:continue;}_0x1d5578[_0x2b4d71]=_0x4d69ed;}}return _0x1d5578;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x61e)]=SceneManager[_0x41f3d3(0x48c)],SceneManager[_0x41f3d3(0x48c)]=function(){const _0x1e1cd6=_0x41f3d3;VisuMZ[_0x1e1cd6(0x5aa)]['SceneManager_exit'][_0x1e1cd6(0x809)](this);if(Utils[_0x1e1cd6(0x595)]>=_0x1e1cd6(0x50d)){if(typeof nw===_0x1e1cd6(0x4b5))nw['App'][_0x1e1cd6(0x1c8)]();}},(_0x2c7c9f=>{const _0x431ed7=_0x41f3d3,_0x2bcf72=_0x2c7c9f[_0x431ed7(0x23b)];for(const _0x1207c7 of dependencies){if('CCizp'===_0x431ed7(0x714)){if(!Imported[_0x1207c7]){if(_0x431ed7(0x4d9)===_0x431ed7(0x4d9)){alert(_0x431ed7(0x9d8)[_0x431ed7(0x382)](_0x2bcf72,_0x1207c7)),SceneManager[_0x431ed7(0x48c)]();break;}else this[_0x431ed7(0x48f)](_0x223409[_0x431ed7(0x568)](this[_0x431ed7(0x536)](),0x0));}}else{if(!_0x4807e8['isPlaytest']())return;if(!_0x52578b[_0x431ed7(0x884)]())return;_0x4d6a23[_0x431ed7(0x2b5)][_0x431ed7(0x9e3)]=![],_0xf51d20[_0x431ed7(0x5aa)]['ExportStrFromAllTroops']();}}const _0x33efd1=_0x2c7c9f[_0x431ed7(0x4b1)];if(_0x33efd1[_0x431ed7(0x420)](/\[Version[ ](.*?)\]/i)){if(_0x431ed7(0xa09)===_0x431ed7(0x25f))return!![];else{const _0x58cc90=Number(RegExp['$1']);_0x58cc90!==VisuMZ[label][_0x431ed7(0x8ad)]&&(alert(_0x431ed7(0x242)['format'](_0x2bcf72,_0x58cc90)),SceneManager[_0x431ed7(0x48c)]());}}if(_0x33efd1[_0x431ed7(0x420)](/\[Tier[ ](\d+)\]/i)){if(_0x431ed7(0x3de)!==_0x431ed7(0x507)){const _0x494ac2=Number(RegExp['$1']);_0x494ac2<tier?(alert(_0x431ed7(0x98f)[_0x431ed7(0x382)](_0x2bcf72,_0x494ac2,tier)),SceneManager[_0x431ed7(0x48c)]()):tier=Math[_0x431ed7(0x4a5)](_0x494ac2,tier);}else this[_0x431ed7(0xa07)]=_0xef0bf1['CoreEngine']['Settings'][_0x431ed7(0x2d1)][_0x431ed7(0x810)]??0x4,this[_0x431ed7(0x611)](),this[_0x431ed7(0xa07)]=this[_0x431ed7(0xa07)]['clamp'](0x1,0xa);}VisuMZ[_0x431ed7(0x5eb)](VisuMZ[label]['Settings'],_0x2c7c9f[_0x431ed7(0x9f0)]);})(pluginData),((()=>{const _0x2f7ad8=_0x41f3d3;if(VisuMZ[_0x2f7ad8(0x5aa)][_0x2f7ad8(0x5b1)][_0x2f7ad8(0x2d1)][_0x2f7ad8(0x2da)]??!![])for(const _0x485703 in $plugins){if(_0x2f7ad8(0x79b)!==_0x2f7ad8(0x79b))this[_0x2f7ad8(0x4ae)](_0x22c57b,_0x44c1b1,_0x18a1eb,_0x269af6,_0x81a303);else{const _0x28b405=$plugins[_0x485703];_0x28b405[_0x2f7ad8(0x23b)][_0x2f7ad8(0x420)](/(.*)\/(.*)/i)&&(_0x28b405[_0x2f7ad8(0x23b)]=String(RegExp['$2']['trim']()));}}})()),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x69d),_0x302ab0=>{const _0x19b546=_0x41f3d3;if(!SceneManager[_0x19b546(0x2b5)])return;if(!SceneManager[_0x19b546(0x2b5)][_0x19b546(0x5ab)])return;VisuMZ['ConvertParams'](_0x302ab0,_0x302ab0);const _0x46c3c1=Math[_0x19b546(0x92b)](_0x302ab0[_0x19b546(0x284)]),_0x48378f=Math['round'](_0x302ab0[_0x19b546(0x610)]);$gameTemp[_0x19b546(0x8b6)](_0x46c3c1,_0x48378f,_0x302ab0[_0x19b546(0xa04)],_0x302ab0[_0x19b546(0x1df)],_0x302ab0[_0x19b546(0x60e)]);}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x5bc),_0x5d1f1f=>{const _0x115855=_0x41f3d3;VisuMZ[_0x115855(0x5eb)](_0x5d1f1f,_0x5d1f1f);const _0x4ba7f6=Math[_0x115855(0x92b)](_0x5d1f1f[_0x115855(0x356)])[_0x115855(0x4f8)](0x0,0x64),_0x5993d4=AudioManager[_0x115855(0x590)];if(_0x5993d4){if(_0x115855(0x7e7)===_0x115855(0x4b0))for(const _0x3cffc2 of _0x4a874a['list']){[0x6c,0x198][_0x115855(0x85f)](_0x3cffc2[_0x115855(0x775)])&&(_0x3e1802+='\x0a',_0x2589bb+=_0x3cffc2[_0x115855(0x9f0)][0x0]);}else _0x5993d4[_0x115855(0x356)]=_0x4ba7f6,_0x5993d4[_0x115855(0x190)]=AudioManager[_0x115855(0x6e7)][_0x115855(0x9c2)](),AudioManager['updateBgmParameters'](_0x5993d4),AudioManager[_0x115855(0x30e)](_0x5993d4,_0x5993d4[_0x115855(0x190)]),AudioManager[_0x115855(0x6e7)]['_startPlaying'](_0x5993d4[_0x115855(0x190)]);}}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x18f),_0x1f0665=>{const _0x545b7a=_0x41f3d3;VisuMZ['ConvertParams'](_0x1f0665,_0x1f0665);const _0x5c9710=Math[_0x545b7a(0x92b)](_0x1f0665[_0x545b7a(0x1d2)])['clamp'](0x32,0x96),_0x166f80=AudioManager[_0x545b7a(0x590)];_0x166f80&&(_0x166f80[_0x545b7a(0x1d2)]=_0x5c9710,_0x166f80[_0x545b7a(0x190)]=AudioManager[_0x545b7a(0x6e7)][_0x545b7a(0x9c2)](),AudioManager[_0x545b7a(0x385)](_0x166f80),AudioManager[_0x545b7a(0x30e)](_0x166f80,_0x166f80[_0x545b7a(0x190)]),AudioManager[_0x545b7a(0x6e7)][_0x545b7a(0x8dc)](_0x166f80['pos']));}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x648),_0x58acb1=>{const _0x4fdabd=_0x41f3d3;VisuMZ['ConvertParams'](_0x58acb1,_0x58acb1);const _0x41dc02=Math[_0x4fdabd(0x92b)](_0x58acb1[_0x4fdabd(0x6a5)])[_0x4fdabd(0x4f8)](-0x64,0x64),_0x19b434=AudioManager[_0x4fdabd(0x590)];_0x19b434&&(_0x4fdabd(0x6d8)===_0x4fdabd(0x6d8)?(_0x19b434[_0x4fdabd(0x6a5)]=_0x41dc02,_0x19b434[_0x4fdabd(0x190)]=AudioManager[_0x4fdabd(0x6e7)][_0x4fdabd(0x9c2)](),AudioManager[_0x4fdabd(0x385)](_0x19b434),AudioManager[_0x4fdabd(0x30e)](_0x19b434,_0x19b434[_0x4fdabd(0x190)]),AudioManager[_0x4fdabd(0x6e7)]['_startPlaying'](_0x19b434['pos'])):_0x4a4baf+=_0x1d04c8(_0x549176));}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x5de),_0x206324=>{const _0xe58a6b=_0x41f3d3;VisuMZ['ConvertParams'](_0x206324,_0x206324);const _0xe9825d=Math[_0xe58a6b(0x92b)](_0x206324[_0xe58a6b(0x356)])[_0xe58a6b(0x4f8)](0x0,0x64),_0x144339=AudioManager[_0xe58a6b(0x9c3)];_0x144339&&(_0x144339[_0xe58a6b(0x356)]=_0xe9825d,_0x144339[_0xe58a6b(0x190)]=AudioManager[_0xe58a6b(0x1b5)][_0xe58a6b(0x9c2)](),AudioManager[_0xe58a6b(0x385)](_0x144339),AudioManager[_0xe58a6b(0x30e)](_0x144339,_0x144339[_0xe58a6b(0x190)]),AudioManager[_0xe58a6b(0x6e7)][_0xe58a6b(0x8dc)](_0x144339['pos']));}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x2d6),_0x39e689=>{const _0x8bafe0=_0x41f3d3;VisuMZ['ConvertParams'](_0x39e689,_0x39e689);const _0x28093c=Math[_0x8bafe0(0x92b)](_0x39e689[_0x8bafe0(0x1d2)])[_0x8bafe0(0x4f8)](0x32,0x96),_0x2be987=AudioManager['_currentBgs'];_0x2be987&&(_0x2be987[_0x8bafe0(0x1d2)]=_0x28093c,_0x2be987[_0x8bafe0(0x190)]=AudioManager['_bgsBuffer'][_0x8bafe0(0x9c2)](),AudioManager['updateBgmParameters'](_0x2be987),AudioManager[_0x8bafe0(0x30e)](_0x2be987,_0x2be987[_0x8bafe0(0x190)]),AudioManager[_0x8bafe0(0x6e7)][_0x8bafe0(0x8dc)](_0x2be987[_0x8bafe0(0x190)]));}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x1e3),_0x9d748f=>{const _0x19529b=_0x41f3d3;VisuMZ['ConvertParams'](_0x9d748f,_0x9d748f);const _0x2c991b=Math[_0x19529b(0x92b)](_0x9d748f[_0x19529b(0x6a5)])['clamp'](-0x64,0x64),_0x5196b0=AudioManager[_0x19529b(0x9c3)];_0x5196b0&&(_0x5196b0[_0x19529b(0x6a5)]=_0x2c991b,_0x5196b0['pos']=AudioManager[_0x19529b(0x1b5)][_0x19529b(0x9c2)](),AudioManager[_0x19529b(0x385)](_0x5196b0),AudioManager[_0x19529b(0x30e)](_0x5196b0,_0x5196b0[_0x19529b(0x190)]),AudioManager['_bgmBuffer'][_0x19529b(0x8dc)](_0x5196b0[_0x19529b(0x190)]));}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x687),_0x5483a6=>{const _0x35e028=_0x41f3d3;if(!$gameTemp['isPlaytest']())return;const _0x506f74=Input[_0x35e028(0x615)]();navigator['clipboard']&&(_0x35e028(0x208)!==_0x35e028(0x208)?(_0x65d76c[_0x35e028(0x5aa)][_0x35e028(0x85c)][_0x35e028(0x809)](this),this['initCoreEngine']()):navigator[_0x35e028(0x64d)][_0x35e028(0x871)](_0x506f74));}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x5b3),_0x1d23d4=>{const _0x4ef68e=_0x41f3d3;if(!$gameTemp[_0x4ef68e(0x67d)]())return;if(!Utils[_0x4ef68e(0x884)]())return;SceneManager[_0x4ef68e(0x2b5)][_0x4ef68e(0x9e3)]=![],VisuMZ[_0x4ef68e(0x5aa)][_0x4ef68e(0x2d2)]();}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x6e8),_0x2fa697=>{const _0x1077dd=_0x41f3d3;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x1077dd(0x2b5)]['_active']=![],VisuMZ[_0x1077dd(0x5aa)][_0x1077dd(0x1c2)]();}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x5dc),_0x34c3fe=>{const _0x12e95e=_0x41f3d3;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x12e95e(0x250)]()<=0x0)return;VisuMZ[_0x12e95e(0x5eb)](_0x34c3fe,_0x34c3fe);const _0x11e079='Map%1'[_0x12e95e(0x382)]($gameMap['mapId']()[_0x12e95e(0x52e)](0x3)),_0x4d130b=VisuMZ[_0x12e95e(0x5aa)]['ExtractStrFromMap']($gameMap['mapId']());VisuMZ[_0x12e95e(0x5aa)][_0x12e95e(0x312)](_0x4d130b,_0x11e079,!![]);}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],'ExportCurTroopText',_0x123ea1=>{const _0x2e24e7=_0x41f3d3;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x2e24e7(0x884)]())return;if(!$gameParty[_0x2e24e7(0x998)]())return;VisuMZ[_0x2e24e7(0x5eb)](_0x123ea1,_0x123ea1);const _0x269b90=_0x2e24e7(0x6a3)[_0x2e24e7(0x382)]($gameTroop['_troopId']['padZero'](0x4)),_0x59d6bb=VisuMZ[_0x2e24e7(0x5aa)][_0x2e24e7(0x2ae)]($gameTroop[_0x2e24e7(0x481)]);VisuMZ[_0x2e24e7(0x5aa)][_0x2e24e7(0x312)](_0x59d6bb,_0x269b90,!![]);}),VisuMZ['CoreEngine'][_0x41f3d3(0x312)]=function(_0x78391d,_0x5d65ca,_0x418e0d){const _0x4faef0=_0x41f3d3,_0x1b3072=require('fs');let _0x588dba='Exported_Script_%1.txt'['format'](_0x5d65ca||'0');_0x1b3072[_0x4faef0(0x584)](_0x588dba,_0x78391d,_0x9e8d20=>{const _0x3d84e4=_0x4faef0;if(_0x3d84e4(0x4aa)===_0x3d84e4(0x5fa)){const _0x379476=_0x4ec3fc[_0x3d84e4(0x918)][_0x3d84e4(0x572)](/[ ]/g,''),_0x416fa3=_0x2bcd04[_0x3d84e4(0x1dc)];_0x3e5a2e[_0x3d84e4(0x5aa)][_0x3d84e4(0x6b4)](_0x379476,_0x416fa3);}else{if(_0x9e8d20){if('PkhWl'===_0x3d84e4(0x4e0)){var _0x65f90e=_0xf1e7a5-2.625/2.75;return 7.5625*_0x65f90e*_0x65f90e+0.984375;}else throw err;}else _0x418e0d&&('mcWsy'!==_0x3d84e4(0x734)?alert(_0x3d84e4(0x501)['format'](_0x588dba)):_0x2f4c17=_0x4783f8[_0x3d84e4(0x5aa)][_0x3d84e4(0x22f)][_0x3d84e4(0x809)](this));}});},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2d2)]=function(){const _0x3830d0=_0x41f3d3,_0x241736=[];for(const _0x1c71df of $dataMapInfos){if(_0x3830d0(0x252)!==_0x3830d0(0x67c)){if(!_0x1c71df)continue;_0x241736[_0x3830d0(0x7df)](_0x1c71df['id']);}else{var _0x546723=_0x424c98(_0x398120['$1'])/0x64;_0x1133a8+=_0x546723;}}const _0x2e8071=_0x241736[_0x3830d0(0x9b7)]*0x64+Math[_0x3830d0(0x5b9)](0x64);alert(_0x3830d0(0x92e)[_0x3830d0(0x382)](_0x2e8071)),this[_0x3830d0(0x3f5)]=[],this[_0x3830d0(0x305)]=$dataMap;for(const _0x5db500 of _0x241736){VisuMZ['CoreEngine'][_0x3830d0(0x5d6)](_0x5db500);}setTimeout(VisuMZ['CoreEngine'][_0x3830d0(0x214)][_0x3830d0(0x508)](this),_0x2e8071);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5d6)]=function(_0x3733a1){const _0x234017=_0x41f3d3,_0x3e0e52=_0x234017(0x9cc)[_0x234017(0x382)](_0x3733a1[_0x234017(0x52e)](0x3)),_0xe0b74c=new XMLHttpRequest(),_0x57349e=_0x234017(0x4c2)+_0x3e0e52;_0xe0b74c[_0x234017(0xa19)](_0x234017(0x7b7),_0x57349e),_0xe0b74c['overrideMimeType']('application/json'),_0xe0b74c[_0x234017(0x676)]=()=>this[_0x234017(0x97c)](_0xe0b74c,_0x3733a1,_0x3e0e52,_0x57349e),_0xe0b74c['onerror']=()=>DataManager['onXhrError']('$dataMap',_0x3e0e52,_0x57349e),_0xe0b74c[_0x234017(0x58f)]();},VisuMZ[_0x41f3d3(0x5aa)]['storeMapData']=function(_0x17a649,_0x1029ea,_0x1b6b1a,_0x3c73f3){const _0x39df3b=_0x41f3d3;$dataMap=JSON[_0x39df3b(0x84f)](_0x17a649[_0x39df3b(0x77f)]),DataManager[_0x39df3b(0x8ca)]($dataMap),this['_storedMapText'][_0x1029ea]=VisuMZ[_0x39df3b(0x5aa)][_0x39df3b(0xa2a)](_0x1029ea),$dataMap=this[_0x39df3b(0x305)];},VisuMZ['CoreEngine'][_0x41f3d3(0x214)]=function(){const _0x34b570=_0x41f3d3,_0x4d3123=_0x34b570(0x1e0);this['_storedMapText'][_0x34b570(0x907)](undefined)[_0x34b570(0x907)]('')['remove'](null);const _0x42757a=this[_0x34b570(0x3f5)][_0x34b570(0x5e7)](_0x34b570(0x29a))[_0x34b570(0x30b)]();VisuMZ[_0x34b570(0x5aa)][_0x34b570(0x312)](_0x42757a,_0x4d3123,!![]),SceneManager[_0x34b570(0x2b5)][_0x34b570(0x9e3)]=!![];},VisuMZ['CoreEngine'][_0x41f3d3(0xa2a)]=function(_0x24aaff){const _0x705acf=_0x41f3d3;if(!$dataMap)return'';let _0x37c2ef='█'['repeat'](0x46)+'\x0a\x0a',_0x192ef4='═'[_0x705acf(0x8c6)](0x46)+'\x0a\x0a',_0x1529b5='';this[_0x705acf(0x19f)]=0x0;for(const _0xd8aeae of $dataMap[_0x705acf(0x2b6)]){if(!_0xd8aeae)continue;let _0xf5adc3=_0xd8aeae['id'],_0x5eefbc=_0xd8aeae[_0x705acf(0x23b)],_0x58ba8b=_0xd8aeae[_0x705acf(0x69a)];for(const _0x33cf5e of _0x58ba8b){if(_0x705acf(0x26b)!==_0x705acf(0x26b))_0x66cfb6[_0x705acf(0x91f)](!_0x261ad3['isSideView']());else{const _0x1cdf35=_0x58ba8b[_0x705acf(0x1a8)](_0x33cf5e)+0x1;let _0x1f7244=_0x192ef4+_0x705acf(0x2ba),_0x2fdbb3=VisuMZ['CoreEngine'][_0x705acf(0x384)](_0x33cf5e['list']);if(_0x2fdbb3['length']>0x0){if(_0x705acf(0x381)!=='TWTZQ'){if(_0x1529b5[_0x705acf(0x9b7)]>0x0)_0x1529b5+=_0x192ef4+'\x0a\x0a\x0a\x0a\x0a';else{const _0x54d8eb=$dataMapInfos[_0x24aaff][_0x705acf(0x23b)];_0x1529b5+=_0x37c2ef+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x705acf(0x382)](_0x24aaff,_0x54d8eb||_0x705acf(0x203))+_0x37c2ef;}_0x1529b5+=_0x1f7244[_0x705acf(0x382)](_0xf5adc3,_0x5eefbc,_0x1cdf35,_0x2fdbb3);}else _0x404c64(_0x705acf(0x54f));}}}}return _0x1529b5[_0x705acf(0x9b7)]>0x0&&(_0x1529b5+=_0x192ef4),_0x1529b5;},VisuMZ['CoreEngine'][_0x41f3d3(0x1c2)]=function(){const _0x1cd500=_0x41f3d3,_0x10e831=$dataTroops[_0x1cd500(0x9b7)]*0xa+Math[_0x1cd500(0x5b9)](0xa);alert(_0x1cd500(0x992)[_0x1cd500(0x382)](_0x10e831));const _0x48041e=[];for(const _0x83b7aa of $dataTroops){if(!_0x83b7aa)continue;const _0x46c73b=_0x83b7aa['id'];_0x48041e[_0x46c73b]=VisuMZ['CoreEngine'][_0x1cd500(0x2ae)](_0x46c73b);}setTimeout(VisuMZ['CoreEngine']['exportAllTroopStrings'][_0x1cd500(0x508)](this,_0x48041e),_0x10e831);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2ae)]=function(_0x31bc7a){const _0xa53acc=_0x41f3d3;if(!$dataTroops[_0x31bc7a])return'';let _0x2d2c17='█'['repeat'](0x46)+'\x0a\x0a',_0x2b3f07='═'[_0xa53acc(0x8c6)](0x46)+'\x0a\x0a',_0x301122='';this[_0xa53acc(0x19f)]=0x0;const _0x57f3b9=$dataTroops[_0x31bc7a];let _0x2430d2=_0x57f3b9[_0xa53acc(0x69a)];for(const _0x4015cb of _0x2430d2){const _0x3295f6=_0x2430d2[_0xa53acc(0x1a8)](_0x4015cb)+0x1;let _0x5972c8=_0x2b3f07+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x434335=VisuMZ[_0xa53acc(0x5aa)]['ExtractStrFromList'](_0x4015cb[_0xa53acc(0x6aa)]);if(_0x434335[_0xa53acc(0x9b7)]>0x0){if(_0xa53acc(0x942)!=='mFjHQ'){const _0x1085b3=_0x179e82[_0xa53acc(0x615)]();return _0x1085b3===_0xa53acc(0x5c8)?this[_0xa53acc(0x859)](_0x2b6534):this[_0xa53acc(0x692)](_0x1085b3,_0x2ac5a4);}else{if(_0x301122['length']>0x0){if(_0xa53acc(0x801)==='cihUO')return _0x7c02b1['layoutSettings'][_0xa53acc(0x641)][_0xa53acc(0x809)](this);else _0x301122+=_0x2b3f07+'\x0a\x0a\x0a\x0a\x0a';}else _0x301122+=_0x2d2c17+_0xa53acc(0x9d5)['format'](_0x31bc7a,_0x57f3b9[_0xa53acc(0x23b)]||_0xa53acc(0x203))+_0x2d2c17;_0x301122+=_0x5972c8['format'](_0x3295f6,_0x434335);}}}return _0x301122[_0xa53acc(0x9b7)]>0x0&&(_0x301122+=_0x2b3f07),_0x301122;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x585)]=function(_0x42af74){const _0x481324=_0x41f3d3,_0x406426=_0x481324(0x1a4);_0x42af74[_0x481324(0x907)](undefined)[_0x481324(0x907)]('')[_0x481324(0x907)](null);const _0x1a3e9b=_0x42af74[_0x481324(0x5e7)]('\x0a\x0a\x0a\x0a\x0a')[_0x481324(0x30b)]();VisuMZ['CoreEngine']['ExportString'](_0x1a3e9b,_0x406426,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x384)]=function(_0x3b9223){const _0x1187da=_0x41f3d3;let _0xde988='\x0a'+'─'[_0x1187da(0x8c6)](0x46)+'\x0a',_0x109ce1='\x0a'+'┄'[_0x1187da(0x8c6)](0x46)+'\x0a',_0x582fce='';for(const _0x1af5c9 of _0x3b9223){if(!_0x1af5c9)continue;if(_0x1af5c9['code']===0x65){if(_0x1187da(0xa1a)!==_0x1187da(0xa06))_0x582fce+=_0xde988+'\x0a',_0x582fce+=_0x1187da(0x71d),_0x1af5c9[_0x1187da(0x9f0)][0x4]!==''&&_0x1af5c9[_0x1187da(0x9f0)][0x4]!==undefined&&(_0x582fce+=_0x1187da(0x675)[_0x1187da(0x382)](_0x1af5c9[_0x1187da(0x9f0)][0x4]));else return _0x53b056['getInputButtonString'](_0x1187da(0x84c));}else{if(_0x1af5c9[_0x1187da(0x775)]===0x191){if('JtMaD'===_0x1187da(0x6f0))_0x582fce+='%1\x0a'['format'](_0x1af5c9[_0x1187da(0x9f0)][0x0]);else{if(_0x22eecb[_0x1187da(0x998)]())return;_0x390869[_0x1187da(0x5eb)](_0x442e98,_0x405415);const _0x2ba82e=[_0x1187da(0x837),_0x1187da(0x9c9),'me','se'];for(const _0x41e9fc of _0x2ba82e){const _0x3cafd3=_0xd934c9[_0x41e9fc],_0x1dc006=_0x1187da(0x67e)['format'](_0x41e9fc);for(const _0x1411c1 of _0x3cafd3){_0x1e57e0[_0x1187da(0x54d)](_0x1dc006,_0x1411c1);}}}}else{if(_0x1af5c9[_0x1187da(0x775)]===0x192)_0x582fce+=_0xde988,_0x582fce+=_0x1187da(0x996)[_0x1187da(0x382)](_0x109ce1,_0x1af5c9[_0x1187da(0x9f0)][0x0]+0x1,_0x1af5c9[_0x1187da(0x9f0)][0x1]);else{if(_0x1af5c9['code']===0x193)_0x582fce+=_0xde988,_0x582fce+='%1〘Choice\x20Cancel〙%1'[_0x1187da(0x382)](_0x109ce1);else{if(_0x1af5c9[_0x1187da(0x775)]===0x194)_0x1187da(0x430)!==_0x1187da(0x430)?(_0x1c3b6c+=_0x5ea0a9+'\x0a',_0x5979a6+='〘Show\x20Text〙\x0a',_0x3cb345['parameters'][0x4]!==''&&_0x49a0e9[_0x1187da(0x9f0)][0x4]!==_0x63f2b6&&(_0xdb5844+='【%1】\x0a'[_0x1187da(0x382)](_0x11a15d[_0x1187da(0x9f0)][0x4]))):(_0x582fce+=_0xde988,_0x582fce+=_0x1187da(0x786)[_0x1187da(0x382)](_0x109ce1));else{if(_0x1af5c9[_0x1187da(0x775)]===0x69)_0x582fce+=_0xde988+'\x0a',_0x582fce+=_0x1187da(0x7c4);else{if(_0x1af5c9[_0x1187da(0x775)]===0x6c){if(_0x1187da(0x4dc)===_0x1187da(0x3a2))return this[_0x1187da(0x967)];else _0x582fce+=_0xde988+'\x0a',_0x582fce+=_0x1187da(0x7c7)[_0x1187da(0x382)](_0x1af5c9[_0x1187da(0x9f0)][0x0]);}else{if(_0x1af5c9[_0x1187da(0x775)]===0x198)_0x582fce+=_0x1187da(0x4c3)[_0x1187da(0x382)](_0x1af5c9[_0x1187da(0x9f0)][0x0]);else{if(_0x1af5c9[_0x1187da(0x775)]===0x75){const _0xb33a1e=$dataCommonEvents[_0x1af5c9[_0x1187da(0x9f0)][0x0]];if(_0xb33a1e&&this[_0x1187da(0x19f)]<=0xa){this[_0x1187da(0x19f)]++;let _0x36ee41=VisuMZ[_0x1187da(0x5aa)][_0x1187da(0x384)](_0xb33a1e[_0x1187da(0x6aa)]);_0x36ee41[_0x1187da(0x9b7)]>0x0&&(_0x582fce+=_0xde988,_0x582fce+=_0x109ce1,_0x582fce+=_0x1187da(0x70b)[_0x1187da(0x382)](_0xb33a1e['id'],_0xb33a1e['name']),_0x582fce+=_0x109ce1,_0x582fce+=_0x36ee41,_0x582fce+=_0x109ce1,_0x582fce+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x1187da(0x382)](_0xb33a1e['id'],_0xb33a1e[_0x1187da(0x23b)]),_0x582fce+=_0x109ce1),this['_commonEventLayers']--;}}}}}}}}}}}return _0x582fce[_0x1187da(0x9b7)]>0x0&&(_0x582fce+=_0xde988),_0x582fce;},PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x9a4),_0x8ea049=>{const _0x54952a=_0x41f3d3;VisuMZ[_0x54952a(0x5eb)](_0x8ea049,_0x8ea049);const _0xfc351c=_0x8ea049[_0x54952a(0x401)];VisuMZ[_0x54952a(0x571)](_0xfc351c);}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x38b),_0x408ddb=>{const _0x4834ad=_0x41f3d3;VisuMZ[_0x4834ad(0x5eb)](_0x408ddb,_0x408ddb);const _0x33b4b3=_0x408ddb[_0x4834ad(0x1cc)]||0x0;$gameParty[_0x4834ad(0xa1d)](_0x33b4b3);}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x269),_0x303cdb=>{const _0x2e3e11=_0x41f3d3;if(!SceneManager[_0x2e3e11(0x736)]())return;VisuMZ[_0x2e3e11(0x5eb)](_0x303cdb,_0x303cdb);const _0x13a474=_0x303cdb[_0x2e3e11(0x55e)];SceneManager[_0x2e3e11(0x2b5)][_0x2e3e11(0x540)](_0x13a474);}),PluginManager['registerCommand'](pluginData[_0x41f3d3(0x23b)],'PictureCoordinatesMode',_0x4a72a6=>{const _0x3cada7=_0x41f3d3;if(!$gameTemp[_0x3cada7(0x67d)]())return;if(!Utils[_0x3cada7(0x884)]())return;VisuMZ['ConvertParams'](_0x4a72a6,_0x4a72a6);const _0x20c4ab=_0x4a72a6[_0x3cada7(0x8ea)]||0x1;$gameTemp[_0x3cada7(0x977)]=_0x20c4ab;}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x1f4),_0x5a2d8a=>{const _0x40db77=_0x41f3d3;VisuMZ['ConvertParams'](_0x5a2d8a,_0x5a2d8a);const _0xc35986=_0x5a2d8a['pictureId']||0x1,_0x1dee4d=_0x5a2d8a['easingType']||_0x40db77(0xa12),_0x492548=$gameScreen['picture'](_0xc35986);_0x492548&&_0x492548[_0x40db77(0x953)](_0x1dee4d);}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x393),_0x300ded=>{for(let _0x4b60f1=0x1;_0x4b60f1<=0x64;_0x4b60f1++){$gameScreen['erasePicture'](_0x4b60f1);}}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x7e5),_0x4f06fc=>{const _0x5101cf=_0x41f3d3;VisuMZ['ConvertParams'](_0x4f06fc,_0x4f06fc);const _0xa9d45e=Math[_0x5101cf(0x568)](_0x4f06fc[_0x5101cf(0x91e)],_0x4f06fc[_0x5101cf(0x4d3)]),_0x291fe5=Math[_0x5101cf(0x4a5)](_0x4f06fc[_0x5101cf(0x91e)],_0x4f06fc[_0x5101cf(0x4d3)]);for(let _0x25edfc=_0xa9d45e;_0x25edfc<=_0x291fe5;_0x25edfc++){$gameScreen[_0x5101cf(0x76a)](_0x25edfc);}}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x6f2),_0x5f074a=>{const _0x4ddc1b=_0x41f3d3;VisuMZ[_0x4ddc1b(0x5eb)](_0x5f074a,_0x5f074a);const _0x294e90=Math[_0x4ddc1b(0x92b)](_0x5f074a[_0x4ddc1b(0x8ea)])[_0x4ddc1b(0x4f8)](0x1,0x64),_0x519294=_0x5f074a[_0x4ddc1b(0x5b1)],_0x4f96a1=_0x519294[_0x4ddc1b(0x47c)][_0x4ddc1b(0x4f8)](0x0,0x1),_0x396e97=Math[_0x4ddc1b(0x92b)](_0x519294[_0x4ddc1b(0x7a2)]||0x0),_0x3e7762=Math[_0x4ddc1b(0x92b)](_0x519294[_0x4ddc1b(0x8d7)]||0x0),_0x3dbcdb=Math[_0x4ddc1b(0x92b)](_0x519294[_0x4ddc1b(0x9b8)]||0x0),_0x220699=Math['round'](_0x519294[_0x4ddc1b(0x774)]||0x0),_0x4c7a1f=Math[_0x4ddc1b(0x92b)](_0x519294[_0x4ddc1b(0x7b5)])[_0x4ddc1b(0x4f8)](0x0,0xff),_0x43e891=_0x519294['BlendMode'],_0x33f62e=_0x4ddc1b(0xa30),_0x234730=_0x5f074a[_0x4ddc1b(0x90e)]?_0x4ddc1b(0x90e):_0x4ddc1b(0x221),_0x136d82=_0x33f62e[_0x4ddc1b(0x382)](_0x5f074a[_0x4ddc1b(0x574)],_0x234730);$gameScreen['showPicture'](_0x294e90,_0x136d82,_0x4f96a1,_0x396e97,_0x3e7762,_0x3dbcdb,_0x220699,_0x4c7a1f,_0x43e891);}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x53e),_0x538484=>{const _0x1306b7=_0x41f3d3;VisuMZ['ConvertParams'](_0x538484,_0x538484);const _0x56e811=_0x538484[_0x1306b7(0x814)]||_0x1306b7(0x962),_0x28ba2b=_0x538484['Power'][_0x1306b7(0x4f8)](0x1,0x9),_0x3f4ba3=_0x538484[_0x1306b7(0x2dd)]['clamp'](0x1,0x9),_0x3e1aee=_0x538484[_0x1306b7(0x5e1)]||0x1,_0x2d4e97=_0x538484[_0x1306b7(0x52a)];$gameScreen[_0x1306b7(0x230)](_0x56e811),$gameScreen[_0x1306b7(0x1d7)](_0x28ba2b,_0x3f4ba3,_0x3e1aee);if(_0x2d4e97){const _0x2a608a=$gameTemp[_0x1306b7(0x969)]();if(_0x2a608a)_0x2a608a['wait'](_0x3e1aee);}}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],'SwitchRandomizeOne',_0x2c70f4=>{const _0x377a23=_0x41f3d3;if($gameParty[_0x377a23(0x998)]())return;VisuMZ[_0x377a23(0x5eb)](_0x2c70f4,_0x2c70f4);const _0x1c6ca2=_0x2c70f4[_0x377a23(0x82d)],_0x11d5ac=(_0x2c70f4[_0x377a23(0x432)]||0x0)/0x64;for(const _0xbfb047 of _0x1c6ca2){if(_0x377a23(0x9a6)!=='gpldd'){if(_0x25d63c['isOptionValid'](_0x377a23(0x1ae))){var _0x18a878=_0x595dc9(_0x377a23(0x25a))['Window'][_0x377a23(0x9d0)]();_0x351538['showDevTools']();if(_0x5cfe47)_0x7f34f3(_0x18a878[_0x377a23(0x377)][_0x377a23(0x508)](_0x18a878),0x190);}}else{const _0x382810=Math[_0x377a23(0x962)]()<=_0x11d5ac;$gameSwitches[_0x377a23(0x48d)](_0xbfb047,_0x382810);}}}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],'SwitchRandomizeRange',_0xe1f9b1=>{const _0x4732a4=_0x41f3d3;if($gameParty[_0x4732a4(0x998)]())return;VisuMZ[_0x4732a4(0x5eb)](_0xe1f9b1,_0xe1f9b1);const _0x427678=Math[_0x4732a4(0x568)](_0xe1f9b1[_0x4732a4(0x91e)],_0xe1f9b1['EndingID']),_0x1a53bc=Math['max'](_0xe1f9b1[_0x4732a4(0x91e)],_0xe1f9b1['EndingID']),_0x46d1ce=(_0xe1f9b1[_0x4732a4(0x432)]||0x0)/0x64;for(let _0x2a035e=_0x427678;_0x2a035e<=_0x1a53bc;_0x2a035e++){const _0x37d5d9=Math['random']()<=_0x46d1ce;$gameSwitches[_0x4732a4(0x48d)](_0x2a035e,_0x37d5d9);}}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],'SwitchToggleOne',_0x349d83=>{const _0x22bd7f=_0x41f3d3;if($gameParty[_0x22bd7f(0x998)]())return;VisuMZ['ConvertParams'](_0x349d83,_0x349d83);const _0x5d4d2b=_0x349d83[_0x22bd7f(0x82d)];for(const _0x5edc51 of _0x5d4d2b){const _0x5f1b58=$gameSwitches[_0x22bd7f(0x1cc)](_0x5edc51);$gameSwitches['setValue'](_0x5edc51,!_0x5f1b58);}}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],'SwitchToggleRange',_0x44b735=>{const _0x442062=_0x41f3d3;if($gameParty[_0x442062(0x998)]())return;VisuMZ[_0x442062(0x5eb)](_0x44b735,_0x44b735);const _0x22e7b5=Math[_0x442062(0x568)](_0x44b735[_0x442062(0x91e)],_0x44b735[_0x442062(0x4d3)]),_0x218569=Math['max'](_0x44b735['StartID'],_0x44b735[_0x442062(0x4d3)]);for(let _0x32cb9e=_0x22e7b5;_0x32cb9e<=_0x218569;_0x32cb9e++){const _0x1373c3=$gameSwitches[_0x442062(0x1cc)](_0x32cb9e);$gameSwitches['setValue'](_0x32cb9e,!_0x1373c3);}}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x7fd),_0x522692=>{const _0x474ca8=_0x41f3d3;VisuMZ[_0x474ca8(0x5eb)](_0x522692,_0x522692);const _0x2ea1dd=_0x522692['option']||0x1;$gameSystem[_0x474ca8(0x83f)](_0x2ea1dd);}),PluginManager['registerCommand'](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x6ce),_0x2198c3=>{const _0x17f3ec=_0x41f3d3;if($gameParty[_0x17f3ec(0x998)]())return;VisuMZ['ConvertParams'](_0x2198c3,_0x2198c3);const _0x25d800=_0x2198c3[_0x17f3ec(0x896)];if(_0x25d800['match'](/Front/i)){if(_0x17f3ec(0x3af)!==_0x17f3ec(0x3af))return _0x33d1aa[_0x17f3ec(0x5aa)][_0x17f3ec(0x497)]['call'](this);else $gameSystem[_0x17f3ec(0x91f)](![]);}else _0x25d800[_0x17f3ec(0x420)](/Side/i)?$gameSystem[_0x17f3ec(0x91f)](!![]):$gameSystem[_0x17f3ec(0x91f)](!$gameSystem[_0x17f3ec(0x4c4)]());}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x650),_0x2e1554=>{const _0x5f4a10=_0x41f3d3;if($gameParty[_0x5f4a10(0x998)]())return;VisuMZ[_0x5f4a10(0x5eb)](_0x2e1554,_0x2e1554);const _0x5b2ad5=[_0x5f4a10(0x837),_0x5f4a10(0x9c9),'me','se'];for(const _0x4cd0d5 of _0x5b2ad5){const _0x333b56=_0x2e1554[_0x4cd0d5],_0x1ee557=_0x5f4a10(0x67e)['format'](_0x4cd0d5);for(const _0x5a2d85 of _0x333b56){AudioManager[_0x5f4a10(0x54d)](_0x1ee557,_0x5a2d85);}}}),PluginManager['registerCommand'](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0x84e),_0x5eec85=>{const _0x5964e6=_0x41f3d3;if($gameParty[_0x5964e6(0x998)]())return;VisuMZ[_0x5964e6(0x5eb)](_0x5eec85,_0x5eec85);const _0x5afa6d=[_0x5964e6(0x4b8),_0x5964e6(0x496),'battlebacks2','characters',_0x5964e6(0x8d0),_0x5964e6(0x428),_0x5964e6(0x33d),_0x5964e6(0x7b2),_0x5964e6(0x921),_0x5964e6(0x310),_0x5964e6(0x96d),'tilesets',_0x5964e6(0x490),_0x5964e6(0x343)];for(const _0x109432 of _0x5afa6d){const _0xe1f65c=_0x5eec85[_0x109432],_0x1b7b40='img/%1/'[_0x5964e6(0x382)](_0x109432);for(const _0x63b05d of _0xe1f65c){ImageManager['loadBitmap'](_0x1b7b40,_0x63b05d);}}}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],'SystemSetBattleSystem',_0x294b51=>{const _0xe2ff8b=_0x41f3d3;if($gameParty[_0xe2ff8b(0x998)]())return;VisuMZ[_0xe2ff8b(0x5eb)](_0x294b51,_0x294b51);const _0x29b52d=_0x294b51[_0xe2ff8b(0x896)][_0xe2ff8b(0x97e)]()['trim'](),_0x272fcc=VisuMZ[_0xe2ff8b(0x5aa)]['CreateBattleSystemID'](_0x29b52d);$gameSystem[_0xe2ff8b(0x86f)](_0x272fcc);}),VisuMZ[_0x41f3d3(0x5aa)]['CreateBattleSystemID']=function(_0x549fbc){const _0x3b611a=_0x41f3d3;_0x549fbc=_0x549fbc||_0x3b611a(0x304),_0x549fbc=String(_0x549fbc)[_0x3b611a(0x97e)]()[_0x3b611a(0x30b)]();switch(_0x549fbc){case _0x3b611a(0x83d):return 0x0;case _0x3b611a(0x33f):if(Imported['VisuMZ_1_OptionsCore']){if('UNlfk'!==_0x3b611a(0x72e))ConfigManager['atbActive']=!![];else{const _0x44b041={'x':_0x219c6c,'y':_0x50435a,'animationId':_0x4df7dd,'mirror':_0x388b2b,'mute':_0x39937b};this[_0x3b611a(0x263)]['push'](_0x44b041);}}return 0x1;case _0x3b611a(0x335):Imported[_0x3b611a(0x839)]&&(ConfigManager[_0x3b611a(0x5b6)]=![]);return 0x2;case _0x3b611a(0x65a):if(Imported[_0x3b611a(0x390)])return _0x3b611a(0x65a);break;case _0x3b611a(0x264):if(Imported[_0x3b611a(0x367)])return _0x3b611a(0xa20)!==_0x3b611a(0xa20)?0xc0:'STB';break;case'BTB':if(Imported[_0x3b611a(0x726)])return _0x3b611a(0x885);break;case'FTB':if(Imported[_0x3b611a(0x6be)])return _0x3b611a(0x822);break;case _0x3b611a(0x32b):if(Imported[_0x3b611a(0x589)])return _0x3b611a(0x32b);break;case _0x3b611a(0x5fd):if(Imported['VisuMZ_2_BattleSystemETB'])return _0x3b611a(0x5fd);break;case _0x3b611a(0x61c):if(Imported[_0x3b611a(0x591)])return _0x3b611a(0x61c);break;}return $dataSystem['battleSystem'];},PluginManager[_0x41f3d3(0x58b)](pluginData['name'],_0x41f3d3(0x7a6),_0x4606d0=>{const _0x4ffb6e=_0x41f3d3;VisuMZ[_0x4ffb6e(0x5eb)](_0x4606d0,_0x4606d0);const _0x18ab6f=_0x4606d0[_0x4ffb6e(0x896)]||0x1;$gameSystem[_0x4ffb6e(0x997)](_0x18ab6f);}),PluginManager[_0x41f3d3(0x58b)](pluginData['name'],'VariableEvalReference',_0x4343d8=>{const _0x5131bf=_0x41f3d3;VisuMZ[_0x5131bf(0x5eb)](_0x4343d8,_0x4343d8);const _0x58ac5c=_0x4343d8['id']||0x1,_0x738a=_0x4343d8['operation'],_0x3bae01=_0x4343d8[_0x5131bf(0x6d4)]||0x0;let _0x14fb98=$gameVariables['value'](_0x58ac5c)||0x0;switch(_0x738a){case'=':_0x14fb98=_0x3bae01;break;case'+':_0x14fb98+=_0x3bae01;break;case'-':_0x14fb98-=_0x3bae01;break;case'*':_0x14fb98*=_0x3bae01;break;case'/':_0x14fb98/=_0x3bae01;break;case'%':_0x14fb98%=_0x3bae01;break;}_0x14fb98=_0x14fb98||0x0,$gameVariables[_0x5131bf(0x48d)](_0x58ac5c,_0x14fb98);}),PluginManager[_0x41f3d3(0x58b)](pluginData[_0x41f3d3(0x23b)],_0x41f3d3(0xa51),_0x5ba549=>{const _0x2e2b8d=_0x41f3d3;VisuMZ[_0x2e2b8d(0x5eb)](_0x5ba549,_0x5ba549);const _0x420f02=_0x5ba549['id']()||0x1,_0x4675cd=_0x5ba549['operation'],_0x5c564c=_0x5ba549[_0x2e2b8d(0x6d4)]()||0x0;let _0x4add71=$gameVariables[_0x2e2b8d(0x1cc)](_0x420f02)||0x0;switch(_0x4675cd){case'=':_0x4add71=_0x5c564c;break;case'+':_0x4add71+=_0x5c564c;break;case'-':_0x4add71-=_0x5c564c;break;case'*':_0x4add71*=_0x5c564c;break;case'/':_0x4add71/=_0x5c564c;break;case'%':_0x4add71%=_0x5c564c;break;}_0x4add71=_0x4add71||0x0,$gameVariables[_0x2e2b8d(0x48d)](_0x420f02,_0x4add71);}),VisuMZ[_0x41f3d3(0x5aa)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x41f3d3(0x8a9)],Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x8a9)]=function(){const _0x38dc36=_0x41f3d3;VisuMZ['CoreEngine'][_0x38dc36(0x2e9)]['call'](this),this[_0x38dc36(0x9b0)](),this[_0x38dc36(0x625)](),this[_0x38dc36(0x520)](),this[_0x38dc36(0x4a3)](),this[_0x38dc36(0x41e)](),this[_0x38dc36(0x5f2)](),VisuMZ[_0x38dc36(0x745)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x643)]={},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x9b0)]=function(){const _0x438099=_0x41f3d3,_0x32c754=[_0x438099(0x9f6),'MAXMP',_0x438099(0x68f),_0x438099(0x5f0),_0x438099(0x816),_0x438099(0x980),_0x438099(0x5e0),_0x438099(0x9ef)],_0x81b73a=[_0x438099(0xa33),_0x438099(0x395),_0x438099(0x878),_0x438099(0x1bf),_0x438099(0x577),'MRF','CNT',_0x438099(0x3fe),_0x438099(0x8fa),_0x438099(0x19e)],_0x2bd0d0=[_0x438099(0xa3a),_0x438099(0x8f2),_0x438099(0x3c5),_0x438099(0x258),_0x438099(0x2d9),_0x438099(0x9fb),_0x438099(0x34f),'MDR','FDR',_0x438099(0x982)],_0x2f7c25=[_0x32c754,_0x81b73a,_0x2bd0d0],_0x4e5efe=[_0x438099(0x435),_0x438099(0x8d1),_0x438099(0x4f9),'Max',_0x438099(0x4b6),_0x438099(0x4a6),_0x438099(0x215),_0x438099(0x5c5),'Flat1',_0x438099(0x7e3)];for(const _0x15296e of _0x2f7c25){let _0xb3db99='';if(_0x15296e===_0x32c754)_0xb3db99=_0x438099(0x62d);if(_0x15296e===_0x81b73a)_0xb3db99='xparam';if(_0x15296e===_0x2bd0d0)_0xb3db99='sparam';for(const _0xf41d75 of _0x4e5efe){let _0x5dfefd=_0x438099(0x679)[_0x438099(0x382)](_0xb3db99,_0xf41d75);VisuMZ[_0x438099(0x5aa)][_0x438099(0x643)][_0x5dfefd]=[],VisuMZ['CoreEngine']['RegExp'][_0x5dfefd+'JS']=[];let _0x3ba128=_0x438099(0x6b7);if([_0x438099(0x435),'Flat'][_0x438099(0x85f)](_0xf41d75))_0x3ba128+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x438099(0x8d1),_0x438099(0x2a2)][_0x438099(0x85f)](_0xf41d75)){if(_0x438099(0x925)!==_0x438099(0x354))_0x3ba128+=_0x438099(0x6c8);else{this['createTitleButtons']();const _0x212eb4=_0x1ebe4f[_0x438099(0x7b6)][_0x438099(0x926)],_0x23c7bf=this[_0x438099(0x434)]();this['_commandWindow']=new _0x3ae827(_0x23c7bf),this['_commandWindow'][_0x438099(0x564)](_0x212eb4);const _0x1715a9=this[_0x438099(0x434)]();this[_0x438099(0x7ae)][_0x438099(0x608)](_0x1715a9['x'],_0x1715a9['y'],_0x1715a9[_0x438099(0x665)],_0x1715a9['height']),this[_0x438099(0x7ae)][_0x438099(0x373)](),this[_0x438099(0x7ae)]['refresh'](),this[_0x438099(0x7ae)][_0x438099(0x70c)](),this[_0x438099(0x659)](this['_commandWindow']);}}else{if([_0x438099(0x4f9),'Flat2']['includes'](_0xf41d75)){if(_0x438099(0x62e)!==_0x438099(0x62e)){if(this[_0x438099(0x979)]()[_0x438099(0x2b9)]&&_0x4f08a5['zoomScale']()===0x1){this[_0x438099(0x57d)]=this[_0x438099(0x979)]()['displayX'];return;}_0x357f60[_0x438099(0x5aa)][_0x438099(0x8b5)][_0x438099(0x809)](this,_0x210d8b);}else _0x3ba128+=_0x438099(0xa28);}else{if(_0xf41d75===_0x438099(0x7dc)){if('liHTT'!==_0x438099(0x236))return _0x53f45e&&_0x348d56[_0x438099(0x2b5)]?_0x266e28[_0x438099(0x2b5)][_0x438099(0x6d0)]():!![];else _0x3ba128+=_0x438099(0x9e1);}else{if(_0xf41d75===_0x438099(0x4a6))_0x3ba128+=_0x438099(0x4a7);else _0xf41d75===_0x438099(0x215)&&(_0x3ba128+=_0x438099(0x9b9));}}}}for(const _0x44112d of _0x15296e){if(_0x438099(0x447)==='ZMhBp'){const _0x148548=_0x334b8b[_0x14b5e6['animationId']],_0x4e9231=_0x59a4c4[_0x438099(0x2fb)],_0x464ff7=_0x462d56['mirror'],_0x4aa9d5=_0x41f41d[_0x438099(0x7bd)];let _0x3d6c30=this[_0x438099(0x2cf)]();const _0x5f238c=this[_0x438099(0x471)]();if(this[_0x438099(0x5a1)](_0x148548))for(const _0x41c1bb of _0x4e9231){this[_0x438099(0x4ae)]([_0x41c1bb],_0x148548,_0x464ff7,_0x3d6c30,_0x4aa9d5),_0x3d6c30+=_0x5f238c;}else this[_0x438099(0x4ae)](_0x4e9231,_0x148548,_0x464ff7,_0x3d6c30,_0x4aa9d5);}else{let _0x1fe434=_0xf41d75[_0x438099(0x572)](/[\d+]/g,'')[_0x438099(0x97e)]();const _0x16504a=_0x3ba128[_0x438099(0x382)](_0x44112d,_0x1fe434);VisuMZ[_0x438099(0x5aa)][_0x438099(0x643)][_0x5dfefd][_0x438099(0x7df)](new RegExp(_0x16504a,'i'));const _0x947e8e=_0x438099(0x466)[_0x438099(0x382)](_0x44112d,_0x1fe434);VisuMZ[_0x438099(0x5aa)]['RegExp'][_0x5dfefd+'JS'][_0x438099(0x7df)](new RegExp(_0x947e8e,'i'));}}}}},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x625)]=function(){const _0x3299fb=_0x41f3d3;if(VisuMZ[_0x3299fb(0x745)])return;},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x520)]=function(){const _0x415553=_0x41f3d3,_0x18cfd0=VisuMZ[_0x415553(0x5aa)]['Settings'];_0x18cfd0[_0x415553(0x2d1)][_0x415553(0x554)]&&VisuMZ['ShowDevTools'](!![]);_0x18cfd0[_0x415553(0x2d1)][_0x415553(0x5d7)]&&(Input[_0x415553(0xa10)][0x23]=_0x415553(0x315),Input['keyMapper'][0x24]=_0x415553(0x592));if(_0x18cfd0[_0x415553(0x478)]){if(_0x415553(0x1c5)==='PnbGo')_0x5467e9=_0x415553(0x247)[_0x415553(0x382)](_0x2dda2b,_0x2b60c7);else{const _0x23d936=_0x18cfd0['ButtonAssist'];_0x23d936[_0x415553(0x97a)]=_0x23d936['KeySHIFT']||'\x5c}❪SHIFT❫\x5c{',_0x23d936[_0x415553(0x959)]=_0x23d936[_0x415553(0x959)]||'\x5c}❪TAB❫\x5c{';}}_0x18cfd0[_0x415553(0xa17)]['WASD']&&('hPdyj'==='IPpiq'?this[_0x415553(0x843)]=_0x44b7e0:(Input[_0x415553(0xa10)][0x57]='up',Input[_0x415553(0xa10)][0x41]='left',Input[_0x415553(0xa10)][0x53]=_0x415553(0x563),Input[_0x415553(0xa10)][0x44]=_0x415553(0x5ed),Input[_0x415553(0xa10)][0x45]='pagedown')),_0x18cfd0['KeyboardInput'][_0x415553(0x63a)]&&(Input[_0x415553(0xa10)][0x52]='dashToggle'),_0x18cfd0[_0x415553(0x803)][_0x415553(0xa47)]=_0x18cfd0['Param'][_0x415553(0xa47)][_0x415553(0x883)](_0x2c372b=>_0x2c372b[_0x415553(0x97e)]()[_0x415553(0x30b)]()),_0x18cfd0[_0x415553(0x803)][_0x415553(0xa43)]=_0x18cfd0[_0x415553(0x803)]['ExtDisplayedParams'][_0x415553(0x883)](_0x5f46eb=>_0x5f46eb[_0x415553(0x97e)]()[_0x415553(0x30b)]());},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x4a3)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x64a)]=function(){const _0x3fca56=_0x41f3d3,_0x4de7fa=VisuMZ[_0x3fca56(0x5aa)][_0x3fca56(0x5b1)][_0x3fca56(0x5f5)];for(const _0x2dedee of _0x4de7fa){const _0x84ef23=_0x2dedee[_0x3fca56(0x918)][_0x3fca56(0x572)](/[ ]/g,''),_0xa32725=_0x2dedee[_0x3fca56(0x1dc)];VisuMZ['CoreEngine']['createJsQuickFunction'](_0x84ef23,_0xa32725);}},VisuMZ[_0x41f3d3(0x5aa)]['createJsQuickFunction']=function(_0x47e4d1,_0x31dcb0){const _0x4b0e0f=_0x41f3d3;if(!!window[_0x47e4d1]){if($gameTemp[_0x4b0e0f(0x67d)]())console[_0x4b0e0f(0x5e6)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x4b0e0f(0x382)](_0x47e4d1));}const _0x3ccc18='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x4b0e0f(0x382)](_0x47e4d1,_0x31dcb0);window[_0x47e4d1]=new Function(_0x3ccc18);},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x2057db=_0x41f3d3,_0x1c3755=VisuMZ[_0x2057db(0x5aa)][_0x2057db(0x5b1)][_0x2057db(0x6ec)];if(!_0x1c3755)return;for(const _0x84b03d of _0x1c3755){if(!_0x84b03d)continue;VisuMZ['CoreEngine'][_0x2057db(0xa56)](_0x84b03d);}},VisuMZ[_0x41f3d3(0x5aa)]['CustomParamNames']={},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x538)]={},VisuMZ['CoreEngine'][_0x41f3d3(0xa66)]={},VisuMZ['CoreEngine'][_0x41f3d3(0x5f6)]={},VisuMZ['CoreEngine'][_0x41f3d3(0xa56)]=function(_0x303868){const _0x12aee5=_0x41f3d3,_0x2a0287=_0x303868['Abbreviation'],_0x2942bd=_0x303868[_0x12aee5(0x542)],_0x594d54=_0x303868[_0x12aee5(0x35b)],_0x3bce85=_0x303868[_0x12aee5(0x814)],_0x339273=new Function(_0x303868[_0x12aee5(0x8ff)]);VisuMZ[_0x12aee5(0x5aa)][_0x12aee5(0x7b4)][_0x2a0287[_0x12aee5(0x97e)]()[_0x12aee5(0x30b)]()]=_0x2942bd,VisuMZ[_0x12aee5(0x5aa)]['CustomParamIcons'][_0x2a0287[_0x12aee5(0x97e)]()['trim']()]=_0x594d54,VisuMZ[_0x12aee5(0x5aa)][_0x12aee5(0xa66)][_0x2a0287[_0x12aee5(0x97e)]()[_0x12aee5(0x30b)]()]=_0x3bce85,VisuMZ[_0x12aee5(0x5aa)]['CustomParamAbb'][_0x2a0287[_0x12aee5(0x97e)]()['trim']()]=_0x2a0287,Object[_0x12aee5(0x815)](Game_BattlerBase[_0x12aee5(0x1fd)],_0x2a0287,{'get'(){const _0x2fc5fb=_0x12aee5,_0xd70b1a=_0x339273['call'](this);return _0x3bce85==='integer'?Math[_0x2fc5fb(0x92b)](_0xd70b1a):_0xd70b1a;}});},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x386)]={},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x818)]={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x39843a=_0x41f3d3,_0x2f779d=VisuMZ[_0x39843a(0x5aa)][_0x39843a(0x5b1)][_0x39843a(0x386)];for(const _0x284369 of _0x2f779d){if(_0x39843a(0x6c6)!==_0x39843a(0x6c6)){const _0x3b6603=_0x594a7e[_0x39843a(0x5aa)][_0x39843a(0x5b1)][_0x39843a(0x1c6)];if(_0x3b6603[_0x39843a(0x267)]===![])return;_0x3b6603[_0x39843a(0x286)]?_0x3b6603[_0x39843a(0x286)][_0x39843a(0x809)](this,_0x12a3fb):_0x45b517[_0x39843a(0x5aa)][_0x39843a(0x95f)][_0x39843a(0x809)](this,_0x4bb756);}else{const _0x153537=(_0x284369['Name']||'')[_0x39843a(0x1b1)]()[_0x39843a(0x30b)](),_0xc65d55=(_0x284369[_0x39843a(0x581)]||'')[_0x39843a(0x1b1)]()[_0x39843a(0x30b)]();VisuMZ[_0x39843a(0x5aa)]['ControllerButtons'][_0x153537]=_0x284369,VisuMZ['CoreEngine'][_0x39843a(0x818)][_0xc65d55]=_0x153537;}}},VisuMZ[_0x41f3d3(0x745)]=function(){const _0x14e892=_0x41f3d3;for(const _0x464825 of $dataActors){if(_0x464825)VisuMZ['ParseActorNotetags'](_0x464825);}for(const _0x303d22 of $dataClasses){if('qulJW'===_0x14e892(0x570)){_0x5493b2['CoreEngine'][_0x14e892(0xa52)]['call'](this);if(!_0x4ff24f['DETACH_PICTURE_CONTAINER'])return;const _0x1b7d80=this[_0x14e892(0x5ab)];if(!_0x1b7d80)return;this[_0x14e892(0x5fc)]=_0x1b7d80[_0x14e892(0x5fc)];if(!this[_0x14e892(0x5fc)])return;this['addChild'](this[_0x14e892(0x5fc)]);}else{if(_0x303d22)VisuMZ[_0x14e892(0xa34)](_0x303d22);}}for(const _0x4a33db of $dataSkills){if(_0x4a33db)VisuMZ[_0x14e892(0x376)](_0x4a33db);}for(const _0x409b0d of $dataItems){if(_0x14e892(0xa54)!==_0x14e892(0xa54))return _0x125cd0[_0x14e892(0x1fb)][_0x14e892(0x5ce)][_0x14e892(0x809)](this);else{if(_0x409b0d)VisuMZ[_0x14e892(0x20a)](_0x409b0d);}}for(const _0x82350f of $dataWeapons){if(_0x82350f)VisuMZ[_0x14e892(0x6f4)](_0x82350f);}for(const _0x1e4deb of $dataArmors){if(_0x1e4deb)VisuMZ[_0x14e892(0xa62)](_0x1e4deb);}for(const _0x2c1859 of $dataEnemies){if(_0x2c1859)VisuMZ[_0x14e892(0x9b6)](_0x2c1859);}for(const _0x407689 of $dataStates){if(_0x407689)VisuMZ[_0x14e892(0x7cd)](_0x407689);}for(const _0x564c90 of $dataTilesets){if(_0x564c90)VisuMZ['ParseTilesetNotetags'](_0x564c90);}},VisuMZ['ParseActorNotetags']=function(_0x26db5c){},VisuMZ[_0x41f3d3(0xa34)]=function(_0x5e59ae){},VisuMZ['ParseSkillNotetags']=function(_0x4fdbfb){},VisuMZ[_0x41f3d3(0x20a)]=function(_0x1bd110){},VisuMZ['ParseWeaponNotetags']=function(_0x44a669){},VisuMZ[_0x41f3d3(0xa62)]=function(_0x26b22){},VisuMZ[_0x41f3d3(0x9b6)]=function(_0x45d714){},VisuMZ['ParseStateNotetags']=function(_0x3d3d6a){},VisuMZ[_0x41f3d3(0x529)]=function(_0x52ccce){},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2bd)]=VisuMZ[_0x41f3d3(0x2bd)],VisuMZ[_0x41f3d3(0x2bd)]=function(_0x5ea73a){const _0x51b3ee=_0x41f3d3;VisuMZ[_0x51b3ee(0x5aa)][_0x51b3ee(0x2bd)]['call'](this,_0x5ea73a);const _0x3b39a9=_0x5ea73a[_0x51b3ee(0x212)];if(_0x3b39a9[_0x51b3ee(0x420)](/<MAX LEVEL:[ ](\d+)>/i)){_0x5ea73a['maxLevel']=Number(RegExp['$1']);if(_0x5ea73a[_0x51b3ee(0x6db)]===0x0)_0x5ea73a[_0x51b3ee(0x6db)]=Number[_0x51b3ee(0x9ae)];}_0x3b39a9[_0x51b3ee(0x420)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x5ea73a[_0x51b3ee(0x8b0)]=Math[_0x51b3ee(0x568)](Number(RegExp['$1']),_0x5ea73a['maxLevel']));},VisuMZ['CoreEngine'][_0x41f3d3(0xa34)]=VisuMZ[_0x41f3d3(0xa34)],VisuMZ[_0x41f3d3(0xa34)]=function(_0x5b3ca7){const _0x13e672=_0x41f3d3;VisuMZ[_0x13e672(0x5aa)][_0x13e672(0xa34)][_0x13e672(0x809)](this,_0x5b3ca7);if(_0x5b3ca7[_0x13e672(0xa00)]){if(_0x13e672(0x50a)===_0x13e672(0x9d9))_0x127d42+=_0x55b1a9(_0x15a4ac);else for(const _0x4a9893 of _0x5b3ca7['learnings']){_0x13e672(0x257)!==_0x13e672(0x257)?_0xdc6133[_0x13e672(0x2f6)]=this[_0x13e672(0x9b1)]()&&this[_0x13e672(0x780)]():_0x4a9893[_0x13e672(0x212)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x13e672(0x7ee)!==_0x13e672(0x7ee)?_0x56cc2b[_0x13e672(0x5aa)][_0x13e672(0x5b1)]['UI'][_0x13e672(0x5a5)]&&(this[_0x13e672(0x967)]=_0x23d0b2):_0x4a9893[_0x13e672(0x713)]=Math['max'](Number(RegExp['$1']),0x1));}}},VisuMZ[_0x41f3d3(0x5aa)]['ParseEnemyNotetags']=VisuMZ[_0x41f3d3(0x9b6)],VisuMZ[_0x41f3d3(0x9b6)]=function(_0x5d03a2){const _0x3666a0=_0x41f3d3;VisuMZ[_0x3666a0(0x5aa)][_0x3666a0(0x9b6)][_0x3666a0(0x809)](this,_0x5d03a2),_0x5d03a2[_0x3666a0(0x713)]=0x1;const _0x5371bd=_0x5d03a2[_0x3666a0(0x212)];if(_0x5371bd[_0x3666a0(0x420)](/<LEVEL:[ ](\d+)>/i))_0x5d03a2[_0x3666a0(0x713)]=Number(RegExp['$1']);if(_0x5371bd[_0x3666a0(0x420)](/<MAXHP:[ ](\d+)>/i))_0x5d03a2['params'][0x0]=Number(RegExp['$1']);if(_0x5371bd[_0x3666a0(0x420)](/<MAXMP:[ ](\d+)>/i))_0x5d03a2['params'][0x1]=Number(RegExp['$1']);if(_0x5371bd['match'](/<ATK:[ ](\d+)>/i))_0x5d03a2['params'][0x2]=Number(RegExp['$1']);if(_0x5371bd['match'](/<DEF:[ ](\d+)>/i))_0x5d03a2[_0x3666a0(0x8cb)][0x3]=Number(RegExp['$1']);if(_0x5371bd['match'](/<MAT:[ ](\d+)>/i))_0x5d03a2['params'][0x4]=Number(RegExp['$1']);if(_0x5371bd['match'](/<MDF:[ ](\d+)>/i))_0x5d03a2[_0x3666a0(0x8cb)][0x5]=Number(RegExp['$1']);if(_0x5371bd[_0x3666a0(0x420)](/<AGI:[ ](\d+)>/i))_0x5d03a2[_0x3666a0(0x8cb)][0x6]=Number(RegExp['$1']);if(_0x5371bd[_0x3666a0(0x420)](/<LUK:[ ](\d+)>/i))_0x5d03a2[_0x3666a0(0x8cb)][0x7]=Number(RegExp['$1']);if(_0x5371bd[_0x3666a0(0x420)](/<EXP:[ ](\d+)>/i))_0x5d03a2['exp']=Number(RegExp['$1']);if(_0x5371bd[_0x3666a0(0x420)](/<GOLD:[ ](\d+)>/i))_0x5d03a2['gold']=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x41f3d3(0x91a)]=Graphics[_0x41f3d3(0x30a)],Graphics['_defaultStretchMode']=function(){const _0x17a75e=_0x41f3d3;switch(VisuMZ[_0x17a75e(0x5aa)][_0x17a75e(0x5b1)][_0x17a75e(0x2d1)][_0x17a75e(0x5bb)]){case _0x17a75e(0x43c):return!![];case _0x17a75e(0x38a):return![];default:return VisuMZ['CoreEngine'][_0x17a75e(0x91a)][_0x17a75e(0x809)](this);}},VisuMZ[_0x41f3d3(0x5aa)]['Graphics_printError']=Graphics[_0x41f3d3(0x1be)],Graphics[_0x41f3d3(0x1be)]=function(_0x2267c9,_0xcf36e9,_0x29a8da=null){const _0x3adc45=_0x41f3d3;VisuMZ['CoreEngine']['Graphics_printError'][_0x3adc45(0x809)](this,_0x2267c9,_0xcf36e9,_0x29a8da),VisuMZ[_0x3adc45(0x760)](![]);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2b2)]=Graphics[_0x41f3d3(0x4fd)],Graphics['_centerElement']=function(_0x85efc4){const _0x14454d=_0x41f3d3;VisuMZ[_0x14454d(0x5aa)]['Graphics_centerElement'][_0x14454d(0x809)](this,_0x85efc4),this['_centerElementCoreEngine'](_0x85efc4);},Graphics[_0x41f3d3(0x2e3)]=function(_0x5610a3){const _0x74b830=_0x41f3d3;VisuMZ[_0x74b830(0x5aa)][_0x74b830(0x5b1)][_0x74b830(0x2d1)][_0x74b830(0x1d5)]&&(_0x74b830(0x352)!=='UsZAQ'?_0xbfdf26[_0x74b830(0x367)]&&(this[_0x74b830(0x98c)]='STB'):_0x5610a3[_0x74b830(0x472)][_0x74b830(0x48b)]=_0x74b830(0x746));VisuMZ[_0x74b830(0x5aa)]['Settings'][_0x74b830(0x2d1)][_0x74b830(0x748)]&&(_0x74b830(0x418)===_0x74b830(0x902)?_0x5a0e32[_0x74b830(0x591)]&&(this[_0x74b830(0x98c)]='PTB'):_0x5610a3[_0x74b830(0x472)][_0x74b830(0x730)]='pixelated');const _0x1ef5af=Math[_0x74b830(0x4a5)](0x0,Math[_0x74b830(0x6ae)](_0x5610a3[_0x74b830(0x665)]*this['_realScale'])),_0x380455=Math[_0x74b830(0x4a5)](0x0,Math[_0x74b830(0x6ae)](_0x5610a3[_0x74b830(0x4f1)]*this['_realScale']));_0x5610a3[_0x74b830(0x472)][_0x74b830(0x665)]=_0x1ef5af+'px',_0x5610a3['style']['height']=_0x380455+'px';},VisuMZ['CoreEngine'][_0x41f3d3(0x6f1)]=Bitmap[_0x41f3d3(0x1fd)]['initialize'],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)]=function(_0x4b22f6,_0x606723){const _0x2c2b26=_0x41f3d3;VisuMZ[_0x2c2b26(0x5aa)][_0x2c2b26(0x6f1)][_0x2c2b26(0x809)](this,_0x4b22f6,_0x606723),this[_0x2c2b26(0x1b4)]=!(VisuMZ[_0x2c2b26(0x5aa)][_0x2c2b26(0x5b1)][_0x2c2b26(0x2d1)][_0x2c2b26(0x748)]??!![]);},Bitmap['prototype']['markCoreEngineModified']=function(){const _0xb35590=_0x41f3d3;this[_0xb35590(0x52d)]=!![];},VisuMZ['CoreEngine']['Sprite_destroy']=Sprite['prototype']['destroy'],Sprite[_0x41f3d3(0x1fd)][_0x41f3d3(0x9ff)]=function(){const _0x4a890b=_0x41f3d3;if(this[_0x4a890b(0x3ed)])VisuMZ['CoreEngine'][_0x4a890b(0x2b4)][_0x4a890b(0x809)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x41f3d3(0x1fd)][_0x41f3d3(0x270)]=function(){const _0x1915db=_0x41f3d3;if(!this[_0x1915db(0x5b0)])return;if(!this[_0x1915db(0x5b0)][_0x1915db(0x52d)])return;this['bitmap'][_0x1915db(0x1e5)]&&!this['_bitmap'][_0x1915db(0x1e5)][_0x1915db(0x9ba)]&&this[_0x1915db(0x5b0)][_0x1915db(0x9ff)]();},VisuMZ['CoreEngine'][_0x41f3d3(0xa60)]=Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x241)],Bitmap['prototype'][_0x41f3d3(0x241)]=function(_0x204f97,_0x4b391d){const _0x8017d7=_0x41f3d3;VisuMZ[_0x8017d7(0x5aa)][_0x8017d7(0xa60)]['call'](this,_0x204f97,_0x4b391d),this[_0x8017d7(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x8e1)]=Bitmap['prototype']['blt'],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x66f)]=function(_0x50ea4a,_0x4debd6,_0x3247f8,_0x4fd8a5,_0x1d090b,_0x36c068,_0x3a6e71,_0x4c5db9,_0x470083){const _0x5abe5f=_0x41f3d3;_0x4debd6=Math['round'](_0x4debd6),_0x3247f8=Math[_0x5abe5f(0x92b)](_0x3247f8),_0x4fd8a5=Math[_0x5abe5f(0x92b)](_0x4fd8a5),_0x1d090b=Math[_0x5abe5f(0x92b)](_0x1d090b),_0x36c068=Math['round'](_0x36c068),_0x3a6e71=Math['round'](_0x3a6e71),VisuMZ['CoreEngine'][_0x5abe5f(0x8e1)][_0x5abe5f(0x809)](this,_0x50ea4a,_0x4debd6,_0x3247f8,_0x4fd8a5,_0x1d090b,_0x36c068,_0x3a6e71,_0x4c5db9,_0x470083),this[_0x5abe5f(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x1a3)]=Bitmap[_0x41f3d3(0x1fd)]['clearRect'],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x4cb)]=function(_0xea242b,_0x48b824,_0x446ca0,_0x432f16){const _0x3e1d98=_0x41f3d3;VisuMZ['CoreEngine']['Bitmap_clearRect'][_0x3e1d98(0x809)](this,_0xea242b,_0x48b824,_0x446ca0,_0x432f16),this[_0x3e1d98(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x3e9)]=Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x51a)],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x51a)]=function(_0x2c529f,_0x20b81b,_0x128d01,_0x5b7a08,_0x3c1769){const _0x3ce71e=_0x41f3d3;VisuMZ[_0x3ce71e(0x5aa)][_0x3ce71e(0x3e9)]['call'](this,_0x2c529f,_0x20b81b,_0x128d01,_0x5b7a08,_0x3c1769),this[_0x3ce71e(0x7bb)]();},VisuMZ['CoreEngine']['Bitmap_strokeRect']=Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x4cd)],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x4cd)]=function(_0x3a9804,_0x3c7945,_0x463a33,_0x4ae145,_0xda3730){const _0x1c11e0=_0x41f3d3;VisuMZ['CoreEngine']['Bitmap_strokeRect']['call'](this,_0x3a9804,_0x3c7945,_0x463a33,_0x4ae145,_0xda3730),this[_0x1c11e0(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2b7)]=Bitmap['prototype']['gradientFillRect'],Bitmap['prototype']['gradientFillRect']=function(_0x16928e,_0x5b1872,_0x59927e,_0x5c9c1c,_0x3c6a01,_0x41cda3,_0x2ffeb4){const _0x18a5c4=_0x41f3d3;VisuMZ[_0x18a5c4(0x5aa)]['Bitmap_gradientFillRect'][_0x18a5c4(0x809)](this,_0x16928e,_0x5b1872,_0x59927e,_0x5c9c1c,_0x3c6a01,_0x41cda3,_0x2ffeb4),this[_0x18a5c4(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)]['Bitmap_drawCircle']=Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x202)],Bitmap[_0x41f3d3(0x1fd)]['drawCircle']=function(_0x170851,_0x40f770,_0x2344c3,_0x22a4b1){const _0x273f28=_0x41f3d3;_0x170851=Math[_0x273f28(0x92b)](_0x170851),_0x40f770=Math[_0x273f28(0x92b)](_0x40f770),_0x2344c3=Math['round'](_0x2344c3),VisuMZ['CoreEngine'][_0x273f28(0x873)][_0x273f28(0x809)](this,_0x170851,_0x40f770,_0x2344c3,_0x22a4b1),this[_0x273f28(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x49c)]=Bitmap[_0x41f3d3(0x1fd)]['measureTextWidth'],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0xa0e)]=function(_0xd148fb){const _0x95da6a=_0x41f3d3;return Math[_0x95da6a(0xa57)](VisuMZ[_0x95da6a(0x5aa)]['Bitmap_measureTextWidth'][_0x95da6a(0x809)](this,_0xd148fb));},VisuMZ['CoreEngine'][_0x41f3d3(0x40f)]=Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x7d1)],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x7d1)]=function(_0x4e0b3b,_0x23f72d,_0x55446b,_0x3193a6,_0x4a6113,_0x40133d){const _0x3aed3d=_0x41f3d3;_0x23f72d=Math['round'](_0x23f72d),_0x55446b=Math[_0x3aed3d(0x92b)](_0x55446b),_0x3193a6=Math[_0x3aed3d(0x92b)](_0x3193a6),_0x4a6113=Math['round'](_0x4a6113),VisuMZ[_0x3aed3d(0x5aa)][_0x3aed3d(0x40f)]['call'](this,_0x4e0b3b,_0x23f72d,_0x55446b,_0x3193a6,_0x4a6113,_0x40133d),this[_0x3aed3d(0x7bb)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x396)]=Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x268)],Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x268)]=function(_0x522ee1,_0x4c3a1c,_0x15ffe3,_0x2839de){const _0x5163fb=_0x41f3d3;VisuMZ[_0x5163fb(0x5aa)]['Settings'][_0x5163fb(0x2d1)][_0x5163fb(0x2c4)]?this['_drawTextShadow'](_0x522ee1,_0x4c3a1c,_0x15ffe3,_0x2839de):VisuMZ['CoreEngine'][_0x5163fb(0x396)][_0x5163fb(0x809)](this,_0x522ee1,_0x4c3a1c,_0x15ffe3,_0x2839de);},Bitmap[_0x41f3d3(0x1fd)]['_drawTextShadow']=function(_0x478e13,_0x50bf45,_0x172598,_0x22a7de){const _0x4c61d8=_0x41f3d3,_0x2884a7=this[_0x4c61d8(0x414)];_0x2884a7[_0x4c61d8(0x31c)]=this[_0x4c61d8(0x838)],_0x2884a7[_0x4c61d8(0x24d)](_0x478e13,_0x50bf45+0x2,_0x172598+0x2,_0x22a7de);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0xa27)]=Input[_0x41f3d3(0x3b1)],Input[_0x41f3d3(0x3b1)]=function(){const _0x209ff1=_0x41f3d3;VisuMZ[_0x209ff1(0x5aa)][_0x209ff1(0xa27)]['call'](this),this[_0x209ff1(0x5ea)]=undefined,this[_0x209ff1(0x7d9)]=undefined,this[_0x209ff1(0x6fd)]=Input[_0x209ff1(0x46e)];},VisuMZ['CoreEngine'][_0x41f3d3(0x913)]=Input['update'],Input['update']=function(){const _0x17b357=_0x41f3d3;VisuMZ[_0x17b357(0x5aa)][_0x17b357(0x913)]['call'](this);if(this[_0x17b357(0x6fd)])this[_0x17b357(0x6fd)]--;},VisuMZ[_0x41f3d3(0x5aa)]['Input_pollGamepads']=Input[_0x41f3d3(0x5be)],Input[_0x41f3d3(0x5be)]=function(){const _0xe2b498=_0x41f3d3;if(this['_gamepadWait'])return;VisuMZ['CoreEngine']['Input_pollGamepads'][_0xe2b498(0x809)](this);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x582)]=Input[_0x41f3d3(0x5d2)],Input['_setupEventHandlers']=function(){const _0x316af0=_0x41f3d3;VisuMZ[_0x316af0(0x5aa)]['Input_setupEventHandlers'][_0x316af0(0x809)](this),document['addEventListener']('keypress',this[_0x316af0(0x8aa)][_0x316af0(0x508)](this));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x9da)]=Input[_0x41f3d3(0x880)],Input['_onKeyDown']=function(_0x57c893){const _0x9820e4=_0x41f3d3;this[_0x9820e4(0x7d9)]=_0x57c893['keyCode'],VisuMZ[_0x9820e4(0x5aa)]['Input_onKeyDown'][_0x9820e4(0x809)](this,_0x57c893),this[_0x9820e4(0x534)](null);},Input[_0x41f3d3(0x8aa)]=function(_0x989768){this['_registerKeyInput'](_0x989768);},Input[_0x41f3d3(0x480)]=function(_0x3fcf49){const _0x373533=_0x41f3d3;this[_0x373533(0x7d9)]=_0x3fcf49['keyCode'];let _0x22799f=String[_0x373533(0x88f)](_0x3fcf49['charCode']);this[_0x373533(0x5ea)]===undefined?_0x373533(0x68a)!=='eiWzT'?this[_0x373533(0x5ea)]=_0x22799f:_0x71851a[_0x373533(0x5aa)]['Window_NameInput_processTouch'][_0x373533(0x809)](this):this[_0x373533(0x5ea)]+=_0x22799f;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x8a1)]=Input['_shouldPreventDefault'],Input['_shouldPreventDefault']=function(_0x78cf8e){const _0xb5ac6=_0x41f3d3;if(_0x78cf8e===0x8)return![];return VisuMZ[_0xb5ac6(0x5aa)]['Input_shouldPreventDefault'][_0xb5ac6(0x809)](this,_0x78cf8e);},Input[_0x41f3d3(0x3ad)]=function(_0x54379b){const _0x10bd7f=_0x41f3d3;if(_0x54379b[_0x10bd7f(0x420)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x54379b[_0x10bd7f(0x420)](/enter/i))return this[_0x10bd7f(0x7d9)]===0xd;if(_0x54379b[_0x10bd7f(0x420)](/escape/i))return this[_0x10bd7f(0x7d9)]===0x1b;},Input['isNumpadPressed']=function(){return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this['_inputSpecialKeyCode']);},Input['isArrowPressed']=function(){const _0x470594=_0x41f3d3;return[0x25,0x26,0x27,0x28][_0x470594(0x265)](this[_0x470594(0x7d9)]);},Input[_0x41f3d3(0x1dd)]=function(){const _0x3f7add=_0x41f3d3;if(navigator[_0x3f7add(0x457)]){const _0x526992=navigator[_0x3f7add(0x457)]();if(_0x526992)for(const _0x462112 of _0x526992){if(_0x462112&&_0x462112[_0x3f7add(0x6ab)])return!![];}}return![];},Input[_0x41f3d3(0xa11)]=function(){const _0x59cbf8=_0x41f3d3;if(navigator[_0x59cbf8(0x457)]){if('oGifH'===_0x59cbf8(0x58d))return _0x268c9e['CoreEngine'][_0x59cbf8(0x779)][_0x59cbf8(0x809)](this,_0x48bff3);else{const _0x55d5c5=navigator[_0x59cbf8(0x457)]();if(_0x55d5c5)for(const _0x4b8841 of _0x55d5c5){if(_0x4b8841&&_0x4b8841[_0x59cbf8(0x6ab)]){if(this[_0x59cbf8(0x56a)](_0x4b8841))return!![];if(this[_0x59cbf8(0x800)](_0x4b8841))return!![];}}}}return![];},Input[_0x41f3d3(0x56a)]=function(_0x3e5b09){const _0x5bde37=_0x41f3d3,_0x2bb1c0=_0x3e5b09[_0x5bde37(0x8e6)];for(let _0x43f21c=0x0;_0x43f21c<_0x2bb1c0[_0x5bde37(0x9b7)];_0x43f21c++){if(_0x2bb1c0[_0x43f21c][_0x5bde37(0x7f6)])return!![];}return![];},Input[_0x41f3d3(0x800)]=function(_0x3c2421){const _0x3af84c=_0x41f3d3,_0x14b32e=_0x3c2421[_0x3af84c(0x848)],_0x29687b=0.5;if(_0x14b32e[0x0]<-_0x29687b)return!![];if(_0x14b32e[0x0]>_0x29687b)return!![];if(_0x14b32e[0x1]<-_0x29687b)return!![];if(_0x14b32e[0x1]>_0x29687b)return!![];return![];},Input[_0x41f3d3(0x8f4)]=function(){const _0x5ae376=_0x41f3d3;return this[_0x5ae376(0x4e4)]||null;},Input[_0x41f3d3(0x534)]=function(_0x5c2581){const _0x4f497d=_0x41f3d3;this[_0x4f497d(0x4e4)]=_0x5c2581;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x3ea)]=Input[_0x41f3d3(0x877)],Input[_0x41f3d3(0x877)]=function(_0x52badf){const _0x1c0f33=_0x41f3d3;VisuMZ[_0x1c0f33(0x5aa)]['Input_updateGamepadState']['call'](this,_0x52badf),(this[_0x1c0f33(0x56a)](_0x52badf)||this[_0x1c0f33(0x800)](_0x52badf))&&(_0x1c0f33(0x1b2)==='Bwchf'?(_0x13b6e6['CoreEngine']['Scene_Map_initialize'][_0x1c0f33(0x809)](this),_0x4530cf['clearForcedGameTroopSettingsCoreEngine'](),this[_0x1c0f33(0x3bc)]()):this[_0x1c0f33(0x534)](_0x52badf));},Input['getLastUsedGamepadType']=function(){const _0x47d30f=_0x41f3d3;return this[_0x47d30f(0x4e4)]?this['_lastGamepad']['id']:'Keyboard';},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x353)]=Tilemap[_0x41f3d3(0x1fd)]['_addShadow'],Tilemap['prototype']['_addShadow']=function(_0x48c6c6,_0x5cbb5b,_0xc88014,_0x1ca1a1){const _0x5ebf42=_0x41f3d3;if($gameMap&&$gameMap[_0x5ebf42(0x4e8)]())return;VisuMZ[_0x5ebf42(0x5aa)]['Tilemap_addShadow'][_0x5ebf42(0x809)](this,_0x48c6c6,_0x5cbb5b,_0xc88014,_0x1ca1a1);},Tilemap[_0x41f3d3(0x57f)][_0x41f3d3(0x1fd)][_0x41f3d3(0x397)]=function(){const _0xbea1b0=_0x41f3d3;this[_0xbea1b0(0x35f)]();for(let _0x5a4e5e=0x0;_0x5a4e5e<Tilemap[_0xbea1b0(0x95e)][_0xbea1b0(0x36b)];_0x5a4e5e++){const _0x1cb722=new PIXI[(_0xbea1b0(0x5a8))]();_0x1cb722[_0xbea1b0(0x6a1)](0x800,0x800),VisuMZ[_0xbea1b0(0x5aa)][_0xbea1b0(0x5b1)]['QoL']['PixelateImageRendering']&&(_0xbea1b0(0x288)===_0xbea1b0(0x18e)?_0x2215e2['VisuMZ_2_BattleSystemPTB']&&(this[_0xbea1b0(0x98c)]=_0xbea1b0(0x61c)):_0x1cb722[_0xbea1b0(0x9be)]=PIXI[_0xbea1b0(0x75c)][_0xbea1b0(0x853)]),this['_internalTextures'][_0xbea1b0(0x7df)](_0x1cb722);}},WindowLayer[_0x41f3d3(0x1fd)][_0x41f3d3(0x983)]=function(){const _0x656b71=_0x41f3d3;if(SceneManager&&SceneManager[_0x656b71(0x2b5)])return SceneManager['_scene']['isWindowMaskingEnabled']();else{if(_0x656b71(0x72a)===_0x656b71(0x72a))return!![];else this[_0x656b71(0x5b0)]['destroy']();}},VisuMZ['CoreEngine'][_0x41f3d3(0x733)]=WindowLayer[_0x41f3d3(0x1fd)][_0x41f3d3(0x308)],WindowLayer[_0x41f3d3(0x1fd)][_0x41f3d3(0x308)]=function render(_0x11b5d2){const _0x5bf4eb=_0x41f3d3;this[_0x5bf4eb(0x983)]()?VisuMZ['CoreEngine']['WindowLayer_render'][_0x5bf4eb(0x809)](this,_0x11b5d2):'sDmZw'!==_0x5bf4eb(0x4ab)?this[_0x5bf4eb(0x50c)](_0x11b5d2):_0x31df14['VisuMZ_2_BattleSystemCTB']&&(this[_0x5bf4eb(0x98c)]=_0x5bf4eb(0x65a));},WindowLayer[_0x41f3d3(0x1fd)][_0x41f3d3(0x50c)]=function render(_0x4b73b3){const _0x35c0c8=_0x41f3d3;if(!this['visible'])return;const _0x1b06b5=new PIXI[(_0x35c0c8(0x5b8))](),_0xbaf09c=_0x4b73b3['gl'],_0x47fb2f=this['children'][_0x35c0c8(0x1f8)]();_0x4b73b3[_0x35c0c8(0x23d)][_0x35c0c8(0x8da)](),_0x1b06b5[_0x35c0c8(0x968)]=this[_0x35c0c8(0x968)],_0x4b73b3[_0x35c0c8(0x876)][_0x35c0c8(0x6f3)](),_0xbaf09c[_0x35c0c8(0x58c)](_0xbaf09c[_0x35c0c8(0x477)]);while(_0x47fb2f[_0x35c0c8(0x9b7)]>0x0){const _0x3768ac=_0x47fb2f['shift']();_0x3768ac[_0x35c0c8(0x7a1)]&&_0x3768ac[_0x35c0c8(0x2f6)]&&_0x3768ac[_0x35c0c8(0x6d7)]>0x0&&(_0xbaf09c[_0x35c0c8(0xa55)](_0xbaf09c['EQUAL'],0x0,~0x0),_0xbaf09c['stencilOp'](_0xbaf09c[_0x35c0c8(0x32e)],_0xbaf09c['KEEP'],_0xbaf09c[_0x35c0c8(0x32e)]),_0x3768ac['render'](_0x4b73b3),_0x4b73b3[_0x35c0c8(0x876)]['flush'](),_0x1b06b5[_0x35c0c8(0x3b1)](),_0xbaf09c[_0x35c0c8(0xa55)](_0xbaf09c[_0x35c0c8(0x6ef)],0x1,~0x0),_0xbaf09c[_0x35c0c8(0xa26)](_0xbaf09c['REPLACE'],_0xbaf09c[_0x35c0c8(0x460)],_0xbaf09c['REPLACE']),_0xbaf09c[_0x35c0c8(0x906)](_0xbaf09c[_0x35c0c8(0x216)],_0xbaf09c[_0x35c0c8(0x9ac)]),_0x1b06b5[_0x35c0c8(0x308)](_0x4b73b3),_0x4b73b3[_0x35c0c8(0x876)]['flush'](),_0xbaf09c[_0x35c0c8(0x906)](_0xbaf09c[_0x35c0c8(0x9ac)],_0xbaf09c['ONE_MINUS_SRC_ALPHA']));}_0xbaf09c[_0x35c0c8(0x431)](_0xbaf09c[_0x35c0c8(0x477)]),_0xbaf09c[_0x35c0c8(0x3b1)](_0xbaf09c[_0x35c0c8(0x5e2)]),_0xbaf09c[_0x35c0c8(0x3c6)](0x0),_0x4b73b3['batch'][_0x35c0c8(0x6f3)]();for(const _0x3d4350 of this[_0x35c0c8(0x54a)]){_0x35c0c8(0x635)===_0x35c0c8(0x635)?!_0x3d4350[_0x35c0c8(0x7a1)]&&_0x3d4350['visible']&&_0x3d4350[_0x35c0c8(0x308)](_0x4b73b3):this[_0x35c0c8(0x9f7)]&&this[_0x35c0c8(0x9f7)]();}_0x4b73b3[_0x35c0c8(0x876)][_0x35c0c8(0x6f3)]();},DataManager[_0x41f3d3(0x4f3)]=function(_0xa12137){const _0x3b9061=_0x41f3d3;return this[_0x3b9061(0x764)](_0xa12137)&&_0xa12137[_0x3b9061(0x821)]===0x2;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x4fa)]=DataManager[_0x41f3d3(0x355)],DataManager[_0x41f3d3(0x355)]=function(){const _0x1fb257=_0x41f3d3;VisuMZ[_0x1fb257(0x5aa)][_0x1fb257(0x4fa)]['call'](this),this[_0x1fb257(0x3f0)](),this[_0x1fb257(0x806)]();},DataManager[_0x41f3d3(0x3f0)]=function(){const _0x3b7b1e=_0x41f3d3;if($gameTemp[_0x3b7b1e(0x67d)]()){const _0x35ad58=VisuMZ[_0x3b7b1e(0x5aa)][_0x3b7b1e(0x5b1)][_0x3b7b1e(0x2d1)][_0x3b7b1e(0x1c9)];if(_0x35ad58>0x0)$gameTemp['reserveCommonEvent'](_0x35ad58);}},DataManager[_0x41f3d3(0x806)]=function(){const _0x508727=_0x41f3d3,_0x4f8ade=VisuMZ[_0x508727(0x5aa)]['Settings'][_0x508727(0x2d1)]['NewGameCommonEventAll']||0x0;if(_0x4f8ade>0x0)$gameTemp[_0x508727(0x8c7)](_0x4f8ade);},DataManager['createTroopNote']=function(_0x1858ea){const _0x5c5930=_0x41f3d3,_0x2b2484=$dataTroops[_0x1858ea];if(!_0x2b2484)return'';let _0x5911e4='';_0x5911e4+=_0x2b2484[_0x5c5930(0x23b)];for(const _0x498cb7 of _0x2b2484['pages']){if(_0x5c5930(0x7c1)!==_0x5c5930(0x7c1))this['_clickHandler']();else for(const _0x4e5195 of _0x498cb7[_0x5c5930(0x6aa)]){[0x6c,0x198][_0x5c5930(0x85f)](_0x4e5195[_0x5c5930(0x775)])&&(_0x5911e4+='\x0a',_0x5911e4+=_0x4e5195['parameters'][0x0]);}}return _0x5911e4;};(VisuMZ['CoreEngine'][_0x41f3d3(0x5b1)]['QoL']['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b2)]=Scene_Base[_0x41f3d3(0x1fd)]['create'],Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)]=function(){const _0x379eb9=_0x41f3d3;VisuMZ[_0x379eb9(0x5aa)]['Scene_Base_create'][_0x379eb9(0x809)](this),$scene=this;},$spriteset=null,VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x3c3)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)]=function(){const _0x5074c5=_0x41f3d3;VisuMZ['CoreEngine'][_0x5074c5(0x3c3)][_0x5074c5(0x809)](this),$spriteset=this[_0x5074c5(0x5ab)];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x29f)]=Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)],Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)]=function(){const _0x1d5fc7=_0x41f3d3;VisuMZ[_0x1d5fc7(0x5aa)][_0x1d5fc7(0x29f)][_0x1d5fc7(0x809)](this),$spriteset=this[_0x1d5fc7(0x5ab)];},VisuMZ[_0x41f3d3(0x5aa)]['Scene_Base_terminate']=Scene_Base['prototype'][_0x41f3d3(0x682)],Scene_Base[_0x41f3d3(0x1fd)]['terminate']=function(){const _0x3a19b6=_0x41f3d3;VisuMZ['CoreEngine'][_0x3a19b6(0x670)][_0x3a19b6(0x809)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x41f3d3(0x654)]=BattleManager[_0x41f3d3(0x314)],BattleManager[_0x41f3d3(0x314)]=function(_0x440693){const _0x2f1c7d=_0x41f3d3;VisuMZ[_0x2f1c7d(0x5aa)][_0x2f1c7d(0x654)][_0x2f1c7d(0x809)](this,_0x440693),$subject=this['_subject'],$targets=this['_targets'],$target=this[_0x2f1c7d(0x294)]||this[_0x2f1c7d(0x995)][0x0];},$event=null,VisuMZ[_0x41f3d3(0x5aa)]['Game_Event_start']=Game_Event['prototype'][_0x41f3d3(0x6fc)],Game_Event[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fc)]=function(){const _0x44be42=_0x41f3d3;VisuMZ[_0x44be42(0x5aa)][_0x44be42(0x5a7)][_0x44be42(0x809)](this),$event=this;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x1c3)]=Scene_Map['prototype'][_0x41f3d3(0x314)],Scene_Map[_0x41f3d3(0x1fd)]['update']=function(){const _0x239a1a=_0x41f3d3;VisuMZ[_0x239a1a(0x5aa)]['Scene_Map_update']['call'](this),$gameMap[_0x239a1a(0x2c8)]();},Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x2c8)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x35c885){const _0x2df4f1=_0x41f3d3;if($gameTemp)$gameTemp[_0x2df4f1(0x8c7)](_0x35c885);},$onceParallel=function(_0x1e5a13){const _0x17452b=_0x41f3d3;if(SceneManager[_0x17452b(0x736)]())$scene[_0x17452b(0x540)](_0x1e5a13);else{if(SceneManager[_0x17452b(0x19b)]()){if(Imported[_0x17452b(0x78b)])_0x17452b(0xa5e)===_0x17452b(0xa5e)?$scene[_0x17452b(0x540)](_0x1e5a13):this[_0x17452b(0x8e4)][_0x17452b(0x564)](_0x588705[_0x17452b(0x1fb)]['StatusBgType']);else $gameTemp&&$gameTemp[_0x17452b(0x67d)]()&&alert(_0x17452b(0x54f));}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x17452b(0x555));}});;StorageManager[_0x41f3d3(0x4b7)]=function(_0x5edbda){return new Promise((_0x5259c6,_0x4b40bb)=>{const _0x269aef=_0x4926;try{const _0x53c162=pako[_0x269aef(0x8f9)](_0x5edbda,{'to':'string','level':0x1});if(_0x53c162[_0x269aef(0x9b7)]>=0xc350){}_0x5259c6(_0x53c162);}catch(_0x31a87d){_0x4b40bb(_0x31a87d);}});},TextManager['stringKeyMap']=['','','','CANCEL','','',_0x41f3d3(0x75e),'',_0x41f3d3(0x4d1),'TAB','','',_0x41f3d3(0x739),'ENTER','ENTER_SPECIAL','','SHIFT',_0x41f3d3(0x4b3),_0x41f3d3(0x3e7),_0x41f3d3(0x24c),_0x41f3d3(0x249),_0x41f3d3(0x5cf),_0x41f3d3(0x53b),_0x41f3d3(0x7e0),_0x41f3d3(0x956),_0x41f3d3(0x1ce),'',_0x41f3d3(0x964),_0x41f3d3(0x9f1),_0x41f3d3(0x239),'ACCEPT',_0x41f3d3(0x71c),_0x41f3d3(0x3ca),'PGUP',_0x41f3d3(0x2bf),'END',_0x41f3d3(0x79e),_0x41f3d3(0x6c9),'UP',_0x41f3d3(0x90f),_0x41f3d3(0x8a3),'SELECT',_0x41f3d3(0x6da),'EXECUTE',_0x41f3d3(0x6d6),_0x41f3d3(0x76b),_0x41f3d3(0x8ac),'','0','1','2','3','4','5','6','7','8','9',_0x41f3d3(0x4f7),_0x41f3d3(0x2a8),_0x41f3d3(0x5d9),_0x41f3d3(0x380),_0x41f3d3(0x828),_0x41f3d3(0x3db),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x41f3d3(0x1b0),'',_0x41f3d3(0x340),'','SLEEP',_0x41f3d3(0x266),_0x41f3d3(0x46f),_0x41f3d3(0x487),_0x41f3d3(0x624),_0x41f3d3(0x758),_0x41f3d3(0x9b3),_0x41f3d3(0x456),_0x41f3d3(0x8e8),'NUMPAD8',_0x41f3d3(0x9ca),_0x41f3d3(0x3a8),_0x41f3d3(0x300),_0x41f3d3(0x56b),_0x41f3d3(0x2a0),_0x41f3d3(0x7af),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x41f3d3(0xa67),_0x41f3d3(0x5ba),_0x41f3d3(0x82a),_0x41f3d3(0x51b),'F15',_0x41f3d3(0x6de),'F17',_0x41f3d3(0x9fc),_0x41f3d3(0x21a),_0x41f3d3(0x66d),'F21',_0x41f3d3(0x2f0),'F23','F24','','','','','','','','',_0x41f3d3(0x205),_0x41f3d3(0x80e),_0x41f3d3(0x6f5),_0x41f3d3(0x322),_0x41f3d3(0x95a),'WIN_OEM_FJ_LOYA',_0x41f3d3(0x847),'','','','','','','','','',_0x41f3d3(0x80b),_0x41f3d3(0x1b6),_0x41f3d3(0xa4b),_0x41f3d3(0x27f),_0x41f3d3(0x1d6),'PERCENT',_0x41f3d3(0x3e5),_0x41f3d3(0x62b),_0x41f3d3(0x857),_0x41f3d3(0x246),_0x41f3d3(0x683),'PLUS',_0x41f3d3(0x672),_0x41f3d3(0x219),_0x41f3d3(0x1ad),'CLOSE_CURLY_BRACKET',_0x41f3d3(0x65f),'','','','',_0x41f3d3(0x416),'VOLUME_DOWN',_0x41f3d3(0x981),'','',_0x41f3d3(0x2a8),_0x41f3d3(0x380),_0x41f3d3(0x98d),_0x41f3d3(0x4cc),_0x41f3d3(0x374),_0x41f3d3(0x73e),_0x41f3d3(0x5dd),'','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x41f3d3(0x819),_0x41f3d3(0x76f),'QUOTE','',_0x41f3d3(0x21c),_0x41f3d3(0x83c),'',_0x41f3d3(0x8c9),_0x41f3d3(0x86a),'',_0x41f3d3(0x1b9),'','',_0x41f3d3(0x329),'WIN_OEM_JUMP',_0x41f3d3(0x31d),_0x41f3d3(0x702),'WIN_OEM_PA3',_0x41f3d3(0x56c),_0x41f3d3(0x40a),_0x41f3d3(0x425),_0x41f3d3(0x897),_0x41f3d3(0x1cf),'WIN_OEM_AUTO',_0x41f3d3(0x3f7),_0x41f3d3(0x7a3),_0x41f3d3(0x7ac),_0x41f3d3(0x911),'EXSEL',_0x41f3d3(0x690),_0x41f3d3(0x2af),'ZOOM','','PA1','WIN_OEM_CLEAR',''],TextManager[_0x41f3d3(0x96b)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)]['ButtonAssist'][_0x41f3d3(0x7ff)],TextManager[_0x41f3d3(0x939)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x478)][_0x41f3d3(0x234)],TextManager[_0x41f3d3(0x81c)]=VisuMZ[_0x41f3d3(0x5aa)]['Settings'][_0x41f3d3(0x478)][_0x41f3d3(0x24a)],VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x282)]=TextManager['param'],TextManager['param']=function(_0x1f441f){const _0x4b25d6=_0x41f3d3;return typeof _0x1f441f===_0x4b25d6(0x3fb)?VisuMZ[_0x4b25d6(0x5aa)][_0x4b25d6(0x282)][_0x4b25d6(0x809)](this,_0x1f441f):this[_0x4b25d6(0xa36)](_0x1f441f);},TextManager[_0x41f3d3(0xa36)]=function(_0x3ba097){const _0x487d18=_0x41f3d3;_0x3ba097=String(_0x3ba097||'')['toUpperCase']();const _0x5180ef=VisuMZ[_0x487d18(0x5aa)][_0x487d18(0x5b1)][_0x487d18(0x803)];if(_0x3ba097===_0x487d18(0x9f6))return $dataSystem['terms'][_0x487d18(0x8cb)][0x0];if(_0x3ba097==='MAXMP')return $dataSystem[_0x487d18(0x350)][_0x487d18(0x8cb)][0x1];if(_0x3ba097==='ATK')return $dataSystem[_0x487d18(0x350)][_0x487d18(0x8cb)][0x2];if(_0x3ba097===_0x487d18(0x5f0))return $dataSystem[_0x487d18(0x350)][_0x487d18(0x8cb)][0x3];if(_0x3ba097===_0x487d18(0x816))return $dataSystem[_0x487d18(0x350)]['params'][0x4];if(_0x3ba097==='MDF')return $dataSystem[_0x487d18(0x350)][_0x487d18(0x8cb)][0x5];if(_0x3ba097==='AGI')return $dataSystem[_0x487d18(0x350)]['params'][0x6];if(_0x3ba097==='LUK')return $dataSystem[_0x487d18(0x350)][_0x487d18(0x8cb)][0x7];if(_0x3ba097===_0x487d18(0xa33))return _0x5180ef[_0x487d18(0x76d)];if(_0x3ba097==='EVA')return _0x5180ef[_0x487d18(0x93e)];if(_0x3ba097===_0x487d18(0x878))return _0x5180ef[_0x487d18(0x3ee)];if(_0x3ba097===_0x487d18(0x1bf))return _0x5180ef[_0x487d18(0x3e4)];if(_0x3ba097===_0x487d18(0x577))return _0x5180ef[_0x487d18(0x626)];if(_0x3ba097===_0x487d18(0x1e9))return _0x5180ef[_0x487d18(0xa2d)];if(_0x3ba097==='CNT')return _0x5180ef[_0x487d18(0x794)];if(_0x3ba097===_0x487d18(0x3fe))return _0x5180ef[_0x487d18(0x978)];if(_0x3ba097===_0x487d18(0x8fa))return _0x5180ef[_0x487d18(0x3a9)];if(_0x3ba097===_0x487d18(0x19e))return _0x5180ef['XParamVocab9'];if(_0x3ba097===_0x487d18(0xa3a))return _0x5180ef[_0x487d18(0x3bf)];if(_0x3ba097===_0x487d18(0x8f2))return _0x5180ef['SParamVocab1'];if(_0x3ba097==='REC')return _0x5180ef[_0x487d18(0x34e)];if(_0x3ba097===_0x487d18(0x258))return _0x5180ef[_0x487d18(0x573)];if(_0x3ba097==='MCR')return _0x5180ef['SParamVocab4'];if(_0x3ba097==='TCR')return _0x5180ef[_0x487d18(0x1ab)];if(_0x3ba097===_0x487d18(0x34f))return _0x5180ef['SParamVocab6'];if(_0x3ba097==='MDR')return _0x5180ef[_0x487d18(0x7d2)];if(_0x3ba097===_0x487d18(0x192))return _0x5180ef['SParamVocab8'];if(_0x3ba097==='EXR')return _0x5180ef['SParamVocab9'];if(VisuMZ[_0x487d18(0x5aa)][_0x487d18(0x7b4)][_0x3ba097])return VisuMZ[_0x487d18(0x5aa)][_0x487d18(0x7b4)][_0x3ba097];return'';},TextManager['getInputButtonString']=function(_0x6e7bcb){const _0x2d9ba8=_0x41f3d3,_0x2f81d9=Input[_0x2d9ba8(0x615)]();return _0x2f81d9===_0x2d9ba8(0x5c8)?_0x2d9ba8(0x244)===_0x2d9ba8(0x244)?this[_0x2d9ba8(0x859)](_0x6e7bcb):_0x28dca9[_0x2d9ba8(0x5aa)][_0x2d9ba8(0x5b1)][_0x2d9ba8(0x2d1)][_0x2d9ba8(0x6ee)]?_0x5bdd2c[_0x2d9ba8(0x5aa)]['SceneManager_isGameActive'][_0x2d9ba8(0x809)](this):!![]:this[_0x2d9ba8(0x692)](_0x2f81d9,_0x6e7bcb);},TextManager[_0x41f3d3(0x859)]=function(_0x334d60){const _0x4edcf3=_0x41f3d3;if(_0x334d60==='cancel')_0x334d60=_0x4edcf3(0x2a6);if(_0x334d60===_0x4edcf3(0x966))_0x334d60=_0x4edcf3(0x2a6);let _0x5bfaf4=[];for(let _0x4245de in Input['keyMapper']){if('GmSQV'!==_0x4edcf3(0x4fb))return this[_0x4edcf3(0x3e6)]()[_0x4edcf3(0x32a)];else{_0x4245de=Number(_0x4245de);if(_0x4245de>=0x60&&_0x4245de<=0x69)continue;if([0x12,0x20][_0x4edcf3(0x85f)](_0x4245de))continue;_0x334d60===Input['keyMapper'][_0x4245de]&&_0x5bfaf4[_0x4edcf3(0x7df)](_0x4245de);}}for(let _0xbfbe0c=0x0;_0xbfbe0c<_0x5bfaf4[_0x4edcf3(0x9b7)];_0xbfbe0c++){if('TMSzA'!=='TMSzA')return _0x5d5a20[_0x4edcf3(0x935)]()-0x8;else _0x5bfaf4[_0xbfbe0c]=TextManager[_0x4edcf3(0x9d6)][_0x5bfaf4[_0xbfbe0c]];}return this[_0x4edcf3(0x1fe)](_0x5bfaf4);},TextManager[_0x41f3d3(0x1fe)]=function(_0x384a02){const _0xc6761d=_0x41f3d3,_0x1d98ba=VisuMZ[_0xc6761d(0x5aa)][_0xc6761d(0x5b1)][_0xc6761d(0x478)],_0x3be020=_0x1d98ba[_0xc6761d(0xa24)],_0x31431b=_0x384a02[_0xc6761d(0x194)](),_0x3edd8b='Key%1'[_0xc6761d(0x382)](_0x31431b);return _0x1d98ba[_0x3edd8b]?_0x1d98ba[_0x3edd8b]:_0x3be020[_0xc6761d(0x382)](_0x31431b);},TextManager['getInputMultiButtonStrings']=function(_0x3bf2b8,_0x426d9e){const _0x3f7d18=_0x41f3d3,_0x58cb4e=VisuMZ[_0x3f7d18(0x5aa)][_0x3f7d18(0x5b1)][_0x3f7d18(0x478)],_0x2a63f9=_0x58cb4e[_0x3f7d18(0x277)],_0x21b60=this[_0x3f7d18(0x359)](_0x3bf2b8),_0x334766=this[_0x3f7d18(0x359)](_0x426d9e);return _0x2a63f9[_0x3f7d18(0x382)](_0x21b60,_0x334766);},TextManager[_0x41f3d3(0x692)]=function(_0x57270e,_0x15ce0c){const _0x106067=_0x41f3d3,_0x29b791=_0x57270e[_0x106067(0x1b1)]()[_0x106067(0x30b)](),_0x2d44e9=VisuMZ[_0x106067(0x5aa)][_0x106067(0x386)][_0x29b791];if(!_0x2d44e9)return this['getControllerInputButtonMatch'](_0x57270e,_0x15ce0c);return _0x2d44e9[_0x15ce0c]||this[_0x106067(0x859)](_0x57270e,_0x15ce0c);},TextManager['getControllerInputButtonMatch']=function(_0x588e5e,_0x36d5ae){const _0x310466=_0x41f3d3,_0x32cdba=_0x588e5e[_0x310466(0x1b1)]()[_0x310466(0x30b)]();for(const _0x46bf8f in VisuMZ[_0x310466(0x5aa)]['ControllerMatches']){if(_0x32cdba['includes'](_0x46bf8f)){const _0x50d2fb=VisuMZ['CoreEngine'][_0x310466(0x818)][_0x46bf8f],_0x5e9a58=VisuMZ[_0x310466(0x5aa)][_0x310466(0x386)][_0x50d2fb];return _0x5e9a58[_0x36d5ae]||this['getKeyboardInputButtonString'](_0x36d5ae);}}return this[_0x310466(0x859)](_0x36d5ae);},VisuMZ[_0x41f3d3(0x5aa)]['ColorManager_loadWindowskin']=ColorManager['loadWindowskin'],ColorManager[_0x41f3d3(0x93a)]=function(){const _0x219da8=_0x41f3d3;VisuMZ[_0x219da8(0x5aa)][_0x219da8(0x51c)][_0x219da8(0x809)](this),this[_0x219da8(0x33c)]=this[_0x219da8(0x33c)]||{};},ColorManager[_0x41f3d3(0x512)]=function(_0x3af026,_0xc52ef2){const _0x519849=_0x41f3d3;_0xc52ef2=String(_0xc52ef2),this[_0x519849(0x33c)]=this[_0x519849(0x33c)]||{};if(_0xc52ef2['match'](/#(.*)/i)){if(_0x519849(0x83a)===_0x519849(0x2bc))return _0x3368b7[_0x519849(0x1fe)]([_0x519849(0x993)]);else this['_colorCache'][_0x3af026]='#%1'[_0x519849(0x382)](String(RegExp['$1']));}else _0x519849(0x3bb)!==_0x519849(0x8c2)?this[_0x519849(0x33c)][_0x3af026]=this[_0x519849(0x88e)](Number(_0xc52ef2)):this[_0x519849(0x7ed)]()?(this[_0x519849(0x34c)](),this[_0x519849(0x313)]()):_0x659a6e['CoreEngine'][_0x519849(0x909)][_0x519849(0x809)](this);return this[_0x519849(0x33c)][_0x3af026];},ColorManager[_0x41f3d3(0x4ee)]=function(_0x5b068a){const _0x5cb168=_0x41f3d3;return _0x5b068a=String(_0x5b068a),_0x5b068a[_0x5cb168(0x420)](/#(.*)/i)?_0x5cb168(0x88d)[_0x5cb168(0x382)](String(RegExp['$1'])):this[_0x5cb168(0x88e)](Number(_0x5b068a));},ColorManager[_0x41f3d3(0x46d)]=function(){const _0x249167=_0x41f3d3;this[_0x249167(0x33c)]={};},ColorManager[_0x41f3d3(0x700)]=function(){const _0x2d6f3b=_0x41f3d3,_0x39258a=_0x2d6f3b(0x3c4);this[_0x2d6f3b(0x33c)]=this[_0x2d6f3b(0x33c)]||{};if(this[_0x2d6f3b(0x33c)][_0x39258a])return this[_0x2d6f3b(0x33c)][_0x39258a];const _0x332bc4=VisuMZ[_0x2d6f3b(0x5aa)][_0x2d6f3b(0x5b1)]['Color']['ColorNormal'];return this[_0x2d6f3b(0x512)](_0x39258a,_0x332bc4);},ColorManager['systemColor']=function(){const _0x4ef878=_0x41f3d3,_0x1568a1=_0x4ef878(0x321);this[_0x4ef878(0x33c)]=this['_colorCache']||{};if(this[_0x4ef878(0x33c)][_0x1568a1])return this[_0x4ef878(0x33c)][_0x1568a1];const _0x590fbc=VisuMZ[_0x4ef878(0x5aa)][_0x4ef878(0x5b1)][_0x4ef878(0x546)][_0x4ef878(0x8ef)];return this['getColorDataFromPluginParameters'](_0x1568a1,_0x590fbc);},ColorManager['crisisColor']=function(){const _0x1e2b83=_0x41f3d3,_0x203550=_0x1e2b83(0x1e8);this[_0x1e2b83(0x33c)]=this[_0x1e2b83(0x33c)]||{};if(this['_colorCache'][_0x203550])return this[_0x1e2b83(0x33c)][_0x203550];const _0x290531=VisuMZ['CoreEngine'][_0x1e2b83(0x5b1)][_0x1e2b83(0x546)][_0x1e2b83(0x776)];return this[_0x1e2b83(0x512)](_0x203550,_0x290531);},ColorManager['deathColor']=function(){const _0xe8a4f6=_0x41f3d3,_0xdb9b5e=_0xe8a4f6(0x7a9);this[_0xe8a4f6(0x33c)]=this[_0xe8a4f6(0x33c)]||{};if(this[_0xe8a4f6(0x33c)][_0xdb9b5e])return this[_0xe8a4f6(0x33c)][_0xdb9b5e];const _0x26c569=VisuMZ[_0xe8a4f6(0x5aa)][_0xe8a4f6(0x5b1)][_0xe8a4f6(0x546)][_0xe8a4f6(0x965)];return this[_0xe8a4f6(0x512)](_0xdb9b5e,_0x26c569);},ColorManager[_0x41f3d3(0x34a)]=function(){const _0x500598=_0x41f3d3,_0x23a43b='_stored_gaugeBackColor';this[_0x500598(0x33c)]=this[_0x500598(0x33c)]||{};if(this[_0x500598(0x33c)][_0x23a43b])return this[_0x500598(0x33c)][_0x23a43b];const _0x397de7=VisuMZ[_0x500598(0x5aa)][_0x500598(0x5b1)][_0x500598(0x546)][_0x500598(0x491)];return this['getColorDataFromPluginParameters'](_0x23a43b,_0x397de7);},ColorManager[_0x41f3d3(0x474)]=function(){const _0x1eb89e=_0x41f3d3,_0x57b0ca='_stored_hpGaugeColor1';this[_0x1eb89e(0x33c)]=this[_0x1eb89e(0x33c)]||{};if(this[_0x1eb89e(0x33c)][_0x57b0ca])return this['_colorCache'][_0x57b0ca];const _0x49b807=VisuMZ[_0x1eb89e(0x5aa)][_0x1eb89e(0x5b1)][_0x1eb89e(0x546)][_0x1eb89e(0x653)];return this[_0x1eb89e(0x512)](_0x57b0ca,_0x49b807);},ColorManager[_0x41f3d3(0x1f3)]=function(){const _0x2af7f0=_0x41f3d3,_0x3750ce=_0x2af7f0(0x2a5);this[_0x2af7f0(0x33c)]=this[_0x2af7f0(0x33c)]||{};if(this['_colorCache'][_0x3750ce])return this[_0x2af7f0(0x33c)][_0x3750ce];const _0x95769=VisuMZ[_0x2af7f0(0x5aa)][_0x2af7f0(0x5b1)][_0x2af7f0(0x546)][_0x2af7f0(0x881)];return this[_0x2af7f0(0x512)](_0x3750ce,_0x95769);},ColorManager['mpGaugeColor1']=function(){const _0x3c5e29=_0x41f3d3,_0x267f46=_0x3c5e29(0x9cd);this[_0x3c5e29(0x33c)]=this['_colorCache']||{};if(this[_0x3c5e29(0x33c)][_0x267f46])return this[_0x3c5e29(0x33c)][_0x267f46];const _0x325a4d=VisuMZ[_0x3c5e29(0x5aa)][_0x3c5e29(0x5b1)][_0x3c5e29(0x546)][_0x3c5e29(0x74e)];return this['getColorDataFromPluginParameters'](_0x267f46,_0x325a4d);},ColorManager[_0x41f3d3(0x8bd)]=function(){const _0x4c99c4=_0x41f3d3,_0x59a9d4='_stored_mpGaugeColor2';this[_0x4c99c4(0x33c)]=this[_0x4c99c4(0x33c)]||{};if(this[_0x4c99c4(0x33c)][_0x59a9d4])return this[_0x4c99c4(0x33c)][_0x59a9d4];const _0x3f7618=VisuMZ[_0x4c99c4(0x5aa)][_0x4c99c4(0x5b1)][_0x4c99c4(0x546)][_0x4c99c4(0xa4e)];return this[_0x4c99c4(0x512)](_0x59a9d4,_0x3f7618);},ColorManager[_0x41f3d3(0x332)]=function(){const _0x1d9582=_0x41f3d3,_0xe2e0e2='_stored_mpCostColor';this[_0x1d9582(0x33c)]=this[_0x1d9582(0x33c)]||{};if(this[_0x1d9582(0x33c)][_0xe2e0e2])return this['_colorCache'][_0xe2e0e2];const _0x2ce9b2=VisuMZ[_0x1d9582(0x5aa)][_0x1d9582(0x5b1)][_0x1d9582(0x546)][_0x1d9582(0x879)];return this[_0x1d9582(0x512)](_0xe2e0e2,_0x2ce9b2);},ColorManager[_0x41f3d3(0xa0f)]=function(){const _0xcc4fd0=_0x41f3d3,_0x21a571=_0xcc4fd0(0x551);this[_0xcc4fd0(0x33c)]=this[_0xcc4fd0(0x33c)]||{};if(this[_0xcc4fd0(0x33c)][_0x21a571])return this[_0xcc4fd0(0x33c)][_0x21a571];const _0x58cd18=VisuMZ['CoreEngine'][_0xcc4fd0(0x5b1)]['Color'][_0xcc4fd0(0x658)];return this[_0xcc4fd0(0x512)](_0x21a571,_0x58cd18);},ColorManager[_0x41f3d3(0x21f)]=function(){const _0x597293=_0x41f3d3,_0x2db748=_0x597293(0x8e2);this['_colorCache']=this[_0x597293(0x33c)]||{};if(this[_0x597293(0x33c)][_0x2db748])return this[_0x597293(0x33c)][_0x2db748];const _0x4848a0=VisuMZ['CoreEngine']['Settings'][_0x597293(0x546)]['ColorPowerDown'];return this['getColorDataFromPluginParameters'](_0x2db748,_0x4848a0);},ColorManager[_0x41f3d3(0x281)]=function(){const _0x5a3723=_0x41f3d3,_0x1dc6a1=_0x5a3723(0x4cf);this[_0x5a3723(0x33c)]=this[_0x5a3723(0x33c)]||{};if(this[_0x5a3723(0x33c)][_0x1dc6a1])return this[_0x5a3723(0x33c)][_0x1dc6a1];const _0x247b21=VisuMZ[_0x5a3723(0x5aa)][_0x5a3723(0x5b1)][_0x5a3723(0x546)][_0x5a3723(0x1eb)];return this['getColorDataFromPluginParameters'](_0x1dc6a1,_0x247b21);},ColorManager['ctGaugeColor2']=function(){const _0x9ea7bc=_0x41f3d3,_0x47b8d9=_0x9ea7bc(0x89c);this[_0x9ea7bc(0x33c)]=this[_0x9ea7bc(0x33c)]||{};if(this[_0x9ea7bc(0x33c)][_0x47b8d9])return this[_0x9ea7bc(0x33c)][_0x47b8d9];const _0x5087c2=VisuMZ['CoreEngine'][_0x9ea7bc(0x5b1)][_0x9ea7bc(0x546)][_0x9ea7bc(0x2e2)];return this['getColorDataFromPluginParameters'](_0x47b8d9,_0x5087c2);},ColorManager[_0x41f3d3(0x9a2)]=function(){const _0x2471a6=_0x41f3d3,_0x40e05c=_0x2471a6(0x696);this[_0x2471a6(0x33c)]=this[_0x2471a6(0x33c)]||{};if(this[_0x2471a6(0x33c)][_0x40e05c])return this['_colorCache'][_0x40e05c];const _0x1f77b0=VisuMZ[_0x2471a6(0x5aa)][_0x2471a6(0x5b1)]['Color'][_0x2471a6(0x952)];return this['getColorDataFromPluginParameters'](_0x40e05c,_0x1f77b0);},ColorManager[_0x41f3d3(0x888)]=function(){const _0x55138b=_0x41f3d3,_0x399cf4='_stored_tpGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x55138b(0x33c)][_0x399cf4])return this[_0x55138b(0x33c)][_0x399cf4];const _0x5828e5=VisuMZ[_0x55138b(0x5aa)][_0x55138b(0x5b1)][_0x55138b(0x546)][_0x55138b(0xa40)];return this[_0x55138b(0x512)](_0x399cf4,_0x5828e5);},ColorManager[_0x41f3d3(0x1c7)]=function(){const _0x3df66b=_0x41f3d3,_0x140929=_0x3df66b(0x7b0);this['_colorCache']=this[_0x3df66b(0x33c)]||{};if(this['_colorCache'][_0x140929])return this['_colorCache'][_0x140929];const _0x118064=VisuMZ['CoreEngine'][_0x3df66b(0x5b1)]['Color'][_0x3df66b(0x4b9)];return this[_0x3df66b(0x512)](_0x140929,_0x118064);},ColorManager['pendingColor']=function(){const _0x176e2a=_0x41f3d3,_0x2eb25e='_stored_pendingColor';this[_0x176e2a(0x33c)]=this[_0x176e2a(0x33c)]||{};if(this[_0x176e2a(0x33c)][_0x2eb25e])return this[_0x176e2a(0x33c)][_0x2eb25e];const _0x3ebfb3=VisuMZ['CoreEngine'][_0x176e2a(0x5b1)][_0x176e2a(0x546)][_0x176e2a(0x4b9)];return this[_0x176e2a(0x512)](_0x2eb25e,_0x3ebfb3);},ColorManager['expGaugeColor1']=function(){const _0x17f995=_0x41f3d3,_0xc77a4f=_0x17f995(0x64b);this[_0x17f995(0x33c)]=this[_0x17f995(0x33c)]||{};if(this[_0x17f995(0x33c)][_0xc77a4f])return this[_0x17f995(0x33c)][_0xc77a4f];const _0x32d3a0=VisuMZ[_0x17f995(0x5aa)][_0x17f995(0x5b1)][_0x17f995(0x546)][_0x17f995(0x62a)];return this[_0x17f995(0x512)](_0xc77a4f,_0x32d3a0);},ColorManager['expGaugeColor2']=function(){const _0x2cb04f=_0x41f3d3,_0x1b88cb=_0x2cb04f(0x485);this[_0x2cb04f(0x33c)]=this[_0x2cb04f(0x33c)]||{};if(this[_0x2cb04f(0x33c)][_0x1b88cb])return this[_0x2cb04f(0x33c)][_0x1b88cb];const _0x185445=VisuMZ[_0x2cb04f(0x5aa)]['Settings'][_0x2cb04f(0x546)]['ColorExpGauge2'];return this[_0x2cb04f(0x512)](_0x1b88cb,_0x185445);},ColorManager[_0x41f3d3(0x7b1)]=function(){const _0x5f4ed5=_0x41f3d3,_0x442179=_0x5f4ed5(0x290);this[_0x5f4ed5(0x33c)]=this[_0x5f4ed5(0x33c)]||{};if(this[_0x5f4ed5(0x33c)][_0x442179])return this[_0x5f4ed5(0x33c)][_0x442179];const _0x3f2902=VisuMZ[_0x5f4ed5(0x5aa)]['Settings'][_0x5f4ed5(0x546)][_0x5f4ed5(0x398)];return this[_0x5f4ed5(0x512)](_0x442179,_0x3f2902);},ColorManager[_0x41f3d3(0x663)]=function(){const _0x3e2a9d=_0x41f3d3,_0x551c37=_0x3e2a9d(0x583);this[_0x3e2a9d(0x33c)]=this[_0x3e2a9d(0x33c)]||{};if(this[_0x3e2a9d(0x33c)][_0x551c37])return this[_0x3e2a9d(0x33c)][_0x551c37];const _0x5250d7=VisuMZ['CoreEngine']['Settings']['Color'][_0x3e2a9d(0x43d)];return this[_0x3e2a9d(0x512)](_0x551c37,_0x5250d7);},ColorManager[_0x41f3d3(0x7c2)]=function(_0x53218b){const _0xa78b93=_0x41f3d3;return VisuMZ[_0xa78b93(0x5aa)][_0xa78b93(0x5b1)][_0xa78b93(0x546)]['ActorHPColor'][_0xa78b93(0x809)](this,_0x53218b);},ColorManager[_0x41f3d3(0x9a7)]=function(_0x4d1d65){const _0x4050b4=_0x41f3d3;return VisuMZ[_0x4050b4(0x5aa)][_0x4050b4(0x5b1)][_0x4050b4(0x546)][_0x4050b4(0x26c)][_0x4050b4(0x809)](this,_0x4d1d65);},ColorManager[_0x41f3d3(0x55d)]=function(_0x1e118d){const _0x3a953a=_0x41f3d3;return VisuMZ['CoreEngine'][_0x3a953a(0x5b1)]['Color']['ActorTPColor'][_0x3a953a(0x809)](this,_0x1e118d);},ColorManager[_0x41f3d3(0x652)]=function(_0x5c249f){const _0x170dbf=_0x41f3d3;return VisuMZ[_0x170dbf(0x5aa)][_0x170dbf(0x5b1)]['Color'][_0x170dbf(0x4c1)][_0x170dbf(0x809)](this,_0x5c249f);},ColorManager[_0x41f3d3(0x936)]=function(_0x3a91ef){const _0x359510=_0x41f3d3;return VisuMZ[_0x359510(0x5aa)]['Settings'][_0x359510(0x546)]['DamageColor'][_0x359510(0x809)](this,_0x3a91ef);},ColorManager[_0x41f3d3(0x838)]=function(){const _0x832273=_0x41f3d3;return VisuMZ[_0x832273(0x5aa)][_0x832273(0x5b1)][_0x832273(0x546)]['OutlineColor'];},ColorManager[_0x41f3d3(0x938)]=function(){const _0x3504fe=_0x41f3d3;return VisuMZ[_0x3504fe(0x5aa)][_0x3504fe(0x5b1)][_0x3504fe(0x546)][_0x3504fe(0x39b)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x41f3d3(0x58a)]=function(){const _0x54cc6b=_0x41f3d3;return VisuMZ[_0x54cc6b(0x5aa)]['Settings'][_0x54cc6b(0x546)][_0x54cc6b(0x470)]||_0x54cc6b(0x735);},ColorManager[_0x41f3d3(0x527)]=function(){const _0x3c792b=_0x41f3d3;return VisuMZ[_0x3c792b(0x5aa)]['Settings'][_0x3c792b(0x546)][_0x3c792b(0x24e)];},ColorManager[_0x41f3d3(0x8bc)]=function(){const _0x1529e5=_0x41f3d3;return VisuMZ[_0x1529e5(0x5aa)][_0x1529e5(0x5b1)][_0x1529e5(0x546)]['DimColor2'];},ColorManager[_0x41f3d3(0x6cf)]=function(){const _0x1c35d6=_0x41f3d3;return VisuMZ[_0x1c35d6(0x5aa)][_0x1c35d6(0x5b1)]['Color'][_0x1c35d6(0x59c)];},ColorManager[_0x41f3d3(0xa44)]=function(){const _0x4a0b23=_0x41f3d3;return VisuMZ['CoreEngine'][_0x4a0b23(0x5b1)][_0x4a0b23(0x546)][_0x4a0b23(0x7f0)];},SceneManager[_0x41f3d3(0x228)]=[],SceneManager[_0x41f3d3(0x19b)]=function(){const _0x262495=_0x41f3d3;return this[_0x262495(0x2b5)]&&this[_0x262495(0x2b5)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0xbeb8f0=_0x41f3d3;return this['_scene']&&this[_0xbeb8f0(0x2b5)][_0xbeb8f0(0x9a5)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x584b49=_0x41f3d3;return this['_scene']&&this[_0x584b49(0x2b5)]instanceof Scene_Map;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x309)]=SceneManager['initialize'],SceneManager[_0x41f3d3(0x927)]=function(){const _0x3e95ef=_0x41f3d3;VisuMZ['CoreEngine'][_0x3e95ef(0x309)][_0x3e95ef(0x809)](this),this[_0x3e95ef(0x738)]();},VisuMZ['CoreEngine'][_0x41f3d3(0x3b9)]=SceneManager[_0x41f3d3(0x69e)],SceneManager[_0x41f3d3(0x69e)]=function(_0x3b44e1){const _0x24f363=_0x41f3d3;if($gameTemp)this[_0x24f363(0x1ff)](_0x3b44e1);VisuMZ[_0x24f363(0x5aa)][_0x24f363(0x3b9)][_0x24f363(0x809)](this,_0x3b44e1);},SceneManager[_0x41f3d3(0x1ff)]=function(_0x2b02fa){const _0x194952=_0x41f3d3;if(!_0x2b02fa['ctrlKey']&&!_0x2b02fa[_0x194952(0x93d)])switch(_0x2b02fa[_0x194952(0x7ea)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x194952(0x30c)]();break;case 0x76:if(Input[_0x194952(0x38f)](_0x194952(0x21e))||Input['isPressed'](_0x194952(0x47e)))return;this[_0x194952(0x607)]();break;}},SceneManager[_0x41f3d3(0x30c)]=function(){const _0x8f65d8=_0x41f3d3;if($gameTemp[_0x8f65d8(0x67d)]()&&VisuMZ[_0x8f65d8(0x5aa)][_0x8f65d8(0x5b1)][_0x8f65d8(0x2d1)][_0x8f65d8(0x92f)]){ConfigManager[_0x8f65d8(0x86b)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x8f65d8(0x7ce)]=0x0,ConfigManager[_0x8f65d8(0x2fa)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager[_0x8f65d8(0x8c1)]=0x64,ConfigManager[_0x8f65d8(0x7ce)]=0x64,ConfigManager[_0x8f65d8(0x2fa)]=0x64,ConfigManager[_0x8f65d8(0x86b)]=0x64);ConfigManager[_0x8f65d8(0x436)]();if(this['_scene']['constructor']===Scene_Options){if(this['_scene'][_0x8f65d8(0x7d8)])this[_0x8f65d8(0x2b5)][_0x8f65d8(0x7d8)][_0x8f65d8(0x3b5)]();if(this['_scene'][_0x8f65d8(0x204)])this[_0x8f65d8(0x2b5)][_0x8f65d8(0x204)][_0x8f65d8(0x3b5)]();}}},SceneManager[_0x41f3d3(0x607)]=function(){const _0x5a0ce6=_0x41f3d3;$gameTemp[_0x5a0ce6(0x67d)]()&&VisuMZ[_0x5a0ce6(0x5aa)][_0x5a0ce6(0x5b1)]['QoL'][_0x5a0ce6(0x3a5)]&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager['playTestCtrlT']=function(){const _0x591196=_0x41f3d3;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x591196(0x19b)]())return;for(const _0x28b80c of $gameParty['members']()){if(_0x591196(0x5e5)!==_0x591196(0x5e5))_0x29db88(_0x2c2afb);else{if(!_0x28b80c)continue;_0x28b80c[_0x591196(0x45b)](_0x28b80c[_0x591196(0x9cf)]());}}},SceneManager['initVisuMZCoreEngine']=function(){const _0x1c2e5a=_0x41f3d3;this['_sideButtonLayout']=![],this['_hideButtons']=!VisuMZ[_0x1c2e5a(0x5aa)][_0x1c2e5a(0x5b1)]['UI']['ShowButtons'];},SceneManager[_0x41f3d3(0x840)]=function(_0xac2fc5){const _0x11ed9e=_0x41f3d3;VisuMZ['CoreEngine'][_0x11ed9e(0x5b1)]['UI']['SideButtons']&&(this[_0x11ed9e(0x967)]=_0xac2fc5);},SceneManager[_0x41f3d3(0x948)]=function(){const _0x44319b=_0x41f3d3;return this[_0x44319b(0x967)];},SceneManager[_0x41f3d3(0x2c1)]=function(){const _0x156171=_0x41f3d3;return this[_0x156171(0x2fe)];},SceneManager[_0x41f3d3(0x8d9)]=function(){const _0x4d5901=_0x41f3d3;return this[_0x4d5901(0x2c1)]()||this[_0x4d5901(0x948)]();},VisuMZ[_0x41f3d3(0x5aa)]['SceneManager_isGameActive']=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x31c440=_0x41f3d3;return VisuMZ[_0x31c440(0x5aa)][_0x31c440(0x5b1)][_0x31c440(0x2d1)][_0x31c440(0x6ee)]?_0x31c440(0x8d5)!==_0x31c440(0x90c)?VisuMZ[_0x31c440(0x5aa)][_0x31c440(0x37a)]['call'](this):_0x48e1a3[_0x31c440(0x54b)]||'Manual':!![];},SceneManager[_0x41f3d3(0x661)]=function(_0x5afed3){const _0xb6d2c2=_0x41f3d3;if(_0x5afed3 instanceof Error)this[_0xb6d2c2(0x442)](_0x5afed3);else _0x5afed3 instanceof Array&&_0x5afed3[0x0]===_0xb6d2c2(0x999)?this[_0xb6d2c2(0x19c)](_0x5afed3):this['catchUnknownError'](_0x5afed3);this[_0xb6d2c2(0x920)]();},VisuMZ['CoreEngine'][_0x41f3d3(0x4ed)]=BattleManager[_0x41f3d3(0x7db)],BattleManager[_0x41f3d3(0x7db)]=function(){const _0x1b5f58=_0x41f3d3;return VisuMZ[_0x1b5f58(0x5aa)][_0x1b5f58(0x5b1)]['QoL']['EscapeAlways']?this[_0x1b5f58(0x35c)]():VisuMZ[_0x1b5f58(0x5aa)]['BattleManager_processEscape'][_0x1b5f58(0x809)](this);},BattleManager[_0x41f3d3(0x35c)]=function(){const _0x224f6f=_0x41f3d3;return $gameParty[_0x224f6f(0x5b7)](),SoundManager[_0x224f6f(0x37c)](),this[_0x224f6f(0x454)](),!![];},BattleManager[_0x41f3d3(0x331)]=function(){const _0x534433=_0x41f3d3;return $gameSystem[_0x534433(0x4e9)]()>=0x1;},BattleManager[_0x41f3d3(0x8cc)]=function(){const _0x1e5d5c=_0x41f3d3;return $gameSystem[_0x1e5d5c(0x4e9)]()===0x1;},VisuMZ['CoreEngine'][_0x41f3d3(0x42a)]=Game_Temp[_0x41f3d3(0x1fd)]['initialize'],Game_Temp['prototype'][_0x41f3d3(0x927)]=function(){const _0x2f5311=_0x41f3d3;VisuMZ[_0x2f5311(0x5aa)]['Game_Temp_initialize'][_0x2f5311(0x809)](this),this[_0x2f5311(0x805)](),this['createFauxAnimationQueue'](),this[_0x2f5311(0x9eb)]();},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x805)]=function(){const _0x52b1a1=_0x41f3d3;VisuMZ[_0x52b1a1(0x5aa)][_0x52b1a1(0x5b1)][_0x52b1a1(0x2d1)][_0x52b1a1(0x2c7)]&&(this[_0x52b1a1(0x74d)]=![]);},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x1da)]=function(_0x3a9a83){const _0x19b6ef=_0x41f3d3;this[_0x19b6ef(0x291)]=_0x3a9a83;},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x969)]=function(){const _0x573b5d=_0x41f3d3;return this[_0x573b5d(0x291)];},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x28e)]=function(){const _0xc7bc23=_0x41f3d3;this[_0xc7bc23(0x866)]=undefined,this[_0xc7bc23(0x98c)]=undefined;},Game_Temp['prototype'][_0x41f3d3(0x445)]=function(_0x2cc0a2){const _0x2d417a=_0x41f3d3;$gameMap&&$dataMap&&$dataMap[_0x2d417a(0x212)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x2d417a(0x212)]);const _0x1afce9=$dataTroops[_0x2cc0a2];if(_0x1afce9){if(_0x2d417a(0x2f8)!=='YThaz'){let _0x4623ae=DataManager[_0x2d417a(0x438)](_0x1afce9['id']);this[_0x2d417a(0x7d6)](_0x4623ae);}else return _0x2385fc[_0x2d417a(0x5aa)][_0x2d417a(0x5b1)][_0x2d417a(0x1c6)][_0x2d417a(0x824)];}},Game_Temp[_0x41f3d3(0x1fd)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x1084b5){const _0x3c11b1=_0x41f3d3;if(!_0x1084b5)return;if(_0x1084b5[_0x3c11b1(0x420)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0x3c11b1(0x8ec)!==_0x3c11b1(0x8ec)?this[_0x3c11b1(0x9e9)][_0x3c11b1(0x5d8)]+=0x6:this['_forcedTroopView']='FV';else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))_0x3c11b1(0x96c)===_0x3c11b1(0x6bb)?(_0x5d1b4c[_0x3c11b1(0x5aa)][_0x3c11b1(0x4fa)][_0x3c11b1(0x809)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x3c11b1(0x806)]()):this[_0x3c11b1(0x866)]='SV';else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x584178=String(RegExp['$1']);if(_0x584178[_0x3c11b1(0x420)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x3c11b1(0x866)]='FV';else _0x584178[_0x3c11b1(0x420)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x3c11b1(0x866)]='SV');}}}if(_0x1084b5['match'](/<(?:DTB)>/i))this[_0x3c11b1(0x98c)]=0x0;else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x3c11b1(0x7ab)!==_0x3c11b1(0x7f9))this[_0x3c11b1(0x98c)]=0x1;else{if(!this[_0x3c11b1(0x9b1)]())return;if(this['_scrollBarHorz']||this[_0x3c11b1(0x43e)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x3c11b1(0x8ab)]=new _0x898448(),this[_0x3c11b1(0x43e)]=new _0xd8414c(),this[_0x3c11b1(0x65e)](this[_0x3c11b1(0x8ab)]),this[_0x3c11b1(0x65e)](this[_0x3c11b1(0x43e)]);}}else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:TPB|ATB)[ ]WAIT>/i))_0x3c11b1(0x363)!=='eQjCr'?this[_0x3c11b1(0x98c)]=0x2:this[_0x3c11b1(0x421)](-0x1);else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:CTB)>/i))Imported[_0x3c11b1(0x390)]&&(_0x3c11b1(0x543)!=='fKUGw'?this[_0x3c11b1(0x98c)]=_0x3c11b1(0x65a):this['_coreEasingType']=_0x4abef1);else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:STB)>/i))Imported[_0x3c11b1(0x367)]&&(this[_0x3c11b1(0x98c)]=_0x3c11b1(0x264));else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:BTB)>/i))_0x3c11b1(0x3cd)===_0x3c11b1(0x9a3)?this[_0x3c11b1(0x98c)]='STB':Imported[_0x3c11b1(0x726)]&&(this[_0x3c11b1(0x98c)]='BTB');else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:FTB)>/i))'kVfWi'!==_0x3c11b1(0x552)?Imported[_0x3c11b1(0x6be)]&&(_0x3c11b1(0x9ea)===_0x3c11b1(0x40c)?_0x454285-=_0x5a5fda[_0x3c11b1(0x1fd)][_0x3c11b1(0x3c0)]():this[_0x3c11b1(0x98c)]=_0x3c11b1(0x822)):(_0x2b437b['CoreEngine'][_0x3c11b1(0x5ac)][_0x3c11b1(0x809)](this),this['initCoreEngineScreenShake']());else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:OTB)>/i))_0x3c11b1(0x53a)!==_0x3c11b1(0x53a)?this[_0x3c11b1(0x765)]=![]:Imported[_0x3c11b1(0x589)]&&(this[_0x3c11b1(0x98c)]=_0x3c11b1(0x32b));else{if(_0x1084b5['match'](/<(?:ETB)>/i))Imported[_0x3c11b1(0x345)]&&(this[_0x3c11b1(0x98c)]='ETB');else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:PTB)>/i)){if(Imported[_0x3c11b1(0x591)]){if(_0x3c11b1(0x875)!==_0x3c11b1(0x499))this['_forcedBattleSys']=_0x3c11b1(0x61c);else return _0x213a47&&this[_0x3c11b1(0x63e)]?this['_actor'][_0x3c11b1(0x9de)](_0xab58cf):_0x3bd7c2[_0x3c11b1(0x5aa)][_0x3c11b1(0x73b)][_0x3c11b1(0x809)](this,_0x58d60e);}}else{if(_0x1084b5[_0x3c11b1(0x420)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x3c11b1(0x55a)!==_0x3c11b1(0x55a))return this['xScrollLinkedOffset']();else{const _0x19b359=String(RegExp['$1']);if(_0x19b359[_0x3c11b1(0x420)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x19b359['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x3c11b1(0x98c)]=0x1;else{if(_0x19b359[_0x3c11b1(0x420)](/(?:TPB|ATB)[ ]WAIT/i))_0x3c11b1(0x3be)===_0x3c11b1(0x3be)?this[_0x3c11b1(0x98c)]=0x2:_0xae600e[_0x3c11b1(0x5aa)][_0x3c11b1(0x5b1)]['QoL'][_0x3c11b1(0x2c4)]?this['_drawTextShadow'](_0x1b3f51,_0x1f2c88,_0x469366,_0x3ddc15):_0x4929fc['CoreEngine'][_0x3c11b1(0x396)][_0x3c11b1(0x809)](this,_0x387ced,_0x3fbde1,_0x20d2a7,_0x31899c);else{if(_0x19b359[_0x3c11b1(0x420)](/CTB/i))_0x3c11b1(0x872)!==_0x3c11b1(0x872)?_0x5a7f41*=_0x32ce96(_0x1ee6b3):Imported[_0x3c11b1(0x390)]&&(this[_0x3c11b1(0x98c)]='CTB');else{if(_0x19b359[_0x3c11b1(0x420)](/STB/i)){if(_0x3c11b1(0x82f)!==_0x3c11b1(0x829))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x3c11b1(0x98c)]=_0x3c11b1(0x264));else return this['_scene']&&this[_0x3c11b1(0x2b5)]['constructor']===_0x5104ed;}else{if(_0x19b359[_0x3c11b1(0x420)](/BTB/i))Imported[_0x3c11b1(0x726)]&&(this[_0x3c11b1(0x98c)]=_0x3c11b1(0x885));else{if(_0x19b359[_0x3c11b1(0x420)](/FTB/i)){if('pfCxh'===_0x3c11b1(0x89a))Imported[_0x3c11b1(0x6be)]&&(this['_forcedBattleSys']='FTB');else{if(!this[_0x3c11b1(0x910)]())return![];else{const _0x4320b2=_0x51417d[_0x3c11b1(0x235)](_0x1ecf86,_0x7ef5b9)['filter'](_0x260053=>_0x260053[_0x3c11b1(0x910)]());return _0x4320b2[_0x3c11b1(0x9b7)]>0x0;}}}else{if(_0x19b359['match'](/OTB/i))_0x3c11b1(0x504)!==_0x3c11b1(0x51d)?Imported[_0x3c11b1(0x589)]&&(this[_0x3c11b1(0x98c)]=_0x3c11b1(0x32b)):(_0x59fc70[_0x3c11b1(0x1fd)][_0x3c11b1(0x314)][_0x3c11b1(0x809)](this),this[_0x3c11b1(0x1e2)](),this[_0x3c11b1(0x4f6)]());else{if(_0x19b359[_0x3c11b1(0x420)](/ETB/i))Imported[_0x3c11b1(0x345)]&&(this[_0x3c11b1(0x98c)]=_0x3c11b1(0x5fd));else _0x19b359['match'](/PTB/i)&&(_0x3c11b1(0x9bb)===_0x3c11b1(0x8e3)?(this[_0x3c11b1(0x6a6)](),_0x5a5aaa['updateEffekseer']()):Imported[_0x3c11b1(0x591)]&&(this['_forcedBattleSys']=_0x3c11b1(0x61c)));}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x336)]=function(){const _0xd9a96e=_0x41f3d3;this[_0xd9a96e(0x8b7)]=[];},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x7cf)]=function(_0x48d358,_0x3bc87d,_0x43ba61,_0x412e63){const _0x4f89a3=_0x41f3d3;if(!this['showFauxAnimations']())return;_0x43ba61=_0x43ba61||![],_0x412e63=_0x412e63||![];if($dataAnimations[_0x3bc87d]){const _0xc62027={'targets':_0x48d358,'animationId':_0x3bc87d,'mirror':_0x43ba61,'mute':_0x412e63};this[_0x4f89a3(0x8b7)][_0x4f89a3(0x7df)](_0xc62027);for(const _0x1d8262 of _0x48d358){if(_0x4f89a3(0x2db)!==_0x4f89a3(0x8dd))_0x1d8262[_0x4f89a3(0x299)]&&_0x1d8262[_0x4f89a3(0x299)]();else{const _0x3d3d62=_0x3d4437[_0x4f89a3(0x1b1)]()[_0x4f89a3(0x30b)](),_0x24d6c4=_0xff4108[_0x4f89a3(0x5aa)][_0x4f89a3(0x386)][_0x3d3d62];if(!_0x24d6c4)return this[_0x4f89a3(0x4fc)](_0x128e7d,_0x221c25);return _0x24d6c4[_0x392057]||this[_0x4f89a3(0x859)](_0xcea443,_0x4913eb);}}}},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x79a)]=function(){return!![];},Game_Temp['prototype'][_0x41f3d3(0x9f9)]=function(){const _0x1d3f8d=_0x41f3d3;return this[_0x1d3f8d(0x8b7)][_0x1d3f8d(0x21e)]();},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x9eb)]=function(){this['_pointAnimationQueue']=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0x3fc61a,_0x2d7fbb,_0x524d02,_0x57b541,_0x136131){const _0x2f6fce=_0x41f3d3;if(!this[_0x2f6fce(0x292)]())return;_0x57b541=_0x57b541||![],_0x136131=_0x136131||![];if($dataAnimations[_0x524d02]){const _0x1e4ae3={'x':_0x3fc61a,'y':_0x2d7fbb,'animationId':_0x524d02,'mirror':_0x57b541,'mute':_0x136131};this[_0x2f6fce(0x263)][_0x2f6fce(0x7df)](_0x1e4ae3);}},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x292)]=function(){return!![];},Game_Temp['prototype'][_0x41f3d3(0x1f6)]=function(){const _0x5550a9=_0x41f3d3;return this[_0x5550a9(0x263)][_0x5550a9(0x21e)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x85c)]=Game_System['prototype'][_0x41f3d3(0x927)],Game_System[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)]=function(){const _0x4448ea=_0x41f3d3;VisuMZ[_0x4448ea(0x5aa)][_0x4448ea(0x85c)]['call'](this),this['initCoreEngine']();},Game_System[_0x41f3d3(0x1fd)][_0x41f3d3(0x9e7)]=function(){const _0x39a656=_0x41f3d3;this[_0x39a656(0x33b)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x39a656(0x2dc)](),'FontSize':$dataSystem[_0x39a656(0x254)][_0x39a656(0x5d8)],'Padding':0xc};},Game_System['prototype']['isSideView']=function(){const _0x5514ad=_0x41f3d3;if($gameTemp[_0x5514ad(0x866)]==='SV'){if(_0x5514ad(0x9dc)===_0x5514ad(0x76e)){let _0x47ee1b=0x0;return _0x5c9238[_0x5514ad(0x8d9)]()?_0x47ee1b=this['mainAreaHeightSideButtonLayout']():_0x47ee1b=_0x43df3a['CoreEngine'][_0x5514ad(0xa15)][_0x5514ad(0x809)](this),this[_0x5514ad(0x6dc)]()&&this[_0x5514ad(0x587)]()!==_0x5514ad(0x73f)&&(_0x47ee1b-=_0x466d7a[_0x5514ad(0x1fd)]['lineHeight']()),_0x47ee1b;}else return!![];}else{if($gameTemp[_0x5514ad(0x866)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x5514ad(0x9e7)]();if(this[_0x5514ad(0x33b)][_0x5514ad(0x70d)]===undefined)this[_0x5514ad(0x9e7)]();return this[_0x5514ad(0x33b)][_0x5514ad(0x70d)];},Game_System['prototype'][_0x41f3d3(0x91f)]=function(_0x1be039){const _0xcae910=_0x41f3d3;if(this['_CoreEngineSettings']===undefined)this[_0xcae910(0x9e7)]();if(this[_0xcae910(0x33b)][_0xcae910(0x70d)]===undefined)this[_0xcae910(0x9e7)]();this['_CoreEngineSettings'][_0xcae910(0x70d)]=_0x1be039;},Game_System[_0x41f3d3(0x1fd)][_0x41f3d3(0x45c)]=function(){const _0x24f89a=_0x41f3d3;if(this[_0x24f89a(0x33b)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x24f89a(0x3d9)]=this[_0x24f89a(0x2dc)]();},Game_System[_0x41f3d3(0x1fd)][_0x41f3d3(0x2dc)]=function(){const _0x178112=_0x41f3d3,_0x1d8482=(VisuMZ[_0x178112(0x5aa)][_0x178112(0x5b1)][_0x178112(0x3d9)]||'DATABASE')[_0x178112(0x97e)]()['trim']();return VisuMZ[_0x178112(0x5aa)]['CreateBattleSystemID'](_0x1d8482);},Game_System[_0x41f3d3(0x1fd)][_0x41f3d3(0x4e9)]=function(){const _0x217956=_0x41f3d3;if($gameTemp[_0x217956(0x98c)]!==undefined){if('xzNvM'!==_0x217956(0x903))return $gameTemp['_forcedBattleSys'];else this[_0x217956(0x7b3)]()?this['drawGoldItemStyle']():_0x4f7895['CoreEngine'][_0x217956(0x68e)][_0x217956(0x809)](this);}if(this[_0x217956(0x33b)]===undefined)this['initCoreEngine']();if(this[_0x217956(0x33b)][_0x217956(0x3d9)]===undefined)this[_0x217956(0x45c)]();return this[_0x217956(0x33b)][_0x217956(0x3d9)];},Game_System['prototype'][_0x41f3d3(0x86f)]=function(_0x3d0a9f){const _0x54e23a=_0x41f3d3;if(this[_0x54e23a(0x33b)]===undefined)this[_0x54e23a(0x9e7)]();if(this['_CoreEngineSettings'][_0x54e23a(0x3d9)]===undefined)this[_0x54e23a(0x45c)]();this[_0x54e23a(0x33b)]['BattleSystem']=_0x3d0a9f;},Game_System['prototype'][_0x41f3d3(0x935)]=function(){const _0x4278eb=_0x41f3d3;if(this[_0x4278eb(0x33b)]===undefined)this[_0x4278eb(0x9e7)]();if(this[_0x4278eb(0x33b)][_0x4278eb(0x49b)]===undefined)this[_0x4278eb(0x9e7)]();return this[_0x4278eb(0x33b)]['FontSize'];},Game_System[_0x41f3d3(0x1fd)]['setMainFontSize']=function(_0x19226a){const _0x344b93=_0x41f3d3;if(this[_0x344b93(0x33b)]===undefined)this['initCoreEngine']();if(this[_0x344b93(0x33b)][_0x344b93(0x9b4)]===undefined)this[_0x344b93(0x9e7)]();this[_0x344b93(0x33b)]['FontSize']=_0x19226a;},Game_System['prototype']['windowPadding']=function(){const _0x416897=_0x41f3d3;if(this['_CoreEngineSettings']===undefined)this[_0x416897(0x9e7)]();if(this['_CoreEngineSettings']['Padding']===undefined)this[_0x416897(0x9e7)]();return this[_0x416897(0x33b)][_0x416897(0x433)];},Game_System[_0x41f3d3(0x1fd)][_0x41f3d3(0x997)]=function(_0x2155e0){const _0x3767b6=_0x41f3d3;if(this[_0x3767b6(0x33b)]===undefined)this['initCoreEngine']();if(this[_0x3767b6(0x33b)][_0x3767b6(0x9b4)]===undefined)this[_0x3767b6(0x9e7)]();this[_0x3767b6(0x33b)][_0x3767b6(0x433)]=_0x2155e0;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5ac)]=Game_Screen['prototype'][_0x41f3d3(0x927)],Game_Screen[_0x41f3d3(0x1fd)]['initialize']=function(){const _0x3a91a0=_0x41f3d3;VisuMZ['CoreEngine'][_0x3a91a0(0x5ac)]['call'](this),this[_0x3a91a0(0x4c5)]();},Game_Screen[_0x41f3d3(0x1fd)][_0x41f3d3(0x4c5)]=function(){const _0x249ffe=_0x41f3d3,_0x24ee93=VisuMZ[_0x249ffe(0x5aa)][_0x249ffe(0x5b1)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x24ee93?.[_0x249ffe(0x842)]||'random';},Game_Screen[_0x41f3d3(0x1fd)]['getCoreEngineScreenShakeStyle']=function(){const _0x144b17=_0x41f3d3;if(this[_0x144b17(0x32f)]===undefined)this[_0x144b17(0x4c5)]();return this['_coreEngineShakeStyle'];},Game_Screen['prototype']['setCoreEngineScreenShakeStyle']=function(_0x4fe5d1){const _0x2bb313=_0x41f3d3;if(this['_coreEngineShakeStyle']===undefined)this[_0x2bb313(0x4c5)]();this['_coreEngineShakeStyle']=_0x4fe5d1[_0x2bb313(0x1b1)]()[_0x2bb313(0x30b)]();},Game_Picture[_0x41f3d3(0x1fd)]['isMapScrollLinked']=function(){const _0x328743=_0x41f3d3;if($gameParty[_0x328743(0x998)]())return![];return this[_0x328743(0x23b)]()&&this[_0x328743(0x23b)]()[_0x328743(0x93c)](0x0)==='!';},VisuMZ[_0x41f3d3(0x5aa)]['Game_Picture_x']=Game_Picture[_0x41f3d3(0x1fd)]['x'],Game_Picture[_0x41f3d3(0x1fd)]['x']=function(){const _0x509682=_0x41f3d3;return this[_0x509682(0x717)]()?this['xScrollLinkedOffset']():'VuBWn'===_0x509682(0x42d)?_0x1954d3['layoutSettings']['SlotRect']['call'](this):VisuMZ[_0x509682(0x5aa)][_0x509682(0x9aa)][_0x509682(0x809)](this);},Game_Picture[_0x41f3d3(0x1fd)]['xScrollLinkedOffset']=function(){const _0x163f5c=_0x41f3d3,_0x2855d5=$gameMap[_0x163f5c(0x88a)]()*$gameMap[_0x163f5c(0x67b)]();return(this['_x']-_0x2855d5)*$gameScreen[_0x163f5c(0x644)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x497)]=Game_Picture[_0x41f3d3(0x1fd)]['y'],Game_Picture[_0x41f3d3(0x1fd)]['y']=function(){const _0x1cb1f5=_0x41f3d3;if(this[_0x1cb1f5(0x717)]())return this[_0x1cb1f5(0x47d)]();else{if('YsNxp'!==_0x1cb1f5(0x6ed))this['cursorRight'](_0x78db38[_0x1cb1f5(0x811)](_0x1cb1f5(0x5ed)));else return VisuMZ['CoreEngine'][_0x1cb1f5(0x497)]['call'](this);}},Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x47d)]=function(){const _0x4cade7=_0x41f3d3,_0x2db260=$gameMap[_0x4cade7(0x2fd)]()*$gameMap['tileHeight']();return(this['_y']-_0x2db260)*$gameScreen[_0x4cade7(0x644)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x593)]=Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x2be)],Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x2be)]=function(){const _0x4f7810=_0x41f3d3;let _0x398676=VisuMZ[_0x4f7810(0x5aa)][_0x4f7810(0x593)][_0x4f7810(0x809)](this);return this['isMapScrollLinked']()&&(_0x398676*=$gameScreen[_0x4f7810(0x644)]()),_0x398676;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x7cc)]=Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x449)],Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x449)]=function(){const _0x9b3f48=_0x41f3d3;let _0x2742eb=VisuMZ['CoreEngine'][_0x9b3f48(0x7cc)][_0x9b3f48(0x809)](this);if(this[_0x9b3f48(0x717)]()){if(_0x9b3f48(0x1c1)!=='rsyRF')_0x2742eb*=$gameScreen[_0x9b3f48(0x644)]();else{this['_displayY']=this[_0x9b3f48(0x979)]()['displayY'];return;}}return _0x2742eb;},Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x953)]=function(_0x31375f){const _0x11c5cf=_0x41f3d3;this[_0x11c5cf(0x32d)]=_0x31375f;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x524)]=Game_Picture[_0x41f3d3(0x1fd)]['calcEasing'],Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x526)]=function(_0x36f951){const _0x2d0b28=_0x41f3d3;return this[_0x2d0b28(0x32d)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x2d0b28(0x85f)](this[_0x2d0b28(0x32d)])?VisuMZ[_0x2d0b28(0x5aa)]['Game_Picture_calcEasing'][_0x2d0b28(0x809)](this,_0x36f951):'CxmjF'!==_0x2d0b28(0x6e0)?VisuMZ[_0x2d0b28(0x92a)](_0x36f951,this[_0x2d0b28(0x32d)]):_0x49458d[_0x2d0b28(0x5aa)]['SceneManager_isGameActive'][_0x2d0b28(0x809)](this);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x779)]=Game_Action[_0x41f3d3(0x1fd)]['itemHit'],Game_Action['prototype'][_0x41f3d3(0x3e1)]=function(_0x43f09d){const _0x4cdaf2=_0x41f3d3;return VisuMZ['CoreEngine'][_0x4cdaf2(0x5b1)][_0x4cdaf2(0x2d1)][_0x4cdaf2(0x2ea)]?this[_0x4cdaf2(0x549)](_0x43f09d):VisuMZ[_0x4cdaf2(0x5aa)]['Game_Action_itemHit'][_0x4cdaf2(0x809)](this,_0x43f09d);},Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x549)]=function(_0xe51cd8){const _0x4517de=_0x41f3d3,_0x31c0f2=this[_0x4517de(0x703)](_0xe51cd8),_0x3fd30f=this[_0x4517de(0x963)](_0xe51cd8),_0xdcaf43=this[_0x4517de(0x3da)](_0xe51cd8);return _0x31c0f2*(_0x3fd30f-_0xdcaf43);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5c3)]=Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0xa1e)],Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0xa1e)]=function(_0x792abc){const _0x38a975=_0x41f3d3;if(VisuMZ[_0x38a975(0x5aa)][_0x38a975(0x5b1)][_0x38a975(0x2d1)][_0x38a975(0x2ea)])return 0x0;else{if(_0x38a975(0x3d1)===_0x38a975(0x826)){var _0x3166d4=_0x336674(_0x12b35c['$1'])/0x64;_0xe0e82f+=_0x3166d4;}else return VisuMZ[_0x38a975(0x5aa)]['Game_Action_itemEva'][_0x38a975(0x809)](this,_0x792abc);}},Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x703)]=function(_0x4ea586){const _0x1b80fb=_0x41f3d3;return this[_0x1b80fb(0x985)]()[_0x1b80fb(0x27a)]*0.01;},Game_Action['prototype'][_0x41f3d3(0x963)]=function(_0x30d150){const _0x2e2c3b=_0x41f3d3;if(VisuMZ[_0x2e2c3b(0x5aa)][_0x2e2c3b(0x5b1)][_0x2e2c3b(0x2d1)][_0x2e2c3b(0x6fa)]&&this['isItem']())return 0x1;if(this[_0x2e2c3b(0x537)]()){if(VisuMZ[_0x2e2c3b(0x5aa)][_0x2e2c3b(0x5b1)][_0x2e2c3b(0x2d1)][_0x2e2c3b(0x6fa)]&&this['subject']()['isActor']()){if('ZyfZS'===_0x2e2c3b(0x2d5)){if(this[_0x2e2c3b(0x33b)]===_0x533cb2)this[_0x2e2c3b(0x9e7)]();if(this[_0x2e2c3b(0x33b)][_0x2e2c3b(0x70d)]===_0x11eba3)this[_0x2e2c3b(0x9e7)]();this['_CoreEngineSettings'][_0x2e2c3b(0x70d)]=_0x38fe77;}else return this[_0x2e2c3b(0x3e6)]()[_0x2e2c3b(0x32a)]+0.05;}else return this[_0x2e2c3b(0x3e6)]()[_0x2e2c3b(0x32a)];}else{if(_0x2e2c3b(0x417)===_0x2e2c3b(0x862))_0x1c215b[_0x2e2c3b(0x5aa)][_0x2e2c3b(0x95b)][_0x2e2c3b(0x809)](this),this[_0x2e2c3b(0x889)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};else return 0x1;}},Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x3da)]=function(_0x42a804){const _0x455488=_0x41f3d3;if(this['subject']()[_0x455488(0x2aa)]()===_0x42a804['isActor']())return 0x0;if(this[_0x455488(0x537)]()){if('tpmfh'!==_0x455488(0x87e)){if(VisuMZ[_0x455488(0x5aa)]['Settings']['QoL']['AccuracyBoost']&&_0x42a804[_0x455488(0x874)]())return _0x42a804['eva']-0.05;else{if(_0x455488(0x621)!==_0x455488(0x621))_0x520076[_0x455488(0x308)](_0x1f6117);else return _0x42a804[_0x455488(0x724)];}}else _0x147c55['CoreEngine']['Window_Gold_refresh']['call'](this);}else return this[_0x455488(0x388)]()?_0x42a804[_0x455488(0x20b)]:0x0;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x783)]=Game_Action[_0x41f3d3(0x1fd)]['updateLastTarget'],Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x719)]=function(_0x4ef12f){const _0x172f8d=_0x41f3d3;VisuMZ[_0x172f8d(0x5aa)][_0x172f8d(0x783)]['call'](this,_0x4ef12f);if(VisuMZ[_0x172f8d(0x5aa)][_0x172f8d(0x5b1)][_0x172f8d(0x2d1)]['ImprovedAccuracySystem'])return;const _0x34e7de=_0x4ef12f[_0x172f8d(0x2d8)]();_0x34e7de[_0x172f8d(0x767)]&&(0x1-this[_0x172f8d(0xa1e)](_0x4ef12f)>this[_0x172f8d(0x3e1)](_0x4ef12f)&&(_0x34e7de['missed']=![],_0x34e7de[_0x172f8d(0x29e)]=!![]));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x34d)]=Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x64c)],Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x64c)]=function(){const _0x3c6a71=_0x41f3d3;this[_0x3c6a71(0xa1f)]={},VisuMZ[_0x3c6a71(0x5aa)][_0x3c6a71(0x34d)][_0x3c6a71(0x809)](this);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x616)]=Game_BattlerBase[_0x41f3d3(0x1fd)]['refresh'],Game_BattlerBase[_0x41f3d3(0x1fd)]['refresh']=function(){const _0x5f0933=_0x41f3d3;this[_0x5f0933(0xa1f)]={},VisuMZ[_0x5f0933(0x5aa)][_0x5f0933(0x616)][_0x5f0933(0x809)](this);},Game_BattlerBase['prototype'][_0x41f3d3(0x673)]=function(_0x379d4a){const _0x1ee680=_0x41f3d3;return this[_0x1ee680(0xa1f)]=this[_0x1ee680(0xa1f)]||{},this[_0x1ee680(0xa1f)][_0x379d4a]!==undefined;},Game_BattlerBase['prototype'][_0x41f3d3(0x217)]=function(_0x2d17e5){const _0x376d0e=_0x41f3d3,_0x342cce=(_0x140022,_0x4370e3)=>{const _0x47cde3=_0x4926;if(_0x47cde3(0x63d)!==_0x47cde3(0x63d))_0x3bd0be=_0x3371c9(_0x1ca1a2['$1'])*_0x386d84[_0x47cde3(0x665)];else{if(!_0x4370e3)return _0x140022;if(_0x4370e3[_0x47cde3(0x212)]['match'](VisuMZ['CoreEngine'][_0x47cde3(0x643)]['paramPlus'][_0x2d17e5])){var _0x1498db=Number(RegExp['$1']);_0x140022+=_0x1498db;}if(_0x4370e3['note'][_0x47cde3(0x420)](VisuMZ['CoreEngine']['RegExp'][_0x47cde3(0x599)][_0x2d17e5])){var _0x2e124c=String(RegExp['$1']);try{_0x140022+=eval(_0x2e124c);}catch(_0x1b1077){if($gameTemp[_0x47cde3(0x67d)]())console[_0x47cde3(0x5e6)](_0x1b1077);}}return _0x140022;}};return this[_0x376d0e(0x6c7)]()[_0x376d0e(0x2f3)](_0x342cce,this['_paramPlus'][_0x2d17e5]);},Game_BattlerBase[_0x41f3d3(0x1fd)]['paramMax']=function(_0x1c8bc2){const _0xef201d=_0x41f3d3;var _0x1d9b9d=_0xef201d(0x41a)+(this['isActor']()?_0xef201d(0x76c):_0xef201d(0x5fe))+_0xef201d(0x406)+_0x1c8bc2;if(this[_0xef201d(0x673)](_0x1d9b9d))return this[_0xef201d(0xa1f)][_0x1d9b9d];this['_cache'][_0x1d9b9d]=eval(VisuMZ[_0xef201d(0x5aa)][_0xef201d(0x5b1)][_0xef201d(0x803)][_0x1d9b9d]);const _0x3d2f3c=(_0x2dc327,_0x16c918)=>{const _0x7f56c3=_0xef201d;if(_0x7f56c3(0x1a1)===_0x7f56c3(0x1a1)){if(!_0x16c918)return _0x2dc327;if(_0x16c918[_0x7f56c3(0x212)][_0x7f56c3(0x420)](VisuMZ['CoreEngine'][_0x7f56c3(0x643)][_0x7f56c3(0x94c)][_0x1c8bc2])){var _0x5ec511=Number(RegExp['$1']);if(_0x5ec511===0x0)_0x5ec511=Number[_0x7f56c3(0x9ae)];_0x2dc327=Math['max'](_0x2dc327,_0x5ec511);}if(_0x16c918[_0x7f56c3(0x212)][_0x7f56c3(0x420)](VisuMZ['CoreEngine']['RegExp'][_0x7f56c3(0x560)][_0x1c8bc2])){var _0x35c6e5=String(RegExp['$1']);try{_0x2dc327=Math[_0x7f56c3(0x4a5)](_0x2dc327,Number(eval(_0x35c6e5)));}catch(_0x27804a){if($gameTemp[_0x7f56c3(0x67d)]())console[_0x7f56c3(0x5e6)](_0x27804a);}}return _0x2dc327;}else{if(this[_0x7f56c3(0x407)][_0x7f56c3(0xa5b)[_0x7f56c3(0x382)](_0x52aef8)]!==_0x445bdb[_0x7f56c3(0x784)[_0x7f56c3(0x382)](_0x5bcf6a)]())return this[_0x7f56c3(0x3b5)]();if(this[_0x7f56c3(0x407)][_0x7f56c3(0x4a9)['format'](_0x22e9ba)]!==_0x170f3a[_0x7f56c3(0xa3e)['format'](_0x12d1e3)]())return this[_0x7f56c3(0x3b5)]();}};if(this[_0xef201d(0xa1f)][_0x1d9b9d]===0x0)this[_0xef201d(0xa1f)][_0x1d9b9d]=Number['MAX_SAFE_INTEGER'];return this[_0xef201d(0xa1f)][_0x1d9b9d]=this['traitObjects']()[_0xef201d(0x2f3)](_0x3d2f3c,this['_cache'][_0x1d9b9d]),this[_0xef201d(0xa1f)][_0x1d9b9d];},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x440)]=function(_0x1dc50e){const _0x105bbc=_0x41f3d3,_0x54a284=this[_0x105bbc(0x338)](Game_BattlerBase[_0x105bbc(0x337)],_0x1dc50e),_0x24e14d=(_0x5cb356,_0xda58c8)=>{const _0x28682c=_0x105bbc;if(!_0xda58c8)return _0x5cb356;if(_0xda58c8[_0x28682c(0x212)][_0x28682c(0x420)](VisuMZ['CoreEngine'][_0x28682c(0x643)][_0x28682c(0x261)][_0x1dc50e])){if(_0x28682c(0x2ce)===_0x28682c(0x2ce)){var _0x1377f8=Number(RegExp['$1'])/0x64;_0x5cb356*=_0x1377f8;}else this[_0x28682c(0x9f8)](_0x28682c(0x890));}if(_0xda58c8[_0x28682c(0x212)][_0x28682c(0x420)](VisuMZ[_0x28682c(0x5aa)][_0x28682c(0x643)][_0x28682c(0x1a9)][_0x1dc50e])){var _0x1377f8=Number(RegExp['$1']);_0x5cb356*=_0x1377f8;}if(_0xda58c8['note'][_0x28682c(0x420)](VisuMZ[_0x28682c(0x5aa)][_0x28682c(0x643)][_0x28682c(0x600)][_0x1dc50e])){if('DhSRZ'===_0x28682c(0x5c2))this[_0x28682c(0x927)](...arguments);else{var _0x4a96c7=String(RegExp['$1']);try{if('giphk'!==_0x28682c(0x5a4))_0x5cb356*=eval(_0x4a96c7);else return this['areButtonsHidden']()||this[_0x28682c(0x948)]();}catch(_0x14000c){if($gameTemp['isPlaytest']())console['log'](_0x14000c);}}}return _0x5cb356;};return this[_0x105bbc(0x6c7)]()[_0x105bbc(0x2f3)](_0x24e14d,_0x54a284);},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x84d)]=function(_0x347239){const _0x6a1632=_0x41f3d3,_0x156e24=(_0x380cc0,_0x26c534)=>{const _0x56d1bb=_0x4926;if(!_0x26c534)return _0x380cc0;if(_0x26c534[_0x56d1bb(0x212)][_0x56d1bb(0x420)](VisuMZ['CoreEngine'][_0x56d1bb(0x643)]['paramFlat'][_0x347239])){var _0x32e0e6=Number(RegExp['$1']);_0x380cc0+=_0x32e0e6;}if(_0x26c534[_0x56d1bb(0x212)][_0x56d1bb(0x420)](VisuMZ[_0x56d1bb(0x5aa)][_0x56d1bb(0x643)]['paramFlatJS'][_0x347239])){if('pvAoC'===_0x56d1bb(0x3ff)){var _0x6ac2b2=String(RegExp['$1']);try{if('YswYT'===_0x56d1bb(0x865)){if(this[_0x56d1bb(0x82e)]())_0x4a0e24=_0x4b993c[_0x56d1bb(0x684)](_0x4606d5);_0xe33f9c[_0x56d1bb(0x5aa)][_0x56d1bb(0x753)][_0x56d1bb(0x809)](this,_0x42a6bc,_0x3ffbea,_0x1ab742,_0xa36b20,_0x53e8b2);}else _0x380cc0+=eval(_0x6ac2b2);}catch(_0x30c182){if('KKsiS'==='KKsiS'){if($gameTemp['isPlaytest']())console['log'](_0x30c182);}else this[_0x56d1bb(0x866)]='FV';}}else return _0x433135['CoreEngine'][_0x56d1bb(0x5b1)][_0x56d1bb(0x87d)][_0x826ecd]||_0x4d4259['CoreEngine']['Settings'][_0x56d1bb(0x87d)][_0x56d1bb(0x5d3)];}return _0x380cc0;};return this[_0x6a1632(0x6c7)]()[_0x6a1632(0x2f3)](_0x156e24,0x0);},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x62d)]=function(_0x3ded9a){const _0x4a0fbe=_0x41f3d3;let _0x43c319=_0x4a0fbe(0x62d)+_0x3ded9a+_0x4a0fbe(0x8bb);if(this[_0x4a0fbe(0x673)](_0x43c319))return this[_0x4a0fbe(0xa1f)][_0x43c319];return this[_0x4a0fbe(0xa1f)][_0x43c319]=Math['round'](VisuMZ[_0x4a0fbe(0x5aa)][_0x4a0fbe(0x5b1)][_0x4a0fbe(0x803)]['BasicParameterFormula']['call'](this,_0x3ded9a)),this[_0x4a0fbe(0xa1f)][_0x43c319];},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x75f)]=function(_0x2a757a){const _0x936f22=_0x41f3d3,_0x4dc717=(_0x2af278,_0x195e58)=>{const _0x43147d=_0x4926;if(!_0x195e58)return _0x2af278;if(_0x195e58['note'][_0x43147d(0x420)](VisuMZ['CoreEngine'][_0x43147d(0x643)][_0x43147d(0x627)][_0x2a757a])){var _0xfb8e0d=Number(RegExp['$1'])/0x64;_0x2af278+=_0xfb8e0d;}if(_0x195e58['note'][_0x43147d(0x420)](VisuMZ[_0x43147d(0x5aa)][_0x43147d(0x643)]['xparamPlus2'][_0x2a757a])){var _0xfb8e0d=Number(RegExp['$1']);_0x2af278+=_0xfb8e0d;}if(_0x195e58[_0x43147d(0x212)]['match'](VisuMZ[_0x43147d(0x5aa)][_0x43147d(0x643)][_0x43147d(0x763)][_0x2a757a])){var _0x1087cf=String(RegExp['$1']);try{'OFKKq'===_0x43147d(0x934)?0x1-this[_0x43147d(0xa1e)](_0x39bdae)>this[_0x43147d(0x3e1)](_0x1192d2)&&(_0x489b0c[_0x43147d(0x767)]=![],_0x347a05[_0x43147d(0x29e)]=!![]):_0x2af278+=eval(_0x1087cf);}catch(_0x584666){if($gameTemp[_0x43147d(0x67d)]())console[_0x43147d(0x5e6)](_0x584666);}}return _0x2af278;};return this['traitObjects']()[_0x936f22(0x2f3)](_0x4dc717,0x0);},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0xa0c)]=function(_0x275314){const _0x347f8f=_0x41f3d3,_0x198644=(_0x521e5c,_0x1b80b2)=>{const _0x13b913=_0x4926;if(!_0x1b80b2)return _0x521e5c;if(_0x1b80b2[_0x13b913(0x212)][_0x13b913(0x420)](VisuMZ[_0x13b913(0x5aa)][_0x13b913(0x643)]['xparamRate1'][_0x275314])){if('ivlEq'===_0x13b913(0x66c)){var _0x4150bb=_0x1d0925(_0x5592e4['$1']);_0x51f358*=_0x4150bb;}else{var _0x3640fc=Number(RegExp['$1'])/0x64;_0x521e5c*=_0x3640fc;}}if(_0x1b80b2[_0x13b913(0x212)][_0x13b913(0x420)](VisuMZ[_0x13b913(0x5aa)][_0x13b913(0x643)]['xparamRate2'][_0x275314])){var _0x3640fc=Number(RegExp['$1']);_0x521e5c*=_0x3640fc;}if(_0x1b80b2[_0x13b913(0x212)][_0x13b913(0x420)](VisuMZ[_0x13b913(0x5aa)]['RegExp'][_0x13b913(0x9e0)][_0x275314])){var _0x456e6e=String(RegExp['$1']);try{if(_0x13b913(0x755)!==_0x13b913(0x852))_0x521e5c*=eval(_0x456e6e);else{this[_0x13b913(0x9e9)]['clear'](),this[_0x13b913(0x4f0)][_0x13b913(0x3b1)](),this[_0x13b913(0x2df)]();let _0x24bce4=_0x366b58[_0x13b913(0x5aa)][_0x13b913(0x5b1)]['KeyboardInput'][_0x13b913(0x691)][_0x13b913(0x7f1)]('\x0a'),_0x2d6bf3=_0x24bce4[_0x13b913(0x9b7)],_0x1737f9=(this[_0x13b913(0x83e)]-_0x2d6bf3*this[_0x13b913(0x3c0)]())/0x2;for(let _0xff6c89=0x0;_0xff6c89<_0x2d6bf3;++_0xff6c89){let _0x27cf2d=_0x24bce4[_0xff6c89],_0x43769d=this[_0x13b913(0x426)](_0x27cf2d)[_0x13b913(0x665)],_0x41437a=_0x3d778a[_0x13b913(0x6ae)]((this['contents'][_0x13b913(0x665)]-_0x43769d)/0x2);this[_0x13b913(0x48a)](_0x27cf2d,_0x41437a,_0x1737f9),_0x1737f9+=this[_0x13b913(0x3c0)]();}}}catch(_0x1d8fe2){if(_0x13b913(0x423)!=='ZnpNZ')_0x4534fa[_0x13b913(0x5e6)](_0x13b913(0x955)),_0x4ce875['log'](_0x131a6e);else{if($gameTemp[_0x13b913(0x67d)]())console[_0x13b913(0x5e6)](_0x1d8fe2);}}}return _0x521e5c;};return this[_0x347f8f(0x6c7)]()['reduce'](_0x198644,0x1);},Game_BattlerBase['prototype'][_0x41f3d3(0x8de)]=function(_0x5a2b48){const _0x2bcbe7=_0x41f3d3,_0x5799ad=(_0x53916f,_0x839b7f)=>{const _0x206d56=_0x4926;if(_0x206d56(0x341)===_0x206d56(0x4fe)){if(_0x176f34[_0x206d56(0x5aa)][_0x206d56(0x5b1)]['Param'][_0x206d56(0x78e)]===![])return;if(this[_0x206d56(0x272)]())this[_0x206d56(0x4ba)](_0x41ae64,_0x202e99,_0x289d3c);_0x5f1ac3[_0x206d56(0x5aa)]['Window_StatusBase_drawActorLevel'][_0x206d56(0x809)](this,_0x33cf40,_0x3c8f00,_0x2e37a2);}else{if(!_0x839b7f)return _0x53916f;if(_0x839b7f[_0x206d56(0x212)][_0x206d56(0x420)](VisuMZ[_0x206d56(0x5aa)][_0x206d56(0x643)][_0x206d56(0x40b)][_0x5a2b48])){var _0xd7073f=Number(RegExp['$1'])/0x64;_0x53916f+=_0xd7073f;}if(_0x839b7f[_0x206d56(0x212)][_0x206d56(0x420)](VisuMZ['CoreEngine']['RegExp'][_0x206d56(0x4dd)][_0x5a2b48])){if('YSOSt'==='YSOSt'){var _0xd7073f=Number(RegExp['$1']);_0x53916f+=_0xd7073f;}else this[_0x206d56(0x50f)]=[],this[_0x206d56(0x8b7)]=[],this[_0x206d56(0x263)]=[],this[_0x206d56(0x99d)]=[];}if(_0x839b7f['note'][_0x206d56(0x420)](VisuMZ['CoreEngine'][_0x206d56(0x643)][_0x206d56(0xa14)][_0x5a2b48])){if('TWhne'!==_0x206d56(0x3cf))this['smoothSelect']((_0x2bc7dc-_0x1fac33+_0x507fcf)%_0x5c9581);else{var _0x348350=String(RegExp['$1']);try{_0x206d56(0x6d5)===_0x206d56(0x6d5)?_0x53916f+=eval(_0x348350):this['drawSegment'](_0x5f1062);}catch(_0x25ebf2){if($gameTemp[_0x206d56(0x67d)]())console[_0x206d56(0x5e6)](_0x25ebf2);}}}return _0x53916f;}};return this[_0x2bcbe7(0x6c7)]()[_0x2bcbe7(0x2f3)](_0x5799ad,0x0);},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x5cb)]=function(_0x14ea46){const _0x462079=_0x41f3d3;let _0x1e0a84=_0x462079(0x5cb)+_0x14ea46+'Total';if(this['checkCacheKey'](_0x1e0a84))return this['_cache'][_0x1e0a84];return this[_0x462079(0xa1f)][_0x1e0a84]=VisuMZ[_0x462079(0x5aa)][_0x462079(0x5b1)][_0x462079(0x803)][_0x462079(0x9ab)][_0x462079(0x809)](this,_0x14ea46),this[_0x462079(0xa1f)][_0x1e0a84];},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x605)]=function(_0x17c4e9){const _0x24c854=_0x41f3d3,_0x4b5658=(_0x184e20,_0x506d11)=>{const _0x551493=_0x4926;if(_0x551493(0x732)===_0x551493(0x26e)){const _0x76ed6f=_0x5c4cad['width']-_0x43b400['boxWidth']-_0x1cd051[_0x551493(0x5aa)]['Settings']['UI'][_0x551493(0x391)]*0x2,_0x376cba=_0xac3268['prototype']['blockWidth'][_0x551493(0x809)](this)*0x4;if(_0x76ed6f>=_0x376cba)_0x3172cf[_0x551493(0x840)](!![]);}else{if(!_0x506d11)return _0x184e20;if(_0x506d11[_0x551493(0x212)]['match'](VisuMZ[_0x551493(0x5aa)][_0x551493(0x643)][_0x551493(0x731)][_0x17c4e9])){if(_0x551493(0x1cb)===_0x551493(0x914))return this['mainAreaTopSideButtonLayout']();else{var _0x39be1f=Number(RegExp['$1'])/0x64;_0x184e20+=_0x39be1f;}}if(_0x506d11[_0x551493(0x212)][_0x551493(0x420)](VisuMZ[_0x551493(0x5aa)][_0x551493(0x643)][_0x551493(0x99c)][_0x17c4e9])){var _0x39be1f=Number(RegExp['$1']);_0x184e20+=_0x39be1f;}if(_0x506d11['note']['match'](VisuMZ[_0x551493(0x5aa)]['RegExp']['sparamPlusJS'][_0x17c4e9])){if(_0x551493(0x72f)!==_0x551493(0x72f))this['_x']=this[_0x551493(0x38c)],this['_y']=this[_0x551493(0x518)],this[_0x551493(0x375)]=this[_0x551493(0x43a)],this[_0x551493(0x4f2)]=this[_0x551493(0x861)],this[_0x551493(0x271)]=this[_0x551493(0x5a3)],this[_0x551493(0x889)]&&(this[_0x551493(0x889)]['x']=this[_0x551493(0x66a)]['x'],this[_0x551493(0x889)]['y']=this[_0x551493(0x66a)]['y']);else{var _0x3f84fe=String(RegExp['$1']);try{if(_0x551493(0x6c1)==='IucCt')_0x184e20+=eval(_0x3f84fe);else return _0x2c8015[_0x551493(0x5aa)][_0x551493(0x5b1)][_0x551493(0x2d1)][_0x551493(0x2ea)]?0x0:_0x115488['CoreEngine'][_0x551493(0x5c3)][_0x551493(0x809)](this,_0x4d7405);}catch(_0x4c89a5){if(_0x551493(0x7c6)==='mlYcu')this[_0x551493(0x5fc)][_0x551493(0x950)]['x']=0x1/this[_0x551493(0x950)]['x'],this[_0x551493(0x5fc)]['x']=-(this['x']/this[_0x551493(0x950)]['x']);else{if($gameTemp[_0x551493(0x67d)]())console[_0x551493(0x5e6)](_0x4c89a5);}}}}return _0x184e20;}};return this[_0x24c854(0x6c7)]()[_0x24c854(0x2f3)](_0x4b5658,0x0);},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x27c)]=function(_0x3d2c06){const _0x1eaae8=_0x41f3d3,_0x1d6934=(_0x1dde95,_0x25628a)=>{const _0x1977a8=_0x4926;if(!_0x25628a)return _0x1dde95;if(_0x25628a[_0x1977a8(0x212)][_0x1977a8(0x420)](VisuMZ[_0x1977a8(0x5aa)][_0x1977a8(0x643)][_0x1977a8(0x666)][_0x3d2c06])){if(_0x1977a8(0x400)!==_0x1977a8(0x400)){if(this[_0x1977a8(0x199)]()&&this[_0x1977a8(0x23a)]['_mode']===_0x1977a8(0x3eb))return _0x16a774[_0x1977a8(0x1fe)](['ENTER']);return _0x1c3d7a[_0x1977a8(0x1fd)][_0x1977a8(0x834)]['call'](this);}else{var _0xc99133=Number(RegExp['$1'])/0x64;_0x1dde95*=_0xc99133;}}if(_0x25628a['note'][_0x1977a8(0x420)](VisuMZ[_0x1977a8(0x5aa)]['RegExp'][_0x1977a8(0x6ac)][_0x3d2c06])){var _0xc99133=Number(RegExp['$1']);_0x1dde95*=_0xc99133;}if(_0x25628a[_0x1977a8(0x212)]['match'](VisuMZ[_0x1977a8(0x5aa)][_0x1977a8(0x643)][_0x1977a8(0x2cd)][_0x3d2c06])){var _0x36140d=String(RegExp['$1']);try{_0x1dde95*=eval(_0x36140d);}catch(_0x9c1a2d){if(_0x1977a8(0x958)!=='wDPnB'){if($gameTemp[_0x1977a8(0x67d)]())console['log'](_0x9c1a2d);}else{const _0xf4fbd6=_0x3c2ad9[_0x1977a8(0x1b1)]()[_0x1977a8(0x30b)]();for(const _0x9e30b2 in _0x45b3fd[_0x1977a8(0x5aa)]['ControllerMatches']){if(_0xf4fbd6[_0x1977a8(0x85f)](_0x9e30b2)){const _0x46eaf1=_0x3a57f2[_0x1977a8(0x5aa)][_0x1977a8(0x818)][_0x9e30b2],_0x54cfc6=_0x12a720[_0x1977a8(0x5aa)][_0x1977a8(0x386)][_0x46eaf1];return _0x54cfc6[_0x17293c]||this['getKeyboardInputButtonString'](_0x5d0bba);}}return this['getKeyboardInputButtonString'](_0x11da1b);}}}return _0x1dde95;};return this[_0x1eaae8(0x6c7)]()['reduce'](_0x1d6934,0x1);},Game_BattlerBase['prototype'][_0x41f3d3(0x36a)]=function(_0x5e84f9){const _0x4efb4e=_0x41f3d3,_0x134f90=(_0x476675,_0x1849d4)=>{const _0x189baf=_0x4926;if(_0x189baf(0x5db)!==_0x189baf(0x5db))_0x3ff23f[_0x189baf(0x6be)]&&(this[_0x189baf(0x98c)]=_0x189baf(0x822));else{if(!_0x1849d4)return _0x476675;if(_0x1849d4['note'][_0x189baf(0x420)](VisuMZ[_0x189baf(0x5aa)][_0x189baf(0x643)][_0x189baf(0x412)][_0x5e84f9])){var _0x144559=Number(RegExp['$1'])/0x64;_0x476675+=_0x144559;}if(_0x1849d4[_0x189baf(0x212)][_0x189baf(0x420)](VisuMZ[_0x189baf(0x5aa)][_0x189baf(0x643)]['sparamFlat2'][_0x5e84f9])){var _0x144559=Number(RegExp['$1']);_0x476675+=_0x144559;}if(_0x1849d4['note'][_0x189baf(0x420)](VisuMZ[_0x189baf(0x5aa)][_0x189baf(0x643)][_0x189baf(0x253)][_0x5e84f9])){if(_0x189baf(0x28d)!==_0x189baf(0x28d)){_0x52ec48=_0xa70fa(_0x3da328||'')['toUpperCase']();const _0x46d114=_0x3e24b9[_0x189baf(0x5aa)][_0x189baf(0x5b1)][_0x189baf(0x803)];if(_0x264e90===_0x189baf(0x9f6))return _0x2944d6['terms'][_0x189baf(0x8cb)][0x0];if(_0xfc38be===_0x189baf(0x777))return _0x17dbb5[_0x189baf(0x350)][_0x189baf(0x8cb)][0x1];if(_0x4964ad===_0x189baf(0x68f))return _0x3660be['terms'][_0x189baf(0x8cb)][0x2];if(_0x32570f===_0x189baf(0x5f0))return _0x22d83e[_0x189baf(0x350)]['params'][0x3];if(_0x25dbb9===_0x189baf(0x816))return _0x4345ee[_0x189baf(0x350)][_0x189baf(0x8cb)][0x4];if(_0x4c7114===_0x189baf(0x980))return _0x219b71[_0x189baf(0x350)][_0x189baf(0x8cb)][0x5];if(_0x59be0a===_0x189baf(0x5e0))return _0x2fe299[_0x189baf(0x350)]['params'][0x6];if(_0x55982d===_0x189baf(0x9ef))return _0x4451a1[_0x189baf(0x350)][_0x189baf(0x8cb)][0x7];if(_0x2f7a15===_0x189baf(0xa33))return _0x46d114[_0x189baf(0x76d)];if(_0x483000==='EVA')return _0x46d114['XParamVocab1'];if(_0x5c1a4e==='CRI')return _0x46d114[_0x189baf(0x3ee)];if(_0x2c1d1c===_0x189baf(0x1bf))return _0x46d114[_0x189baf(0x3e4)];if(_0x5b9460===_0x189baf(0x577))return _0x46d114[_0x189baf(0x626)];if(_0x364be2==='MRF')return _0x46d114[_0x189baf(0xa2d)];if(_0x5d571e===_0x189baf(0x782))return _0x46d114[_0x189baf(0x794)];if(_0x4c1759===_0x189baf(0x3fe))return _0x46d114[_0x189baf(0x978)];if(_0x8edb40===_0x189baf(0x8fa))return _0x46d114[_0x189baf(0x3a9)];if(_0x2df6d3===_0x189baf(0x19e))return _0x46d114[_0x189baf(0xa68)];if(_0x5d45a7==='TGR')return _0x46d114[_0x189baf(0x3bf)];if(_0x3d5e13===_0x189baf(0x8f2))return _0x46d114['SParamVocab1'];if(_0x5bab36===_0x189baf(0x3c5))return _0x46d114[_0x189baf(0x34e)];if(_0x395c34==='PHA')return _0x46d114['SParamVocab3'];if(_0x27eec0==='MCR')return _0x46d114['SParamVocab4'];if(_0x5ddc5e==='TCR')return _0x46d114[_0x189baf(0x1ab)];if(_0x4496bb===_0x189baf(0x34f))return _0x46d114['SParamVocab6'];if(_0x19a540==='MDR')return _0x46d114[_0x189baf(0x7d2)];if(_0xa0a48c===_0x189baf(0x192))return _0x46d114[_0x189baf(0x70f)];if(_0x322b1f===_0x189baf(0x982))return _0x46d114['SParamVocab9'];if(_0x2b75ec[_0x189baf(0x5aa)][_0x189baf(0x7b4)][_0x270add])return _0x5822f6[_0x189baf(0x5aa)]['CustomParamNames'][_0x416f8e];return'';}else{var _0x114b4c=String(RegExp['$1']);try{if(_0x189baf(0x946)===_0x189baf(0xa5d)){const _0xc96ede=_0x2c65f0(_0x27766d['$1']);_0xc96ede<_0x335715?(_0x10b0f4(_0x189baf(0x98f)[_0x189baf(0x382)](_0x2b85fb,_0xc96ede,_0x2d4053)),_0x1d2b12[_0x189baf(0x48c)]()):_0x4d0036=_0x43e292[_0x189baf(0x4a5)](_0xc96ede,_0x4ea12a);}else _0x476675+=eval(_0x114b4c);}catch(_0x9f48ed){if($gameTemp[_0x189baf(0x67d)]())console[_0x189baf(0x5e6)](_0x9f48ed);}}}return _0x476675;}};return this[_0x4efb4e(0x6c7)]()['reduce'](_0x134f90,0x0);},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x623)]=function(_0x2caa35){const _0x2ad560=_0x41f3d3;let _0x1dfe79=_0x2ad560(0x623)+_0x2caa35+_0x2ad560(0x8bb);if(this['checkCacheKey'](_0x1dfe79))return this[_0x2ad560(0xa1f)][_0x1dfe79];return this[_0x2ad560(0xa1f)][_0x1dfe79]=VisuMZ['CoreEngine'][_0x2ad560(0x5b1)][_0x2ad560(0x803)][_0x2ad560(0x79c)]['call'](this,_0x2caa35),this[_0x2ad560(0xa1f)][_0x1dfe79];},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x6e6)]=function(_0x2d2020,_0x577ded){const _0x569728=_0x41f3d3;if(typeof paramId===_0x569728(0x3fb))return this[_0x569728(0x62d)](_0x2d2020);_0x2d2020=String(_0x2d2020||'')[_0x569728(0x97e)]();if(_0x2d2020==='MAXHP')return this[_0x569728(0x62d)](0x0);if(_0x2d2020==='MAXMP')return this[_0x569728(0x62d)](0x1);if(_0x2d2020==='ATK')return this['param'](0x2);if(_0x2d2020===_0x569728(0x5f0))return this['param'](0x3);if(_0x2d2020===_0x569728(0x816))return this[_0x569728(0x62d)](0x4);if(_0x2d2020==='MDF')return this[_0x569728(0x62d)](0x5);if(_0x2d2020===_0x569728(0x5e0))return this[_0x569728(0x62d)](0x6);if(_0x2d2020===_0x569728(0x9ef))return this[_0x569728(0x62d)](0x7);if(_0x2d2020===_0x569728(0xa33))return _0x577ded?String(Math[_0x569728(0x92b)](this['xparam'](0x0)*0x64))+'%':this[_0x569728(0x5cb)](0x0);if(_0x2d2020===_0x569728(0x395))return _0x577ded?String(Math[_0x569728(0x92b)](this['xparam'](0x1)*0x64))+'%':this[_0x569728(0x5cb)](0x1);if(_0x2d2020==='CRI')return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x5cb)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x2d2020==='CEV')return _0x577ded?String(Math[_0x569728(0x92b)](this['xparam'](0x3)*0x64))+'%':this[_0x569728(0x5cb)](0x3);if(_0x2d2020===_0x569728(0x577))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x5cb)](0x4)*0x64))+'%':this[_0x569728(0x5cb)](0x4);if(_0x2d2020===_0x569728(0x1e9))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x5cb)](0x5)*0x64))+'%':this[_0x569728(0x5cb)](0x5);if(_0x2d2020===_0x569728(0x782))return _0x577ded?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x2d2020===_0x569728(0x3fe))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x5cb)](0x7)*0x64))+'%':this[_0x569728(0x5cb)](0x7);if(_0x2d2020===_0x569728(0x8fa))return _0x577ded?String(Math['round'](this[_0x569728(0x5cb)](0x8)*0x64))+'%':this[_0x569728(0x5cb)](0x8);if(_0x2d2020===_0x569728(0x19e))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x5cb)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x2d2020==='TGR')return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x0)*0x64))+'%':this[_0x569728(0x623)](0x0);if(_0x2d2020==='GRD')return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x2d2020==='REC')return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x2d2020===_0x569728(0x258))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x2d2020==='MCR')return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x2d2020===_0x569728(0x9fb))return _0x577ded?String(Math[_0x569728(0x92b)](this['sparam'](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x2d2020===_0x569728(0x34f))return _0x577ded?String(Math['round'](this[_0x569728(0x623)](0x6)*0x64))+'%':this[_0x569728(0x623)](0x6);if(_0x2d2020==='MDR')return _0x577ded?String(Math['round'](this[_0x569728(0x623)](0x7)*0x64))+'%':this[_0x569728(0x623)](0x7);if(_0x2d2020===_0x569728(0x192))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x8)*0x64))+'%':this[_0x569728(0x623)](0x8);if(_0x2d2020===_0x569728(0x982))return _0x577ded?String(Math[_0x569728(0x92b)](this[_0x569728(0x623)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x569728(0x5aa)][_0x569728(0x5f6)][_0x2d2020]){const _0x90d19b=VisuMZ[_0x569728(0x5aa)][_0x569728(0x5f6)][_0x2d2020],_0x510620=this[_0x90d19b];if(VisuMZ[_0x569728(0x5aa)][_0x569728(0xa66)][_0x2d2020]==='integer'){if('BnJxI'!==_0x569728(0x802))_0x17d3be[_0x569728(0x540)](_0x3b68fa);else return _0x510620;}else return _0x577ded?String(Math['round'](_0x510620*0x64))+'%':_0x510620;}return'';},Game_BattlerBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x62f)]=function(){const _0x1a9090=_0x41f3d3;return this[_0x1a9090(0x6eb)]()&&this[_0x1a9090(0xa35)]<this[_0x1a9090(0x5ad)]*VisuMZ['CoreEngine'][_0x1a9090(0x5b1)][_0x1a9090(0x803)][_0x1a9090(0x5bd)];},Game_Battler[_0x41f3d3(0x1fd)]['performMiss']=function(){const _0x30312a=_0x41f3d3;SoundManager[_0x30312a(0x647)](),this['requestMotion'](_0x30312a(0x69b));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x52c)]=Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x405)],Game_Actor[_0x41f3d3(0x1fd)]['paramBase']=function(_0x3ee805){const _0x31bc4c=_0x41f3d3;if(this[_0x31bc4c(0x713)]>0x63)return this['paramBaseAboveLevel99'](_0x3ee805);return VisuMZ['CoreEngine'][_0x31bc4c(0x52c)][_0x31bc4c(0x809)](this,_0x3ee805);},Game_Actor['prototype'][_0x41f3d3(0x37d)]=function(_0x460c04){const _0x1467e4=_0x41f3d3,_0x571762=this['currentClass']()[_0x1467e4(0x8cb)][_0x460c04][0x63],_0x1a40cc=this[_0x1467e4(0x3e3)]()[_0x1467e4(0x8cb)][_0x460c04][0x62];return _0x571762+(_0x571762-_0x1a40cc)*(this[_0x1467e4(0x713)]-0x63);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x8d8)]=Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x8d2)],Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x8d2)]=function(_0x350a52,_0x570eb2){const _0x1829e3=_0x41f3d3;$gameTemp[_0x1829e3(0x20e)]=!![],VisuMZ['CoreEngine'][_0x1829e3(0x8d8)]['call'](this,_0x350a52,_0x570eb2),$gameTemp[_0x1829e3(0x20e)]=undefined;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2b3)]=Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x85a)],Game_Actor[_0x41f3d3(0x1fd)]['levelUp']=function(){const _0x39e979=_0x41f3d3;VisuMZ[_0x39e979(0x5aa)]['Game_Actor_levelUp'][_0x39e979(0x809)](this);if(!$gameTemp[_0x39e979(0x20e)])this[_0x39e979(0x943)]();},Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x943)]=function(){const _0xfd0b96=_0x41f3d3;this['_cache']={};if(VisuMZ[_0xfd0b96(0x5aa)][_0xfd0b96(0x5b1)][_0xfd0b96(0x2d1)][_0xfd0b96(0x450)])this[_0xfd0b96(0xa35)]=this[_0xfd0b96(0x5ad)];if(VisuMZ[_0xfd0b96(0x5aa)][_0xfd0b96(0x5b1)][_0xfd0b96(0x2d1)][_0xfd0b96(0x3b6)])this['_mp']=this[_0xfd0b96(0x855)];},Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x24b)]=function(){const _0x1933b9=_0x41f3d3;if(this['isMaxLevel']())return 0x1;const _0x127fa3=this['nextLevelExp']()-this[_0x1933b9(0x3dd)](),_0x2bd232=this[_0x1933b9(0x80f)]()-this[_0x1933b9(0x3dd)]();return(_0x2bd232/_0x127fa3)[_0x1933b9(0x4f8)](0x0,0x1);},Game_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x6c7)]=function(){const _0x23516e=_0x41f3d3,_0x3e79e4=Game_Battler[_0x23516e(0x1fd)]['traitObjects'][_0x23516e(0x809)](this);for(const _0x40f005 of this[_0x23516e(0x6b9)]()){_0x40f005&&(_0x23516e(0x22a)!==_0x23516e(0x94d)?_0x3e79e4[_0x23516e(0x7df)](_0x40f005):_0x14a303[_0x23516e(0x953)](_0x21fd7b));}return _0x3e79e4['push'](this[_0x23516e(0x3e3)](),this[_0x23516e(0x6a8)]()),_0x3e79e4;},Object[_0x41f3d3(0x815)](Game_Enemy[_0x41f3d3(0x1fd)],'level',{'get':function(){const _0x77a859=_0x41f3d3;return this[_0x77a859(0x57c)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x41f3d3(0x57c)]=function(){const _0xc035ff=_0x41f3d3;return this[_0xc035ff(0x742)]()['level'];},Game_Enemy[_0x41f3d3(0x1fd)]['moveRelativeToResolutionChange']=function(){const _0x25c5fd=_0x41f3d3;!this['_repositioned']&&(this[_0x25c5fd(0x3b8)]+=Math[_0x25c5fd(0x92b)]((Graphics[_0x25c5fd(0x4f1)]-0x270)/0x2),this['_screenY']-=Math['floor']((Graphics['height']-Graphics[_0x25c5fd(0x6bf)])/0x2),$gameSystem[_0x25c5fd(0x4c4)]()?this[_0x25c5fd(0x9c6)]-=Math[_0x25c5fd(0x6ae)]((Graphics[_0x25c5fd(0x665)]-Graphics[_0x25c5fd(0x427)])/0x2):this[_0x25c5fd(0x9c6)]+=Math[_0x25c5fd(0x92b)]((Graphics[_0x25c5fd(0x427)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party['prototype'][_0x41f3d3(0x8ae)]=function(){const _0x578deb=_0x41f3d3;return VisuMZ[_0x578deb(0x5aa)][_0x578deb(0x5b1)]['Gold'][_0x578deb(0x231)];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x6ca)]=Game_Party[_0x41f3d3(0x1fd)]['consumeItem'],Game_Party[_0x41f3d3(0x1fd)][_0x41f3d3(0x5ca)]=function(_0x2ee4ca){const _0x2b10ec=_0x41f3d3;if(VisuMZ[_0x2b10ec(0x5aa)][_0x2b10ec(0x5b1)]['QoL'][_0x2b10ec(0x642)]&&DataManager[_0x2b10ec(0x4f3)](_0x2ee4ca))return;VisuMZ[_0x2b10ec(0x5aa)][_0x2b10ec(0x6ca)][_0x2b10ec(0x809)](this,_0x2ee4ca);},Game_Party[_0x41f3d3(0x1fd)][_0x41f3d3(0x1ef)]=function(){const _0x2edd13=_0x41f3d3,_0x223a66=VisuMZ[_0x2edd13(0x5aa)][_0x2edd13(0x5b1)]['QoL'],_0x48a172=_0x223a66[_0x2edd13(0x545)]??0x63;let _0x7135f1=[];(_0x223a66['BTestItems']??!![])&&(_0x7135f1=_0x7135f1[_0x2edd13(0x9b5)]($dataItems));(_0x223a66[_0x2edd13(0x3ef)]??!![])&&(_0x7135f1=_0x7135f1['concat']($dataWeapons));if(_0x223a66[_0x2edd13(0x4c7)]??!![]){if('TWPLx'!=='TWPLx'){if(this[_0x2edd13(0xa0b)]===_0x4b5500)this[_0x2edd13(0x553)]();return this[_0x2edd13(0xa0b)];}else _0x7135f1=_0x7135f1[_0x2edd13(0x9b5)]($dataArmors);}for(const _0x45ba87 of _0x7135f1){if(!_0x45ba87)continue;if(_0x45ba87[_0x2edd13(0x23b)]['trim']()<=0x0)continue;if(_0x45ba87['name']['match'](/-----/i))continue;this['gainItem'](_0x45ba87,_0x48a172);}},VisuMZ['CoreEngine'][_0x41f3d3(0x78d)]=Game_Troop[_0x41f3d3(0x1fd)][_0x41f3d3(0x657)],Game_Troop['prototype'][_0x41f3d3(0x657)]=function(_0x5a1b27){const _0x39b007=_0x41f3d3;$gameTemp[_0x39b007(0x28e)](),$gameTemp[_0x39b007(0x445)](_0x5a1b27),VisuMZ[_0x39b007(0x5aa)][_0x39b007(0x78d)][_0x39b007(0x809)](this,_0x5a1b27);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x78a)]=Game_Map['prototype'][_0x41f3d3(0x657)],Game_Map[_0x41f3d3(0x1fd)]['setup']=function(_0x1d8ba5){const _0x540d42=_0x41f3d3;VisuMZ[_0x540d42(0x5aa)][_0x540d42(0x78a)][_0x540d42(0x809)](this,_0x1d8ba5),this[_0x540d42(0x5e9)](),this['setupCoreEngine'](_0x1d8ba5);},Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x553)]=function(){const _0x1eb6bc=_0x41f3d3;this['_hideTileShadows']=VisuMZ[_0x1eb6bc(0x5aa)]['Settings'][_0x1eb6bc(0x2d1)][_0x1eb6bc(0x9fd)]||![];const _0x4f88e1=VisuMZ[_0x1eb6bc(0x5aa)][_0x1eb6bc(0x5b1)][_0x1eb6bc(0x8db)],_0x1ad487=$dataMap?$dataMap[_0x1eb6bc(0x212)]||'':'';if(_0x1ad487[_0x1eb6bc(0x420)](/<SHOW TILE SHADOWS>/i))this[_0x1eb6bc(0xa0b)]=![];else _0x1ad487['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x1eb6bc(0xa0b)]=!![]);if(_0x1ad487[_0x1eb6bc(0x420)](/<SCROLL LOCK X>/i))this[_0x1eb6bc(0x979)]()['centerX']=!![],this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x88a)]=_0x4f88e1['DisplayLockX'];else{if(_0x1ad487[_0x1eb6bc(0x420)](/<SCROLL LOCK X: (.*?)>/i)){if(_0x1eb6bc(0x5f9)===_0x1eb6bc(0x5f9))this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x2b9)]=!![],this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x88a)]=Number(RegExp['$1']);else{const _0x4329f9=_0x784e0f['_pictureCoordinatesMode'],_0x45568a=_0x158132[_0x1eb6bc(0x4af)](_0x4329f9);return _0x45568a?this[_0x1eb6bc(0x59b)]!==_0x45568a['_origin']||this['_lastX']!==_0x45568a['_x']||this['_lastY']!==_0x45568a['_y']:![];}}}if(_0x1ad487[_0x1eb6bc(0x420)](/<SCROLL LOCK Y>/i))this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x820)]=!![],this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x2fd)]=_0x4f88e1['DisplayLockY'];else _0x1ad487[_0x1eb6bc(0x420)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x820)]=!![],this[_0x1eb6bc(0x979)]()[_0x1eb6bc(0x2fd)]=Number(RegExp['$1']));},Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x4e8)]=function(){const _0x47d590=_0x41f3d3;if(this[_0x47d590(0xa0b)]===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},Game_Map[_0x41f3d3(0x1fd)]['checkCoreEngineDisplayCenter']=function(){const _0x196b6f=_0x41f3d3,_0x178149=VisuMZ['CoreEngine'][_0x196b6f(0x5b1)][_0x196b6f(0x8db)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x178149[_0x196b6f(0x5f3)]){if('OibfD'!=='OibfD')this[_0x196b6f(0x98c)]=_0x196b6f(0x885);else{const _0x2ba664=Graphics['width']/this[_0x196b6f(0x67b)]();_0x2ba664%0x1!==0x0&&Math[_0x196b6f(0xa57)](_0x2ba664)===this[_0x196b6f(0x665)]()&&!this[_0x196b6f(0x79d)]()&&(this[_0x196b6f(0x9f3)][_0x196b6f(0x2b9)]=!![],this['_centerCameraCheck'][_0x196b6f(0x88a)]=_0x178149[_0x196b6f(0x370)]||0x0);}}if(_0x178149['AutoScrollLockY']){const _0x9fdc8c=Graphics[_0x196b6f(0x4f1)]/this[_0x196b6f(0xa49)]();if(_0x9fdc8c%0x1!==0x0&&Math[_0x196b6f(0xa57)](_0x9fdc8c)===this[_0x196b6f(0x4f1)]()&&!this[_0x196b6f(0x908)]()){if(_0x196b6f(0x41c)==='ytyCY')return this[_0x196b6f(0xa1f)]=this[_0x196b6f(0xa1f)]||{},this['_cache'][_0x391ba7]!==_0x3727b5;else this[_0x196b6f(0x9f3)][_0x196b6f(0x820)]=!![],this[_0x196b6f(0x9f3)][_0x196b6f(0x2fd)]=_0x178149['DisplayLockY']||0x0;}}},Game_Map[_0x41f3d3(0x1fd)]['centerCameraCheckData']=function(){const _0x3aed54=_0x41f3d3;if(this[_0x3aed54(0x9f3)]===undefined)this[_0x3aed54(0x5e9)]();return this[_0x3aed54(0x9f3)];},VisuMZ['CoreEngine'][_0x41f3d3(0x97b)]=Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x9bd)],Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x9bd)]=function(_0x61972c){const _0x3bdcd3=_0x41f3d3;if(this[_0x3bdcd3(0x979)]()['centerY']&&$gameScreen['zoomScale']()===0x1){if('tJCUc'==='QUulV')return _0x4d01e6[_0x3bdcd3(0x1fb)][_0x3bdcd3(0x641)]['call'](this);else{this[_0x3bdcd3(0x7ca)]=this['centerCameraCheckData']()['displayY'];return;}}VisuMZ[_0x3bdcd3(0x5aa)][_0x3bdcd3(0x97b)]['call'](this,_0x61972c);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x8b5)]=Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x989)],Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x989)]=function(_0x4fecf8){const _0x3ad485=_0x41f3d3;if(this[_0x3ad485(0x979)]()[_0x3ad485(0x2b9)]&&$gameScreen[_0x3ad485(0x644)]()===0x1){this[_0x3ad485(0x57d)]=this['centerCameraCheckData']()[_0x3ad485(0x88a)];return;}VisuMZ['CoreEngine']['Game_Map_scrollLeft'][_0x3ad485(0x809)](this,_0x4fecf8);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x9ce)]=Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x770)],Game_Map['prototype']['scrollRight']=function(_0x1eb487){const _0x4cf889=_0x41f3d3;if(this[_0x4cf889(0x979)]()[_0x4cf889(0x2b9)]&&$gameScreen[_0x4cf889(0x644)]()===0x1){this[_0x4cf889(0x57d)]=this[_0x4cf889(0x979)]()[_0x4cf889(0x88a)];return;}VisuMZ[_0x4cf889(0x5aa)]['Game_Map_scrollRight'][_0x4cf889(0x809)](this,_0x1eb487);},VisuMZ['CoreEngine'][_0x41f3d3(0x511)]=Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x3cb)],Game_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x3cb)]=function(_0x52fc03){const _0x389695=_0x41f3d3;if(this[_0x389695(0x979)]()[_0x389695(0x820)]&&$gameScreen[_0x389695(0x644)]()===0x1){this[_0x389695(0x7ca)]=this[_0x389695(0x979)]()[_0x389695(0x2fd)];return;}VisuMZ['CoreEngine'][_0x389695(0x511)][_0x389695(0x809)](this,_0x52fc03);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0xa4a)]=Game_Character[_0x41f3d3(0x1fd)][_0x41f3d3(0x699)],Game_Character['prototype']['processMoveCommand']=function(_0x4167bb){const _0x4858db=_0x41f3d3;try{if(_0x4858db(0x9c5)===_0x4858db(0x4e3)){if(this[_0x4858db(0x7b8)]===_0x4858db(0x3eb))return;if(_0x9b7721[_0x4858db(0x8c8)]())return;_0x64cff7[_0x4858db(0x5aa)][_0x4858db(0x6d2)][_0x4858db(0x809)](this),this['switchModes'](_0x4858db(0x890));}else VisuMZ[_0x4858db(0x5aa)][_0x4858db(0xa4a)][_0x4858db(0x809)](this,_0x4167bb);}catch(_0x5c60f3){if(_0x4858db(0x9ed)!==_0x4858db(0x9f2)){if($gameTemp['isPlaytest']())console[_0x4858db(0x5e6)](_0x5c60f3);}else{const _0x4fd2f7=_0x1ca772[_0x4858db(0x2fd)]()*_0x50605b[_0x4858db(0xa49)]();return(this['_y']-_0x4fd2f7)*_0x240650['zoomScale']();}}},Game_Player[_0x41f3d3(0x1fd)][_0x41f3d3(0x4a8)]=function(){const _0x510dcd=_0x41f3d3,_0x438e82=$gameMap['encounterStep']();this[_0x510dcd(0x6f8)]=Math[_0x510dcd(0x5b9)](_0x438e82)+Math[_0x510dcd(0x5b9)](_0x438e82)+this[_0x510dcd(0x9e6)]();},Game_Player[_0x41f3d3(0x1fd)][_0x41f3d3(0x9e6)]=function(){const _0x1e8f0b=_0x41f3d3;if($dataMap&&$dataMap['note']&&$dataMap[_0x1e8f0b(0x212)][_0x1e8f0b(0x420)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x1e8f0b(0x476)===_0x1e8f0b(0x1c0)){let _0x3aac5b=0x0;for(const _0x40283d of _0x3aa8ec['CoreEngine'][_0x1e8f0b(0x5b1)]['Param'][_0x1e8f0b(0xa47)]){const _0x3f7940=this[_0x1e8f0b(0x505)](),_0x2380a0=this['paramY'](_0x3aac5b);this[_0x1e8f0b(0x6cc)](_0x3f7940,_0x2380a0,_0x40283d),_0x3aac5b++;}}else return Number(RegExp['$1']);}else return VisuMZ[_0x1e8f0b(0x5aa)][_0x1e8f0b(0x5b1)][_0x1e8f0b(0x2d1)]['EncounterRateMinimum'];},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x41f3d3(0x1fd)][_0x41f3d3(0x61f)],Game_Event['prototype'][_0x41f3d3(0x61f)]=function(_0x15d4b2,_0x1c2c37){const _0x3492dd=_0x41f3d3;if(this[_0x3492dd(0x6af)]()){if('ALkqX'==='tOnne')this['_battlerName']='';else return this[_0x3492dd(0x769)](_0x15d4b2,_0x1c2c37);}else{if('RgOhl'!==_0x3492dd(0x21d))return VisuMZ[_0x3492dd(0x5aa)]['Game_Event_isCollidedWithEvents'][_0x3492dd(0x809)](this,_0x15d4b2,_0x1c2c37);else this[_0x3492dd(0x347)][_0x3492dd(0x564)](_0x3ec5c3[_0x3492dd(0x1fb)][_0x3492dd(0x42f)]);}},Game_Event['prototype'][_0x41f3d3(0x6af)]=function(){const _0x167484=_0x41f3d3;return VisuMZ[_0x167484(0x5aa)][_0x167484(0x5b1)]['QoL'][_0x167484(0x276)];},Game_Event['prototype']['checkSmartEventCollision']=function(_0x34c324,_0x470923){const _0x17e1cf=_0x41f3d3;if(!this[_0x17e1cf(0x910)]())return![];else{const _0x4a4c1b=$gameMap[_0x17e1cf(0x235)](_0x34c324,_0x470923)[_0x17e1cf(0x260)](_0x38e7df=>_0x38e7df[_0x17e1cf(0x910)]());return _0x4a4c1b[_0x17e1cf(0x9b7)]>0x0;}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x523)]=Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x846)],Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x846)]=function(_0x55e151){const _0x528e4d=_0x41f3d3,_0x3b7acb=this[_0x528e4d(0x59d)]();if(_0x3b7acb[_0x528e4d(0x420)](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0x528e4d(0xa3f)!==_0x528e4d(0x218))return this[_0x528e4d(0x483)](_0x3b7acb);else this[_0x528e4d(0x283)]();}else{if(_0x528e4d(0x37f)!==_0x528e4d(0x28c))return VisuMZ[_0x528e4d(0x5aa)]['Game_Interpreter_command105'][_0x528e4d(0x809)](this,_0x55e151);else this[_0x528e4d(0x3e6)]()&&this['subject']()[_0x528e4d(0x7fe)]()?_0x273d7d['CoreEngine'][_0x528e4d(0x749)][_0x528e4d(0x809)](this):this[_0x528e4d(0x3b1)]();}},Game_Interpreter['prototype'][_0x41f3d3(0x59d)]=function(){const _0x1942b0=_0x41f3d3;let _0x20f664='',_0x2e9f96=this['_index']+0x1;while(this['_list'][_0x2e9f96]&&this[_0x1942b0(0x7f7)][_0x2e9f96][_0x1942b0(0x775)]===0x195){if('pWSVz'===_0x1942b0(0x3c8))return this[_0x1942b0(0x742)]()[_0x1942b0(0x713)];else _0x20f664+=this[_0x1942b0(0x7f7)][_0x2e9f96][_0x1942b0(0x9f0)][0x0]+'\x0a',_0x2e9f96++;}return _0x20f664;},Game_Interpreter['prototype'][_0x41f3d3(0x483)]=function(_0x3731bc){const _0xe91f69=_0x41f3d3;try{_0xe91f69(0x500)===_0xe91f69(0x3a0)?this['_lastPluginCommandInterpreter']=_0x4433d0:eval(_0x3731bc);}catch(_0x30720e){if($gameTemp[_0xe91f69(0x67d)]()){if('mhOnX'===_0xe91f69(0xa01))console[_0xe91f69(0x5e6)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0xe91f69(0x5e6)](_0x30720e);else return _0x50cc15['getInputMultiButtonStrings'](_0xe91f69(0x510),'pagedown');}}return!![];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x954)]=Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x43b)],Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x43b)]=function(_0x1f8d7a){const _0x31b8c8=_0x41f3d3;try{VisuMZ['CoreEngine'][_0x31b8c8(0x954)][_0x31b8c8(0x809)](this,_0x1f8d7a);}catch(_0x90de2c){$gameTemp[_0x31b8c8(0x67d)]()&&(console[_0x31b8c8(0x5e6)](_0x31b8c8(0x955)),console[_0x31b8c8(0x5e6)](_0x90de2c)),this['skipBranch']();}return!![];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x51f)]=Game_Interpreter[_0x41f3d3(0x1fd)]['command122'],Game_Interpreter[_0x41f3d3(0x1fd)]['command122']=function(_0x36694d){const _0x39ade9=_0x41f3d3;try{VisuMZ[_0x39ade9(0x5aa)][_0x39ade9(0x51f)][_0x39ade9(0x809)](this,_0x36694d);}catch(_0x393b13){$gameTemp['isPlaytest']()&&(console[_0x39ade9(0x5e6)](_0x39ade9(0x5d4)),console['log'](_0x393b13));}return!![];},VisuMZ['CoreEngine'][_0x41f3d3(0x31b)]=Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x912)],Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x912)]=function(){const _0xe67f0f=_0x41f3d3;try{VisuMZ['CoreEngine']['Game_Interpreter_command355']['call'](this);}catch(_0xd8067){_0xe67f0f(0x737)==='VBpyB'?_0x4a7219[_0xe67f0f(0x1f2)]():$gameTemp[_0xe67f0f(0x67d)]()&&(_0xe67f0f(0x6d9)!=='BdvWK'?(_0x3bec5c['volume']=_0x5a9a62,_0x13e656['pos']=_0x1f4553['_bgsBuffer'][_0xe67f0f(0x9c2)](),_0x4d5dfd[_0xe67f0f(0x385)](_0xde4e6c),_0x4199b0[_0xe67f0f(0x30e)](_0x2ad0c0,_0x8d22b1[_0xe67f0f(0x190)]),_0x55b504[_0xe67f0f(0x6e7)][_0xe67f0f(0x8dc)](_0x3dfb3b[_0xe67f0f(0x190)])):(console[_0xe67f0f(0x5e6)]('Script\x20Call\x20Error'),console['log'](_0xd8067)));}return!![];},VisuMZ['CoreEngine'][_0x41f3d3(0x797)]=Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x990)],Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x990)]=function(_0x1a80cf){const _0x53ec54=_0x41f3d3;return $gameTemp[_0x53ec54(0x1da)](this),VisuMZ[_0x53ec54(0x5aa)]['Game_Interpreter_PluginCommand'][_0x53ec54(0x809)](this,_0x1a80cf);},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x1cd)]=function(){const _0x4ea75c=_0x41f3d3;return VisuMZ[_0x4ea75c(0x5aa)]['Settings']['UI'][_0x4ea75c(0x392)];},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x60a)]=function(){const _0x4f4609=_0x41f3d3;return VisuMZ['CoreEngine']['Settings']['UI'][_0x4f4609(0x2c0)];},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x781)]=function(){const _0x14b62c=_0x41f3d3;return VisuMZ[_0x14b62c(0x5aa)][_0x14b62c(0x5b1)]['UI'][_0x14b62c(0x302)];},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x60f)]=function(){const _0x258b91=_0x41f3d3;return VisuMZ[_0x258b91(0x5aa)][_0x258b91(0x5b1)]['UI'][_0x258b91(0xa64)];},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x708)]=function(){const _0x320183=_0x41f3d3;return VisuMZ[_0x320183(0x5aa)]['Settings']['UI']['CommandWidth'];},Scene_Base[_0x41f3d3(0x1fd)]['buttonAreaHeight']=function(){const _0x15ca21=_0x41f3d3;return VisuMZ[_0x15ca21(0x5aa)][_0x15ca21(0x5b1)]['UI'][_0x15ca21(0x4d2)];},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x6d0)]=function(){const _0x3fe091=_0x41f3d3;return VisuMZ['CoreEngine'][_0x3fe091(0x5b1)][_0x3fe091(0x1c6)]['EnableMasking'];},VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']=Scene_Base[_0x41f3d3(0x1fd)]['createWindowLayer'],Scene_Base[_0x41f3d3(0x1fd)]['createWindowLayer']=function(){const _0x4bf39f=_0x41f3d3;VisuMZ[_0x4bf39f(0x5aa)][_0x4bf39f(0x8eb)]['call'](this),this['createButtonAssistWindow'](),this['_windowLayer']['x']=Math[_0x4bf39f(0x92b)](this[_0x4bf39f(0x7bf)]['x']),this[_0x4bf39f(0x7bf)]['y']=Math[_0x4bf39f(0x92b)](this[_0x4bf39f(0x7bf)]['y']);},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x919)]=function(){},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x886)]=function(){const _0x90318a=_0x41f3d3;return TextManager[_0x90318a(0x870)](_0x90318a(0x510),_0x90318a(0x4de));},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x349)]=function(){const _0x40e6c2=_0x41f3d3;return TextManager[_0x40e6c2(0x359)](_0x40e6c2(0x84c));},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x96a)]=function(){const _0x353ea6=_0x41f3d3;return TextManager[_0x353ea6(0x359)](_0x353ea6(0x21e));},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x834)]=function(){const _0x142ad8=_0x41f3d3;return TextManager[_0x142ad8(0x359)]('ok');},Scene_Base[_0x41f3d3(0x1fd)]['buttonAssistKey5']=function(){const _0x5cbbbd=_0x41f3d3;return TextManager['getInputButtonString'](_0x5cbbbd(0x4d4));},Scene_Base[_0x41f3d3(0x1fd)]['buttonAssistText1']=function(){const _0x3b1697=_0x41f3d3;if(this[_0x3b1697(0x844)]&&this[_0x3b1697(0x844)]['visible'])return TextManager['buttonAssistSwitch'];else{if(_0x3b1697(0x57b)===_0x3b1697(0x3b0)){_0x2f0cf7[_0x3b1697(0x5aa)]['Settings'][_0x3b1697(0x20d)][_0x3b1697(0x251)][_0x3b1697(0x743)]['call'](this);if(_0x531149['subtitle']!==''&&_0x482e9c['subtitle']!==_0x3b1697(0x429))this[_0x3b1697(0x612)]();if(_0x45a30a[_0x3b1697(0x8ad)]!==''&&_0x2b777d[_0x3b1697(0x8ad)]!==_0x3b1697(0x97d))this[_0x3b1697(0x1b3)]();}else return'';}},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x362)]=function(){return'';},Scene_Base['prototype'][_0x41f3d3(0x678)]=function(){return'';},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x60b)]=function(){return TextManager['buttonAssistOk'];},Scene_Base['prototype'][_0x41f3d3(0x987)]=function(){const _0x2404cc=_0x41f3d3;return TextManager[_0x2404cc(0x939)];},Scene_Base[_0x41f3d3(0x1fd)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x9db)]=function(){return 0x0;},Scene_Base['prototype'][_0x41f3d3(0xa5f)]=function(){return 0x0;},Scene_Base['prototype'][_0x41f3d3(0x8f1)]=function(){return 0x0;},Scene_Base[_0x41f3d3(0x1fd)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x6b3)]=Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x2e4)],Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x2e4)]=function(){const _0x1c0254=_0x41f3d3;VisuMZ[_0x1c0254(0x5aa)][_0x1c0254(0x6b3)][_0x1c0254(0x809)](this),this[_0x1c0254(0x561)]();},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x561)]=function(){const _0x2bd68e=_0x41f3d3,_0x2272c9=[_0x2bd68e(0x4b8),_0x2bd68e(0x496),'battlebacks2',_0x2bd68e(0x255),_0x2bd68e(0x8d0),_0x2bd68e(0x428),_0x2bd68e(0x33d),_0x2bd68e(0x7b2),_0x2bd68e(0x921),_0x2bd68e(0x310),_0x2bd68e(0x96d),_0x2bd68e(0x3ae),_0x2bd68e(0x490),_0x2bd68e(0x343)];for(const _0x3db5d7 of _0x2272c9){const _0x46c790=VisuMZ[_0x2bd68e(0x5aa)][_0x2bd68e(0x5b1)][_0x2bd68e(0x7d4)][_0x3db5d7],_0x21f93b=_0x2bd68e(0x52f)[_0x2bd68e(0x382)](_0x3db5d7);for(const _0x509972 of _0x46c790){ImageManager[_0x2bd68e(0xa48)](_0x21f93b,_0x509972);}}},VisuMZ['CoreEngine'][_0x41f3d3(0x5a6)]=Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x495)],Scene_Boot[_0x41f3d3(0x1fd)]['startNormalGame']=function(){const _0x247b7e=_0x41f3d3;Utils[_0x247b7e(0x65b)](_0x247b7e(0x1ae))&&VisuMZ[_0x247b7e(0x5aa)]['Settings'][_0x247b7e(0x2d1)][_0x247b7e(0x917)]?'SbosZ'===_0x247b7e(0x9a8)?this['startAutoNewGame']():this[_0x247b7e(0x895)][_0x247b7e(0x564)](_0x52537f[_0x247b7e(0x1fb)][_0x247b7e(0x437)]):'pGlJL'===_0x247b7e(0x976)?_0x14d145+=_0x312149:VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x247b7e(0x809)](this);},Scene_Boot['prototype'][_0x41f3d3(0x2f9)]=function(){const _0x29e077=_0x41f3d3;DataManager[_0x29e077(0x355)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x2c5)]=function(){const _0x3a3acb=_0x41f3d3,_0xabc435=$dataSystem['advanced'][_0x3a3acb(0x6c5)],_0x37df71=$dataSystem[_0x3a3acb(0x254)][_0x3a3acb(0x358)],_0x11ca5d=VisuMZ['CoreEngine']['Settings']['UI'][_0x3a3acb(0x391)];Graphics['boxWidth']=_0xabc435-_0x11ca5d*0x2,Graphics[_0x3a3acb(0x6bf)]=_0x37df71-_0x11ca5d*0x2,this[_0x3a3acb(0xa4f)]();},VisuMZ['CoreEngine'][_0x41f3d3(0x243)]=Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0x544)],Scene_Boot[_0x41f3d3(0x1fd)]['updateDocumentTitle']=function(){const _0x58495d=_0x41f3d3;this[_0x58495d(0x901)]()?_0x58495d(0x465)!==_0x58495d(0x772)?this[_0x58495d(0x8fb)]():(this[_0x58495d(0x347)]&&this[_0x58495d(0x347)][_0x58495d(0x564)](_0x3d117d[_0x58495d(0x1fb)][_0x58495d(0x42f)]),this[_0x58495d(0x204)]&&this[_0x58495d(0x204)][_0x58495d(0x564)](_0xa94723['layoutSettings'][_0x58495d(0xa16)])):VisuMZ[_0x58495d(0x5aa)][_0x58495d(0x243)]['call'](this);},Scene_Boot['prototype']['isFullDocumentTitle']=function(){const _0x26ec1c=_0x41f3d3;if(Scene_Title[_0x26ec1c(0x9f4)]==='')return![];if(Scene_Title[_0x26ec1c(0x9f4)]===_0x26ec1c(0x429))return![];if(Scene_Title[_0x26ec1c(0x8ad)]==='')return![];if(Scene_Title[_0x26ec1c(0x8ad)]===_0x26ec1c(0x97d))return![];return!![];},Scene_Boot['prototype']['makeDocumentTitle']=function(){const _0x38e728=_0x41f3d3,_0x5b5364=$dataSystem[_0x38e728(0x87a)],_0x351018=Scene_Title[_0x38e728(0x9f4)]||'',_0x1a35c3=Scene_Title[_0x38e728(0x8ad)]||'',_0xe70b16=VisuMZ[_0x38e728(0x5aa)]['Settings']['MenuLayout'][_0x38e728(0x251)][_0x38e728(0x3b2)],_0x1c132c=_0xe70b16['format'](_0x5b5364,_0x351018,_0x1a35c3);document[_0x38e728(0x792)]=_0x1c132c;},Scene_Boot[_0x41f3d3(0x1fd)][_0x41f3d3(0xa4f)]=function(){const _0xf14717=_0x41f3d3;if(VisuMZ[_0xf14717(0x5aa)]['Settings']['UI'][_0xf14717(0x5a5)]){if(_0xf14717(0x379)===_0xf14717(0x576))this[_0xf14717(0x5c6)](_0x5a3530,_0x53a132+0x2,_0x404af2+0x2),_0x3cf2bb-=_0x491a4b[_0xf14717(0x519)]+0x4,_0x17f71a+=_0x47ad4f[_0xf14717(0x519)]+0x4;else{const _0x34ecee=Graphics[_0xf14717(0x665)]-Graphics['boxWidth']-VisuMZ[_0xf14717(0x5aa)][_0xf14717(0x5b1)]['UI']['BoxMargin']*0x2,_0x5b6004=Sprite_Button['prototype'][_0xf14717(0x226)][_0xf14717(0x809)](this)*0x4;if(_0x34ecee>=_0x5b6004)SceneManager['setSideButtonLayout'](!![]);}}},Scene_Title[_0x41f3d3(0x9f4)]=VisuMZ[_0x41f3d3(0x5aa)]['Settings'][_0x41f3d3(0x20d)]['Title'][_0x41f3d3(0x429)],Scene_Title[_0x41f3d3(0x8ad)]=VisuMZ[_0x41f3d3(0x5aa)]['Settings'][_0x41f3d3(0x20d)][_0x41f3d3(0x251)][_0x41f3d3(0x858)],Scene_Title[_0x41f3d3(0x39e)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x89f)],VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x89d)]=Scene_Title[_0x41f3d3(0x1fd)][_0x41f3d3(0x743)],Scene_Title[_0x41f3d3(0x1fd)][_0x41f3d3(0x743)]=function(){const _0x54f301=_0x41f3d3;VisuMZ[_0x54f301(0x5aa)][_0x54f301(0x5b1)][_0x54f301(0x20d)]['Title']['drawGameTitle'][_0x54f301(0x809)](this);if(Scene_Title[_0x54f301(0x9f4)]!==''&&Scene_Title[_0x54f301(0x9f4)]!==_0x54f301(0x429))this[_0x54f301(0x612)]();if(Scene_Title[_0x54f301(0x8ad)]!==''&&Scene_Title[_0x54f301(0x8ad)]!==_0x54f301(0x97d))this[_0x54f301(0x1b3)]();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x1a50dc=_0x41f3d3;VisuMZ[_0x1a50dc(0x5aa)]['Settings'][_0x1a50dc(0x20d)][_0x1a50dc(0x251)][_0x1a50dc(0x612)][_0x1a50dc(0x809)](this);},Scene_Title[_0x41f3d3(0x1fd)][_0x41f3d3(0x1b3)]=function(){const _0x2e1b29=_0x41f3d3;VisuMZ[_0x2e1b29(0x5aa)][_0x2e1b29(0x5b1)][_0x2e1b29(0x20d)][_0x2e1b29(0x251)]['drawGameVersion'][_0x2e1b29(0x809)](this);},Scene_Title[_0x41f3d3(0x1fd)]['createCommandWindow']=function(){const _0x35d062=_0x41f3d3;this[_0x35d062(0x446)]();const _0x5b226c=$dataSystem[_0x35d062(0x7b6)][_0x35d062(0x926)],_0x58be0c=this['commandWindowRect']();this[_0x35d062(0x7ae)]=new Window_TitleCommand(_0x58be0c),this[_0x35d062(0x7ae)][_0x35d062(0x564)](_0x5b226c);const _0x17d105=this[_0x35d062(0x434)]();this[_0x35d062(0x7ae)][_0x35d062(0x608)](_0x17d105['x'],_0x17d105['y'],_0x17d105[_0x35d062(0x665)],_0x17d105[_0x35d062(0x4f1)]),this['_commandWindow']['createContents'](),this[_0x35d062(0x7ae)]['refresh'](),this[_0x35d062(0x7ae)]['selectLast'](),this[_0x35d062(0x659)](this[_0x35d062(0x7ae)]);},Scene_Title['prototype']['commandWindowRows']=function(){const _0x4c5d89=_0x41f3d3;return this[_0x4c5d89(0x7ae)]?this['_commandWindow'][_0x4c5d89(0x535)]():_0x4c5d89(0x9f5)===_0x4c5d89(0x9f5)?VisuMZ['CoreEngine'][_0x4c5d89(0x5b1)][_0x4c5d89(0x835)]['length']:_0x5c9b9a['CoreEngine'][_0x4c5d89(0x5b1)][_0x4c5d89(0x478)][_0x4c5d89(0x7e4)];},Scene_Title[_0x41f3d3(0x1fd)][_0x41f3d3(0x434)]=function(){const _0x57c9e7=_0x41f3d3;return VisuMZ['CoreEngine'][_0x57c9e7(0x5b1)][_0x57c9e7(0x20d)][_0x57c9e7(0x251)][_0x57c9e7(0x641)][_0x57c9e7(0x809)](this);},Scene_Title[_0x41f3d3(0x1fd)][_0x41f3d3(0x446)]=function(){const _0x39fb82=_0x41f3d3;for(const _0x39981e of Scene_Title['pictureButtons']){if(_0x39fb82(0x2e1)===_0x39fb82(0x2e1)){const _0x5c5825=new Sprite_TitlePictureButton(_0x39981e);this[_0x39fb82(0x65e)](_0x5c5825);}else _0xfae99a+=_0x2dd100,_0x34903f+='%1〘Choice\x20Cancel〙%1'[_0x39fb82(0x382)](_0x518e52);}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x41f)]=Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)],Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)]=function(){const _0x203353=_0x41f3d3;VisuMZ[_0x203353(0x5aa)][_0x203353(0x41f)][_0x203353(0x809)](this),$gameTemp[_0x203353(0x28e)](),this[_0x203353(0x3bc)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x892)]=Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x1b7)],Scene_Map[_0x41f3d3(0x1fd)]['updateMainMultiply']=function(){const _0x524ccb=_0x41f3d3;VisuMZ[_0x524ccb(0x5aa)][_0x524ccb(0x892)]['call'](this);if($gameTemp[_0x524ccb(0x7e6)]&&!$gameMessage[_0x524ccb(0x951)]()){if(_0x524ccb(0x725)==='SfDWF')return _0x9e7eed['CoreEngine'][_0x524ccb(0x5b1)]['UI']['BottomHelp'];else this['updateMain'](),SceneManager[_0x524ccb(0x53d)]();}},Scene_Map['prototype'][_0x41f3d3(0x682)]=function(){const _0x39a3d6=_0x41f3d3;Scene_Message[_0x39a3d6(0x1fd)][_0x39a3d6(0x682)][_0x39a3d6(0x809)](this),!SceneManager[_0x39a3d6(0x6c3)](Scene_Battle)&&(this[_0x39a3d6(0x5ab)][_0x39a3d6(0x314)](),this[_0x39a3d6(0x318)][_0x39a3d6(0x25d)](),this[_0x39a3d6(0x7bf)][_0x39a3d6(0x2f6)]=![],SceneManager['snapForBackground']()),$gameScreen[_0x39a3d6(0x60c)](),this[_0x39a3d6(0x3bc)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x721)]=Scene_Map['prototype'][_0x41f3d3(0x95c)],Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x95c)]=function(){const _0x262160=_0x41f3d3;VisuMZ[_0x262160(0x5aa)][_0x262160(0x721)][_0x262160(0x809)](this),SceneManager[_0x262160(0x948)]()&&this[_0x262160(0x639)]();},Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x639)]=function(){const _0x15918d=_0x41f3d3;this[_0x15918d(0x95d)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x41f3d3(0x5aa)]['Scene_Map_updateScene']=Scene_Map[_0x41f3d3(0x1fd)]['updateScene'],Scene_Map[_0x41f3d3(0x1fd)]['updateScene']=function(){const _0x15d319=_0x41f3d3;VisuMZ['CoreEngine'][_0x15d319(0x7f4)][_0x15d319(0x809)](this),this[_0x15d319(0x8df)]();},Scene_Map[_0x41f3d3(0x1fd)]['updateDashToggle']=function(){const _0x37b66f=_0x41f3d3;Input['isTriggered'](_0x37b66f(0x5c1))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x37b66f(0x2e8)],ConfigManager[_0x37b66f(0x436)]());},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2e6)]=Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x6a6)],Scene_Map['prototype']['updateMain']=function(){const _0x5b0122=_0x41f3d3;VisuMZ[_0x5b0122(0x5aa)][_0x5b0122(0x2e6)]['call'](this),this[_0x5b0122(0x709)]();},Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x3bc)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x709)]=function(){const _0x4f59a1=_0x41f3d3;if(!this[_0x4f59a1(0x319)])return;for(const _0x1049c7 of this[_0x4f59a1(0x319)]){_0x1049c7&&_0x1049c7[_0x4f59a1(0x314)]();}},Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x540)]=function(_0x7eb02e){const _0x11764f=_0x41f3d3,_0x2dce84=$dataCommonEvents[_0x7eb02e];if(!_0x2dce84)return;const _0x327db6=new Game_OnceParallelInterpreter();this[_0x11764f(0x8d3)](_0x327db6),_0x327db6[_0x11764f(0x637)](_0x7eb02e);},Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x8d3)]=function(_0x3abdef){const _0xe2c344=_0x41f3d3;this['_onceParallelInterpreters']=this[_0xe2c344(0x319)]||[],this[_0xe2c344(0x319)][_0xe2c344(0x7df)](_0x3abdef);},Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x206)]=function(_0x25b1be){const _0x5566c3=_0x41f3d3;this[_0x5566c3(0x319)]=this[_0x5566c3(0x319)]||[],this[_0x5566c3(0x319)]['remove'](_0x25b1be);};function Game_OnceParallelInterpreter(){const _0x11ca80=_0x41f3d3;this[_0x11ca80(0x927)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x41f3d3(0x65d)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x9a5)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x41f3d3(0x1fd)]['setCommonEvent']=function(_0x5a0dd7){const _0xf49873=_0x41f3d3,_0x41d3a1=$dataCommonEvents[_0x5a0dd7];if(_0x41d3a1)this[_0xf49873(0x657)](_0x41d3a1['list'],0x0);else{if(_0xf49873(0xa39)!==_0xf49873(0xa39)){const _0x3d7b01=_0xf49873(0x7fb);this['_colorCache']=this[_0xf49873(0x33c)]||{};if(this[_0xf49873(0x33c)][_0x3d7b01])return this[_0xf49873(0x33c)][_0x3d7b01];const _0x33bd72=_0x47b213[_0xf49873(0x5aa)][_0xf49873(0x5b1)][_0xf49873(0x546)][_0xf49873(0xa40)];return this['getColorDataFromPluginParameters'](_0x3d7b01,_0x33bd72);}else this[_0xf49873(0x682)]();}},Game_OnceParallelInterpreter[_0x41f3d3(0x1fd)]['terminate']=function(){const _0x56356b=_0x41f3d3;if(!SceneManager[_0x56356b(0x736)]())return;SceneManager[_0x56356b(0x2b5)][_0x56356b(0x206)](this),Game_Interpreter[_0x56356b(0x1fd)][_0x56356b(0x682)]['call'](this);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x22f)]=Scene_MenuBase['prototype']['helpAreaTop'],Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x3fc)]=function(){const _0x1e086b=_0x41f3d3;let _0x16bdd8=0x0;return SceneManager[_0x1e086b(0x8d9)]()?_0x16bdd8=this[_0x1e086b(0x1a7)]():_0x1e086b(0x8a6)!=='cnywF'?(this[_0x1e086b(0x7d9)]=_0x34b35d[_0x1e086b(0x7ea)],_0x320871[_0x1e086b(0x5aa)]['Input_onKeyDown'][_0x1e086b(0x809)](this,_0x1a00d1),this[_0x1e086b(0x534)](null)):_0x16bdd8=VisuMZ[_0x1e086b(0x5aa)][_0x1e086b(0x22f)][_0x1e086b(0x809)](this),_0x16bdd8;},Scene_MenuBase['prototype'][_0x41f3d3(0x1a7)]=function(){const _0x37bf29=_0x41f3d3;if(this[_0x37bf29(0x60a)]()){if(_0x37bf29(0x4f4)!==_0x37bf29(0x409))return this[_0x37bf29(0x99a)]();else{const _0x41933b=_0xccbe34[_0x37bf29(0x3e3)]()[_0x37bf29(0x23b)][_0x37bf29(0x572)](/\\I\[(\d+)\]/gi,'');this[_0x37bf29(0x7d1)](_0x41933b,_0xad3ad0,_0xab6c70,_0x19396a);}}else return 0x0;},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x8ce)],Scene_MenuBase['prototype'][_0x41f3d3(0x8ce)]=function(){const _0x237c9d=_0x41f3d3;if(SceneManager[_0x237c9d(0x8d9)]()){if(_0x237c9d(0x6ea)===_0x237c9d(0x6ea))return this[_0x237c9d(0x46a)]();else this[_0x237c9d(0x716)](_0x21d1c4(_0x255342['$1']));}else return VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop'][_0x237c9d(0x809)](this);},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x46a)]=function(){const _0x1cb897=_0x41f3d3;if(!this[_0x1cb897(0x60a)]())return this['helpAreaBottom']();else{if(this[_0x1cb897(0x6dc)]()&&this[_0x1cb897(0x587)]()===_0x1cb897(0x411)){if(_0x1cb897(0x326)===_0x1cb897(0x53f)){const _0x49f5c8=this[_0x1cb897(0x348)](_0x4bdaf7),_0x3e2fb0=new(_0x49f5c8?_0x24865d:_0x455439)(),_0x3eb553=this[_0x1cb897(0x8cf)](_0x598562),_0x2c4fc1=this[_0x1cb897(0x2cf)](),_0x40e0c0=_0x1bf5d1>_0x2c4fc1?this[_0x1cb897(0x68c)]():null;this[_0x1cb897(0x596)](_0x5edd04[0x0])&&(_0x11c863=!_0x378833),_0x3e2fb0['targetObjects']=_0x7daa96,_0x3e2fb0[_0x1cb897(0x657)](_0x3eb553,_0x373af4,_0x3472a9,_0x62ae3e,_0x40e0c0),this[_0x1cb897(0x5e3)](_0x3e2fb0),this['_animationSprites']['push'](_0x3e2fb0);}else return Window_ButtonAssist[_0x1cb897(0x1fd)][_0x1cb897(0x3c0)]();}else return 0x0;}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0xa15)]=Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x59e)],Scene_MenuBase[_0x41f3d3(0x1fd)]['mainAreaHeight']=function(){const _0x5ba30c=_0x41f3d3;let _0x3be62a=0x0;return SceneManager[_0x5ba30c(0x8d9)]()?_0x3be62a=this[_0x5ba30c(0x4ad)]():_0x3be62a=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight'][_0x5ba30c(0x809)](this),this[_0x5ba30c(0x6dc)]()&&this[_0x5ba30c(0x587)]()!=='button'&&(_0x3be62a-=Window_ButtonAssist[_0x5ba30c(0x1fd)]['lineHeight']()),_0x3be62a;},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x4ad)]=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5ae)]=Scene_MenuBase[_0x41f3d3(0x1fd)]['createBackground'],Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x530)]=function(){const _0x4c4249=_0x41f3d3,_0x62b54f=VisuMZ[_0x4c4249(0x5aa)]['Settings']['MenuBg'][_0x4c4249(0xa29)]??0x8;this[_0x4c4249(0x93b)]=new PIXI[(_0x4c4249(0x3c1))][(_0x4c4249(0x90b))](_0x62b54f),this[_0x4c4249(0x8ee)]=new Sprite(),this[_0x4c4249(0x8ee)]['bitmap']=SceneManager[_0x4c4249(0x225)](),this['_backgroundSprite'][_0x4c4249(0x3c1)]=[this[_0x4c4249(0x93b)]],this[_0x4c4249(0x65e)](this[_0x4c4249(0x8ee)]),this[_0x4c4249(0x54e)](0xc0),this[_0x4c4249(0x54e)](this[_0x4c4249(0x94f)]()),this[_0x4c4249(0x1af)]();},Scene_MenuBase['prototype'][_0x41f3d3(0x94f)]=function(){const _0x5f4163=_0x41f3d3,_0x5ec272=String(this[_0x5f4163(0x9a5)][_0x5f4163(0x23b)]),_0x216318=this['getCustomBackgroundSettings'](_0x5ec272);return _0x216318?_0x216318[_0x5f4163(0x211)]:0xc0;},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x1af)]=function(){const _0x3e1a41=_0x41f3d3,_0x3c72a9=String(this[_0x3e1a41(0x9a5)][_0x3e1a41(0x23b)]),_0x1c0fa4=this['getCustomBackgroundSettings'](_0x3c72a9);_0x1c0fa4&&(_0x1c0fa4[_0x3e1a41(0x8f7)]!==''||_0x1c0fa4['BgFilename2']!=='')&&(this[_0x3e1a41(0x640)]=new Sprite(ImageManager[_0x3e1a41(0x31e)](_0x1c0fa4[_0x3e1a41(0x8f7)])),this['_backSprite2']=new Sprite(ImageManager[_0x3e1a41(0x681)](_0x1c0fa4[_0x3e1a41(0x916)])),this[_0x3e1a41(0x65e)](this['_backSprite1']),this[_0x3e1a41(0x65e)](this['_backSprite2']),this[_0x3e1a41(0x640)][_0x3e1a41(0x5b0)][_0x3e1a41(0x42e)](this[_0x3e1a41(0x3f8)][_0x3e1a41(0x508)](this,this[_0x3e1a41(0x640)])),this['_backSprite2'][_0x3e1a41(0x5b0)]['addLoadListener'](this['adjustSprite'][_0x3e1a41(0x508)](this,this[_0x3e1a41(0x4e7)])));},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x5ec)]=function(_0x5d2c72){const _0x504849=_0x41f3d3;return VisuMZ['CoreEngine'][_0x504849(0x5b1)][_0x504849(0x87d)][_0x5d2c72]||VisuMZ[_0x504849(0x5aa)][_0x504849(0x5b1)][_0x504849(0x87d)][_0x504849(0x5d3)];},Scene_MenuBase['prototype'][_0x41f3d3(0x3f8)]=function(_0x5bfdb1){const _0x269db3=_0x41f3d3;this[_0x269db3(0x59f)](_0x5bfdb1),this[_0x269db3(0x67a)](_0x5bfdb1);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x849)]=Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x49a)],Scene_MenuBase['prototype'][_0x41f3d3(0x49a)]=function(){const _0x5511f5=_0x41f3d3;VisuMZ['CoreEngine'][_0x5511f5(0x849)][_0x5511f5(0x809)](this);if(SceneManager[_0x5511f5(0x948)]()){if('yPfkR'===_0x5511f5(0x71f))return 0x24;else this[_0x5511f5(0x7eb)]();}},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x7eb)]=function(){const _0x3c75d6=_0x41f3d3;this[_0x3c75d6(0x193)]['x']=Graphics[_0x3c75d6(0x427)]+0x4;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x677)]=Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x617)],Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x617)]=function(){const _0xb9dbef=_0x41f3d3;VisuMZ['CoreEngine'][_0xb9dbef(0x677)]['call'](this),SceneManager[_0xb9dbef(0x948)]()&&('KiPhI'===_0xb9dbef(0x4d7)?this[_0xb9dbef(0x7d1)](_0x347628,_0x3c719b,_0x22bb16,_0x55d19d):this['movePageButtonSideButtonLayout']());},Scene_MenuBase['prototype']['movePageButtonSideButtonLayout']=function(){const _0x8aef0a=_0x41f3d3;this[_0x8aef0a(0x844)]['x']=-0x1*(this[_0x8aef0a(0x844)][_0x8aef0a(0x665)]+this[_0x8aef0a(0xa58)][_0x8aef0a(0x665)]+0x8),this[_0x8aef0a(0xa58)]['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x41f3d3(0x1fd)]['isMenuButtonAssistEnabled']=function(){const _0x2ea6c4=_0x41f3d3;return VisuMZ['CoreEngine'][_0x2ea6c4(0x5b1)][_0x2ea6c4(0x478)]['Enable'];},Scene_MenuBase[_0x41f3d3(0x1fd)]['getButtonAssistLocation']=function(){const _0x4b032b=_0x41f3d3;if(SceneManager[_0x4b032b(0x948)]()||SceneManager[_0x4b032b(0x2c1)]())return VisuMZ[_0x4b032b(0x5aa)]['Settings'][_0x4b032b(0x478)]['Location'];else{if(_0x4b032b(0x9df)==='aVRWC')return'button';else _0x6b1ee8[_0x4b032b(0x233)]&&_0x15572d[_0x4b032b(0x233)]();}},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x919)]=function(){const _0x1d954f=_0x41f3d3;if(!this[_0x1d954f(0x6dc)]())return;const _0x5a198b=this[_0x1d954f(0x201)]();this[_0x1d954f(0xa32)]=new Window_ButtonAssist(_0x5a198b),this[_0x1d954f(0x659)](this[_0x1d954f(0xa32)]);},Scene_MenuBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x201)]=function(){const _0x158cc3=_0x41f3d3;if(this[_0x158cc3(0x587)]()===_0x158cc3(0x73f)){if('cNBja'===_0x158cc3(0x1ed))return this[_0x158cc3(0x74c)]();else{if(!this[_0x158cc3(0x439)])return _0x25a495;const _0x4f15e9=this[_0x158cc3(0x439)]['duration'],_0x5ab6c7=this[_0x158cc3(0x439)][_0x158cc3(0x833)],_0x4b34e9=this[_0x158cc3(0x7e9)]((_0x5ab6c7-_0x4f15e9)/_0x5ab6c7),_0x563484=this['calcCoreEasing']((_0x5ab6c7-_0x4f15e9+0x1)/_0x5ab6c7),_0x32c0e2=(_0x3a9f8a-_0x7458bb*_0x4b34e9)/(0x1-_0x4b34e9);return _0x32c0e2+(_0x1994e0-_0x32c0e2)*_0x563484;}}else return this[_0x158cc3(0x929)]();},Scene_MenuBase[_0x41f3d3(0x1fd)]['buttonAssistWindowButtonRect']=function(){const _0x447378=_0x41f3d3,_0x37a837=ConfigManager[_0x447378(0x6b0)]?(Sprite_Button[_0x447378(0x1fd)][_0x447378(0x226)]()+0x6)*0x2:0x0,_0x3e317f=this[_0x447378(0x3a4)](),_0x584020=Graphics['boxWidth']-_0x37a837*0x2,_0x33beb8=this[_0x447378(0x365)]();return new Rectangle(_0x37a837,_0x3e317f,_0x584020,_0x33beb8);},Scene_MenuBase[_0x41f3d3(0x1fd)]['buttonAssistWindowSideRect']=function(){const _0x5c9cac=_0x41f3d3,_0x24c81c=Graphics[_0x5c9cac(0x427)],_0x5d5224=Window_ButtonAssist[_0x5c9cac(0x1fd)][_0x5c9cac(0x3c0)](),_0x91c400=0x0;let _0x275009=0x0;return this['getButtonAssistLocation']()===_0x5c9cac(0x411)?_0x275009=0x0:_0x5c9cac(0x712)==='WMIkn'?_0x275009=Graphics[_0x5c9cac(0x6bf)]-_0x5d5224:this['doesNameContainBannedWords']()?this[_0x5c9cac(0x232)]():_0x273ba3[_0x5c9cac(0x5aa)][_0x5c9cac(0x69c)]['call'](this),new Rectangle(_0x91c400,_0x275009,_0x24c81c,_0x5d5224);},Scene_Menu[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)]['Settings'][_0x41f3d3(0x20d)][_0x41f3d3(0x275)],VisuMZ['CoreEngine'][_0x41f3d3(0x98a)]=Scene_Menu[_0x41f3d3(0x1fd)]['create'],Scene_Menu['prototype'][_0x41f3d3(0x65d)]=function(){const _0x2649fe=_0x41f3d3;VisuMZ[_0x2649fe(0x5aa)]['Scene_Menu_create'][_0x2649fe(0x809)](this),this[_0x2649fe(0x295)]();},Scene_Menu[_0x41f3d3(0x1fd)][_0x41f3d3(0x295)]=function(){const _0x5eea60=_0x41f3d3;this[_0x5eea60(0x7ae)]&&this[_0x5eea60(0x7ae)][_0x5eea60(0x564)](Scene_Menu[_0x5eea60(0x1fb)]['CommandBgType']);if(this['_goldWindow']){if(_0x5eea60(0x248)==='NxLFQ')this[_0x5eea60(0x517)][_0x5eea60(0x564)](Scene_Menu[_0x5eea60(0x1fb)]['GoldBgType']);else return _0x462e65;}this[_0x5eea60(0x8e4)]&&('elDHD'===_0x5eea60(0x8a2)?(this['refresh'](),_0x3c2825[_0x5eea60(0x85b)](),this[_0x5eea60(0x7b8)]===_0x5eea60(0x890)?this['select'](0x0):this[_0x5eea60(0x421)](-0x1)):this[_0x5eea60(0x8e4)][_0x5eea60(0x564)](Scene_Menu['layoutSettings'][_0x5eea60(0x22e)]));},Scene_Menu[_0x41f3d3(0x1fd)][_0x41f3d3(0x434)]=function(){const _0x4c51c9=_0x41f3d3;return Scene_Menu[_0x4c51c9(0x1fb)]['CommandRect']['call'](this);},Scene_Menu[_0x41f3d3(0x1fd)][_0x41f3d3(0x4bd)]=function(){const _0x10e004=_0x41f3d3;return Scene_Menu[_0x10e004(0x1fb)][_0x10e004(0x28f)][_0x10e004(0x809)](this);},Scene_Menu[_0x41f3d3(0x1fd)][_0x41f3d3(0x7e8)]=function(){const _0x3cb242=_0x41f3d3;return Scene_Menu[_0x3cb242(0x1fb)][_0x3cb242(0x4d8)][_0x3cb242(0x809)](this);},Scene_Item[_0x41f3d3(0x1fb)]=VisuMZ['CoreEngine']['Settings'][_0x41f3d3(0x20d)][_0x41f3d3(0x30d)],VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x923)]=Scene_Item[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)],Scene_Item['prototype'][_0x41f3d3(0x65d)]=function(){const _0x491ade=_0x41f3d3;VisuMZ[_0x491ade(0x5aa)]['Scene_Item_create']['call'](this),this[_0x491ade(0x295)]();},Scene_Item[_0x41f3d3(0x1fd)][_0x41f3d3(0x295)]=function(){const _0x322910=_0x41f3d3;if(this[_0x322910(0x347)]){if(_0x322910(0x8fd)!=='ywqtD')this[_0x322910(0x347)][_0x322910(0x564)](Scene_Item[_0x322910(0x1fb)][_0x322910(0x42f)]);else{const _0x57c9dd={'targets':_0x1327b1,'animationId':_0x510c86,'mirror':_0x555105,'mute':_0xb8200d};this[_0x322910(0x8b7)]['push'](_0x57c9dd);for(const _0x79ba45 of _0x3e793e){_0x79ba45[_0x322910(0x299)]&&_0x79ba45[_0x322910(0x299)]();}}}this[_0x322910(0x598)]&&this['_categoryWindow'][_0x322910(0x564)](Scene_Item[_0x322910(0x1fb)][_0x322910(0x75d)]),this[_0x322910(0x5ee)]&&this[_0x322910(0x5ee)][_0x322910(0x564)](Scene_Item['layoutSettings'][_0x322910(0x3df)]),this['_actorWindow']&&this[_0x322910(0x2ff)][_0x322910(0x564)](Scene_Item[_0x322910(0x1fb)][_0x322910(0x722)]);},Scene_Item[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fe)]=function(){const _0x33c97e=_0x41f3d3;return Scene_Item[_0x33c97e(0x1fb)]['HelpRect'][_0x33c97e(0x809)](this);},Scene_Item[_0x41f3d3(0x1fd)][_0x41f3d3(0x831)]=function(){const _0x4ffef9=_0x41f3d3;return Scene_Item[_0x4ffef9(0x1fb)][_0x4ffef9(0x940)][_0x4ffef9(0x809)](this);},Scene_Item[_0x41f3d3(0x1fd)][_0x41f3d3(0x5cd)]=function(){const _0x1c44fd=_0x41f3d3;return Scene_Item['layoutSettings'][_0x1c44fd(0xa3d)][_0x1c44fd(0x809)](this);},Scene_Item['prototype']['actorWindowRect']=function(){const _0x4d2aad=_0x41f3d3;return Scene_Item[_0x4d2aad(0x1fb)][_0x4d2aad(0x7c0)]['call'](this);},Scene_Skill[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)][_0x41f3d3(0xa2e)],VisuMZ['CoreEngine'][_0x41f3d3(0x5e4)]=Scene_Skill['prototype'][_0x41f3d3(0x65d)],Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)]=function(){const _0xb85c03=_0x41f3d3;VisuMZ[_0xb85c03(0x5aa)][_0xb85c03(0x5e4)][_0xb85c03(0x809)](this),this[_0xb85c03(0x295)]();},Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x295)]=function(){const _0x4a6beb=_0x41f3d3;this['_helpWindow']&&this[_0x4a6beb(0x347)][_0x4a6beb(0x564)](Scene_Skill[_0x4a6beb(0x1fb)][_0x4a6beb(0x42f)]);this[_0x4a6beb(0x3ab)]&&this[_0x4a6beb(0x3ab)][_0x4a6beb(0x564)](Scene_Skill[_0x4a6beb(0x1fb)][_0x4a6beb(0x539)]);if(this[_0x4a6beb(0x8e4)]){if(_0x4a6beb(0x7f8)!=='acSui'){this['_cache']={};if(_0x46a4b[_0x4a6beb(0x5aa)][_0x4a6beb(0x5b1)][_0x4a6beb(0x2d1)][_0x4a6beb(0x450)])this[_0x4a6beb(0xa35)]=this['mhp'];if(_0x1a7bf3[_0x4a6beb(0x5aa)][_0x4a6beb(0x5b1)][_0x4a6beb(0x2d1)][_0x4a6beb(0x3b6)])this[_0x4a6beb(0xa03)]=this['mmp'];}else this[_0x4a6beb(0x8e4)][_0x4a6beb(0x564)](Scene_Skill[_0x4a6beb(0x1fb)][_0x4a6beb(0x22e)]);}if(this[_0x4a6beb(0x5ee)]){if(_0x4a6beb(0x55b)===_0x4a6beb(0x67f))return _0x444017[_0x4a6beb(0x5aa)][_0x4a6beb(0x5b1)][_0x4a6beb(0x1c6)][_0x4a6beb(0x18d)];else this[_0x4a6beb(0x5ee)]['setBackgroundType'](Scene_Skill[_0x4a6beb(0x1fb)][_0x4a6beb(0x3df)]);}this[_0x4a6beb(0x2ff)]&&this[_0x4a6beb(0x2ff)][_0x4a6beb(0x564)](Scene_Skill[_0x4a6beb(0x1fb)][_0x4a6beb(0x722)]);},Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fe)]=function(){const _0x280032=_0x41f3d3;return Scene_Skill[_0x280032(0x1fb)][_0x280032(0x31a)][_0x280032(0x809)](this);},Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x56e)]=function(){const _0x631e4d=_0x41f3d3;return Scene_Skill['layoutSettings'][_0x631e4d(0x81b)]['call'](this);},Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x7e8)]=function(){const _0x10b241=_0x41f3d3;return Scene_Skill['layoutSettings']['StatusRect'][_0x10b241(0x809)](this);},Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x5cd)]=function(){const _0x4b9725=_0x41f3d3;return Scene_Skill[_0x4b9725(0x1fb)][_0x4b9725(0xa3d)][_0x4b9725(0x809)](this);},Scene_Skill['prototype']['actorWindowRect']=function(){const _0x19c326=_0x41f3d3;return Scene_Skill[_0x19c326(0x1fb)][_0x19c326(0x7c0)][_0x19c326(0x809)](this);},Scene_Equip[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)]['Settings'][_0x41f3d3(0x20d)][_0x41f3d3(0x8c4)],VisuMZ['CoreEngine'][_0x41f3d3(0x867)]=Scene_Equip[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)],Scene_Equip[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)]=function(){const _0x38d591=_0x41f3d3;VisuMZ['CoreEngine'][_0x38d591(0x867)][_0x38d591(0x809)](this),this[_0x38d591(0x295)]();},Scene_Equip['prototype'][_0x41f3d3(0x295)]=function(){const _0x31ce09=_0x41f3d3;this[_0x31ce09(0x347)]&&this['_helpWindow'][_0x31ce09(0x564)](Scene_Equip['layoutSettings']['HelpBgType']);this['_statusWindow']&&this[_0x31ce09(0x8e4)][_0x31ce09(0x564)](Scene_Equip['layoutSettings']['StatusBgType']);if(this[_0x31ce09(0x7ae)]){if('naGCd'==='naGCd')this[_0x31ce09(0x7ae)][_0x31ce09(0x564)](Scene_Equip['layoutSettings']['CommandBgType']);else{_0x2cb2ac[_0x31ce09(0x5aa)]['Scene_Map_createSpritesetFix']['call'](this);const _0x36f4c8=this[_0x31ce09(0x5ab)][_0x31ce09(0x891)];if(_0x36f4c8)this['addChild'](_0x36f4c8);}}this[_0x31ce09(0x715)]&&this[_0x31ce09(0x715)][_0x31ce09(0x564)](Scene_Equip['layoutSettings']['SlotBgType']),this['_itemWindow']&&this[_0x31ce09(0x5ee)][_0x31ce09(0x564)](Scene_Equip['layoutSettings'][_0x31ce09(0x3df)]);},Scene_Equip['prototype'][_0x41f3d3(0x6fe)]=function(){const _0x64a0fb=_0x41f3d3;return Scene_Equip[_0x64a0fb(0x1fb)][_0x64a0fb(0x31a)]['call'](this);},Scene_Equip['prototype'][_0x41f3d3(0x7e8)]=function(){const _0x2996aa=_0x41f3d3;return Scene_Equip[_0x2996aa(0x1fb)]['StatusRect'][_0x2996aa(0x809)](this);},Scene_Equip[_0x41f3d3(0x1fd)][_0x41f3d3(0x434)]=function(){const _0x57e54e=_0x41f3d3;return Scene_Equip[_0x57e54e(0x1fb)][_0x57e54e(0x641)][_0x57e54e(0x809)](this);},Scene_Equip[_0x41f3d3(0x1fd)][_0x41f3d3(0x468)]=function(){const _0x1400d9=_0x41f3d3;return Scene_Equip[_0x1400d9(0x1fb)][_0x1400d9(0x7c3)]['call'](this);},Scene_Equip[_0x41f3d3(0x1fd)][_0x41f3d3(0x5cd)]=function(){const _0x247a90=_0x41f3d3;return Scene_Equip[_0x247a90(0x1fb)]['ItemRect']['call'](this);},Scene_Status[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)][_0x41f3d3(0x1fa)],VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x245)]=Scene_Status[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)],Scene_Status['prototype'][_0x41f3d3(0x65d)]=function(){const _0x529984=_0x41f3d3;VisuMZ[_0x529984(0x5aa)][_0x529984(0x245)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x24842f=_0x41f3d3;this[_0x24842f(0x443)]&&this[_0x24842f(0x443)][_0x24842f(0x564)](Scene_Status[_0x24842f(0x1fb)][_0x24842f(0x74f)]);this[_0x24842f(0x8e4)]&&(_0x24842f(0x6b6)!=='gBiSd'?this[_0x24842f(0x8e4)][_0x24842f(0x564)](Scene_Status[_0x24842f(0x1fb)][_0x24842f(0x22e)]):this['_statusParamsWindow'][_0x24842f(0x564)](_0x50bdd3[_0x24842f(0x1fb)][_0x24842f(0x521)]));if(this[_0x24842f(0x296)]){if(_0x24842f(0x4ce)!==_0x24842f(0x3b4))this[_0x24842f(0x296)][_0x24842f(0x564)](Scene_Status[_0x24842f(0x1fb)][_0x24842f(0x521)]);else{const _0x47422b=_0x53edb7[_0x24842f(0x457)]();if(_0x47422b)for(const _0x18a5d5 of _0x47422b){if(_0x18a5d5&&_0x18a5d5[_0x24842f(0x6ab)])return!![];}}}if(this[_0x24842f(0x91c)]){if(_0x24842f(0x59a)!==_0x24842f(0x59a))return _0x1057d6[_0x24842f(0x5aa)]['Settings'][_0x24842f(0x2d1)][_0x24842f(0x2ea)]?this['itemHitImprovedAccuracy'](_0x4aae60):_0x5a27c9['CoreEngine'][_0x24842f(0x779)][_0x24842f(0x809)](this,_0x3deb76);else this['_statusEquipWindow'][_0x24842f(0x564)](Scene_Status[_0x24842f(0x1fb)][_0x24842f(0x957)]);}},Scene_Status[_0x41f3d3(0x1fd)][_0x41f3d3(0x791)]=function(){const _0x517a54=_0x41f3d3;return Scene_Status[_0x517a54(0x1fb)][_0x517a54(0x752)][_0x517a54(0x809)](this);},Scene_Status[_0x41f3d3(0x1fd)][_0x41f3d3(0x7e8)]=function(){const _0x1867a8=_0x41f3d3;return Scene_Status['layoutSettings'][_0x1867a8(0x4d8)][_0x1867a8(0x809)](this);},Scene_Status[_0x41f3d3(0x1fd)][_0x41f3d3(0x402)]=function(){const _0x4929df=_0x41f3d3;return Scene_Status[_0x4929df(0x1fb)][_0x4929df(0x323)][_0x4929df(0x809)](this);},Scene_Status['prototype'][_0x41f3d3(0xa21)]=function(){const _0x2bd31e=_0x41f3d3;return Scene_Status[_0x2bd31e(0x1fb)][_0x2bd31e(0x7e2)]['call'](this);},Scene_Options['layoutSettings']=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)]['MenuLayout']['OptionsMenu'],VisuMZ['CoreEngine'][_0x41f3d3(0x1aa)]=Scene_Options[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)],Scene_Options[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)]=function(){const _0x1f7a0e=_0x41f3d3;VisuMZ[_0x1f7a0e(0x5aa)]['Scene_Options_create'][_0x1f7a0e(0x809)](this),this[_0x1f7a0e(0x295)]();},Scene_Options['prototype'][_0x41f3d3(0x295)]=function(){const _0x5ad66f=_0x41f3d3;this[_0x5ad66f(0x7d8)]&&this[_0x5ad66f(0x7d8)][_0x5ad66f(0x564)](Scene_Options[_0x5ad66f(0x1fb)][_0x5ad66f(0x808)]);},Scene_Options[_0x41f3d3(0x1fd)][_0x41f3d3(0x38e)]=function(){const _0x7f4853=_0x41f3d3;return Scene_Options['layoutSettings'][_0x7f4853(0x26a)][_0x7f4853(0x809)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)][_0x41f3d3(0x771)],Scene_Save[_0x41f3d3(0x1fd)]['create']=function(){const _0x522d43=_0x41f3d3;Scene_File[_0x522d43(0x1fd)][_0x522d43(0x65d)]['call'](this),this[_0x522d43(0x295)]();},Scene_Save['prototype'][_0x41f3d3(0x295)]=function(){const _0x406276=_0x41f3d3;this[_0x406276(0x347)]&&(_0x406276(0x4c0)==='lJmPT'?this['_helpWindow']['setBackgroundType'](_0x241913[_0x406276(0x1fb)][_0x406276(0x42f)]):this['_helpWindow']['setBackgroundType'](Scene_Save[_0x406276(0x1fb)][_0x406276(0x42f)])),this['_listWindow']&&(_0x406276(0x237)!=='jFpKB'?this['_listWindow'][_0x406276(0x564)](Scene_Save['layoutSettings'][_0x406276(0xa16)]):this[_0x406276(0x74d)]=![]);},Scene_Save[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fe)]=function(){const _0x16e9fb=_0x41f3d3;return Scene_Save[_0x16e9fb(0x1fb)][_0x16e9fb(0x31a)][_0x16e9fb(0x809)](this);},Scene_Save[_0x41f3d3(0x1fd)][_0x41f3d3(0x1bc)]=function(){const _0x2efdaf=_0x41f3d3;return Scene_Save[_0x2efdaf(0x1fb)][_0x2efdaf(0x92d)][_0x2efdaf(0x809)](this);},Scene_Load[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)]['LoadMenu'],Scene_Load['prototype'][_0x41f3d3(0x65d)]=function(){const _0x39ac66=_0x41f3d3;Scene_File[_0x39ac66(0x1fd)]['create'][_0x39ac66(0x809)](this),this[_0x39ac66(0x295)]();},Scene_Load['prototype'][_0x41f3d3(0x295)]=function(){const _0x29176a=_0x41f3d3;this[_0x29176a(0x347)]&&(_0x29176a(0x904)!=='TTLMI'?_0x8f615f=_0x2e7bfc['concat'](_0x4de25d):this['_helpWindow'][_0x29176a(0x564)](Scene_Load[_0x29176a(0x1fb)][_0x29176a(0x42f)])),this[_0x29176a(0x204)]&&this[_0x29176a(0x204)][_0x29176a(0x564)](Scene_Load['layoutSettings'][_0x29176a(0xa16)]);},Scene_Load[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fe)]=function(){const _0x1cb786=_0x41f3d3;return Scene_Load['layoutSettings'][_0x1cb786(0x31a)][_0x1cb786(0x809)](this);},Scene_Load['prototype']['listWindowRect']=function(){const _0xcedcf5=_0x41f3d3;return Scene_Load[_0xcedcf5(0x1fb)][_0xcedcf5(0x92d)][_0xcedcf5(0x809)](this);},Scene_GameEnd[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)][_0x41f3d3(0x1d9)],VisuMZ['CoreEngine'][_0x41f3d3(0x4ac)]=Scene_GameEnd['prototype'][_0x41f3d3(0x530)],Scene_GameEnd['prototype'][_0x41f3d3(0x530)]=function(){const _0x3d4b6d=_0x41f3d3;Scene_MenuBase[_0x3d4b6d(0x1fd)]['createBackground'][_0x3d4b6d(0x809)](this);},Scene_GameEnd[_0x41f3d3(0x1fd)][_0x41f3d3(0x38d)]=function(){const _0x21bab7=_0x41f3d3,_0x316b1f=this['commandWindowRect']();this[_0x21bab7(0x7ae)]=new Window_GameEnd(_0x316b1f),this[_0x21bab7(0x7ae)][_0x21bab7(0x528)]('cancel',this[_0x21bab7(0x399)]['bind'](this)),this[_0x21bab7(0x659)](this[_0x21bab7(0x7ae)]),this[_0x21bab7(0x7ae)][_0x21bab7(0x564)](Scene_GameEnd[_0x21bab7(0x1fb)][_0x21bab7(0x90d)]);},Scene_GameEnd['prototype'][_0x41f3d3(0x434)]=function(){const _0x48a138=_0x41f3d3;return Scene_GameEnd[_0x48a138(0x1fb)]['CommandRect']['call'](this);},Scene_Shop[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)]['ShopMenu'],VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x701)]=Scene_Shop[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)],Scene_Shop['prototype'][_0x41f3d3(0x65d)]=function(){const _0x3bf777=_0x41f3d3;VisuMZ[_0x3bf777(0x5aa)][_0x3bf777(0x701)][_0x3bf777(0x809)](this),this[_0x3bf777(0x295)]();},Scene_Shop[_0x41f3d3(0x1fd)]['setCoreEngineUpdateWindowBg']=function(){const _0x22f90e=_0x41f3d3;this[_0x22f90e(0x347)]&&(_0x22f90e(0x68d)!==_0x22f90e(0x68d)?(this[_0x22f90e(0x967)]=![],this[_0x22f90e(0x2fe)]=!_0x41b863[_0x22f90e(0x5aa)][_0x22f90e(0x5b1)]['UI']['ShowButtons']):this[_0x22f90e(0x347)][_0x22f90e(0x564)](Scene_Shop[_0x22f90e(0x1fb)][_0x22f90e(0x42f)]));if(this[_0x22f90e(0x517)]){if('rOqDN'!==_0x22f90e(0x7de))this[_0x22f90e(0x517)][_0x22f90e(0x564)](Scene_Shop['layoutSettings'][_0x22f90e(0x77d)]);else return _0x22ebbf[_0x22f90e(0x5aa)][_0x22f90e(0x5b1)]['UI'][_0x22f90e(0x392)];}this[_0x22f90e(0x7ae)]&&(_0x22f90e(0x1d8)===_0x22f90e(0x1d8)?this['_commandWindow']['setBackgroundType'](Scene_Shop['layoutSettings'][_0x22f90e(0x90d)]):_0x119c19[_0x22f90e(0x314)]());this[_0x22f90e(0x728)]&&(_0x22f90e(0x6fb)===_0x22f90e(0x360)?this[_0x22f90e(0x633)]():this[_0x22f90e(0x728)]['setBackgroundType'](Scene_Shop[_0x22f90e(0x1fb)][_0x22f90e(0x656)]));this[_0x22f90e(0x6b8)]&&(_0x22f90e(0x87f)===_0x22f90e(0x87f)?this[_0x22f90e(0x6b8)]['setBackgroundType'](Scene_Shop[_0x22f90e(0x1fb)][_0x22f90e(0x655)]):_0x1a1108[_0x22f90e(0x589)]&&(this['_forcedBattleSys']=_0x22f90e(0x32b)));if(this[_0x22f90e(0x8e4)]){if('virSe'!==_0x22f90e(0x3a3))this['_statusWindow'][_0x22f90e(0x564)](Scene_Shop[_0x22f90e(0x1fb)][_0x22f90e(0x22e)]);else{if(_0x4b0761['ShowJS']['call'](this)){const _0x13637f=_0x4f7348[_0x22f90e(0x3f1)];let _0x2f85a6=_0x188efa[_0x22f90e(0x636)];if(['',_0x22f90e(0x562)]['includes'](_0x2f85a6))_0x2f85a6=_0x145ff4[_0x22f90e(0x9a1)][_0x22f90e(0x809)](this);const _0x5a313c=_0x4d1501['EnableJS'][_0x22f90e(0x809)](this),_0x9ad500=_0x4cb14f[_0x22f90e(0x91d)][_0x22f90e(0x809)](this);this[_0x22f90e(0x759)](_0x2f85a6,_0x13637f,_0x5a313c,_0x9ad500),this[_0x22f90e(0x528)](_0x13637f,_0x511317['CallHandlerJS']['bind'](this,_0x9ad500));}}}this[_0x22f90e(0x895)]&&this[_0x22f90e(0x895)][_0x22f90e(0x564)](Scene_Shop[_0x22f90e(0x1fb)][_0x22f90e(0x437)]);this[_0x22f90e(0x598)]&&this[_0x22f90e(0x598)][_0x22f90e(0x564)](Scene_Shop[_0x22f90e(0x1fb)]['CategoryBgType']);if(this[_0x22f90e(0x3f9)]){if('Xfhna'!==_0x22f90e(0xa45))this['_sellWindow']['setBackgroundType'](Scene_Shop[_0x22f90e(0x1fb)][_0x22f90e(0x578)]);else{let _0x29f1a2=_0x451fdf['CoreEngine'][_0x22f90e(0x213)][_0x22f90e(0x809)](this,_0x88f709);return _0x29f1a2['x']=_0x4bbaa7[_0x22f90e(0x92b)](_0x29f1a2['x']),_0x29f1a2['y']=_0x3268dd['round'](_0x29f1a2['y']),_0x29f1a2[_0x22f90e(0x665)]=_0x11b9b3[_0x22f90e(0x92b)](_0x29f1a2[_0x22f90e(0x665)]),_0x29f1a2[_0x22f90e(0x4f1)]=_0x1d58c8[_0x22f90e(0x92b)](_0x29f1a2[_0x22f90e(0x4f1)]),_0x29f1a2;}}},Scene_Shop[_0x41f3d3(0x1fd)]['helpWindowRect']=function(){const _0x235634=_0x41f3d3;return Scene_Shop[_0x235634(0x1fb)]['HelpRect'][_0x235634(0x809)](this);},Scene_Shop[_0x41f3d3(0x1fd)][_0x41f3d3(0x4bd)]=function(){const _0x283907=_0x41f3d3;return Scene_Shop[_0x283907(0x1fb)]['GoldRect'][_0x283907(0x809)](this);},Scene_Shop[_0x41f3d3(0x1fd)][_0x41f3d3(0x434)]=function(){const _0x64ef11=_0x41f3d3;return Scene_Shop['layoutSettings'][_0x64ef11(0x641)][_0x64ef11(0x809)](this);},Scene_Shop[_0x41f3d3(0x1fd)]['dummyWindowRect']=function(){const _0x15dd4b=_0x41f3d3;return Scene_Shop[_0x15dd4b(0x1fb)]['DummyRect'][_0x15dd4b(0x809)](this);},Scene_Shop['prototype']['numberWindowRect']=function(){const _0x4ca843=_0x41f3d3;return Scene_Shop[_0x4ca843(0x1fb)]['NumberRect'][_0x4ca843(0x809)](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x3633bd=_0x41f3d3;return Scene_Shop[_0x3633bd(0x1fb)]['StatusRect'][_0x3633bd(0x809)](this);},Scene_Shop[_0x41f3d3(0x1fd)][_0x41f3d3(0x494)]=function(){const _0x428a95=_0x41f3d3;return Scene_Shop[_0x428a95(0x1fb)][_0x428a95(0x96e)]['call'](this);},Scene_Shop[_0x41f3d3(0x1fd)]['categoryWindowRect']=function(){return Scene_Shop['layoutSettings']['CategoryRect']['call'](this);},Scene_Shop['prototype'][_0x41f3d3(0x64e)]=function(){const _0x2ed3ec=_0x41f3d3;return Scene_Shop['layoutSettings'][_0x2ed3ec(0x29d)][_0x2ed3ec(0x809)](this);},Scene_Name[_0x41f3d3(0x1fb)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x20d)][_0x41f3d3(0x469)],VisuMZ[_0x41f3d3(0x5aa)]['Scene_Name_create']=Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x65d)],Scene_Name['prototype'][_0x41f3d3(0x65d)]=function(){const _0x1d2613=_0x41f3d3;VisuMZ[_0x1d2613(0x5aa)]['Scene_Name_create'][_0x1d2613(0x809)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x295)]=function(){const _0x35f46a=_0x41f3d3;this[_0x35f46a(0x408)]&&this[_0x35f46a(0x408)][_0x35f46a(0x564)](Scene_Name['layoutSettings'][_0x35f46a(0x49f)]),this[_0x35f46a(0x23a)]&&(_0x35f46a(0x9e8)===_0x35f46a(0x364)?(!this[_0x35f46a(0x369)]&&(this[_0x35f46a(0x3b8)]+=_0x1138f1['round']((_0x4d679[_0x35f46a(0x4f1)]-0x270)/0x2),this[_0x35f46a(0x3b8)]-=_0x56f11c[_0x35f46a(0x6ae)]((_0x4e29ee[_0x35f46a(0x4f1)]-_0x1d0265['boxHeight'])/0x2),_0x47856d[_0x35f46a(0x4c4)]()?this[_0x35f46a(0x9c6)]-=_0x1ce640[_0x35f46a(0x6ae)]((_0x40043a[_0x35f46a(0x665)]-_0x3fdb3f[_0x35f46a(0x427)])/0x2):this['_screenX']+=_0x2acca8[_0x35f46a(0x92b)]((_0x5afa44[_0x35f46a(0x427)]-0x330)/0x2)),this[_0x35f46a(0x369)]=!![]):this[_0x35f46a(0x23a)][_0x35f46a(0x564)](Scene_Name[_0x35f46a(0x1fb)][_0x35f46a(0x649)]));},Scene_Name[_0x41f3d3(0x1fd)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x710)]=function(){const _0xead584=_0x41f3d3;return Scene_Name[_0xead584(0x1fb)]['EditRect']['call'](this);},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x787)]=function(){const _0x2194a9=_0x41f3d3;return Scene_Name[_0x2194a9(0x1fb)][_0x2194a9(0x8d6)][_0x2194a9(0x809)](this);},Scene_Name['prototype']['EnableNameInput']=function(){const _0x53fa50=_0x41f3d3;if(!this[_0x53fa50(0x23a)])return![];return VisuMZ[_0x53fa50(0x5aa)][_0x53fa50(0x5b1)]['KeyboardInput'][_0x53fa50(0x199)];},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x886)]=function(){const _0x47f8a0=_0x41f3d3;if(this['EnableNameInput']()&&this['_inputWindow'][_0x47f8a0(0x7b8)]!=='keyboard'){if(_0x47f8a0(0xa46)!==_0x47f8a0(0x4db))return TextManager[_0x47f8a0(0x870)](_0x47f8a0(0x510),_0x47f8a0(0x4de));else this[_0x47f8a0(0x99f)]=_0x457be9;}return Scene_MenuBase[_0x47f8a0(0x1fd)][_0x47f8a0(0x886)][_0x47f8a0(0x809)](this);},Scene_Name['prototype'][_0x41f3d3(0x96a)]=function(){const _0x596dcb=_0x41f3d3;return this[_0x596dcb(0x199)]()?TextManager['getInputButtonString']('tab'):Scene_MenuBase[_0x596dcb(0x1fd)]['buttonAssistKey3'][_0x596dcb(0x809)](this);},Scene_Name[_0x41f3d3(0x1fd)]['buttonAssistKey4']=function(){const _0x16d337=_0x41f3d3;if(this[_0x16d337(0x199)]()&&this[_0x16d337(0x23a)]['_mode']===_0x16d337(0x3eb)){if('DARDt'!=='DARDt')_0x2dadf5[_0x16d337(0x233)]();else return TextManager[_0x16d337(0x1fe)](['ENTER']);}return Scene_MenuBase[_0x16d337(0x1fd)][_0x16d337(0x834)][_0x16d337(0x809)](this);},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x789)]=function(){const _0x399ce1=_0x41f3d3;if(this[_0x399ce1(0x199)]()&&this[_0x399ce1(0x23a)]['_mode']===_0x399ce1(0x3eb))return TextManager[_0x399ce1(0x1fe)]([_0x399ce1(0x8e0)]);return Scene_MenuBase['prototype'][_0x399ce1(0x834)][_0x399ce1(0x809)](this);},Scene_Name['prototype'][_0x41f3d3(0x70e)]=function(){const _0x3af609=_0x41f3d3;if(this['EnableNameInput']()&&this[_0x3af609(0x23a)][_0x3af609(0x7b8)]!==_0x3af609(0x3eb)){const _0x5e2c31=VisuMZ['CoreEngine'][_0x3af609(0x5b1)][_0x3af609(0xa17)];return _0x5e2c31[_0x3af609(0x5c4)]||_0x3af609(0x7d3);}return Scene_MenuBase[_0x3af609(0x1fd)][_0x3af609(0x70e)][_0x3af609(0x809)](this);},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x678)]=function(){const _0x3aa0ad=_0x41f3d3;if(this[_0x3aa0ad(0x199)]()){const _0x26b112=VisuMZ[_0x3aa0ad(0x5aa)]['Settings'][_0x3aa0ad(0xa17)];return this[_0x3aa0ad(0x23a)][_0x3aa0ad(0x7b8)]==='keyboard'?_0x26b112[_0x3aa0ad(0x5c8)]||_0x3aa0ad(0x5c8):_0x26b112[_0x3aa0ad(0x54b)]||'Manual';}else return Scene_MenuBase[_0x3aa0ad(0x1fd)]['buttonAssistText3']['call'](this);},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x60b)]=function(){const _0x39fcf4=_0x41f3d3;if(this['EnableNameInput']()){const _0x49be47=VisuMZ[_0x39fcf4(0x5aa)]['Settings'][_0x39fcf4(0xa17)];if(this[_0x39fcf4(0x23a)][_0x39fcf4(0x7b8)]===_0x39fcf4(0x3eb))return _0x49be47[_0x39fcf4(0x85d)]||_0x39fcf4(0x85d);}return Scene_MenuBase['prototype'][_0x39fcf4(0x60b)][_0x39fcf4(0x809)](this);},VisuMZ[_0x41f3d3(0x5aa)]['Scene_Name_onInputOk']=Scene_Name[_0x41f3d3(0x1fd)]['onInputOk'],Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x458)]=function(){const _0x59b5f6=_0x41f3d3;if(this[_0x59b5f6(0x556)]()){if('yhyLC'!==_0x59b5f6(0x85e))this['onInputBannedWords']();else return _0x2c4179[_0x59b5f6(0x5aa)][_0x59b5f6(0x5b1)]['UI'][_0x59b5f6(0x302)];}else{if(_0x59b5f6(0x597)===_0x59b5f6(0x613)){this[_0x59b5f6(0x57d)]=this[_0x59b5f6(0x979)]()[_0x59b5f6(0x88a)];return;}else VisuMZ[_0x59b5f6(0x5aa)]['Scene_Name_onInputOk'][_0x59b5f6(0x809)](this);}},Scene_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x556)]=function(){const _0x1317a6=_0x41f3d3,_0x32f1b3=VisuMZ['CoreEngine']['Settings'][_0x1317a6(0xa17)];if(!_0x32f1b3)return![];const _0x46bfeb=_0x32f1b3[_0x1317a6(0x614)];if(!_0x46bfeb)return![];const _0x5bb584=this[_0x1317a6(0x408)][_0x1317a6(0x23b)]()[_0x1317a6(0x1b1)]();for(const _0x1ac7c9 of _0x46bfeb){if(_0x5bb584[_0x1317a6(0x85f)](_0x1ac7c9['toLowerCase']()))return!![];}return![];},Scene_Name[_0x41f3d3(0x1fd)]['onInputBannedWords']=function(){const _0x4df381=_0x41f3d3;SoundManager[_0x4df381(0x1f2)]();},VisuMZ['CoreEngine'][_0x41f3d3(0x227)]=Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x314)],Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x314)]=function(){const _0x24da0a=_0x41f3d3;VisuMZ[_0x24da0a(0x5aa)][_0x24da0a(0x227)]['call'](this);if($gameTemp[_0x24da0a(0x7e6)])this[_0x24da0a(0x2ee)]();},Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x2ee)]=function(){const _0x1383d6=_0x41f3d3;!BattleManager[_0x1383d6(0x80d)]()&&!this[_0x1383d6(0x4a2)]&&!$gameMessage[_0x1383d6(0x951)]()&&(this[_0x1383d6(0x4a2)]=!![],this['update'](),SceneManager[_0x1383d6(0x53d)](),this[_0x1383d6(0x4a2)]=![]);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x773)]=Scene_Battle['prototype'][_0x41f3d3(0x49a)],Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x49a)]=function(){const _0x2867fd=_0x41f3d3;VisuMZ[_0x2867fd(0x5aa)][_0x2867fd(0x773)][_0x2867fd(0x809)](this);if(SceneManager[_0x2867fd(0x948)]()){if('CyTwI'===_0x2867fd(0x424))this[_0x2867fd(0x283)]();else return this['_pageupButton']&&this[_0x2867fd(0x844)][_0x2867fd(0x2f6)]?_0x5662ee[_0x2867fd(0x81c)]:'';}},Scene_Battle['prototype'][_0x41f3d3(0x283)]=function(){const _0x7e7351=_0x41f3d3;this[_0x7e7351(0x193)]['x']=Graphics['boxWidth']+0x4,this[_0x7e7351(0x781)]()?this[_0x7e7351(0x193)]['y']=Graphics[_0x7e7351(0x6bf)]-this[_0x7e7351(0x365)]():_0x7e7351(0x949)!==_0x7e7351(0x949)?(_0x267a3f[_0x7e7351(0x5aa)][_0x7e7351(0x8eb)][_0x7e7351(0x809)](this),this[_0x7e7351(0x919)](),this[_0x7e7351(0x7bf)]['x']=_0x8e9b09['round'](this[_0x7e7351(0x7bf)]['x']),this[_0x7e7351(0x7bf)]['y']=_0x21455b[_0x7e7351(0x92b)](this[_0x7e7351(0x7bf)]['y'])):this['_cancelButton']['y']=0x0;},VisuMZ['CoreEngine'][_0x41f3d3(0x506)]=Sprite_Button['prototype'][_0x41f3d3(0x927)],Sprite_Button[_0x41f3d3(0x1fd)]['initialize']=function(_0x39bb9e){const _0x16ebad=_0x41f3d3;VisuMZ['CoreEngine'][_0x16ebad(0x506)][_0x16ebad(0x809)](this,_0x39bb9e),this[_0x16ebad(0x8b2)]();},Sprite_Button[_0x41f3d3(0x1fd)][_0x41f3d3(0x8b2)]=function(){const _0x213249=_0x41f3d3,_0x2f841e=VisuMZ[_0x213249(0x5aa)][_0x213249(0x5b1)]['UI'];this[_0x213249(0x77a)]=![];switch(this[_0x213249(0x5c7)]){case _0x213249(0x4d4):this['_isButtonHidden']=!_0x2f841e[_0x213249(0x503)];break;case'pageup':case _0x213249(0x4de):this['_isButtonHidden']=!_0x2f841e[_0x213249(0x61d)];break;case _0x213249(0x563):case'up':case _0x213249(0x757):case _0x213249(0x31f):case'ok':this[_0x213249(0x77a)]=!_0x2f841e['numberShowButton'];break;case'menu':this[_0x213249(0x77a)]=!_0x2f841e['menuShowButton'];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button[_0x41f3d3(0x1fd)][_0x41f3d3(0x1e2)],Sprite_Button[_0x41f3d3(0x1fd)][_0x41f3d3(0x1e2)]=function(){const _0x5b77d2=_0x41f3d3;SceneManager[_0x5b77d2(0x2c1)]()||this[_0x5b77d2(0x77a)]?this[_0x5b77d2(0x2e5)]():VisuMZ[_0x5b77d2(0x5aa)]['Sprite_Button_updateOpacity'][_0x5b77d2(0x809)](this);},Sprite_Button['prototype'][_0x41f3d3(0x2e5)]=function(){const _0x4d8be4=_0x41f3d3;this[_0x4d8be4(0x2f6)]=![],this[_0x4d8be4(0x9d1)]=0x0,this['x']=Graphics[_0x4d8be4(0x665)]*0xa,this['y']=Graphics[_0x4d8be4(0x4f1)]*0xa;},VisuMZ[_0x41f3d3(0x5aa)]['Sprite_Battler_startMove']=Sprite_Battler[_0x41f3d3(0x1fd)][_0x41f3d3(0x522)],Sprite_Battler[_0x41f3d3(0x1fd)][_0x41f3d3(0x522)]=function(_0x4f10cd,_0xd6c666,_0x447477){const _0x4b3414=_0x41f3d3;(this[_0x4b3414(0x2f4)]!==_0x4f10cd||this['_targetOffsetY']!==_0xd6c666)&&(this[_0x4b3414(0x4bc)](_0x4b3414(0xa12)),this[_0x4b3414(0x455)]=_0x447477),VisuMZ[_0x4b3414(0x5aa)][_0x4b3414(0x35e)][_0x4b3414(0x809)](this,_0x4f10cd,_0xd6c666,_0x447477);},Sprite_Battler[_0x41f3d3(0x1fd)]['setMoveEasingType']=function(_0x2fab2c){this['_moveEasingType']=_0x2fab2c;},Sprite_Battler[_0x41f3d3(0x1fd)][_0x41f3d3(0x515)]=function(){const _0xc34b4f=_0x41f3d3;if(this[_0xc34b4f(0xa0a)]<=0x0)return;const _0x3fd35c=this[_0xc34b4f(0xa0a)],_0x238016=this[_0xc34b4f(0x455)],_0x2dddf7=this[_0xc34b4f(0x843)];this['_offsetX']=this[_0xc34b4f(0x685)](this['_offsetX'],this['_targetOffsetX'],_0x3fd35c,_0x238016,_0x2dddf7),this[_0xc34b4f(0x8b4)]=this[_0xc34b4f(0x685)](this[_0xc34b4f(0x8b4)],this['_targetOffsetY'],_0x3fd35c,_0x238016,_0x2dddf7),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x41f3d3(0x1fd)][_0x41f3d3(0x685)]=function(_0x251b39,_0x2d2a8e,_0x173f3b,_0x72c7d,_0x48f658){const _0x4af390=_0x41f3d3,_0x391e64=VisuMZ['ApplyEasing']((_0x72c7d-_0x173f3b)/_0x72c7d,_0x48f658||_0x4af390(0xa12)),_0x1e6c2b=VisuMZ[_0x4af390(0x92a)]((_0x72c7d-_0x173f3b+0x1)/_0x72c7d,_0x48f658||'Linear'),_0x302580=(_0x251b39-_0x2d2a8e*_0x391e64)/(0x1-_0x391e64);return _0x302580+(_0x2d2a8e-_0x302580)*_0x1e6c2b;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x62c)]=Sprite_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x1b8)],Sprite_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x1b8)]=function(_0x25d49f){const _0x3f68e4=_0x41f3d3;if(VisuMZ[_0x3f68e4(0x5aa)][_0x3f68e4(0x5b1)]['UI'][_0x3f68e4(0x479)])_0x3f68e4(0x316)==='cZlSE'?(this[_0x3f68e4(0x979)]()[_0x3f68e4(0x2b9)]=!![],this['centerCameraCheckData']()[_0x3f68e4(0x88a)]=_0xf997a6(_0x49da02['$1'])):this[_0x3f68e4(0x9e4)](_0x25d49f);else{if(_0x3f68e4(0xa25)!==_0x3f68e4(0x9a9))VisuMZ[_0x3f68e4(0x5aa)]['Sprite_Actor_setActorHome'][_0x3f68e4(0x809)](this,_0x25d49f);else return _0x225eae[_0x3f68e4(0x1fd)][_0x3f68e4(0x3c0)]();}},Sprite_Actor['prototype'][_0x41f3d3(0x9e4)]=function(_0x42b809){const _0x5ed915=_0x41f3d3;let _0x5c054b=Math[_0x5ed915(0x92b)](Graphics[_0x5ed915(0x665)]/0x2+0xc0);_0x5c054b-=Math[_0x5ed915(0x6ae)]((Graphics[_0x5ed915(0x665)]-Graphics[_0x5ed915(0x427)])/0x2),_0x5c054b+=_0x42b809*0x20;let _0x2f17bb=Graphics[_0x5ed915(0x4f1)]-0xc8-$gameParty[_0x5ed915(0x6a9)]()*0x30;_0x2f17bb-=Math[_0x5ed915(0x6ae)]((Graphics[_0x5ed915(0x4f1)]-Graphics[_0x5ed915(0x6bf)])/0x2),_0x2f17bb+=_0x42b809*0x30,this[_0x5ed915(0x720)](_0x5c054b,_0x2f17bb);},Sprite_Actor[_0x41f3d3(0x1fd)][_0x41f3d3(0x303)]=function(){const _0x147fb8=_0x41f3d3;this[_0x147fb8(0x522)](0x4b0,0x0,0x78);},Sprite_Animation[_0x41f3d3(0x1fd)][_0x41f3d3(0x1fc)]=function(_0xb3899a){const _0x36d85e=_0x41f3d3;this[_0x36d85e(0x452)]=_0xb3899a;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x40e)]=Sprite_Animation[_0x41f3d3(0x1fd)][_0x41f3d3(0x2cc)],Sprite_Animation['prototype'][_0x41f3d3(0x2cc)]=function(){const _0x3aa418=_0x41f3d3;if(this['_muteSound'])return;VisuMZ[_0x3aa418(0x5aa)]['Sprite_Animation_processSoundTimings']['call'](this);},VisuMZ[_0x41f3d3(0x5aa)]['Sprite_Animation_setViewport']=Sprite_Animation['prototype'][_0x41f3d3(0x4f5)],Sprite_Animation['prototype'][_0x41f3d3(0x4f5)]=function(_0x3daeaa){const _0x2b0e89=_0x41f3d3;this[_0x2b0e89(0x6bd)]()?_0x2b0e89(0x1a2)==='kTlQk'?this[_0x2b0e89(0x4c8)](_0x3daeaa):_0x63e576[_0x2b0e89(0x5aa)][_0x2b0e89(0x51f)][_0x2b0e89(0x809)](this,_0x460878):VisuMZ['CoreEngine'][_0x2b0e89(0x1e1)][_0x2b0e89(0x809)](this,_0x3daeaa);},Sprite_Animation[_0x41f3d3(0x1fd)][_0x41f3d3(0x6bd)]=function(){const _0x325a9c=_0x41f3d3;if(!this[_0x325a9c(0x8ed)])return![];const _0x32ea88=this['_animation']['name']||'';if(_0x32ea88[_0x325a9c(0x420)](/<MIRROR OFFSET X>/i))return!![];if(_0x32ea88['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine']['Settings'][_0x325a9c(0x2d1)]['AnimationMirrorOffset'];},Sprite_Animation[_0x41f3d3(0x1fd)][_0x41f3d3(0x4c8)]=function(_0x1bc1c5){const _0x122abc=_0x41f3d3,_0x100d30=this['_viewportSize'],_0x3b646e=this['_viewportSize'],_0x1f7018=this[_0x122abc(0x8ed)]['offsetX']*(this['_mirror']?-0x1:0x1)-_0x100d30/0x2,_0x46ef63=this[_0x122abc(0x8ed)]['offsetY']-_0x3b646e/0x2,_0x28dec8=this['targetPosition'](_0x1bc1c5);_0x1bc1c5['gl'][_0x122abc(0x2ac)](_0x1f7018+_0x28dec8['x'],_0x46ef63+_0x28dec8['y'],_0x100d30,_0x3b646e);},Sprite_Animation[_0x41f3d3(0x1fd)][_0x41f3d3(0x387)]=function(_0x2a7d34){const _0x110278=_0x41f3d3;if(_0x2a7d34[_0x110278(0xa5c)]){}const _0x23a26b=this[_0x110278(0x8ed)][_0x110278(0x23b)];let _0x3f86b2=_0x2a7d34[_0x110278(0x4f1)]*_0x2a7d34[_0x110278(0x950)]['y'],_0x44bf11=0x0,_0x7c4f11=-_0x3f86b2/0x2;if(_0x23a26b[_0x110278(0x420)](/<(?:HEAD|HEADER|TOP)>/i))_0x7c4f11=-_0x3f86b2;if(_0x23a26b[_0x110278(0x420)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x7c4f11=0x0;if(this['_animation'][_0x110278(0x817)])_0x7c4f11=0x0;if(_0x23a26b['match'](/<(?:LEFT)>/i))_0x44bf11=-_0x2a7d34[_0x110278(0x665)]/0x2;if(_0x23a26b[_0x110278(0x420)](/<(?:RIGHT)>/i))_0x44bf11=_0x2a7d34[_0x110278(0x665)]/0x2;if(_0x23a26b[_0x110278(0x420)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x110278(0x6ad)!==_0x110278(0x383))_0x44bf11=Number(RegExp['$1'])*_0x2a7d34['width'];else{this['_commonEventLayers']++;let _0x28b38d=_0x5aeaef[_0x110278(0x5aa)][_0x110278(0x384)](_0x196106[_0x110278(0x6aa)]);_0x28b38d['length']>0x0&&(_0x35e02d+=_0x139d25,_0x263c0c+=_0x3792ea,_0x51be8a+=_0x110278(0x70b)[_0x110278(0x382)](_0x2a1444['id'],_0x33e643[_0x110278(0x23b)]),_0x376b6f+=_0x4d2c26,_0x32bade+=_0x28b38d,_0x5ab593+=_0x50455e,_0x23f949+=_0x110278(0x3dc)[_0x110278(0x382)](_0x12c1c1['id'],_0x375c95[_0x110278(0x23b)]),_0x217f96+=_0x10903a),this[_0x110278(0x19f)]--;}}_0x23a26b[_0x110278(0x420)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x110278(0x961)===_0x110278(0x280)?this[_0x110278(0x983)]()?_0x278c3a[_0x110278(0x5aa)]['WindowLayer_render']['call'](this,_0x45b5a1):this['renderNoMask'](_0x2c655e):_0x7c4f11=(0x1-Number(RegExp['$1']))*-_0x3f86b2);_0x23a26b[_0x110278(0x420)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x44bf11=Number(RegExp['$1'])*_0x2a7d34[_0x110278(0x665)],_0x7c4f11=(0x1-Number(RegExp['$2']))*-_0x3f86b2);if(_0x23a26b['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x44bf11+=Number(RegExp['$1']);if(_0x23a26b[_0x110278(0x420)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x7c4f11+=Number(RegExp['$1']);if(_0x23a26b[_0x110278(0x420)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('OmcBR'!==_0x110278(0x632)){if(_0x4b917b[_0x110278(0x998)]())return;_0x5bad48[_0x110278(0x5eb)](_0x5156c9,_0x4cb275);const _0x8d8683=_0x34b83c[_0x110278(0x82d)];for(const _0x219111 of _0x8d8683){const _0x1df72a=_0x401392[_0x110278(0x1cc)](_0x219111);_0x5d12ec[_0x110278(0x48d)](_0x219111,!_0x1df72a);}}else _0x44bf11+=Number(RegExp['$1']),_0x7c4f11+=Number(RegExp['$2']);}const _0x3d367b=new Point(_0x44bf11,_0x7c4f11);return _0x2a7d34[_0x110278(0x8b3)](),_0x2a7d34[_0x110278(0x3e0)][_0x110278(0x851)](_0x3d367b);},Sprite_AnimationMV[_0x41f3d3(0x1fd)]['setupRate']=function(){const _0x21bc54=_0x41f3d3;this[_0x21bc54(0xa07)]=VisuMZ['CoreEngine'][_0x21bc54(0x5b1)][_0x21bc54(0x2d1)][_0x21bc54(0x810)]??0x4,this[_0x21bc54(0x611)](),this[_0x21bc54(0xa07)]=this['_rate']['clamp'](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x41f3d3(0x611)]=function(){const _0x1171d0=_0x41f3d3;if(!this['_animation']);const _0x2f9e8a=this[_0x1171d0(0x8ed)]['name']||'';if(_0x2f9e8a[_0x1171d0(0x420)](/<RATE:[ ](\d+)>/i)){if('ZjBcp'===_0x1171d0(0x674)){var _0x59613e=_0x326a5d(_0x37b4bb['$1']);try{_0xd92914*=_0x163cd5(_0x59613e);}catch(_0x23ca8d){if(_0x4e96bd[_0x1171d0(0x67d)]())_0x3d2c51[_0x1171d0(0x5e6)](_0x23ca8d);}}else this['_rate']=(Number(RegExp['$1'])||0x1)[_0x1171d0(0x4f8)](0x1,0xa);}},Sprite_AnimationMV['prototype'][_0x41f3d3(0x1fc)]=function(_0x197e9d){const _0x228e7a=_0x41f3d3;this[_0x228e7a(0x452)]=_0x197e9d;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x3ba)]=Sprite_AnimationMV[_0x41f3d3(0x1fd)]['processTimingData'],Sprite_AnimationMV[_0x41f3d3(0x1fd)][_0x41f3d3(0x4c6)]=function(_0x476630){const _0x69a307=_0x41f3d3;this[_0x69a307(0x452)]&&(_0x69a307(0x697)==='Bzpid'?(_0x476630=JsonEx[_0x69a307(0x9e5)](_0x476630),_0x476630['se']&&(_0x476630['se'][_0x69a307(0x356)]=0x0)):this[_0x69a307(0x790)]=_0x3d44a7[_0x69a307(0x2b5)][_0x69a307(0x587)]()!=='button'?0x0:0x8),VisuMZ['CoreEngine'][_0x69a307(0x3ba)]['call'](this,_0x476630);},VisuMZ[_0x41f3d3(0x5aa)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV['prototype'][_0x41f3d3(0x70a)],Sprite_AnimationMV['prototype'][_0x41f3d3(0x70a)]=function(){const _0x21937e=_0x41f3d3;VisuMZ[_0x21937e(0x5aa)][_0x21937e(0x754)]['call'](this);if(this[_0x21937e(0x8ed)]['position']===0x3){if(this['x']===0x0)this['x']=Math[_0x21937e(0x92b)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x21937e(0x4f1)]/0x2);}},Sprite_Damage[_0x41f3d3(0x1fd)][_0x41f3d3(0x42b)]=function(_0x3d96b4){const _0x163946=_0x41f3d3;let _0x32eab1=Math['abs'](_0x3d96b4)[_0x163946(0x788)]();this[_0x163946(0x82e)]()&&(_0x32eab1=VisuMZ['GroupDigits'](_0x32eab1));const _0x21c89b=this['fontSize'](),_0x7e7534=Math[_0x163946(0x6ae)](_0x21c89b*0.75);for(let _0x2babaa=0x0;_0x2babaa<_0x32eab1[_0x163946(0x9b7)];_0x2babaa++){const _0x4efb87=this['createChildSprite'](_0x7e7534,_0x21c89b);_0x4efb87['bitmap'][_0x163946(0x7d1)](_0x32eab1[_0x2babaa],0x0,0x0,_0x7e7534,_0x21c89b,_0x163946(0x413)),_0x4efb87['x']=(_0x2babaa-(_0x32eab1[_0x163946(0x9b7)]-0x1)/0x2)*_0x7e7534,_0x4efb87['dy']=-_0x2babaa;}},Sprite_Damage[_0x41f3d3(0x1fd)]['useDigitGrouping']=function(){const _0x4836cf=_0x41f3d3;return VisuMZ[_0x4836cf(0x5aa)]['Settings'][_0x4836cf(0x2d1)][_0x4836cf(0xa38)];},Sprite_Damage[_0x41f3d3(0x1fd)][_0x41f3d3(0x36e)]=function(){const _0x24ee8a=_0x41f3d3;return ColorManager[_0x24ee8a(0x938)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x97f)]=Sprite_Gauge[_0x41f3d3(0x1fd)][_0x41f3d3(0x8be)],Sprite_Gauge[_0x41f3d3(0x1fd)]['gaugeRate']=function(){const _0x38c644=_0x41f3d3;return VisuMZ[_0x38c644(0x5aa)][_0x38c644(0x97f)][_0x38c644(0x809)](this)['clamp'](0x0,0x1);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5f4)]=Sprite_Gauge['prototype'][_0x41f3d3(0x1d4)],Sprite_Gauge[_0x41f3d3(0x1fd)]['currentValue']=function(){const _0x282ca6=_0x41f3d3;let _0x1ead69=VisuMZ['CoreEngine'][_0x282ca6(0x5f4)]['call'](this);return _0x1ead69;},Sprite_Gauge['prototype'][_0x41f3d3(0x9ec)]=function(){const _0x2fcc23=_0x41f3d3;let _0x2e2244=this[_0x2fcc23(0x1d4)]();this['useDigitGrouping']()&&(_0x2e2244=VisuMZ[_0x2fcc23(0x684)](_0x2e2244));const _0x544b9b=this['bitmapWidth']()-0x1,_0x47474e=this[_0x2fcc23(0x609)]?this[_0x2fcc23(0x609)]():this[_0x2fcc23(0xa2c)]();this[_0x2fcc23(0x7aa)](),this['bitmap'][_0x2fcc23(0x7d1)](_0x2e2244,0x0,0x0,_0x544b9b,_0x47474e,_0x2fcc23(0x5ed));},Sprite_Gauge[_0x41f3d3(0x1fd)][_0x41f3d3(0x4e5)]=function(){return 0x3;},Sprite_Gauge[_0x41f3d3(0x1fd)][_0x41f3d3(0x82e)]=function(){const _0x3ff968=_0x41f3d3;return VisuMZ[_0x3ff968(0x5aa)][_0x3ff968(0x5b1)][_0x3ff968(0x2d1)][_0x3ff968(0x389)];},Sprite_Gauge['prototype'][_0x41f3d3(0x36e)]=function(){const _0x5d0b4c=_0x41f3d3;return ColorManager[_0x5d0b4c(0x58a)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x1ac)]=Sprite_Picture[_0x41f3d3(0x1fd)]['loadBitmap'],Sprite_Picture[_0x41f3d3(0x1fd)]['loadBitmap']=function(){const _0x8125e3=_0x41f3d3;this[_0x8125e3(0xa1c)]&&this[_0x8125e3(0xa1c)][_0x8125e3(0x420)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x8125e3(0x716)](Number(RegExp['$1'])):VisuMZ[_0x8125e3(0x5aa)][_0x8125e3(0x1ac)][_0x8125e3(0x809)](this);},Sprite_Picture['prototype'][_0x41f3d3(0x716)]=function(_0x339c4f){const _0x4d5296=_0x41f3d3,_0x2e9ef6=ImageManager['iconWidth'],_0x19deb0=ImageManager[_0x4d5296(0x6df)],_0x3a7582=this[_0x4d5296(0xa1c)][_0x4d5296(0x420)](/SMOOTH/i);this[_0x4d5296(0x5b0)]=new Bitmap(_0x2e9ef6,_0x19deb0);const _0x50793b=ImageManager[_0x4d5296(0x1ec)](_0x4d5296(0x2f5)),_0xc3c07f=_0x339c4f%0x10*_0x2e9ef6,_0x4d7d52=Math[_0x4d5296(0x6ae)](_0x339c4f/0x10)*_0x19deb0;this['bitmap'][_0x4d5296(0x69f)]=_0x3a7582,this['bitmap']['blt'](_0x50793b,_0xc3c07f,_0x4d7d52,_0x2e9ef6,_0x19deb0,0x0,0x0,_0x2e9ef6,_0x19deb0);};function Sprite_TitlePictureButton(){const _0x16b390=_0x41f3d3;this[_0x16b390(0x927)](...arguments);}Sprite_TitlePictureButton[_0x41f3d3(0x1fd)]=Object[_0x41f3d3(0x65d)](Sprite_Clickable[_0x41f3d3(0x1fd)]),Sprite_TitlePictureButton['prototype'][_0x41f3d3(0x9a5)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x41f3d3(0x1fd)]['initialize']=function(_0xef8ac){const _0x2887dc=_0x41f3d3;Sprite_Clickable[_0x2887dc(0x1fd)][_0x2887dc(0x927)][_0x2887dc(0x809)](this),this[_0x2887dc(0x407)]=_0xef8ac,this['_clickHandler']=null,this[_0x2887dc(0x657)]();},Sprite_TitlePictureButton[_0x41f3d3(0x1fd)][_0x41f3d3(0x657)]=function(){const _0x38ebe9=_0x41f3d3;this['x']=Graphics[_0x38ebe9(0x665)],this['y']=Graphics[_0x38ebe9(0x4f1)],this[_0x38ebe9(0x2f6)]=![],this[_0x38ebe9(0x36c)]();},Sprite_TitlePictureButton[_0x41f3d3(0x1fd)][_0x41f3d3(0x36c)]=function(){const _0x2a984f=_0x41f3d3;this[_0x2a984f(0x5b0)]=ImageManager['loadPicture'](this[_0x2a984f(0x407)][_0x2a984f(0x1d3)]),this[_0x2a984f(0x5b0)]['addLoadListener'](this[_0x2a984f(0x602)]['bind'](this));},Sprite_TitlePictureButton[_0x41f3d3(0x1fd)][_0x41f3d3(0x602)]=function(){const _0x37f3d6=_0x41f3d3;this[_0x37f3d6(0x407)]['OnLoadJS'][_0x37f3d6(0x809)](this),this['_data']['PositionJS'][_0x37f3d6(0x809)](this),this[_0x37f3d6(0x65c)](this[_0x37f3d6(0x407)][_0x37f3d6(0x5b5)][_0x37f3d6(0x508)](this));},Sprite_TitlePictureButton[_0x41f3d3(0x1fd)]['update']=function(){const _0x4456bc=_0x41f3d3;Sprite_Clickable['prototype'][_0x4456bc(0x314)][_0x4456bc(0x809)](this),this[_0x4456bc(0x1e2)](),this[_0x4456bc(0x4f6)]();},Sprite_TitlePictureButton[_0x41f3d3(0x1fd)][_0x41f3d3(0x1cd)]=function(){const _0x59c443=_0x41f3d3;return VisuMZ['CoreEngine'][_0x59c443(0x5b1)][_0x59c443(0x20d)][_0x59c443(0x251)][_0x59c443(0x9b2)];},Sprite_TitlePictureButton[_0x41f3d3(0x1fd)][_0x41f3d3(0x1e2)]=function(){const _0xde516b=_0x41f3d3;this[_0xde516b(0x704)]||this[_0xde516b(0x2ef)]?this[_0xde516b(0x9d1)]=0xff:(this[_0xde516b(0x9d1)]+=this[_0xde516b(0x2f6)]?this[_0xde516b(0x1cd)]():-0x1*this[_0xde516b(0x1cd)](),this[_0xde516b(0x9d1)]=Math['min'](0xc0,this['opacity']));},Sprite_TitlePictureButton['prototype'][_0x41f3d3(0x65c)]=function(_0x490f69){const _0x2a8732=_0x41f3d3;this[_0x2a8732(0x9f7)]=_0x490f69;},Sprite_TitlePictureButton['prototype']['onClick']=function(){const _0x1a2cbc=_0x41f3d3;if(this[_0x1a2cbc(0x9f7)]){if('xlrrQ'===_0x1a2cbc(0x6a0)){const _0x1ed40e=this[_0x1a2cbc(0x3e3)]()[_0x1a2cbc(0x8cb)][_0x59b8d7][0x63],_0x2d09e3=this[_0x1a2cbc(0x3e3)]()[_0x1a2cbc(0x8cb)][_0x3ac210][0x62];return _0x1ed40e+(_0x1ed40e-_0x2d09e3)*(this['level']-0x63);}else this[_0x1a2cbc(0x9f7)]();}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x467)]=Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)],Spriteset_Base['prototype']['initialize']=function(){const _0xa78bff=_0x41f3d3;VisuMZ['CoreEngine'][_0xa78bff(0x467)][_0xa78bff(0x809)](this),this[_0xa78bff(0x9fe)]();},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x9fe)]=function(){const _0x3ef885=_0x41f3d3;this[_0x3ef885(0x28b)]=[],this['_pointAnimationSprites']=[],this[_0x3ef885(0x7a8)]=this[_0x3ef885(0x950)]['x'],this[_0x3ef885(0x2ab)]=this['scale']['y'];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x378)]=Spriteset_Base[_0x41f3d3(0x1fd)]['destroy'],Spriteset_Base['prototype'][_0x41f3d3(0x9ff)]=function(_0x3d3e41){const _0x4ca991=_0x41f3d3;this[_0x4ca991(0x220)](),this['removeAllPointAnimations'](),VisuMZ[_0x4ca991(0x5aa)][_0x4ca991(0x378)][_0x4ca991(0x809)](this,_0x3d3e41);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x9ee)]=Spriteset_Base[_0x41f3d3(0x1fd)]['update'],Spriteset_Base[_0x41f3d3(0x1fd)]['update']=function(){const _0x4907c6=_0x41f3d3;VisuMZ[_0x4907c6(0x5aa)][_0x4907c6(0x9ee)][_0x4907c6(0x809)](this),this[_0x4907c6(0x74a)](),this[_0x4907c6(0x4e6)](),this[_0x4907c6(0x200)]();},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x74a)]=function(){const _0x5c35be=_0x41f3d3;if(!VisuMZ[_0x5c35be(0x5aa)]['Settings'][_0x5c35be(0x2d1)]['AntiZoomPictures'])return;if(this['_cacheScaleX']===this['scale']['x']&&this[_0x5c35be(0x2ab)]===this['scale']['y'])return;this[_0x5c35be(0x944)](),this[_0x5c35be(0x7a8)]=this['scale']['x'],this[_0x5c35be(0x2ab)]=this[_0x5c35be(0x950)]['y'];},Spriteset_Base['prototype'][_0x41f3d3(0x944)]=function(){const _0x6b2405=_0x41f3d3;if(SceneManager[_0x6b2405(0x736)]()&&Spriteset_Map[_0x6b2405(0x1f1)])return;else{if(SceneManager[_0x6b2405(0x19b)]()&&Spriteset_Battle[_0x6b2405(0x1f1)]){if('rUsKR'!==_0x6b2405(0x8f8))return;else _0x279307[_0x6b2405(0x212)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x29cdda['level']=_0x244b1c['max'](_0x37a712(_0x7b4bcb['$1']),0x1));}}this['scale']['x']!==0x0&&(this[_0x6b2405(0x5fc)][_0x6b2405(0x950)]['x']=0x1/this[_0x6b2405(0x950)]['x'],this[_0x6b2405(0x5fc)]['x']=-(this['x']/this[_0x6b2405(0x950)]['x'])),this[_0x6b2405(0x950)]['y']!==0x0&&('MqLqz'!==_0x6b2405(0x50b)?(this['_pictureContainer'][_0x6b2405(0x950)]['y']=0x1/this[_0x6b2405(0x950)]['y'],this[_0x6b2405(0x5fc)]['y']=-(this['y']/this[_0x6b2405(0x950)]['y'])):this['cursorPageup']());},VisuMZ['CoreEngine'][_0x41f3d3(0x482)]=Spriteset_Base['prototype'][_0x41f3d3(0x70a)],Spriteset_Base['prototype']['updatePosition']=function(){const _0x3a58a1=_0x41f3d3;VisuMZ['CoreEngine'][_0x3a58a1(0x482)][_0x3a58a1(0x809)](this),this[_0x3a58a1(0x441)]();},Spriteset_Base['prototype']['updatePositionCoreEngine']=function(){const _0x407939=_0x41f3d3;if(!$gameScreen)return;if($gameScreen[_0x407939(0x2c2)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x407939(0x6a7)]());const _0x1d88c6=$gameScreen[_0x407939(0x1e7)]();switch($gameScreen[_0x407939(0x1e7)]()){case _0x407939(0x2b0):this[_0x407939(0x73c)]();break;case _0x407939(0x2a9):this[_0x407939(0x4a0)]();break;case _0x407939(0x947):this[_0x407939(0x72d)]();break;default:this[_0x407939(0x372)]();break;}},Spriteset_Base['prototype']['updatePositionCoreEngineShakeOriginal']=function(){const _0x55ec40=_0x41f3d3,_0x1780c7=VisuMZ['CoreEngine'][_0x55ec40(0x5b1)][_0x55ec40(0x53e)];if(_0x1780c7&&_0x1780c7[_0x55ec40(0x7f5)])return _0x1780c7[_0x55ec40(0x7f5)]['call'](this);this['x']+=Math[_0x55ec40(0x92b)]($gameScreen[_0x55ec40(0x6a7)]());},Spriteset_Base['prototype'][_0x41f3d3(0x372)]=function(){const _0x3834d8=_0x41f3d3,_0x5cbfa9=VisuMZ[_0x3834d8(0x5aa)][_0x3834d8(0x5b1)]['ScreenShake'];if(_0x5cbfa9&&_0x5cbfa9['randomJS']){if(_0x3834d8(0x6b1)==='SDWso')return _0x5cbfa9[_0x3834d8(0x77b)][_0x3834d8(0x809)](this);else{try{_0xa49e82[_0x3834d8(0x5aa)][_0x3834d8(0x51f)][_0x3834d8(0x809)](this,_0xc52fc1);}catch(_0x420ccd){_0x371ec2[_0x3834d8(0x67d)]()&&(_0x147fa9[_0x3834d8(0x5e6)](_0x3834d8(0x5d4)),_0x479bc0[_0x3834d8(0x5e6)](_0x420ccd));}return!![];}}const _0x11592f=$gameScreen[_0x3834d8(0x937)]*0.75,_0x2cfe90=$gameScreen[_0x3834d8(0x461)]*0.6,_0x1dca07=$gameScreen[_0x3834d8(0x2c2)];this['x']+=Math[_0x3834d8(0x92b)](Math['randomInt'](_0x11592f)-Math[_0x3834d8(0x5b9)](_0x2cfe90))*(Math[_0x3834d8(0x568)](_0x1dca07,0x1e)*0.5),this['y']+=Math[_0x3834d8(0x92b)](Math['randomInt'](_0x11592f)-Math[_0x3834d8(0x5b9)](_0x2cfe90))*(Math['min'](_0x1dca07,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x721f40=_0x41f3d3,_0x15bbdb=VisuMZ['CoreEngine']['Settings'][_0x721f40(0x53e)];if(_0x15bbdb&&_0x15bbdb[_0x721f40(0x57a)]){if('WGMSQ'!==_0x721f40(0x856))return _0x15bbdb['horzJS'][_0x721f40(0x809)](this);else this[_0x721f40(0x71b)]();}const _0x1e9063=$gameScreen[_0x721f40(0x937)]*0.75,_0x4525b3=$gameScreen[_0x721f40(0x461)]*0.6,_0x342bf8=$gameScreen[_0x721f40(0x2c2)];this['x']+=Math[_0x721f40(0x92b)](Math[_0x721f40(0x5b9)](_0x1e9063)-Math['randomInt'](_0x4525b3))*(Math[_0x721f40(0x568)](_0x342bf8,0x1e)*0.5);},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x72d)]=function(){const _0x553d3a=_0x41f3d3,_0x26a388=VisuMZ['CoreEngine'][_0x553d3a(0x5b1)][_0x553d3a(0x53e)];if(_0x26a388&&_0x26a388['vertJS'])return _0x26a388['vertJS']['call'](this);const _0x3ed9f6=$gameScreen[_0x553d3a(0x937)]*0.75,_0x18805f=$gameScreen[_0x553d3a(0x461)]*0.6,_0x18a092=$gameScreen[_0x553d3a(0x2c2)];this['y']+=Math[_0x553d3a(0x92b)](Math[_0x553d3a(0x5b9)](_0x3ed9f6)-Math[_0x553d3a(0x5b9)](_0x18805f))*(Math[_0x553d3a(0x568)](_0x18a092,0x1e)*0.5);},Spriteset_Base['prototype']['updateFauxAnimations']=function(){const _0x37c4dc=_0x41f3d3;for(const _0xa58be1 of this['_fauxAnimationSprites']){if(!_0xa58be1[_0x37c4dc(0x634)]()){if(_0x37c4dc(0x6f7)==='OOJpP')this['removeFauxAnimation'](_0xa58be1);else return _0x5e7b01[_0x37c4dc(0x1fb)][_0x37c4dc(0x37e)][_0x37c4dc(0x809)](this);}}this[_0x37c4dc(0x82b)]();},Spriteset_Base['prototype']['processFauxAnimationRequests']=function(){const _0x26f129=_0x41f3d3;for(;;){const _0x109759=$gameTemp[_0x26f129(0x9f9)]();if(_0x109759)this[_0x26f129(0x2c6)](_0x109759);else{if(_0x26f129(0x3aa)===_0x26f129(0x3aa))break;else return _0x55a542;}}},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x2c6)]=function(_0x3531d8){const _0x843224=_0x41f3d3,_0x56dc55=$dataAnimations[_0x3531d8[_0x843224(0x8ba)]],_0x304ed7=_0x3531d8[_0x843224(0x2fb)],_0x449408=_0x3531d8[_0x843224(0x80c)],_0x59858d=_0x3531d8[_0x843224(0x7bd)];let _0x2acc46=this[_0x843224(0x2cf)]();const _0x3f8141=this[_0x843224(0x471)]();if(this[_0x843224(0x5a1)](_0x56dc55))for(const _0x1035b3 of _0x304ed7){this[_0x843224(0x4ae)]([_0x1035b3],_0x56dc55,_0x449408,_0x2acc46,_0x59858d),_0x2acc46+=_0x3f8141;}else this['createFauxAnimationSprite'](_0x304ed7,_0x56dc55,_0x449408,_0x2acc46,_0x59858d);},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x693)]=function(_0x3fe532,_0x2630e2,_0x5aafad,_0x319117){const _0x3cf984=_0x41f3d3,_0x2966fb=this[_0x3cf984(0x348)](_0x2630e2),_0xf55c94=new(_0x2966fb?Sprite_AnimationMV:Sprite_Animation)(),_0x5bebfd=this[_0x3cf984(0x8cf)](_0x3fe532),_0xc1d858=this['animationBaseDelay'](),_0x24430a=_0x319117>_0xc1d858?this[_0x3cf984(0x68c)]():null;this[_0x3cf984(0x596)](_0x3fe532[0x0])&&(_0x5aafad=!_0x5aafad),_0xf55c94[_0x3cf984(0x1a5)]=_0x3fe532,_0xf55c94['setup'](_0x5bebfd,_0x2630e2,_0x5aafad,_0x319117,_0x24430a),this[_0x3cf984(0x5e3)](_0xf55c94),this[_0x3cf984(0x79f)][_0x3cf984(0x7df)](_0xf55c94);},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x4ae)]=function(_0x3cc688,_0xc47a62,_0x2ed50a,_0x7d4bf2,_0x340262){const _0x153649=_0x41f3d3,_0x2e119f=this[_0x153649(0x348)](_0xc47a62),_0x5f3a63=new(_0x2e119f?Sprite_AnimationMV:Sprite_Animation)(),_0x455977=this[_0x153649(0x8cf)](_0x3cc688);this['animationShouldMirror'](_0x3cc688[0x0])&&(_0x2ed50a=!_0x2ed50a);_0x5f3a63[_0x153649(0x1a5)]=_0x3cc688,_0x5f3a63[_0x153649(0x657)](_0x455977,_0xc47a62,_0x2ed50a,_0x7d4bf2),_0x5f3a63[_0x153649(0x1fc)](_0x340262),this[_0x153649(0x5e3)](_0x5f3a63);if(this['_animationSprites'])this[_0x153649(0x79f)][_0x153649(0x907)](_0x5f3a63);this[_0x153649(0x28b)][_0x153649(0x7df)](_0x5f3a63);},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x5e3)]=function(_0x3fc864){const _0x19af22=_0x41f3d3;this['_effectsContainer'][_0x19af22(0x65e)](_0x3fc864);},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x1f7)]=function(_0x2725e2){const _0x473f11=_0x41f3d3;this['_animationSprites'][_0x473f11(0x907)](_0x2725e2),this[_0x473f11(0x366)](_0x2725e2);for(const _0x4a312b of _0x2725e2[_0x473f11(0x1a5)]){_0x473f11(0x988)==='FUCss'?this[_0x473f11(0x23a)][_0x473f11(0x564)](_0x4c5c21['layoutSettings']['InputBgType']):_0x4a312b[_0x473f11(0x233)]&&_0x4a312b[_0x473f11(0x233)]();}_0x2725e2[_0x473f11(0x9ff)]();},Spriteset_Base[_0x41f3d3(0x1fd)]['removeFauxAnimation']=function(_0x7ef65b){const _0x4205e5=_0x41f3d3;this['_fauxAnimationSprites'][_0x4205e5(0x907)](_0x7ef65b),this['removeAnimationFromContainer'](_0x7ef65b);for(const _0x46b20a of _0x7ef65b['targetObjects']){_0x46b20a[_0x4205e5(0x233)]&&_0x46b20a['endAnimation']();}_0x7ef65b[_0x4205e5(0x9ff)]();},Spriteset_Base['prototype']['removeAnimationFromContainer']=function(_0x1d6585){const _0x54b35c=_0x41f3d3;this[_0x54b35c(0x2a7)][_0x54b35c(0x45f)](_0x1d6585);},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x220)]=function(){const _0x187355=_0x41f3d3;for(const _0x29d58b of this[_0x187355(0x28b)]){_0x187355(0x75a)!==_0x187355(0x75a)?this[_0x187355(0x765)]&&(this[_0x187355(0x6d7)]-=this[_0x187355(0x325)](),this[_0x187355(0x557)]()&&(this['_closing']=![])):this[_0x187355(0x8f5)](_0x29d58b);}},Spriteset_Base[_0x41f3d3(0x1fd)]['isFauxAnimationPlaying']=function(){const _0x51306c=_0x41f3d3;return this[_0x51306c(0x28b)][_0x51306c(0x9b7)]>0x0;},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x200)]=function(){const _0x435a8c=_0x41f3d3;for(const _0x5686ab of this[_0x435a8c(0x671)]){if('SIzIQ'===_0x435a8c(0xa63))!_0x5686ab['isPlaying']()&&(_0x435a8c(0x1f5)===_0x435a8c(0x974)?this[_0x435a8c(0x3b1)]():this[_0x435a8c(0x3ac)](_0x5686ab));else return _0x5a52bf[_0x435a8c(0x1fb)][_0x435a8c(0x7c0)]['call'](this);}this[_0x435a8c(0x3fa)]();},Spriteset_Base['prototype'][_0x41f3d3(0x3fa)]=function(){const _0x23af7d=_0x41f3d3;for(;;){const _0x52db63=$gameTemp[_0x23af7d(0x1f6)]();if(_0x52db63){if(_0x23af7d(0x756)===_0x23af7d(0x756))this[_0x23af7d(0x84b)](_0x52db63);else return _0x31e9da[_0x23af7d(0x1fd)][_0x23af7d(0x301)][_0x23af7d(0x809)](this,_0x347cf9);}else break;}},Spriteset_Base['prototype']['createPointAnimation']=function(_0x1d683b){const _0x509af3=_0x41f3d3,_0x42d38e=$dataAnimations[_0x1d683b['animationId']],_0x57ef52=this['createPointAnimationTargets'](_0x1d683b),_0x13fe5d=_0x1d683b[_0x509af3(0x80c)],_0x3adf7b=_0x1d683b[_0x509af3(0x7bd)];let _0x3505a8=this['animationBaseDelay']();const _0x162a5f=this[_0x509af3(0x471)]();if(this[_0x509af3(0x5a1)](_0x42d38e))for(const _0x1b194c of _0x57ef52){this['createPointAnimationSprite']([_0x1b194c],_0x42d38e,_0x13fe5d,_0x3505a8,_0x3adf7b),_0x3505a8+=_0x162a5f;}else{if(_0x509af3(0x928)==='Zjdud'){const _0x2332f5=_0x24fa88[_0x509af3(0x962)]()<=_0x3e2375;_0x4c61dc[_0x509af3(0x48d)](_0x35c630,_0x2332f5);}else this['createPointAnimationSprite'](_0x57ef52,_0x42d38e,_0x13fe5d,_0x3505a8,_0x3adf7b);}},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x7b9)]=function(_0x30d7b0){const _0x584885=_0x41f3d3,_0x3fa826=new Sprite_Clickable(),_0x106f50=this[_0x584885(0x6bc)]();_0x3fa826['x']=_0x30d7b0['x']-_0x106f50['x'],_0x3fa826['y']=_0x30d7b0['y']-_0x106f50['y'],_0x3fa826['z']=0x64;const _0x14a3e0=this['getPointAnimationLayer']();return _0x14a3e0['addChild'](_0x3fa826),[_0x3fa826];},Spriteset_Base[_0x41f3d3(0x1fd)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map['prototype'][_0x41f3d3(0x6bc)]=function(){const _0x5ecad8=_0x41f3d3;return this[_0x5ecad8(0x7c8)]||this;},Spriteset_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x6bc)]=function(){const _0xca0314=_0x41f3d3;return this[_0xca0314(0x6e5)]||this;},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x1ee)]=function(_0x58de18,_0x2c7d79,_0x166395,_0xe5e30b,_0x3ead9a){const _0x1ea21a=_0x41f3d3,_0x35cf7d=this[_0x1ea21a(0x348)](_0x2c7d79),_0x1ff216=new(_0x35cf7d?Sprite_AnimationMV:Sprite_Animation)();_0x1ff216[_0x1ea21a(0x1a5)]=_0x58de18,_0x1ff216[_0x1ea21a(0x657)](_0x58de18,_0x2c7d79,_0x166395,_0xe5e30b),_0x1ff216[_0x1ea21a(0x1fc)](_0x3ead9a),this[_0x1ea21a(0x5e3)](_0x1ff216),this[_0x1ea21a(0x671)]['push'](_0x1ff216);},Spriteset_Base['prototype'][_0x41f3d3(0x3ac)]=function(_0x1896d1){const _0x234657=_0x41f3d3;this['_pointAnimationSprites'][_0x234657(0x907)](_0x1896d1),this[_0x234657(0x2a7)][_0x234657(0x45f)](_0x1896d1);for(const _0x317469 of _0x1896d1[_0x234657(0x1a5)]){_0x317469[_0x234657(0x233)]&&_0x317469[_0x234657(0x233)]();const _0x4fb879=this[_0x234657(0x6bc)]();if(_0x4fb879)_0x4fb879[_0x234657(0x45f)](_0x317469);}_0x1896d1['destroy']();},Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x513)]=function(){const _0x5ecce8=_0x41f3d3;for(const _0x5474ea of this[_0x5ecce8(0x671)]){_0x5ecce8(0x8c0)!==_0x5ecce8(0x8c0)?(this[_0x5ecce8(0x9d1)]+=this['visible']?this[_0x5ecce8(0x1cd)]():-0x1*this['fadeSpeed'](),this[_0x5ecce8(0x9d1)]=_0x16469c['min'](0xc0,this[_0x5ecce8(0x9d1)])):this[_0x5ecce8(0x3ac)](_0x5474ea);}},Spriteset_Base[_0x41f3d3(0x1fd)]['isPointAnimationPlaying']=function(){const _0x4b3a=_0x41f3d3;return this[_0x4b3a(0x671)][_0x4b3a(0x9b7)]>0x0;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x994)]=Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x26d)],Spriteset_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x26d)]=function(){const _0x28133b=_0x41f3d3;return VisuMZ[_0x28133b(0x5aa)]['Spriteset_Base_isAnimationPlaying'][_0x28133b(0x809)](this)||this[_0x28133b(0x8f0)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ['CoreEngine']['Settings'][_0x41f3d3(0x2d1)][_0x41f3d3(0x762)]||![],VisuMZ[_0x41f3d3(0x5aa)]['Scene_Map_createSpriteset_detach']=Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)],Scene_Map[_0x41f3d3(0x1fd)]['createSpriteset']=function(){const _0x5d1feb=_0x41f3d3;VisuMZ[_0x5d1feb(0x5aa)][_0x5d1feb(0xa52)][_0x5d1feb(0x809)](this);if(!Spriteset_Map[_0x5d1feb(0x1f1)])return;const _0x124817=this[_0x5d1feb(0x5ab)];if(!_0x124817)return;this[_0x5d1feb(0x5fc)]=_0x124817[_0x5d1feb(0x5fc)];if(!this[_0x5d1feb(0x5fc)])return;this[_0x5d1feb(0x65e)](this[_0x5d1feb(0x5fc)]);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x2d1)][_0x41f3d3(0x459)]||![],VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x307)]=Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)],Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)]=function(){const _0x1ebac0=_0x41f3d3;VisuMZ['CoreEngine'][_0x1ebac0(0x307)]['call'](this);if(!Spriteset_Battle[_0x1ebac0(0x1f1)])return;const _0x4d87fb=this[_0x1ebac0(0x5ab)];if(!_0x4d87fb)return;this['_pictureContainer']=_0x4d87fb[_0x1ebac0(0x5fc)];if(!this[_0x1ebac0(0x5fc)])return;this['addChild'](this[_0x1ebac0(0x5fc)]);},Spriteset_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x530)]=function(){const _0x37ae6c=_0x41f3d3;this[_0x37ae6c(0x93b)]=new PIXI[(_0x37ae6c(0x3c1))][(_0x37ae6c(0x90b))](clamp=!![]),this[_0x37ae6c(0x8ee)]=new Sprite(),this[_0x37ae6c(0x8ee)][_0x37ae6c(0x5b0)]=SceneManager[_0x37ae6c(0x225)](),this[_0x37ae6c(0x8ee)]['filters']=[this[_0x37ae6c(0x93b)]],this[_0x37ae6c(0x509)]['addChild'](this[_0x37ae6c(0x8ee)]);},VisuMZ[_0x41f3d3(0x5aa)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x898)],Spriteset_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x898)]=function(){const _0xe59828=_0x41f3d3;this['coreEngineRepositionEnemies']()&&this['repositionEnemiesByResolution'](),VisuMZ[_0xe59828(0x5aa)][_0xe59828(0x25b)][_0xe59828(0x809)](this);},Spriteset_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x7ef)]=function(){const _0x3117fa=_0x41f3d3,_0x1f8096=VisuMZ['CoreEngine'][_0x3117fa(0x5b1)][_0x3117fa(0x8db)];if(!_0x1f8096)return![];if(Utils[_0x3117fa(0x595)]>='1.3.0'&&!_0x1f8096['RepositionEnemies130'])return![];return _0x1f8096[_0x3117fa(0x740)];},Spriteset_Battle[_0x41f3d3(0x1fd)]['repositionEnemiesByResolution']=function(){const _0xe65d46=_0x41f3d3;for(member of $gameTroop['members']()){'sIZQR'!==_0xe65d46(0x7e1)?member['moveRelativeToResolutionChange']():(_0x21aa27['pan']=_0x22ec9b,_0xb37c0d[_0xe65d46(0x190)]=_0x2b956c['_bgsBuffer'][_0xe65d46(0x9c2)](),_0x454d99[_0xe65d46(0x385)](_0x17157d),_0x2ad7f9[_0xe65d46(0x30e)](_0x14608c,_0x573204[_0xe65d46(0x190)]),_0x81a5bd['_bgmBuffer']['_startPlaying'](_0x4ac0a4[_0xe65d46(0x190)]));}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x9c1)]=Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)],Window_Base[_0x41f3d3(0x1fd)]['initialize']=function(_0xe5650f){const _0x9889e3=_0x41f3d3;_0xe5650f['x']=Math['round'](_0xe5650f['x']),_0xe5650f['y']=Math['round'](_0xe5650f['y']),_0xe5650f[_0x9889e3(0x665)]=Math[_0x9889e3(0x92b)](_0xe5650f[_0x9889e3(0x665)]),_0xe5650f[_0x9889e3(0x4f1)]=Math[_0x9889e3(0x92b)](_0xe5650f[_0x9889e3(0x4f1)]),this['initDigitGrouping'](),VisuMZ[_0x9889e3(0x5aa)][_0x9889e3(0x9c1)][_0x9889e3(0x809)](this,_0xe5650f),this[_0x9889e3(0x368)]();},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x2a1)]=function(){const _0x3508fb=_0x41f3d3;this[_0x3508fb(0x99f)]=VisuMZ[_0x3508fb(0x5aa)]['Settings'][_0x3508fb(0x2d1)]['DigitGroupingStandardText'],this[_0x3508fb(0x333)]=VisuMZ['CoreEngine'][_0x3508fb(0x5b1)][_0x3508fb(0x2d1)]['DigitGroupingExText'];},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x3c0)]=function(){const _0x42fc32=_0x41f3d3;return VisuMZ[_0x42fc32(0x5aa)][_0x42fc32(0x5b1)]['Window'][_0x42fc32(0xa2b)];},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x505)]=function(){const _0x314ad8=_0x41f3d3;return VisuMZ[_0x314ad8(0x5aa)]['Settings'][_0x314ad8(0x1c6)]['ItemPadding'];},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x579)]=function(){const _0x2d2a89=_0x41f3d3;if($gameSystem[_0x2d2a89(0x559)]){if(_0x2d2a89(0x4c9)!==_0x2d2a89(0x1e6))this['backOpacity']=$gameSystem[_0x2d2a89(0x559)]();else{_0x12a2c5[_0x2d2a89(0x5eb)](_0x3fe2b6,_0x334ed6);const _0x177ecd=_0x58f6fe[_0x2d2a89(0x92b)](_0x1afae9[_0x2d2a89(0x6a5)])[_0x2d2a89(0x4f8)](-0x64,0x64),_0x3254c4=_0x47bdc1['_currentBgs'];_0x3254c4&&(_0x3254c4['pan']=_0x177ecd,_0x3254c4[_0x2d2a89(0x190)]=_0x1c3d26[_0x2d2a89(0x1b5)][_0x2d2a89(0x9c2)](),_0x198a80['updateBgmParameters'](_0x3254c4),_0x32091a[_0x2d2a89(0x30e)](_0x3254c4,_0x3254c4[_0x2d2a89(0x190)]),_0x49bb64['_bgmBuffer']['_startPlaying'](_0x3254c4[_0x2d2a89(0x190)]));}}else this['backOpacity']=VisuMZ['CoreEngine']['Settings'][_0x2d2a89(0x1c6)][_0x2d2a89(0x6ba)];},Window_Base['prototype'][_0x41f3d3(0x813)]=function(){const _0x33d56d=_0x41f3d3;return VisuMZ['CoreEngine'][_0x33d56d(0x5b1)][_0x33d56d(0x1c6)]['TranslucentOpacity'];},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x325)]=function(){const _0x158c4a=_0x41f3d3;return VisuMZ[_0x158c4a(0x5aa)][_0x158c4a(0x5b1)][_0x158c4a(0x1c6)][_0x158c4a(0x52b)];},VisuMZ['CoreEngine'][_0x41f3d3(0x88c)]=Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x314)],Window_Base['prototype'][_0x41f3d3(0x314)]=function(){const _0x3a6c1e=_0x41f3d3;VisuMZ['CoreEngine'][_0x3a6c1e(0x88c)][_0x3a6c1e(0x809)](this),this[_0x3a6c1e(0x5a0)]();},Window_Base[_0x41f3d3(0x1fd)]['updateOpen']=function(){const _0x5c64a3=_0x41f3d3;this[_0x5c64a3(0x7ad)]&&(this[_0x5c64a3(0x6d7)]+=this[_0x5c64a3(0x325)](),this[_0x5c64a3(0x780)]()&&(_0x5c64a3(0x262)===_0x5c64a3(0x667)?(_0x497ae9=_0x547b2c[_0x5c64a3(0x92b)](_0x5b849d),_0x2ca02a=_0x2dcd43['round'](_0x29ea2d),_0x9e08b1=_0x466204[_0x5c64a3(0x92b)](_0x572fa0),_0x26d883=_0x5317f8[_0x5c64a3(0x92b)](_0x219c27),_0x3d84ae=_0x34a5cd['round'](_0x595136),_0x22fa62=_0x2c0f60[_0x5c64a3(0x92b)](_0x5c31b1),_0x6c8910[_0x5c64a3(0x5aa)][_0x5c64a3(0x8e1)][_0x5c64a3(0x809)](this,_0x42f34c,_0x2313ac,_0x9e033c,_0x482281,_0x4e0e4e,_0x4a13c8,_0x3d04d3,_0x4f60f6,_0x274b19),this[_0x5c64a3(0x7bb)]()):this[_0x5c64a3(0x7ad)]=![]));},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x317)]=function(){const _0x181e01=_0x41f3d3;this[_0x181e01(0x765)]&&('CJqmm'===_0x181e01(0x7d7)?(this[_0x181e01(0x6d7)]-=this[_0x181e01(0x325)](),this[_0x181e01(0x557)]()&&(this[_0x181e01(0x765)]=![])):(_0x346796['CoreEngine'][_0x181e01(0x467)][_0x181e01(0x809)](this),this[_0x181e01(0x9fe)]()));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x753)]=Window_Base[_0x41f3d3(0x1fd)]['drawText'],Window_Base[_0x41f3d3(0x1fd)]['drawText']=function(_0x5672c3,_0x3390b2,_0x11a5ff,_0x2c4c91,_0x2bdaa9){const _0x4f3dc4=_0x41f3d3;if(this[_0x4f3dc4(0x82e)]())_0x5672c3=VisuMZ[_0x4f3dc4(0x684)](_0x5672c3);VisuMZ[_0x4f3dc4(0x5aa)][_0x4f3dc4(0x753)][_0x4f3dc4(0x809)](this,_0x5672c3,_0x3390b2,_0x11a5ff,_0x2c4c91,_0x2bdaa9);},Window_Base['prototype'][_0x41f3d3(0x82e)]=function(){const _0x2ed7af=_0x41f3d3;return this[_0x2ed7af(0x99f)];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x8fc)]=Window_Base[_0x41f3d3(0x1fd)]['createTextState'],Window_Base[_0x41f3d3(0x1fd)]['createTextState']=function(_0x184411,_0x2c32cf,_0x1224e6,_0x5c811a){const _0x19d66a=_0x41f3d3;var _0x56b136=VisuMZ[_0x19d66a(0x5aa)][_0x19d66a(0x8fc)][_0x19d66a(0x809)](this,_0x184411,_0x2c32cf,_0x1224e6,_0x5c811a);if(this[_0x19d66a(0x60d)]())_0x56b136['text']=VisuMZ['GroupDigits'](_0x56b136['text']);return _0x56b136;},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x60d)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x2f2)]=function(_0x506496){const _0x34f575=_0x41f3d3;this[_0x34f575(0x99f)]=_0x506496;},Window_Base['prototype'][_0x41f3d3(0x298)]=function(_0x4a52c0){const _0x3b404a=_0x41f3d3;this[_0x3b404a(0x333)]=_0x4a52c0;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x88b)]=Window_Base[_0x41f3d3(0x1fd)]['drawIcon'],Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x5c6)]=function(_0x447655,_0x50b2cc,_0x51c443){const _0x3e98fd=_0x41f3d3;_0x50b2cc=Math[_0x3e98fd(0x92b)](_0x50b2cc),_0x51c443=Math['round'](_0x51c443),VisuMZ[_0x3e98fd(0x5aa)][_0x3e98fd(0x88b)][_0x3e98fd(0x809)](this,_0x447655,_0x50b2cc,_0x51c443);},VisuMZ[_0x41f3d3(0x5aa)]['Window_Base_drawFace']=Window_Base[_0x41f3d3(0x1fd)]['drawFace'],Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x274)]=function(_0xa7122a,_0x368c30,_0x511f02,_0x4160ed,_0x285b1e,_0x43dcf6){const _0x49d592=_0x41f3d3;_0x285b1e=_0x285b1e||ImageManager['faceWidth'],_0x43dcf6=_0x43dcf6||ImageManager[_0x49d592(0x984)],_0x511f02=Math[_0x49d592(0x92b)](_0x511f02),_0x4160ed=Math[_0x49d592(0x92b)](_0x4160ed),_0x285b1e=Math[_0x49d592(0x92b)](_0x285b1e),_0x43dcf6=Math['round'](_0x43dcf6),VisuMZ[_0x49d592(0x5aa)][_0x49d592(0xa22)][_0x49d592(0x809)](this,_0xa7122a,_0x368c30,_0x511f02,_0x4160ed,_0x285b1e,_0x43dcf6);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x7cb)]=Window_Base['prototype']['drawCharacter'],Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x9cb)]=function(_0x5459d7,_0xcacaea,_0x51b0b6,_0x44459b){const _0x365d28=_0x41f3d3;_0x51b0b6=Math[_0x365d28(0x92b)](_0x51b0b6),_0x44459b=Math[_0x365d28(0x92b)](_0x44459b),VisuMZ[_0x365d28(0x5aa)][_0x365d28(0x7cb)][_0x365d28(0x809)](this,_0x5459d7,_0xcacaea,_0x51b0b6,_0x44459b);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x213)]=Window_Selectable[_0x41f3d3(0x1fd)]['itemRect'],Window_Selectable['prototype'][_0x41f3d3(0x750)]=function(_0x2bedd7){const _0x24e232=_0x41f3d3;let _0x39d116=VisuMZ['CoreEngine']['Window_Selectable_itemRect'][_0x24e232(0x809)](this,_0x2bedd7);return _0x39d116['x']=Math[_0x24e232(0x92b)](_0x39d116['x']),_0x39d116['y']=Math[_0x24e232(0x92b)](_0x39d116['y']),_0x39d116['width']=Math[_0x24e232(0x92b)](_0x39d116[_0x24e232(0x665)]),_0x39d116[_0x24e232(0x4f1)]=Math['round'](_0x39d116[_0x24e232(0x4f1)]),_0x39d116;},VisuMZ['CoreEngine'][_0x41f3d3(0x4bf)]=Window_StatusBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x92c)],Window_StatusBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x92c)]=function(_0xca8021,_0x2e4286,_0x1e9b92){const _0x30b2ca=_0x41f3d3;_0x2e4286=Math[_0x30b2ca(0x92b)](_0x2e4286),_0x1e9b92=Math[_0x30b2ca(0x92b)](_0x1e9b92),VisuMZ[_0x30b2ca(0x5aa)][_0x30b2ca(0x4bf)][_0x30b2ca(0x809)](this,_0xca8021,_0x2e4286,_0x1e9b92);},Window_Base[_0x41f3d3(0x1fd)]['initCoreEasing']=function(){const _0x59b6d4=_0x41f3d3;this[_0x59b6d4(0x439)]={'duration':0x0,'wholeDuration':0x0,'type':_0x59b6d4(0x2d4),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x59b6d4(0x950)]['x'],'targetScaleY':this[_0x59b6d4(0x950)]['y'],'targetOpacity':this[_0x59b6d4(0x9d1)],'targetBackOpacity':this[_0x59b6d4(0x99b)],'targetContentsOpacity':this[_0x59b6d4(0x73a)]};},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x5a0)]=function(){const _0x3a0992=_0x41f3d3;if(!this[_0x3a0992(0x439)])return;if(this['_coreEasing'][_0x3a0992(0x688)]<=0x0)return;this['x']=this[_0x3a0992(0x2e7)](this['x'],this[_0x3a0992(0x439)][_0x3a0992(0x2ad)]),this['y']=this[_0x3a0992(0x2e7)](this['y'],this[_0x3a0992(0x439)][_0x3a0992(0x61b)]),this[_0x3a0992(0x950)]['x']=this['applyCoreEasing'](this[_0x3a0992(0x950)]['x'],this['_coreEasing'][_0x3a0992(0x41b)]),this[_0x3a0992(0x950)]['y']=this[_0x3a0992(0x2e7)](this[_0x3a0992(0x950)]['y'],this[_0x3a0992(0x439)][_0x3a0992(0xa53)]),this['opacity']=this[_0x3a0992(0x2e7)](this[_0x3a0992(0x9d1)],this[_0x3a0992(0x439)][_0x3a0992(0x550)]),this[_0x3a0992(0x99b)]=this[_0x3a0992(0x2e7)](this['backOpacity'],this[_0x3a0992(0x439)]['targetBackOpacity']),this[_0x3a0992(0x73a)]=this[_0x3a0992(0x2e7)](this['contentsOpacity'],this[_0x3a0992(0x439)][_0x3a0992(0x51e)]),this[_0x3a0992(0x439)][_0x3a0992(0x688)]--;},Window_Base[_0x41f3d3(0x1fd)]['applyCoreEasing']=function(_0x42e36c,_0x4cfffc){const _0x1a386d=_0x41f3d3;if(!this[_0x1a386d(0x439)])return _0x4cfffc;const _0x433d4c=this[_0x1a386d(0x439)][_0x1a386d(0x688)],_0xabe89b=this[_0x1a386d(0x439)][_0x1a386d(0x833)],_0x17a934=this['calcCoreEasing']((_0xabe89b-_0x433d4c)/_0xabe89b),_0x145d55=this[_0x1a386d(0x7e9)]((_0xabe89b-_0x433d4c+0x1)/_0xabe89b),_0xd13f33=(_0x42e36c-_0x4cfffc*_0x17a934)/(0x1-_0x17a934);return _0xd13f33+(_0x4cfffc-_0xd13f33)*_0x145d55;},Window_Base['prototype'][_0x41f3d3(0x7e9)]=function(_0x51d840){const _0x41350c=_0x41f3d3;if(!this['_coreEasing'])return _0x51d840;return VisuMZ[_0x41350c(0x92a)](_0x51d840,this['_coreEasing'][_0x41350c(0x320)]||_0x41350c(0x2d4));},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x744)]=function(_0x4d5db3,_0x3468f9){const _0x410281=_0x41f3d3;if(!this['_coreEasing'])return;this['x']=this[_0x410281(0x439)][_0x410281(0x2ad)],this['y']=this[_0x410281(0x439)][_0x410281(0x61b)],this[_0x410281(0x950)]['x']=this[_0x410281(0x439)][_0x410281(0x41b)],this[_0x410281(0x950)]['y']=this[_0x410281(0x439)][_0x410281(0xa53)],this['opacity']=this['_coreEasing'][_0x410281(0x550)],this['backOpacity']=this[_0x410281(0x439)]['targetBackOpacity'],this[_0x410281(0x73a)]=this['_coreEasing'][_0x410281(0x51e)],this[_0x410281(0x5f7)](_0x4d5db3,_0x3468f9,this['x'],this['y'],this[_0x410281(0x950)]['x'],this['scale']['y'],this[_0x410281(0x9d1)],this[_0x410281(0x99b)],this['contentsOpacity']);},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x5f7)]=function(_0x3e8cbe,_0x86830b,_0x4a6252,_0x289958,_0x582ecf,_0x35425c,_0x5b4422,_0xca2ec4,_0x11e32e){const _0x66a3c1=_0x41f3d3;this[_0x66a3c1(0x439)]={'duration':_0x3e8cbe,'wholeDuration':_0x3e8cbe,'type':_0x86830b,'targetX':_0x4a6252,'targetY':_0x289958,'targetScaleX':_0x582ecf,'targetScaleY':_0x35425c,'targetOpacity':_0x5b4422,'targetBackOpacity':_0xca2ec4,'targetContentsOpacity':_0x11e32e};},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x2d3)]=function(_0x5d461b,_0x5a28d8,_0x71f42,_0x25007f,_0x19d77c){const _0xb6c486=_0x41f3d3;this[_0xb6c486(0x4d0)](),this['contents'][_0xb6c486(0x5d8)]=VisuMZ[_0xb6c486(0x5aa)][_0xb6c486(0x5b1)][_0xb6c486(0x33e)][_0xb6c486(0x9c0)];const _0x44cd87=VisuMZ[_0xb6c486(0x5aa)][_0xb6c486(0x5b1)][_0xb6c486(0x33e)]['GoldIcon'];if(_0x44cd87>0x0&&_0x5a28d8===TextManager[_0xb6c486(0x7ec)]){const _0x35d600=_0x25007f+(this[_0xb6c486(0x3c0)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x44cd87,_0x71f42+(_0x19d77c-ImageManager[_0xb6c486(0x519)]),_0x35d600),_0x19d77c-=ImageManager[_0xb6c486(0x519)]+0x4;}else this['changeTextColor'](ColorManager[_0xb6c486(0x619)]()),this[_0xb6c486(0x7d1)](_0x5a28d8,_0x71f42,_0x25007f,_0x19d77c,_0xb6c486(0x5ed)),_0x19d77c-=this[_0xb6c486(0x351)](_0x5a28d8)+0x6;this['resetTextColor']();const _0x4d2d47=this[_0xb6c486(0x351)](this[_0xb6c486(0x99f)]?VisuMZ[_0xb6c486(0x684)](_0x5d461b):_0x5d461b);if(_0x4d2d47>_0x19d77c){if(_0xb6c486(0x63f)===_0xb6c486(0x63f))this['drawText'](VisuMZ[_0xb6c486(0x5aa)][_0xb6c486(0x5b1)][_0xb6c486(0x33e)][_0xb6c486(0x285)],_0x71f42,_0x25007f,_0x19d77c,_0xb6c486(0x5ed));else{const _0x28bd49=_0x401728(_0x15e19d['$1']);_0x28bd49!==_0x5afa04[_0x290b29][_0xb6c486(0x8ad)]&&(_0x30c35b(_0xb6c486(0x242)[_0xb6c486(0x382)](_0x136256,_0x28bd49)),_0x26e73b[_0xb6c486(0x48c)]());}}else{if(_0xb6c486(0x196)!=='WfKdU')this['drawText'](_0x5d461b,_0x71f42,_0x25007f,_0x19d77c,'right');else return _0x411249['PreserveNumbers'](_0x219c19,'','');}this[_0xb6c486(0x4d0)]();},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d3)]=function(_0x1453c1,_0x30a81a,_0x3171f2,_0x2e5046,_0x34f1c7){const _0x5aca2c=_0x41f3d3,_0x12563d=ImageManager[_0x5aca2c(0x1ec)](_0x5aca2c(0x2f5)),_0x495fe6=ImageManager['iconWidth'],_0x25381f=ImageManager[_0x5aca2c(0x6df)],_0x318c06=_0x1453c1%0x10*_0x495fe6,_0x230d4f=Math['floor'](_0x1453c1/0x10)*_0x25381f,_0x23122b=_0x2e5046,_0x113c1f=_0x2e5046;this[_0x5aca2c(0x9e9)]['_context'][_0x5aca2c(0x3bd)]=_0x34f1c7,this[_0x5aca2c(0x9e9)]['blt'](_0x12563d,_0x318c06,_0x230d4f,_0x495fe6,_0x25381f,_0x30a81a,_0x3171f2,_0x23122b,_0x113c1f),this[_0x5aca2c(0x9e9)][_0x5aca2c(0x3e2)]['imageSmoothingEnabled']=!![];},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x986)]=function(_0x3f4d44,_0x3d0c89,_0x589f59,_0xbca8fb,_0xdf8401,_0x24e8f2){const _0x532e3b=_0x41f3d3,_0x7cec2f=Math[_0x532e3b(0x6ae)]((_0x589f59-0x2)*_0xbca8fb),_0x1eb444=Sprite_Gauge[_0x532e3b(0x1fd)][_0x532e3b(0x8b1)]['call'](this),_0x26e101=_0x3d0c89+this[_0x532e3b(0x3c0)]()-_0x1eb444-0x2;this['contents'][_0x532e3b(0x51a)](_0x3f4d44,_0x26e101,_0x589f59,_0x1eb444,ColorManager['gaugeBackColor']()),this[_0x532e3b(0x9e9)][_0x532e3b(0xa18)](_0x3f4d44+0x1,_0x26e101+0x1,_0x7cec2f,_0x1eb444-0x2,_0xdf8401,_0x24e8f2);},Window_Scrollable['SCROLLBAR']={'enabled':VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x1c6)]['ShowScrollBar']??!![],'thickness':VisuMZ[_0x41f3d3(0x5aa)]['Settings'][_0x41f3d3(0x1c6)][_0x41f3d3(0x9af)]??0x2,'offset':VisuMZ['CoreEngine'][_0x41f3d3(0x5b1)][_0x41f3d3(0x1c6)]['BarOffset']??0x2,'bodyColor':VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x1c6)][_0x41f3d3(0x342)]??0x0,'offColor':VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x1c6)][_0x41f3d3(0x346)]??0x7,'offOpacity':VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x1c6)][_0x41f3d3(0x4da)]??0x80},Window_Base[_0x41f3d3(0x1fd)]['isScrollBarVisible']=function(){const _0x24255d=_0x41f3d3;return Window_Scrollable[_0x24255d(0x486)][_0x24255d(0x63c)]&&Window_Scrollable[_0x24255d(0x486)][_0x24255d(0x33a)]>0x0;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x645)]=Window_Base['prototype']['createContents'],Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x373)]=function(){const _0x5c3358=_0x41f3d3;VisuMZ['CoreEngine'][_0x5c3358(0x645)]['call'](this),this['createScrollBarSprites'](),this[_0x5c3358(0x4a1)](!![]),this[_0x5c3358(0x4a1)](![]);},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x21b)]=function(){const _0x469ce9=_0x41f3d3;if(!this[_0x469ce9(0x9b1)]())return;if(this[_0x469ce9(0x8ab)]||this[_0x469ce9(0x43e)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x469ce9(0x8ab)]=new Sprite(),this[_0x469ce9(0x43e)]=new Sprite(),this['addChild'](this[_0x469ce9(0x8ab)]),this[_0x469ce9(0x65e)](this[_0x469ce9(0x43e)]);},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x4a1)]=function(_0x5b9400){const _0x2077a3=_0x41f3d3,_0x39a61d=_0x5b9400?this[_0x2077a3(0x8ab)]:this['_scrollBarVert'];if(!_0x39a61d)return;const _0x3cc783=Window_Scrollable[_0x2077a3(0x486)],_0x20a08e=_0x3cc783[_0x2077a3(0x33a)],_0x7012eb=_0x5b9400?this['innerWidth']-_0x20a08e*0x2:_0x20a08e,_0xf528fa=_0x5b9400?_0x20a08e:this['innerHeight']-_0x20a08e*0x2;_0x39a61d[_0x2077a3(0x5b0)]=new Bitmap(_0x7012eb,_0xf528fa),_0x39a61d[_0x2077a3(0x27e)](0x0,0x0,_0x7012eb,_0xf528fa),this[_0x2077a3(0x2ca)](_0x5b9400);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x1f9)]=Window_Base['prototype'][_0x41f3d3(0x6d1)],Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x6d1)]=function(){const _0x17ef52=_0x41f3d3;VisuMZ[_0x17ef52(0x5aa)][_0x17ef52(0x1f9)][_0x17ef52(0x809)](this),this['destroyScrollBarBitmaps']();},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x32c)]=function(){const _0x5141a3=_0x41f3d3,_0x14a4d6=[this['_scrollBarHorz'],this[_0x5141a3(0x43e)]];for(const _0x2e87e6 of _0x14a4d6){if(_0x5141a3(0x191)===_0x5141a3(0x191)){if(_0x2e87e6&&_0x2e87e6[_0x5141a3(0x5b0)])_0x2e87e6[_0x5141a3(0x5b0)][_0x5141a3(0x9ff)]();}else _0x3fc190['CoreEngine'][_0x5141a3(0x98a)][_0x5141a3(0x809)](this),this['setCoreEngineUpdateWindowBg']();}},VisuMZ['CoreEngine'][_0x41f3d3(0x694)]=Window_Scrollable[_0x41f3d3(0x1fd)]['update'],Window_Scrollable[_0x41f3d3(0x1fd)][_0x41f3d3(0x314)]=function(){const _0x2a0fd7=_0x41f3d3;VisuMZ['CoreEngine'][_0x2a0fd7(0x694)][_0x2a0fd7(0x809)](this),this[_0x2a0fd7(0x2eb)]();},Window_Scrollable['prototype'][_0x41f3d3(0x2eb)]=function(){const _0x1be341=_0x41f3d3;this[_0x1be341(0x9bf)](),this['checkScrollBarBitmap'](!![]),this[_0x1be341(0x2b8)](![]),this[_0x1be341(0x2ca)](!![]),this[_0x1be341(0x2ca)](![]);},Window_Scrollable[_0x41f3d3(0x1fd)][_0x41f3d3(0x9bf)]=function(){const _0x4b13f1=_0x41f3d3,_0x5b19b4=[this[_0x4b13f1(0x8ab)],this[_0x4b13f1(0x43e)]];for(const _0x40a599 of _0x5b19b4){_0x4b13f1(0x5f1)===_0x4b13f1(0x330)?_0x5e9d90=(0x1-_0x1d7195(_0x502220['$1']))*-_0x3292a2:_0x40a599&&('QVSUJ'===_0x4b13f1(0x6c4)?(this['updateScrollBarVisibility'](),this[_0x4b13f1(0x2b8)](!![]),this[_0x4b13f1(0x2b8)](![]),this[_0x4b13f1(0x2ca)](!![]),this[_0x4b13f1(0x2ca)](![])):_0x40a599[_0x4b13f1(0x2f6)]=this[_0x4b13f1(0x9b1)]()&&this[_0x4b13f1(0x780)]());}},Window_Scrollable[_0x41f3d3(0x1fd)][_0x41f3d3(0x2b8)]=function(_0x3a10d0){const _0x218667=_0x41f3d3;if(!this[_0x218667(0x768)])return;const _0xa0dd2d=this[_0x218667(0x278)](_0x3a10d0),_0x5a8ba8=this['maxScrollbar'](_0x3a10d0),_0x14367b=_0x3a10d0?_0x218667(0x2bb):_0x218667(0x8b9),_0x4c368f=_0x3a10d0?_0x218667(0x727):_0x218667(0x498);(this['_lastScrollBarValues'][_0x14367b]!==_0xa0dd2d||this['_lastScrollBarValues'][_0x4c368f]!==_0x5a8ba8)&&('LRVle'===_0x218667(0x55f)?(this[_0x218667(0x768)][_0x14367b]=_0xa0dd2d,this['_lastScrollBarValues'][_0x4c368f]=_0x5a8ba8,this[_0x218667(0x96f)](_0x3a10d0,_0xa0dd2d,_0x5a8ba8)):this['_itemWindow'][_0x218667(0x564)](_0x386834['layoutSettings'][_0x218667(0x3df)]));},Window_Scrollable[_0x41f3d3(0x1fd)][_0x41f3d3(0x278)]=function(_0x15b0c4){const _0x49c8f6=_0x41f3d3;if(this['_allTextHeight']!==undefined)return _0x15b0c4?this[_0x49c8f6(0x5df)]():this['origin']['y'];return _0x15b0c4?this[_0x49c8f6(0x5df)]():this[_0x49c8f6(0x502)]();},Window_Scrollable[_0x41f3d3(0x1fd)]['maxScrollbar']=function(_0x452029){const _0x5e7d5b=_0x41f3d3;if(this[_0x5e7d5b(0x3c2)]!==undefined)return _0x452029?this['maxScrollX']():Math[_0x5e7d5b(0x4a5)](0x0,this['_allTextHeight']-this[_0x5e7d5b(0x83e)]);return _0x452029?this[_0x5e7d5b(0x4bb)]():this[_0x5e7d5b(0x8fe)]();},Window_Scrollable[_0x41f3d3(0x1fd)][_0x41f3d3(0x6d3)]=function(){const _0x2ead4b=_0x41f3d3;if(this[_0x2ead4b(0x3c2)]!==undefined)return Math[_0x2ead4b(0x4a5)](0x0,this[_0x2ead4b(0x3c2)]);return this[_0x2ead4b(0x933)]();},Window_Scrollable['prototype'][_0x41f3d3(0x96f)]=function(_0x5a9333,_0x488152,_0x160699){const _0x1e6a0c=_0x41f3d3,_0x4bf774=_0x5a9333?this[_0x1e6a0c(0x8ab)]:this[_0x1e6a0c(0x43e)];if(!_0x4bf774)return;if(!_0x4bf774[_0x1e6a0c(0x5b0)])return;const _0x23d737=_0x4bf774[_0x1e6a0c(0x5b0)];_0x23d737[_0x1e6a0c(0x3b1)]();if(_0x160699<=0x0)return;const _0xae0ddc=_0x5a9333?this[_0x1e6a0c(0x6e1)]/this[_0x1e6a0c(0x798)]():this[_0x1e6a0c(0x83e)]/this[_0x1e6a0c(0x6d3)](),_0x5a40f7=_0x5a9333?Math[_0x1e6a0c(0x92b)](_0x488152*_0xae0ddc):0x0,_0x2b5cab=_0x5a9333?0x0:Math[_0x1e6a0c(0x92b)](_0x488152*_0xae0ddc),_0x32702e=_0x5a9333?Math[_0x1e6a0c(0x92b)](_0x23d737['width']*_0xae0ddc):_0x23d737[_0x1e6a0c(0x665)],_0x59101b=_0x5a9333?_0x23d737['height']:Math['round'](_0x23d737['height']*_0xae0ddc),_0xf00d9a=Window_Scrollable[_0x1e6a0c(0x486)],_0x33b6cf=ColorManager[_0x1e6a0c(0x4ee)](_0xf00d9a[_0x1e6a0c(0x1e4)]),_0x5cf9ed=ColorManager[_0x1e6a0c(0x4ee)](_0xf00d9a[_0x1e6a0c(0xa37)]),_0x437ac8=_0xf00d9a['offOpacity'];_0x23d737[_0x1e6a0c(0x1bd)]=_0x437ac8,_0x23d737[_0x1e6a0c(0xa31)](_0x33b6cf),_0x23d737[_0x1e6a0c(0x1bd)]=0xff,_0x23d737[_0x1e6a0c(0x51a)](_0x5a40f7,_0x2b5cab,_0x32702e,_0x59101b,_0x5cf9ed);},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x2ca)]=function(_0x1d35f5){const _0x2fe4f9=_0x41f3d3,_0x1e0274=_0x1d35f5?this['_scrollBarHorz']:this[_0x2fe4f9(0x43e)];if(!_0x1e0274)return;const _0x10e70a=Window_Scrollable[_0x2fe4f9(0x486)],_0x3489ec=_0x10e70a[_0x2fe4f9(0x33a)],_0x177652=_0x10e70a[_0x2fe4f9(0x6cb)];if(!_0x1e0274[_0x2fe4f9(0x968)])return;_0x1e0274['x']=this[_0x2fe4f9(0x790)]+(_0x1d35f5?_0x3489ec:this['innerWidth']+_0x177652),_0x1e0274['y']=this[_0x2fe4f9(0x790)]+(_0x1d35f5?this[_0x2fe4f9(0x83e)]+_0x177652:_0x3489ec);},Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x410)]=function(_0x1fce5e){const _0x17f728=_0x41f3d3;let _0xaa05d4=this[_0x17f728(0x536)]();const _0x49bb5e=this[_0x17f728(0x535)](),_0x541976=this[_0x17f728(0x324)]();if(this[_0x17f728(0x7ed)]()&&(_0xaa05d4<_0x49bb5e||_0x1fce5e&&_0x541976===0x1)){if(_0x17f728(0x327)!==_0x17f728(0x344)){_0xaa05d4+=_0x541976;if(_0xaa05d4>=_0x49bb5e)_0xaa05d4=_0x49bb5e-0x1;this[_0x17f728(0x48f)](_0xaa05d4);}else _0x21e3d7=this[_0x17f728(0x4ad)]();}else!this[_0x17f728(0x7ed)]()&&((_0xaa05d4<_0x49bb5e-_0x541976||_0x1fce5e&&_0x541976===0x1)&&(_0x17f728(0x419)===_0x17f728(0x419)?this[_0x17f728(0x48f)]((_0xaa05d4+_0x541976)%_0x49bb5e):(this[_0x17f728(0x541)](_0x556e38['systemColor']()),this['drawText'](_0x210c42,_0x3924e6,_0x17a08d,_0x56fbe5,_0x17f728(0x5ed)),_0x26894c-=this[_0x17f728(0x351)](_0x494113)+0x6)));},VisuMZ[_0x41f3d3(0x5aa)]['Window_Selectable_cursorDown']=Window_Selectable[_0x41f3d3(0x1fd)]['cursorDown'],Window_Selectable['prototype']['cursorDown']=function(_0x42008e){const _0x3adc07=_0x41f3d3;this[_0x3adc07(0x7ed)]()&&_0x42008e&&this['maxCols']()===0x1&&this[_0x3adc07(0x536)]()===this[_0x3adc07(0x535)]()-0x1?this[_0x3adc07(0x48f)](0x0):VisuMZ['CoreEngine']['Window_Selectable_cursorDown'][_0x3adc07(0x809)](this,_0x42008e);},Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x306)]=function(_0x3184b2){const _0x209b1=_0x41f3d3;let _0x5cb7ec=Math[_0x209b1(0x4a5)](0x0,this[_0x209b1(0x536)]());const _0xe9846a=this[_0x209b1(0x535)](),_0x491763=this['maxCols']();if(this[_0x209b1(0x7ed)]()&&_0x5cb7ec>0x0||_0x3184b2&&_0x491763===0x1){_0x5cb7ec-=_0x491763;if(_0x5cb7ec<=0x0)_0x5cb7ec=0x0;this['smoothSelect'](_0x5cb7ec);}else{if(!this[_0x209b1(0x7ed)]()){if(_0x5cb7ec>=_0x491763||_0x3184b2&&_0x491763===0x1){if('nPANv'!=='UomNY')this['smoothSelect']((_0x5cb7ec-_0x491763+_0xe9846a)%_0xe9846a);else return _0x4461ed[_0x209b1(0x5aa)][_0x209b1(0x538)][_0x55fe44]||0x0;}}}},VisuMZ['CoreEngine'][_0x41f3d3(0x4ea)]=Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x306)],Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x306)]=function(_0x52e78e){const _0x19c77c=_0x41f3d3;if(this[_0x19c77c(0x7ed)]()&&_0x52e78e&&this['maxCols']()===0x1&&this[_0x19c77c(0x536)]()===0x0){if(_0x19c77c(0x84a)!==_0x19c77c(0x84a)){_0x5d0f86[_0x19c77c(0x1fd)][_0x19c77c(0x314)][_0x19c77c(0x809)](this),this[_0x19c77c(0x19a)]();if(this[_0x19c77c(0x63e)])this['updateMotion']();else this[_0x19c77c(0x793)]!==''&&(this[_0x19c77c(0x793)]='');}else this[_0x19c77c(0x48f)](this[_0x19c77c(0x535)]()-0x1);}else VisuMZ[_0x19c77c(0x5aa)]['Window_Selectable_cursorUp'][_0x19c77c(0x809)](this,_0x52e78e);},Window_Selectable[_0x41f3d3(0x1fd)]['isUseModernControls']=function(){const _0x464fe2=_0x41f3d3;return VisuMZ['CoreEngine'][_0x464fe2(0x5b1)][_0x464fe2(0x2d1)][_0x464fe2(0x5d7)];},VisuMZ['CoreEngine']['Window_Selectable_processCursorMove']=Window_Selectable[_0x41f3d3(0x1fd)]['processCursorMove'],Window_Selectable['prototype'][_0x41f3d3(0x698)]=function(){const _0x2739e1=_0x41f3d3;if(this[_0x2739e1(0x7ed)]()){if(_0x2739e1(0x71e)!==_0x2739e1(0x71e))return _0x1413af(_0x3809e7['$1']);else this[_0x2739e1(0x34c)](),this[_0x2739e1(0x313)]();}else{if('vvkNN'!=='Tppay')VisuMZ[_0x2739e1(0x5aa)][_0x2739e1(0x909)][_0x2739e1(0x809)](this);else return![];}},Window_Selectable[_0x41f3d3(0x1fd)]['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x34c)]=function(){const _0x1ae612=_0x41f3d3;if(this[_0x1ae612(0x20c)]()){const _0x43ace1=this[_0x1ae612(0x536)]();Input[_0x1ae612(0x210)](_0x1ae612(0x563))&&(Input[_0x1ae612(0x38f)](_0x1ae612(0x21e))&&this[_0x1ae612(0xa41)]()?this['cursorPagedown']():this[_0x1ae612(0x410)](Input[_0x1ae612(0x811)](_0x1ae612(0x563))));if(Input[_0x1ae612(0x210)]('up')){if(Input[_0x1ae612(0x38f)](_0x1ae612(0x21e))&&this[_0x1ae612(0xa41)]()){if(_0x1ae612(0xa42)!==_0x1ae612(0x548))this[_0x1ae612(0x603)]();else{const _0x1ff91a=this[_0x1ae612(0x348)](_0x181c0c),_0xc134a0=new(_0x1ff91a?_0x53f11e:_0x54d544)(),_0xb32a2c=this[_0x1ae612(0x8cf)](_0x21732b);this['animationShouldMirror'](_0x3c963b[0x0])&&(_0x5ad735=!_0x475184);_0xc134a0['targetObjects']=_0x5d01bf,_0xc134a0['setup'](_0xb32a2c,_0xc1f072,_0x55927e,_0x1d9f58),_0xc134a0[_0x1ae612(0x1fc)](_0x4c4b50),this['addAnimationSpriteToContainer'](_0xc134a0);if(this[_0x1ae612(0x79f)])this[_0x1ae612(0x79f)][_0x1ae612(0x907)](_0xc134a0);this[_0x1ae612(0x28b)]['push'](_0xc134a0);}}else{if(_0x1ae612(0x4e1)==='KiWkO')this[_0x1ae612(0x306)](Input[_0x1ae612(0x811)]('up'));else{if(_0x50be88['isPlaytest']())_0x3cbad1['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x1ae612(0x382)](_0x2d511c));}}}if(Input['isRepeated'](_0x1ae612(0x5ed))){if(_0x1ae612(0x660)!==_0x1ae612(0x660))return this['isSmartEventCollisionOn']()?this[_0x1ae612(0x769)](_0x40c33e,_0x51abf9):_0x49a6d1[_0x1ae612(0x5aa)][_0x1ae612(0x2d0)][_0x1ae612(0x809)](this,_0x337f87,_0x108a4c);else this[_0x1ae612(0x71a)](Input[_0x1ae612(0x811)](_0x1ae612(0x5ed)));}Input[_0x1ae612(0x210)]('left')&&this[_0x1ae612(0x6c2)](Input[_0x1ae612(0x811)](_0x1ae612(0x7d5))),!this[_0x1ae612(0x66e)](_0x1ae612(0x4de))&&Input[_0x1ae612(0x210)](_0x1ae612(0x4de))&&('hNibp'!==_0x1ae612(0x3e8)?this[_0x1ae612(0x98c)]=_0x1ae612(0x65a):this[_0x1ae612(0xa08)]()),!this[_0x1ae612(0x66e)](_0x1ae612(0x510))&&Input[_0x1ae612(0x210)]('pageup')&&this[_0x1ae612(0x603)](),this[_0x1ae612(0x536)]()!==_0x43ace1&&this[_0x1ae612(0x633)]();}},Window_Selectable['prototype'][_0x41f3d3(0x313)]=function(){const _0x4984af=_0x41f3d3;if(this['isCursorMovable']()){if(_0x4984af(0xa02)!==_0x4984af(0xa02)){var _0x9db686=_0x3b95f0['CoreEngine']['Window_Base_createTextState'][_0x4984af(0x809)](this,_0x20a65e,_0x5af66a,_0x308bfb,_0x195ab0);if(this[_0x4984af(0x60d)]())_0x9db686[_0x4984af(0x630)]=_0x3dd5fa[_0x4984af(0x684)](_0x9db686[_0x4984af(0x630)]);return _0x9db686;}else{const _0x42ff48=this[_0x4984af(0x536)]();if(Input['isTriggered'](_0x4984af(0x592))){if('GbyDr'!==_0x4984af(0x4ff))this[_0x4984af(0x48f)](Math['min'](this[_0x4984af(0x536)](),0x0));else for(const _0x57b67b of _0x3a4773){if(_0x57b67b&&_0x57b67b['connected']){if(this[_0x4984af(0x56a)](_0x57b67b))return!![];if(this['isGamepadAxisMoved'](_0x57b67b))return!![];}}}if(Input[_0x4984af(0x811)](_0x4984af(0x315))){if(_0x4984af(0x707)!==_0x4984af(0x707)){if(!this[_0x4984af(0x6dc)]())return;const _0x46abe0=this[_0x4984af(0x201)]();this[_0x4984af(0xa32)]=new _0x4cb62a(_0x46abe0),this[_0x4984af(0x659)](this[_0x4984af(0xa32)]);}else this['smoothSelect'](Math[_0x4984af(0x4a5)](this[_0x4984af(0x536)](),this[_0x4984af(0x535)]()-0x1));}this[_0x4984af(0x536)]()!==_0x42ff48&&(_0x4984af(0x9bc)===_0x4984af(0x87b)?this[_0x4984af(0x2a7)][_0x4984af(0x45f)](_0x51109a):this[_0x4984af(0x633)]());}}},VisuMZ['CoreEngine']['Window_Selectable_processTouch']=Window_Selectable['prototype']['processTouch'],Window_Selectable['prototype'][_0x41f3d3(0x4f6)]=function(){const _0x40a99a=_0x41f3d3;this['isUseModernControls']()?this['processTouchModernControls']():VisuMZ['CoreEngine']['Window_Selectable_processTouch'][_0x40a99a(0x809)](this);},Window_Selectable['prototype']['processTouchModernControls']=function(){const _0x2cffa2=_0x41f3d3;VisuMZ[_0x2cffa2(0x5aa)][_0x2cffa2(0x680)][_0x2cffa2(0x809)](this);},Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x4ec)]=function(){const _0x3ab5b8=_0x41f3d3;return VisuMZ['CoreEngine'][_0x3ab5b8(0x5b1)]['Window'][_0x3ab5b8(0x5a9)];},Window_Selectable['prototype']['rowSpacing']=function(){const _0x2b300b=_0x41f3d3;return VisuMZ[_0x2b300b(0x5aa)][_0x2b300b(0x5b1)][_0x2b300b(0x1c6)][_0x2b300b(0x824)];},Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x6e9)]=function(){const _0x2c5a7f=_0x41f3d3;return Window_Scrollable[_0x2c5a7f(0x1fd)][_0x2c5a7f(0x6e9)][_0x2c5a7f(0x809)](this)+VisuMZ['CoreEngine'][_0x2c5a7f(0x5b1)][_0x2c5a7f(0x1c6)][_0x2c5a7f(0x289)];;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x95f)]=Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x209)],Window_Selectable[_0x41f3d3(0x1fd)][_0x41f3d3(0x209)]=function(_0x372fd8){const _0x1defe9=_0x41f3d3,_0x8404a4=VisuMZ['CoreEngine']['Settings'][_0x1defe9(0x1c6)];if(_0x8404a4[_0x1defe9(0x267)]===![])return;if(_0x8404a4[_0x1defe9(0x286)])_0x8404a4[_0x1defe9(0x286)][_0x1defe9(0x809)](this,_0x372fd8);else{if(_0x1defe9(0x415)!=='lMZaU'){if(this[_0x1defe9(0x452)])return;_0x4fe43d[_0x1defe9(0x5aa)][_0x1defe9(0x40e)][_0x1defe9(0x809)](this);}else VisuMZ[_0x1defe9(0x5aa)][_0x1defe9(0x95f)][_0x1defe9(0x809)](this,_0x372fd8);}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x68e)]=Window_Gold[_0x41f3d3(0x1fd)][_0x41f3d3(0x3b5)],Window_Gold['prototype'][_0x41f3d3(0x3b5)]=function(){const _0x3f2391=_0x41f3d3;this[_0x3f2391(0x7b3)]()?this[_0x3f2391(0x7c5)]():VisuMZ[_0x3f2391(0x5aa)][_0x3f2391(0x68e)][_0x3f2391(0x809)](this);},Window_Gold[_0x41f3d3(0x1fd)]['isItemStyle']=function(){const _0x5c2bcd=_0x41f3d3;if(TextManager[_0x5c2bcd(0x7ec)]!==this[_0x5c2bcd(0x7ec)]())return![];return VisuMZ[_0x5c2bcd(0x5aa)][_0x5c2bcd(0x5b1)][_0x5c2bcd(0x33e)][_0x5c2bcd(0x5fb)];},Window_Gold[_0x41f3d3(0x1fd)]['drawGoldItemStyle']=function(){const _0x319ad2=_0x41f3d3;this[_0x319ad2(0x4d0)](),this['contents'][_0x319ad2(0x3b1)](),this[_0x319ad2(0x9e9)]['fontSize']=VisuMZ[_0x319ad2(0x5aa)][_0x319ad2(0x5b1)][_0x319ad2(0x33e)][_0x319ad2(0x9c0)];const _0x364a57=VisuMZ[_0x319ad2(0x5aa)][_0x319ad2(0x5b1)][_0x319ad2(0x33e)][_0x319ad2(0x3d3)],_0x17e017=this[_0x319ad2(0x30f)](0x0);if(_0x364a57>0x0){const _0x431f6a=_0x17e017['y']+(this[_0x319ad2(0x3c0)]()-ImageManager[_0x319ad2(0x6df)])/0x2;this['drawIcon'](_0x364a57,_0x17e017['x'],_0x431f6a);const _0x53e530=ImageManager[_0x319ad2(0x519)]+0x4;_0x17e017['x']+=_0x53e530,_0x17e017['width']-=_0x53e530;}this[_0x319ad2(0x541)](ColorManager['systemColor']()),this[_0x319ad2(0x7d1)](this['currencyUnit'](),_0x17e017['x'],_0x17e017['y'],_0x17e017[_0x319ad2(0x665)],_0x319ad2(0x7d5));const _0x4edc21=this[_0x319ad2(0x351)](this[_0x319ad2(0x7ec)]())+0x6;;_0x17e017['x']+=_0x4edc21,_0x17e017[_0x319ad2(0x665)]-=_0x4edc21,this['resetTextColor']();const _0x53357b=this[_0x319ad2(0x1cc)](),_0x4182ba=this['textWidth'](this[_0x319ad2(0x99f)]?VisuMZ[_0x319ad2(0x684)](this[_0x319ad2(0x1cc)]()):this[_0x319ad2(0x1cc)]());_0x4182ba>_0x17e017[_0x319ad2(0x665)]?this[_0x319ad2(0x7d1)](VisuMZ[_0x319ad2(0x5aa)][_0x319ad2(0x5b1)][_0x319ad2(0x33e)][_0x319ad2(0x285)],_0x17e017['x'],_0x17e017['y'],_0x17e017[_0x319ad2(0x665)],_0x319ad2(0x5ed)):this[_0x319ad2(0x7d1)](this[_0x319ad2(0x1cc)](),_0x17e017['x'],_0x17e017['y'],_0x17e017[_0x319ad2(0x665)],_0x319ad2(0x5ed)),this[_0x319ad2(0x4d0)]();},Window_StatusBase['prototype'][_0x41f3d3(0x785)]=function(_0x577f7e,_0x3b9156,_0x490dd5,_0x1b89bc,_0x2daaf9){const _0x1de57b=_0x41f3d3;_0x1b89bc=String(_0x1b89bc||'')[_0x1de57b(0x97e)]();if(VisuMZ[_0x1de57b(0x5aa)][_0x1de57b(0x5b1)]['Param'][_0x1de57b(0x46c)]){if(_0x1de57b(0xa23)===_0x1de57b(0x9e2))this['hideButtonFromView']();else{const _0x2e1589=VisuMZ[_0x1de57b(0x8a0)](_0x1b89bc);if(_0x2daaf9){if(_0x1de57b(0x960)===_0x1de57b(0x960))this[_0x1de57b(0x9d3)](_0x2e1589,_0x577f7e,_0x3b9156,this[_0x1de57b(0x565)]()),_0x490dd5-=this[_0x1de57b(0x565)]()+0x2,_0x577f7e+=this[_0x1de57b(0x565)]()+0x2;else{var _0x4a8523=_0x232e79(_0x34db99['$1'])/0x64;_0x3b131f*=_0x4a8523;}}else this[_0x1de57b(0x5c6)](_0x2e1589,_0x577f7e+0x2,_0x3b9156+0x2),_0x490dd5-=ImageManager['iconWidth']+0x4,_0x577f7e+=ImageManager['iconWidth']+0x4;}}const _0x2bcd57=TextManager[_0x1de57b(0x62d)](_0x1b89bc);this[_0x1de57b(0x4d0)](),this[_0x1de57b(0x541)](ColorManager[_0x1de57b(0x619)]()),_0x2daaf9?(this[_0x1de57b(0x9e9)][_0x1de57b(0x5d8)]=this['smallParamFontSize'](),this[_0x1de57b(0x9e9)][_0x1de57b(0x7d1)](_0x2bcd57,_0x577f7e,_0x3b9156,_0x490dd5,this[_0x1de57b(0x565)](),_0x1de57b(0x7d5))):this[_0x1de57b(0x7d1)](_0x2bcd57,_0x577f7e,_0x3b9156,_0x490dd5),this[_0x1de57b(0x4d0)]();},Window_StatusBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x77e)]=function(){const _0x384f12=_0x41f3d3;return $gameSystem[_0x384f12(0x935)]()-0x8;},Window_StatusBase[_0x41f3d3(0x1fd)]['drawActorClass']=function(_0x471af5,_0x5ba563,_0x57f2b3,_0x58bdd3){const _0x2d593c=_0x41f3d3;_0x58bdd3=_0x58bdd3||0xa8,this[_0x2d593c(0x2df)]();if(VisuMZ[_0x2d593c(0x5aa)][_0x2d593c(0x5b1)]['UI'][_0x2d593c(0x3d2)])'Vocyq'!==_0x2d593c(0x48e)?this[_0x2d593c(0x48a)](_0x471af5[_0x2d593c(0x3e3)]()[_0x2d593c(0x23b)],_0x5ba563,_0x57f2b3,_0x58bdd3):this[_0x2d593c(0x98c)]='ETB';else{const _0x3004b9=_0x471af5[_0x2d593c(0x3e3)]()[_0x2d593c(0x23b)][_0x2d593c(0x572)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x3004b9,_0x5ba563,_0x57f2b3,_0x58bdd3);}},Window_StatusBase['prototype'][_0x41f3d3(0x972)]=function(_0x3286b3,_0x4c1ab,_0xe27159,_0x21ee3d){const _0x2b6264=_0x41f3d3;_0x21ee3d=_0x21ee3d||0x10e,this['resetTextColor']();if(VisuMZ[_0x2b6264(0x5aa)][_0x2b6264(0x5b1)]['UI'][_0x2b6264(0x47a)])this[_0x2b6264(0x48a)](_0x3286b3['nickname'](),_0x4c1ab,_0xe27159,_0x21ee3d);else{const _0x4918b2=_0x3286b3[_0x2b6264(0x7fa)]()[_0x2b6264(0x572)](/\\I\[(\d+)\]/gi,'');this[_0x2b6264(0x7d1)](_0x3286b3[_0x2b6264(0x7fa)](),_0x4c1ab,_0xe27159,_0x21ee3d);}},VisuMZ['CoreEngine'][_0x41f3d3(0x5a2)]=Window_StatusBase[_0x41f3d3(0x1fd)]['drawActorLevel'],Window_StatusBase[_0x41f3d3(0x1fd)][_0x41f3d3(0x46b)]=function(_0x54fa0f,_0x2fb62d,_0x52ae37){const _0x1417de=_0x41f3d3;if(VisuMZ[_0x1417de(0x5aa)][_0x1417de(0x5b1)][_0x1417de(0x803)][_0x1417de(0x78e)]===![])return;if(this[_0x1417de(0x272)]())this[_0x1417de(0x4ba)](_0x54fa0f,_0x2fb62d,_0x52ae37);VisuMZ['CoreEngine'][_0x1417de(0x5a2)][_0x1417de(0x809)](this,_0x54fa0f,_0x2fb62d,_0x52ae37);},Window_StatusBase['prototype'][_0x41f3d3(0x272)]=function(){const _0x2b5e02=_0x41f3d3;return VisuMZ[_0x2b5e02(0x5aa)][_0x2b5e02(0x5b1)]['UI'][_0x2b5e02(0xa05)];},Window_StatusBase['prototype'][_0x41f3d3(0x4ba)]=function(_0x330d7f,_0x1bc356,_0x186a00){const _0x4cd224=_0x41f3d3;if(!_0x330d7f)return;if(!_0x330d7f[_0x4cd224(0x2aa)]())return;const _0x4ea09e=0x80,_0x118173=_0x330d7f['expRate']();let _0x61f9e0=ColorManager[_0x4cd224(0x475)](),_0x2c9af5=ColorManager[_0x4cd224(0x8e7)]();_0x118173>=0x1&&(_0x61f9e0=ColorManager['maxLvGaugeColor1'](),_0x2c9af5=ColorManager[_0x4cd224(0x663)]()),this[_0x4cd224(0x986)](_0x1bc356,_0x186a00,_0x4ea09e,_0x118173,_0x61f9e0,_0x2c9af5);},Window_EquipStatus[_0x41f3d3(0x1fd)]['drawAllParams']=function(){const _0x2b8300=_0x41f3d3;let _0x49bd87=0x0;for(const _0x53561d of VisuMZ[_0x2b8300(0x5aa)][_0x2b8300(0x5b1)][_0x2b8300(0x803)][_0x2b8300(0xa47)]){const _0x505661=this['itemPadding'](),_0x572640=this[_0x2b8300(0x83b)](_0x49bd87);this[_0x2b8300(0x6cc)](_0x505661,_0x572640,_0x53561d),_0x49bd87++;}},Window_EquipStatus['prototype'][_0x41f3d3(0x207)]=function(_0x13fda2,_0x3f3fea,_0x20c356){const _0x30fa1a=_0x41f3d3,_0x2e63d2=this[_0x30fa1a(0x9c8)]()-this[_0x30fa1a(0x505)]()*0x2;this[_0x30fa1a(0x785)](_0x13fda2,_0x3f3fea,_0x2e63d2,_0x20c356,![]);},Window_EquipStatus[_0x41f3d3(0x1fd)][_0x41f3d3(0x3cc)]=function(_0x25cb42,_0x3ef836,_0x39401b){const _0x432bac=_0x41f3d3,_0x37b8c6=this[_0x432bac(0x89e)]();this[_0x432bac(0x2df)](),this['drawText'](this['_actor'][_0x432bac(0x6e6)](_0x39401b,!![]),_0x25cb42,_0x3ef836,_0x37b8c6,_0x432bac(0x5ed));},Window_EquipStatus['prototype']['drawRightArrow']=function(_0x53644c,_0x1d6de3){const _0x214e14=_0x41f3d3,_0x20a652=this[_0x214e14(0x8a5)]();this[_0x214e14(0x541)](ColorManager[_0x214e14(0x619)]());const _0x177967=VisuMZ[_0x214e14(0x5aa)][_0x214e14(0x5b1)]['UI'][_0x214e14(0x34b)];this[_0x214e14(0x7d1)](_0x177967,_0x53644c,_0x1d6de3,_0x20a652,_0x214e14(0x413));},Window_EquipStatus[_0x41f3d3(0x1fd)]['drawNewParam']=function(_0x441485,_0x2ed05f,_0x405947){const _0x25ee9f=_0x41f3d3,_0x3ef693=this[_0x25ee9f(0x89e)](),_0x47c776=this[_0x25ee9f(0x40d)][_0x25ee9f(0x6e6)](_0x405947),_0x3c49cd=_0x47c776-this[_0x25ee9f(0x63e)][_0x25ee9f(0x6e6)](_0x405947);this[_0x25ee9f(0x541)](ColorManager[_0x25ee9f(0x652)](_0x3c49cd)),this[_0x25ee9f(0x7d1)](this['_tempActor'][_0x25ee9f(0x6e6)](_0x405947,!![]),_0x441485,_0x2ed05f,_0x3ef693,_0x25ee9f(0x5ed));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x73b)]=Window_EquipItem[_0x41f3d3(0x1fd)][_0x41f3d3(0x301)],Window_EquipItem[_0x41f3d3(0x1fd)][_0x41f3d3(0x301)]=function(_0x3552fc){const _0x54b64b=_0x41f3d3;if(_0x3552fc&&this['_actor'])return this[_0x54b64b(0x63e)][_0x54b64b(0x9de)](_0x3552fc);else{if(_0x54b64b(0x81a)===_0x54b64b(0x6a2)){if(_0x372039[_0x54b64b(0x67d)]())_0x2c242b[_0x54b64b(0x5e6)](_0x3f1c16);}else return VisuMZ[_0x54b64b(0x5aa)]['Window_EquipItem_isEnabled'][_0x54b64b(0x809)](this,_0x3552fc);}},Window_StatusParams[_0x41f3d3(0x1fd)][_0x41f3d3(0x535)]=function(){const _0x423744=_0x41f3d3;return VisuMZ[_0x423744(0x5aa)][_0x423744(0x5b1)][_0x423744(0x803)][_0x423744(0xa47)][_0x423744(0x9b7)];},Window_StatusParams[_0x41f3d3(0x1fd)][_0x41f3d3(0x6cc)]=function(_0x24c2e7){const _0x5a4e77=_0x41f3d3,_0x55a7bd=this[_0x5a4e77(0x30f)](_0x24c2e7),_0x2d2efb=VisuMZ[_0x5a4e77(0x5aa)][_0x5a4e77(0x5b1)][_0x5a4e77(0x803)][_0x5a4e77(0xa47)][_0x24c2e7],_0x47d853=TextManager[_0x5a4e77(0x62d)](_0x2d2efb),_0x421c65=this[_0x5a4e77(0x63e)]['paramValueByName'](_0x2d2efb,!![]);this[_0x5a4e77(0x785)](_0x55a7bd['x'],_0x55a7bd['y'],0xa0,_0x2d2efb,![]),this[_0x5a4e77(0x2df)](),this['drawText'](_0x421c65,_0x55a7bd['x']+0xa0,_0x55a7bd['y'],0x3c,'right');};if(VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0xa17)][_0x41f3d3(0x199)]){VisuMZ['CoreEngine'][_0x41f3d3(0x5b1)][_0x41f3d3(0xa17)][_0x41f3d3(0x22c)]&&(Window_NameInput[_0x41f3d3(0x631)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x41f3d3(0x7d3),'OK']);;VisuMZ['CoreEngine'][_0x41f3d3(0x55c)]=Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)],Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)]=function(_0x4ae183){const _0x3b9e3e=_0x41f3d3;this[_0x3b9e3e(0x7b8)]=this[_0x3b9e3e(0x932)](),VisuMZ[_0x3b9e3e(0x5aa)]['Window_NameInput_initialize'][_0x3b9e3e(0x809)](this,_0x4ae183),this[_0x3b9e3e(0x7b8)]==='default'?this['select'](0x0):(Input['clear'](),this[_0x3b9e3e(0x6a4)]());},Window_NameInput[_0x41f3d3(0x1fd)]['defaultInputMode']=function(){const _0x24e50c=_0x41f3d3;if(Input[_0x24e50c(0x1dd)]())return _0x24e50c(0x890);return VisuMZ[_0x24e50c(0x5aa)][_0x24e50c(0x5b1)][_0x24e50c(0xa17)][_0x24e50c(0x5c0)]||_0x24e50c(0x3eb);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x2de)]=Window_NameInput[_0x41f3d3(0x1fd)]['processHandling'],Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x5f8)]=function(){const _0x456eff=_0x41f3d3;if(!this[_0x456eff(0x780)]())return;if(!this[_0x456eff(0x646)])return;if(this[_0x456eff(0x7b8)]==='keyboard'&&Input[_0x456eff(0xa11)]())this['switchModes'](_0x456eff(0x890));else{if(Input[_0x456eff(0x3ad)]('backspace'))Input[_0x456eff(0x3b1)](),this['processBack']();else{if(Input[_0x456eff(0x811)](_0x456eff(0x84c))){if(_0x456eff(0x4d6)===_0x456eff(0x7ba))return _0x1e8e93['layoutSettings'][_0x456eff(0x26a)][_0x456eff(0x809)](this);else Input[_0x456eff(0x3b1)](),this[_0x456eff(0x7b8)]===_0x456eff(0x3eb)?_0x456eff(0x850)===_0x456eff(0x850)?this[_0x456eff(0x9f8)](_0x456eff(0x890)):(_0x4380e1[_0x456eff(0x5aa)][_0x456eff(0x309)][_0x456eff(0x809)](this),this[_0x456eff(0x738)]()):this[_0x456eff(0x9f8)]('keyboard');}else{if(this['_mode']===_0x456eff(0x3eb)){if('mQmRn'!=='mQmRn'){if(_0x2925dc===0x8)return![];return _0x136e69[_0x456eff(0x5aa)]['Input_shouldPreventDefault']['call'](this,_0x201b43);}else this['processKeyboardHandling']();}else Input[_0x456eff(0x3ad)](_0x456eff(0x2a6))?_0x456eff(0x830)!=='JIzIz'?this[_0x456eff(0x48f)](this[_0x456eff(0x535)]()-0x1):(Input[_0x456eff(0x3b1)](),this[_0x456eff(0x9f8)]('keyboard')):VisuMZ[_0x456eff(0x5aa)][_0x456eff(0x2de)]['call'](this);}}}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x44a)]=Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x4f6)],Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x4f6)]=function(){const _0x8abf0a=_0x41f3d3;if(!this['isOpenAndActive']())return;if(this[_0x8abf0a(0x7b8)]==='keyboard'){if(TouchInput[_0x8abf0a(0x811)]()&&this[_0x8abf0a(0x229)]())_0x8abf0a(0x222)!==_0x8abf0a(0x29c)?this[_0x8abf0a(0x9f8)](_0x8abf0a(0x890)):(this[_0x8abf0a(0x9e9)][_0x8abf0a(0x5d8)]=this[_0x8abf0a(0x77e)](),this[_0x8abf0a(0x9e9)]['drawText'](_0x4f1f31,_0x53ced2,_0x201763,_0x39d8cc,this[_0x8abf0a(0x565)](),_0x8abf0a(0x7d5)));else TouchInput[_0x8abf0a(0x5ff)]()&&this['switchModes'](_0x8abf0a(0x890));}else{if(_0x8abf0a(0x1de)===_0x8abf0a(0x197)){const _0x507176=_0x12849a['CoreEngine']['Settings'][_0x8abf0a(0x8db)];if(!_0x507176)return![];if(_0x6ddf3d['RPGMAKER_VERSION']>='1.3.0'&&!_0x507176[_0x8abf0a(0x705)])return![];return _0x507176[_0x8abf0a(0x740)];}else VisuMZ['CoreEngine']['Window_NameInput_processTouch'][_0x8abf0a(0x809)](this);}},Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x827)]=function(){const _0x3e9e84=_0x41f3d3;if(Input['isSpecialCode'](_0x3e9e84(0x766)))Input[_0x3e9e84(0x3b1)](),this[_0x3e9e84(0x620)]();else{if(Input['_inputString']!==undefined){let _0x216c1e=Input[_0x3e9e84(0x5ea)],_0x2e5bb4=_0x216c1e[_0x3e9e84(0x9b7)];for(let _0x45d93a=0x0;_0x45d93a<_0x2e5bb4;++_0x45d93a){this['_editWindow']['add'](_0x216c1e[_0x45d93a])?SoundManager['playOk']():SoundManager['playBuzzer']();}Input['clear']();}}},Window_NameInput[_0x41f3d3(0x1fd)]['switchModes']=function(_0x43d243){const _0x2f37ed=_0x41f3d3;let _0xd05811=this[_0x2f37ed(0x7b8)];this[_0x2f37ed(0x7b8)]=_0x43d243,_0xd05811!==this[_0x2f37ed(0x7b8)]&&(this[_0x2f37ed(0x3b5)](),SoundManager[_0x2f37ed(0x85b)](),this[_0x2f37ed(0x7b8)]===_0x2f37ed(0x890)?this[_0x2f37ed(0x421)](0x0):this[_0x2f37ed(0x421)](-0x1));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x1bb)]=Window_NameInput[_0x41f3d3(0x1fd)]['cursorDown'],Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x410)]=function(_0x5596f0){const _0x443827=_0x41f3d3;if(this[_0x443827(0x7b8)]==='keyboard'&&!Input[_0x443827(0x87c)]())return;if(Input[_0x443827(0x8c8)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorDown'][_0x443827(0x809)](this,_0x5596f0),this[_0x443827(0x9f8)](_0x443827(0x890));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x453)]=Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x306)],Window_NameInput['prototype'][_0x41f3d3(0x306)]=function(_0x2bebfc){const _0x30c17b=_0x41f3d3;if(this[_0x30c17b(0x7b8)]===_0x30c17b(0x3eb)&&!Input[_0x30c17b(0x87c)]())return;if(Input[_0x30c17b(0x8c8)]())return;VisuMZ[_0x30c17b(0x5aa)][_0x30c17b(0x453)][_0x30c17b(0x809)](this,_0x2bebfc),this[_0x30c17b(0x9f8)](_0x30c17b(0x890));},VisuMZ[_0x41f3d3(0x5aa)]['Window_NameInput_cursorRight']=Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x71a)],Window_NameInput['prototype'][_0x41f3d3(0x71a)]=function(_0xcdaf74){const _0x4a6bdf=_0x41f3d3;if(this[_0x4a6bdf(0x7b8)]===_0x4a6bdf(0x3eb)&&!Input['isArrowPressed']())return;if(Input[_0x4a6bdf(0x8c8)]())return;VisuMZ[_0x4a6bdf(0x5aa)][_0x4a6bdf(0x93f)][_0x4a6bdf(0x809)](this,_0xcdaf74),this[_0x4a6bdf(0x9f8)]('default');},VisuMZ[_0x41f3d3(0x5aa)]['Window_NameInput_cursorLeft']=Window_NameInput['prototype'][_0x41f3d3(0x6c2)],Window_NameInput['prototype'][_0x41f3d3(0x6c2)]=function(_0xf81838){const _0x2adc07=_0x41f3d3;if(this[_0x2adc07(0x7b8)]===_0x2adc07(0x3eb)&&!Input[_0x2adc07(0x87c)]())return;if(Input[_0x2adc07(0x8c8)]())return;VisuMZ[_0x2adc07(0x5aa)][_0x2adc07(0x796)][_0x2adc07(0x809)](this,_0xf81838),this['switchModes'](_0x2adc07(0x890));},VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']=Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0xa08)],Window_NameInput['prototype']['cursorPagedown']=function(){const _0x494b8f=_0x41f3d3;if(this[_0x494b8f(0x7b8)]==='keyboard')return;if(Input[_0x494b8f(0x8c8)]())return;VisuMZ[_0x494b8f(0x5aa)][_0x494b8f(0x6d2)][_0x494b8f(0x809)](this),this[_0x494b8f(0x9f8)]('default');},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x941)]=Window_NameInput[_0x41f3d3(0x1fd)]['cursorPageup'],Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x603)]=function(){const _0xd29fee=_0x41f3d3;if(this[_0xd29fee(0x7b8)]===_0xd29fee(0x3eb))return;if(Input[_0xd29fee(0x8c8)]())return;VisuMZ[_0xd29fee(0x5aa)][_0xd29fee(0x941)][_0xd29fee(0x809)](this),this[_0xd29fee(0x9f8)](_0xd29fee(0x890));},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x6b5)]=Window_NameInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x3b5)],Window_NameInput['prototype'][_0x41f3d3(0x3b5)]=function(){const _0x4a72f1=_0x41f3d3;if(this[_0x4a72f1(0x7b8)]===_0x4a72f1(0x3eb)){if(_0x4a72f1(0x9ad)==='gMsKZ'){this[_0x4a72f1(0x9e9)][_0x4a72f1(0x3b1)](),this['contentsBack'][_0x4a72f1(0x3b1)](),this[_0x4a72f1(0x2df)]();let _0x4b92aa=VisuMZ[_0x4a72f1(0x5aa)][_0x4a72f1(0x5b1)][_0x4a72f1(0xa17)][_0x4a72f1(0x691)]['split']('\x0a'),_0x1f7f31=_0x4b92aa[_0x4a72f1(0x9b7)],_0x4224f8=(this[_0x4a72f1(0x83e)]-_0x1f7f31*this[_0x4a72f1(0x3c0)]())/0x2;for(let _0x2eed20=0x0;_0x2eed20<_0x1f7f31;++_0x2eed20){let _0x29e8ff=_0x4b92aa[_0x2eed20],_0x3bead9=this[_0x4a72f1(0x426)](_0x29e8ff)['width'],_0x11fa52=Math[_0x4a72f1(0x6ae)]((this[_0x4a72f1(0x9e9)][_0x4a72f1(0x665)]-_0x3bead9)/0x2);this[_0x4a72f1(0x48a)](_0x29e8ff,_0x11fa52,_0x4224f8),_0x4224f8+=this[_0x4a72f1(0x3c0)]();}}else return _0x275644[_0x4a72f1(0x4e9)]()===0x1;}else'XbAEW'!==_0x4a72f1(0x8c5)?VisuMZ[_0x4a72f1(0x5aa)][_0x4a72f1(0x6b5)]['call'](this):(_0x2a70ec('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4a72f1(0x382)](_0x2cb5e0,_0x399be7,_0x44ca72)),_0x7bca6c['exit']());};};VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x6e3)]=Window_ShopSell[_0x41f3d3(0x1fd)][_0x41f3d3(0x301)],Window_ShopSell[_0x41f3d3(0x1fd)][_0x41f3d3(0x301)]=function(_0x5d128e){const _0x57d226=_0x41f3d3;if(VisuMZ[_0x57d226(0x5aa)][_0x57d226(0x5b1)]['QoL'][_0x57d226(0x642)]&&DataManager[_0x57d226(0x4f3)](_0x5d128e)){if(_0x57d226(0x99e)!==_0x57d226(0x7d0))return![];else{_0x36b988[_0x57d226(0x5aa)]['SceneManager_exit'][_0x57d226(0x809)](this);if(_0x2ae37['RPGMAKER_VERSION']>=_0x57d226(0x50d)){if(typeof _0x34286b===_0x57d226(0x4b5))_0x40125c[_0x57d226(0x371)][_0x57d226(0x1c8)]();}}}else return VisuMZ[_0x57d226(0x5aa)]['Window_ShopSell_isEnabled']['call'](this,_0x5d128e);},Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x7ed)]=function(){return![];};function _0x4926(_0x3060ec,_0x29c131){const _0x2500d9=_0x2500();return _0x4926=function(_0x492630,_0x56d73b){_0x492630=_0x492630-0x18d;let _0x4a6411=_0x2500d9[_0x492630];return _0x4a6411;},_0x4926(_0x3060ec,_0x29c131);}VisuMZ['CoreEngine'][_0x41f3d3(0x5b1)][_0x41f3d3(0xa17)]['EnableNumberInput']&&(VisuMZ['CoreEngine'][_0x41f3d3(0x492)]=Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fc)],Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x6fc)]=function(){const _0x1ca5ed=_0x41f3d3;VisuMZ['CoreEngine'][_0x1ca5ed(0x492)]['call'](this),this['select'](this[_0x1ca5ed(0x2f1)]-0x1),Input[_0x1ca5ed(0x3b1)]();},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5d1)]=Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x695)],Window_NumberInput['prototype'][_0x41f3d3(0x695)]=function(){const _0x478ea4=_0x41f3d3;if(!this[_0x478ea4(0x58e)]())return;if(Input[_0x478ea4(0x8c8)]()){if(_0x478ea4(0x2fc)===_0x478ea4(0x2fc))this[_0x478ea4(0x26f)]();else return this[_0x478ea4(0x3e6)]()['hit']+0.05;}else{if(Input['isSpecialCode'](_0x478ea4(0x50e)))this[_0x478ea4(0x3a6)]();else{if(Input['_inputSpecialKeyCode']===0x2e){if(_0x478ea4(0x868)===_0x478ea4(0x868))this[_0x478ea4(0x601)]();else return _0xeb23a2[_0x478ea4(0x1fb)][_0x478ea4(0x4d8)][_0x478ea4(0x809)](this);}else{if(Input[_0x478ea4(0x7d9)]===0x24)_0x478ea4(0x45a)!=='GnKWH'?_0x373423+='([\x5c+\x5c-]\x5cd+)([%％])>':this[_0x478ea4(0x44c)]();else{if(Input[_0x478ea4(0x7d9)]===0x23)_0x478ea4(0x2b1)===_0x478ea4(0x3ce)?_0x1495a8=_0x2e220f[_0x478ea4(0x684)](_0x4e190f):this[_0x478ea4(0x71b)]();else{if(_0x478ea4(0x5c9)!=='SjKsh')return _0x59727a['CoreEngine'][_0x478ea4(0x282)][_0x478ea4(0x809)](this,_0x52ece7);else VisuMZ['CoreEngine'][_0x478ea4(0x5d1)][_0x478ea4(0x809)](this);}}}}}},Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x698)]=function(){const _0x36190c=_0x41f3d3;if(!this[_0x36190c(0x20c)]())return;Input[_0x36190c(0x8c8)]()?this[_0x36190c(0x26f)]():Window_Selectable[_0x36190c(0x1fd)][_0x36190c(0x698)]['call'](this);},Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x313)]=function(){},Window_NumberInput['prototype'][_0x41f3d3(0x26f)]=function(){const _0x46fd47=_0x41f3d3;if(String(this[_0x46fd47(0x451)])['length']>=this[_0x46fd47(0x2f1)])return;const _0x4f90d5=Number(String(this[_0x46fd47(0x451)])+Input[_0x46fd47(0x5ea)]);if(isNaN(_0x4f90d5))return;this[_0x46fd47(0x451)]=_0x4f90d5;const _0x156202='9'[_0x46fd47(0x8c6)](this[_0x46fd47(0x2f1)]);this[_0x46fd47(0x451)]=this['_number'][_0x46fd47(0x4f8)](0x0,_0x156202),Input['clear'](),this[_0x46fd47(0x3b5)](),SoundManager[_0x46fd47(0x807)](),this[_0x46fd47(0x421)](this['_maxDigits']-0x1);},Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x3a6)]=function(){const _0x25cbfe=_0x41f3d3;this[_0x25cbfe(0x451)]=Number(String(this['_number'])[_0x25cbfe(0x4df)](0x0,-0x1)),this[_0x25cbfe(0x451)]=Math['max'](0x0,this[_0x25cbfe(0x451)]),Input[_0x25cbfe(0x3b1)](),this[_0x25cbfe(0x3b5)](),SoundManager[_0x25cbfe(0x807)](),this[_0x25cbfe(0x421)](this[_0x25cbfe(0x2f1)]-0x1);},Window_NumberInput[_0x41f3d3(0x1fd)]['processKeyboardDelete']=function(){const _0x4e2624=_0x41f3d3;this[_0x4e2624(0x451)]=Number(String(this[_0x4e2624(0x451)])[_0x4e2624(0x328)](0x1)),this['_number']=Math[_0x4e2624(0x4a5)](0x0,this['_number']),Input['clear'](),this[_0x4e2624(0x3b5)](),SoundManager[_0x4e2624(0x807)](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x44c)]=function(){const _0x421b3c=_0x41f3d3;if(this[_0x421b3c(0x536)]()===0x0)return;Input[_0x421b3c(0x3b1)](),this['refresh'](),SoundManager['playCursor'](),this['select'](0x0);},Window_NumberInput[_0x41f3d3(0x1fd)][_0x41f3d3(0x71b)]=function(){const _0x2d24fc=_0x41f3d3;if(this[_0x2d24fc(0x536)]()===this[_0x2d24fc(0x2f1)]-0x1)return;Input['clear'](),this['refresh'](),SoundManager[_0x2d24fc(0x807)](),this[_0x2d24fc(0x421)](this[_0x2d24fc(0x2f1)]-0x1);});;VisuMZ['CoreEngine'][_0x41f3d3(0x404)]=Window_MapName[_0x41f3d3(0x1fd)][_0x41f3d3(0x3b5)],Window_MapName['prototype'][_0x41f3d3(0x3b5)]=function(){const _0x5a197d=_0x41f3d3;VisuMZ[_0x5a197d(0x5aa)][_0x5a197d(0x5b1)][_0x5a197d(0x2d1)][_0x5a197d(0x3f6)]?this[_0x5a197d(0x2f7)]():VisuMZ[_0x5a197d(0x5aa)][_0x5a197d(0x404)]['call'](this);},Window_MapName[_0x41f3d3(0x1fd)][_0x41f3d3(0x2f7)]=function(){const _0x6b1920=_0x41f3d3;this[_0x6b1920(0x9e9)][_0x6b1920(0x3b1)]();if($gameMap[_0x6b1920(0x6cd)]()){const _0x5a89c4=this[_0x6b1920(0x6e1)];this['drawBackground'](0x0,0x0,_0x5a89c4,this[_0x6b1920(0x3c0)]());const _0x4ff611=this[_0x6b1920(0x426)]($gameMap[_0x6b1920(0x6cd)]())[_0x6b1920(0x665)];this['drawTextEx']($gameMap[_0x6b1920(0x6cd)](),Math[_0x6b1920(0x6ae)]((_0x5a89c4-_0x4ff611)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)][_0x41f3d3(0x835)],Window_TitleCommand[_0x41f3d3(0x1fd)][_0x41f3d3(0x334)]=function(){const _0x32ee49=_0x41f3d3;this[_0x32ee49(0x971)]();},Window_TitleCommand['prototype'][_0x41f3d3(0x971)]=function(){const _0x2decdc=_0x41f3d3;for(const _0x2feed7 of Window_TitleCommand['_commandList']){if(_0x2feed7['ShowJS'][_0x2decdc(0x809)](this)){const _0x3099b6=_0x2feed7['Symbol'];let _0x5b8027=_0x2feed7[_0x2decdc(0x636)];if(['','Untitled'][_0x2decdc(0x85f)](_0x5b8027))_0x5b8027=_0x2feed7[_0x2decdc(0x9a1)]['call'](this);const _0x3708f6=_0x2feed7[_0x2decdc(0x8a7)][_0x2decdc(0x809)](this),_0x4b23f0=_0x2feed7[_0x2decdc(0x91d)][_0x2decdc(0x809)](this);this[_0x2decdc(0x759)](_0x5b8027,_0x3099b6,_0x3708f6,_0x4b23f0),this['setHandler'](_0x3099b6,_0x2feed7[_0x2decdc(0x5b5)]['bind'](this,_0x4b23f0));}}},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0xa61)]=Window_TitleCommand[_0x41f3d3(0x1fd)][_0x41f3d3(0x70c)],Window_TitleCommand[_0x41f3d3(0x1fd)][_0x41f3d3(0x70c)]=function(){const _0x51f5ad=_0x41f3d3;VisuMZ[_0x51f5ad(0x5aa)][_0x51f5ad(0xa61)][_0x51f5ad(0x809)](this);if(!Window_TitleCommand[_0x51f5ad(0x2ec)])return;const _0x5a4086=this[_0x51f5ad(0x64f)](Window_TitleCommand[_0x51f5ad(0x2ec)]),_0x56cf82=Math[_0x51f5ad(0x6ae)](this[_0x51f5ad(0x812)]()/0x2)-0x1;this['smoothSelect'](_0x5a4086),this[_0x51f5ad(0x915)]>0x1&&(this[_0x51f5ad(0x915)]=0x1,this['updateSmoothScroll']()),this[_0x51f5ad(0x804)](_0x5a4086-_0x56cf82);},Window_GameEnd[_0x41f3d3(0x2ed)]=VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5b1)]['MenuLayout'][_0x41f3d3(0x1d9)]['CommandList'],Window_GameEnd[_0x41f3d3(0x1fd)][_0x41f3d3(0x334)]=function(){const _0x3129e2=_0x41f3d3;this[_0x3129e2(0x971)]();},Window_GameEnd[_0x41f3d3(0x1fd)]['makeCoreEngineCommandList']=function(){const _0x36c5fa=_0x41f3d3;for(const _0x170198 of Window_GameEnd['_commandList']){if(_0x170198[_0x36c5fa(0x8e5)][_0x36c5fa(0x809)](this)){if(_0x36c5fa(0x4eb)!==_0x36c5fa(0x4eb))this[_0x36c5fa(0x889)]=_0x3aa218,this[_0x36c5fa(0x66a)]=_0x57ba84['makeDeepCopy'](this['_anchor']);else{const _0x37244e=_0x170198['Symbol'];let _0x44c7b2=_0x170198[_0x36c5fa(0x636)];if(['',_0x36c5fa(0x562)][_0x36c5fa(0x85f)](_0x44c7b2))_0x44c7b2=_0x170198[_0x36c5fa(0x9a1)][_0x36c5fa(0x809)](this);const _0x5c35aa=_0x170198[_0x36c5fa(0x8a7)]['call'](this),_0x5f2ba9=_0x170198[_0x36c5fa(0x91d)][_0x36c5fa(0x809)](this);this[_0x36c5fa(0x759)](_0x44c7b2,_0x37244e,_0x5c35aa,_0x5f2ba9),this[_0x36c5fa(0x528)](_0x37244e,_0x170198['CallHandlerJS'][_0x36c5fa(0x508)](this,_0x5f2ba9));}}}};function Window_ButtonAssist(){const _0x45c371=_0x41f3d3;this[_0x45c371(0x927)](...arguments);}Window_ButtonAssist[_0x41f3d3(0x1fd)]=Object[_0x41f3d3(0x65d)](Window_Base[_0x41f3d3(0x1fd)]),Window_ButtonAssist[_0x41f3d3(0x1fd)][_0x41f3d3(0x9a5)]=Window_ButtonAssist,Window_ButtonAssist[_0x41f3d3(0x1fd)][_0x41f3d3(0x927)]=function(_0x5f18b2){const _0x1b7829=_0x41f3d3;this[_0x1b7829(0x407)]={},Window_Base[_0x1b7829(0x1fd)][_0x1b7829(0x927)]['call'](this,_0x5f18b2),this['setBackgroundType'](VisuMZ[_0x1b7829(0x5aa)][_0x1b7829(0x5b1)]['ButtonAssist'][_0x1b7829(0x35d)]||0x0),this[_0x1b7829(0x3b5)]();},Window_ButtonAssist['prototype'][_0x41f3d3(0x778)]=function(){const _0x368454=_0x41f3d3;this[_0x368454(0x9e9)]['fontSize']<=0x60&&(this[_0x368454(0x9e9)]['fontSize']+=0x6);},Window_ButtonAssist[_0x41f3d3(0x1fd)]['makeFontSmaller']=function(){const _0x4b9447=_0x41f3d3;if(this['contents'][_0x4b9447(0x5d8)]>=0x18){if(_0x4b9447(0x94a)===_0x4b9447(0x94a))this[_0x4b9447(0x9e9)]['fontSize']-=0x6;else for(const _0x14b80b of _0x52142a[_0x4b9447(0x2ed)]){if(_0x14b80b[_0x4b9447(0x8e5)][_0x4b9447(0x809)](this)){const _0x91716c=_0x14b80b[_0x4b9447(0x3f1)];let _0xd270d7=_0x14b80b[_0x4b9447(0x636)];if(['',_0x4b9447(0x562)][_0x4b9447(0x85f)](_0xd270d7))_0xd270d7=_0x14b80b['TextJS'][_0x4b9447(0x809)](this);const _0x560744=_0x14b80b['EnableJS'][_0x4b9447(0x809)](this),_0x2d4525=_0x14b80b['ExtJS'][_0x4b9447(0x809)](this);this[_0x4b9447(0x759)](_0xd270d7,_0x91716c,_0x560744,_0x2d4525),this[_0x4b9447(0x528)](_0x91716c,_0x14b80b[_0x4b9447(0x5b5)][_0x4b9447(0x508)](this,_0x2d4525));}}}},Window_ButtonAssist[_0x41f3d3(0x1fd)]['update']=function(){const _0x5b7b25=_0x41f3d3;Window_Base[_0x5b7b25(0x1fd)][_0x5b7b25(0x314)][_0x5b7b25(0x809)](this),this[_0x5b7b25(0x98b)]();},Window_ButtonAssist[_0x41f3d3(0x1fd)][_0x41f3d3(0x77c)]=function(){const _0x19fa18=_0x41f3d3;this[_0x19fa18(0x790)]=SceneManager[_0x19fa18(0x2b5)][_0x19fa18(0x587)]()!==_0x19fa18(0x73f)?0x0:0x8;},Window_ButtonAssist[_0x41f3d3(0x1fd)]['updateKeyText']=function(){const _0x2f5e8f=_0x41f3d3,_0x36bd24=SceneManager[_0x2f5e8f(0x2b5)];for(let _0xfe4512=0x1;_0xfe4512<=0x5;_0xfe4512++){if('mLigm'===_0x2f5e8f(0x22b)){if(this[_0x2f5e8f(0x407)][_0x2f5e8f(0xa5b)[_0x2f5e8f(0x382)](_0xfe4512)]!==_0x36bd24['buttonAssistKey%1'[_0x2f5e8f(0x382)](_0xfe4512)]())return this[_0x2f5e8f(0x3b5)]();if(this[_0x2f5e8f(0x407)][_0x2f5e8f(0x4a9)[_0x2f5e8f(0x382)](_0xfe4512)]!==_0x36bd24[_0x2f5e8f(0xa3e)[_0x2f5e8f(0x382)](_0xfe4512)]()){if(_0x2f5e8f(0x25c)===_0x2f5e8f(0x25c))return this[_0x2f5e8f(0x3b5)]();else{const _0x28db59=_0x2f5e8f(0x290);this[_0x2f5e8f(0x33c)]=this[_0x2f5e8f(0x33c)]||{};if(this[_0x2f5e8f(0x33c)][_0x28db59])return this['_colorCache'][_0x28db59];const _0x47ae30=_0x3fca02[_0x2f5e8f(0x5aa)][_0x2f5e8f(0x5b1)]['Color'][_0x2f5e8f(0x398)];return this[_0x2f5e8f(0x512)](_0x28db59,_0x47ae30);}}}else this['_statusWindow'][_0x2f5e8f(0x564)](_0x55b6f2[_0x2f5e8f(0x1fb)][_0x2f5e8f(0x22e)]);}},Window_ButtonAssist[_0x41f3d3(0x1fd)][_0x41f3d3(0x3b5)]=function(){const _0xaef510=_0x41f3d3;this[_0xaef510(0x9e9)][_0xaef510(0x3b1)]();for(let _0x6350f=0x1;_0x6350f<=0x5;_0x6350f++){if('gpKZl'!==_0xaef510(0x604)){if(this['_coreEngineShakeStyle']===_0x38ab8d)this[_0xaef510(0x4c5)]();this['_coreEngineShakeStyle']=_0x31374f[_0xaef510(0x1b1)]()[_0xaef510(0x30b)]();}else this[_0xaef510(0x7a0)](_0x6350f);}},Window_ButtonAssist['prototype'][_0x41f3d3(0x7a0)]=function(_0x41a7d0){const _0x2116c7=_0x41f3d3,_0x4c081f=this[_0x2116c7(0x6e1)]/0x5,_0x588aa9=SceneManager[_0x2116c7(0x2b5)],_0x591274=_0x588aa9[_0x2116c7(0x784)[_0x2116c7(0x382)](_0x41a7d0)](),_0x3bd4e3=_0x588aa9[_0x2116c7(0xa3e)[_0x2116c7(0x382)](_0x41a7d0)]();this[_0x2116c7(0x407)][_0x2116c7(0xa5b)[_0x2116c7(0x382)](_0x41a7d0)]=_0x591274,this[_0x2116c7(0x407)][_0x2116c7(0x4a9)[_0x2116c7(0x382)](_0x41a7d0)]=_0x3bd4e3;if(_0x591274==='')return;if(_0x3bd4e3==='')return;const _0x4e935b=_0x588aa9[_0x2116c7(0x606)[_0x2116c7(0x382)](_0x41a7d0)](),_0x60d29a=this[_0x2116c7(0x505)](),_0x72fbb3=_0x4c081f*(_0x41a7d0-0x1)+_0x60d29a+_0x4e935b,_0x547b45=VisuMZ[_0x2116c7(0x5aa)][_0x2116c7(0x5b1)]['ButtonAssist']['TextFmt'];this[_0x2116c7(0x48a)](_0x547b45[_0x2116c7(0x382)](_0x591274,_0x3bd4e3),_0x72fbb3,0x0,_0x4c081f-_0x60d29a*0x2);},VisuMZ['CoreEngine'][_0x41f3d3(0x3b3)]=Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x516)],Game_Interpreter[_0x41f3d3(0x1fd)][_0x41f3d3(0x516)]=function(){const _0xc1a62e=_0x41f3d3;if($gameTemp[_0xc1a62e(0x977)]!==undefined)return VisuMZ[_0xc1a62e(0x5aa)][_0xc1a62e(0x7bc)]();return VisuMZ[_0xc1a62e(0x5aa)][_0xc1a62e(0x3b3)][_0xc1a62e(0x809)](this);},VisuMZ['CoreEngine'][_0x41f3d3(0x7bc)]=function(){const _0x1bbfbc=_0x41f3d3,_0xa1b75f=$gameTemp[_0x1bbfbc(0x977)]||0x0;(_0xa1b75f<0x0||_0xa1b75f>0x64||TouchInput[_0x1bbfbc(0x5ff)]()||Input[_0x1bbfbc(0x811)](_0x1bbfbc(0x4d4)))&&($gameTemp[_0x1bbfbc(0x977)]=undefined,Input[_0x1bbfbc(0x3b1)](),TouchInput[_0x1bbfbc(0x3b1)]());const _0x70ebf7=$gameScreen['picture'](_0xa1b75f);return _0x70ebf7&&(_0x70ebf7['_x']=TouchInput['_x'],_0x70ebf7['_y']=TouchInput['_y']),VisuMZ[_0x1bbfbc(0x5aa)][_0x1bbfbc(0x39f)](),$gameTemp[_0x1bbfbc(0x977)]!==undefined;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x39f)]=function(){const _0x142df9=_0x41f3d3,_0xd96b7b=SceneManager[_0x142df9(0x2b5)];if(!_0xd96b7b)return;!_0xd96b7b[_0x142df9(0x5b4)]&&(SoundManager[_0x142df9(0x1a0)](),_0xd96b7b[_0x142df9(0x5b4)]=new Window_PictureCoordinates(),_0xd96b7b['addChild'](_0xd96b7b[_0x142df9(0x5b4)]));if($gameTemp[_0x142df9(0x977)]===undefined){if('WxAFu'!==_0x142df9(0x462))SoundManager[_0x142df9(0x2e0)](),_0xd96b7b[_0x142df9(0x45f)](_0xd96b7b[_0x142df9(0x5b4)]),_0xd96b7b[_0x142df9(0x5b4)]=undefined;else try{_0x1d11fe['CoreEngine'][_0x142df9(0xa4a)][_0x142df9(0x809)](this,_0x5c3015);}catch(_0x2befea){if(_0x5c65ea[_0x142df9(0x67d)]())_0x52aee2[_0x142df9(0x5e6)](_0x2befea);}}};function Window_PictureCoordinates(){const _0x1d944f=_0x41f3d3;this[_0x1d944f(0x927)](...arguments);}Window_PictureCoordinates[_0x41f3d3(0x1fd)]=Object['create'](Window_Base[_0x41f3d3(0x1fd)]),Window_PictureCoordinates[_0x41f3d3(0x1fd)][_0x41f3d3(0x9a5)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x41f3d3(0x1fd)]['initialize']=function(){const _0x194c11=_0x41f3d3;this[_0x194c11(0x59b)]='nah',this['_lastX']=_0x194c11(0x37b),this[_0x194c11(0x54c)]=_0x194c11(0x37b);const _0x169d76=this['windowRect']();Window_Base[_0x194c11(0x1fd)]['initialize']['call'](this,_0x169d76),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x41f3d3(0x1fd)][_0x41f3d3(0x448)]=function(){const _0x4e2602=_0x41f3d3;let _0x3eb0cf=0x0,_0x4ac39b=Graphics['height']-this[_0x4e2602(0x3c0)](),_0x5b9c97=Graphics[_0x4e2602(0x665)],_0x1c4392=this['lineHeight']();return new Rectangle(_0x3eb0cf,_0x4ac39b,_0x5b9c97,_0x1c4392);},Window_PictureCoordinates[_0x41f3d3(0x1fd)][_0x41f3d3(0x77c)]=function(){const _0x146bd9=_0x41f3d3;this[_0x146bd9(0x790)]=0x0;},Window_PictureCoordinates[_0x41f3d3(0x1fd)][_0x41f3d3(0x314)]=function(){const _0x41e1f2=_0x41f3d3;Window_Base[_0x41e1f2(0x1fd)][_0x41e1f2(0x314)][_0x41e1f2(0x809)](this),this['updateData']();},Window_PictureCoordinates['prototype'][_0x41f3d3(0x869)]=function(){const _0x27ac20=_0x41f3d3;if(!this[_0x27ac20(0x68b)]())return;this['refresh']();},Window_PictureCoordinates['prototype'][_0x41f3d3(0x68b)]=function(){const _0x538ced=_0x41f3d3,_0x430728=$gameTemp[_0x538ced(0x977)],_0x577f73=$gameScreen[_0x538ced(0x4af)](_0x430728);if(_0x577f73){if(_0x538ced(0x2a3)==='vBVvj')return this[_0x538ced(0x59b)]!==_0x577f73[_0x538ced(0x463)]||this[_0x538ced(0x991)]!==_0x577f73['_x']||this['_lastY']!==_0x577f73['_y'];else{try{_0x509fbe[_0x538ced(0x5aa)]['Game_Interpreter_command111']['call'](this,_0x2fa1d9);}catch(_0x16fe81){_0xc3fdfb[_0x538ced(0x67d)]()&&(_0x20c01c[_0x538ced(0x5e6)](_0x538ced(0x955)),_0x49d4d3[_0x538ced(0x5e6)](_0x16fe81)),this[_0x538ced(0x922)]();}return!![];}}else return![];},Window_PictureCoordinates['prototype'][_0x41f3d3(0x3b5)]=function(){const _0x5ab63a=_0x41f3d3;this[_0x5ab63a(0x9e9)][_0x5ab63a(0x3b1)]();const _0x3a1694=$gameTemp[_0x5ab63a(0x977)],_0x1976b6=$gameScreen[_0x5ab63a(0x4af)](_0x3a1694);if(!_0x1976b6)return;this[_0x5ab63a(0x59b)]=_0x1976b6[_0x5ab63a(0x463)],this[_0x5ab63a(0x991)]=_0x1976b6['_x'],this[_0x5ab63a(0x54c)]=_0x1976b6['_y'];const _0x45c8c1=ColorManager[_0x5ab63a(0x6cf)]();this[_0x5ab63a(0x9e9)]['fillRect'](0x0,0x0,this[_0x5ab63a(0x6e1)],this[_0x5ab63a(0x83e)],_0x45c8c1);const _0x39079c=_0x5ab63a(0x98e)[_0x5ab63a(0x382)](_0x1976b6[_0x5ab63a(0x463)]===0x0?'Upper\x20Left':'Center'),_0x313c4d='X:\x20%1'[_0x5ab63a(0x382)](_0x1976b6['_x']),_0x8faf6f='Y:\x20%1'['format'](_0x1976b6['_y']),_0x5bbd5b=_0x5ab63a(0x1ea)[_0x5ab63a(0x382)](TextManager[_0x5ab63a(0x359)](_0x5ab63a(0x4d4)));let _0x2ad8dd=Math[_0x5ab63a(0x6ae)](this['innerWidth']/0x4);this['drawText'](_0x39079c,_0x2ad8dd*0x0,0x0,_0x2ad8dd),this[_0x5ab63a(0x7d1)](_0x313c4d,_0x2ad8dd*0x1,0x0,_0x2ad8dd,'center'),this[_0x5ab63a(0x7d1)](_0x8faf6f,_0x2ad8dd*0x2,0x0,_0x2ad8dd,_0x5ab63a(0x413));const _0x375df4=this[_0x5ab63a(0x426)](_0x5bbd5b)[_0x5ab63a(0x665)],_0x5458a1=this[_0x5ab63a(0x6e1)]-_0x375df4;this['drawTextEx'](_0x5bbd5b,_0x5458a1,0x0,_0x375df4);},VisuMZ[_0x41f3d3(0x760)]=function(_0x3c677d){const _0x9fa554=_0x41f3d3;if(Utils[_0x9fa554(0x65b)](_0x9fa554(0x1ae))){var _0x424f27=require(_0x9fa554(0x25a))[_0x9fa554(0x1c6)][_0x9fa554(0x9d0)]();SceneManager[_0x9fa554(0x3d6)]();if(_0x3c677d)setTimeout(_0x424f27[_0x9fa554(0x377)]['bind'](_0x424f27),0x190);}},VisuMZ['ApplyEasing']=function(_0x5da2e0,_0x4615b8){const _0x5cede0=_0x41f3d3;_0x4615b8=_0x4615b8['toUpperCase']();var _0x5d9373=1.70158,_0x48e08d=0.7;switch(_0x4615b8){case'LINEAR':return _0x5da2e0;case'INSINE':return-0x1*Math[_0x5cede0(0x761)](_0x5da2e0*(Math['PI']/0x2))+0x1;case _0x5cede0(0x78c):return Math['sin'](_0x5da2e0*(Math['PI']/0x2));case _0x5cede0(0x47f):return-0.5*(Math[_0x5cede0(0x761)](Math['PI']*_0x5da2e0)-0x1);case _0x5cede0(0x638):return _0x5da2e0*_0x5da2e0;case'OUTQUAD':return _0x5da2e0*(0x2-_0x5da2e0);case _0x5cede0(0x3d0):return _0x5da2e0<0.5?0x2*_0x5da2e0*_0x5da2e0:-0x1+(0x4-0x2*_0x5da2e0)*_0x5da2e0;case _0x5cede0(0x825):return _0x5da2e0*_0x5da2e0*_0x5da2e0;case _0x5cede0(0x90a):var _0x344bf0=_0x5da2e0-0x1;return _0x344bf0*_0x344bf0*_0x344bf0+0x1;case _0x5cede0(0x81d):return _0x5da2e0<0.5?0x4*_0x5da2e0*_0x5da2e0*_0x5da2e0:(_0x5da2e0-0x1)*(0x2*_0x5da2e0-0x2)*(0x2*_0x5da2e0-0x2)+0x1;case _0x5cede0(0x86d):return _0x5da2e0*_0x5da2e0*_0x5da2e0*_0x5da2e0;case _0x5cede0(0x4ca):var _0x344bf0=_0x5da2e0-0x1;return 0x1-_0x344bf0*_0x344bf0*_0x344bf0*_0x344bf0;case _0x5cede0(0x580):var _0x344bf0=_0x5da2e0-0x1;return _0x5da2e0<0.5?0x8*_0x5da2e0*_0x5da2e0*_0x5da2e0*_0x5da2e0:0x1-0x8*_0x344bf0*_0x344bf0*_0x344bf0*_0x344bf0;case _0x5cede0(0x532):return _0x5da2e0*_0x5da2e0*_0x5da2e0*_0x5da2e0*_0x5da2e0;case _0x5cede0(0x558):var _0x344bf0=_0x5da2e0-0x1;return 0x1+_0x344bf0*_0x344bf0*_0x344bf0*_0x344bf0*_0x344bf0;case'INOUTQUINT':var _0x344bf0=_0x5da2e0-0x1;return _0x5da2e0<0.5?0x10*_0x5da2e0*_0x5da2e0*_0x5da2e0*_0x5da2e0*_0x5da2e0:0x1+0x10*_0x344bf0*_0x344bf0*_0x344bf0*_0x344bf0*_0x344bf0;case'INEXPO':if(_0x5da2e0===0x0)return 0x0;return Math[_0x5cede0(0x7a5)](0x2,0xa*(_0x5da2e0-0x1));case _0x5cede0(0x82c):if(_0x5da2e0===0x1)return 0x1;return-Math[_0x5cede0(0x7a5)](0x2,-0xa*_0x5da2e0)+0x1;case _0x5cede0(0x7dd):if(_0x5da2e0===0x0||_0x5da2e0===0x1)return _0x5da2e0;var _0x4021ee=_0x5da2e0*0x2,_0x503089=_0x4021ee-0x1;if(_0x4021ee<0x1){if(_0x5cede0(0x86e)===_0x5cede0(0x7f2)){const _0x2b9397=_0x34a875(this['constructor'][_0x5cede0(0x23b)]),_0x1db777=this[_0x5cede0(0x5ec)](_0x2b9397);_0x1db777&&(_0x1db777['BgFilename1']!==''||_0x1db777[_0x5cede0(0x916)]!=='')&&(this[_0x5cede0(0x640)]=new _0x6770f2(_0x4e9a9d['loadTitle1'](_0x1db777[_0x5cede0(0x8f7)])),this[_0x5cede0(0x4e7)]=new _0xa4a113(_0xc81944[_0x5cede0(0x681)](_0x1db777['BgFilename2'])),this[_0x5cede0(0x65e)](this[_0x5cede0(0x640)]),this[_0x5cede0(0x65e)](this[_0x5cede0(0x4e7)]),this[_0x5cede0(0x640)][_0x5cede0(0x5b0)][_0x5cede0(0x42e)](this[_0x5cede0(0x3f8)][_0x5cede0(0x508)](this,this[_0x5cede0(0x640)])),this[_0x5cede0(0x4e7)][_0x5cede0(0x5b0)]['addLoadListener'](this[_0x5cede0(0x3f8)][_0x5cede0(0x508)](this,this[_0x5cede0(0x4e7)])));}else return 0.5*Math[_0x5cede0(0x7a5)](0x2,0xa*_0x503089);}return 0.5*(-Math[_0x5cede0(0x7a5)](0x2,-0xa*_0x503089)+0x2);case'INCIRC':var _0x4021ee=_0x5da2e0/0x1;return-0x1*(Math[_0x5cede0(0x91b)](0x1-_0x4021ee*_0x5da2e0)-0x1);case _0x5cede0(0x4a4):var _0x344bf0=_0x5da2e0-0x1;return Math[_0x5cede0(0x91b)](0x1-_0x344bf0*_0x344bf0);case _0x5cede0(0x7fc):var _0x4021ee=_0x5da2e0*0x2,_0x503089=_0x4021ee-0x2;if(_0x4021ee<0x1)return _0x5cede0(0x5ef)!==_0x5cede0(0x5ef)?_0x176507[_0x5cede0(0x1fb)][_0x5cede0(0x92d)][_0x5cede0(0x809)](this):-0.5*(Math[_0x5cede0(0x91b)](0x1-_0x4021ee*_0x4021ee)-0x1);return 0.5*(Math[_0x5cede0(0x91b)](0x1-_0x503089*_0x503089)+0x1);case _0x5cede0(0x6e4):return _0x5da2e0*_0x5da2e0*((_0x5d9373+0x1)*_0x5da2e0-_0x5d9373);case _0x5cede0(0x35a):var _0x4021ee=_0x5da2e0/0x1-0x1;return _0x4021ee*_0x4021ee*((_0x5d9373+0x1)*_0x4021ee+_0x5d9373)+0x1;break;case'INOUTBACK':var _0x4021ee=_0x5da2e0*0x2,_0x457b4c=_0x4021ee-0x2,_0x3f44e6=_0x5d9373*1.525;if(_0x4021ee<0x1)return _0x5cede0(0x39d)!=='fqTNp'?0.5*_0x4021ee*_0x4021ee*((_0x3f44e6+0x1)*_0x4021ee-_0x3f44e6):_0x275536[_0x5cede0(0x1fb)]['ProfileRect'][_0x5cede0(0x809)](this);return 0.5*(_0x457b4c*_0x457b4c*((_0x3f44e6+0x1)*_0x457b4c+_0x3f44e6)+0x2);case _0x5cede0(0x747):if(_0x5da2e0===0x0||_0x5da2e0===0x1)return _0x5da2e0;var _0x4021ee=_0x5da2e0/0x1,_0x503089=_0x4021ee-0x1,_0x55c02e=0x1-_0x48e08d,_0x3f44e6=_0x55c02e/(0x2*Math['PI'])*Math[_0x5cede0(0x1f0)](0x1);return-(Math['pow'](0x2,0xa*_0x503089)*Math[_0x5cede0(0x1db)]((_0x503089-_0x3f44e6)*(0x2*Math['PI'])/_0x55c02e));case _0x5cede0(0x9d4):var _0x55c02e=0x1-_0x48e08d,_0x4021ee=_0x5da2e0*0x2;if(_0x5da2e0===0x0||_0x5da2e0===0x1)return _0x5da2e0;var _0x3f44e6=_0x55c02e/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x5cede0(0x7a5)](0x2,-0xa*_0x4021ee)*Math[_0x5cede0(0x1db)]((_0x4021ee-_0x3f44e6)*(0x2*Math['PI'])/_0x55c02e)+0x1;case _0x5cede0(0x3c7):var _0x55c02e=0x1-_0x48e08d;if(_0x5da2e0===0x0||_0x5da2e0===0x1){if(_0x5cede0(0x664)!==_0x5cede0(0x6f9))return _0x5da2e0;else{if(_0x3b55de&&_0x41b721[_0x5cede0(0x6ab)]){if(this[_0x5cede0(0x56a)](_0x10d6ff))return!![];if(this['isGamepadAxisMoved'](_0x387c38))return!![];}}}var _0x4021ee=_0x5da2e0*0x2,_0x503089=_0x4021ee-0x1,_0x3f44e6=_0x55c02e/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x4021ee<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x503089)*Math[_0x5cede0(0x1db)]((_0x503089-_0x3f44e6)*(0x2*Math['PI'])/_0x55c02e));return Math['pow'](0x2,-0xa*_0x503089)*Math[_0x5cede0(0x1db)]((_0x503089-_0x3f44e6)*(0x2*Math['PI'])/_0x55c02e)*0.5+0x1;case _0x5cede0(0x195):var _0x4021ee=_0x5da2e0/0x1;if(_0x4021ee<0x1/2.75){if(_0x5cede0(0x6e2)!=='pRtzy')return 7.5625*_0x4021ee*_0x4021ee;else{const _0x4d39bf=_0x2fb2c6[_0x5cede0(0x478)];_0x4d39bf['KeySHIFT']=_0x4d39bf['KeySHIFT']||_0x5cede0(0x4e2),_0x4d39bf[_0x5cede0(0x959)]=_0x4d39bf[_0x5cede0(0x959)]||'\x5c}❪TAB❫\x5c{';}}else{if(_0x4021ee<0x2/2.75){var _0x457b4c=_0x4021ee-1.5/2.75;return 7.5625*_0x457b4c*_0x457b4c+0.75;}else{if(_0x4021ee<2.5/2.75){var _0x457b4c=_0x4021ee-2.25/2.75;return 7.5625*_0x457b4c*_0x457b4c+0.9375;}else{var _0x457b4c=_0x4021ee-2.625/2.75;return 7.5625*_0x457b4c*_0x457b4c+0.984375;}}}case _0x5cede0(0x23e):var _0x286910=0x1-VisuMZ[_0x5cede0(0x92a)](0x1-_0x5da2e0,'outbounce');return _0x286910;case'INOUTBOUNCE':if(_0x5da2e0<0.5)var _0x286910=VisuMZ['ApplyEasing'](_0x5da2e0*0x2,'inbounce')*0.5;else{if(_0x5cede0(0xa1b)!=='iYIjJ')var _0x286910=VisuMZ[_0x5cede0(0x92a)](_0x5da2e0*0x2-0x1,_0x5cede0(0x2d7))*0.5+0.5;else _0x13db23[_0x5cede0(0x5aa)][_0x5cede0(0x654)][_0x5cede0(0x809)](this,_0x96c9f8),_0xabfe3=this[_0x5cede0(0x689)],_0x2f0b40=this['_targets'],_0x330a04=this['_target']||this[_0x5cede0(0x995)][0x0];}return _0x286910;default:return _0x5da2e0;}},VisuMZ[_0x41f3d3(0x8a0)]=function(_0x214a25){const _0x50223d=_0x41f3d3;_0x214a25=String(_0x214a25)[_0x50223d(0x97e)]();const _0x2144f4=VisuMZ['CoreEngine'][_0x50223d(0x5b1)]['Param'];if(_0x214a25===_0x50223d(0x9f6))return _0x2144f4['IconParam0'];if(_0x214a25===_0x50223d(0x777))return _0x2144f4[_0x50223d(0x25e)];if(_0x214a25===_0x50223d(0x68f))return _0x2144f4[_0x50223d(0x8c3)];if(_0x214a25===_0x50223d(0x5f0))return _0x2144f4[_0x50223d(0x53c)];if(_0x214a25==='MAT')return _0x2144f4[_0x50223d(0x629)];if(_0x214a25===_0x50223d(0x980))return _0x2144f4[_0x50223d(0x27d)];if(_0x214a25===_0x50223d(0x5e0))return _0x2144f4['IconParam6'];if(_0x214a25===_0x50223d(0x9ef))return _0x2144f4['IconParam7'];if(_0x214a25===_0x50223d(0xa33))return _0x2144f4[_0x50223d(0x832)];if(_0x214a25===_0x50223d(0x395))return _0x2144f4[_0x50223d(0x9fa)];if(_0x214a25===_0x50223d(0x878))return _0x2144f4['IconXParam2'];if(_0x214a25===_0x50223d(0x1bf))return _0x2144f4[_0x50223d(0x5da)];if(_0x214a25===_0x50223d(0x577))return _0x2144f4[_0x50223d(0xa13)];if(_0x214a25==='MRF')return _0x2144f4[_0x50223d(0x795)];if(_0x214a25==='CNT')return _0x2144f4[_0x50223d(0x6b2)];if(_0x214a25===_0x50223d(0x3fe))return _0x2144f4[_0x50223d(0x311)];if(_0x214a25===_0x50223d(0x8fa))return _0x2144f4[_0x50223d(0x44d)];if(_0x214a25===_0x50223d(0x19e))return _0x2144f4[_0x50223d(0x22d)];if(_0x214a25===_0x50223d(0xa3a))return _0x2144f4[_0x50223d(0x8af)];if(_0x214a25===_0x50223d(0x8f2))return _0x2144f4[_0x50223d(0x1d1)];if(_0x214a25===_0x50223d(0x3c5))return _0x2144f4[_0x50223d(0x3d5)];if(_0x214a25===_0x50223d(0x258))return _0x2144f4[_0x50223d(0x887)];if(_0x214a25===_0x50223d(0x2d9))return _0x2144f4['IconSParam4'];if(_0x214a25===_0x50223d(0x9fb))return _0x2144f4['IconSParam5'];if(_0x214a25===_0x50223d(0x34f))return _0x2144f4[_0x50223d(0x931)];if(_0x214a25===_0x50223d(0x686))return _0x2144f4['IconSParam7'];if(_0x214a25===_0x50223d(0x192))return _0x2144f4[_0x50223d(0x566)];if(_0x214a25===_0x50223d(0x982))return _0x2144f4[_0x50223d(0x357)];if(VisuMZ[_0x50223d(0x5aa)]['CustomParamIcons'][_0x214a25])return VisuMZ[_0x50223d(0x5aa)]['CustomParamIcons'][_0x214a25]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x1bc71c,_0xfe4523,_0x247e20){const _0x3dcad6=_0x41f3d3;if(_0x247e20===undefined&&_0x1bc71c%0x1===0x0)return _0x1bc71c;if(_0x247e20!==undefined&&[_0x3dcad6(0x9f6),_0x3dcad6(0x777),'ATK',_0x3dcad6(0x5f0),'MAT',_0x3dcad6(0x980),_0x3dcad6(0x5e0),_0x3dcad6(0x9ef)][_0x3dcad6(0x85f)](String(_0x247e20)[_0x3dcad6(0x97e)]()['trim']()))return _0x1bc71c;_0xfe4523=_0xfe4523||0x0;if(VisuMZ[_0x3dcad6(0x5aa)][_0x3dcad6(0x5f6)][_0x247e20])return VisuMZ[_0x3dcad6(0x5aa)][_0x3dcad6(0xa66)][_0x247e20]===_0x3dcad6(0x45e)?_0x1bc71c:String((_0x1bc71c*0x64)['toFixed'](_0xfe4523))+'%';return String((_0x1bc71c*0x64)[_0x3dcad6(0x45d)](_0xfe4523))+'%';},VisuMZ[_0x41f3d3(0x684)]=function(_0x5a9f2a){const _0x15563d=_0x41f3d3;_0x5a9f2a=String(_0x5a9f2a);if(!_0x5a9f2a)return _0x5a9f2a;if(typeof _0x5a9f2a!==_0x15563d(0x723))return _0x5a9f2a;const _0x5da2de=VisuMZ[_0x15563d(0x5aa)][_0x15563d(0x5b1)]['QoL']['DigitGroupingLocale']||_0x15563d(0x845),_0x413c83={'maximumFractionDigits':0x6};_0x5a9f2a=_0x5a9f2a['replace'](/\[(.*?)\]/g,(_0x51ad4c,_0x315c80)=>{const _0x2d0689=_0x15563d;return VisuMZ[_0x2d0689(0x78f)](_0x315c80,'[',']');}),_0x5a9f2a=_0x5a9f2a[_0x15563d(0x572)](/<(.*?)>/g,(_0x5296b7,_0x5392e5)=>{const _0x56a447=_0x15563d;if(_0x56a447(0x39a)===_0x56a447(0x36f))for(const _0x2c27c9 of _0x1ab061['_commandList']){if(_0x2c27c9[_0x56a447(0x8e5)]['call'](this)){const _0xf59b68=_0x2c27c9[_0x56a447(0x3f1)];let _0x5f3237=_0x2c27c9[_0x56a447(0x636)];if(['',_0x56a447(0x562)]['includes'](_0x5f3237))_0x5f3237=_0x2c27c9['TextJS']['call'](this);const _0x27e514=_0x2c27c9['EnableJS']['call'](this),_0x38c9d0=_0x2c27c9[_0x56a447(0x91d)][_0x56a447(0x809)](this);this[_0x56a447(0x759)](_0x5f3237,_0xf59b68,_0x27e514,_0x38c9d0),this['setHandler'](_0xf59b68,_0x2c27c9[_0x56a447(0x5b5)][_0x56a447(0x508)](this,_0x38c9d0));}}else return VisuMZ[_0x56a447(0x78f)](_0x5392e5,'<','>');}),_0x5a9f2a=_0x5a9f2a[_0x15563d(0x572)](/\{\{(.*?)\}\}/g,(_0x3777a1,_0x11a02b)=>{const _0x589af7=_0x15563d;return VisuMZ[_0x589af7(0x78f)](_0x11a02b,'','');}),_0x5a9f2a=_0x5a9f2a[_0x15563d(0x572)](/(\d+\.?\d*)/g,(_0x339dab,_0x4e8b45)=>{const _0x27e583=_0x15563d;let _0x3f2414=_0x4e8b45;if(_0x3f2414[0x0]==='0')return _0x3f2414;if(_0x3f2414[_0x3f2414['length']-0x1]==='.')return Number(_0x3f2414)[_0x27e583(0x900)](_0x5da2de,_0x413c83)+'.';else return _0x3f2414[_0x3f2414[_0x27e583(0x9b7)]-0x1]===','?Number(_0x3f2414)[_0x27e583(0x900)](_0x5da2de,_0x413c83)+',':Number(_0x3f2414)[_0x27e583(0x900)](_0x5da2de,_0x413c83);});let _0x28d25b=0x3;while(_0x28d25b--){if(_0x15563d(0xa59)!==_0x15563d(0x273))_0x5a9f2a=VisuMZ[_0x15563d(0x8bf)](_0x5a9f2a);else{const _0x845360=_0x15563d(0x64b);this[_0x15563d(0x33c)]=this[_0x15563d(0x33c)]||{};if(this['_colorCache'][_0x845360])return this[_0x15563d(0x33c)][_0x845360];const _0x4a528e=_0x111b5c['CoreEngine']['Settings'][_0x15563d(0x546)][_0x15563d(0x62a)];return this[_0x15563d(0x512)](_0x845360,_0x4a528e);}}return _0x5a9f2a;},VisuMZ[_0x41f3d3(0x78f)]=function(_0x595109,_0x383f3e,_0x5a009a){const _0x19da43=_0x41f3d3;return _0x595109=_0x595109['replace'](/(\d)/gi,(_0xaaf744,_0x30c23a)=>_0x19da43(0x8a8)[_0x19da43(0x382)](Number(_0x30c23a))),_0x19da43(0x1c4)[_0x19da43(0x382)](_0x595109,_0x383f3e,_0x5a009a);},VisuMZ[_0x41f3d3(0x8bf)]=function(_0x3a165a){const _0x41a6c8=_0x41f3d3;return _0x3a165a=_0x3a165a[_0x41a6c8(0x572)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x211e3a,_0x296fbb)=>Number(parseInt(_0x296fbb))),_0x3a165a;},VisuMZ['openURL']=function(_0x2c0b42){const _0x19750f=_0x41f3d3;SoundManager['playOk']();if(!Utils['isNwjs']()){const _0x2360c8=window[_0x19750f(0xa19)](_0x2c0b42,_0x19750f(0x61a));}else{const _0x354f60=process[_0x19750f(0x7c9)]==_0x19750f(0x531)?_0x19750f(0xa19):process[_0x19750f(0x7c9)]==_0x19750f(0x7be)?'start':'xdg-open';require(_0x19750f(0x7f3))[_0x19750f(0x72c)](_0x354f60+'\x20'+_0x2c0b42);}},VisuMZ[_0x41f3d3(0x1ca)]=function(_0x40e487,_0xe2427c){const _0x36d4ad=_0x41f3d3;if(!_0x40e487)return'';const _0x115007=_0x40e487['baseId']||_0x40e487['id'];let _0x422fa4='';_0x40e487['initialLevel']!==undefined&&_0x40e487[_0x36d4ad(0x7fa)]!==undefined&&(_0x422fa4=_0x36d4ad(0x525)[_0x36d4ad(0x382)](_0x115007,_0xe2427c));_0x40e487[_0x36d4ad(0x6c0)]!==undefined&&_0x40e487[_0x36d4ad(0xa00)]!==undefined&&(_0x422fa4=_0x36d4ad(0x247)[_0x36d4ad(0x382)](_0x115007,_0xe2427c));if(_0x40e487['stypeId']!==undefined&&_0x40e487[_0x36d4ad(0x259)]!==undefined){if('mFCsV'!==_0x36d4ad(0x668))_0x422fa4=_0x36d4ad(0x81e)[_0x36d4ad(0x382)](_0x115007,_0xe2427c);else{let _0x55faa5='param'+_0x5aafcd+_0x36d4ad(0x8bb);if(this[_0x36d4ad(0x673)](_0x55faa5))return this[_0x36d4ad(0xa1f)][_0x55faa5];return this[_0x36d4ad(0xa1f)][_0x55faa5]=_0x2f179d[_0x36d4ad(0x92b)](_0x7ffa6e[_0x36d4ad(0x5aa)][_0x36d4ad(0x5b1)][_0x36d4ad(0x803)][_0x36d4ad(0x618)]['call'](this,_0x58559f)),this[_0x36d4ad(0xa1f)][_0x55faa5];}}if(_0x40e487['itypeId']!==undefined&&_0x40e487[_0x36d4ad(0x864)]!==undefined){if(_0x36d4ad(0x9c4)!==_0x36d4ad(0x44b))_0x422fa4='Item-%1-%2'[_0x36d4ad(0x382)](_0x115007,_0xe2427c);else return'';}if(_0x40e487[_0x36d4ad(0x2c3)]!==undefined&&_0x40e487[_0x36d4ad(0x2cb)]===0x1){if(_0x36d4ad(0x3d8)!==_0x36d4ad(0x3d8))return this;else _0x422fa4=_0x36d4ad(0x970)[_0x36d4ad(0x382)](_0x115007,_0xe2427c);}return _0x40e487['atypeId']!==undefined&&_0x40e487[_0x36d4ad(0x2cb)]>0x1&&(_0x36d4ad(0x706)==='dLcdq'?(_0x40f954=_0x4b6a01[_0x36d4ad(0x7b1)](),_0x3fde71=_0xb85b5b[_0x36d4ad(0x663)]()):_0x422fa4=_0x36d4ad(0x238)[_0x36d4ad(0x382)](_0x115007,_0xe2427c)),_0x40e487[_0x36d4ad(0x905)]!==undefined&&_0x40e487[_0x36d4ad(0x44e)]!==undefined&&(_0x422fa4='Enemy-%1-%2'['format'](_0x115007,_0xe2427c)),_0x40e487[_0x36d4ad(0x711)]!==undefined&&_0x40e487[_0x36d4ad(0x56d)]!==undefined&&(_0x422fa4=_0x36d4ad(0x4d5)['format'](_0x115007,_0xe2427c)),_0x422fa4;},Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x27b)]=function(){const _0x3bae86=_0x41f3d3;return this[_0x3bae86(0x889)];},VisuMZ[_0x41f3d3(0x5aa)]['Game_Picture_initBasic']=Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x493)],Game_Picture['prototype'][_0x41f3d3(0x493)]=function(){const _0x5b0483=_0x41f3d3;VisuMZ[_0x5b0483(0x5aa)][_0x5b0483(0x95b)][_0x5b0483(0x809)](this),this[_0x5b0483(0x889)]={'x':0x0,'y':0x0},this[_0x5b0483(0x66a)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x41f3d3(0x74b)]=Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x515)],Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x515)]=function(){const _0x527eb7=_0x41f3d3;this[_0x527eb7(0x39c)]();const _0x12c615=this['_duration'];VisuMZ[_0x527eb7(0x5aa)][_0x527eb7(0x74b)][_0x527eb7(0x809)](this),_0x12c615>0x0&&this[_0x527eb7(0x836)]<=0x0&&(this['_x']=this[_0x527eb7(0x38c)],this['_y']=this['_targetY'],this[_0x527eb7(0x375)]=this[_0x527eb7(0x43a)],this[_0x527eb7(0x4f2)]=this[_0x527eb7(0x861)],this[_0x527eb7(0x271)]=this['_targetOpacity'],this[_0x527eb7(0x889)]&&('WJhjM'===_0x527eb7(0x8f3)?(_0xdcbce8[_0x527eb7(0x1fd)]['update'][_0x527eb7(0x809)](this),this[_0x527eb7(0x98b)]()):(this[_0x527eb7(0x889)]['x']=this['_targetAnchor']['x'],this[_0x527eb7(0x889)]['y']=this[_0x527eb7(0x66a)]['y'])));},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x893)],Game_Picture['prototype'][_0x41f3d3(0x893)]=function(_0x26403f,_0x55a26b,_0x2d0680,_0x564f9d,_0x1aeb82,_0x3bf97f,_0x159c17,_0x19c639){const _0x4d1c0f=_0x41f3d3;VisuMZ[_0x4d1c0f(0x5aa)][_0x4d1c0f(0x8cd)]['call'](this,_0x26403f,_0x55a26b,_0x2d0680,_0x564f9d,_0x1aeb82,_0x3bf97f,_0x159c17,_0x19c639),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x55a26b]||{'x':0x0,'y':0x0});},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x240)]=Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x608)],Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x608)]=function(_0x142cc6,_0x4136c3,_0x1b73d3,_0x554f59,_0x5f2767,_0x5143e1,_0x12ea51,_0x2e4fcc,_0x2fff92){const _0x3dea2c=_0x41f3d3;VisuMZ['CoreEngine']['Game_Picture_move']['call'](this,_0x142cc6,_0x4136c3,_0x1b73d3,_0x554f59,_0x5f2767,_0x5143e1,_0x12ea51,_0x2e4fcc,_0x2fff92),this[_0x3dea2c(0x23f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x142cc6]||{'x':0x0,'y':0x0});},Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x39c)]=function(){const _0x29a487=_0x41f3d3;if(this[_0x29a487(0x836)]>0x0){if(_0x29a487(0x567)===_0x29a487(0x567))this[_0x29a487(0x889)]['x']=this[_0x29a487(0x685)](this[_0x29a487(0x889)]['x'],this['_targetAnchor']['x']),this[_0x29a487(0x889)]['y']=this[_0x29a487(0x685)](this['_anchor']['y'],this[_0x29a487(0x66a)]['y']);else{if(_0x4e9425[_0x29a487(0x420)](/backspace/i))return this[_0x29a487(0x7d9)]===0x8;if(_0x181cd7[_0x29a487(0x420)](/enter/i))return this[_0x29a487(0x7d9)]===0xd;if(_0x4f3ad9[_0x29a487(0x420)](/escape/i))return this[_0x29a487(0x7d9)]===0x1b;}}},Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x73d)]=function(_0x585e29){const _0x2b8fa9=_0x41f3d3;this['_anchor']=_0x585e29,this[_0x2b8fa9(0x66a)]=JsonEx['makeDeepCopy'](this[_0x2b8fa9(0x889)]);},Game_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x23f)]=function(_0x46888e){const _0x586133=_0x41f3d3;this[_0x586133(0x66a)]=_0x46888e;},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x43f)]=Sprite_Picture[_0x41f3d3(0x1fd)][_0x41f3d3(0x488)],Sprite_Picture[_0x41f3d3(0x1fd)]['updateOrigin']=function(){const _0x3e9d81=_0x41f3d3,_0x43c056=this['picture']();if(!_0x43c056[_0x3e9d81(0x27b)]())VisuMZ[_0x3e9d81(0x5aa)][_0x3e9d81(0x43f)][_0x3e9d81(0x809)](this);else{if('FELQo'!==_0x3e9d81(0x894))this[_0x3e9d81(0x27b)]['x']=_0x43c056[_0x3e9d81(0x27b)]()['x'],this[_0x3e9d81(0x27b)]['y']=_0x43c056[_0x3e9d81(0x27b)]()['y'];else{var _0x7f844=_0x3ba1a1(_0x4c96e9['$1'])/0x64;_0x3e27a6*=_0x7f844;}}},Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x1d0)]=function(_0x2cea9e){const _0x5660d7=_0x41f3d3;if(_0x2cea9e){if(_0x5660d7(0x6dd)===_0x5660d7(0x586))_0x15a2b4[_0x5660d7(0x5aa)][_0x5660d7(0x867)][_0x5660d7(0x809)](this),this['setCoreEngineUpdateWindowBg']();else{const _0x1e9527=_0x2cea9e[_0x5660d7(0x3f2)];if(_0x1e9527===0x1&&this[_0x5660d7(0x3e6)]()[_0x5660d7(0x4be)]()!==0x1)this[_0x5660d7(0x279)]();else _0x1e9527===0x2&&this[_0x5660d7(0x3e6)]()['guardSkillId']()!==0x2?this[_0x5660d7(0x628)]():this[_0x5660d7(0x975)](_0x1e9527);}}else this[_0x5660d7(0x3b1)]();},Game_Actor[_0x41f3d3(0x1fd)]['usableSkills']=function(){const _0x28b3fa=_0x41f3d3;return this[_0x28b3fa(0x2a4)]()['filter'](_0x298cdd=>this[_0x28b3fa(0x930)](_0x298cdd)&&this[_0x28b3fa(0x1ba)]()['includes'](_0x298cdd[_0x28b3fa(0x662)]));},Window_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x5cc)]=function(){const _0x5a641d=_0x41f3d3;this[_0x5a641d(0xa0d)]=new Sprite(),this[_0x5a641d(0xa0d)][_0x5a641d(0x5b0)]=new Bitmap(0x0,0x0),this[_0x5a641d(0xa0d)]['x']=0x0,this[_0x5a641d(0x223)](this[_0x5a641d(0xa0d)]);},Window_Base['prototype']['refreshDimmerBitmap']=function(){const _0x2cad27=_0x41f3d3;if(this['_dimmerSprite']){if(_0x2cad27(0x422)!==_0x2cad27(0x422))this[_0x2cad27(0xa0d)]=new _0x3834b3(),this['_dimmerSprite'][_0x2cad27(0x5b0)]=new _0x2021ab(0x0,0x0),this[_0x2cad27(0xa0d)]['x']=0x0,this['addChildToBack'](this[_0x2cad27(0xa0d)]);else{const _0x30b3b0=this[_0x2cad27(0xa0d)][_0x2cad27(0x5b0)],_0x473a07=this[_0x2cad27(0x665)],_0x1fcfe6=this[_0x2cad27(0x4f1)],_0x55033b=this[_0x2cad27(0x790)],_0x42f16e=ColorManager[_0x2cad27(0x527)](),_0x4f3414=ColorManager[_0x2cad27(0x8bc)]();_0x30b3b0[_0x2cad27(0x241)](_0x473a07,_0x1fcfe6),_0x30b3b0[_0x2cad27(0xa18)](0x0,0x0,_0x473a07,_0x55033b,_0x4f3414,_0x42f16e,!![]),_0x30b3b0[_0x2cad27(0x51a)](0x0,_0x55033b,_0x473a07,_0x1fcfe6-_0x55033b*0x2,_0x42f16e),_0x30b3b0['gradientFillRect'](0x0,_0x1fcfe6-_0x55033b,_0x473a07,_0x55033b,_0x42f16e,_0x4f3414,!![]),this[_0x2cad27(0xa0d)][_0x2cad27(0x27e)](0x0,0x0,_0x473a07,_0x1fcfe6);}}},Game_Actor[_0x41f3d3(0x1fd)]['makeAutoBattleActions']=function(){const _0x4be4a4=_0x41f3d3;for(let _0x3e42b4=0x0;_0x3e42b4<this[_0x4be4a4(0x1a6)]();_0x3e42b4++){if(_0x4be4a4(0x6ff)!=='dvUNy'){const _0x123ce2=this[_0x4be4a4(0x6e1)];this[_0x4be4a4(0x47b)](0x0,0x0,_0x123ce2,this['lineHeight']());const _0x5473b9=this[_0x4be4a4(0x426)](_0x6622bf[_0x4be4a4(0x6cd)]())[_0x4be4a4(0x665)];this[_0x4be4a4(0x48a)](_0x2f5f9d['displayName'](),_0x3f4c46[_0x4be4a4(0x6ae)]((_0x123ce2-_0x5473b9)/0x2),0x0);}else{const _0x281ef5=this[_0x4be4a4(0x28a)]();let _0x508a96=Number['MIN_SAFE_INTEGER'];this[_0x4be4a4(0x19d)](_0x3e42b4,_0x281ef5[0x0]);for(const _0x3bcfed of _0x281ef5){const _0x2d8742=_0x3bcfed['evaluate']();if(_0x2d8742>_0x508a96){if(_0x4be4a4(0x198)===_0x4be4a4(0x5bf)){if(_0x5aebd3&&_0x38cae0['bitmap'])_0x4c21d5[_0x4be4a4(0x5b0)]['destroy']();}else _0x508a96=_0x2d8742,this[_0x4be4a4(0x19d)](_0x3e42b4,_0x3bcfed);}}}}this[_0x4be4a4(0x860)](_0x4be4a4(0x799));},Window_BattleItem[_0x41f3d3(0x1fd)]['isEnabled']=function(_0x3173a0){const _0x47baba=_0x41f3d3;if(BattleManager['actor']()){if(_0x47baba(0x3b7)!==_0x47baba(0x49d))return BattleManager[_0x47baba(0x6a8)]()[_0x47baba(0x930)](_0x3173a0);else{if(_0x40304d['isPlaytest']())_0x258eb5[_0x47baba(0x5e6)](_0x21ae3b);}}else return Window_ItemList[_0x47baba(0x1fd)]['isEnabled'][_0x47baba(0x809)](this,_0x3173a0);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0xa3b)]=Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)],Scene_Map[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)]=function(){const _0x58e4c5=_0x41f3d3;VisuMZ[_0x58e4c5(0x5aa)][_0x58e4c5(0xa3b)][_0x58e4c5(0x809)](this);const _0x27f074=this[_0x58e4c5(0x5ab)]['_timerSprite'];if(_0x27f074)this[_0x58e4c5(0x65e)](_0x27f074);},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x484)]=Scene_Battle[_0x41f3d3(0x1fd)][_0x41f3d3(0x9d2)],Scene_Battle['prototype'][_0x41f3d3(0x9d2)]=function(){const _0x1ff0a1=_0x41f3d3;VisuMZ[_0x1ff0a1(0x5aa)][_0x1ff0a1(0x484)][_0x1ff0a1(0x809)](this);const _0x20ae6b=this[_0x1ff0a1(0x5ab)][_0x1ff0a1(0x891)];if(_0x20ae6b)this[_0x1ff0a1(0x65e)](_0x20ae6b);},Sprite_Actor['prototype'][_0x41f3d3(0x314)]=function(){const _0x565f25=_0x41f3d3;Sprite_Battler['prototype'][_0x565f25(0x314)][_0x565f25(0x809)](this),this[_0x565f25(0x19a)]();if(this[_0x565f25(0x63e)])this['updateMotion']();else this[_0x565f25(0x793)]!==''&&(this['_battlerName']='');},Window[_0x41f3d3(0x1fd)][_0x41f3d3(0x3a1)]=function(){const _0x33cac7=_0x41f3d3,_0x19bc15=this['_width'],_0x5eeefc=this[_0x33cac7(0x651)],_0x5fbbcf=0x18,_0x3e74e8=_0x5fbbcf/0x2,_0x32807d=0x60+_0x5fbbcf,_0x513301=0x0+_0x5fbbcf;this[_0x33cac7(0x44f)][_0x33cac7(0x5b0)]=this['_windowskin'],this['_downArrowSprite']['anchor']['x']=0.5,this[_0x33cac7(0x44f)][_0x33cac7(0x27b)]['y']=0.5,this[_0x33cac7(0x44f)][_0x33cac7(0x27e)](_0x32807d+_0x3e74e8,_0x513301+_0x3e74e8+_0x5fbbcf,_0x5fbbcf,_0x3e74e8),this[_0x33cac7(0x44f)][_0x33cac7(0x608)](Math[_0x33cac7(0x92b)](_0x19bc15/0x2),Math[_0x33cac7(0x92b)](_0x5eeefc-_0x3e74e8)),this[_0x33cac7(0xa5a)][_0x33cac7(0x5b0)]=this[_0x33cac7(0x594)],this['_upArrowSprite'][_0x33cac7(0x27b)]['x']=0.5,this[_0x33cac7(0xa5a)][_0x33cac7(0x27b)]['y']=0.5,this[_0x33cac7(0xa5a)][_0x33cac7(0x27e)](_0x32807d+_0x3e74e8,_0x513301,_0x5fbbcf,_0x3e74e8),this[_0x33cac7(0xa5a)]['move'](Math[_0x33cac7(0x92b)](_0x19bc15/0x2),Math[_0x33cac7(0x92b)](_0x3e74e8));},Window['prototype']['_refreshPauseSign']=function(){const _0x2d2e2b=_0x41f3d3,_0x2652ea=0x90,_0x3dc878=0x60,_0x5697b7=0x18;this[_0x2d2e2b(0x444)]['bitmap']=this[_0x2d2e2b(0x594)],this[_0x2d2e2b(0x444)][_0x2d2e2b(0x27b)]['x']=0.5,this[_0x2d2e2b(0x444)]['anchor']['y']=0x1,this[_0x2d2e2b(0x444)]['move'](Math['round'](this['_width']/0x2),this['_height']),this['_pauseSignSprite'][_0x2d2e2b(0x27e)](_0x2652ea,_0x3dc878,_0x5697b7,_0x5697b7),this[_0x2d2e2b(0x444)][_0x2d2e2b(0x3f4)]=0xff;},Window[_0x41f3d3(0x1fd)][_0x41f3d3(0x3c9)]=function(){const _0x38b5d2=_0x41f3d3,_0x411902=this[_0x38b5d2(0x514)][_0x38b5d2(0x3e0)][_0x38b5d2(0x851)](new Point(0x0,0x0)),_0x2cf24d=this[_0x38b5d2(0x514)][_0x38b5d2(0x2c9)];_0x2cf24d['x']=_0x411902['x']+this[_0x38b5d2(0x5d0)]['x'],_0x2cf24d['y']=_0x411902['y']+this[_0x38b5d2(0x5d0)]['y'],_0x2cf24d[_0x38b5d2(0x665)]=Math['ceil'](this[_0x38b5d2(0x6e1)]*this[_0x38b5d2(0x950)]['x']),_0x2cf24d[_0x38b5d2(0x4f1)]=Math[_0x38b5d2(0xa57)](this['innerHeight']*this[_0x38b5d2(0x950)]['y']);},Window['prototype'][_0x41f3d3(0x339)]=function(){const _0xcfce75=_0x41f3d3,_0x304ab6=this[_0xcfce75(0x293)],_0x5ebd3=Math['max'](0x0,this[_0xcfce75(0x81f)]-_0x304ab6*0x2),_0x2489ce=Math['max'](0x0,this[_0xcfce75(0x651)]-_0x304ab6*0x2),_0x51f8fc=this[_0xcfce75(0x42c)],_0xd634cd=_0x51f8fc[_0xcfce75(0x54a)][0x0];_0x51f8fc['bitmap']=this['_windowskin'],_0x51f8fc[_0xcfce75(0x27e)](0x0,0x0,0x60,0x60),_0x51f8fc[_0xcfce75(0x608)](_0x304ab6,_0x304ab6),_0x51f8fc[_0xcfce75(0x950)]['x']=_0x5ebd3/0x60,_0x51f8fc[_0xcfce75(0x950)]['y']=_0x2489ce/0x60,_0xd634cd[_0xcfce75(0x5b0)]=this['_windowskin'],_0xd634cd['setFrame'](0x0,0x60,0x60,0x60),_0xd634cd[_0xcfce75(0x608)](0x0,0x0,_0x5ebd3,_0x2489ce),_0xd634cd[_0xcfce75(0x950)]['x']=0x1/_0x51f8fc['scale']['x'],_0xd634cd[_0xcfce75(0x950)]['y']=0x1/_0x51f8fc[_0xcfce75(0x950)]['y'],_0x51f8fc[_0xcfce75(0x575)](this['_colorTone']);},Game_Temp[_0x41f3d3(0x1fd)][_0x41f3d3(0x973)]=function(){const _0x463470=_0x41f3d3;this[_0x463470(0x50f)]=[],this[_0x463470(0x8b7)]=[],this[_0x463470(0x263)]=[],this[_0x463470(0x99d)]=[];},VisuMZ[_0x41f3d3(0x5aa)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x41f3d3(0x1fd)]['terminate'],Scene_Base[_0x41f3d3(0x1fd)][_0x41f3d3(0x682)]=function(){const _0x181299=_0x41f3d3;if($gameTemp)$gameTemp[_0x181299(0x973)]();VisuMZ[_0x181299(0x5aa)][_0x181299(0x66b)][_0x181299(0x809)](this);},Bitmap[_0x41f3d3(0x1fd)]['measureTextWidthNoRounding']=function(_0x483621){const _0x354126=_0x41f3d3,_0x4e5a26=this[_0x354126(0x414)];_0x4e5a26[_0x354126(0x436)](),_0x4e5a26[_0x354126(0x5af)]=this[_0x354126(0x41d)]();const _0x184ec7=_0x4e5a26[_0x354126(0x473)](_0x483621)[_0x354126(0x665)];return _0x4e5a26[_0x354126(0x94b)](),_0x184ec7;},Window_Message['prototype']['textWidth']=function(_0x3c8f59){const _0x4bb2fe=_0x41f3d3;if(this[_0x4bb2fe(0x863)]())return this['contents']['measureTextWidthNoRounding'](_0x3c8f59);else{if(_0x4bb2fe(0x224)==='CQHZZ')_0x108140[_0x4bb2fe(0x1fd)][_0x4bb2fe(0x533)][_0x4bb2fe(0x809)](this),this[_0x4bb2fe(0x7da)](),this['_itemWindow']['deactivate'](),this['_itemWindow'][_0x4bb2fe(0x6a4)](),this['_skillTypeWindow'][_0x4bb2fe(0x297)]();else return Window_Base[_0x4bb2fe(0x1fd)][_0x4bb2fe(0x351)][_0x4bb2fe(0x809)](this,_0x3c8f59);}},Window_Message[_0x41f3d3(0x1fd)][_0x41f3d3(0x863)]=function(){const _0x3f3e80=_0x41f3d3;return VisuMZ[_0x3f3e80(0x5aa)][_0x3f3e80(0x5b1)][_0x3f3e80(0x2d1)][_0x3f3e80(0x4b2)]??!![];},VisuMZ[_0x41f3d3(0x5aa)][_0x41f3d3(0x5e8)]=Game_Action[_0x41f3d3(0x1fd)]['numRepeats'],Game_Action['prototype'][_0x41f3d3(0x3d4)]=function(){const _0x6fbdef=_0x41f3d3;return this[_0x6fbdef(0x985)]()?VisuMZ[_0x6fbdef(0x5aa)][_0x6fbdef(0x5e8)][_0x6fbdef(0x809)](this):0x0;},VisuMZ['CoreEngine'][_0x41f3d3(0x749)]=Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x279)],Game_Action[_0x41f3d3(0x1fd)][_0x41f3d3(0x279)]=function(){const _0x1cc40c=_0x41f3d3;this[_0x1cc40c(0x3e6)]()&&this[_0x1cc40c(0x3e6)]()[_0x1cc40c(0x7fe)]()?VisuMZ['CoreEngine'][_0x1cc40c(0x749)]['call'](this):'aYCvu'==='sVBDU'?_0x111cd7+=_0x876ac9(_0x55aa30):this[_0x1cc40c(0x3b1)]();},Sprite_Name['prototype'][_0x41f3d3(0xa2c)]=function(){return 0x24;},Sprite_Name[_0x41f3d3(0x1fd)][_0x41f3d3(0x80a)]=function(){const _0x2c8da5=_0x41f3d3,_0x52d91f=this['name'](),_0x17b805=this[_0x2c8da5(0x899)](),_0x4ccee4=this[_0x2c8da5(0xa2c)]();this[_0x2c8da5(0x5d5)](),this['bitmap'][_0x2c8da5(0x3b1)](),this['bitmap'][_0x2c8da5(0x8f6)](_0x52d91f,0x4,0x0,_0x17b805-0xa,_0x4ccee4,_0x2c8da5(0x7d5));},Bitmap[_0x41f3d3(0x1fd)][_0x41f3d3(0x8f6)]=function(_0x4b682c,_0x1e6e09,_0x3d323f,_0x6eb03d,_0x10da9a,_0x3bede5){const _0x2efb37=_0x41f3d3,_0x2d6280=this[_0x2efb37(0x414)],_0x5c25eb=_0x2d6280[_0x2efb37(0x86c)];_0x6eb03d=_0x6eb03d||0xffffffff;let _0x43ba03=_0x1e6e09,_0x4a2f5b=Math['round'](_0x3d323f+0x18/0x2+this[_0x2efb37(0x5d8)]*0.35);if(_0x3bede5==='center'){if('GPjNb'!==_0x2efb37(0x547))_0x43ba03+=_0x6eb03d/0x2;else{if(_0x111f63[_0x2efb37(0x998)]())return;_0x205134[_0x2efb37(0x5eb)](_0x3d948d,_0x129823);const _0x202613=_0x4acc1a[_0x2efb37(0x568)](_0x45a30f[_0x2efb37(0x91e)],_0x36b4fb['EndingID']),_0x17dddc=_0x26cda0[_0x2efb37(0x4a5)](_0x26c4b6['StartID'],_0x972d03['EndingID']),_0x5a60cb=(_0x469c96[_0x2efb37(0x432)]||0x0)/0x64;for(let _0xf76cf6=_0x202613;_0xf76cf6<=_0x17dddc;_0xf76cf6++){const _0x5c44bd=_0x1815b5['random']()<=_0x5a60cb;_0x41d049[_0x2efb37(0x48d)](_0xf76cf6,_0x5c44bd);}}}_0x3bede5==='right'&&(_0x2efb37(0x588)!=='ANdDF'?(_0x384d9c[_0x2efb37(0x5aa)][_0x2efb37(0x3e9)]['call'](this,_0x5a1bda,_0x447114,_0x59a732,_0xfcb97c,_0xa126e),this[_0x2efb37(0x7bb)]()):_0x43ba03+=_0x6eb03d),_0x2d6280[_0x2efb37(0x436)](),_0x2d6280['font']=this[_0x2efb37(0x41d)](),_0x2d6280[_0x2efb37(0x24f)]=_0x3bede5,_0x2d6280[_0x2efb37(0x89b)]=_0x2efb37(0x9dd),_0x2d6280[_0x2efb37(0x86c)]=0x1,this['_drawTextOutline'](_0x4b682c,_0x43ba03,_0x4a2f5b,_0x6eb03d),_0x2d6280[_0x2efb37(0x86c)]=_0x5c25eb,this[_0x2efb37(0x20f)](_0x4b682c,_0x43ba03,_0x4a2f5b,_0x6eb03d),_0x2d6280[_0x2efb37(0x94b)](),this[_0x2efb37(0x1e5)][_0x2efb37(0x314)]();},VisuMZ['CoreEngine']['BattleManager_checkSubstitute']=BattleManager[_0x41f3d3(0xa50)],BattleManager[_0x41f3d3(0xa50)]=function(_0x1671a1){const _0x2182db=_0x41f3d3;if(this['_action']['isForFriend']())return![];return VisuMZ[_0x2182db(0x5aa)][_0x2182db(0x6f6)][_0x2182db(0x809)](this,_0x1671a1);},BattleManager[_0x41f3d3(0x489)]=function(){const _0x176480=_0x41f3d3;if(this[_0x176480(0x689)])this[_0x176480(0x56f)]['endAction'](this[_0x176480(0x689)]);this[_0x176480(0x57e)]=_0x176480(0x287),this['_subject']&&this[_0x176480(0x689)][_0x176480(0x1a6)]()===0x0&&('kVNPj'!==_0x176480(0xa4c)?(this[_0x176480(0x72b)](this['_subject']),this[_0x176480(0x689)]=null):(_0x1f1277[_0x176480(0x5aa)]['Bitmap_gradientFillRect'][_0x176480(0x809)](this,_0x16e6b9,_0x3ba181,_0x4da919,_0x2d846,_0x714864,_0x10f9e6,_0x18fdae),this[_0x176480(0x7bb)]()));},Bitmap['prototype'][_0x41f3d3(0x256)]=function(){const _0x31c779=_0x41f3d3;this[_0x31c779(0x729)]=new Image(),this[_0x31c779(0x729)][_0x31c779(0x676)]=this[_0x31c779(0x669)]['bind'](this),this[_0x31c779(0x729)]['onerror']=this['_onError'][_0x31c779(0x508)](this),this[_0x31c779(0x945)](),this['_loadingState']=_0x31c779(0x8d4),Utils['hasEncryptedImages']()?this[_0x31c779(0x9d7)]():(this[_0x31c779(0x729)][_0x31c779(0x394)]=this['_url'],![]&&this['_image']['width']>0x0&&(this[_0x31c779(0x729)][_0x31c779(0x676)]=null,this[_0x31c779(0x669)]()));},Scene_Skill[_0x41f3d3(0x1fd)][_0x41f3d3(0x533)]=function(){const _0x364df2=_0x41f3d3;Scene_MenuBase[_0x364df2(0x1fd)][_0x364df2(0x533)][_0x364df2(0x809)](this),this[_0x364df2(0x7da)](),this[_0x364df2(0x5ee)][_0x364df2(0x8b8)](),this[_0x364df2(0x5ee)][_0x364df2(0x6a4)](),this['_skillTypeWindow'][_0x364df2(0x297)]();},Scene_Skill[_0x41f3d3(0x1fd)]['arePageButtonsEnabled']=function(){const _0x107619=_0x41f3d3;return this[_0x107619(0x3ab)]&&this[_0x107619(0x3ab)][_0x107619(0x646)];},Game_Map[_0x41f3d3(0x1fd)]['checkPassage']=function(_0x5e33b8,_0x1f1a60,_0x37dc47){const _0x3b44ca=_0x41f3d3,_0x131b5a=this[_0x3b44ca(0x9c7)](),_0x5d66cc=this[_0x3b44ca(0xa3c)](_0x5e33b8,_0x1f1a60);for(const _0x4db708 of _0x5d66cc){if(_0x3b44ca(0x7a4)!==_0x3b44ca(0x7a4))this[_0x3b44ca(0x3a6)]();else{const _0x5aa157=_0x131b5a[_0x4db708];if(_0x5aa157===undefined||_0x5aa157===null){if($gameTemp[_0x3b44ca(0x67d)]()&&!DataManager[_0x3b44ca(0x3ec)]()){if(_0x3b44ca(0x751)!==_0x3b44ca(0x751)){if(!this['showPointAnimations']())return;_0x2a3fb8=_0x11fcca||![],_0x364e6b=_0x2f2287||![];if(_0x3b2bc0[_0xd9e0e0]){const _0x23f9d4={'x':_0x3dfc66,'y':_0x454740,'animationId':_0x5cd7da,'mirror':_0x35b60a,'mute':_0x65494f};this[_0x3b44ca(0x263)]['push'](_0x23f9d4);}}else{let _0x5af4c1=_0x3b44ca(0x823)+'\x0a';_0x5af4c1+=_0x3b44ca(0x4ef)+'\x0a',_0x5af4c1+=_0x3b44ca(0x75b),Imported['VisuMZ_3_EventChainReact']||Imported[_0x3b44ca(0x882)]?(alert(_0x5af4c1),SceneManager['exit']()):(console[_0x3b44ca(0x5e6)](_0x5af4c1),!$gameTemp['_showDevTools']&&($gameTemp['_showDevTools']=!![],SceneManager[_0x3b44ca(0x3d6)]()));}}}if((_0x5aa157&0x10)!==0x0)continue;if((_0x5aa157&_0x37dc47)===0x0){if(_0x3b44ca(0x8a4)===_0x3b44ca(0xa4d)){const _0x433924=this[_0x3b44ca(0x414)];_0x433924[_0x3b44ca(0x436)](),_0x433924['font']=this[_0x3b44ca(0x41d)]();const _0x9923f9=_0x433924['measureText'](_0x39410e)[_0x3b44ca(0x665)];return _0x433924[_0x3b44ca(0x94b)](),_0x9923f9;}else return!![];}if((_0x5aa157&_0x37dc47)===_0x37dc47){if(_0x3b44ca(0x403)!==_0x3b44ca(0x9a0))return![];else _0x5bf5cf[_0x3b44ca(0x76a)](_0x4f0124);}}}return![];},Sprite_Animation[_0x41f3d3(0x1fd)][_0x41f3d3(0x3fd)]=function(_0x5bc472){const _0x54196e=_0x41f3d3;!this['_originalViewport']&&(this['_originalViewport']=_0x5bc472['gl']['getParameter'](_0x5bc472['gl'][_0x54196e(0x8e9)]));};