//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.25] [CoreEngine]
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
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
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
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
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
 * === Classes ===
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
 * === Enemies ===
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
 * === Animations ===
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
 * === Quality of Life ===
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
 * === Basic, X, and S Parameters ===
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
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
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
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
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
 * === Picture Plugin Commands ===
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
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
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
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
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
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
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
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
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
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
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
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
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
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
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
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
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
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
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
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
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
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
 * @max 1
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
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
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
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
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
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
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
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
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
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * @min 0
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
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
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
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
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
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
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
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
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
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
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
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
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
//=============================================================================

const _0x59f4=['itypeId','buttonAssistOffset4','currencyUnit','xparamRate2','useDigitGroupingEx','updatePlayTestF7','3614204iUXGAJ','_fauxAnimationQueue','VisuMZ_2_BattleSystemFTB','_helpWindow','Window_NameInput_cursorPageup','HOME','131800tnqLbG','XParamVocab0','tpCostColor','createJsQuickFunction','drawAllParams','CEV','PGUP','ActorBgType','createEnemies','destroy','onMoveEnd','targetX','%2%1%3','process_VisuMZ_CoreEngine_Notetags','xparamFlat2','_cacheScaleX','_movementDuration','command111','createBuffer','WIN_OEM_FJ_TOUROKU','ctrl','getColor','targetContentsOpacity','EXSEL','ColorMaxLvGauge2','loadBitmap','Game_Troop_setup','BattleSystem','tpGaugeColor2','drawGameSubtitle','sparamFlat2','innerHeight','337mEplGb','button','outbounce','WIN_OEM_JUMP','paramRate2','_cacheScaleY','Spriteset_Base_destroy','SystemSetSideView','fillStyle','Scene_Unlisted','IconSParam9','isItemStyle','Scene_Menu_create','PHA','Window_NameInput_processTouch','IconParam7','moveCancelButtonSideButtonLayout','_backSprite1','listWindowRect','WIN_OEM_WSCTRL','INOUTBACK','DashToggleR','eventsXyNt','retrieveFauxAnimation','CANCEL','animationBaseDelay','expGaugeColor2','EnableNameInput','paramFlatJS','string','ItemHeight','key%1','Scene_Status_create','battlebacks2','ScreenShake','maxBattleMembers','lineHeight','drawParamName','processCursorMoveModernControls','ATTN','clear','isOpen','sparam','ColorHPGauge1','_targetOffsetX','Window_ShopSell_isEnabled','_paramPlus','PA1','Settings','subtitle','background','mhp','_buyWindow','areButtonsOutsideMainUI','keyboard','textWidth','513312lueRlq','_CoreEngineSettings','EditBgType','_cancelButton','IconXParam6','Symbol','RowSpacing','isMenuButtonAssistEnabled','sparamPlus1','gaugeLineHeight','DummyBgType','maxLvGaugeColor1','_stored_ctGaugeColor2','OPEN_BRACKET','drawBackgroundRect','battlebacks1','KeyboardInput','LoadMenu','log','padding','IconXParam9','pictureButtons','ParamChange','xparamRateJS','helpAreaTopSideButtonLayout','Game_Picture_updateMove','IconParam5','isActiveTpb','SellBgType','Key%1','remove','_cache','isAnimationForEach','Flat1','image-rendering','NONCONVERT','height','isBottomHelpMode','CRI','contentsOpacity','active','KEEP','ListRect','makeDocumentTitle','IconXParam0','Scene_Boot_startNormalGame','OpenURL','buttonAssistText2','buttonAssistKey4','mmp','xparamPlusJS','F13','isUseModernControls','_pictureContainer','command122','currentLevelExp','measureTextWidth','TextCodeNicknames','buttonAssistOffset1','WIN_OEM_PA1','xparamRate','drawActorExpGauge','context','printError','Input_setupEventHandlers','addChild','Bitmap_gradientFillRect','CustomParamNames','stretch','NUMPAD4','initDigitGrouping','valueOutlineColor','_targetAnchor','processKeyboardHome','Game_Map_setup','ParseStateNotetags','stencilOp','isCursorMovable','GoldFontSize','down','_playTestFastMode','setActionState','_hideTileShadows','deselect','Title','ValueJS','push','applyForcedGameTroopSettingsCoreEngine','WIN_OEM_FJ_JISHO','IconSParam4','_screenX','updatePosition','colSpacing','isInputting','subject','ARRAYNUM','DEF','applyEasing','name','buttonAssistOk','hide','#%1','SParamVocab0','contentsBack','createCommandWindow','FUNC','nextLevelExp','createTitleButtons','INOUTQUART','_statusEquipWindow','default','F24','advanced','markCoreEngineModified','seVolume','xparamPlus1','mainFontSize','nickname','IconParam0','_backSprite2','CoreEngine','ONE','MDF','_pagedownButton','runCombinedScrollingTextAsCode','Script\x20Call\x20Error','2903bgDWHt','INOUTCIRC','_pollGamepads','TimeProgress','ActorRect','tpColor','smoothSelect','ATK','helpAreaTop','PictureFilename','Game_Event_isCollidedWithEvents','IconSParam6','_commandWindow','SellRect','NUMPAD8','removeAllFauxAnimations','_pageupButton','translucentOpacity','cancel','isTouchedInsideFrame','setSideButtonLayout','VisuMZ_2_BattleSystemBTB','updateFauxAnimations','processFauxAnimationRequests','reservePlayTestNewGameCommonEvent','canUse','ItemRect','ColorMPCost','Scene_Map_updateMainMultiply','Type','XParamVocab2','outlineColorGauge','WIN_OEM_RESET','DimColor1','Input_update','itemRect','center','EQUALS','setHandler','helpWindowRect','HelpBgType','resetTextColor','windowPadding','drawCurrentParam','DigitGroupingStandardText','_mp','OUTCUBIC','down2','Spriteset_Base_update','StatusBgType','toLocaleString','isRightInputMode','_hideButtons','duration','ParamArrow','toString','bgm','DIVIDE','toUpperCase','CLOSE_PAREN','actor','F11','endAnimation','ColorMPGauge2','BaseTexture','0.00','setBattleSystem','updateKeyText','levelUpRecovery','STENCIL_BUFFER_BIT','EnableJS','CIRCUMFLEX','maxItems','QoL','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','TPB\x20ACTIVE','dashToggle','Game_Interpreter_command111','itemBackColor1','missed','_coreEasing','QUOTE','min','LevelUpFullMp','ModernControls','_effectsContainer','getColorDataFromPluginParameters','Window_Base_drawFace','drawGameVersion','bgsVolume','consumeItem','ProfileBgType','sparamRate1','_storedStack','cursorPagedown','GameEnd','ColorExpGauge2','WIN_OEM_FJ_LOYA','DigitGroupingLocale','xparamPlus2','processKeyboardHandling','gaugeBackColor','isMaxLevel','XParamVocab5','MEV','GRD','SceneManager_onKeyDown','INELASTIC','WindowLayer_render','terms','contents','Plus1','ColorMPGauge1','xdg-open','INQUAD','ImgLoad','hpGaugeColor1','setSize','WIN_OEM_PA2','textSizeEx','FTB','DOUBLE_QUOTE','isBusy','INSERT','keyMapper','_scene','parameters','sv_enemies','Window_Base_drawIcon','editWindowRect','Window_Base_drawCharacter','processAlwaysEscape','LevelUpFullHp','_stored_gaugeBackColor','rgba(0,\x200,\x200,\x201.0)','CLEAR','commandWindowRect','_list','makeCoreEngineCommandList','_stored_maxLvGaugeColor2','cursorDown','OutlineColorGauge','buttonAssistKey1','altKey','WIN_OEM_BACKTAB','ApplyEasing','TRAIT_PARAM','AntiZoomPictures','_stored_hpGaugeColor1','Game_Picture_y','ShopMenu','ItemBackColor2','INBOUNCE','Window_StatusBase_drawActorSimpleStatus','_mainSprite','1185912SFaFYs','statusWindowRect','WIN_OEM_PA3','_centerElement','focus','EXR','_anchor','updatePositionCoreEngineShakeRand','imageSmoothingEnabled','SkillTypeRect','evaded','Window_NameInput_cursorRight','shake','processCursorHomeEndTrigger','Rate2','Game_Picture_x','Bitmap_drawCircle','Sprite_Button_initialize','TextCodeClassNames','Scene_Boot_updateDocumentTitle','encounterStep','([\x5c+\x5c-]\x5cd+)>','TextFmt','ConvertParams','Window_EquipItem_isEnabled','params','skillId','type','mpGaugeColor1','version','defineProperty','getCustomBackgroundSettings','ARRAYJSON','OutlineColorDmg','win32','buttonAssistText%1','SnapshotOpacity','ctGaugeColor2','EQUAL','filters','Scene_Base_createWindowLayer','BottomButtons','loadTitle1','clearStencil','isMapScrollLinked','drawTextEx','uiAreaHeight','SceneManager_isGameActive','PLUS','ColorTPGauge1','GoldMax','_forcedTroopView','_listWindow','defaultInputMode','onNameOk','_stored_powerDownColor','CustomParamIcons','easingType','playOk','Sprite_AnimationMV_processTimingData','meVolume','createPageButtons','levelUp','Sprite_Button_updateOpacity','_shakeSpeed','buttonAssistOffset%1','itemBackColor2','SELECT','MAT','style','itemHeight','isFullDocumentTitle','xScrollLinkedOffset','NUMPAD5','members','isSmartEventCollisionOn','mainAreaBottom','WIN_OEM_CUSEL','OUTELASTIC','skipBranch','updatePositionCoreEngineShakeVert','PRINTSCREEN','ASTERISK','createDigits','PixelateImageRendering','EndingID','isWindowMaskingEnabled','OPEN_CURLY_BRACKET','mainCommandWidth','tilesets','IconXParam8','updateOpen','initialLevel','Scene_Equip_create','xparamFlatJS','command105','faceHeight','titleCommandWindow','show','menuShowButton','Bitmap_strokeRect','onButtonImageLoad','MCR','MAXHP','trim','DataManager_setupNewGame','JSON','StatusEquipRect','HIT','ColorSystem','profileWindowRect','CustomParamType','MDR','textColor','createSpriteset','clearCachedKeys','buttonAssistSwitch','cursorLeft','_statusWindow','setBackgroundType','playBuzzer','INOUTEXPO','Page','BgType','checkCacheKey','targetSpritePosition','LINEAR','MRG','blt','pendingColor','_sellWindow','Renderer','optionsWindowRect','ColorNormal','ParamMax','ColorTPGauge2','addChildToBack','CommandRect','statusEquipWindowRect','dimColor1','BottomHelp','createCustomBackgroundImages','SEMICOLON','ForceNoPlayTest','_gamepadWait','Scene_MenuBase_createCancelButton','IconXParam3','fromCharCode','xparam','paramFlatBonus','Game_Picture_calcEasing','LUK','buttonAssistWindowSideRect','isNumpadPressed','actorWindowRect','mpGaugeColor2','SystemSetFontSize','setMute','blendFunc','centerSprite','targetY','OptionsRect','setupValueFont','_commandList','Enemy','clearZoom','alwaysDash','Scene_Skill_create','ParseAllNotetags','stencilFunc','escape','hpGaugeColor2','_shouldPreventDefault','ColorPowerDown','Plus2','hit','enemies','isOptionValid','_itemWindow','updatePadding','_targetOffsetY','drawGameTitle','Gold','initBasic','Sprite_Gauge_currentValue','PRINT','_index','Window_Selectable_cursorDown','ZOOM','SLASH','ALT','boxHeight','ColorCTGauge2','Scene_Battle_createSpriteset','TitleCommandList','Game_Actor_paramBase','optSideView','map','ExtJS','isPressed','StatusRect','outlineColor','initCoreEngine','Input_shouldPreventDefault','F16','TextManager_param','F10','parse','getButtonAssistLocation','eva','_stored_crisisColor','F17','Color','isGameActive','pagedown','calcEasing','systemColor','XParamVocab9','Game_BattlerBase_initMembers','_backgroundFilter','DisplayedParams','VisuMZ_2_BattleSystemCTB','SystemSetWindowPadding','_muteSound','Window_Selectable_processTouch','match','paramName','isDying','CustomParamAbb','ParseArmorNotetags','DrawIcons','terminate','iconHeight','ColorExpGauge1','AGI','SEPARATOR','processSoundTimings','isBottomButtonMode','openness','displayY','PictureEraseAll','mainAreaHeight','backgroundBitmap','SParamVocab5','areTileShadowsHidden','targets','LineHeight','HRG','onKeyDown','shift','sparamFlat1','result','CONVERT','cancelShowButton','OUTQUAD','mainAreaTopSideButtonLayout','ParseActorNotetags','Input_clear','Actor','INOUTCUBIC','width','end','removeChild','Bitmap_blt','sin','openingSpeed','return\x200','createFauxAnimationQueue','INCIRC','CategoryRect','buttonAssistWindowRect','ParamName','GroupDigits','maxCols','SUBTRACT','isArrowPressed','Scene_MenuBase_helpAreaTop','SParameterFormula','GREATER_THAN','Plus','setup','ShowItemBackground','DocumentTitleFmt','setAction','drawCharacter','abs','Window_Base_drawText','drawCircle','_opening','Bitmap_resize','filter','paramX','MODECHANGE','constructor','vertical','updateScene','buttonAssistKey2','Game_Interpreter_PluginCommand','KANA','IconSet','CLOSE_CURLY_BRACKET','SystemLoadImages','showFauxAnimations','SParamVocab7','_spriteset','sparamFlatBonus','updatePictureAntiZoom','Max','sellWindowRect','updateMove','checkSmartEventCollision','Layer','DamageColor','NewGameCommonEventAll','dummyWindowRect','enter','Bitmap_measureTextWidth','visible','update','Wait','SystemSetBattleSystem','_internalTextures','initCoreEasing','isHandled','Flat2','CreateBattleSystemID','updatePositionCoreEngineShakeHorz','Game_Picture_show','render','initCoreEngineScreenShake','EnableNumberInput','MULTIPLY','_registerKeyInput','updateMainMultiply','forceOutOfPlaytest','buttonAssistWindowButtonRect','stringKeyMap','loadPicture','updateCoreEasing','catchNormalError','LATIN1','touchUI','SystemLoadAudio','StatusMenu','_digitGroupingEx','currentExp','VOLUME_DOWN','_windowLayer','applyCoreEasing','IconXParam2','openURL','XParamVocab4','valueOutlineWidth','layoutSettings','BTB','VOLUME_MUTE','getLastPluginCommandInterpreter','SideView','moveRelativeToResolutionChange','setEasingType','helpAreaBottom','replace','renderNoMask','SideButtons','keypress','_maxDigits','max','ItemBackColor1','createTextState','initVisuMZCoreEngine','GoldRect','picture','rgba(0,\x200,\x200,\x200.7)','WIN_OEM_ATTN','Window_NumberInput_processDigitChange','MenuLayout','characters','ARRAYSTR','_tempActor','original','BuyBgType','updateLastTarget','Scene_GameEnd_createBackground','originalJS','bitmapWidth','processHandling','drawValue','ParseWeaponNotetags','_stored_deathColor','MAX_GL_TEXTURES','INBACK','makeFontBigger','DELETE','XParameterFormula','INSINE','resetBattleSystem','1134267rkgCmx','buttonAssistText1','determineSideButtonLayoutValid','Game_Action_itemEva','_lastPluginCommandInterpreter','menu','slotWindowRect','WIN_ICO_CLEAR','setupButtonImage','getInputButtonString','darwin','text','buyWindowRect','CTB','_stored_mpCostColor','bgmVolume','MINUS','Scene_Boot_onDatabaseLoaded','categoryWindowRect','catchLoadError','Spriteset_Battle_createEnemies','removeFauxAnimation','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','wholeDuration','CodeJS','TPB\x20WAIT','TGR','BgFilename1','OUTSINE','_profileWindow','SParamVocab4','Window_Base_createTextState','gradientFillRect','Linear','resetFontSettings','IconParam3','TextJS','REPLACE','_shakePower','enemy','backOpacity','IconSParam3','note','system','_buttonAssistWindow','Sprite_Animation_processSoundTimings','TranslucentOpacity','EscapeAlways','command355','mute','blockWidth','onDatabaseLoaded','XParamVocab1','_bitmap','BgFilename2','guardSkillId','makeActionList','inputWindowRect','buttonAssistText4','Bitmap_fillRect','Game_Interpreter_command122','setCoreEngineScreenShakeStyle','_encounterCount','expGaugeColor1','_clickHandler','home','drawItem','atbActive','DrawItemBackgroundJS','PositionJS','start','normalColor','targetOpacity','reserveNewGameCommonEvent','anchor','setWindowPadding','updateDocumentTitle','MultiKeyFmt','VOLUME_UP','F23','RepositionActors','_isButtonHidden','buttonAssistOffset2','fadeSpeed','BattleManager_processEscape','randomJS','Game_BattlerBase_refresh','value','STENCIL_TEST','anchorCoreEasing','up2','INQUART','adjustSprite','ButtonFadeSpeed','Scene_Battle_createCancelButton','pow','WASD','strokeRect','mpColor','gaugeHeight','ParseClassNotetags','setupCoreEngine','Speed','_categoryWindow','ARRAYSTRUCT','updateOpacity','IconSParam2','CustomParam','slice','call','Scene_Name_create','clamp','_duration','Keyboard','hideButtonFromView','FontShadows','catchUnknownError','DTB','processEscape','xparamFlat1','ENTER_SPECIAL','_animation','smallParamFontSize','BoxMargin','MRF','apply','_stored_normalColor','ACCEPT','FunctionName','NameMenu','EXECUTE','keyCode','DOWN','FontSize','CallHandlerJS','buttonAssistKey5','dimColor2','numberWindowRect','traitsPi','powerDownColor','MainMenu','paramWidth','EnableMasking','drawFace','isRepeated','horizontal','makeFontSmaller','skills','Window_NameInput_cursorPagedown','Sprite_Battler_startMove','sparamPlus2','_blank','top','_buttonType','Game_Interpreter_command355','IconSParam7','displayX','ALTGR','rowSpacing','batch','Sprite_Gauge_gaugeRate','_centerElementCoreEngine','description','movePageButtonSideButtonLayout','\x5c}❪SHIFT❫\x5c{','Window_Gold_refresh','showDevTools','xparamPlus','VisuMZ_2_BattleSystemSTB','_baseTexture','Param','changeClass','buttonAssistOffset3','_customModified','process_VisuMZ_CoreEngine_Functions','_actorWindow','stop','paramValueByName','asin','_coreEngineShakeStyle','reduce','drawActorNickname','Graphics_defaultStretchMode','targetScaleX','initialize','_repositioned','Spriteset_Base_updatePosition','itemHitImprovedAccuracy','BackOpacity','updatePositionCoreEngine','paramPlus','get','DATABASE','INOUTSINE','DigitGroupingGaugeSprites','isSideButtonLayout','faces','SaveMenu','inBattle','isNwjs','_optionsWindow','_sideButtonLayout','loadWindowskin','itemHit','sv_actors','en-US','LvExpGauge','CategoryBgType','OUTEXPO','Manual','clearForcedGameTroopSettingsCoreEngine','INQUINT','_movementWholeDuration','loadSystemImages','Scene_Map_initialize','F7key','NUMPAD0','drawIconBySize','text%1','Game_Temp_initialize','round','PreserveNumbers','createCancelButton','numberShowButton','_stored_hpGaugeColor2','integer','setMoveEasingType','repositionCancelButtonSideButtonLayout','Sprite_Picture_updateOrigin','_backgroundSprite','backspace','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ItemPadding','title','yScrollLinkedOffset','setMainFontSize','usableSkills','Window','worldTransform','performMiss','playTestF7','switchModes','_stored_maxLvGaugeColor1','OptionsBgType','Padding','_hp','ParseSkillNotetags','Icon','Scene_Boot_loadSystemImages','isPhysical','Window_Selectable_cursorUp','paramMax','children','framebuffer','_stored_mpGaugeColor2','InputRect','Total','ConvertNumberToString','pagedownShowButton','Game_Action_updateLastTarget','random','DECIMAL','powerUpColor','Window_NameInput_cursorLeft','isEnabled','exit','updateEffekseer','exp','MAXMP','resize','NUMPAD9','Window_StatusBase_drawActorLevel','NUM_LOCK','_moveEasingType','isMaskingEnabled','setCoreEngineUpdateWindowBg','_stored_systemColor','boxWidth','Rate','IconXParam5','HYPHEN_MINUS','tab','URL','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_mapNameWindow','makeInputButtonString','itemPadding','setTargetAnchor','_dimmerSprite','createWindowLayer','buttonAssistCancel','_statusParamsWindow','_context','ButtonAssist','command357','numActions','animations','scaleMode','save','Game_Picture_move','ColorMaxLvGauge1','currentValue','Window_NameInput_processHandling','StartID','_editWindow','setupCoreEasing','setClickHandler','flush','DefaultStyle','Subtitle','drawText','paramPlusJS','updateDashToggle','none','Power','_addShadow','horzJS','_offsetY','isActor','getBattleSystem','Window_NameInput_initialize','level','IconXParam1','TAB','NewGameBoot','Game_Character_processMoveCommand','drawIcon','IconSParam8','HASH','RIGHT','makeTargetSprites','Window_NameInput_refresh','waiting','_number','makeEncounterCount','setLastPluginCommandInterpreter','mainAreaTop','Window_NumberInput_start','isItem','statusParamsWindowRect','createFauxAnimationSprite','right','createChildSprite','calcCoreEasing','processKeyboardDigitChange','getLevel','includes','addWindow','isSpecialCode','NUM','ShowDevTools','Scene_MenuBase_mainAreaTop','OUTBACK','targetBackOpacity','attackSkillId','drawActorLevel','REC','process_VisuMZ_CoreEngine_RegExp','IconSParam5','pop','isPlaytest','iconWidth','scale','OpenConsole','open','loadGameImagesCoreEngine','hpColor','ColSpacing','goldWindowRect','pictures','maxGold','RegExp','ProfileRect','toFixed','makeAutoBattleActions','destroyCoreEngineMarkedBitmaps','createCustomParameter','damageColor','crisisColor','length','_stored_tpGaugeColor2','gainGold','Game_Screen_initialize','Window_NameInput_cursorDown','ColorManager_loadWindowskin','cursorPageup','playCursorSound','Flat','test','_inputWindow','buttonAssistOffset5','sparamRateJS','SParamVocab9','IconParam4','Game_Picture_initBasic','titles2','RequireFocus','adjustPictureAntiZoom','initialBattleSystem','vertJS','INOUTBOUNCE','pageup','battleSystem','_realScale','Scene_Map_updateScene','processMoveCommand','select','allowShiftScrolling','Scene_Map_createSpriteset','processDigitChange','Show\x20Scrolling\x20Text\x20Script\x20Error','Scene_Map_createMenuButton','drawParamText','setActorHome','process_VisuMZ_CoreEngine_CustomParameters','Bitmap_drawText','NUMPAD2','isNormalPriority','PAUSE','charCode','PLAY','KeyTAB','faceWidth','nw.gui','playMiss','paramY','_stored_expGaugeColor2','F14','refresh','ActorTPColor','ShowJS','ARRAYEVAL','ListBgType','_offsetX','fillRect','Scene_MenuBase_createPageButtons','_createInternalTextures','EVA','randomInt','reserveCommonEvent','STR','MenuBg','_closing','option','KeyItemProtect','Enable','platform','forceStencil','areButtonsHidden','useDigitGrouping','EditRect','DimColor2','maxLevel','Window_Selectable_drawBackgroundRect','Window_Base_initialize','initMembers','repositionEnemiesByResolution','volume','Game_System_initialize','contains','isTriggered','_inputString','playCursor','KeySHIFT','Scene_Item_create','innerWidth','processCursorMove','_drawTextOutline','OkText','isKeyItem','erasePicture','initMembersCoreEngine','parallaxes','sqrt','Scene_MenuBase_mainAreaHeight','Graphics_printError','GoldBgType','_shakeDuration','cursorRight','refreshDimmerBitmap','ParseEnemyNotetags','fontSize','PDR','714729HXxWDo','XParamVocab7','TRG','IconXParam7','TextStr','animationNextDelay','_isWindow','traitObjects','Version','OnLoadJS','font-smooth','img/%1/','_fauxAnimationSprites','_timerSprite','Game_Actor_changeClass','_mode','ParseItemNotetags','targetObjects','_actor','NumberBgType','Scene_Battle_update','HANJA','_changingClass','TILDE','Tilemap_addShadow','floor','KeyUnlisted','initButtonHidden','IconParam6','registerCommand','fillText','getBackgroundOpacity','itemWindowRect','_colorCache','param','exec','Activated','code','changeTextColor','drawNewParam','STRUCT','([\x5c+\x5c-]\x5cd+)([%％])>','Graphics_centerElement','Window_Base_update','GetParamIcon','AutoStretch','processKeyboardBackspace','Window_Selectable_processCursorMove','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SParamVocab3','create','RepositionEnemies','helpAreaHeight','F12','drawRightArrow','paramFlat','sparamFlatJS','Window_NameInput_cursorUp','isEnemy','moveMenuButtonSideButtonLayout','_data','transform','disable','OUTQUINT','createBackground','rightArrowWidth','NUMPAD1','_dummyWindow','index','BlurFilter','PERCENT','Game_Party_consumeItem','ActorHPColor','prototype','INOUTQUAD','OutlineColor','STB','goto','setBackgroundOpacity','_onKeyDown','currentClass','_forcedBattleSys','bind','_stored_ctGaugeColor1','parseForcedGameTroopSettingsCoreEngine','_screenY','left','buttonAreaHeight','GoldOverlap','MAX_SAFE_INTEGER','animationId','tpGaugeColor1','NumberRect','isSideView','Scene_Shop_create','Scene_Options_create','META','gaugeRate','(\x5cd+)([%％])>','destroyed','getCoreEngineScreenShakeStyle','RevertPreserveNumbers','Input_onKeyDown','expRate','XParamVocab6','move','BuyRect','isPlaying','toLowerCase','OUTCIRC','evade','TCR','isCollidedWithEvents','ItemStyle','_goldWindow','startAnimation','Spriteset_Base_initialize','SceneManager_initialize','ColorDeath','_stored_expGaugeColor1','startMove','skillTypeWindowRect','sparamPlus','Graphics','SlotRect','AccuracyBoost','CNT','subjectHitRate','ImprovedAccuracySystem','updateTransform','BasicParameterFormula','_isPlaytest','ItemBgType','_stored_tpGaugeColor1','OPEN_PAREN','addCommand','createMenuButton','PRESERVCONVERSION(%1)','INOUTELASTIC','CONTEXT_MENU','isCancelled','itemEva','Bitmap_drawTextOutline','_inputSpecialKeyCode','targetScaleY','mainAreaHeightSideButtonLayout','_playtestF7Looping','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','processTouch','CommandBgType','bitmap','createDimmerSprite','mirror','clearRect','Input_pollGamepads','wait','cursorUp','CTRL','ButtonHeight','setActorHomeRepositioned','FDR','paramRate1','paramBase','F6key','normal','JUNJA','VisuMZ_1_OptionsCore','ShowButtons','learnings','DigitGroupingExText','NUMPAD7','_numberWindow','addLoadListener','processKeyboardDelete','startAutoNewGame','setSideView','playTestF6','Untitled','process_VisuMZ_CoreEngine_Settings','createButtonAssistWindow','Rate1','FINAL','ALWAYS','mev','drawActorSimpleStatus','opacity','Game_Actor_levelUp','Sprite_Actor_setActorHome','NUMPAD3','requestMotion','InputBgType','_digitGrouping','SPACE','format','_coreEasingType','StatusParamsRect','isExpGaugeDrawn','setupNewGame','processTimingData','onClick','Conditional\x20Branch\x20Script\x20Error','EncounterRateMinimum','HelpRect','enable','loadTitle2','_onKeyPress','process_VisuMZ_CoreEngine_jsQuickFunctions','makeDeepCopy','%1/','maxLvGaugeColor2','titles1','ESC'];const _0x2e46=function(_0x426795,_0x1b27d6){_0x426795=_0x426795-0x19b;let _0x59f42e=_0x59f4[_0x426795];return _0x59f42e;};const _0xe356ff=_0x2e46;(function(_0x28a2c2,_0x1cd521){const _0x12bd05=_0x2e46;while(!![]){try{const _0x157cf1=-parseInt(_0x12bd05(0x5d7))+parseInt(_0x12bd05(0x57f))+parseInt(_0x12bd05(0x655))*-parseInt(_0x12bd05(0x59f))+-parseInt(_0x12bd05(0x2bc))+parseInt(_0x12bd05(0x49f))+-parseInt(_0x12bd05(0x6f0))+parseInt(_0x12bd05(0x579));if(_0x157cf1===_0x1cd521)break;else _0x28a2c2['push'](_0x28a2c2['shift']());}catch(_0x3d4aac){_0x28a2c2['push'](_0x28a2c2['shift']());}}}(_0x59f4,0x9e6e3));var label=_0xe356ff(0x64f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xe356ff(0x252)](function(_0x2d051b){const _0x4c1841=_0xe356ff;return _0x2d051b['status']&&_0x2d051b[_0x4c1841(0x35e)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0xe356ff(0x5cf)]=VisuMZ[label][_0xe356ff(0x5cf)]||{},VisuMZ['ConvertParams']=function(_0x2555d4,_0x1d7c40){const _0x6ef39b=_0xe356ff;for(const _0x382107 in _0x1d7c40){if(_0x382107['match'](/(.*):(.*)/i)){const _0x27cd80=String(RegExp['$1']),_0x21efc2=String(RegExp['$2'])[_0x6ef39b(0x68f)]()[_0x6ef39b(0x758)]();let _0x4d8eb1,_0x37b4a9,_0x45de3e;switch(_0x21efc2){case _0x6ef39b(0x419):_0x4d8eb1=_0x1d7c40[_0x382107]!==''?Number(_0x1d7c40[_0x382107]):0x0;break;case _0x6ef39b(0x636):_0x37b4a9=_0x1d7c40[_0x382107]!==''?JSON['parse'](_0x1d7c40[_0x382107]):[],_0x4d8eb1=_0x37b4a9['map'](_0x49ac6e=>Number(_0x49ac6e));break;case'EVAL':_0x4d8eb1=_0x1d7c40[_0x382107]!==''?eval(_0x1d7c40[_0x382107]):null;break;case _0x6ef39b(0x46b):_0x37b4a9=_0x1d7c40[_0x382107]!==''?JSON[_0x6ef39b(0x1ff)](_0x1d7c40[_0x382107]):[],_0x4d8eb1=_0x37b4a9[_0x6ef39b(0x1f5)](_0x240d38=>eval(_0x240d38));break;case _0x6ef39b(0x75a):_0x4d8eb1=_0x1d7c40[_0x382107]!==''?JSON['parse'](_0x1d7c40[_0x382107]):'';break;case _0x6ef39b(0x710):_0x37b4a9=_0x1d7c40[_0x382107]!==''?JSON['parse'](_0x1d7c40[_0x382107]):[],_0x4d8eb1=_0x37b4a9[_0x6ef39b(0x1f5)](_0x3eb044=>JSON[_0x6ef39b(0x1ff)](_0x3eb044));break;case _0x6ef39b(0x640):_0x4d8eb1=_0x1d7c40[_0x382107]!==''?new Function(JSON[_0x6ef39b(0x1ff)](_0x1d7c40[_0x382107])):new Function(_0x6ef39b(0x23a));break;case'ARRAYFUNC':_0x37b4a9=_0x1d7c40[_0x382107]!==''?JSON[_0x6ef39b(0x1ff)](_0x1d7c40[_0x382107]):[],_0x4d8eb1=_0x37b4a9[_0x6ef39b(0x1f5)](_0x171483=>new Function(JSON['parse'](_0x171483)));break;case _0x6ef39b(0x474):_0x4d8eb1=_0x1d7c40[_0x382107]!==''?String(_0x1d7c40[_0x382107]):'';break;case _0x6ef39b(0x2a9):_0x37b4a9=_0x1d7c40[_0x382107]!==''?JSON[_0x6ef39b(0x1ff)](_0x1d7c40[_0x382107]):[],_0x4d8eb1=_0x37b4a9[_0x6ef39b(0x1f5)](_0x4e90d1=>String(_0x4e90d1));break;case _0x6ef39b(0x4c7):_0x45de3e=_0x1d7c40[_0x382107]!==''?JSON[_0x6ef39b(0x1ff)](_0x1d7c40[_0x382107]):{},_0x2555d4[_0x27cd80]={},VisuMZ[_0x6ef39b(0x707)](_0x2555d4[_0x27cd80],_0x45de3e);continue;case _0x6ef39b(0x324):_0x37b4a9=_0x1d7c40[_0x382107]!==''?JSON['parse'](_0x1d7c40[_0x382107]):[],_0x4d8eb1=_0x37b4a9[_0x6ef39b(0x1f5)](_0x3c2a55=>VisuMZ[_0x6ef39b(0x707)]({},JSON['parse'](_0x3c2a55)));break;default:continue;}_0x2555d4[_0x27cd80]=_0x4d8eb1;}}return _0x2555d4;},(_0x560ba0=>{const _0x4be7b8=_0xe356ff,_0x70105e=_0x560ba0[_0x4be7b8(0x639)];for(const _0x3b075b of dependencies){if(!Imported[_0x3b075b]){alert(_0x4be7b8(0x4cf)[_0x4be7b8(0x560)](_0x70105e,_0x3b075b)),SceneManager[_0x4be7b8(0x3c5)]();break;}}const _0x181026=_0x560ba0[_0x4be7b8(0x35e)];if(_0x181026[_0x4be7b8(0x211)](/\[Version[ ](.*?)\]/i)){const _0x14fbbd=Number(RegExp['$1']);_0x14fbbd!==VisuMZ[label]['version']&&(alert(_0x4be7b8(0x3a3)[_0x4be7b8(0x560)](_0x70105e,_0x14fbbd)),SceneManager[_0x4be7b8(0x3c5)]());}if(_0x181026[_0x4be7b8(0x211)](/\[Tier[ ](\d+)\]/i)){const _0x4eef36=Number(RegExp['$1']);_0x4eef36<tier?(alert(_0x4be7b8(0x2d2)[_0x4be7b8(0x560)](_0x70105e,_0x4eef36,tier)),SceneManager[_0x4be7b8(0x3c5)]()):tier=Math[_0x4be7b8(0x29e)](_0x4eef36,tier);}VisuMZ[_0x4be7b8(0x707)](VisuMZ[label]['Settings'],_0x560ba0['parameters']);})(pluginData),VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4c3)]={'PluginCommands':!![]},PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x605),_0x109a05=>{const _0x2484dd=_0xe356ff;VisuMZ['ConvertParams'](_0x109a05,_0x109a05);const _0x50a007=_0x109a05[_0x2484dd(0x3d6)];VisuMZ[_0x2484dd(0x28e)](_0x50a007);}),PluginManager['registerCommand'](pluginData[_0xe356ff(0x639)],'GoldChange',_0x5bb24e=>{const _0x1f6891=_0xe356ff;VisuMZ[_0x1f6891(0x707)](_0x5bb24e,_0x5bb24e);const _0x346117=_0x5bb24e[_0x1f6891(0x313)]||0x0;$gameParty[_0x1f6891(0x439)](_0x346117);}),PluginManager[_0xe356ff(0x4bc)](pluginData['name'],'PictureEasingType',_0x57a045=>{const _0x4566c9=_0xe356ff;VisuMZ[_0x4566c9(0x707)](_0x57a045,_0x57a045);const _0xd2a9dd=_0x57a045['pictureId']||0x1,_0x56c224=_0x57a045[_0x4566c9(0x729)]||_0x4566c9(0x2dd),_0x5358a6=$gameScreen[_0x4566c9(0x2a3)](_0xd2a9dd);_0x5358a6&&_0x5358a6[_0x4566c9(0x297)](_0x56c224);}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x220),_0x48572b=>{for(let _0x594350=0x1;_0x594350<=0x64;_0x594350++){$gameScreen['erasePicture'](_0x594350);}}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],'PictureEraseRange',_0xd0382f=>{const _0x3975ec=_0xe356ff;VisuMZ[_0x3975ec(0x707)](_0xd0382f,_0xd0382f);const _0x240c3e=Math[_0x3975ec(0x6a7)](_0xd0382f['StartID'],_0xd0382f[_0x3975ec(0x745)]),_0x43b707=Math[_0x3975ec(0x29e)](_0xd0382f[_0x3975ec(0x3eb)],_0xd0382f[_0x3975ec(0x745)]);for(let _0xa64c32=_0x240c3e;_0xa64c32<=_0x43b707;_0xa64c32++){$gameScreen[_0x3975ec(0x492)](_0xa64c32);}}),PluginManager[_0xe356ff(0x4bc)](pluginData['name'],'ScreenShake',_0xfc866f=>{const _0x2c2405=_0xe356ff;VisuMZ[_0x2c2405(0x707)](_0xfc866f,_0xfc866f);const _0x1d500e=_0xfc866f[_0x2c2405(0x672)]||_0x2c2405(0x3c0),_0x4664b1=_0xfc866f[_0x2c2405(0x3f6)]['clamp'](0x1,0x9),_0x3aa1dd=_0xfc866f[_0x2c2405(0x322)][_0x2c2405(0x32b)](0x1,0x9),_0x5e2905=_0xfc866f['Duration']||0x1,_0x4756bc=_0xfc866f[_0x2c2405(0x26f)];$gameScreen[_0x2c2405(0x2f9)](_0x1d500e),$gameScreen['startShake'](_0x4664b1,_0x3aa1dd,_0x5e2905);if(_0x4756bc){const _0x48ce5a=$gameTemp[_0x2c2405(0x294)]();if(_0x48ce5a)_0x48ce5a[_0x2c2405(0x53a)](_0x5e2905);}}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x1cc),_0x21864e=>{const _0x293c7d=_0xe356ff;VisuMZ[_0x293c7d(0x707)](_0x21864e,_0x21864e);const _0x201949=_0x21864e['option']||0x1;$gameSystem['setMainFontSize'](_0x201949);}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x5a6),_0x81faa6=>{const _0x1a2d50=_0xe356ff;if($gameParty[_0x1a2d50(0x382)]())return;VisuMZ['ConvertParams'](_0x81faa6,_0x81faa6);const _0x4af045=_0x81faa6[_0x1a2d50(0x477)];if(_0x4af045[_0x1a2d50(0x211)](/Front/i))$gameSystem[_0x1a2d50(0x54e)](![]);else _0x4af045['match'](/Side/i)?$gameSystem[_0x1a2d50(0x54e)](!![]):$gameSystem[_0x1a2d50(0x54e)](!$gameSystem[_0x1a2d50(0x4fc)]());}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x286),_0x56e5fe=>{const _0x1393c3=_0xe356ff;if($gameParty[_0x1393c3(0x382)]())return;VisuMZ['ConvertParams'](_0x56e5fe,_0x56e5fe);const _0x415a50=[_0x1393c3(0x68d),'bgs','me','se'];for(const _0x509dfc of _0x415a50){const _0x4e418e=_0x56e5fe[_0x509dfc],_0x2c0061=_0x1393c3(0x56f)['format'](_0x509dfc);for(const _0x992d24 of _0x4e418e){console['log'](_0x2c0061,_0x992d24),AudioManager[_0x1393c3(0x591)](_0x2c0061,_0x992d24);}}}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x25d),_0xe4218b=>{const _0x37059f=_0xe356ff;if($gameParty[_0x37059f(0x382)]())return;VisuMZ['ConvertParams'](_0xe4218b,_0xe4218b);const _0xa08370=[_0x37059f(0x3e4),_0x37059f(0x5e6),_0x37059f(0x5c0),_0x37059f(0x2a8),_0x37059f(0x1e0),_0x37059f(0x380),_0x37059f(0x494),_0x37059f(0x42d),_0x37059f(0x388),_0x37059f(0x6d4),'system',_0x37059f(0x749),_0x37059f(0x571),_0x37059f(0x447)];for(const _0xe32248 of _0xa08370){const _0x2c5b40=_0xe4218b[_0xe32248],_0x131816=_0x37059f(0x4aa)[_0x37059f(0x560)](_0xe32248);for(const _0x280842 of _0x2c5b40){ImageManager[_0x37059f(0x598)](_0x131816,_0x280842);}}}),PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x270),_0x35280d=>{const _0x3569b4=_0xe356ff;if($gameParty['inBattle']())return;VisuMZ[_0x3569b4(0x707)](_0x35280d,_0x35280d);const _0x10eb2a=_0x35280d[_0x3569b4(0x477)][_0x3569b4(0x68f)]()[_0x3569b4(0x758)](),_0x407753=VisuMZ['CoreEngine'][_0x3569b4(0x275)](_0x10eb2a);$gameSystem[_0x3569b4(0x697)](_0x407753);}),VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x275)]=function(_0x2fe5a){const _0x2aa326=_0xe356ff;_0x2fe5a=_0x2fe5a||_0x2aa326(0x37c),_0x2fe5a=String(_0x2fe5a)[_0x2aa326(0x68f)]()[_0x2aa326(0x758)]();switch(_0x2fe5a){case _0x2aa326(0x331):return 0x0;case _0x2aa326(0x6a0):Imported[_0x2aa326(0x545)]&&(ConfigManager[_0x2aa326(0x2ff)]=!![]);return 0x1;case _0x2aa326(0x2d5):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x2aa326(0x2ff)]=![]);return 0x2;case _0x2aa326(0x2c9):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x2aa326(0x2c9);break;case'STB':if(Imported[_0x2aa326(0x364)])return _0x2aa326(0x4eb);break;case _0x2aa326(0x292):if(Imported[_0x2aa326(0x66a)])return'BTB';break;case _0x2aa326(0x6cd):if(Imported[_0x2aa326(0x57b)])return _0x2aa326(0x6cd);break;}return $dataSystem[_0x2aa326(0x44e)];},PluginManager[_0xe356ff(0x4bc)](pluginData[_0xe356ff(0x639)],_0xe356ff(0x20e),_0x4542e1=>{const _0x86f43d=_0xe356ff;VisuMZ[_0x86f43d(0x707)](_0x4542e1,_0x4542e1);const _0x4c647d=_0x4542e1[_0x86f43d(0x477)]||0x1;$gameSystem[_0x86f43d(0x307)](_0x4c647d);}),VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x2cd)]=Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x2ef)],Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x2ef)]=function(){const _0x4b7422=_0xe356ff;VisuMZ[_0x4b7422(0x64f)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x4b7422(0x36a)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x42f)]={},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x421)]=function(){const _0x18eaf9=_0xe356ff,_0x16dfcc=[_0x18eaf9(0x757),'MAXMP',_0x18eaf9(0x65c),_0x18eaf9(0x637),'MAT','MDF',_0x18eaf9(0x21a),_0x18eaf9(0x1c7)],_0x46f42e=[_0x18eaf9(0x19c),_0x18eaf9(0x471),_0x18eaf9(0x5fd),_0x18eaf9(0x584),'MEV',_0x18eaf9(0x338),_0x18eaf9(0x51d),'HRG',_0x18eaf9(0x1af),_0x18eaf9(0x4a1)],_0x3b5dd7=[_0x18eaf9(0x2d6),_0x18eaf9(0x6be),_0x18eaf9(0x420),_0x18eaf9(0x5ac),'MCR',_0x18eaf9(0x50e),_0x18eaf9(0x49e),'MDR',_0x18eaf9(0x53f),_0x18eaf9(0x6f5)],_0xc164ea=[_0x16dfcc,_0x46f42e,_0x3b5dd7],_0x12b18e=[_0x18eaf9(0x247),_0x18eaf9(0x6c4),'Plus2',_0x18eaf9(0x263),_0x18eaf9(0x3d2),_0x18eaf9(0x553),_0x18eaf9(0x6fe),_0x18eaf9(0x43f),_0x18eaf9(0x5f8),'Flat2'];for(const _0x15e4ca of _0xc164ea){let _0x59c6d4='';if(_0x15e4ca===_0x16dfcc)_0x59c6d4='param';if(_0x15e4ca===_0x46f42e)_0x59c6d4=_0x18eaf9(0x1c4);if(_0x15e4ca===_0x3b5dd7)_0x59c6d4=_0x18eaf9(0x5c9);for(const _0xeb7a64 of _0x12b18e){let _0x543294='%1%2'[_0x18eaf9(0x560)](_0x59c6d4,_0xeb7a64);VisuMZ[_0x18eaf9(0x64f)][_0x18eaf9(0x42f)][_0x543294]=[],VisuMZ[_0x18eaf9(0x64f)]['RegExp'][_0x543294+'JS']=[];let _0xb91a11='<%1\x20%2:[\x20]';if(['Plus',_0x18eaf9(0x43f)][_0x18eaf9(0x416)](_0xeb7a64))_0xb91a11+=_0x18eaf9(0x705);else{if(['Plus1',_0x18eaf9(0x5f8)][_0x18eaf9(0x416)](_0xeb7a64))_0xb91a11+=_0x18eaf9(0x4c8);else{if([_0x18eaf9(0x1de),_0x18eaf9(0x274)]['includes'](_0xeb7a64))_0xb91a11+=_0x18eaf9(0x532);else{if(_0xeb7a64===_0x18eaf9(0x263))_0xb91a11+='(\x5cd+)>';else{if(_0xeb7a64===_0x18eaf9(0x553))_0xb91a11+=_0x18eaf9(0x501);else _0xeb7a64===_0x18eaf9(0x6fe)&&(_0xb91a11+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x5905fd of _0x15e4ca){let _0x192dc7=_0xeb7a64['replace'](/[\d+]/g,'')[_0x18eaf9(0x68f)]();const _0x4b401f=_0xb91a11[_0x18eaf9(0x560)](_0x5905fd,_0x192dc7);VisuMZ['CoreEngine']['RegExp'][_0x543294][_0x18eaf9(0x62d)](new RegExp(_0x4b401f,'i'));const _0x2873eb='<JS\x20%1\x20%2:[\x20](.*)>'[_0x18eaf9(0x560)](_0x5905fd,_0x192dc7);VisuMZ['CoreEngine']['RegExp'][_0x543294+'JS'][_0x18eaf9(0x62d)](new RegExp(_0x2873eb,'i'));}}}},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x58c)]=function(){const _0x4ad869=_0xe356ff;if(VisuMZ[_0x4ad869(0x1d8)])return;},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x551)]=function(){const _0x7fb6e6=_0xe356ff;VisuMZ[_0x7fb6e6(0x64f)]['Settings'][_0x7fb6e6(0x69e)][_0x7fb6e6(0x427)]&&VisuMZ[_0x7fb6e6(0x41a)](!![]);VisuMZ[_0x7fb6e6(0x64f)]['Settings']['QoL']['ModernControls']&&(Input['keyMapper'][0x23]=_0x7fb6e6(0x235),Input[_0x7fb6e6(0x6d1)][0x24]='home');if(VisuMZ[_0x7fb6e6(0x64f)]['Settings'][_0x7fb6e6(0x3e1)]){const _0x21641a=VisuMZ['CoreEngine'][_0x7fb6e6(0x5cf)]['ButtonAssist'];_0x21641a[_0x7fb6e6(0x48b)]=_0x21641a[_0x7fb6e6(0x48b)]||_0x7fb6e6(0x360),_0x21641a[_0x7fb6e6(0x461)]=_0x21641a[_0x7fb6e6(0x461)]||'\x5c}❪TAB❫\x5c{';}VisuMZ[_0x7fb6e6(0x64f)]['Settings'][_0x7fb6e6(0x5e7)][_0x7fb6e6(0x31c)]&&(Input[_0x7fb6e6(0x6d1)][0x57]='up',Input[_0x7fb6e6(0x6d1)][0x41]='left',Input['keyMapper'][0x53]=_0x7fb6e6(0x626),Input[_0x7fb6e6(0x6d1)][0x44]=_0x7fb6e6(0x411),Input[_0x7fb6e6(0x6d1)][0x45]='pagedown'),VisuMZ[_0x7fb6e6(0x64f)][_0x7fb6e6(0x5cf)]['KeyboardInput'][_0x7fb6e6(0x5b4)]&&(Input['keyMapper'][0x52]=_0x7fb6e6(0x6a1));},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x36a)]=function(){const _0x1fa887=_0xe356ff;this[_0x1fa887(0x56d)]();},Scene_Boot[_0xe356ff(0x4e8)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x2d2040=_0xe356ff,_0x4284df=VisuMZ[_0x2d2040(0x64f)][_0x2d2040(0x5cf)]['jsQuickFunc'];for(const _0xe6c349 of _0x4284df){const _0x38864f=_0xe6c349[_0x2d2040(0x33c)]['replace'](/[ ]/g,''),_0x5a1f71=_0xe6c349[_0x2d2040(0x2d4)];VisuMZ[_0x2d2040(0x64f)][_0x2d2040(0x582)](_0x38864f,_0x5a1f71);}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x582)]=function(_0x488e15,_0x901c5a){const _0x38f43d=_0xe356ff;if(!!window[_0x488e15]){if($gameTemp['isPlaytest']())console[_0x38f43d(0x5e9)](_0x38f43d(0x69f)['format'](_0x488e15));}const _0x276936=_0x38f43d(0x3d7)[_0x38f43d(0x560)](_0x488e15,_0x901c5a);window[_0x488e15]=new Function(_0x276936);},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x45a)]=function(){const _0x45b643=_0xe356ff,_0x5c659f=VisuMZ[_0x45b643(0x64f)][_0x45b643(0x5cf)][_0x45b643(0x327)];if(!_0x5c659f)return;for(const _0x494d3a of _0x5c659f){if(!_0x494d3a)continue;VisuMZ[_0x45b643(0x64f)][_0x45b643(0x434)](_0x494d3a);}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x61a)]={},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x728)]={},VisuMZ[_0xe356ff(0x64f)]['CustomParamType']={},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x214)]={},VisuMZ[_0xe356ff(0x64f)]['createCustomParameter']=function(_0x14db6b){const _0x5e2fa0=_0xe356ff,_0x38a0f1=_0x14db6b['Abbreviation'],_0x2aef11=_0x14db6b[_0x5e2fa0(0x23f)],_0x48aa53=_0x14db6b[_0x5e2fa0(0x3b3)],_0x1502cd=_0x14db6b[_0x5e2fa0(0x672)],_0x4cb055=new Function(_0x14db6b[_0x5e2fa0(0x62c)]);VisuMZ['CoreEngine']['CustomParamNames'][_0x38a0f1['toUpperCase']()[_0x5e2fa0(0x758)]()]=_0x2aef11,VisuMZ[_0x5e2fa0(0x64f)][_0x5e2fa0(0x728)][_0x38a0f1[_0x5e2fa0(0x68f)]()[_0x5e2fa0(0x758)]()]=_0x48aa53,VisuMZ[_0x5e2fa0(0x64f)][_0x5e2fa0(0x19f)][_0x38a0f1[_0x5e2fa0(0x68f)]()[_0x5e2fa0(0x758)]()]=_0x1502cd,VisuMZ[_0x5e2fa0(0x64f)][_0x5e2fa0(0x214)][_0x38a0f1[_0x5e2fa0(0x68f)]()[_0x5e2fa0(0x758)]()]=_0x38a0f1,Object[_0x5e2fa0(0x70e)](Game_BattlerBase[_0x5e2fa0(0x4e8)],_0x38a0f1,{'get'(){const _0x16d26e=_0x5e2fa0,_0x25d95e=_0x4cb055[_0x16d26e(0x329)](this);return _0x1502cd===_0x16d26e(0x39d)?Math['round'](_0x25d95e):_0x25d95e;}});},VisuMZ[_0xe356ff(0x1d8)]=function(){const _0x190d0e=_0xe356ff;for(const _0x4b24f6 of $dataActors){if(_0x4b24f6)VisuMZ[_0x190d0e(0x230)](_0x4b24f6);}for(const _0x39697e of $dataClasses){if(_0x39697e)VisuMZ[_0x190d0e(0x320)](_0x39697e);}for(const _0x3bd31d of $dataSkills){if(_0x3bd31d)VisuMZ[_0x190d0e(0x3b2)](_0x3bd31d);}for(const _0x239795 of $dataItems){if(_0x239795)VisuMZ['ParseItemNotetags'](_0x239795);}for(const _0x37c773 of $dataWeapons){if(_0x37c773)VisuMZ[_0x190d0e(0x2b3)](_0x37c773);}for(const _0x3b6d18 of $dataArmors){if(_0x3b6d18)VisuMZ[_0x190d0e(0x215)](_0x3b6d18);}for(const _0x3b7730 of $dataEnemies){if(_0x3b7730)VisuMZ['ParseEnemyNotetags'](_0x3b7730);}for(const _0x4e0252 of $dataStates){if(_0x4e0252)VisuMZ['ParseStateNotetags'](_0x4e0252);}for(const _0x4c1bd1 of $dataTilesets){if(_0x4c1bd1)VisuMZ['ParseTilesetNotetags'](_0x4c1bd1);}},VisuMZ[_0xe356ff(0x230)]=function(_0x283506){},VisuMZ[_0xe356ff(0x320)]=function(_0x2c9566){},VisuMZ['ParseSkillNotetags']=function(_0x23df0d){},VisuMZ[_0xe356ff(0x4af)]=function(_0x27109b){},VisuMZ[_0xe356ff(0x2b3)]=function(_0x57b38d){},VisuMZ[_0xe356ff(0x215)]=function(_0x490d36){},VisuMZ[_0xe356ff(0x49c)]=function(_0x1fb903){},VisuMZ[_0xe356ff(0x622)]=function(_0x195f19){},VisuMZ['ParseTilesetNotetags']=function(_0x4768dd){},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x230)]=VisuMZ[_0xe356ff(0x230)],VisuMZ[_0xe356ff(0x230)]=function(_0x102c79){const _0x2ef4d3=_0xe356ff;VisuMZ[_0x2ef4d3(0x64f)]['ParseActorNotetags'][_0x2ef4d3(0x329)](this,_0x102c79);const _0x390241=_0x102c79['note'];if(_0x390241[_0x2ef4d3(0x211)](/<MAX LEVEL:[ ](\d+)>/i)){_0x102c79['maxLevel']=Number(RegExp['$1']);if(_0x102c79[_0x2ef4d3(0x480)]===0x0)_0x102c79[_0x2ef4d3(0x480)]=Number['MAX_SAFE_INTEGER'];}_0x390241['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x102c79[_0x2ef4d3(0x74c)]=Math['min'](Number(RegExp['$1']),_0x102c79[_0x2ef4d3(0x480)]));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x320)]=VisuMZ[_0xe356ff(0x320)],VisuMZ[_0xe356ff(0x320)]=function(_0x2b2b50){const _0x15c3c8=_0xe356ff;VisuMZ[_0x15c3c8(0x64f)]['ParseClassNotetags'][_0x15c3c8(0x329)](this,_0x2b2b50);if(_0x2b2b50[_0x15c3c8(0x547)])for(const _0x4a3590 of _0x2b2b50['learnings']){_0x4a3590[_0x15c3c8(0x2e6)][_0x15c3c8(0x211)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x4a3590[_0x15c3c8(0x3fd)]=Math[_0x15c3c8(0x29e)](Number(RegExp['$1']),0x1));}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x49c)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0xe356ff(0x49c)]=function(_0xf01b0f){const _0x2b6730=_0xe356ff;VisuMZ[_0x2b6730(0x64f)][_0x2b6730(0x49c)]['call'](this,_0xf01b0f),_0xf01b0f[_0x2b6730(0x3fd)]=0x1;const _0x403a5c=_0xf01b0f[_0x2b6730(0x2e6)];if(_0x403a5c[_0x2b6730(0x211)](/<LEVEL:[ ](\d+)>/i))_0xf01b0f['level']=Number(RegExp['$1']);if(_0x403a5c['match'](/<MAXHP:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x0]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<MAXMP:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x1]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<ATK:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x2]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<DEF:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x3]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<MAT:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x4]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<MDF:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x5]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<AGI:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x6]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<LUK:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x709)][0x7]=Number(RegExp['$1']);if(_0x403a5c[_0x2b6730(0x211)](/<EXP:[ ](\d+)>/i))_0xf01b0f[_0x2b6730(0x3c7)]=Number(RegExp['$1']);if(_0x403a5c['match'](/<GOLD:[ ](\d+)>/i))_0xf01b0f['gold']=Number(RegExp['$1']);},VisuMZ[_0xe356ff(0x64f)]['Graphics_defaultStretchMode']=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x584656=_0xe356ff;switch(VisuMZ['CoreEngine'][_0x584656(0x5cf)][_0x584656(0x69e)][_0x584656(0x4cc)]){case _0x584656(0x61b):return!![];case _0x584656(0x543):return![];default:return VisuMZ['CoreEngine'][_0x584656(0x372)][_0x584656(0x329)](this);}},VisuMZ['CoreEngine'][_0xe356ff(0x497)]=Graphics[_0xe356ff(0x616)],Graphics['printError']=function(_0x441199,_0x2cd6b7,_0x1a47d8=null){const _0x1b68c5=_0xe356ff;VisuMZ[_0x1b68c5(0x64f)][_0x1b68c5(0x497)]['call'](this,_0x441199,_0x2cd6b7,_0x1a47d8),VisuMZ[_0x1b68c5(0x41a)](![]);},VisuMZ['CoreEngine'][_0xe356ff(0x4c9)]=Graphics[_0xe356ff(0x6f3)],Graphics[_0xe356ff(0x6f3)]=function(_0x5445ab){const _0x1eaec2=_0xe356ff;VisuMZ['CoreEngine'][_0x1eaec2(0x4c9)]['call'](this,_0x5445ab),this[_0x1eaec2(0x35d)](_0x5445ab);},Graphics[_0xe356ff(0x35d)]=function(_0x3e68f0){const _0xe8154e=_0xe356ff;VisuMZ[_0xe8154e(0x64f)][_0xe8154e(0x5cf)]['QoL']['FontSmoothing']&&(_0x3e68f0[_0xe8154e(0x735)][_0xe8154e(0x4a9)]=_0xe8154e(0x3f5));VisuMZ[_0xe8154e(0x64f)][_0xe8154e(0x5cf)][_0xe8154e(0x69e)][_0xe8154e(0x744)]&&(_0x3e68f0[_0xe8154e(0x735)][_0xe8154e(0x5f9)]='pixelated');const _0x2ad12d=Math[_0xe8154e(0x29e)](0x0,Math[_0xe8154e(0x4b8)](_0x3e68f0[_0xe8154e(0x234)]*this['_realScale'])),_0x55448a=Math['max'](0x0,Math[_0xe8154e(0x4b8)](_0x3e68f0['height']*this[_0xe8154e(0x44f)]));_0x3e68f0[_0xe8154e(0x735)][_0xe8154e(0x234)]=_0x2ad12d+'px',_0x3e68f0['style']['height']=_0x55448a+'px';},Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x648)]=function(){const _0x21121d=_0xe356ff;this[_0x21121d(0x369)]=!![];},VisuMZ[_0xe356ff(0x64f)]['Sprite_destroy']=Sprite[_0xe356ff(0x4e8)][_0xe356ff(0x588)],Sprite['prototype']['destroy']=function(){const _0x5aad9c=_0xe356ff;VisuMZ[_0x5aad9c(0x64f)]['Sprite_destroy'][_0x5aad9c(0x329)](this),this[_0x5aad9c(0x433)]();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0x5387cc=_0xe356ff;if(!this[_0x5387cc(0x535)])return;if(!this[_0x5387cc(0x535)][_0x5387cc(0x369)])return;this[_0x5387cc(0x535)][_0x5387cc(0x365)]&&!this[_0x5387cc(0x2f1)][_0x5387cc(0x365)][_0x5387cc(0x502)]&&this['bitmap'][_0x5387cc(0x588)]();},VisuMZ['CoreEngine']['Bitmap_resize']=Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x3c9)],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x3c9)]=function(_0xcab442,_0x383764){const _0x3ef3ea=_0xe356ff;VisuMZ[_0x3ef3ea(0x64f)][_0x3ef3ea(0x251)][_0x3ef3ea(0x329)](this,_0xcab442,_0x383764),this[_0x3ef3ea(0x648)]();},VisuMZ['CoreEngine'][_0xe356ff(0x237)]=Bitmap[_0xe356ff(0x4e8)]['blt'],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x1b0)]=function(_0x4213ce,_0x19a577,_0x4e2376,_0x1c0ac2,_0x43c99f,_0x565ad8,_0x551014,_0x33998d,_0x3e2d72){const _0x5bcd88=_0xe356ff;VisuMZ[_0x5bcd88(0x64f)]['Bitmap_blt'][_0x5bcd88(0x329)](this,_0x4213ce,_0x19a577,_0x4e2376,_0x1c0ac2,_0x43c99f,_0x565ad8,_0x551014,_0x33998d,_0x3e2d72),this[_0x5bcd88(0x648)]();},VisuMZ[_0xe356ff(0x64f)]['Bitmap_clearRect']=Bitmap['prototype'][_0xe356ff(0x538)],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x538)]=function(_0x56de9c,_0x234bd9,_0x46c6bc,_0x13e757){const _0x274656=_0xe356ff;VisuMZ[_0x274656(0x64f)]['Bitmap_clearRect'][_0x274656(0x329)](this,_0x56de9c,_0x234bd9,_0x46c6bc,_0x13e757),this[_0x274656(0x648)]();},VisuMZ['CoreEngine'][_0xe356ff(0x2f7)]=Bitmap[_0xe356ff(0x4e8)]['fillRect'],Bitmap['prototype'][_0xe356ff(0x46e)]=function(_0x1aff7f,_0xdb287e,_0x2e4fb7,_0x1665c7,_0x211b8b){const _0x3a881c=_0xe356ff;VisuMZ[_0x3a881c(0x64f)][_0x3a881c(0x2f7)][_0x3a881c(0x329)](this,_0x1aff7f,_0xdb287e,_0x2e4fb7,_0x1665c7,_0x211b8b),this['markCoreEngineModified']();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x754)]=Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x31d)],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x31d)]=function(_0x76ba63,_0x5d962c,_0x3c2681,_0x7ba08f,_0x2ded03){const _0x420b8f=_0xe356ff;VisuMZ[_0x420b8f(0x64f)]['Bitmap_strokeRect']['call'](this,_0x76ba63,_0x5d962c,_0x3c2681,_0x7ba08f,_0x2ded03),this[_0x420b8f(0x648)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x619)]=Bitmap[_0xe356ff(0x4e8)]['gradientFillRect'],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x2dc)]=function(_0xa657dc,_0x33b7fd,_0x12dfb1,_0x135051,_0x1497fd,_0x1b97a8,_0x2fadb9){const _0x4b79bd=_0xe356ff;VisuMZ['CoreEngine']['Bitmap_gradientFillRect'][_0x4b79bd(0x329)](this,_0xa657dc,_0x33b7fd,_0x12dfb1,_0x135051,_0x1497fd,_0x1b97a8,_0x2fadb9),this[_0x4b79bd(0x648)]();},VisuMZ['CoreEngine'][_0xe356ff(0x700)]=Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x24f)],Bitmap[_0xe356ff(0x4e8)]['drawCircle']=function(_0x5bc567,_0x4c4b39,_0x48d4d4,_0xaa2c6){const _0x351d77=_0xe356ff;_0x5bc567=Math[_0x351d77(0x398)](_0x5bc567),_0x4c4b39=Math[_0x351d77(0x398)](_0x4c4b39),_0x48d4d4=Math[_0x351d77(0x398)](_0x48d4d4),VisuMZ[_0x351d77(0x64f)][_0x351d77(0x700)][_0x351d77(0x329)](this,_0x5bc567,_0x4c4b39,_0x48d4d4,_0xaa2c6),this[_0x351d77(0x648)]();},VisuMZ[_0xe356ff(0x64f)]['Bitmap_measureTextWidth']=Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x60f)],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x60f)]=function(_0x55ea19){const _0x1de702=_0xe356ff;return Math['round'](VisuMZ[_0x1de702(0x64f)][_0x1de702(0x26c)][_0x1de702(0x329)](this,_0x55ea19));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x45b)]=Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x3f2)],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x3f2)]=function(_0x4de82a,_0x1c3627,_0x29c07d,_0x4b1d9f,_0x50c4fb,_0x16cdef){const _0x3b3944=_0xe356ff;_0x1c3627=Math[_0x3b3944(0x398)](_0x1c3627),_0x29c07d=Math[_0x3b3944(0x398)](_0x29c07d),_0x4b1d9f=Math[_0x3b3944(0x398)](_0x4b1d9f),_0x50c4fb=Math[_0x3b3944(0x398)](_0x50c4fb),VisuMZ[_0x3b3944(0x64f)]['Bitmap_drawText']['call'](this,_0x4de82a,_0x1c3627,_0x29c07d,_0x4b1d9f,_0x50c4fb,_0x16cdef),this[_0x3b3944(0x648)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x52d)]=Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x48f)],Bitmap[_0xe356ff(0x4e8)][_0xe356ff(0x48f)]=function(_0x19beb0,_0x54eaa5,_0x345cf5,_0xed11ca){const _0x50ffbc=_0xe356ff;VisuMZ[_0x50ffbc(0x64f)][_0x50ffbc(0x5cf)][_0x50ffbc(0x69e)][_0x50ffbc(0x32f)]?this['_drawTextShadow'](_0x19beb0,_0x54eaa5,_0x345cf5,_0xed11ca):VisuMZ[_0x50ffbc(0x64f)][_0x50ffbc(0x52d)][_0x50ffbc(0x329)](this,_0x19beb0,_0x54eaa5,_0x345cf5,_0xed11ca);},Bitmap[_0xe356ff(0x4e8)]['_drawTextShadow']=function(_0x5dfa6,_0x48f1d2,_0x434403,_0xa1a242){const _0x562781=_0xe356ff,_0xafb0a8=this[_0x562781(0x615)];_0xafb0a8[_0x562781(0x5a7)]=this['outlineColor'],_0xafb0a8[_0x562781(0x4bd)](_0x5dfa6,_0x48f1d2+0x2,_0x434403+0x2,_0xa1a242);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x231)]=Input['clear'],Input[_0xe356ff(0x5c7)]=function(){const _0x480c4c=_0xe356ff;VisuMZ[_0x480c4c(0x64f)]['Input_clear'][_0x480c4c(0x329)](this),this[_0x480c4c(0x489)]=undefined,this[_0x480c4c(0x52e)]=undefined,this[_0x480c4c(0x1c0)]=Input['keyRepeatWait'];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x677)]=Input[_0xe356ff(0x26e)],Input['update']=function(){const _0xd67805=_0xe356ff;VisuMZ[_0xd67805(0x64f)][_0xd67805(0x677)][_0xd67805(0x329)](this);if(this[_0xd67805(0x1c0)])this[_0xd67805(0x1c0)]--;},VisuMZ[_0xe356ff(0x64f)]['Input_pollGamepads']=Input[_0xe356ff(0x657)],Input[_0xe356ff(0x657)]=function(){const _0x4fee10=_0xe356ff;if(this['_gamepadWait'])return;VisuMZ[_0x4fee10(0x64f)][_0x4fee10(0x539)]['call'](this);},VisuMZ[_0xe356ff(0x64f)]['Input_setupEventHandlers']=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x117e4f=_0xe356ff;VisuMZ[_0x117e4f(0x64f)][_0x117e4f(0x617)]['call'](this),document['addEventListener'](_0x117e4f(0x29c),this[_0x117e4f(0x56c)][_0x117e4f(0x4f1)](this));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x505)]=Input[_0xe356ff(0x4ee)],Input[_0xe356ff(0x4ee)]=function(_0xc6e993){const _0x4d805d=_0xe356ff;this['_inputSpecialKeyCode']=_0xc6e993[_0x4d805d(0x33f)],VisuMZ[_0x4d805d(0x64f)][_0x4d805d(0x505)]['call'](this,_0xc6e993);},Input[_0xe356ff(0x56c)]=function(_0x37df7f){const _0x5688ca=_0xe356ff;this[_0x5688ca(0x27c)](_0x37df7f);},Input[_0xe356ff(0x27c)]=function(_0xa75dd0){const _0xd47e48=_0xe356ff;this[_0xd47e48(0x52e)]=_0xa75dd0[_0xd47e48(0x33f)];let _0x155126=String[_0xd47e48(0x1c3)](_0xa75dd0[_0xd47e48(0x45f)]);this[_0xd47e48(0x489)]===undefined?this[_0xd47e48(0x489)]=_0x155126:this[_0xd47e48(0x489)]+=_0x155126;},VisuMZ['CoreEngine'][_0xe356ff(0x1fb)]=Input[_0xe356ff(0x1dc)],Input[_0xe356ff(0x1dc)]=function(_0x2d1d55){const _0x36aeb0=_0xe356ff;if(_0x2d1d55===0x8)return![];return VisuMZ['CoreEngine'][_0x36aeb0(0x1fb)]['call'](this,_0x2d1d55);},Input[_0xe356ff(0x418)]=function(_0x3532e4){const _0x5ba11e=_0xe356ff;if(_0x3532e4[_0x5ba11e(0x211)](/backspace/i))return this[_0x5ba11e(0x52e)]===0x8;if(_0x3532e4[_0x5ba11e(0x211)](/enter/i))return this[_0x5ba11e(0x52e)]===0xd;if(_0x3532e4[_0x5ba11e(0x211)](/escape/i))return this[_0x5ba11e(0x52e)]===0x1b;},Input[_0xe356ff(0x1c9)]=function(){const _0x178875=_0xe356ff;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x178875(0x487)](this[_0x178875(0x52e)]);},Input[_0xe356ff(0x243)]=function(){const _0x3b4936=_0xe356ff;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3b4936(0x52e)]);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4b7)]=Tilemap[_0xe356ff(0x4e8)][_0xe356ff(0x3f7)],Tilemap['prototype'][_0xe356ff(0x3f7)]=function(_0x59034c,_0x334df3,_0x323048,_0x13eb62){const _0x22a646=_0xe356ff;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ['CoreEngine']['Tilemap_addShadow'][_0x22a646(0x329)](this,_0x59034c,_0x334df3,_0x323048,_0x13eb62);},Tilemap[_0xe356ff(0x1b3)][_0xe356ff(0x4e8)][_0xe356ff(0x470)]=function(){const _0x106701=_0xe356ff;this['_destroyInternalTextures']();for(let _0xcbfd95=0x0;_0xcbfd95<Tilemap[_0x106701(0x267)][_0x106701(0x2b5)];_0xcbfd95++){const _0x339643=new PIXI[(_0x106701(0x695))]();_0x339643[_0x106701(0x6ca)](0x800,0x800),VisuMZ[_0x106701(0x64f)]['Settings']['QoL']['PixelateImageRendering']&&(_0x339643[_0x106701(0x3e5)]=PIXI['SCALE_MODES']['NEAREST']),this[_0x106701(0x271)][_0x106701(0x62d)](_0x339643);}},WindowLayer[_0xe356ff(0x4e8)][_0xe356ff(0x3ce)]=function(){const _0x2ae4df=_0xe356ff;return SceneManager&&SceneManager['_scene']?SceneManager[_0x2ae4df(0x6d2)][_0x2ae4df(0x746)]():!![];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6c1)]=WindowLayer[_0xe356ff(0x4e8)][_0xe356ff(0x278)],WindowLayer[_0xe356ff(0x4e8)][_0xe356ff(0x278)]=function render(_0x163e8c){const _0x299035=_0xe356ff;this[_0x299035(0x3ce)]()?VisuMZ[_0x299035(0x64f)][_0x299035(0x6c1)][_0x299035(0x329)](this,_0x163e8c):this[_0x299035(0x29a)](_0x163e8c);},WindowLayer[_0xe356ff(0x4e8)]['renderNoMask']=function render(_0x30b668){const _0x1b4b81=_0xe356ff;if(!this[_0x1b4b81(0x26d)])return;const _0x57e9ad=new PIXI[(_0x1b4b81(0x51a))](),_0x371086=_0x30b668['gl'],_0x561c71=this[_0x1b4b81(0x3b8)]['clone']();_0x30b668[_0x1b4b81(0x3b9)][_0x1b4b81(0x47b)](),_0x57e9ad[_0x1b4b81(0x4dc)]=this[_0x1b4b81(0x4dc)],_0x30b668[_0x1b4b81(0x35b)][_0x1b4b81(0x3ef)](),_0x371086[_0x1b4b81(0x56a)](_0x371086[_0x1b4b81(0x314)]);while(_0x561c71[_0x1b4b81(0x437)]>0x0){const _0x2b37e9=_0x561c71[_0x1b4b81(0x229)]();_0x2b37e9[_0x1b4b81(0x4a5)]&&_0x2b37e9[_0x1b4b81(0x26d)]&&_0x2b37e9[_0x1b4b81(0x21e)]>0x0&&(_0x371086[_0x1b4b81(0x1d9)](_0x371086[_0x1b4b81(0x716)],0x0,~0x0),_0x371086['stencilOp'](_0x371086['KEEP'],_0x371086[_0x1b4b81(0x600)],_0x371086['KEEP']),_0x2b37e9['render'](_0x30b668),_0x30b668[_0x1b4b81(0x35b)][_0x1b4b81(0x3ef)](),_0x57e9ad['clear'](),_0x371086[_0x1b4b81(0x1d9)](_0x371086[_0x1b4b81(0x555)],0x1,~0x0),_0x371086[_0x1b4b81(0x623)](_0x371086[_0x1b4b81(0x2e1)],_0x371086['REPLACE'],_0x371086[_0x1b4b81(0x2e1)]),_0x371086[_0x1b4b81(0x1ce)](_0x371086['ZERO'],_0x371086[_0x1b4b81(0x650)]),_0x57e9ad['render'](_0x30b668),_0x30b668[_0x1b4b81(0x35b)][_0x1b4b81(0x3ef)](),_0x371086[_0x1b4b81(0x1ce)](_0x371086['ONE'],_0x371086['ONE_MINUS_SRC_ALPHA']));}_0x371086[_0x1b4b81(0x4dd)](_0x371086[_0x1b4b81(0x314)]),_0x371086['clear'](_0x371086[_0x1b4b81(0x69a)]),_0x371086[_0x1b4b81(0x71b)](0x0),_0x30b668[_0x1b4b81(0x35b)][_0x1b4b81(0x3ef)]();for(const _0xafceec of this[_0x1b4b81(0x3b8)]){!_0xafceec['_isWindow']&&_0xafceec[_0x1b4b81(0x26d)]&&_0xafceec['render'](_0x30b668);}_0x30b668[_0x1b4b81(0x35b)][_0x1b4b81(0x3ef)]();},DataManager['isKeyItem']=function(_0x402e01){const _0x33dfac=_0xe356ff;return this[_0x33dfac(0x40e)](_0x402e01)&&_0x402e01[_0x33dfac(0x573)]===0x2;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x759)]=DataManager[_0xe356ff(0x564)],DataManager[_0xe356ff(0x564)]=function(){const _0x36ae17=_0xe356ff;VisuMZ[_0x36ae17(0x64f)]['DataManager_setupNewGame']['call'](this),this[_0x36ae17(0x66d)](),this[_0x36ae17(0x305)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x21bfd4=_0xe356ff;if($gameTemp[_0x21bfd4(0x424)]()){const _0x2a0605=VisuMZ[_0x21bfd4(0x64f)]['Settings']['QoL']['NewGameCommonEvent'];if(_0x2a0605>0x0)$gameTemp[_0x21bfd4(0x473)](_0x2a0605);}},DataManager[_0xe356ff(0x305)]=function(){const _0x2369da=_0xe356ff,_0x4a256d=VisuMZ[_0x2369da(0x64f)][_0x2369da(0x5cf)]['QoL'][_0x2369da(0x269)]||0x0;if(_0x4a256d>0x0)$gameTemp['reserveCommonEvent'](_0x4a256d);},TextManager[_0xe356ff(0x280)]=['','','',_0xe356ff(0x5b7),'','','HELP','','BACKSPACE',_0xe356ff(0x3ff),'','',_0xe356ff(0x6dc),'ENTER',_0xe356ff(0x334),'','SHIFT',_0xe356ff(0x53c),_0xe356ff(0x1ee),_0xe356ff(0x45e),'CAPSLOCK',_0xe356ff(0x25a),'EISU',_0xe356ff(0x544),_0xe356ff(0x554),_0xe356ff(0x4b4),'',_0xe356ff(0x572),_0xe356ff(0x22c),_0xe356ff(0x5fa),_0xe356ff(0x33b),_0xe356ff(0x254),_0xe356ff(0x55f),_0xe356ff(0x585),'PGDN','END',_0xe356ff(0x57e),'LEFT','UP',_0xe356ff(0x405),_0xe356ff(0x340),_0xe356ff(0x733),_0xe356ff(0x1e9),_0xe356ff(0x33e),_0xe356ff(0x741),_0xe356ff(0x6d0),_0xe356ff(0x2b8),'','0','1','2','3','4','5','6','7','8','9','COLON',_0xe356ff(0x1be),'LESS_THAN','EQUALS',_0xe356ff(0x246),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0xe356ff(0x52a),'','SLEEP',_0xe356ff(0x394),_0xe356ff(0x4e1),_0xe356ff(0x45c),_0xe356ff(0x55b),_0xe356ff(0x61c),_0xe356ff(0x739),'NUMPAD6',_0xe356ff(0x549),_0xe356ff(0x663),_0xe356ff(0x3ca),_0xe356ff(0x27b),'ADD',_0xe356ff(0x21b),_0xe356ff(0x242),_0xe356ff(0x3c1),_0xe356ff(0x68e),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0xe356ff(0x1fe),_0xe356ff(0x692),_0xe356ff(0x4d4),_0xe356ff(0x60a),_0xe356ff(0x467),'F15',_0xe356ff(0x1fc),_0xe356ff(0x203),'F18','F19','F20','F21','F22',_0xe356ff(0x30b),_0xe356ff(0x646),'','','','','','','','',_0xe356ff(0x3cc),'SCROLL_LOCK',_0xe356ff(0x62f),'WIN_OEM_FJ_MASSHOU',_0xe356ff(0x592),_0xe356ff(0x6b6),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0xe356ff(0x69c),'EXCLAMATION',_0xe356ff(0x6ce),_0xe356ff(0x404),'DOLLAR',_0xe356ff(0x4e5),'AMPERSAND','UNDERSCORE',_0xe356ff(0x525),_0xe356ff(0x690),_0xe356ff(0x742),_0xe356ff(0x720),'PIPE',_0xe356ff(0x3d4),_0xe356ff(0x747),_0xe356ff(0x25c),_0xe356ff(0x4b6),'','','','',_0xe356ff(0x293),_0xe356ff(0x28a),_0xe356ff(0x30a),'','',_0xe356ff(0x1be),_0xe356ff(0x67a),'COMMA',_0xe356ff(0x2cc),'PERIOD',_0xe356ff(0x1ed),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0xe356ff(0x5e4),'BACK_SLASH','CLOSE_BRACKET',_0xe356ff(0x6a6),'',_0xe356ff(0x4ff),_0xe356ff(0x359),'','WIN_ICO_HELP','WIN_ICO_00','',_0xe356ff(0x2c3),'','',_0xe356ff(0x675),_0xe356ff(0x5a2),_0xe356ff(0x612),_0xe356ff(0x6cb),_0xe356ff(0x6f2),_0xe356ff(0x5b2),_0xe356ff(0x73d),_0xe356ff(0x2a5),'WIN_OEM_FINISH','WIN_OEM_COPY','WIN_OEM_AUTO','WIN_OEM_ENLW',_0xe356ff(0x6e5),_0xe356ff(0x5c6),'CRSEL',_0xe356ff(0x596),'EREOF',_0xe356ff(0x460),_0xe356ff(0x1ec),'',_0xe356ff(0x5ce),'WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x3e1)][_0xe356ff(0x490)],TextManager[_0xe356ff(0x3de)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x3e1)]['CancelText'],TextManager[_0xe356ff(0x1a4)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x3e1)]['SwitchActorText'],VisuMZ['CoreEngine'][_0xe356ff(0x1fd)]=TextManager['param'],TextManager[_0xe356ff(0x4c1)]=function(_0x3ee2e3){const _0x46fd19=_0xe356ff;return typeof _0x3ee2e3==='number'?VisuMZ[_0x46fd19(0x64f)][_0x46fd19(0x1fd)][_0x46fd19(0x329)](this,_0x3ee2e3):this[_0x46fd19(0x212)](_0x3ee2e3);},TextManager[_0xe356ff(0x212)]=function(_0x5360c8){const _0x287d90=_0xe356ff;_0x5360c8=String(_0x5360c8||'')[_0x287d90(0x68f)]();const _0xfb2573=VisuMZ[_0x287d90(0x64f)][_0x287d90(0x5cf)][_0x287d90(0x366)];if(_0x5360c8===_0x287d90(0x757))return $dataSystem[_0x287d90(0x6c2)]['params'][0x0];if(_0x5360c8===_0x287d90(0x3c8))return $dataSystem[_0x287d90(0x6c2)][_0x287d90(0x709)][0x1];if(_0x5360c8===_0x287d90(0x65c))return $dataSystem[_0x287d90(0x6c2)]['params'][0x2];if(_0x5360c8===_0x287d90(0x637))return $dataSystem[_0x287d90(0x6c2)][_0x287d90(0x709)][0x3];if(_0x5360c8===_0x287d90(0x734))return $dataSystem['terms'][_0x287d90(0x709)][0x4];if(_0x5360c8==='MDF')return $dataSystem[_0x287d90(0x6c2)]['params'][0x5];if(_0x5360c8===_0x287d90(0x21a))return $dataSystem[_0x287d90(0x6c2)][_0x287d90(0x709)][0x6];if(_0x5360c8===_0x287d90(0x1c7))return $dataSystem[_0x287d90(0x6c2)][_0x287d90(0x709)][0x7];if(_0x5360c8===_0x287d90(0x19c))return _0xfb2573[_0x287d90(0x580)];if(_0x5360c8===_0x287d90(0x471))return _0xfb2573[_0x287d90(0x2f0)];if(_0x5360c8===_0x287d90(0x5fd))return _0xfb2573[_0x287d90(0x673)];if(_0x5360c8===_0x287d90(0x584))return _0xfb2573['XParamVocab3'];if(_0x5360c8===_0x287d90(0x6bd))return _0xfb2573[_0x287d90(0x28f)];if(_0x5360c8===_0x287d90(0x338))return _0xfb2573[_0x287d90(0x6bc)];if(_0x5360c8===_0x287d90(0x51d))return _0xfb2573[_0x287d90(0x507)];if(_0x5360c8===_0x287d90(0x227))return _0xfb2573[_0x287d90(0x4a0)];if(_0x5360c8===_0x287d90(0x1af))return _0xfb2573['XParamVocab8'];if(_0x5360c8===_0x287d90(0x4a1))return _0xfb2573[_0x287d90(0x209)];if(_0x5360c8==='TGR')return _0xfb2573[_0x287d90(0x63d)];if(_0x5360c8===_0x287d90(0x6be))return _0xfb2573['SParamVocab1'];if(_0x5360c8===_0x287d90(0x420))return _0xfb2573['SParamVocab2'];if(_0x5360c8===_0x287d90(0x5ac))return _0xfb2573[_0x287d90(0x4d0)];if(_0x5360c8===_0x287d90(0x756))return _0xfb2573[_0x287d90(0x2da)];if(_0x5360c8===_0x287d90(0x50e))return _0xfb2573[_0x287d90(0x223)];if(_0x5360c8===_0x287d90(0x49e))return _0xfb2573['SParamVocab6'];if(_0x5360c8===_0x287d90(0x1a0))return _0xfb2573[_0x287d90(0x25f)];if(_0x5360c8===_0x287d90(0x53f))return _0xfb2573['SParamVocab8'];if(_0x5360c8===_0x287d90(0x6f5))return _0xfb2573[_0x287d90(0x444)];if(VisuMZ[_0x287d90(0x64f)][_0x287d90(0x61a)][_0x5360c8])return VisuMZ[_0x287d90(0x64f)][_0x287d90(0x61a)][_0x5360c8];return'';},TextManager['getInputButtonString']=function(_0x4cba89){const _0xfd6c5=_0xe356ff;if(_0x4cba89==='cancel')_0x4cba89=_0xfd6c5(0x1da);let _0x1e73d7=[];for(let _0x48ba92 in Input['keyMapper']){_0x48ba92=Number(_0x48ba92);if(_0x48ba92>=0x60&&_0x48ba92<=0x69)continue;if([0x12,0x20][_0xfd6c5(0x416)](_0x48ba92))continue;_0x4cba89===Input['keyMapper'][_0x48ba92]&&_0x1e73d7[_0xfd6c5(0x62d)](_0x48ba92);}for(let _0x2045f1=0x0;_0x2045f1<_0x1e73d7[_0xfd6c5(0x437)];_0x2045f1++){_0x1e73d7[_0x2045f1]=TextManager[_0xfd6c5(0x280)][_0x1e73d7[_0x2045f1]];}return this['makeInputButtonString'](_0x1e73d7);},TextManager[_0xe356ff(0x3d9)]=function(_0x579c50){const _0x204261=_0xe356ff,_0x22379b=VisuMZ[_0x204261(0x64f)]['Settings']['ButtonAssist'],_0x2d3ce4=_0x22379b[_0x204261(0x4b9)],_0x8bd4b7=_0x579c50[_0x204261(0x423)](),_0x1f70bc=_0x204261(0x5f4)['format'](_0x8bd4b7);return _0x22379b[_0x1f70bc]?_0x22379b[_0x1f70bc]:_0x2d3ce4[_0x204261(0x560)](_0x8bd4b7);},TextManager['getInputMultiButtonStrings']=function(_0x8ccea9,_0x9647c4){const _0x2532c6=_0xe356ff,_0x5a1121=VisuMZ[_0x2532c6(0x64f)]['Settings'][_0x2532c6(0x3e1)],_0x295956=_0x5a1121[_0x2532c6(0x309)],_0x2601b1=this['getInputButtonString'](_0x8ccea9),_0x27a372=this[_0x2532c6(0x2c5)](_0x9647c4);return _0x295956[_0x2532c6(0x560)](_0x2601b1,_0x27a372);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x43c)]=ColorManager[_0xe356ff(0x386)],ColorManager[_0xe356ff(0x386)]=function(){const _0x5820b1=_0xe356ff;VisuMZ['CoreEngine']['ColorManager_loadWindowskin'][_0x5820b1(0x329)](this),this[_0x5820b1(0x4c0)]=this['_colorCache']||{};},ColorManager[_0xe356ff(0x6ab)]=function(_0x1385de,_0x581656){const _0x4f8f32=_0xe356ff;return _0x581656=String(_0x581656),this[_0x4f8f32(0x4c0)]=this[_0x4f8f32(0x4c0)]||{},_0x581656[_0x4f8f32(0x211)](/#(.*)/i)?this[_0x4f8f32(0x4c0)][_0x1385de]=_0x4f8f32(0x63c)[_0x4f8f32(0x560)](String(RegExp['$1'])):this[_0x4f8f32(0x4c0)][_0x1385de]=this[_0x4f8f32(0x1a1)](Number(_0x581656)),this['_colorCache'][_0x1385de];},ColorManager[_0xe356ff(0x594)]=function(_0x2ccb1b){const _0x478c56=_0xe356ff;return _0x2ccb1b=String(_0x2ccb1b),_0x2ccb1b[_0x478c56(0x211)](/#(.*)/i)?_0x478c56(0x63c)[_0x478c56(0x560)](String(RegExp['$1'])):this[_0x478c56(0x1a1)](Number(_0x2ccb1b));},ColorManager[_0xe356ff(0x1a3)]=function(){const _0x51c408=_0xe356ff;this[_0x51c408(0x4c0)]={};},ColorManager[_0xe356ff(0x303)]=function(){const _0x4c9028=_0xe356ff,_0x177771=_0x4c9028(0x33a);this['_colorCache']=this[_0x4c9028(0x4c0)]||{};if(this[_0x4c9028(0x4c0)][_0x177771])return this[_0x4c9028(0x4c0)][_0x177771];const _0x3ff001=VisuMZ[_0x4c9028(0x64f)]['Settings'][_0x4c9028(0x204)][_0x4c9028(0x1b5)];return this[_0x4c9028(0x6ab)](_0x177771,_0x3ff001);},ColorManager['systemColor']=function(){const _0x1e4578=_0xe356ff,_0x551817=_0x1e4578(0x3d0);this['_colorCache']=this[_0x1e4578(0x4c0)]||{};if(this['_colorCache'][_0x551817])return this['_colorCache'][_0x551817];const _0x236bfb=VisuMZ['CoreEngine'][_0x1e4578(0x5cf)]['Color'][_0x1e4578(0x19d)];return this[_0x1e4578(0x6ab)](_0x551817,_0x236bfb);},ColorManager[_0xe356ff(0x436)]=function(){const _0x223804=_0xe356ff,_0x54a39f=_0x223804(0x202);this[_0x223804(0x4c0)]=this[_0x223804(0x4c0)]||{};if(this[_0x223804(0x4c0)][_0x54a39f])return this['_colorCache'][_0x54a39f];const _0x527dca=VisuMZ['CoreEngine'][_0x223804(0x5cf)][_0x223804(0x204)]['ColorCrisis'];return this[_0x223804(0x6ab)](_0x54a39f,_0x527dca);},ColorManager['deathColor']=function(){const _0x395429=_0xe356ff,_0x17fcbf=_0x395429(0x2b4);this[_0x395429(0x4c0)]=this[_0x395429(0x4c0)]||{};if(this[_0x395429(0x4c0)][_0x17fcbf])return this['_colorCache'][_0x17fcbf];const _0x77a520=VisuMZ[_0x395429(0x64f)][_0x395429(0x5cf)][_0x395429(0x204)][_0x395429(0x515)];return this['getColorDataFromPluginParameters'](_0x17fcbf,_0x77a520);},ColorManager[_0xe356ff(0x6ba)]=function(){const _0x38960b=_0xe356ff,_0x589752=_0x38960b(0x6da);this[_0x38960b(0x4c0)]=this[_0x38960b(0x4c0)]||{};if(this[_0x38960b(0x4c0)][_0x589752])return this[_0x38960b(0x4c0)][_0x589752];const _0x2dcdd3=VisuMZ[_0x38960b(0x64f)][_0x38960b(0x5cf)]['Color']['ColorGaugeBack'];return this[_0x38960b(0x6ab)](_0x589752,_0x2dcdd3);},ColorManager[_0xe356ff(0x6c9)]=function(){const _0xe0f658=_0xe356ff,_0x32fe9f=_0xe0f658(0x6e9);this[_0xe0f658(0x4c0)]=this['_colorCache']||{};if(this[_0xe0f658(0x4c0)][_0x32fe9f])return this[_0xe0f658(0x4c0)][_0x32fe9f];const _0x13aac1=VisuMZ[_0xe0f658(0x64f)]['Settings']['Color'][_0xe0f658(0x5ca)];return this[_0xe0f658(0x6ab)](_0x32fe9f,_0x13aac1);},ColorManager[_0xe356ff(0x1db)]=function(){const _0x4cd6b2=_0xe356ff,_0x32bd26=_0x4cd6b2(0x39c);this[_0x4cd6b2(0x4c0)]=this[_0x4cd6b2(0x4c0)]||{};if(this[_0x4cd6b2(0x4c0)][_0x32bd26])return this[_0x4cd6b2(0x4c0)][_0x32bd26];const _0x1c40df=VisuMZ[_0x4cd6b2(0x64f)]['Settings'][_0x4cd6b2(0x204)]['ColorHPGauge2'];return this[_0x4cd6b2(0x6ab)](_0x32bd26,_0x1c40df);},ColorManager[_0xe356ff(0x70c)]=function(){const _0x216ff7=_0xe356ff,_0x3fc146='_stored_mpGaugeColor1';this['_colorCache']=this[_0x216ff7(0x4c0)]||{};if(this[_0x216ff7(0x4c0)][_0x3fc146])return this[_0x216ff7(0x4c0)][_0x3fc146];const _0x43a37f=VisuMZ[_0x216ff7(0x64f)][_0x216ff7(0x5cf)][_0x216ff7(0x204)][_0x216ff7(0x6c5)];return this[_0x216ff7(0x6ab)](_0x3fc146,_0x43a37f);},ColorManager[_0xe356ff(0x1cb)]=function(){const _0x30ba76=_0xe356ff,_0x28db57=_0x30ba76(0x3ba);this[_0x30ba76(0x4c0)]=this[_0x30ba76(0x4c0)]||{};if(this[_0x30ba76(0x4c0)][_0x28db57])return this[_0x30ba76(0x4c0)][_0x28db57];const _0x46212c=VisuMZ[_0x30ba76(0x64f)]['Settings'][_0x30ba76(0x204)][_0x30ba76(0x694)];return this['getColorDataFromPluginParameters'](_0x28db57,_0x46212c);},ColorManager['mpCostColor']=function(){const _0x37846b=_0xe356ff,_0x5451b7=_0x37846b(0x2ca);this['_colorCache']=this[_0x37846b(0x4c0)]||{};if(this['_colorCache'][_0x5451b7])return this['_colorCache'][_0x5451b7];const _0x108c29=VisuMZ[_0x37846b(0x64f)]['Settings'][_0x37846b(0x204)][_0x37846b(0x670)];return this['getColorDataFromPluginParameters'](_0x5451b7,_0x108c29);},ColorManager[_0xe356ff(0x3c2)]=function(){const _0x3a002c=_0xe356ff,_0x1babcd='_stored_powerUpColor';this[_0x3a002c(0x4c0)]=this['_colorCache']||{};if(this['_colorCache'][_0x1babcd])return this['_colorCache'][_0x1babcd];const _0x506859=VisuMZ[_0x3a002c(0x64f)][_0x3a002c(0x5cf)]['Color']['ColorPowerUp'];return this['getColorDataFromPluginParameters'](_0x1babcd,_0x506859);},ColorManager[_0xe356ff(0x347)]=function(){const _0x3ab60c=_0xe356ff,_0x44f475=_0x3ab60c(0x727);this[_0x3ab60c(0x4c0)]=this['_colorCache']||{};if(this['_colorCache'][_0x44f475])return this[_0x3ab60c(0x4c0)][_0x44f475];const _0x541c85=VisuMZ['CoreEngine']['Settings'][_0x3ab60c(0x204)][_0x3ab60c(0x1dd)];return this[_0x3ab60c(0x6ab)](_0x44f475,_0x541c85);},ColorManager['ctGaugeColor1']=function(){const _0x54680c=_0xe356ff,_0x766bd1=_0x54680c(0x4f2);this[_0x54680c(0x4c0)]=this[_0x54680c(0x4c0)]||{};if(this[_0x54680c(0x4c0)][_0x766bd1])return this[_0x54680c(0x4c0)][_0x766bd1];const _0xa8195f=VisuMZ['CoreEngine']['Settings'][_0x54680c(0x204)]['ColorCTGauge1'];return this[_0x54680c(0x6ab)](_0x766bd1,_0xa8195f);},ColorManager[_0xe356ff(0x715)]=function(){const _0x220914=_0xe356ff,_0x27c690=_0x220914(0x5e3);this['_colorCache']=this['_colorCache']||{};if(this[_0x220914(0x4c0)][_0x27c690])return this[_0x220914(0x4c0)][_0x27c690];const _0x321d19=VisuMZ['CoreEngine'][_0x220914(0x5cf)][_0x220914(0x204)][_0x220914(0x1f0)];return this[_0x220914(0x6ab)](_0x27c690,_0x321d19);},ColorManager[_0xe356ff(0x4fa)]=function(){const _0x195d98=_0xe356ff,_0x37bc8d=_0x195d98(0x524);this[_0x195d98(0x4c0)]=this['_colorCache']||{};if(this['_colorCache'][_0x37bc8d])return this['_colorCache'][_0x37bc8d];const _0x6cf6ff=VisuMZ[_0x195d98(0x64f)][_0x195d98(0x5cf)][_0x195d98(0x204)][_0x195d98(0x721)];return this['getColorDataFromPluginParameters'](_0x37bc8d,_0x6cf6ff);},ColorManager[_0xe356ff(0x59b)]=function(){const _0x10e98e=_0xe356ff,_0x172811=_0x10e98e(0x438);this[_0x10e98e(0x4c0)]=this[_0x10e98e(0x4c0)]||{};if(this['_colorCache'][_0x172811])return this[_0x10e98e(0x4c0)][_0x172811];const _0x30241a=VisuMZ['CoreEngine'][_0x10e98e(0x5cf)][_0x10e98e(0x204)][_0x10e98e(0x1b7)];return this[_0x10e98e(0x6ab)](_0x172811,_0x30241a);},ColorManager[_0xe356ff(0x581)]=function(){const _0x4075e3=_0xe356ff,_0x424779='_stored_tpCostColor';this['_colorCache']=this['_colorCache']||{};if(this[_0x4075e3(0x4c0)][_0x424779])return this['_colorCache'][_0x424779];const _0x174ff6=VisuMZ[_0x4075e3(0x64f)]['Settings'][_0x4075e3(0x204)]['ColorTPCost'];return this[_0x4075e3(0x6ab)](_0x424779,_0x174ff6);},ColorManager[_0xe356ff(0x1b1)]=function(){const _0x2f08e9=_0xe356ff,_0x202e96='_stored_pendingColor';this[_0x2f08e9(0x4c0)]=this[_0x2f08e9(0x4c0)]||{};if(this[_0x2f08e9(0x4c0)][_0x202e96])return this[_0x2f08e9(0x4c0)][_0x202e96];const _0x56a799=VisuMZ['CoreEngine'][_0x2f08e9(0x5cf)][_0x2f08e9(0x204)]['ColorTPCost'];return this[_0x2f08e9(0x6ab)](_0x202e96,_0x56a799);},ColorManager[_0xe356ff(0x2fb)]=function(){const _0x4f92dc=_0xe356ff,_0x3595c1=_0x4f92dc(0x516);this[_0x4f92dc(0x4c0)]=this[_0x4f92dc(0x4c0)]||{};if(this['_colorCache'][_0x3595c1])return this[_0x4f92dc(0x4c0)][_0x3595c1];const _0x53ced1=VisuMZ['CoreEngine'][_0x4f92dc(0x5cf)][_0x4f92dc(0x204)][_0x4f92dc(0x219)];return this[_0x4f92dc(0x6ab)](_0x3595c1,_0x53ced1);},ColorManager[_0xe356ff(0x5b9)]=function(){const _0x329a21=_0xe356ff,_0x26e142=_0x329a21(0x466);this[_0x329a21(0x4c0)]=this[_0x329a21(0x4c0)]||{};if(this[_0x329a21(0x4c0)][_0x26e142])return this['_colorCache'][_0x26e142];const _0x18104b=VisuMZ['CoreEngine']['Settings'][_0x329a21(0x204)][_0x329a21(0x6b5)];return this['getColorDataFromPluginParameters'](_0x26e142,_0x18104b);},ColorManager[_0xe356ff(0x5e2)]=function(){const _0x23edcf=_0xe356ff,_0x4a2e6c=_0x23edcf(0x3ae);this['_colorCache']=this[_0x23edcf(0x4c0)]||{};if(this[_0x23edcf(0x4c0)][_0x4a2e6c])return this[_0x23edcf(0x4c0)][_0x4a2e6c];const _0x195a4e=VisuMZ[_0x23edcf(0x64f)]['Settings'][_0x23edcf(0x204)][_0x23edcf(0x3e8)];return this[_0x23edcf(0x6ab)](_0x4a2e6c,_0x195a4e);},ColorManager[_0xe356ff(0x570)]=function(){const _0x4f8ee2=_0xe356ff,_0x175200=_0x4f8ee2(0x6e0);this[_0x4f8ee2(0x4c0)]=this[_0x4f8ee2(0x4c0)]||{};if(this['_colorCache'][_0x175200])return this[_0x4f8ee2(0x4c0)][_0x175200];const _0x523d14=VisuMZ[_0x4f8ee2(0x64f)]['Settings'][_0x4f8ee2(0x204)][_0x4f8ee2(0x597)];return this['getColorDataFromPluginParameters'](_0x175200,_0x523d14);},ColorManager[_0xe356ff(0x42a)]=function(_0x35b95f){const _0x2fe48c=_0xe356ff;return VisuMZ[_0x2fe48c(0x64f)][_0x2fe48c(0x5cf)][_0x2fe48c(0x204)][_0x2fe48c(0x4e7)][_0x2fe48c(0x329)](this,_0x35b95f);},ColorManager[_0xe356ff(0x31e)]=function(_0x3f8e1e){const _0x3f6903=_0xe356ff;return VisuMZ[_0x3f6903(0x64f)][_0x3f6903(0x5cf)][_0x3f6903(0x204)]['ActorMPColor'][_0x3f6903(0x329)](this,_0x3f8e1e);},ColorManager[_0xe356ff(0x65a)]=function(_0xccf815){const _0x52d035=_0xe356ff;return VisuMZ[_0x52d035(0x64f)][_0x52d035(0x5cf)][_0x52d035(0x204)][_0x52d035(0x469)][_0x52d035(0x329)](this,_0xccf815);},ColorManager['paramchangeTextColor']=function(_0x26b92d){const _0xd58405=_0xe356ff;return VisuMZ[_0xd58405(0x64f)][_0xd58405(0x5cf)][_0xd58405(0x204)][_0xd58405(0x5ed)][_0xd58405(0x329)](this,_0x26b92d);},ColorManager[_0xe356ff(0x435)]=function(_0x15a44a){const _0x4e9ad0=_0xe356ff;return VisuMZ[_0x4e9ad0(0x64f)][_0x4e9ad0(0x5cf)][_0x4e9ad0(0x204)][_0x4e9ad0(0x268)]['call'](this,_0x15a44a);},ColorManager[_0xe356ff(0x1f9)]=function(){const _0x69ac25=_0xe356ff;return VisuMZ['CoreEngine'][_0x69ac25(0x5cf)]['Color'][_0x69ac25(0x4ea)];},ColorManager['outlineColorDmg']=function(){const _0x2531f8=_0xe356ff;return VisuMZ[_0x2531f8(0x64f)][_0x2531f8(0x5cf)][_0x2531f8(0x204)][_0x2531f8(0x711)]||_0x2531f8(0x2a4);},ColorManager['outlineColorGauge']=function(){const _0x32ef84=_0xe356ff;return VisuMZ['CoreEngine']['Settings'][_0x32ef84(0x204)][_0x32ef84(0x6e2)]||_0x32ef84(0x6db);},ColorManager[_0xe356ff(0x1bb)]=function(){const _0x486d52=_0xe356ff;return VisuMZ[_0x486d52(0x64f)]['Settings']['Color'][_0x486d52(0x676)];},ColorManager[_0xe356ff(0x344)]=function(){const _0x103eb8=_0xe356ff;return VisuMZ['CoreEngine'][_0x103eb8(0x5cf)]['Color'][_0x103eb8(0x47f)];},ColorManager[_0xe356ff(0x6a3)]=function(){const _0x3d0686=_0xe356ff;return VisuMZ[_0x3d0686(0x64f)][_0x3d0686(0x5cf)]['Color'][_0x3d0686(0x29f)];},ColorManager[_0xe356ff(0x732)]=function(){const _0x4e79da=_0xe356ff;return VisuMZ[_0x4e79da(0x64f)][_0x4e79da(0x5cf)]['Color'][_0x4e79da(0x6ec)];},SceneManager[_0xe356ff(0x6b2)]=[],VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x514)]=SceneManager[_0xe356ff(0x374)],SceneManager['initialize']=function(){const _0x4d85d7=_0xe356ff;VisuMZ['CoreEngine'][_0x4d85d7(0x514)][_0x4d85d7(0x329)](this),this[_0x4d85d7(0x2a1)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6bf)]=SceneManager[_0xe356ff(0x228)],SceneManager['onKeyDown']=function(_0x5f091a){const _0x10e69b=_0xe356ff;if($gameTemp)this['onKeyDownKeysF6F7'](_0x5f091a);VisuMZ[_0x10e69b(0x64f)]['SceneManager_onKeyDown'][_0x10e69b(0x329)](this,_0x5f091a);},SceneManager['onKeyDownKeysF6F7']=function(_0x16267){const _0x40ce2d=_0xe356ff;if(!_0x16267['ctrlKey']&&!_0x16267[_0x40ce2d(0x6e4)])switch(_0x16267[_0x40ce2d(0x33f)]){case 0x75:this[_0x40ce2d(0x54f)]();break;case 0x76:if(Input[_0x40ce2d(0x1f7)](_0x40ce2d(0x229))||Input['isPressed'](_0x40ce2d(0x593)))return;this[_0x40ce2d(0x3ac)]();break;}},SceneManager[_0xe356ff(0x54f)]=function(){const _0x41631d=_0xe356ff;if($gameTemp[_0x41631d(0x424)]()&&VisuMZ[_0x41631d(0x64f)][_0x41631d(0x5cf)][_0x41631d(0x69e)][_0x41631d(0x542)]){ConfigManager['seVolume']!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x41631d(0x6ae)]=0x0,ConfigManager[_0x41631d(0x72c)]=0x0,ConfigManager[_0x41631d(0x649)]=0x0):(ConfigManager[_0x41631d(0x2cb)]=0x64,ConfigManager[_0x41631d(0x6ae)]=0x64,ConfigManager[_0x41631d(0x72c)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager['save']();if(this[_0x41631d(0x6d2)][_0x41631d(0x255)]===Scene_Options){if(this['_scene'][_0x41631d(0x384)])this['_scene'][_0x41631d(0x384)]['refresh']();if(this[_0x41631d(0x6d2)][_0x41631d(0x724)])this[_0x41631d(0x6d2)][_0x41631d(0x724)][_0x41631d(0x468)]();}}},SceneManager[_0xe356ff(0x3ac)]=function(){const _0x2be066=_0xe356ff;$gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0x2be066(0x5cf)][_0x2be066(0x69e)][_0x2be066(0x393)]&&($gameTemp[_0x2be066(0x627)]=!$gameTemp[_0x2be066(0x627)]);},SceneManager[_0xe356ff(0x2a1)]=function(){const _0x56f705=_0xe356ff;this[_0x56f705(0x385)]=![],this[_0x56f705(0x689)]=!VisuMZ[_0x56f705(0x64f)][_0x56f705(0x5cf)]['UI'][_0x56f705(0x546)];},SceneManager['setSideButtonLayout']=function(_0x28b1c3){const _0x5d5410=_0xe356ff;VisuMZ[_0x5d5410(0x64f)][_0x5d5410(0x5cf)]['UI'][_0x5d5410(0x29b)]&&(this[_0x5d5410(0x385)]=_0x28b1c3);},SceneManager[_0xe356ff(0x37f)]=function(){const _0x4172db=_0xe356ff;return this[_0x4172db(0x385)];},SceneManager['areButtonsHidden']=function(){const _0xfd5305=_0xe356ff;return this[_0xfd5305(0x689)];},SceneManager[_0xe356ff(0x5d4)]=function(){const _0xba0bad=_0xe356ff;return this[_0xba0bad(0x47c)]()||this[_0xba0bad(0x37f)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x71f)]=SceneManager[_0xe356ff(0x205)],SceneManager[_0xe356ff(0x205)]=function(){const _0x1eb5de=_0xe356ff;return VisuMZ['CoreEngine'][_0x1eb5de(0x5cf)][_0x1eb5de(0x69e)][_0x1eb5de(0x448)]?VisuMZ[_0x1eb5de(0x64f)][_0x1eb5de(0x71f)][_0x1eb5de(0x329)](this):!![];},SceneManager['catchException']=function(_0x134efb){const _0x373653=_0xe356ff;if(_0x134efb instanceof Error)this[_0x373653(0x283)](_0x134efb);else _0x134efb instanceof Array&&_0x134efb[0x0]==='LoadError'?this[_0x373653(0x2cf)](_0x134efb):this[_0x373653(0x330)](_0x134efb);this[_0x373653(0x36c)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x310)]=BattleManager[_0xe356ff(0x332)],BattleManager[_0xe356ff(0x332)]=function(){const _0x4d47b6=_0xe356ff;if(VisuMZ['CoreEngine']['Settings'][_0x4d47b6(0x69e)][_0x4d47b6(0x2eb)])this[_0x4d47b6(0x6d8)]();else return VisuMZ[_0x4d47b6(0x64f)]['BattleManager_processEscape']['call'](this);},BattleManager[_0xe356ff(0x6d8)]=function(){return $gameParty['performEscape'](),SoundManager['playEscape'](),this['onEscapeSuccess'](),!![];},BattleManager['isTpb']=function(){const _0x9acb6=_0xe356ff;return $gameSystem[_0x9acb6(0x3fb)]()>=0x1;},BattleManager[_0xe356ff(0x5f2)]=function(){const _0x2676d2=_0xe356ff;return $gameSystem[_0x2676d2(0x3fb)]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp['prototype'][_0xe356ff(0x374)],Game_Temp[_0xe356ff(0x4e8)]['initialize']=function(){const _0x2f1a68=_0xe356ff;VisuMZ['CoreEngine'][_0x2f1a68(0x397)][_0x2f1a68(0x329)](this),this[_0x2f1a68(0x27e)](),this['createFauxAnimationQueue']();},Game_Temp[_0xe356ff(0x4e8)][_0xe356ff(0x27e)]=function(){const _0x4b3118=_0xe356ff;VisuMZ['CoreEngine'][_0x4b3118(0x5cf)][_0x4b3118(0x69e)][_0x4b3118(0x1bf)]&&(this[_0x4b3118(0x522)]=![]);},Game_Temp[_0xe356ff(0x4e8)][_0xe356ff(0x23b)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0xe356ff(0x4e8)]['requestFauxAnimation']=function(_0x222977,_0x1d3d72,_0x5ef07d,_0x30d360){const _0xfcc03b=_0xe356ff;if(!this[_0xfcc03b(0x25e)]())return;_0x5ef07d=_0x5ef07d||![],_0x30d360=_0x30d360||![];if($dataAnimations[_0x1d3d72]){const _0x4edfc3={'targets':_0x222977,'animationId':_0x1d3d72,'mirror':_0x5ef07d,'mute':_0x30d360};this[_0xfcc03b(0x57a)][_0xfcc03b(0x62d)](_0x4edfc3);for(const _0x222fd4 of _0x222977){_0x222fd4['startAnimation']&&_0x222fd4[_0xfcc03b(0x512)]();}}},Game_Temp['prototype']['showFauxAnimations']=function(){return!![];},Game_Temp[_0xe356ff(0x4e8)][_0xe356ff(0x5b6)]=function(){const _0x284fd6=_0xe356ff;return this['_fauxAnimationQueue'][_0x284fd6(0x229)]();},Game_Temp[_0xe356ff(0x4e8)][_0xe356ff(0x40b)]=function(_0x498f27){this['_lastPluginCommandInterpreter']=_0x498f27;},Game_Temp[_0xe356ff(0x4e8)][_0xe356ff(0x294)]=function(){const _0x4b2320=_0xe356ff;return this[_0x4b2320(0x2c0)];},Game_Temp[_0xe356ff(0x4e8)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x520ae4=_0xe356ff;this[_0x520ae4(0x723)]=undefined,this[_0x520ae4(0x4f0)]=undefined;},Game_Temp[_0xe356ff(0x4e8)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x53d951){const _0x4be2a8=_0xe356ff;$gameMap&&$dataMap&&$dataMap[_0x4be2a8(0x2e6)]&&this[_0x4be2a8(0x4f3)]($dataMap[_0x4be2a8(0x2e6)]);const _0x1afcc7=$dataTroops[_0x53d951];_0x1afcc7&&this['parseForcedGameTroopSettingsCoreEngine'](_0x1afcc7[_0x4be2a8(0x639)]);},Game_Temp[_0xe356ff(0x4e8)][_0xe356ff(0x4f3)]=function(_0x87fd3){const _0x51469c=_0xe356ff;if(!_0x87fd3)return;if(_0x87fd3['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x51469c(0x723)]='FV';else{if(_0x87fd3[_0x51469c(0x211)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x51469c(0x723)]='SV';else{if(_0x87fd3['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2c4817=String(RegExp['$1']);if(_0x2c4817[_0x51469c(0x211)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x51469c(0x723)]='FV';else _0x2c4817['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x87fd3[_0x51469c(0x211)](/<(?:DTB)>/i))this[_0x51469c(0x4f0)]=0x0;else{if(_0x87fd3['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x51469c(0x4f0)]=0x1;else{if(_0x87fd3['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x87fd3[_0x51469c(0x211)](/<(?:CTB)>/i))Imported[_0x51469c(0x20d)]&&(this['_forcedBattleSys']='CTB');else{if(_0x87fd3[_0x51469c(0x211)](/<(?:STB)>/i))Imported[_0x51469c(0x364)]&&(this[_0x51469c(0x4f0)]='STB');else{if(_0x87fd3[_0x51469c(0x211)](/<(?:BTB)>/i))Imported[_0x51469c(0x66a)]&&(this[_0x51469c(0x4f0)]=_0x51469c(0x292));else{if(_0x87fd3['match'](/<(?:FTB)>/i))Imported[_0x51469c(0x57b)]&&(this[_0x51469c(0x4f0)]=_0x51469c(0x6cd));else{if(_0x87fd3[_0x51469c(0x211)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x256e49=String(RegExp['$1']);if(_0x256e49[_0x51469c(0x211)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x256e49[_0x51469c(0x211)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x256e49[_0x51469c(0x211)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x51469c(0x4f0)]=0x2;else{if(_0x256e49[_0x51469c(0x211)](/CTB/i))Imported[_0x51469c(0x20d)]&&(this['_forcedBattleSys']=_0x51469c(0x2c9));else{if(_0x256e49[_0x51469c(0x211)](/STB/i))Imported[_0x51469c(0x364)]&&(this['_forcedBattleSys']=_0x51469c(0x4eb));else{if(_0x256e49[_0x51469c(0x211)](/BTB/i))Imported[_0x51469c(0x66a)]&&(this[_0x51469c(0x4f0)]='BTB');else _0x256e49[_0x51469c(0x211)](/FTB/i)&&(Imported[_0x51469c(0x57b)]&&(this['_forcedBattleSys']=_0x51469c(0x6cd)));}}}}}}}}}}}}}},VisuMZ['CoreEngine'][_0xe356ff(0x486)]=Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Game_System[_0xe356ff(0x4e8)]['initialize']=function(){const _0x14c436=_0xe356ff;VisuMZ['CoreEngine'][_0x14c436(0x486)]['call'](this),this[_0x14c436(0x1fa)]();},Game_System['prototype'][_0xe356ff(0x1fa)]=function(){const _0x26dfea=_0xe356ff;this[_0x26dfea(0x5d8)]={'SideView':$dataSystem[_0x26dfea(0x1f4)],'BattleSystem':this[_0x26dfea(0x44a)](),'FontSize':$dataSystem['advanced']['fontSize'],'Padding':0xc};},Game_System[_0xe356ff(0x4e8)]['isSideView']=function(){const _0x42e1b3=_0xe356ff;if($gameTemp[_0x42e1b3(0x723)]==='SV')return!![];else{if($gameTemp[_0x42e1b3(0x723)]==='FV')return![];}if(this[_0x42e1b3(0x5d8)]===undefined)this[_0x42e1b3(0x1fa)]();if(this[_0x42e1b3(0x5d8)]['SideView']===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x42e1b3(0x295)];},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x54e)]=function(_0x5a4049){const _0x23a232=_0xe356ff;if(this['_CoreEngineSettings']===undefined)this[_0x23a232(0x1fa)]();if(this[_0x23a232(0x5d8)]['SideView']===undefined)this[_0x23a232(0x1fa)]();this[_0x23a232(0x5d8)][_0x23a232(0x295)]=_0x5a4049;},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x2bb)]=function(){const _0x1680e0=_0xe356ff;if(this[_0x1680e0(0x5d8)]===undefined)this[_0x1680e0(0x1fa)]();this[_0x1680e0(0x5d8)][_0x1680e0(0x59a)]=this[_0x1680e0(0x44a)]();},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x44a)]=function(){const _0x3a7838=_0xe356ff,_0xfc5fd2=(VisuMZ[_0x3a7838(0x64f)]['Settings'][_0x3a7838(0x59a)]||'DATABASE')['toUpperCase']()[_0x3a7838(0x758)]();return VisuMZ[_0x3a7838(0x64f)][_0x3a7838(0x275)](_0xfc5fd2);},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x3fb)]=function(){const _0x304a51=_0xe356ff;if($gameTemp[_0x304a51(0x4f0)]!==undefined)return $gameTemp[_0x304a51(0x4f0)];if(this[_0x304a51(0x5d8)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x304a51(0x2bb)]();return this[_0x304a51(0x5d8)]['BattleSystem'];},Game_System[_0xe356ff(0x4e8)]['setBattleSystem']=function(_0x418b7d){const _0x511b6f=_0xe356ff;if(this['_CoreEngineSettings']===undefined)this[_0x511b6f(0x1fa)]();if(this['_CoreEngineSettings'][_0x511b6f(0x59a)]===undefined)this[_0x511b6f(0x2bb)]();this[_0x511b6f(0x5d8)]['BattleSystem']=_0x418b7d;},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x64b)]=function(){const _0x161252=_0xe356ff;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x161252(0x341)]===undefined)this['initCoreEngine']();return this[_0x161252(0x5d8)][_0x161252(0x341)];},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x3a7)]=function(_0x561689){const _0x261026=_0xe356ff;if(this[_0x261026(0x5d8)]===undefined)this[_0x261026(0x1fa)]();if(this[_0x261026(0x5d8)]['TimeProgress']===undefined)this[_0x261026(0x1fa)]();this[_0x261026(0x5d8)]['FontSize']=_0x561689;},Game_System['prototype'][_0xe356ff(0x67f)]=function(){const _0x27858f=_0xe356ff;if(this[_0x27858f(0x5d8)]===undefined)this[_0x27858f(0x1fa)]();if(this['_CoreEngineSettings'][_0x27858f(0x3b0)]===undefined)this[_0x27858f(0x1fa)]();return this[_0x27858f(0x5d8)][_0x27858f(0x3b0)];},Game_System[_0xe356ff(0x4e8)][_0xe356ff(0x307)]=function(_0x540b93){const _0x144b3a=_0xe356ff;if(this[_0x144b3a(0x5d8)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x144b3a(0x658)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x144b3a(0x3b0)]=_0x540b93;},VisuMZ['CoreEngine'][_0xe356ff(0x43a)]=Game_Screen[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Game_Screen['prototype'][_0xe356ff(0x374)]=function(){const _0x45af62=_0xe356ff;VisuMZ['CoreEngine'][_0x45af62(0x43a)][_0x45af62(0x329)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0xe356ff(0x4e8)][_0xe356ff(0x279)]=function(){const _0x38262a=_0xe356ff,_0x80cf08=VisuMZ['CoreEngine'][_0x38262a(0x5cf)][_0x38262a(0x5c1)];this[_0x38262a(0x36f)]=_0x80cf08?.[_0x38262a(0x3f0)]||_0x38262a(0x3c0);},Game_Screen[_0xe356ff(0x4e8)][_0xe356ff(0x503)]=function(){const _0x4a5a3c=_0xe356ff;if(this[_0x4a5a3c(0x36f)]===undefined)this[_0x4a5a3c(0x279)]();return this[_0x4a5a3c(0x36f)];},Game_Screen[_0xe356ff(0x4e8)]['setCoreEngineScreenShakeStyle']=function(_0x7efc7a){const _0x53568c=_0xe356ff;if(this[_0x53568c(0x36f)]===undefined)this[_0x53568c(0x279)]();this[_0x53568c(0x36f)]=_0x7efc7a[_0x53568c(0x50b)]()[_0x53568c(0x758)]();},Game_Picture[_0xe356ff(0x4e8)]['isMapScrollLinked']=function(){const _0x734760=_0xe356ff;if($gameParty[_0x734760(0x382)]())return![];return this['name']()&&this[_0x734760(0x639)]()['charAt'](0x0)==='!';},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6ff)]=Game_Picture[_0xe356ff(0x4e8)]['x'],Game_Picture[_0xe356ff(0x4e8)]['x']=function(){const _0x51607f=_0xe356ff;return this[_0x51607f(0x71c)]()?this[_0x51607f(0x738)]():VisuMZ[_0x51607f(0x64f)]['Game_Picture_x'][_0x51607f(0x329)](this);},Game_Picture['prototype']['xScrollLinkedOffset']=function(){const _0x2c8bbe=_0xe356ff,_0x42cf85=$gameMap[_0x2c8bbe(0x358)]()*$gameMap['tileWidth']();return this['_x']-_0x42cf85;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6ea)]=Game_Picture[_0xe356ff(0x4e8)]['y'],Game_Picture[_0xe356ff(0x4e8)]['y']=function(){const _0x6d1a39=_0xe356ff;return this['isMapScrollLinked']()?this[_0x6d1a39(0x3a6)]():VisuMZ[_0x6d1a39(0x64f)][_0x6d1a39(0x6ea)][_0x6d1a39(0x329)](this);},Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x3a6)]=function(){const _0x3e6e97=_0xe356ff,_0x23e354=$gameMap[_0x3e6e97(0x21f)]()*$gameMap['tileHeight']();return this['_y']-_0x23e354;},Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x297)]=function(_0x371c23){const _0x348e53=_0xe356ff;this[_0x348e53(0x561)]=_0x371c23;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x1c6)]=Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x207)],Game_Picture['prototype']['calcEasing']=function(_0x2f54b7){const _0x3f7e7f=_0xe356ff;return this[_0x3f7e7f(0x561)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x3f7e7f(0x416)](this['_coreEasingType'])?VisuMZ['CoreEngine'][_0x3f7e7f(0x1c6)][_0x3f7e7f(0x329)](this,_0x2f54b7):VisuMZ[_0x3f7e7f(0x6e6)](_0x2f54b7,this[_0x3f7e7f(0x561)]);},VisuMZ['CoreEngine']['Game_Action_itemHit']=Game_Action[_0xe356ff(0x4e8)][_0xe356ff(0x387)],Game_Action[_0xe356ff(0x4e8)][_0xe356ff(0x387)]=function(_0xf58245){const _0x47d740=_0xe356ff;return VisuMZ[_0x47d740(0x64f)][_0x47d740(0x5cf)]['QoL']['ImprovedAccuracySystem']?this[_0x47d740(0x377)](_0xf58245):VisuMZ['CoreEngine']['Game_Action_itemHit'][_0x47d740(0x329)](this,_0xf58245);},Game_Action[_0xe356ff(0x4e8)]['itemHitImprovedAccuracy']=function(_0x5580fa){const _0x31a266=_0xe356ff,_0x3b8ad1=this['itemSuccessRate'](_0x5580fa),_0x13cefe=this[_0x31a266(0x51e)](_0x5580fa),_0x176940=this['targetEvaRate'](_0x5580fa);return _0x3b8ad1*(_0x13cefe-_0x176940);},VisuMZ['CoreEngine']['Game_Action_itemEva']=Game_Action['prototype'][_0xe356ff(0x52c)],Game_Action[_0xe356ff(0x4e8)]['itemEva']=function(_0x37140c){const _0x56910c=_0xe356ff;return VisuMZ[_0x56910c(0x64f)][_0x56910c(0x5cf)][_0x56910c(0x69e)][_0x56910c(0x51f)]?0x0:VisuMZ[_0x56910c(0x64f)][_0x56910c(0x2bf)]['call'](this,_0x37140c);},Game_Action[_0xe356ff(0x4e8)]['itemSuccessRate']=function(_0x1de41c){return this['item']()['successRate']*0.01;},Game_Action[_0xe356ff(0x4e8)][_0xe356ff(0x51e)]=function(_0x33572d){const _0x3af175=_0xe356ff;if(VisuMZ[_0x3af175(0x64f)][_0x3af175(0x5cf)]['QoL'][_0x3af175(0x51c)]&&this[_0x3af175(0x40e)]())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine'][_0x3af175(0x5cf)][_0x3af175(0x69e)][_0x3af175(0x51c)]&&this[_0x3af175(0x635)]()[_0x3af175(0x3fa)]()?this[_0x3af175(0x635)]()['hit']+0.05:this['subject']()[_0x3af175(0x1df)]:0x1;},Game_Action[_0xe356ff(0x4e8)]['targetEvaRate']=function(_0x44baaa){const _0x43a221=_0xe356ff;if(this['subject']()['isActor']()===_0x44baaa[_0x43a221(0x3fa)]())return 0x0;if(this[_0x43a221(0x3b5)]())return VisuMZ[_0x43a221(0x64f)][_0x43a221(0x5cf)][_0x43a221(0x69e)]['AccuracyBoost']&&_0x44baaa[_0x43a221(0x4d9)]()?_0x44baaa[_0x43a221(0x201)]-0.05:_0x44baaa['eva'];else return this['isMagical']()?_0x44baaa[_0x43a221(0x556)]:0x0;},VisuMZ['CoreEngine'][_0xe356ff(0x3bf)]=Game_Action[_0xe356ff(0x4e8)][_0xe356ff(0x2ad)],Game_Action[_0xe356ff(0x4e8)][_0xe356ff(0x2ad)]=function(_0x290535){const _0x3275cf=_0xe356ff;VisuMZ[_0x3275cf(0x64f)][_0x3275cf(0x3bf)][_0x3275cf(0x329)](this,_0x290535);if(VisuMZ[_0x3275cf(0x64f)][_0x3275cf(0x5cf)]['QoL'][_0x3275cf(0x51f)])return;const _0x390358=_0x290535[_0x3275cf(0x22b)]();_0x390358[_0x3275cf(0x6a4)]&&(0x1-this[_0x3275cf(0x52c)](_0x290535)>this[_0x3275cf(0x387)](_0x290535)&&(_0x390358[_0x3275cf(0x6a4)]=![],_0x390358[_0x3275cf(0x6fa)]=!![]));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x20a)]=Game_BattlerBase[_0xe356ff(0x4e8)]['initMembers'],Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x483)]=function(){const _0x30e9e8=_0xe356ff;this[_0x30e9e8(0x5f6)]={},VisuMZ[_0x30e9e8(0x64f)][_0x30e9e8(0x20a)]['call'](this);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x312)]=Game_BattlerBase['prototype'][_0xe356ff(0x468)],Game_BattlerBase[_0xe356ff(0x4e8)]['refresh']=function(){const _0x12fbd4=_0xe356ff;this[_0x12fbd4(0x5f6)]={},VisuMZ[_0x12fbd4(0x64f)][_0x12fbd4(0x312)][_0x12fbd4(0x329)](this);},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x1ac)]=function(_0x4625cd){const _0x3c0f97=_0xe356ff;return this['_cache']=this[_0x3c0f97(0x5f6)]||{},this[_0x3c0f97(0x5f6)][_0x4625cd]!==undefined;},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x37a)]=function(_0x19e163){const _0xe54add=_0xe356ff,_0x50446c=(_0x8649c2,_0x1a1366)=>{const _0x3daa00=_0x2e46;if(!_0x1a1366)return _0x8649c2;if(_0x1a1366[_0x3daa00(0x2e6)][_0x3daa00(0x211)](VisuMZ['CoreEngine']['RegExp'][_0x3daa00(0x37a)][_0x19e163])){var _0x21bb9a=Number(RegExp['$1']);_0x8649c2+=_0x21bb9a;}if(_0x1a1366[_0x3daa00(0x2e6)][_0x3daa00(0x211)](VisuMZ[_0x3daa00(0x64f)][_0x3daa00(0x42f)][_0x3daa00(0x3f3)][_0x19e163])){var _0x5e0745=String(RegExp['$1']);try{_0x8649c2+=eval(_0x5e0745);}catch(_0x3c3a78){if($gameTemp[_0x3daa00(0x424)]())console[_0x3daa00(0x5e9)](_0x3c3a78);}}return _0x8649c2;};return this[_0xe54add(0x4a6)]()[_0xe54add(0x370)](_0x50446c,this[_0xe54add(0x5cd)][_0x19e163]);},Game_BattlerBase['prototype'][_0xe356ff(0x3b7)]=function(_0x2f62a7){const _0x858906=_0xe356ff;var _0x199614='Basic'+(this['isActor']()?_0x858906(0x232):_0x858906(0x1d4))+_0x858906(0x1b6)+_0x2f62a7;if(this['checkCacheKey'](_0x199614))return this[_0x858906(0x5f6)][_0x199614];this['_cache'][_0x199614]=eval(VisuMZ[_0x858906(0x64f)][_0x858906(0x5cf)][_0x858906(0x366)][_0x199614]);const _0x41b323=(_0x33eaf6,_0x17ca05)=>{const _0x452266=_0x858906;if(!_0x17ca05)return _0x33eaf6;if(_0x17ca05[_0x452266(0x2e6)][_0x452266(0x211)](VisuMZ[_0x452266(0x64f)][_0x452266(0x42f)][_0x452266(0x3b7)][_0x2f62a7])){var _0x422104=Number(RegExp['$1']);if(_0x422104===0x0)_0x422104=Number[_0x452266(0x4f8)];_0x33eaf6=Math[_0x452266(0x29e)](_0x33eaf6,_0x422104);}if(_0x17ca05[_0x452266(0x2e6)][_0x452266(0x211)](VisuMZ[_0x452266(0x64f)][_0x452266(0x42f)]['paramMaxJS'][_0x2f62a7])){var _0x2e4d4e=String(RegExp['$1']);try{_0x33eaf6=Math[_0x452266(0x29e)](_0x33eaf6,Number(eval(_0x2e4d4e)));}catch(_0x193aef){if($gameTemp[_0x452266(0x424)]())console[_0x452266(0x5e9)](_0x193aef);}}return _0x33eaf6;};if(this[_0x858906(0x5f6)][_0x199614]===0x0)this[_0x858906(0x5f6)][_0x199614]=Number['MAX_SAFE_INTEGER'];return this[_0x858906(0x5f6)][_0x199614]=this[_0x858906(0x4a6)]()[_0x858906(0x370)](_0x41b323,this[_0x858906(0x5f6)][_0x199614]),this['_cache'][_0x199614];},Game_BattlerBase[_0xe356ff(0x4e8)]['paramRate']=function(_0x18df97){const _0x2080ef=_0xe356ff,_0xca9145=this[_0x2080ef(0x346)](Game_BattlerBase[_0x2080ef(0x6e7)],_0x18df97),_0x481c63=(_0x3b55ab,_0x489660)=>{const _0x2cc4e5=_0x2080ef;if(!_0x489660)return _0x3b55ab;if(_0x489660[_0x2cc4e5(0x2e6)][_0x2cc4e5(0x211)](VisuMZ[_0x2cc4e5(0x64f)][_0x2cc4e5(0x42f)][_0x2cc4e5(0x540)][_0x18df97])){var _0x372bc1=Number(RegExp['$1'])/0x64;_0x3b55ab*=_0x372bc1;}if(_0x489660['note'][_0x2cc4e5(0x211)](VisuMZ['CoreEngine']['RegExp'][_0x2cc4e5(0x5a3)][_0x18df97])){var _0x372bc1=Number(RegExp['$1']);_0x3b55ab*=_0x372bc1;}if(_0x489660['note'][_0x2cc4e5(0x211)](VisuMZ[_0x2cc4e5(0x64f)]['RegExp']['paramRateJS'][_0x18df97])){var _0x397c64=String(RegExp['$1']);try{_0x3b55ab*=eval(_0x397c64);}catch(_0x492a29){if($gameTemp[_0x2cc4e5(0x424)]())console['log'](_0x492a29);}}return _0x3b55ab;};return this[_0x2080ef(0x4a6)]()['reduce'](_0x481c63,_0xca9145);},Game_BattlerBase['prototype'][_0xe356ff(0x1c5)]=function(_0x17e867){const _0x5c2063=_0xe356ff,_0x3aba54=(_0x4cb140,_0x223f9b)=>{const _0x37f329=_0x2e46;if(!_0x223f9b)return _0x4cb140;if(_0x223f9b[_0x37f329(0x2e6)][_0x37f329(0x211)](VisuMZ['CoreEngine'][_0x37f329(0x42f)][_0x37f329(0x4d6)][_0x17e867])){var _0x5101cd=Number(RegExp['$1']);_0x4cb140+=_0x5101cd;}if(_0x223f9b['note'][_0x37f329(0x211)](VisuMZ[_0x37f329(0x64f)][_0x37f329(0x42f)][_0x37f329(0x5bb)][_0x17e867])){var _0x13b23d=String(RegExp['$1']);try{_0x4cb140+=eval(_0x13b23d);}catch(_0x3fab7c){if($gameTemp[_0x37f329(0x424)]())console[_0x37f329(0x5e9)](_0x3fab7c);}}return _0x4cb140;};return this[_0x5c2063(0x4a6)]()[_0x5c2063(0x370)](_0x3aba54,0x0);},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x4c1)]=function(_0x2549b0){const _0x2e4f57=_0xe356ff;let _0x3f34c9=_0x2e4f57(0x4c1)+_0x2549b0+_0x2e4f57(0x3bc);if(this['checkCacheKey'](_0x3f34c9))return this[_0x2e4f57(0x5f6)][_0x3f34c9];return this['_cache'][_0x3f34c9]=Math[_0x2e4f57(0x398)](VisuMZ[_0x2e4f57(0x64f)][_0x2e4f57(0x5cf)][_0x2e4f57(0x366)][_0x2e4f57(0x521)][_0x2e4f57(0x329)](this,_0x2549b0)),this['_cache'][_0x3f34c9];},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x363)]=function(_0x2e56ee){const _0x176fb2=_0xe356ff,_0x46bcfd=(_0x5a2849,_0x3876a5)=>{const _0x3417cb=_0x2e46;if(!_0x3876a5)return _0x5a2849;if(_0x3876a5[_0x3417cb(0x2e6)]['match'](VisuMZ[_0x3417cb(0x64f)][_0x3417cb(0x42f)][_0x3417cb(0x64a)][_0x2e56ee])){var _0x461fcb=Number(RegExp['$1'])/0x64;_0x5a2849+=_0x461fcb;}if(_0x3876a5[_0x3417cb(0x2e6)]['match'](VisuMZ[_0x3417cb(0x64f)][_0x3417cb(0x42f)][_0x3417cb(0x6b8)][_0x2e56ee])){var _0x461fcb=Number(RegExp['$1']);_0x5a2849+=_0x461fcb;}if(_0x3876a5['note'][_0x3417cb(0x211)](VisuMZ['CoreEngine']['RegExp'][_0x3417cb(0x609)][_0x2e56ee])){var _0x5e8d81=String(RegExp['$1']);try{_0x5a2849+=eval(_0x5e8d81);}catch(_0x108ac0){if($gameTemp[_0x3417cb(0x424)]())console[_0x3417cb(0x5e9)](_0x108ac0);}}return _0x5a2849;};return this['traitObjects']()[_0x176fb2(0x370)](_0x46bcfd,0x0);},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x613)]=function(_0x3ef5aa){const _0x29f4f1=_0xe356ff,_0x3227ad=(_0xae884c,_0x33d07c)=>{const _0xca0100=_0x2e46;if(!_0x33d07c)return _0xae884c;if(_0x33d07c[_0xca0100(0x2e6)]['match'](VisuMZ[_0xca0100(0x64f)][_0xca0100(0x42f)]['xparamRate1'][_0x3ef5aa])){var _0x4a4ad4=Number(RegExp['$1'])/0x64;_0xae884c*=_0x4a4ad4;}if(_0x33d07c[_0xca0100(0x2e6)][_0xca0100(0x211)](VisuMZ['CoreEngine'][_0xca0100(0x42f)][_0xca0100(0x576)][_0x3ef5aa])){var _0x4a4ad4=Number(RegExp['$1']);_0xae884c*=_0x4a4ad4;}if(_0x33d07c[_0xca0100(0x2e6)][_0xca0100(0x211)](VisuMZ[_0xca0100(0x64f)][_0xca0100(0x42f)][_0xca0100(0x5ee)][_0x3ef5aa])){var _0x176da8=String(RegExp['$1']);try{_0xae884c*=eval(_0x176da8);}catch(_0x219306){if($gameTemp[_0xca0100(0x424)]())console['log'](_0x219306);}}return _0xae884c;};return this[_0x29f4f1(0x4a6)]()[_0x29f4f1(0x370)](_0x3227ad,0x1);},Game_BattlerBase['prototype']['xparamFlatBonus']=function(_0x17c5ab){const _0x5c582c=_0xe356ff,_0x436647=(_0x4fa91a,_0x5ab418)=>{const _0x3be676=_0x2e46;if(!_0x5ab418)return _0x4fa91a;if(_0x5ab418[_0x3be676(0x2e6)][_0x3be676(0x211)](VisuMZ[_0x3be676(0x64f)][_0x3be676(0x42f)][_0x3be676(0x333)][_0x17c5ab])){var _0x5eb1c5=Number(RegExp['$1'])/0x64;_0x4fa91a+=_0x5eb1c5;}if(_0x5ab418['note'][_0x3be676(0x211)](VisuMZ['CoreEngine'][_0x3be676(0x42f)][_0x3be676(0x58d)][_0x17c5ab])){var _0x5eb1c5=Number(RegExp['$1']);_0x4fa91a+=_0x5eb1c5;}if(_0x5ab418['note']['match'](VisuMZ['CoreEngine'][_0x3be676(0x42f)][_0x3be676(0x74e)][_0x17c5ab])){var _0x516dcd=String(RegExp['$1']);try{_0x4fa91a+=eval(_0x516dcd);}catch(_0x1f2574){if($gameTemp['isPlaytest']())console[_0x3be676(0x5e9)](_0x1f2574);}}return _0x4fa91a;};return this[_0x5c582c(0x4a6)]()[_0x5c582c(0x370)](_0x436647,0x0);},Game_BattlerBase['prototype'][_0xe356ff(0x1c4)]=function(_0xb34ec2){const _0x29f20d=_0xe356ff;let _0x1e9e75=_0x29f20d(0x1c4)+_0xb34ec2+_0x29f20d(0x3bc);if(this['checkCacheKey'](_0x1e9e75))return this[_0x29f20d(0x5f6)][_0x1e9e75];return this[_0x29f20d(0x5f6)][_0x1e9e75]=VisuMZ[_0x29f20d(0x64f)][_0x29f20d(0x5cf)][_0x29f20d(0x366)][_0x29f20d(0x2b9)][_0x29f20d(0x329)](this,_0xb34ec2),this[_0x29f20d(0x5f6)][_0x1e9e75];},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x519)]=function(_0x29378f){const _0x48d4ea=_0xe356ff,_0x52ed23=(_0x10ab26,_0x38eee4)=>{const _0x230501=_0x2e46;if(!_0x38eee4)return _0x10ab26;if(_0x38eee4[_0x230501(0x2e6)]['match'](VisuMZ[_0x230501(0x64f)][_0x230501(0x42f)][_0x230501(0x5df)][_0x29378f])){var _0x1600d5=Number(RegExp['$1'])/0x64;_0x10ab26+=_0x1600d5;}if(_0x38eee4[_0x230501(0x2e6)][_0x230501(0x211)](VisuMZ[_0x230501(0x64f)][_0x230501(0x42f)][_0x230501(0x352)][_0x29378f])){var _0x1600d5=Number(RegExp['$1']);_0x10ab26+=_0x1600d5;}if(_0x38eee4[_0x230501(0x2e6)]['match'](VisuMZ[_0x230501(0x64f)]['RegExp']['sparamPlusJS'][_0x29378f])){var _0xddb704=String(RegExp['$1']);try{_0x10ab26+=eval(_0xddb704);}catch(_0x1155db){if($gameTemp['isPlaytest']())console[_0x230501(0x5e9)](_0x1155db);}}return _0x10ab26;};return this['traitObjects']()[_0x48d4ea(0x370)](_0x52ed23,0x0);},Game_BattlerBase['prototype']['sparamRate']=function(_0x206a44){const _0x157ec8=_0xe356ff,_0x325f30=(_0x4a5c13,_0x207eb5)=>{const _0x370891=_0x2e46;if(!_0x207eb5)return _0x4a5c13;if(_0x207eb5['note'][_0x370891(0x211)](VisuMZ['CoreEngine'][_0x370891(0x42f)][_0x370891(0x6b1)][_0x206a44])){var _0x2e5755=Number(RegExp['$1'])/0x64;_0x4a5c13*=_0x2e5755;}if(_0x207eb5[_0x370891(0x2e6)][_0x370891(0x211)](VisuMZ[_0x370891(0x64f)][_0x370891(0x42f)]['sparamRate2'][_0x206a44])){var _0x2e5755=Number(RegExp['$1']);_0x4a5c13*=_0x2e5755;}if(_0x207eb5[_0x370891(0x2e6)][_0x370891(0x211)](VisuMZ[_0x370891(0x64f)][_0x370891(0x42f)][_0x370891(0x443)][_0x206a44])){var _0x195de5=String(RegExp['$1']);try{_0x4a5c13*=eval(_0x195de5);}catch(_0x29493a){if($gameTemp[_0x370891(0x424)]())console['log'](_0x29493a);}}return _0x4a5c13;};return this[_0x157ec8(0x4a6)]()[_0x157ec8(0x370)](_0x325f30,0x1);},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x261)]=function(_0xda167){const _0x4eff66=_0xe356ff,_0xf45a2=(_0x7b30c6,_0x22f2f2)=>{const _0x4da4dc=_0x2e46;if(!_0x22f2f2)return _0x7b30c6;if(_0x22f2f2[_0x4da4dc(0x2e6)][_0x4da4dc(0x211)](VisuMZ[_0x4da4dc(0x64f)]['RegExp'][_0x4da4dc(0x22a)][_0xda167])){var _0x4deaea=Number(RegExp['$1'])/0x64;_0x7b30c6+=_0x4deaea;}if(_0x22f2f2[_0x4da4dc(0x2e6)][_0x4da4dc(0x211)](VisuMZ[_0x4da4dc(0x64f)][_0x4da4dc(0x42f)][_0x4da4dc(0x59d)][_0xda167])){var _0x4deaea=Number(RegExp['$1']);_0x7b30c6+=_0x4deaea;}if(_0x22f2f2[_0x4da4dc(0x2e6)]['match'](VisuMZ['CoreEngine'][_0x4da4dc(0x42f)][_0x4da4dc(0x4d7)][_0xda167])){var _0x3c1502=String(RegExp['$1']);try{_0x7b30c6+=eval(_0x3c1502);}catch(_0x1495d6){if($gameTemp[_0x4da4dc(0x424)]())console['log'](_0x1495d6);}}return _0x7b30c6;};return this[_0x4eff66(0x4a6)]()[_0x4eff66(0x370)](_0xf45a2,0x0);},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x5c9)]=function(_0x2b4b9b){const _0x42fa5c=_0xe356ff;let _0x46f438=_0x42fa5c(0x5c9)+_0x2b4b9b+'Total';if(this['checkCacheKey'](_0x46f438))return this[_0x42fa5c(0x5f6)][_0x46f438];return this[_0x42fa5c(0x5f6)][_0x46f438]=VisuMZ[_0x42fa5c(0x64f)][_0x42fa5c(0x5cf)][_0x42fa5c(0x366)][_0x42fa5c(0x245)][_0x42fa5c(0x329)](this,_0x2b4b9b),this[_0x42fa5c(0x5f6)][_0x46f438];},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x36d)]=function(_0x29ec00,_0x51c1ca){const _0x2b255b=_0xe356ff;if(typeof paramId==='number')return this[_0x2b255b(0x4c1)](_0x29ec00);_0x29ec00=String(_0x29ec00||'')[_0x2b255b(0x68f)]();if(_0x29ec00===_0x2b255b(0x757))return this[_0x2b255b(0x4c1)](0x0);if(_0x29ec00==='MAXMP')return this['param'](0x1);if(_0x29ec00===_0x2b255b(0x65c))return this['param'](0x2);if(_0x29ec00===_0x2b255b(0x637))return this['param'](0x3);if(_0x29ec00===_0x2b255b(0x734))return this[_0x2b255b(0x4c1)](0x4);if(_0x29ec00===_0x2b255b(0x651))return this[_0x2b255b(0x4c1)](0x5);if(_0x29ec00===_0x2b255b(0x21a))return this[_0x2b255b(0x4c1)](0x6);if(_0x29ec00==='LUK')return this[_0x2b255b(0x4c1)](0x7);if(_0x29ec00==='HIT')return _0x51c1ca?String(Math['round'](this['xparam'](0x0)*0x64))+'%':this[_0x2b255b(0x1c4)](0x0);if(_0x29ec00===_0x2b255b(0x471))return _0x51c1ca?String(Math['round'](this[_0x2b255b(0x1c4)](0x1)*0x64))+'%':this[_0x2b255b(0x1c4)](0x1);if(_0x29ec00===_0x2b255b(0x5fd))return _0x51c1ca?String(Math['round'](this[_0x2b255b(0x1c4)](0x2)*0x64))+'%':this[_0x2b255b(0x1c4)](0x2);if(_0x29ec00===_0x2b255b(0x584))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this['xparam'](0x3)*0x64))+'%':this[_0x2b255b(0x1c4)](0x3);if(_0x29ec00===_0x2b255b(0x6bd))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this['xparam'](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x29ec00===_0x2b255b(0x338))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x1c4)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x29ec00===_0x2b255b(0x51d))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x1c4)](0x6)*0x64))+'%':this[_0x2b255b(0x1c4)](0x6);if(_0x29ec00===_0x2b255b(0x227))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x1c4)](0x7)*0x64))+'%':this[_0x2b255b(0x1c4)](0x7);if(_0x29ec00===_0x2b255b(0x1af))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x1c4)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x29ec00===_0x2b255b(0x4a1))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x1c4)](0x9)*0x64))+'%':this[_0x2b255b(0x1c4)](0x9);if(_0x29ec00===_0x2b255b(0x2d6))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x5c9)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x29ec00===_0x2b255b(0x6be))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x5c9)](0x1)*0x64))+'%':this[_0x2b255b(0x5c9)](0x1);if(_0x29ec00===_0x2b255b(0x420))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x5c9)](0x2)*0x64))+'%':this[_0x2b255b(0x5c9)](0x2);if(_0x29ec00===_0x2b255b(0x5ac))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this['sparam'](0x3)*0x64))+'%':this[_0x2b255b(0x5c9)](0x3);if(_0x29ec00===_0x2b255b(0x756))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x5c9)](0x4)*0x64))+'%':this[_0x2b255b(0x5c9)](0x4);if(_0x29ec00===_0x2b255b(0x50e))return _0x51c1ca?String(Math['round'](this[_0x2b255b(0x5c9)](0x5)*0x64))+'%':this[_0x2b255b(0x5c9)](0x5);if(_0x29ec00===_0x2b255b(0x49e))return _0x51c1ca?String(Math['round'](this[_0x2b255b(0x5c9)](0x6)*0x64))+'%':this[_0x2b255b(0x5c9)](0x6);if(_0x29ec00===_0x2b255b(0x1a0))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this['sparam'](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x29ec00===_0x2b255b(0x53f))return _0x51c1ca?String(Math[_0x2b255b(0x398)](this['sparam'](0x8)*0x64))+'%':this[_0x2b255b(0x5c9)](0x8);if(_0x29ec00==='EXR')return _0x51c1ca?String(Math[_0x2b255b(0x398)](this[_0x2b255b(0x5c9)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x2b255b(0x64f)][_0x2b255b(0x214)][_0x29ec00]){const _0x18b48d=VisuMZ[_0x2b255b(0x64f)]['CustomParamAbb'][_0x29ec00],_0x538e42=this[_0x18b48d];return VisuMZ['CoreEngine'][_0x2b255b(0x19f)][_0x29ec00]==='integer'?_0x538e42:_0x51c1ca?String(Math[_0x2b255b(0x398)](_0x538e42*0x64))+'%':_0x538e42;}return'';},Game_BattlerBase[_0xe356ff(0x4e8)][_0xe356ff(0x213)]=function(){const _0x343029=_0xe356ff;return this['isAlive']()&&this[_0x343029(0x3b1)]<this['mhp']*VisuMZ[_0x343029(0x64f)]['Settings']['Param']['CrisisRate'];},Game_Battler[_0xe356ff(0x4e8)][_0xe356ff(0x3ab)]=function(){const _0x2ab5c7=_0xe356ff;SoundManager[_0x2ab5c7(0x464)](),this[_0x2ab5c7(0x55c)](_0x2ab5c7(0x50d));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x1f3)]=Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x541)],Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x541)]=function(_0x138d50){const _0x1755fb=_0xe356ff;if(this['level']>0x63)return this['paramBaseAboveLevel99'](_0x138d50);return VisuMZ[_0x1755fb(0x64f)][_0x1755fb(0x1f3)]['call'](this,_0x138d50);},Game_Actor['prototype']['paramBaseAboveLevel99']=function(_0x3b8caa){const _0x16e538=_0xe356ff,_0x5bafca=this[_0x16e538(0x4ef)]()[_0x16e538(0x709)][_0x3b8caa][0x63],_0x14881f=this[_0x16e538(0x4ef)]()['params'][_0x3b8caa][0x62];return _0x5bafca+(_0x5bafca-_0x14881f)*(this[_0x16e538(0x3fd)]-0x63);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4ad)]=Game_Actor['prototype'][_0xe356ff(0x367)],Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x367)]=function(_0x5d8e14,_0x91dab8){const _0x1a42ea=_0xe356ff;$gameTemp['_changingClass']=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass'][_0x1a42ea(0x329)](this,_0x5d8e14,_0x91dab8),$gameTemp[_0x1a42ea(0x4b5)]=undefined;},VisuMZ[_0xe356ff(0x64f)]['Game_Actor_levelUp']=Game_Actor[_0xe356ff(0x4e8)]['levelUp'],Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x72e)]=function(){const _0x2d260f=_0xe356ff;VisuMZ['CoreEngine'][_0x2d260f(0x559)][_0x2d260f(0x329)](this);if(!$gameTemp['_changingClass'])this[_0x2d260f(0x699)]();},Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x699)]=function(){const _0x3f30f4=_0xe356ff;this[_0x3f30f4(0x5f6)]={};if(VisuMZ[_0x3f30f4(0x64f)][_0x3f30f4(0x5cf)][_0x3f30f4(0x69e)][_0x3f30f4(0x6d9)])this[_0x3f30f4(0x3b1)]=this[_0x3f30f4(0x5d2)];if(VisuMZ[_0x3f30f4(0x64f)][_0x3f30f4(0x5cf)][_0x3f30f4(0x69e)][_0x3f30f4(0x6a8)])this[_0x3f30f4(0x682)]=this[_0x3f30f4(0x608)];},Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x506)]=function(){const _0x4426aa=_0xe356ff;if(this[_0x4426aa(0x6bb)]())return 0x1;const _0x131cf6=this[_0x4426aa(0x641)]()-this[_0x4426aa(0x60e)](),_0x5772b7=this[_0x4426aa(0x289)]()-this['currentLevelExp']();return(_0x5772b7/_0x131cf6)[_0x4426aa(0x32b)](0x0,0x1);},Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x4a6)]=function(){const _0x4a3d6c=_0xe356ff,_0x43076d=Game_Battler[_0x4a3d6c(0x4e8)][_0x4a3d6c(0x4a6)][_0x4a3d6c(0x329)](this);for(const _0x1cf749 of this['equips']()){_0x1cf749&&_0x43076d[_0x4a3d6c(0x62d)](_0x1cf749);}return _0x43076d[_0x4a3d6c(0x62d)](this[_0x4a3d6c(0x4ef)](),this[_0x4a3d6c(0x691)]()),_0x43076d;},Object['defineProperty'](Game_Enemy[_0xe356ff(0x4e8)],_0xe356ff(0x3fd),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0xe356ff(0x4e8)][_0xe356ff(0x415)]=function(){const _0x53560a=_0xe356ff;return this[_0x53560a(0x2e3)]()['level'];},Game_Enemy[_0xe356ff(0x4e8)][_0xe356ff(0x296)]=function(){const _0x58d164=_0xe356ff;!this[_0x58d164(0x375)]&&(this[_0x58d164(0x4f4)]+=Math['round']((Graphics[_0x58d164(0x5fb)]-0x270)/0x2),this[_0x58d164(0x4f4)]-=Math[_0x58d164(0x4b8)]((Graphics['height']-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this[_0x58d164(0x631)]-=Math[_0x58d164(0x4b8)]((Graphics[_0x58d164(0x234)]-Graphics[_0x58d164(0x3d1)])/0x2):this[_0x58d164(0x631)]+=Math['round']((Graphics[_0x58d164(0x3d1)]-0x330)/0x2)),this[_0x58d164(0x375)]=!![];},Game_Party[_0xe356ff(0x4e8)][_0xe356ff(0x42e)]=function(){const _0x476747=_0xe356ff;return VisuMZ[_0x476747(0x64f)]['Settings']['Gold'][_0x476747(0x722)];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4e6)]=Game_Party[_0xe356ff(0x4e8)]['consumeItem'],Game_Party['prototype'][_0xe356ff(0x6af)]=function(_0x526b39){const _0x5eb770=_0xe356ff;if(VisuMZ[_0x5eb770(0x64f)][_0x5eb770(0x5cf)]['QoL'][_0x5eb770(0x478)]&&DataManager[_0x5eb770(0x491)](_0x526b39))return;VisuMZ['CoreEngine'][_0x5eb770(0x4e6)][_0x5eb770(0x329)](this,_0x526b39);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x599)]=Game_Troop[_0xe356ff(0x4e8)][_0xe356ff(0x248)],Game_Troop[_0xe356ff(0x4e8)][_0xe356ff(0x248)]=function(_0x15a22c){const _0x3eddfd=_0xe356ff;$gameTemp[_0x3eddfd(0x38e)](),$gameTemp[_0x3eddfd(0x62e)](_0x15a22c),VisuMZ[_0x3eddfd(0x64f)]['Game_Troop_setup'][_0x3eddfd(0x329)](this,_0x15a22c);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x621)]=Game_Map[_0xe356ff(0x4e8)][_0xe356ff(0x248)],Game_Map[_0xe356ff(0x4e8)][_0xe356ff(0x248)]=function(_0x330ccf){const _0x192dd0=_0xe356ff;VisuMZ[_0x192dd0(0x64f)][_0x192dd0(0x621)][_0x192dd0(0x329)](this,_0x330ccf),this[_0x192dd0(0x321)](_0x330ccf);},Game_Map[_0xe356ff(0x4e8)][_0xe356ff(0x321)]=function(){const _0x3fb039=_0xe356ff;this[_0x3fb039(0x629)]=VisuMZ[_0x3fb039(0x64f)][_0x3fb039(0x5cf)][_0x3fb039(0x69e)]['NoTileShadows']||![];if($dataMap&&$dataMap[_0x3fb039(0x2e6)]){if($dataMap[_0x3fb039(0x2e6)]['match'](/<SHOW TILE SHADOWS>/i))this[_0x3fb039(0x629)]=![];if($dataMap[_0x3fb039(0x2e6)][_0x3fb039(0x211)](/<HIDE TILE SHADOWS>/i))this[_0x3fb039(0x629)]=!![];}},Game_Map[_0xe356ff(0x4e8)][_0xe356ff(0x224)]=function(){const _0x30016c=_0xe356ff;if(this['_hideTileShadows']===undefined)this[_0x30016c(0x321)]();return this['_hideTileShadows'];},VisuMZ['CoreEngine'][_0xe356ff(0x401)]=Game_Character['prototype'][_0xe356ff(0x451)],Game_Character[_0xe356ff(0x4e8)][_0xe356ff(0x451)]=function(_0x3629a8){const _0x18ab67=_0xe356ff;try{VisuMZ[_0x18ab67(0x64f)][_0x18ab67(0x401)][_0x18ab67(0x329)](this,_0x3629a8);}catch(_0x50e825){if($gameTemp['isPlaytest']())console[_0x18ab67(0x5e9)](_0x50e825);}},Game_Player['prototype'][_0xe356ff(0x40a)]=function(){const _0x39c51b=_0xe356ff,_0xadb00d=$gameMap[_0x39c51b(0x704)]();this[_0x39c51b(0x2fa)]=Math[_0x39c51b(0x472)](_0xadb00d)+Math[_0x39c51b(0x472)](_0xadb00d)+this['encounterStepsMinimum']();},Game_Player[_0xe356ff(0x4e8)]['encounterStepsMinimum']=function(){const _0x4ff20d=_0xe356ff;return $dataMap&&$dataMap[_0x4ff20d(0x2e6)]&&$dataMap[_0x4ff20d(0x2e6)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x4ff20d(0x5cf)]['QoL'][_0x4ff20d(0x568)];},VisuMZ['CoreEngine'][_0xe356ff(0x65f)]=Game_Event[_0xe356ff(0x4e8)][_0xe356ff(0x50f)],Game_Event[_0xe356ff(0x4e8)]['isCollidedWithEvents']=function(_0x497c8c,_0x4ec60f){const _0x583865=_0xe356ff;return this[_0x583865(0x73b)]()?this[_0x583865(0x266)](_0x497c8c,_0x4ec60f):VisuMZ[_0x583865(0x64f)][_0x583865(0x65f)][_0x583865(0x329)](this,_0x497c8c,_0x4ec60f);},Game_Event[_0xe356ff(0x4e8)][_0xe356ff(0x73b)]=function(){const _0x59ec22=_0xe356ff;return VisuMZ[_0x59ec22(0x64f)][_0x59ec22(0x5cf)][_0x59ec22(0x69e)]['SmartEventCollisionPriority'];},Game_Event[_0xe356ff(0x4e8)][_0xe356ff(0x266)]=function(_0x5818c5,_0x2f8fe8){const _0x4ca635=_0xe356ff;if(!this[_0x4ca635(0x45d)]())return![];else{const _0x55a472=$gameMap[_0x4ca635(0x5b5)](_0x5818c5,_0x2f8fe8)[_0x4ca635(0x252)](_0x3e3fb1=>_0x3e3fb1['isNormalPriority']());return _0x55a472[_0x4ca635(0x437)]>0x0;}},VisuMZ[_0xe356ff(0x64f)]['Game_Interpreter_command105']=Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x74f)],Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x74f)]=function(_0x203682){const _0x122115=_0xe356ff,_0x5967da=this['getCombinedScrollingText']();return _0x5967da[_0x122115(0x211)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x122115(0x653)](_0x5967da):VisuMZ[_0x122115(0x64f)]['Game_Interpreter_command105']['call'](this,_0x203682);},Game_Interpreter[_0xe356ff(0x4e8)]['getCombinedScrollingText']=function(){const _0xb20c42=_0xe356ff;let _0x595f08='',_0x10e135=this[_0xb20c42(0x1ea)]+0x1;while(this[_0xb20c42(0x6de)][_0x10e135]&&this[_0xb20c42(0x6de)][_0x10e135][_0xb20c42(0x4c4)]===0x195){_0x595f08+=this['_list'][_0x10e135][_0xb20c42(0x6d3)][0x0]+'\x0a',_0x10e135++;}return _0x595f08;},Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x653)]=function(_0x10cbf8){const _0x3e9540=_0xe356ff;try{eval(_0x10cbf8);}catch(_0x39bd53){$gameTemp[_0x3e9540(0x424)]()&&(console[_0x3e9540(0x5e9)](_0x3e9540(0x456)),console[_0x3e9540(0x5e9)](_0x39bd53));}return!![];},VisuMZ[_0xe356ff(0x64f)]['Game_Interpreter_command111']=Game_Interpreter[_0xe356ff(0x4e8)]['command111'],Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x590)]=function(_0x479597){const _0x1c8f72=_0xe356ff;try{VisuMZ[_0x1c8f72(0x64f)][_0x1c8f72(0x6a2)][_0x1c8f72(0x329)](this,_0x479597);}catch(_0x40bc9a){$gameTemp[_0x1c8f72(0x424)]()&&(console[_0x1c8f72(0x5e9)](_0x1c8f72(0x567)),console['log'](_0x40bc9a)),this[_0x1c8f72(0x73f)]();}return!![];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x2f8)]=Game_Interpreter['prototype'][_0xe356ff(0x60d)],Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x60d)]=function(_0x474273){const _0x2d0c41=_0xe356ff;try{VisuMZ[_0x2d0c41(0x64f)][_0x2d0c41(0x2f8)][_0x2d0c41(0x329)](this,_0x474273);}catch(_0x516516){$gameTemp[_0x2d0c41(0x424)]()&&(console[_0x2d0c41(0x5e9)]('Control\x20Variables\x20Script\x20Error'),console[_0x2d0c41(0x5e9)](_0x516516));}return!![];},VisuMZ[_0xe356ff(0x64f)]['Game_Interpreter_command355']=Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x2ec)],Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x2ec)]=function(){const _0x26fa78=_0xe356ff;try{VisuMZ['CoreEngine'][_0x26fa78(0x356)][_0x26fa78(0x329)](this);}catch(_0x3fcec7){$gameTemp[_0x26fa78(0x424)]()&&(console[_0x26fa78(0x5e9)](_0x26fa78(0x654)),console[_0x26fa78(0x5e9)](_0x3fcec7));}return!![];},VisuMZ['CoreEngine'][_0xe356ff(0x259)]=Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x3e2)],Game_Interpreter[_0xe356ff(0x4e8)][_0xe356ff(0x3e2)]=function(_0x502677){const _0x317545=_0xe356ff;return $gameTemp[_0x317545(0x40b)](this),VisuMZ[_0x317545(0x64f)]['Game_Interpreter_PluginCommand'][_0x317545(0x329)](this,_0x502677);},Scene_Base[_0xe356ff(0x4e8)]['fadeSpeed']=function(){const _0x10af82=_0xe356ff;return VisuMZ[_0x10af82(0x64f)][_0x10af82(0x5cf)]['UI']['FadeSpeed'];},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x5fc)]=function(){const _0x3f6c12=_0xe356ff;return VisuMZ[_0x3f6c12(0x64f)][_0x3f6c12(0x5cf)]['UI'][_0x3f6c12(0x1bc)];},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x21d)]=function(){const _0x1896a2=_0xe356ff;return VisuMZ['CoreEngine'][_0x1896a2(0x5cf)]['UI'][_0x1896a2(0x719)];},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x688)]=function(){const _0x3e26f3=_0xe356ff;return VisuMZ[_0x3e26f3(0x64f)]['Settings']['UI']['RightMenus'];},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x748)]=function(){const _0x3d72fc=_0xe356ff;return VisuMZ[_0x3d72fc(0x64f)]['Settings']['UI']['CommandWidth'];},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x4f6)]=function(){const _0x4f908f=_0xe356ff;return VisuMZ['CoreEngine'][_0x4f908f(0x5cf)]['UI'][_0x4f908f(0x53d)];},Scene_Base['prototype'][_0xe356ff(0x746)]=function(){const _0x21dc37=_0xe356ff;return VisuMZ[_0x21dc37(0x64f)][_0x21dc37(0x5cf)]['Window'][_0x21dc37(0x34a)];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x718)]=Scene_Base['prototype'][_0xe356ff(0x3dd)],Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x3dd)]=function(){const _0x580451=_0xe356ff;VisuMZ['CoreEngine'][_0x580451(0x718)][_0x580451(0x329)](this),this[_0x580451(0x552)](),this['_windowLayer']['x']=Math[_0x580451(0x398)](this[_0x580451(0x28b)]['x']),this[_0x580451(0x28b)]['y']=Math[_0x580451(0x398)](this[_0x580451(0x28b)]['y']);},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x552)]=function(){},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x6e3)]=function(){const _0x48a392=_0xe356ff;return TextManager['getInputMultiButtonStrings'](_0x48a392(0x44d),'pagedown');},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x258)]=function(){const _0x198b20=_0xe356ff;return TextManager[_0x198b20(0x2c5)]('tab');},Scene_Base[_0xe356ff(0x4e8)]['buttonAssistKey3']=function(){const _0x31e054=_0xe356ff;return TextManager[_0x31e054(0x2c5)]('shift');},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x607)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x343)]=function(){const _0x66d09e=_0xe356ff;return TextManager[_0x66d09e(0x2c5)](_0x66d09e(0x667));},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x2bd)]=function(){const _0x3b192f=_0xe356ff;return this[_0x3b192f(0x665)]&&this['_pageupButton']['visible']?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x606)]=function(){return'';},Scene_Base[_0xe356ff(0x4e8)]['buttonAssistText3']=function(){return'';},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x2f6)]=function(){const _0x25a633=_0xe356ff;return TextManager[_0x25a633(0x63a)];},Scene_Base[_0xe356ff(0x4e8)]['buttonAssistText5']=function(){return TextManager['buttonAssistCancel'];},Scene_Base['prototype'][_0xe356ff(0x611)]=function(){return 0x0;},Scene_Base['prototype'][_0xe356ff(0x30e)]=function(){return 0x0;},Scene_Base['prototype'][_0xe356ff(0x368)]=function(){return 0x0;},Scene_Base['prototype'][_0xe356ff(0x574)]=function(){return 0x0;},Scene_Base[_0xe356ff(0x4e8)][_0xe356ff(0x442)]=function(){return 0x0;},VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']=Scene_Boot['prototype'][_0xe356ff(0x391)],Scene_Boot[_0xe356ff(0x4e8)]['loadSystemImages']=function(){const _0x2f8780=_0xe356ff;VisuMZ['CoreEngine'][_0x2f8780(0x3b4)]['call'](this),this[_0x2f8780(0x429)]();},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x429)]=function(){const _0x15359e=_0xe356ff,_0x2e8a2a=['animations',_0x15359e(0x5e6),'battlebacks2',_0x15359e(0x2a8),_0x15359e(0x1e0),_0x15359e(0x380),_0x15359e(0x494),_0x15359e(0x42d),'sv_actors','sv_enemies',_0x15359e(0x2e7),_0x15359e(0x749),'titles1',_0x15359e(0x447)];for(const _0x1fb356 of _0x2e8a2a){const _0x5872f6=VisuMZ[_0x15359e(0x64f)]['Settings'][_0x15359e(0x6c8)][_0x1fb356],_0x25d20e='img/%1/'['format'](_0x1fb356);for(const _0x88e54c of _0x5872f6){ImageManager[_0x15359e(0x598)](_0x25d20e,_0x88e54c);}}},VisuMZ['CoreEngine'][_0xe356ff(0x604)]=Scene_Boot[_0xe356ff(0x4e8)]['startNormalGame'],Scene_Boot[_0xe356ff(0x4e8)]['startNormalGame']=function(){const _0x62080f=_0xe356ff;Utils[_0x62080f(0x1e1)](_0x62080f(0x440))&&VisuMZ[_0x62080f(0x64f)][_0x62080f(0x5cf)][_0x62080f(0x69e)][_0x62080f(0x400)]?this[_0x62080f(0x54d)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x62080f(0x329)](this);},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x54d)]=function(){const _0x341476=_0xe356ff;DataManager['setupNewGame'](),SceneManager[_0x341476(0x4ec)](Scene_Map);},Scene_Boot[_0xe356ff(0x4e8)]['adjustBoxSize']=function(){const _0xb3058=_0xe356ff,_0x1f1e9f=$dataSystem[_0xb3058(0x647)]['uiAreaWidth'],_0x84fd9f=$dataSystem['advanced'][_0xb3058(0x71e)],_0x216d60=VisuMZ['CoreEngine'][_0xb3058(0x5cf)]['UI'][_0xb3058(0x337)];Graphics[_0xb3058(0x3d1)]=_0x1f1e9f-_0x216d60*0x2,Graphics[_0xb3058(0x1ef)]=_0x84fd9f-_0x216d60*0x2,this[_0xb3058(0x2be)]();},VisuMZ['CoreEngine'][_0xe356ff(0x703)]=Scene_Boot[_0xe356ff(0x4e8)]['updateDocumentTitle'],Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x308)]=function(){const _0x451b02=_0xe356ff;this[_0x451b02(0x737)]()?this['makeDocumentTitle']():VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle'][_0x451b02(0x329)](this);},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x737)]=function(){const _0x2957ac=_0xe356ff;if(Scene_Title[_0x2957ac(0x5d0)]==='')return![];if(Scene_Title['subtitle']===_0x2957ac(0x3f1))return![];if(Scene_Title[_0x2957ac(0x70d)]==='')return![];if(Scene_Title[_0x2957ac(0x70d)]===_0x2957ac(0x696))return![];return!![];},Scene_Boot[_0xe356ff(0x4e8)][_0xe356ff(0x602)]=function(){const _0x273366=_0xe356ff,_0x138ce4=$dataSystem['gameTitle'],_0x18406e=Scene_Title[_0x273366(0x5d0)]||'',_0x45ac72=Scene_Title[_0x273366(0x70d)]||'',_0x3c8237=VisuMZ[_0x273366(0x64f)][_0x273366(0x5cf)][_0x273366(0x2a7)][_0x273366(0x62b)][_0x273366(0x24a)],_0x140a08=_0x3c8237['format'](_0x138ce4,_0x18406e,_0x45ac72);document[_0x273366(0x3a5)]=_0x140a08;},Scene_Boot['prototype']['determineSideButtonLayoutValid']=function(){const _0x1ed092=_0xe356ff;if(VisuMZ['CoreEngine'][_0x1ed092(0x5cf)]['UI']['SideButtons']){const _0x24071d=Graphics['width']-Graphics[_0x1ed092(0x3d1)]-VisuMZ[_0x1ed092(0x64f)][_0x1ed092(0x5cf)]['UI'][_0x1ed092(0x337)]*0x2,_0x45feca=Sprite_Button[_0x1ed092(0x4e8)][_0x1ed092(0x2ee)]['call'](this)*0x4;if(_0x24071d>=_0x45feca)SceneManager[_0x1ed092(0x669)](!![]);}},Scene_Title[_0xe356ff(0x5d0)]=VisuMZ['CoreEngine'][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)]['Title'][_0xe356ff(0x3f1)],Scene_Title[_0xe356ff(0x70d)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)][_0xe356ff(0x62b)][_0xe356ff(0x4a7)],Scene_Title['pictureButtons']=VisuMZ['CoreEngine'][_0xe356ff(0x5cf)]['TitlePicButtons'],VisuMZ[_0xe356ff(0x64f)]['Scene_Title_drawGameTitle']=Scene_Title[_0xe356ff(0x4e8)][_0xe356ff(0x1e5)],Scene_Title[_0xe356ff(0x4e8)]['drawGameTitle']=function(){const _0xab0f90=_0xe356ff;VisuMZ[_0xab0f90(0x64f)][_0xab0f90(0x5cf)]['MenuLayout']['Title'][_0xab0f90(0x1e5)][_0xab0f90(0x329)](this);if(Scene_Title[_0xab0f90(0x5d0)]!==''&&Scene_Title[_0xab0f90(0x5d0)]!==_0xab0f90(0x3f1))this['drawGameSubtitle']();if(Scene_Title[_0xab0f90(0x70d)]!==''&&Scene_Title[_0xab0f90(0x70d)]!=='0.00')this['drawGameVersion']();},Scene_Title[_0xe356ff(0x4e8)]['drawGameSubtitle']=function(){const _0x1d8609=_0xe356ff;VisuMZ[_0x1d8609(0x64f)]['Settings'][_0x1d8609(0x2a7)][_0x1d8609(0x62b)][_0x1d8609(0x59c)]['call'](this);},Scene_Title['prototype'][_0xe356ff(0x6ad)]=function(){const _0x273fab=_0xe356ff;VisuMZ[_0x273fab(0x64f)][_0x273fab(0x5cf)][_0x273fab(0x2a7)]['Title'][_0x273fab(0x6ad)][_0x273fab(0x329)](this);},Scene_Title[_0xe356ff(0x4e8)][_0xe356ff(0x63f)]=function(){const _0x5c2fe1=_0xe356ff;this[_0x5c2fe1(0x642)]();const _0x41cb28=$dataSystem[_0x5c2fe1(0x751)][_0x5c2fe1(0x5d1)],_0x193795=this[_0x5c2fe1(0x6dd)]();this[_0x5c2fe1(0x661)]=new Window_TitleCommand(_0x193795),this['_commandWindow'][_0x5c2fe1(0x1a7)](_0x41cb28);const _0x286608=this[_0x5c2fe1(0x6dd)]();this[_0x5c2fe1(0x661)][_0x5c2fe1(0x508)](_0x286608['x'],_0x286608['y'],_0x286608[_0x5c2fe1(0x234)],_0x286608[_0x5c2fe1(0x5fb)]),this['addWindow'](this['_commandWindow']);},Scene_Title[_0xe356ff(0x4e8)]['commandWindowRows']=function(){const _0x15c8b8=_0xe356ff;return this[_0x15c8b8(0x661)]?this['_commandWindow']['maxItems']():VisuMZ[_0x15c8b8(0x64f)][_0x15c8b8(0x5cf)][_0x15c8b8(0x1f2)]['length'];},Scene_Title[_0xe356ff(0x4e8)][_0xe356ff(0x6dd)]=function(){const _0x961547=_0xe356ff;return VisuMZ[_0x961547(0x64f)][_0x961547(0x5cf)]['MenuLayout'][_0x961547(0x62b)][_0x961547(0x1b9)][_0x961547(0x329)](this);},Scene_Title[_0xe356ff(0x4e8)][_0xe356ff(0x642)]=function(){const _0x41ce50=_0xe356ff;for(const _0x11b3df of Scene_Title[_0x41ce50(0x5ec)]){const _0x228e47=new Sprite_TitlePictureButton(_0x11b3df);this['addChild'](_0x228e47);}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x392)]=Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Scene_Map['prototype'][_0xe356ff(0x374)]=function(){const _0x3a3e34=_0xe356ff;VisuMZ[_0x3a3e34(0x64f)][_0x3a3e34(0x392)]['call'](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine']();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x671)]=Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x27d)],Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x27d)]=function(){const _0x87f888=_0xe356ff;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x87f888(0x329)](this),$gameTemp[_0x87f888(0x627)]&&!$gameMessage['isBusy']()&&(this['updateMain'](),SceneManager['updateEffekseer']());},Scene_Map['prototype'][_0xe356ff(0x217)]=function(){const _0x1bf08d=_0xe356ff;Scene_Message[_0x1bf08d(0x4e8)][_0x1bf08d(0x217)][_0x1bf08d(0x329)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x1bf08d(0x260)]['update'](),this[_0x1bf08d(0x3d8)][_0x1bf08d(0x63b)](),this['_windowLayer']['visible']=![],SceneManager['snapForBackground']()),$gameScreen[_0x1bf08d(0x1d5)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x457)]=Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x527)],Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x527)]=function(){const _0x15e5dc=_0xe356ff;VisuMZ['CoreEngine'][_0x15e5dc(0x457)][_0x15e5dc(0x329)](this),SceneManager[_0x15e5dc(0x37f)]()&&this[_0x15e5dc(0x4da)]();},Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x4da)]=function(){const _0x5e5cbe=_0xe356ff;this['_menuButton']['x']=Graphics[_0x5e5cbe(0x3d1)]+0x4;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x450)]=Scene_Map['prototype'][_0xe356ff(0x257)],Scene_Map[_0xe356ff(0x4e8)]['updateScene']=function(){const _0x11d3d7=_0xe356ff;VisuMZ[_0x11d3d7(0x64f)][_0x11d3d7(0x450)]['call'](this),this[_0x11d3d7(0x3f4)]();},Scene_Map[_0xe356ff(0x4e8)][_0xe356ff(0x3f4)]=function(){const _0x42b5db=_0xe356ff;Input[_0x42b5db(0x488)](_0x42b5db(0x6a1))&&(ConfigManager[_0x42b5db(0x1d6)]=!ConfigManager[_0x42b5db(0x1d6)],ConfigManager[_0x42b5db(0x3e6)]());},VisuMZ[_0xe356ff(0x64f)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase['prototype'][_0xe356ff(0x65d)],Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x65d)]=function(){const _0x586f19=_0xe356ff;let _0x2b6252=0x0;return SceneManager[_0x586f19(0x5d4)]()?_0x2b6252=this[_0x586f19(0x5ef)]():_0x2b6252=VisuMZ[_0x586f19(0x64f)][_0x586f19(0x244)]['call'](this),this['isMenuButtonAssistEnabled']()&&this[_0x586f19(0x200)]()===_0x586f19(0x354)&&(_0x2b6252+=Window_ButtonAssist[_0x586f19(0x4e8)]['lineHeight']()),_0x2b6252;},Scene_MenuBase['prototype'][_0xe356ff(0x5ef)]=function(){const _0x1c0cfa=_0xe356ff;return this[_0x1c0cfa(0x5fc)]()?this[_0x1c0cfa(0x73c)]():0x0;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x41b)]=Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x40c)],Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x40c)]=function(){const _0x3755d4=_0xe356ff;return SceneManager['areButtonsOutsideMainUI']()?this[_0x3755d4(0x22f)]():VisuMZ[_0x3755d4(0x64f)]['Scene_MenuBase_mainAreaTop'][_0x3755d4(0x329)](this);},Scene_MenuBase['prototype'][_0xe356ff(0x22f)]=function(){const _0x5a2903=_0xe356ff;return!this[_0x5a2903(0x5fc)]()?this[_0x5a2903(0x298)]():0x0;},VisuMZ[_0xe356ff(0x64f)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0xe356ff(0x4e8)]['mainAreaHeight'],Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x221)]=function(){const _0x104426=_0xe356ff;let _0x37f3c9=0x0;return SceneManager[_0x104426(0x5d4)]()?_0x37f3c9=this[_0x104426(0x530)]():_0x37f3c9=VisuMZ[_0x104426(0x64f)][_0x104426(0x496)]['call'](this),this[_0x104426(0x5de)]()&&this['getButtonAssistLocation']()!==_0x104426(0x5a0)&&(_0x37f3c9-=Window_ButtonAssist[_0x104426(0x4e8)][_0x104426(0x5c3)]()),_0x37f3c9;},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x530)]=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ[_0xe356ff(0x64f)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x4df)],Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x4df)]=function(){const _0x409bb4=_0xe356ff;this[_0x409bb4(0x20b)]=new PIXI['filters'][(_0x409bb4(0x4e4))](clamp=!![]),this[_0x409bb4(0x3a1)]=new Sprite(),this['_backgroundSprite'][_0x409bb4(0x535)]=SceneManager[_0x409bb4(0x222)](),this[_0x409bb4(0x3a1)][_0x409bb4(0x717)]=[this[_0x409bb4(0x20b)]],this[_0x409bb4(0x618)](this['_backgroundSprite']),this[_0x409bb4(0x4ed)](0xc0),this['setBackgroundOpacity'](this[_0x409bb4(0x4be)]()),this[_0x409bb4(0x1bd)]();},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x4be)]=function(){const _0x33adb1=_0xe356ff,_0x2ba9b7=String(this[_0x33adb1(0x255)]['name']),_0x581602=this[_0x33adb1(0x70f)](_0x2ba9b7);return _0x581602?_0x581602[_0x33adb1(0x714)]:0xc0;},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x1bd)]=function(){const _0x153fad=_0xe356ff,_0x121c8e=String(this['constructor']['name']),_0x379f4a=this[_0x153fad(0x70f)](_0x121c8e);_0x379f4a&&(_0x379f4a[_0x153fad(0x2d7)]!==''||_0x379f4a[_0x153fad(0x2f2)]!=='')&&(this[_0x153fad(0x5b0)]=new Sprite(ImageManager[_0x153fad(0x71a)](_0x379f4a[_0x153fad(0x2d7)])),this[_0x153fad(0x64e)]=new Sprite(ImageManager[_0x153fad(0x56b)](_0x379f4a['BgFilename2'])),this['addChild'](this['_backSprite1']),this[_0x153fad(0x618)](this[_0x153fad(0x64e)]),this[_0x153fad(0x5b0)][_0x153fad(0x535)]['addLoadListener'](this['adjustSprite'][_0x153fad(0x4f1)](this,this['_backSprite1'])),this[_0x153fad(0x64e)]['bitmap'][_0x153fad(0x54b)](this[_0x153fad(0x318)][_0x153fad(0x4f1)](this,this[_0x153fad(0x64e)])));},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x70f)]=function(_0x13e6f6){const _0x3bc16d=_0xe356ff;return VisuMZ['CoreEngine'][_0x3bc16d(0x5cf)]['MenuBg'][_0x13e6f6]||VisuMZ[_0x3bc16d(0x64f)][_0x3bc16d(0x5cf)][_0x3bc16d(0x475)][_0x3bc16d(0x5a8)];},Scene_MenuBase['prototype'][_0xe356ff(0x318)]=function(_0x12f10a){const _0x31fad3=_0xe356ff;this['scaleSprite'](_0x12f10a),this[_0x31fad3(0x1cf)](_0x12f10a);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x1c1)]=Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x39a)],Scene_MenuBase['prototype'][_0xe356ff(0x39a)]=function(){const _0xd6ad26=_0xe356ff;VisuMZ[_0xd6ad26(0x64f)][_0xd6ad26(0x1c1)]['call'](this),SceneManager[_0xd6ad26(0x37f)]()&&this[_0xd6ad26(0x5af)]();},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x5af)]=function(){const _0x5efff4=_0xe356ff;this[_0x5efff4(0x5da)]['x']=Graphics[_0x5efff4(0x3d1)]+0x4;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x46f)]=Scene_MenuBase[_0xe356ff(0x4e8)]['createPageButtons'],Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x72d)]=function(){const _0x38ad36=_0xe356ff;VisuMZ[_0x38ad36(0x64f)][_0x38ad36(0x46f)][_0x38ad36(0x329)](this),SceneManager[_0x38ad36(0x37f)]()&&this[_0x38ad36(0x35f)]();},Scene_MenuBase[_0xe356ff(0x4e8)]['movePageButtonSideButtonLayout']=function(){const _0x5d9c06=_0xe356ff;this[_0x5d9c06(0x665)]['x']=-0x1*(this[_0x5d9c06(0x665)][_0x5d9c06(0x234)]+this[_0x5d9c06(0x652)][_0x5d9c06(0x234)]+0x8),this[_0x5d9c06(0x652)]['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x5de)]=function(){const _0x24900e=_0xe356ff;return VisuMZ[_0x24900e(0x64f)]['Settings']['ButtonAssist'][_0x24900e(0x479)];},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x200)]=function(){const _0xb189be=_0xe356ff;return SceneManager[_0xb189be(0x37f)]()||SceneManager[_0xb189be(0x47c)]()?VisuMZ[_0xb189be(0x64f)]['Settings'][_0xb189be(0x3e1)]['Location']:_0xb189be(0x5a0);},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x552)]=function(){const _0x3b91b6=_0xe356ff;if(!this[_0x3b91b6(0x5de)]())return;const _0x258a41=this[_0x3b91b6(0x23e)]();this[_0x3b91b6(0x2e8)]=new Window_ButtonAssist(_0x258a41),this[_0x3b91b6(0x417)](this[_0x3b91b6(0x2e8)]);},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x23e)]=function(){const _0x3ac1d0=_0xe356ff;return this[_0x3ac1d0(0x200)]()==='button'?this[_0x3ac1d0(0x27f)]():this[_0x3ac1d0(0x1c8)]();},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x27f)]=function(){const _0x5d8f70=_0xe356ff,_0x553ad0=ConfigManager[_0x5d8f70(0x285)]?(Sprite_Button[_0x5d8f70(0x4e8)]['blockWidth']()+0x6)*0x2:0x0,_0x3ac393=this['buttonY'](),_0x296474=Graphics[_0x5d8f70(0x3d1)]-_0x553ad0*0x2,_0x2b489c=this[_0x5d8f70(0x4f6)]();return new Rectangle(_0x553ad0,_0x3ac393,_0x296474,_0x2b489c);},Scene_MenuBase[_0xe356ff(0x4e8)][_0xe356ff(0x1c8)]=function(){const _0x8c1b03=_0xe356ff,_0x44b564=Graphics[_0x8c1b03(0x3d1)],_0x3704b5=Window_ButtonAssist[_0x8c1b03(0x4e8)][_0x8c1b03(0x5c3)](),_0x2c5c26=0x0;let _0x1da542=0x0;return this['getButtonAssistLocation']()===_0x8c1b03(0x354)?_0x1da542=0x0:_0x1da542=Graphics['boxHeight']-_0x3704b5,new Rectangle(_0x2c5c26,_0x1da542,_0x44b564,_0x3704b5);},Scene_Menu[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)]['MenuLayout'][_0xe356ff(0x348)],VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5ab)]=Scene_Menu['prototype']['create'],Scene_Menu['prototype'][_0xe356ff(0x4d1)]=function(){const _0x3540e0=_0xe356ff;VisuMZ[_0x3540e0(0x64f)]['Scene_Menu_create'][_0x3540e0(0x329)](this),this[_0x3540e0(0x3cf)]();},Scene_Menu[_0xe356ff(0x4e8)][_0xe356ff(0x3cf)]=function(){const _0x142256=_0xe356ff;this[_0x142256(0x661)]&&this[_0x142256(0x661)][_0x142256(0x1a7)](Scene_Menu[_0x142256(0x291)]['CommandBgType']),this[_0x142256(0x511)]&&this[_0x142256(0x511)][_0x142256(0x1a7)](Scene_Menu[_0x142256(0x291)][_0x142256(0x498)]),this[_0x142256(0x1a6)]&&this[_0x142256(0x1a6)][_0x142256(0x1a7)](Scene_Menu[_0x142256(0x291)][_0x142256(0x686)]);},Scene_Menu['prototype'][_0xe356ff(0x6dd)]=function(){const _0x535fe2=_0xe356ff;return Scene_Menu[_0x535fe2(0x291)]['CommandRect'][_0x535fe2(0x329)](this);},Scene_Menu[_0xe356ff(0x4e8)][_0xe356ff(0x42c)]=function(){const _0x9c2321=_0xe356ff;return Scene_Menu[_0x9c2321(0x291)]['GoldRect'][_0x9c2321(0x329)](this);},Scene_Menu['prototype'][_0xe356ff(0x6f1)]=function(){const _0x1c0c30=_0xe356ff;return Scene_Menu[_0x1c0c30(0x291)][_0x1c0c30(0x1f8)][_0x1c0c30(0x329)](this);},Scene_Item[_0xe356ff(0x291)]=VisuMZ['CoreEngine']['Settings'][_0xe356ff(0x2a7)]['ItemMenu'],VisuMZ['CoreEngine'][_0xe356ff(0x48c)]=Scene_Item[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)],Scene_Item[_0xe356ff(0x4e8)]['create']=function(){const _0x4a13ca=_0xe356ff;VisuMZ[_0x4a13ca(0x64f)][_0x4a13ca(0x48c)][_0x4a13ca(0x329)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0xe356ff(0x4e8)][_0xe356ff(0x3cf)]=function(){const _0x367081=_0xe356ff;this[_0x367081(0x57c)]&&this['_helpWindow'][_0x367081(0x1a7)](Scene_Item['layoutSettings']['HelpBgType']),this['_categoryWindow']&&this[_0x367081(0x323)][_0x367081(0x1a7)](Scene_Item[_0x367081(0x291)][_0x367081(0x38b)]),this[_0x367081(0x1e2)]&&this[_0x367081(0x1e2)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x367081(0x523)]),this[_0x367081(0x36b)]&&this[_0x367081(0x36b)][_0x367081(0x1a7)](Scene_Item['layoutSettings'][_0x367081(0x586)]);},Scene_Item['prototype'][_0xe356ff(0x67c)]=function(){const _0x4be2ab=_0xe356ff;return Scene_Item[_0x4be2ab(0x291)][_0x4be2ab(0x569)][_0x4be2ab(0x329)](this);},Scene_Item[_0xe356ff(0x4e8)]['categoryWindowRect']=function(){const _0xefd4b2=_0xe356ff;return Scene_Item['layoutSettings'][_0xefd4b2(0x23d)]['call'](this);},Scene_Item['prototype'][_0xe356ff(0x4bf)]=function(){const _0x5c9ba2=_0xe356ff;return Scene_Item[_0x5c9ba2(0x291)][_0x5c9ba2(0x66f)][_0x5c9ba2(0x329)](this);},Scene_Item[_0xe356ff(0x4e8)][_0xe356ff(0x1ca)]=function(){const _0x26433f=_0xe356ff;return Scene_Item[_0x26433f(0x291)][_0x26433f(0x659)][_0x26433f(0x329)](this);},Scene_Skill[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)]['SkillMenu'],VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x1d7)]=Scene_Skill[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)],Scene_Skill[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0x1d4e6b=_0xe356ff;VisuMZ[_0x1d4e6b(0x64f)][_0x1d4e6b(0x1d7)]['call'](this),this[_0x1d4e6b(0x3cf)]();},Scene_Skill[_0xe356ff(0x4e8)]['setCoreEngineUpdateWindowBg']=function(){const _0x45ac6b=_0xe356ff;this[_0x45ac6b(0x57c)]&&this[_0x45ac6b(0x57c)][_0x45ac6b(0x1a7)](Scene_Skill[_0x45ac6b(0x291)]['HelpBgType']),this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x45ac6b(0x1a7)](Scene_Skill[_0x45ac6b(0x291)]['SkillTypeBgType']),this[_0x45ac6b(0x1a6)]&&this['_statusWindow'][_0x45ac6b(0x1a7)](Scene_Skill[_0x45ac6b(0x291)][_0x45ac6b(0x686)]),this[_0x45ac6b(0x1e2)]&&this[_0x45ac6b(0x1e2)][_0x45ac6b(0x1a7)](Scene_Skill[_0x45ac6b(0x291)]['ItemBgType']),this['_actorWindow']&&this[_0x45ac6b(0x36b)][_0x45ac6b(0x1a7)](Scene_Skill[_0x45ac6b(0x291)]['ActorBgType']);},Scene_Skill[_0xe356ff(0x4e8)][_0xe356ff(0x67c)]=function(){const _0x3605d4=_0xe356ff;return Scene_Skill['layoutSettings']['HelpRect'][_0x3605d4(0x329)](this);},Scene_Skill['prototype'][_0xe356ff(0x518)]=function(){const _0x4077e8=_0xe356ff;return Scene_Skill['layoutSettings'][_0x4077e8(0x6f9)]['call'](this);},Scene_Skill['prototype'][_0xe356ff(0x6f1)]=function(){const _0x345b39=_0xe356ff;return Scene_Skill[_0x345b39(0x291)]['StatusRect'][_0x345b39(0x329)](this);},Scene_Skill[_0xe356ff(0x4e8)]['itemWindowRect']=function(){const _0x295cf1=_0xe356ff;return Scene_Skill[_0x295cf1(0x291)][_0x295cf1(0x66f)]['call'](this);},Scene_Skill[_0xe356ff(0x4e8)]['actorWindowRect']=function(){const _0x3b336b=_0xe356ff;return Scene_Skill[_0x3b336b(0x291)][_0x3b336b(0x659)][_0x3b336b(0x329)](this);},Scene_Equip[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)]['EquipMenu'],VisuMZ[_0xe356ff(0x64f)]['Scene_Equip_create']=Scene_Equip[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)],Scene_Equip[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0x668980=_0xe356ff;VisuMZ[_0x668980(0x64f)][_0x668980(0x74d)][_0x668980(0x329)](this),this[_0x668980(0x3cf)]();},Scene_Equip[_0xe356ff(0x4e8)]['setCoreEngineUpdateWindowBg']=function(){const _0x48ab81=_0xe356ff;this[_0x48ab81(0x57c)]&&this['_helpWindow'][_0x48ab81(0x1a7)](Scene_Equip['layoutSettings'][_0x48ab81(0x67d)]),this[_0x48ab81(0x1a6)]&&this[_0x48ab81(0x1a6)][_0x48ab81(0x1a7)](Scene_Equip['layoutSettings'][_0x48ab81(0x686)]),this[_0x48ab81(0x661)]&&this['_commandWindow']['setBackgroundType'](Scene_Equip[_0x48ab81(0x291)]['CommandBgType']),this['_slotWindow']&&this['_slotWindow'][_0x48ab81(0x1a7)](Scene_Equip[_0x48ab81(0x291)]['SlotBgType']),this['_itemWindow']&&this['_itemWindow'][_0x48ab81(0x1a7)](Scene_Equip[_0x48ab81(0x291)][_0x48ab81(0x523)]);},Scene_Equip[_0xe356ff(0x4e8)][_0xe356ff(0x67c)]=function(){const _0x41cd5a=_0xe356ff;return Scene_Equip['layoutSettings']['HelpRect'][_0x41cd5a(0x329)](this);},Scene_Equip[_0xe356ff(0x4e8)][_0xe356ff(0x6f1)]=function(){const _0x1a07a3=_0xe356ff;return Scene_Equip[_0x1a07a3(0x291)][_0x1a07a3(0x1f8)][_0x1a07a3(0x329)](this);},Scene_Equip[_0xe356ff(0x4e8)]['commandWindowRect']=function(){const _0x470252=_0xe356ff;return Scene_Equip[_0x470252(0x291)]['CommandRect'][_0x470252(0x329)](this);},Scene_Equip[_0xe356ff(0x4e8)][_0xe356ff(0x2c2)]=function(){const _0x1b1803=_0xe356ff;return Scene_Equip[_0x1b1803(0x291)][_0x1b1803(0x51b)]['call'](this);},Scene_Equip['prototype']['itemWindowRect']=function(){const _0x47dec6=_0xe356ff;return Scene_Equip[_0x47dec6(0x291)][_0x47dec6(0x66f)][_0x47dec6(0x329)](this);},Scene_Status['layoutSettings']=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)][_0xe356ff(0x287)],VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5bf)]=Scene_Status['prototype']['create'],Scene_Status[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0x396ab7=_0xe356ff;VisuMZ[_0x396ab7(0x64f)][_0x396ab7(0x5bf)]['call'](this),this[_0x396ab7(0x3cf)]();},Scene_Status[_0xe356ff(0x4e8)][_0xe356ff(0x3cf)]=function(){const _0x1e4369=_0xe356ff;this[_0x1e4369(0x2d9)]&&this[_0x1e4369(0x2d9)][_0x1e4369(0x1a7)](Scene_Status[_0x1e4369(0x291)][_0x1e4369(0x6b0)]),this[_0x1e4369(0x1a6)]&&this[_0x1e4369(0x1a6)][_0x1e4369(0x1a7)](Scene_Status[_0x1e4369(0x291)][_0x1e4369(0x686)]),this['_statusParamsWindow']&&this[_0x1e4369(0x3df)][_0x1e4369(0x1a7)](Scene_Status[_0x1e4369(0x291)]['StatusParamsBgType']),this[_0x1e4369(0x644)]&&this['_statusEquipWindow'][_0x1e4369(0x1a7)](Scene_Status[_0x1e4369(0x291)]['StatusEquipBgType']);},Scene_Status['prototype'][_0xe356ff(0x19e)]=function(){const _0x1e832e=_0xe356ff;return Scene_Status[_0x1e832e(0x291)][_0x1e832e(0x430)][_0x1e832e(0x329)](this);},Scene_Status['prototype'][_0xe356ff(0x6f1)]=function(){const _0x384a2a=_0xe356ff;return Scene_Status[_0x384a2a(0x291)][_0x384a2a(0x1f8)][_0x384a2a(0x329)](this);},Scene_Status[_0xe356ff(0x4e8)][_0xe356ff(0x40f)]=function(){const _0x4eb085=_0xe356ff;return Scene_Status[_0x4eb085(0x291)][_0x4eb085(0x562)][_0x4eb085(0x329)](this);},Scene_Status[_0xe356ff(0x4e8)][_0xe356ff(0x1ba)]=function(){const _0x21fd9a=_0xe356ff;return Scene_Status[_0x21fd9a(0x291)][_0x21fd9a(0x19b)][_0x21fd9a(0x329)](this);},Scene_Options[_0xe356ff(0x291)]=VisuMZ['CoreEngine'][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)]['OptionsMenu'],VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4fe)]=Scene_Options[_0xe356ff(0x4e8)]['create'],Scene_Options[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0xa86c75=_0xe356ff;VisuMZ[_0xa86c75(0x64f)][_0xa86c75(0x4fe)]['call'](this),this[_0xa86c75(0x3cf)]();},Scene_Options[_0xe356ff(0x4e8)][_0xe356ff(0x3cf)]=function(){const _0x20df0b=_0xe356ff;this[_0x20df0b(0x384)]&&this[_0x20df0b(0x384)]['setBackgroundType'](Scene_Options['layoutSettings'][_0x20df0b(0x3af)]);},Scene_Options[_0xe356ff(0x4e8)][_0xe356ff(0x1b4)]=function(){const _0x80f1af=_0xe356ff;return Scene_Options[_0x80f1af(0x291)][_0x80f1af(0x1d1)]['call'](this);},Scene_Save[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)][_0xe356ff(0x381)],Scene_Save[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0x44c5f8=_0xe356ff;Scene_File[_0x44c5f8(0x4e8)][_0x44c5f8(0x4d1)][_0x44c5f8(0x329)](this),this[_0x44c5f8(0x3cf)]();},Scene_Save[_0xe356ff(0x4e8)]['setCoreEngineUpdateWindowBg']=function(){const _0x5fdd87=_0xe356ff;this[_0x5fdd87(0x57c)]&&this[_0x5fdd87(0x57c)][_0x5fdd87(0x1a7)](Scene_Save[_0x5fdd87(0x291)][_0x5fdd87(0x67d)]),this[_0x5fdd87(0x724)]&&this[_0x5fdd87(0x724)][_0x5fdd87(0x1a7)](Scene_Save[_0x5fdd87(0x291)]['ListBgType']);},Scene_Save[_0xe356ff(0x4e8)][_0xe356ff(0x67c)]=function(){const _0x39ba66=_0xe356ff;return Scene_Save[_0x39ba66(0x291)][_0x39ba66(0x569)][_0x39ba66(0x329)](this);},Scene_Save[_0xe356ff(0x4e8)][_0xe356ff(0x5b1)]=function(){const _0x2bae42=_0xe356ff;return Scene_Save[_0x2bae42(0x291)][_0x2bae42(0x601)][_0x2bae42(0x329)](this);},Scene_Load[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)]['Settings'][_0xe356ff(0x2a7)][_0xe356ff(0x5e8)],Scene_Load[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0x3c3d8c=_0xe356ff;Scene_File['prototype']['create'][_0x3c3d8c(0x329)](this),this[_0x3c3d8c(0x3cf)]();},Scene_Load[_0xe356ff(0x4e8)]['setCoreEngineUpdateWindowBg']=function(){const _0xe2ea90=_0xe356ff;this['_helpWindow']&&this['_helpWindow'][_0xe2ea90(0x1a7)](Scene_Load[_0xe2ea90(0x291)]['HelpBgType']),this['_listWindow']&&this[_0xe2ea90(0x724)][_0xe2ea90(0x1a7)](Scene_Load['layoutSettings'][_0xe2ea90(0x46c)]);},Scene_Load[_0xe356ff(0x4e8)]['helpWindowRect']=function(){const _0x3cb9df=_0xe356ff;return Scene_Load[_0x3cb9df(0x291)][_0x3cb9df(0x569)][_0x3cb9df(0x329)](this);},Scene_Load[_0xe356ff(0x4e8)][_0xe356ff(0x5b1)]=function(){const _0x37eeae=_0xe356ff;return Scene_Load[_0x37eeae(0x291)]['ListRect'][_0x37eeae(0x329)](this);},Scene_GameEnd[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)]['GameEnd'],VisuMZ['CoreEngine'][_0xe356ff(0x2ae)]=Scene_GameEnd[_0xe356ff(0x4e8)]['createBackground'],Scene_GameEnd[_0xe356ff(0x4e8)][_0xe356ff(0x4df)]=function(){Scene_MenuBase['prototype']['createBackground']['call'](this);},Scene_GameEnd['prototype'][_0xe356ff(0x63f)]=function(){const _0x203b6e=_0xe356ff,_0x557411=this['commandWindowRect']();this[_0x203b6e(0x661)]=new Window_GameEnd(_0x557411),this['_commandWindow'][_0x203b6e(0x67b)](_0x203b6e(0x667),this['popScene']['bind'](this)),this[_0x203b6e(0x417)](this['_commandWindow']),this['_commandWindow'][_0x203b6e(0x1a7)](Scene_GameEnd[_0x203b6e(0x291)][_0x203b6e(0x534)]);},Scene_GameEnd['prototype'][_0xe356ff(0x6dd)]=function(){const _0xbc84d5=_0xe356ff;return Scene_GameEnd['layoutSettings'][_0xbc84d5(0x1b9)][_0xbc84d5(0x329)](this);},Scene_Shop[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)][_0xe356ff(0x6eb)],VisuMZ[_0xe356ff(0x64f)]['Scene_Shop_create']=Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)],Scene_Shop['prototype'][_0xe356ff(0x4d1)]=function(){const _0x2eda02=_0xe356ff;VisuMZ['CoreEngine'][_0x2eda02(0x4fd)][_0x2eda02(0x329)](this),this[_0x2eda02(0x3cf)]();},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x3cf)]=function(){const _0x15eb2d=_0xe356ff;this[_0x15eb2d(0x57c)]&&this['_helpWindow'][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x67d)]),this[_0x15eb2d(0x511)]&&this[_0x15eb2d(0x511)][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x498)]),this[_0x15eb2d(0x661)]&&this[_0x15eb2d(0x661)][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x534)]),this[_0x15eb2d(0x4e2)]&&this[_0x15eb2d(0x4e2)][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x5e1)]),this[_0x15eb2d(0x54a)]&&this['_numberWindow'][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x4b2)]),this['_statusWindow']&&this[_0x15eb2d(0x1a6)][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x686)]),this['_buyWindow']&&this[_0x15eb2d(0x5d3)][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x2ac)]),this[_0x15eb2d(0x323)]&&this['_categoryWindow'][_0x15eb2d(0x1a7)](Scene_Shop[_0x15eb2d(0x291)][_0x15eb2d(0x38b)]),this[_0x15eb2d(0x1b2)]&&this[_0x15eb2d(0x1b2)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x15eb2d(0x5f3)]);},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x67c)]=function(){const _0x38d310=_0xe356ff;return Scene_Shop['layoutSettings'][_0x38d310(0x569)][_0x38d310(0x329)](this);},Scene_Shop[_0xe356ff(0x4e8)]['goldWindowRect']=function(){const _0x1c3e6a=_0xe356ff;return Scene_Shop[_0x1c3e6a(0x291)][_0x1c3e6a(0x2a2)][_0x1c3e6a(0x329)](this);},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x6dd)]=function(){const _0x35bf8b=_0xe356ff;return Scene_Shop[_0x35bf8b(0x291)][_0x35bf8b(0x1b9)][_0x35bf8b(0x329)](this);},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x26a)]=function(){const _0x24172e=_0xe356ff;return Scene_Shop['layoutSettings']['DummyRect'][_0x24172e(0x329)](this);},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x345)]=function(){const _0xddfb15=_0xe356ff;return Scene_Shop[_0xddfb15(0x291)][_0xddfb15(0x4fb)]['call'](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x239432=_0xe356ff;return Scene_Shop[_0x239432(0x291)]['StatusRect'][_0x239432(0x329)](this);},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x2c8)]=function(){const _0x46fa16=_0xe356ff;return Scene_Shop[_0x46fa16(0x291)][_0x46fa16(0x509)]['call'](this);},Scene_Shop['prototype'][_0xe356ff(0x2ce)]=function(){const _0x437bc3=_0xe356ff;return Scene_Shop[_0x437bc3(0x291)]['CategoryRect'][_0x437bc3(0x329)](this);},Scene_Shop[_0xe356ff(0x4e8)][_0xe356ff(0x264)]=function(){const _0x109806=_0xe356ff;return Scene_Shop[_0x109806(0x291)][_0x109806(0x662)]['call'](this);},Scene_Name[_0xe356ff(0x291)]=VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)][_0xe356ff(0x33d)],VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x32a)]=Scene_Name[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)],Scene_Name[_0xe356ff(0x4e8)][_0xe356ff(0x4d1)]=function(){const _0x3d5832=_0xe356ff;VisuMZ[_0x3d5832(0x64f)][_0x3d5832(0x32a)][_0x3d5832(0x329)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x22215f=_0xe356ff;this[_0x22215f(0x3ec)]&&this[_0x22215f(0x3ec)][_0x22215f(0x1a7)](Scene_Name[_0x22215f(0x291)][_0x22215f(0x5d9)]),this[_0x22215f(0x441)]&&this[_0x22215f(0x441)][_0x22215f(0x1a7)](Scene_Name[_0x22215f(0x291)][_0x22215f(0x55d)]);},Scene_Name[_0xe356ff(0x4e8)][_0xe356ff(0x4d3)]=function(){return 0x0;},Scene_Name['prototype'][_0xe356ff(0x6d6)]=function(){const _0x15a495=_0xe356ff;return Scene_Name[_0x15a495(0x291)][_0x15a495(0x47e)][_0x15a495(0x329)](this);},Scene_Name[_0xe356ff(0x4e8)][_0xe356ff(0x2f5)]=function(){const _0x10ffe8=_0xe356ff;return Scene_Name[_0x10ffe8(0x291)][_0x10ffe8(0x3bb)][_0x10ffe8(0x329)](this);},Scene_Name['prototype'][_0xe356ff(0x5ba)]=function(){const _0x18fa3f=_0xe356ff;if(!this[_0x18fa3f(0x441)])return![];return VisuMZ[_0x18fa3f(0x64f)]['Settings'][_0x18fa3f(0x5e7)][_0x18fa3f(0x5ba)];},Scene_Name[_0xe356ff(0x4e8)]['buttonAssistKey1']=function(){const _0xeb93ff=_0xe356ff;return this[_0xeb93ff(0x5ba)]()?TextManager[_0xeb93ff(0x2c5)](_0xeb93ff(0x3d5)):Scene_MenuBase['prototype'][_0xeb93ff(0x6e3)]['call'](this);},Scene_Name[_0xe356ff(0x4e8)][_0xe356ff(0x2bd)]=function(){const _0x1b04ba=_0xe356ff;if(this[_0x1b04ba(0x5ba)]()){const _0x222b99=VisuMZ['CoreEngine']['Settings']['KeyboardInput'];return this[_0x1b04ba(0x441)][_0x1b04ba(0x4ae)]===_0x1b04ba(0x5d5)?_0x222b99[_0x1b04ba(0x32d)]||_0x1b04ba(0x32d):_0x222b99[_0x1b04ba(0x38d)]||'Manual';}else return Scene_MenuBase[_0x1b04ba(0x4e8)]['buttonAssistText1']['call'](this);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4b3)]=Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x26e)],Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x26e)]=function(){const _0x5bbf53=_0xe356ff;VisuMZ[_0x5bbf53(0x64f)][_0x5bbf53(0x4b3)][_0x5bbf53(0x329)](this);if($gameTemp[_0x5bbf53(0x627)])this[_0x5bbf53(0x578)]();},Scene_Battle[_0xe356ff(0x4e8)]['updatePlayTestF7']=function(){const _0x341bda=_0xe356ff;!BattleManager[_0x341bda(0x634)]()&&!this[_0x341bda(0x531)]&&!$gameMessage[_0x341bda(0x6cf)]()&&(this[_0x341bda(0x531)]=!![],this[_0x341bda(0x26e)](),SceneManager[_0x341bda(0x3c6)](),this[_0x341bda(0x531)]=![]);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x31a)]=Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x39a)],Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x39a)]=function(){const _0x4e8232=_0xe356ff;VisuMZ[_0x4e8232(0x64f)][_0x4e8232(0x31a)][_0x4e8232(0x329)](this),SceneManager[_0x4e8232(0x37f)]()&&this[_0x4e8232(0x39f)]();},Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x39f)]=function(){const _0x39f126=_0xe356ff;this[_0x39f126(0x5da)]['x']=Graphics['boxWidth']+0x4,this[_0x39f126(0x21d)]()?this[_0x39f126(0x5da)]['y']=Graphics['boxHeight']-this[_0x39f126(0x4f6)]():this[_0x39f126(0x5da)]['y']=0x0;},VisuMZ[_0xe356ff(0x64f)]['Sprite_Button_initialize']=Sprite_Button[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Sprite_Button[_0xe356ff(0x4e8)][_0xe356ff(0x374)]=function(_0xf32700){const _0x33fd39=_0xe356ff;VisuMZ[_0x33fd39(0x64f)][_0x33fd39(0x701)][_0x33fd39(0x329)](this,_0xf32700),this['initButtonHidden']();},Sprite_Button[_0xe356ff(0x4e8)][_0xe356ff(0x4ba)]=function(){const _0x415e58=_0xe356ff,_0x39b4a7=VisuMZ['CoreEngine'][_0x415e58(0x5cf)]['UI'];this[_0x415e58(0x30d)]=![];switch(this[_0x415e58(0x355)]){case _0x415e58(0x667):this[_0x415e58(0x30d)]=!_0x39b4a7[_0x415e58(0x22d)];break;case _0x415e58(0x44d):case'pagedown':this['_isButtonHidden']=!_0x39b4a7[_0x415e58(0x3be)];break;case _0x415e58(0x626):case'up':case _0x415e58(0x684):case _0x415e58(0x316):case'ok':this['_isButtonHidden']=!_0x39b4a7[_0x415e58(0x39b)];break;case _0x415e58(0x2c1):this[_0x415e58(0x30d)]=!_0x39b4a7[_0x415e58(0x753)];break;}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x72f)]=Sprite_Button['prototype'][_0xe356ff(0x325)],Sprite_Button[_0xe356ff(0x4e8)][_0xe356ff(0x325)]=function(){const _0x5a551a=_0xe356ff;SceneManager['areButtonsHidden']()||this[_0x5a551a(0x30d)]?this['hideButtonFromView']():VisuMZ['CoreEngine']['Sprite_Button_updateOpacity'][_0x5a551a(0x329)](this);},Sprite_Button[_0xe356ff(0x4e8)][_0xe356ff(0x32e)]=function(){const _0x5db0a0=_0xe356ff;this[_0x5db0a0(0x26d)]=![],this['opacity']=0x0,this['x']=Graphics[_0x5db0a0(0x234)]*0xa,this['y']=Graphics[_0x5db0a0(0x5fb)]*0xa;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x351)]=Sprite_Battler[_0xe356ff(0x4e8)][_0xe356ff(0x517)],Sprite_Battler['prototype'][_0xe356ff(0x517)]=function(_0x2ccb91,_0xaa8ada,_0x314797){const _0x4ae771=_0xe356ff;(this[_0x4ae771(0x5cb)]!==_0x2ccb91||this[_0x4ae771(0x1e4)]!==_0xaa8ada)&&(this[_0x4ae771(0x39e)](_0x4ae771(0x2dd)),this[_0x4ae771(0x390)]=_0x314797),VisuMZ['CoreEngine'][_0x4ae771(0x351)][_0x4ae771(0x329)](this,_0x2ccb91,_0xaa8ada,_0x314797);},Sprite_Battler[_0xe356ff(0x4e8)][_0xe356ff(0x39e)]=function(_0x35ea81){const _0x41129e=_0xe356ff;this[_0x41129e(0x3cd)]=_0x35ea81;},Sprite_Battler[_0xe356ff(0x4e8)][_0xe356ff(0x265)]=function(){const _0x319b74=_0xe356ff;if(this[_0x319b74(0x58f)]<=0x0)return;const _0x11cd6d=this[_0x319b74(0x58f)],_0x44f856=this['_movementWholeDuration'],_0xc853eb=this['_moveEasingType'];this[_0x319b74(0x46d)]=this[_0x319b74(0x638)](this['_offsetX'],this[_0x319b74(0x5cb)],_0x11cd6d,_0x44f856,_0xc853eb),this[_0x319b74(0x3f9)]=this['applyEasing'](this[_0x319b74(0x3f9)],this[_0x319b74(0x1e4)],_0x11cd6d,_0x44f856,_0xc853eb),this[_0x319b74(0x58f)]--;if(this[_0x319b74(0x58f)]<=0x0)this[_0x319b74(0x589)]();},Sprite_Battler[_0xe356ff(0x4e8)]['applyEasing']=function(_0x50899c,_0x4c55d2,_0x2a60ef,_0x2d4e20,_0x5cc016){const _0x41c7b6=_0xe356ff,_0x400032=VisuMZ[_0x41c7b6(0x6e6)]((_0x2d4e20-_0x2a60ef)/_0x2d4e20,_0x5cc016||_0x41c7b6(0x2dd)),_0x5bcb7f=VisuMZ[_0x41c7b6(0x6e6)]((_0x2d4e20-_0x2a60ef+0x1)/_0x2d4e20,_0x5cc016||_0x41c7b6(0x2dd)),_0x387253=(_0x50899c-_0x4c55d2*_0x400032)/(0x1-_0x400032);return _0x387253+(_0x4c55d2-_0x387253)*_0x5bcb7f;},VisuMZ['CoreEngine']['Sprite_Actor_setActorHome']=Sprite_Actor['prototype'][_0xe356ff(0x459)],Sprite_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x459)]=function(_0x37a60f){const _0x585af9=_0xe356ff;VisuMZ[_0x585af9(0x64f)][_0x585af9(0x5cf)]['UI'][_0x585af9(0x30c)]?this['setActorHomeRepositioned'](_0x37a60f):VisuMZ[_0x585af9(0x64f)][_0x585af9(0x55a)][_0x585af9(0x329)](this,_0x37a60f);},Sprite_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x53e)]=function(_0x2d04a5){const _0x5f2815=_0xe356ff;let _0x49c9a9=Math[_0x5f2815(0x398)](Graphics[_0x5f2815(0x234)]/0x2+0xc0);_0x49c9a9-=Math['floor']((Graphics[_0x5f2815(0x234)]-Graphics['boxWidth'])/0x2),_0x49c9a9+=_0x2d04a5*0x20;let _0x26880f=Graphics[_0x5f2815(0x5fb)]-0xc8-$gameParty[_0x5f2815(0x5c2)]()*0x30;_0x26880f-=Math[_0x5f2815(0x4b8)]((Graphics[_0x5f2815(0x5fb)]-Graphics[_0x5f2815(0x1ef)])/0x2),_0x26880f+=_0x2d04a5*0x30,this['setHome'](_0x49c9a9,_0x26880f);},Sprite_Actor[_0xe356ff(0x4e8)]['retreat']=function(){const _0x577919=_0xe356ff;this[_0x577919(0x517)](0x4b0,0x0,0x78);},Sprite_Animation[_0xe356ff(0x4e8)][_0xe356ff(0x1cd)]=function(_0x24f4d8){const _0xf31d06=_0xe356ff;this[_0xf31d06(0x20f)]=_0x24f4d8;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x2e9)]=Sprite_Animation['prototype'][_0xe356ff(0x21c)],Sprite_Animation[_0xe356ff(0x4e8)]['processSoundTimings']=function(){const _0x115fb9=_0xe356ff;if(this[_0x115fb9(0x20f)])return;VisuMZ[_0x115fb9(0x64f)][_0x115fb9(0x2e9)][_0x115fb9(0x329)](this);},Sprite_Animation[_0xe356ff(0x4e8)][_0xe356ff(0x1ad)]=function(_0x5d9446){const _0x5cfc9d=_0xe356ff;if(_0x5d9446[_0x5cfc9d(0x6ef)]){}const _0x30dcab=this[_0x5cfc9d(0x335)][_0x5cfc9d(0x639)];let _0x22efea=_0x5d9446[_0x5cfc9d(0x5fb)]*_0x5d9446[_0x5cfc9d(0x426)]['y'],_0x32941c=0x0,_0x2f099d=-_0x22efea/0x2;if(_0x30dcab[_0x5cfc9d(0x211)](/<(?:HEAD|HEADER|TOP)>/i))_0x2f099d=-_0x22efea;if(_0x30dcab[_0x5cfc9d(0x211)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2f099d=0x0;if(_0x30dcab[_0x5cfc9d(0x211)](/<(?:LEFT)>/i))_0x32941c=-_0x5d9446[_0x5cfc9d(0x234)]/0x2;if(_0x30dcab[_0x5cfc9d(0x211)](/<(?:RIGHT)>/i))_0x2f099d=_0x5d9446[_0x5cfc9d(0x234)]/0x2;if(_0x30dcab['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x32941c=Number(RegExp['$1'])*_0x5d9446[_0x5cfc9d(0x234)];_0x30dcab[_0x5cfc9d(0x211)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2f099d=(0x1-Number(RegExp['$1']))*-_0x22efea);_0x30dcab[_0x5cfc9d(0x211)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x32941c=Number(RegExp['$1'])*_0x5d9446[_0x5cfc9d(0x234)],_0x2f099d=(0x1-Number(RegExp['$2']))*-_0x22efea);if(_0x30dcab[_0x5cfc9d(0x211)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x32941c+=Number(RegExp['$1']);if(_0x30dcab[_0x5cfc9d(0x211)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2f099d+=Number(RegExp['$1']);_0x30dcab[_0x5cfc9d(0x211)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x32941c+=Number(RegExp['$1']),_0x2f099d+=Number(RegExp['$2']));const _0x53b25e=new Point(_0x32941c,_0x2f099d);return _0x5d9446[_0x5cfc9d(0x520)](),_0x5d9446[_0x5cfc9d(0x3aa)][_0x5cfc9d(0x339)](_0x53b25e);},Sprite_AnimationMV[_0xe356ff(0x4e8)][_0xe356ff(0x1cd)]=function(_0x273f0f){this['_muteSound']=_0x273f0f;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x72b)]=Sprite_AnimationMV['prototype'][_0xe356ff(0x565)],Sprite_AnimationMV['prototype'][_0xe356ff(0x565)]=function(_0x354e57){const _0xe33f20=_0xe356ff;this['_muteSound']&&(_0x354e57=JsonEx[_0xe33f20(0x56e)](_0x354e57),_0x354e57['se']&&(_0x354e57['se'][_0xe33f20(0x485)]=0x0)),VisuMZ[_0xe33f20(0x64f)]['Sprite_AnimationMV_processTimingData'][_0xe33f20(0x329)](this,_0x354e57);},Sprite_Damage[_0xe356ff(0x4e8)][_0xe356ff(0x743)]=function(_0xcce858){const _0x567780=_0xe356ff;let _0x18d4e0=Math[_0x567780(0x24d)](_0xcce858)[_0x567780(0x68c)]();this[_0x567780(0x47d)]()&&(_0x18d4e0=VisuMZ[_0x567780(0x240)](_0x18d4e0));const _0x42be28=this[_0x567780(0x49d)](),_0x10c092=Math[_0x567780(0x4b8)](_0x42be28*0.75);for(let _0x7076d1=0x0;_0x7076d1<_0x18d4e0[_0x567780(0x437)];_0x7076d1++){const _0x51d9a8=this[_0x567780(0x412)](_0x10c092,_0x42be28);_0x51d9a8[_0x567780(0x535)][_0x567780(0x3f2)](_0x18d4e0[_0x7076d1],0x0,0x0,_0x10c092,_0x42be28,_0x567780(0x679)),_0x51d9a8['x']=(_0x7076d1-(_0x18d4e0[_0x567780(0x437)]-0x1)/0x2)*_0x10c092,_0x51d9a8['dy']=-_0x7076d1;}},Sprite_Damage['prototype'][_0xe356ff(0x47d)]=function(){const _0x2500f8=_0xe356ff;return VisuMZ[_0x2500f8(0x64f)][_0x2500f8(0x5cf)][_0x2500f8(0x69e)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0xe356ff(0x4e8)]['valueOutlineColor']=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x35c)]=Sprite_Gauge[_0xe356ff(0x4e8)][_0xe356ff(0x500)],Sprite_Gauge['prototype'][_0xe356ff(0x500)]=function(){const _0x247a4b=_0xe356ff;return VisuMZ[_0x247a4b(0x64f)][_0x247a4b(0x35c)][_0x247a4b(0x329)](this)['clamp'](0x0,0x1);},VisuMZ['CoreEngine'][_0xe356ff(0x1e8)]=Sprite_Gauge[_0xe356ff(0x4e8)][_0xe356ff(0x3e9)],Sprite_Gauge[_0xe356ff(0x4e8)]['currentValue']=function(){const _0x1d4c14=_0xe356ff;let _0x2e7775=VisuMZ[_0x1d4c14(0x64f)][_0x1d4c14(0x1e8)][_0x1d4c14(0x329)](this);return _0x2e7775;},Sprite_Gauge[_0xe356ff(0x4e8)][_0xe356ff(0x2b2)]=function(){const _0x4381e6=_0xe356ff;let _0xa0cf1=this[_0x4381e6(0x3e9)]();this[_0x4381e6(0x47d)]()&&(_0xa0cf1=VisuMZ[_0x4381e6(0x240)](_0xa0cf1));const _0x52f906=this[_0x4381e6(0x2b0)]()-0x1,_0x5504f8=this['bitmapHeight']();this[_0x4381e6(0x1d2)](),this[_0x4381e6(0x535)][_0x4381e6(0x3f2)](_0xa0cf1,0x0,0x0,_0x52f906,_0x5504f8,'right');},Sprite_Gauge['prototype'][_0xe356ff(0x290)]=function(){return 0x3;},Sprite_Gauge[_0xe356ff(0x4e8)]['useDigitGrouping']=function(){const _0x527717=_0xe356ff;return VisuMZ[_0x527717(0x64f)][_0x527717(0x5cf)][_0x527717(0x69e)][_0x527717(0x37e)];},Sprite_Gauge['prototype'][_0xe356ff(0x61e)]=function(){const _0x2028df=_0xe356ff;return ColorManager[_0x2028df(0x674)]();};function Sprite_TitlePictureButton(){const _0x38feb4=_0xe356ff;this[_0x38feb4(0x374)](...arguments);}Sprite_TitlePictureButton[_0xe356ff(0x4e8)]=Object['create'](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0xe356ff(0x4e8)][_0xe356ff(0x255)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0xe356ff(0x4e8)]['initialize']=function(_0x3fc94e){const _0x2a355c=_0xe356ff;Sprite_Clickable[_0x2a355c(0x4e8)][_0x2a355c(0x374)][_0x2a355c(0x329)](this),this[_0x2a355c(0x4db)]=_0x3fc94e,this[_0x2a355c(0x2fc)]=null,this[_0x2a355c(0x248)]();},Sprite_TitlePictureButton[_0xe356ff(0x4e8)]['setup']=function(){const _0x444b07=_0xe356ff;this['x']=Graphics[_0x444b07(0x234)],this['y']=Graphics['height'],this[_0x444b07(0x26d)]=![],this[_0x444b07(0x2c4)]();},Sprite_TitlePictureButton[_0xe356ff(0x4e8)][_0xe356ff(0x2c4)]=function(){const _0xc2c1d7=_0xe356ff;this[_0xc2c1d7(0x535)]=ImageManager[_0xc2c1d7(0x281)](this[_0xc2c1d7(0x4db)][_0xc2c1d7(0x65e)]),this[_0xc2c1d7(0x535)][_0xc2c1d7(0x54b)](this['onButtonImageLoad']['bind'](this));},Sprite_TitlePictureButton['prototype'][_0xe356ff(0x755)]=function(){const _0x595428=_0xe356ff;this[_0x595428(0x4db)][_0x595428(0x4a8)][_0x595428(0x329)](this),this[_0x595428(0x4db)][_0x595428(0x301)][_0x595428(0x329)](this),this[_0x595428(0x3ee)](this[_0x595428(0x4db)][_0x595428(0x342)][_0x595428(0x4f1)](this));},Sprite_TitlePictureButton[_0xe356ff(0x4e8)][_0xe356ff(0x26e)]=function(){const _0x374159=_0xe356ff;Sprite_Clickable[_0x374159(0x4e8)][_0x374159(0x26e)][_0x374159(0x329)](this),this[_0x374159(0x325)](),this['processTouch']();},Sprite_TitlePictureButton['prototype'][_0xe356ff(0x30f)]=function(){const _0x2b0a8e=_0xe356ff;return VisuMZ['CoreEngine'][_0x2b0a8e(0x5cf)]['MenuLayout'][_0x2b0a8e(0x62b)][_0x2b0a8e(0x319)];},Sprite_TitlePictureButton[_0xe356ff(0x4e8)]['updateOpacity']=function(){const _0x5564e5=_0xe356ff;this['_pressed']?this['opacity']=0xff:(this[_0x5564e5(0x558)]+=this[_0x5564e5(0x26d)]?this[_0x5564e5(0x30f)]():-0x1*this['fadeSpeed'](),this[_0x5564e5(0x558)]=Math['min'](0xc0,this[_0x5564e5(0x558)]));},Sprite_TitlePictureButton['prototype']['setClickHandler']=function(_0x1c8177){this['_clickHandler']=_0x1c8177;},Sprite_TitlePictureButton[_0xe356ff(0x4e8)][_0xe356ff(0x566)]=function(){const _0x4a96bb=_0xe356ff;this[_0x4a96bb(0x2fc)]&&this[_0x4a96bb(0x2fc)]();},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x513)]=Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x374)]=function(){const _0x1f8890=_0xe356ff;VisuMZ['CoreEngine'][_0x1f8890(0x513)][_0x1f8890(0x329)](this),this[_0x1f8890(0x493)]();},Spriteset_Base[_0xe356ff(0x4e8)]['initMembersCoreEngine']=function(){const _0xbe8029=_0xe356ff;this['_fauxAnimationSprites']=[],this['_cacheScaleX']=this[_0xbe8029(0x426)]['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ[_0xe356ff(0x64f)]['Spriteset_Base_destroy']=Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x588)],Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x588)]=function(_0x3f0e2f){const _0x30b648=_0xe356ff;this['removeAllFauxAnimations'](),VisuMZ[_0x30b648(0x64f)][_0x30b648(0x5a5)][_0x30b648(0x329)](this,_0x3f0e2f);},VisuMZ['CoreEngine'][_0xe356ff(0x685)]=Spriteset_Base['prototype'][_0xe356ff(0x26e)],Spriteset_Base[_0xe356ff(0x4e8)]['update']=function(){const _0x58dc57=_0xe356ff;VisuMZ[_0x58dc57(0x64f)]['Spriteset_Base_update'][_0x58dc57(0x329)](this),this[_0x58dc57(0x262)](),this[_0x58dc57(0x66b)]();},Spriteset_Base[_0xe356ff(0x4e8)]['updatePictureAntiZoom']=function(){const _0x2cfb69=_0xe356ff;if(!VisuMZ[_0x2cfb69(0x64f)][_0x2cfb69(0x5cf)][_0x2cfb69(0x69e)][_0x2cfb69(0x6e8)])return;if(this['_cacheScaleX']===this['scale']['x']&&this['_cacheScaleY']===this[_0x2cfb69(0x426)]['y'])return;this[_0x2cfb69(0x449)](),this[_0x2cfb69(0x58e)]=this[_0x2cfb69(0x426)]['x'],this[_0x2cfb69(0x5a4)]=this[_0x2cfb69(0x426)]['y'];},Spriteset_Base[_0xe356ff(0x4e8)]['adjustPictureAntiZoom']=function(){const _0x48bfe1=_0xe356ff;this[_0x48bfe1(0x426)]['x']!==0x0&&(this['_pictureContainer'][_0x48bfe1(0x426)]['x']=0x1/this[_0x48bfe1(0x426)]['x'],this[_0x48bfe1(0x60c)]['x']=-(this['x']/this[_0x48bfe1(0x426)]['x'])),this[_0x48bfe1(0x426)]['y']!==0x0&&(this[_0x48bfe1(0x60c)]['scale']['y']=0x1/this[_0x48bfe1(0x426)]['y'],this[_0x48bfe1(0x60c)]['y']=-(this['y']/this[_0x48bfe1(0x426)]['y']));},Spriteset_Base['prototype'][_0xe356ff(0x66b)]=function(){const _0x2c112b=_0xe356ff;for(const _0x3c60d2 of this[_0x2c112b(0x4ab)]){!_0x3c60d2[_0x2c112b(0x50a)]()&&this[_0x2c112b(0x2d1)](_0x3c60d2);}this['processFauxAnimationRequests']();},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x66c)]=function(){const _0x338de0=_0xe356ff;for(;;){const _0x46d246=$gameTemp[_0x338de0(0x5b6)]();if(_0x46d246)this['createFauxAnimation'](_0x46d246);else break;}},Spriteset_Base[_0xe356ff(0x4e8)]['createFauxAnimation']=function(_0x23cc23){const _0x4233e8=_0xe356ff,_0x2d68ff=$dataAnimations[_0x23cc23[_0x4233e8(0x4f9)]],_0x5ddd5e=_0x23cc23[_0x4233e8(0x225)],_0x504572=_0x23cc23[_0x4233e8(0x537)],_0x4d3102=_0x23cc23[_0x4233e8(0x2ed)];let _0x4fd2b9=this[_0x4233e8(0x5b8)]();const _0x123800=this[_0x4233e8(0x4a4)]();if(this[_0x4233e8(0x5f7)](_0x2d68ff))for(const _0x495e08 of _0x5ddd5e){this[_0x4233e8(0x410)]([_0x495e08],_0x2d68ff,_0x504572,_0x4fd2b9,_0x4d3102),_0x4fd2b9+=_0x123800;}else this[_0x4233e8(0x410)](_0x5ddd5e,_0x2d68ff,_0x504572,_0x4fd2b9,_0x4d3102);},Spriteset_Base['prototype'][_0xe356ff(0x410)]=function(_0x24d466,_0x110fa2,_0x41f7b3,_0xfab252,_0x366bee){const _0x522700=_0xe356ff,_0x1c5cc7=this['isMVAnimation'](_0x110fa2),_0x3daa89=new(_0x1c5cc7?Sprite_AnimationMV:Sprite_Animation)(),_0x51dbf5=this[_0x522700(0x406)](_0x24d466);this['animationShouldMirror'](_0x24d466[0x0])&&(_0x41f7b3=!_0x41f7b3),_0x3daa89[_0x522700(0x4b0)]=_0x24d466,_0x3daa89[_0x522700(0x248)](_0x51dbf5,_0x110fa2,_0x41f7b3,_0xfab252),_0x3daa89[_0x522700(0x1cd)](_0x366bee),this['_effectsContainer'][_0x522700(0x618)](_0x3daa89),this[_0x522700(0x4ab)][_0x522700(0x62d)](_0x3daa89);},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x2d1)]=function(_0x526a36){const _0x279c71=_0xe356ff;this[_0x279c71(0x4ab)][_0x279c71(0x5f5)](_0x526a36),this[_0x279c71(0x6aa)][_0x279c71(0x236)](_0x526a36);for(const _0x13d786 of _0x526a36[_0x279c71(0x4b0)]){_0x13d786[_0x279c71(0x693)]&&_0x13d786[_0x279c71(0x693)]();}_0x526a36[_0x279c71(0x588)]();},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x664)]=function(){const _0x203e69=_0xe356ff;for(const _0x30f428 of this[_0x203e69(0x4ab)]){this['removeFauxAnimation'](_0x30f428);}},Spriteset_Base['prototype']['isFauxAnimationPlaying']=function(){const _0x5796ca=_0xe356ff;return this[_0x5796ca(0x4ab)][_0x5796ca(0x437)]>0x0;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x376)]=Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x632)],Spriteset_Base['prototype'][_0xe356ff(0x632)]=function(){const _0x18c223=_0xe356ff;VisuMZ['CoreEngine'][_0x18c223(0x376)]['call'](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x379)]=function(){const _0x4609cf=_0xe356ff;if(!$gameScreen)return;if($gameScreen[_0x4609cf(0x499)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x4609cf(0x6fc)]());const _0x2a815d=$gameScreen[_0x4609cf(0x503)]();switch($gameScreen[_0x4609cf(0x503)]()){case _0x4609cf(0x2ab):this['updatePositionCoreEngineShakeOriginal']();break;case _0x4609cf(0x34d):this[_0x4609cf(0x276)]();break;case _0x4609cf(0x256):this[_0x4609cf(0x740)]();break;default:this[_0x4609cf(0x6f7)]();break;}},Spriteset_Base[_0xe356ff(0x4e8)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x3f9d45=_0xe356ff,_0x3bcda2=VisuMZ[_0x3f9d45(0x64f)][_0x3f9d45(0x5cf)][_0x3f9d45(0x5c1)];if(_0x3bcda2&&_0x3bcda2[_0x3f9d45(0x2af)])return _0x3bcda2[_0x3f9d45(0x2af)][_0x3f9d45(0x329)](this);this['x']+=Math[_0x3f9d45(0x398)]($gameScreen[_0x3f9d45(0x6fc)]());},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x6f7)]=function(){const _0x297616=_0xe356ff,_0x33ee5a=VisuMZ['CoreEngine'][_0x297616(0x5cf)][_0x297616(0x5c1)];if(_0x33ee5a&&_0x33ee5a[_0x297616(0x311)])return _0x33ee5a[_0x297616(0x311)][_0x297616(0x329)](this);const _0x4299e3=$gameScreen[_0x297616(0x2e2)]*0.75,_0x2ecfae=$gameScreen[_0x297616(0x730)]*0.6,_0x21c281=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x297616(0x472)](_0x4299e3)-Math['randomInt'](_0x2ecfae))*(Math[_0x297616(0x6a7)](_0x21c281,0x1e)*0.5),this['y']+=Math[_0x297616(0x398)](Math['randomInt'](_0x4299e3)-Math[_0x297616(0x472)](_0x2ecfae))*(Math['min'](_0x21c281,0x1e)*0.5);},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x276)]=function(){const _0x2430c8=_0xe356ff,_0x8234c=VisuMZ['CoreEngine'][_0x2430c8(0x5cf)][_0x2430c8(0x5c1)];if(_0x8234c&&_0x8234c[_0x2430c8(0x3f8)])return _0x8234c[_0x2430c8(0x3f8)][_0x2430c8(0x329)](this);const _0x43e370=$gameScreen[_0x2430c8(0x2e2)]*0.75,_0xe17f97=$gameScreen['_shakeSpeed']*0.6,_0x48ad09=$gameScreen[_0x2430c8(0x499)];this['x']+=Math[_0x2430c8(0x398)](Math[_0x2430c8(0x472)](_0x43e370)-Math[_0x2430c8(0x472)](_0xe17f97))*(Math[_0x2430c8(0x6a7)](_0x48ad09,0x1e)*0.5);},Spriteset_Base[_0xe356ff(0x4e8)][_0xe356ff(0x740)]=function(){const _0x10943d=_0xe356ff,_0xf48d4=VisuMZ[_0x10943d(0x64f)][_0x10943d(0x5cf)][_0x10943d(0x5c1)];if(_0xf48d4&&_0xf48d4[_0x10943d(0x44b)])return _0xf48d4[_0x10943d(0x44b)][_0x10943d(0x329)](this);const _0x3da2a2=$gameScreen[_0x10943d(0x2e2)]*0.75,_0x54ec2f=$gameScreen[_0x10943d(0x730)]*0.6,_0xf3849e=$gameScreen[_0x10943d(0x499)];this['y']+=Math[_0x10943d(0x398)](Math[_0x10943d(0x472)](_0x3da2a2)-Math[_0x10943d(0x472)](_0x54ec2f))*(Math['min'](_0xf3849e,0x1e)*0.5);},Spriteset_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x4df)]=function(){const _0x2ef14b=_0xe356ff;this['_backgroundFilter']=new PIXI[(_0x2ef14b(0x717))][(_0x2ef14b(0x4e4))](clamp=!![]),this[_0x2ef14b(0x3a1)]=new Sprite(),this['_backgroundSprite'][_0x2ef14b(0x535)]=SceneManager[_0x2ef14b(0x222)](),this[_0x2ef14b(0x3a1)]['filters']=[this[_0x2ef14b(0x20b)]],this['_baseSprite'][_0x2ef14b(0x618)](this[_0x2ef14b(0x3a1)]);},VisuMZ['CoreEngine'][_0xe356ff(0x2d0)]=Spriteset_Battle['prototype'][_0xe356ff(0x587)],Spriteset_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x587)]=function(){const _0x231d43=_0xe356ff;VisuMZ[_0x231d43(0x64f)][_0x231d43(0x5cf)]['UI'][_0x231d43(0x4d2)]&&this[_0x231d43(0x484)](),VisuMZ[_0x231d43(0x64f)]['Spriteset_Battle_createEnemies']['call'](this);},Spriteset_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x484)]=function(){const _0x26b824=_0xe356ff;for(member of $gameTroop[_0x26b824(0x73a)]()){member[_0x26b824(0x296)]();}},VisuMZ['CoreEngine'][_0xe356ff(0x482)]=Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Window_Base[_0xe356ff(0x4e8)]['initialize']=function(_0x2be811){const _0x4ab21b=_0xe356ff;_0x2be811['x']=Math[_0x4ab21b(0x398)](_0x2be811['x']),_0x2be811['y']=Math[_0x4ab21b(0x398)](_0x2be811['y']),_0x2be811[_0x4ab21b(0x234)]=Math[_0x4ab21b(0x398)](_0x2be811[_0x4ab21b(0x234)]),_0x2be811[_0x4ab21b(0x5fb)]=Math['round'](_0x2be811[_0x4ab21b(0x5fb)]),this[_0x4ab21b(0x61d)](),VisuMZ[_0x4ab21b(0x64f)]['Window_Base_initialize'][_0x4ab21b(0x329)](this,_0x2be811),this[_0x4ab21b(0x272)]();},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x61d)]=function(){const _0xf7a218=_0xe356ff;this[_0xf7a218(0x55e)]=VisuMZ['CoreEngine'][_0xf7a218(0x5cf)][_0xf7a218(0x69e)][_0xf7a218(0x681)],this[_0xf7a218(0x288)]=VisuMZ[_0xf7a218(0x64f)]['Settings']['QoL'][_0xf7a218(0x548)];},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x5c3)]=function(){const _0x55dcda=_0xe356ff;return VisuMZ['CoreEngine']['Settings'][_0x55dcda(0x3a9)][_0x55dcda(0x226)];},Window_Base[_0xe356ff(0x4e8)]['itemPadding']=function(){const _0x7ce7b8=_0xe356ff;return VisuMZ['CoreEngine'][_0x7ce7b8(0x5cf)][_0x7ce7b8(0x3a9)][_0x7ce7b8(0x3a4)];},Window_Base[_0xe356ff(0x4e8)]['updateBackOpacity']=function(){const _0x519032=_0xe356ff;this[_0x519032(0x2e4)]=VisuMZ[_0x519032(0x64f)]['Settings']['Window'][_0x519032(0x378)];},Window_Base['prototype'][_0xe356ff(0x666)]=function(){const _0x4abe00=_0xe356ff;return VisuMZ[_0x4abe00(0x64f)][_0x4abe00(0x5cf)]['Window'][_0x4abe00(0x2ea)];},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x239)]=function(){const _0x4afe0d=_0xe356ff;return VisuMZ['CoreEngine'][_0x4afe0d(0x5cf)][_0x4afe0d(0x3a9)]['OpenSpeed'];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4ca)]=Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x26e)],Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x26e)]=function(){const _0x2f19f5=_0xe356ff;VisuMZ[_0x2f19f5(0x64f)][_0x2f19f5(0x4ca)][_0x2f19f5(0x329)](this),this[_0x2f19f5(0x282)]();},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x74b)]=function(){const _0x25ea51=_0xe356ff;this[_0x25ea51(0x250)]&&(this[_0x25ea51(0x21e)]+=this[_0x25ea51(0x239)](),this['isOpen']()&&(this[_0x25ea51(0x250)]=![]));},Window_Base[_0xe356ff(0x4e8)]['updateClose']=function(){const _0x8897c5=_0xe356ff;this[_0x8897c5(0x476)]&&(this[_0x8897c5(0x21e)]-=this['openingSpeed'](),this['isClosed']()&&(this[_0x8897c5(0x476)]=![]));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x24e)]=Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x3f2)],Window_Base[_0xe356ff(0x4e8)]['drawText']=function(_0x3883a3,_0x312851,_0x4c937c,_0x14fc7f,_0x4d6faa){const _0x2fe414=_0xe356ff;if(this[_0x2fe414(0x47d)]())_0x3883a3=VisuMZ[_0x2fe414(0x240)](_0x3883a3);VisuMZ[_0x2fe414(0x64f)][_0x2fe414(0x24e)][_0x2fe414(0x329)](this,_0x3883a3,_0x312851,_0x4c937c,_0x14fc7f,_0x4d6faa);},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x47d)]=function(){const _0x2d26ab=_0xe356ff;return this[_0x2d26ab(0x55e)];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x2db)]=Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x2a0)],Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x2a0)]=function(_0x317129,_0xb1bf8e,_0x1ff3e3,_0x3bf7ac){const _0xae7088=_0xe356ff;var _0x3b5aaf=VisuMZ['CoreEngine'][_0xae7088(0x2db)][_0xae7088(0x329)](this,_0x317129,_0xb1bf8e,_0x1ff3e3,_0x3bf7ac);if(this[_0xae7088(0x577)]())_0x3b5aaf[_0xae7088(0x2c7)]=VisuMZ[_0xae7088(0x240)](_0x3b5aaf[_0xae7088(0x2c7)]);return _0x3b5aaf;},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x577)]=function(){const _0x16b280=_0xe356ff;return this[_0x16b280(0x288)];},Window_Base[_0xe356ff(0x4e8)]['enableDigitGrouping']=function(_0x366878){const _0x2e1d28=_0xe356ff;this[_0x2e1d28(0x55e)]=_0x366878;},Window_Base['prototype']['enableDigitGroupingEx']=function(_0x51ae23){this['_digitGroupingEx']=_0x51ae23;},VisuMZ['CoreEngine'][_0xe356ff(0x6d5)]=Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x402)],Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x402)]=function(_0x31e594,_0x57f612,_0x44f043){const _0x2bbe2e=_0xe356ff;_0x57f612=Math[_0x2bbe2e(0x398)](_0x57f612),_0x44f043=Math[_0x2bbe2e(0x398)](_0x44f043),VisuMZ[_0x2bbe2e(0x64f)][_0x2bbe2e(0x6d5)][_0x2bbe2e(0x329)](this,_0x31e594,_0x57f612,_0x44f043);},VisuMZ['CoreEngine'][_0xe356ff(0x6ac)]=Window_Base[_0xe356ff(0x4e8)]['drawFace'],Window_Base['prototype'][_0xe356ff(0x34b)]=function(_0x37c568,_0x1f7567,_0x104fac,_0x46b245,_0x47598a,_0x263854){const _0x579ae5=_0xe356ff;_0x47598a=_0x47598a||ImageManager[_0x579ae5(0x462)],_0x263854=_0x263854||ImageManager[_0x579ae5(0x750)],_0x104fac=Math[_0x579ae5(0x398)](_0x104fac),_0x46b245=Math[_0x579ae5(0x398)](_0x46b245),_0x47598a=Math['round'](_0x47598a),_0x263854=Math[_0x579ae5(0x398)](_0x263854),VisuMZ[_0x579ae5(0x64f)]['Window_Base_drawFace']['call'](this,_0x37c568,_0x1f7567,_0x104fac,_0x46b245,_0x47598a,_0x263854);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6d7)]=Window_Base['prototype'][_0xe356ff(0x24c)],Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x24c)]=function(_0x120f22,_0x4310dd,_0x1a849c,_0xe5c916){const _0x4ac4af=_0xe356ff;_0x1a849c=Math[_0x4ac4af(0x398)](_0x1a849c),_0xe5c916=Math['round'](_0xe5c916),VisuMZ[_0x4ac4af(0x64f)][_0x4ac4af(0x6d7)][_0x4ac4af(0x329)](this,_0x120f22,_0x4310dd,_0x1a849c,_0xe5c916);},VisuMZ[_0xe356ff(0x64f)]['Window_Selectable_itemRect']=Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x678)],Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x678)]=function(_0x57189d){const _0x13958c=_0xe356ff;let _0x56f3d8=VisuMZ['CoreEngine']['Window_Selectable_itemRect'][_0x13958c(0x329)](this,_0x57189d);return _0x56f3d8['x']=Math[_0x13958c(0x398)](_0x56f3d8['x']),_0x56f3d8['y']=Math[_0x13958c(0x398)](_0x56f3d8['y']),_0x56f3d8[_0x13958c(0x234)]=Math[_0x13958c(0x398)](_0x56f3d8[_0x13958c(0x234)]),_0x56f3d8[_0x13958c(0x5fb)]=Math[_0x13958c(0x398)](_0x56f3d8[_0x13958c(0x5fb)]),_0x56f3d8;},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6ee)]=Window_StatusBase[_0xe356ff(0x4e8)][_0xe356ff(0x557)],Window_StatusBase[_0xe356ff(0x4e8)][_0xe356ff(0x557)]=function(_0x436ddc,_0x5892d3,_0x1786ce){const _0x5f215c=_0xe356ff;_0x5892d3=Math['round'](_0x5892d3),_0x1786ce=Math[_0x5f215c(0x398)](_0x1786ce),VisuMZ['CoreEngine'][_0x5f215c(0x6ee)][_0x5f215c(0x329)](this,_0x436ddc,_0x5892d3,_0x1786ce);},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x272)]=function(){const _0x44fd45=_0xe356ff;this[_0x44fd45(0x6a5)]={'duration':0x0,'wholeDuration':0x0,'type':_0x44fd45(0x1ae),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x44fd45(0x426)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x44fd45(0x2e4)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0xe356ff(0x4e8)]['updateCoreEasing']=function(){const _0x5819bd=_0xe356ff;if(!this[_0x5819bd(0x6a5)])return;if(this[_0x5819bd(0x6a5)][_0x5819bd(0x68a)]<=0x0)return;this['x']=this[_0x5819bd(0x28c)](this['x'],this[_0x5819bd(0x6a5)][_0x5819bd(0x58a)]),this['y']=this[_0x5819bd(0x28c)](this['y'],this[_0x5819bd(0x6a5)][_0x5819bd(0x1d0)]),this[_0x5819bd(0x426)]['x']=this['applyCoreEasing'](this['scale']['x'],this[_0x5819bd(0x6a5)][_0x5819bd(0x373)]),this[_0x5819bd(0x426)]['y']=this[_0x5819bd(0x28c)](this['scale']['y'],this['_coreEasing'][_0x5819bd(0x52f)]),this[_0x5819bd(0x558)]=this[_0x5819bd(0x28c)](this[_0x5819bd(0x558)],this['_coreEasing'][_0x5819bd(0x304)]),this[_0x5819bd(0x2e4)]=this['applyCoreEasing'](this[_0x5819bd(0x2e4)],this[_0x5819bd(0x6a5)][_0x5819bd(0x41d)]),this[_0x5819bd(0x5fe)]=this[_0x5819bd(0x28c)](this[_0x5819bd(0x5fe)],this[_0x5819bd(0x6a5)][_0x5819bd(0x595)]),this[_0x5819bd(0x6a5)]['duration']--;},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x28c)]=function(_0x26cac8,_0x3c72ff){const _0x13b2ae=_0xe356ff;if(!this['_coreEasing'])return _0x3c72ff;const _0x4d181c=this[_0x13b2ae(0x6a5)]['duration'],_0x3a7620=this[_0x13b2ae(0x6a5)][_0x13b2ae(0x2d3)],_0x13c115=this[_0x13b2ae(0x413)]((_0x3a7620-_0x4d181c)/_0x3a7620),_0x4e760e=this[_0x13b2ae(0x413)]((_0x3a7620-_0x4d181c+0x1)/_0x3a7620),_0x48ab2c=(_0x26cac8-_0x3c72ff*_0x13c115)/(0x1-_0x13c115);return _0x48ab2c+(_0x3c72ff-_0x48ab2c)*_0x4e760e;},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x413)]=function(_0x5b137a){const _0x2cdfa3=_0xe356ff;if(!this['_coreEasing'])return _0x5b137a;return VisuMZ[_0x2cdfa3(0x6e6)](_0x5b137a,this[_0x2cdfa3(0x6a5)][_0x2cdfa3(0x70b)]||_0x2cdfa3(0x1ae));},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x315)]=function(_0x273a60,_0x304e9b){const _0x5268a1=_0xe356ff;if(!this[_0x5268a1(0x6a5)])return;this['x']=this[_0x5268a1(0x6a5)][_0x5268a1(0x58a)],this['y']=this[_0x5268a1(0x6a5)][_0x5268a1(0x1d0)],this[_0x5268a1(0x426)]['x']=this['_coreEasing'][_0x5268a1(0x373)],this[_0x5268a1(0x426)]['y']=this[_0x5268a1(0x6a5)][_0x5268a1(0x52f)],this['opacity']=this[_0x5268a1(0x6a5)]['targetOpacity'],this[_0x5268a1(0x2e4)]=this[_0x5268a1(0x6a5)][_0x5268a1(0x41d)],this[_0x5268a1(0x5fe)]=this['_coreEasing'][_0x5268a1(0x595)],this[_0x5268a1(0x3ed)](_0x273a60,_0x304e9b,this['x'],this['y'],this[_0x5268a1(0x426)]['x'],this[_0x5268a1(0x426)]['y'],this[_0x5268a1(0x558)],this[_0x5268a1(0x2e4)],this[_0x5268a1(0x5fe)]);},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x3ed)]=function(_0x10e63b,_0x1aa9e4,_0x4109f6,_0x837886,_0x1d9bbc,_0x2c399c,_0x513b15,_0x495aba,_0x593536){this['_coreEasing']={'duration':_0x10e63b,'wholeDuration':_0x10e63b,'type':_0x1aa9e4,'targetX':_0x4109f6,'targetY':_0x837886,'targetScaleX':_0x1d9bbc,'targetScaleY':_0x2c399c,'targetOpacity':_0x513b15,'targetBackOpacity':_0x495aba,'targetContentsOpacity':_0x593536};},Window_Base[_0xe356ff(0x4e8)]['drawCurrencyValue']=function(_0x1709cd,_0x45feee,_0xa0bb38,_0xe5b52f,_0x459688){const _0x1c25b9=_0xe356ff;this[_0x1c25b9(0x2de)](),this[_0x1c25b9(0x6c3)][_0x1c25b9(0x49d)]=VisuMZ[_0x1c25b9(0x64f)][_0x1c25b9(0x5cf)][_0x1c25b9(0x1e6)][_0x1c25b9(0x625)];const _0x2bc760=VisuMZ[_0x1c25b9(0x64f)][_0x1c25b9(0x5cf)][_0x1c25b9(0x1e6)]['GoldIcon'];if(_0x2bc760>0x0&&_0x45feee===TextManager['currencyUnit']){const _0x45972c=_0xe5b52f+(this[_0x1c25b9(0x5c3)]()-ImageManager[_0x1c25b9(0x218)])/0x2;this[_0x1c25b9(0x402)](_0x2bc760,_0xa0bb38+(_0x459688-ImageManager['iconWidth']),_0x45972c),_0x459688-=ImageManager[_0x1c25b9(0x425)]+0x4;}else this['changeTextColor'](ColorManager[_0x1c25b9(0x208)]()),this[_0x1c25b9(0x3f2)](_0x45feee,_0xa0bb38,_0xe5b52f,_0x459688,_0x1c25b9(0x411)),_0x459688-=this[_0x1c25b9(0x5d6)](_0x45feee)+0x6;this['resetTextColor']();const _0x55ecce=this[_0x1c25b9(0x5d6)](this[_0x1c25b9(0x55e)]?VisuMZ[_0x1c25b9(0x240)](_0x1709cd):_0x1709cd);_0x55ecce>_0x459688?this[_0x1c25b9(0x3f2)](VisuMZ[_0x1c25b9(0x64f)][_0x1c25b9(0x5cf)][_0x1c25b9(0x1e6)][_0x1c25b9(0x4f7)],_0xa0bb38,_0xe5b52f,_0x459688,_0x1c25b9(0x411)):this[_0x1c25b9(0x3f2)](_0x1709cd,_0xa0bb38,_0xe5b52f,_0x459688,'right'),this[_0x1c25b9(0x2de)]();},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x395)]=function(_0x4c258c,_0x4d51e3,_0x4cf38a,_0x6a3a12,_0x17cf8c){const _0x1ac756=_0xe356ff,_0x3d3656=ImageManager['loadSystem'](_0x1ac756(0x25b)),_0x421dd0=ImageManager[_0x1ac756(0x425)],_0x538592=ImageManager['iconHeight'],_0x22c3ad=_0x4c258c%0x10*_0x421dd0,_0x42a9d5=Math[_0x1ac756(0x4b8)](_0x4c258c/0x10)*_0x538592,_0x3d017f=_0x6a3a12,_0x27c9f7=_0x6a3a12;this[_0x1ac756(0x6c3)]['_context'][_0x1ac756(0x6f8)]=_0x17cf8c,this[_0x1ac756(0x6c3)][_0x1ac756(0x1b0)](_0x3d3656,_0x22c3ad,_0x42a9d5,_0x421dd0,_0x538592,_0x4d51e3,_0x4cf38a,_0x3d017f,_0x27c9f7),this[_0x1ac756(0x6c3)][_0x1ac756(0x3e0)][_0x1ac756(0x6f8)]=!![];},Window_Base[_0xe356ff(0x4e8)]['drawGauge']=function(_0x199289,_0x34a615,_0x5c58f7,_0x4fd67d,_0x2bd132,_0x5877bc){const _0x19e167=_0xe356ff,_0x4ec06d=Math[_0x19e167(0x4b8)]((_0x5c58f7-0x2)*_0x4fd67d),_0x2541e6=Sprite_Gauge[_0x19e167(0x4e8)][_0x19e167(0x31f)]['call'](this),_0x3248fb=_0x34a615+this[_0x19e167(0x5c3)]()-_0x2541e6-0x2;this['contents'][_0x19e167(0x46e)](_0x199289,_0x3248fb,_0x5c58f7,_0x2541e6,ColorManager[_0x19e167(0x6ba)]()),this['contents'][_0x19e167(0x2dc)](_0x199289+0x1,_0x3248fb+0x1,_0x4ec06d,_0x2541e6-0x2,_0x2bd132,_0x5877bc);},Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x6e1)]=function(_0x453f9b){const _0x68cfb4=_0xe356ff;let _0x2c2cc0=this['index']();const _0x3d3a43=this[_0x68cfb4(0x69d)](),_0x409c7a=this[_0x68cfb4(0x241)]();if(this[_0x68cfb4(0x60b)]()&&(_0x2c2cc0<_0x3d3a43||_0x453f9b&&_0x409c7a===0x1)){_0x2c2cc0+=_0x409c7a;if(_0x2c2cc0>=_0x3d3a43)_0x2c2cc0=_0x3d3a43-0x1;this[_0x68cfb4(0x65b)](_0x2c2cc0);}else!this[_0x68cfb4(0x60b)]()&&((_0x2c2cc0<_0x3d3a43-_0x409c7a||_0x453f9b&&_0x409c7a===0x1)&&this[_0x68cfb4(0x65b)]((_0x2c2cc0+_0x409c7a)%_0x3d3a43));},VisuMZ['CoreEngine'][_0xe356ff(0x1eb)]=Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x6e1)],Window_Selectable[_0xe356ff(0x4e8)]['cursorDown']=function(_0x19b65f){const _0x50736b=_0xe356ff;this[_0x50736b(0x60b)]()&&_0x19b65f&&this['maxCols']()===0x1&&this[_0x50736b(0x4e3)]()===this[_0x50736b(0x69d)]()-0x1?this[_0x50736b(0x65b)](0x0):VisuMZ['CoreEngine'][_0x50736b(0x1eb)][_0x50736b(0x329)](this,_0x19b65f);},Window_Selectable['prototype'][_0xe356ff(0x53b)]=function(_0x4ace14){const _0x2a8929=_0xe356ff;let _0x5dae0e=Math[_0x2a8929(0x29e)](0x0,this[_0x2a8929(0x4e3)]());const _0x31c4e8=this[_0x2a8929(0x69d)](),_0x4760c0=this[_0x2a8929(0x241)]();if(this[_0x2a8929(0x60b)]()&&_0x5dae0e>0x0||_0x4ace14&&_0x4760c0===0x1){_0x5dae0e-=_0x4760c0;if(_0x5dae0e<=0x0)_0x5dae0e=0x0;this[_0x2a8929(0x65b)](_0x5dae0e);}else!this['isUseModernControls']()&&((_0x5dae0e>=_0x4760c0||_0x4ace14&&_0x4760c0===0x1)&&this[_0x2a8929(0x65b)]((_0x5dae0e-_0x4760c0+_0x31c4e8)%_0x31c4e8));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x3b6)]=Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x53b)],Window_Selectable[_0xe356ff(0x4e8)]['cursorUp']=function(_0x1137b1){const _0x2f3306=_0xe356ff;this[_0x2f3306(0x60b)]()&&_0x1137b1&&this['maxCols']()===0x1&&this[_0x2f3306(0x4e3)]()===0x0?this[_0x2f3306(0x65b)](this[_0x2f3306(0x69d)]()-0x1):VisuMZ[_0x2f3306(0x64f)]['Window_Selectable_cursorUp'][_0x2f3306(0x329)](this,_0x1137b1);},Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x60b)]=function(){const _0x7a6db0=_0xe356ff;return VisuMZ[_0x7a6db0(0x64f)]['Settings']['QoL'][_0x7a6db0(0x6a9)];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x4ce)]=Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x48e)],Window_Selectable['prototype']['processCursorMove']=function(){const _0x1adff0=_0xe356ff;this['isUseModernControls']()?(this[_0x1adff0(0x5c5)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x1adff0(0x64f)][_0x1adff0(0x4ce)]['call'](this);},Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x453)]=function(){return!![];},Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x5c5)]=function(){const _0x5e64d6=_0xe356ff;if(this[_0x5e64d6(0x624)]()){const _0x113645=this[_0x5e64d6(0x4e3)]();Input['isRepeated'](_0x5e64d6(0x626))&&(Input[_0x5e64d6(0x1f7)](_0x5e64d6(0x229))&&this[_0x5e64d6(0x453)]()?this['cursorPagedown']():this['cursorDown'](Input[_0x5e64d6(0x488)](_0x5e64d6(0x626)))),Input[_0x5e64d6(0x34c)]('up')&&(Input['isPressed'](_0x5e64d6(0x229))&&this[_0x5e64d6(0x453)]()?this[_0x5e64d6(0x43d)]():this['cursorUp'](Input[_0x5e64d6(0x488)]('up'))),Input[_0x5e64d6(0x34c)](_0x5e64d6(0x411))&&this['cursorRight'](Input[_0x5e64d6(0x488)]('right')),Input[_0x5e64d6(0x34c)](_0x5e64d6(0x4f5))&&this[_0x5e64d6(0x1a5)](Input[_0x5e64d6(0x488)](_0x5e64d6(0x4f5))),!this['isHandled'](_0x5e64d6(0x206))&&Input[_0x5e64d6(0x34c)]('pagedown')&&this[_0x5e64d6(0x6b3)](),!this[_0x5e64d6(0x273)](_0x5e64d6(0x44d))&&Input[_0x5e64d6(0x34c)](_0x5e64d6(0x44d))&&this['cursorPageup'](),this['index']()!==_0x113645&&this[_0x5e64d6(0x43e)]();}},Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x6fd)]=function(){const _0x355487=_0xe356ff;if(this['isCursorMovable']()){const _0x4baee6=this[_0x355487(0x4e3)]();Input['isTriggered'](_0x355487(0x2fd))&&this[_0x355487(0x65b)](Math[_0x355487(0x6a7)](this[_0x355487(0x4e3)](),0x0)),Input[_0x355487(0x488)]('end')&&this[_0x355487(0x65b)](Math[_0x355487(0x29e)](this[_0x355487(0x4e3)](),this[_0x355487(0x69d)]()-0x1)),this[_0x355487(0x4e3)]()!==_0x4baee6&&this[_0x355487(0x43e)]();}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x210)]=Window_Selectable['prototype'][_0xe356ff(0x533)],Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x533)]=function(){const _0xed13e7=_0xe356ff;this['isUseModernControls']()?this['processTouchModernControls']():VisuMZ[_0xed13e7(0x64f)][_0xed13e7(0x210)][_0xed13e7(0x329)](this);},Window_Selectable[_0xe356ff(0x4e8)]['processTouchModernControls']=function(){const _0x4566ab=_0xe356ff;VisuMZ[_0x4566ab(0x64f)][_0x4566ab(0x210)]['call'](this);},Window_Selectable['prototype'][_0xe356ff(0x633)]=function(){const _0x273284=_0xe356ff;return VisuMZ[_0x273284(0x64f)]['Settings'][_0x273284(0x3a9)][_0x273284(0x42b)];},Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x35a)]=function(){const _0x3e9fe5=_0xe356ff;return VisuMZ[_0x3e9fe5(0x64f)][_0x3e9fe5(0x5cf)][_0x3e9fe5(0x3a9)][_0x3e9fe5(0x5dd)];},Window_Selectable['prototype'][_0xe356ff(0x736)]=function(){const _0x32d574=_0xe356ff;return Window_Scrollable[_0x32d574(0x4e8)][_0x32d574(0x736)][_0x32d574(0x329)](this)+VisuMZ[_0x32d574(0x64f)][_0x32d574(0x5cf)][_0x32d574(0x3a9)][_0x32d574(0x5bd)];;},VisuMZ['CoreEngine'][_0xe356ff(0x481)]=Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x5e5)],Window_Selectable[_0xe356ff(0x4e8)][_0xe356ff(0x5e5)]=function(_0x35f5dc){const _0x5533f2=_0xe356ff,_0x561d69=VisuMZ[_0x5533f2(0x64f)][_0x5533f2(0x5cf)]['Window'];if(_0x561d69[_0x5533f2(0x249)]===![])return;_0x561d69['DrawItemBackgroundJS']?_0x561d69[_0x5533f2(0x300)][_0x5533f2(0x329)](this,_0x35f5dc):VisuMZ[_0x5533f2(0x64f)][_0x5533f2(0x481)][_0x5533f2(0x329)](this,_0x35f5dc);},VisuMZ['CoreEngine'][_0xe356ff(0x361)]=Window_Gold[_0xe356ff(0x4e8)][_0xe356ff(0x468)],Window_Gold[_0xe356ff(0x4e8)]['refresh']=function(){const _0x3d68f7=_0xe356ff;this['isItemStyle']()?this['drawGoldItemStyle']():VisuMZ[_0x3d68f7(0x64f)][_0x3d68f7(0x361)]['call'](this);},Window_Gold[_0xe356ff(0x4e8)][_0xe356ff(0x5aa)]=function(){const _0x1c033b=_0xe356ff;if(TextManager[_0x1c033b(0x575)]!==this[_0x1c033b(0x575)]())return![];return VisuMZ[_0x1c033b(0x64f)][_0x1c033b(0x5cf)][_0x1c033b(0x1e6)][_0x1c033b(0x510)];},Window_Gold[_0xe356ff(0x4e8)]['drawGoldItemStyle']=function(){const _0x65e6a1=_0xe356ff;this['resetFontSettings'](),this[_0x65e6a1(0x6c3)][_0x65e6a1(0x5c7)](),this['contents'][_0x65e6a1(0x49d)]=VisuMZ[_0x65e6a1(0x64f)][_0x65e6a1(0x5cf)][_0x65e6a1(0x1e6)][_0x65e6a1(0x625)];const _0x423b84=VisuMZ[_0x65e6a1(0x64f)][_0x65e6a1(0x5cf)][_0x65e6a1(0x1e6)]['GoldIcon'],_0x35e41e=this['itemLineRect'](0x0);if(_0x423b84>0x0){const _0x14f8b8=_0x35e41e['y']+(this['lineHeight']()-ImageManager[_0x65e6a1(0x218)])/0x2;this[_0x65e6a1(0x402)](_0x423b84,_0x35e41e['x'],_0x14f8b8);const _0x20e5bc=ImageManager[_0x65e6a1(0x425)]+0x4;_0x35e41e['x']+=_0x20e5bc,_0x35e41e[_0x65e6a1(0x234)]-=_0x20e5bc;}this[_0x65e6a1(0x4c5)](ColorManager[_0x65e6a1(0x208)]()),this[_0x65e6a1(0x3f2)](this[_0x65e6a1(0x575)](),_0x35e41e['x'],_0x35e41e['y'],_0x35e41e[_0x65e6a1(0x234)],_0x65e6a1(0x4f5));const _0x229061=this['textWidth'](this[_0x65e6a1(0x575)]())+0x6;;_0x35e41e['x']+=_0x229061,_0x35e41e[_0x65e6a1(0x234)]-=_0x229061,this[_0x65e6a1(0x67e)]();const _0x98b86d=this[_0x65e6a1(0x313)](),_0x4880be=this[_0x65e6a1(0x5d6)](this[_0x65e6a1(0x55e)]?VisuMZ[_0x65e6a1(0x240)](this[_0x65e6a1(0x313)]()):this[_0x65e6a1(0x313)]());_0x4880be>_0x35e41e[_0x65e6a1(0x234)]?this[_0x65e6a1(0x3f2)](VisuMZ['CoreEngine'][_0x65e6a1(0x5cf)]['Gold'][_0x65e6a1(0x4f7)],_0x35e41e['x'],_0x35e41e['y'],_0x35e41e[_0x65e6a1(0x234)],_0x65e6a1(0x411)):this[_0x65e6a1(0x3f2)](this['value'](),_0x35e41e['x'],_0x35e41e['y'],_0x35e41e[_0x65e6a1(0x234)],_0x65e6a1(0x411)),this['resetFontSettings']();},Window_StatusBase[_0xe356ff(0x4e8)][_0xe356ff(0x458)]=function(_0x3fe05d,_0x2afeab,_0x3b02be,_0x107932,_0x1747de){const _0x344bc7=_0xe356ff;_0x107932=String(_0x107932||'')[_0x344bc7(0x68f)]();if(VisuMZ['CoreEngine'][_0x344bc7(0x5cf)]['Param'][_0x344bc7(0x216)]){const _0x55e19c=VisuMZ[_0x344bc7(0x4cb)](_0x107932);_0x1747de?(this[_0x344bc7(0x395)](_0x55e19c,_0x3fe05d,_0x2afeab,this[_0x344bc7(0x5e0)]()),_0x3b02be-=this[_0x344bc7(0x5e0)]()+0x2,_0x3fe05d+=this['gaugeLineHeight']()+0x2):(this[_0x344bc7(0x402)](_0x55e19c,_0x3fe05d+0x2,_0x2afeab+0x2),_0x3b02be-=ImageManager[_0x344bc7(0x425)]+0x4,_0x3fe05d+=ImageManager[_0x344bc7(0x425)]+0x4);}const _0xe81919=TextManager[_0x344bc7(0x4c1)](_0x107932);this['resetFontSettings'](),this[_0x344bc7(0x4c5)](ColorManager[_0x344bc7(0x208)]()),_0x1747de?(this[_0x344bc7(0x6c3)][_0x344bc7(0x49d)]=this[_0x344bc7(0x336)](),this[_0x344bc7(0x6c3)][_0x344bc7(0x3f2)](_0xe81919,_0x3fe05d,_0x2afeab,_0x3b02be,this[_0x344bc7(0x5e0)](),_0x344bc7(0x4f5))):this[_0x344bc7(0x3f2)](_0xe81919,_0x3fe05d,_0x2afeab,_0x3b02be),this[_0x344bc7(0x2de)]();},Window_StatusBase[_0xe356ff(0x4e8)][_0xe356ff(0x336)]=function(){const _0x1dae06=_0xe356ff;return $gameSystem[_0x1dae06(0x64b)]()-0x8;},Window_StatusBase[_0xe356ff(0x4e8)]['drawActorClass']=function(_0x4f427b,_0x3f8c5f,_0x1582e3,_0x21877a){const _0x3a62f2=_0xe356ff;_0x21877a=_0x21877a||0xa8,this[_0x3a62f2(0x67e)]();if(VisuMZ[_0x3a62f2(0x64f)][_0x3a62f2(0x5cf)]['UI'][_0x3a62f2(0x702)])this[_0x3a62f2(0x71d)](_0x4f427b[_0x3a62f2(0x4ef)]()['name'],_0x3f8c5f,_0x1582e3,_0x21877a);else{const _0x28bf0d=_0x4f427b[_0x3a62f2(0x4ef)]()['name'][_0x3a62f2(0x299)](/\\I\[(\d+)\]/gi,'');this[_0x3a62f2(0x3f2)](_0x28bf0d,_0x3f8c5f,_0x1582e3,_0x21877a);}},Window_StatusBase['prototype'][_0xe356ff(0x371)]=function(_0x53724b,_0x40f831,_0x157f23,_0x4b43f2){const _0x4d019c=_0xe356ff;_0x4b43f2=_0x4b43f2||0x10e,this[_0x4d019c(0x67e)]();if(VisuMZ[_0x4d019c(0x64f)][_0x4d019c(0x5cf)]['UI'][_0x4d019c(0x610)])this[_0x4d019c(0x71d)](_0x53724b[_0x4d019c(0x64c)](),_0x40f831,_0x157f23,_0x4b43f2);else{const _0x5ccdf7=_0x53724b[_0x4d019c(0x64c)]()[_0x4d019c(0x299)](/\\I\[(\d+)\]/gi,'');this[_0x4d019c(0x3f2)](_0x53724b[_0x4d019c(0x64c)](),_0x40f831,_0x157f23,_0x4b43f2);}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x3cb)]=Window_StatusBase[_0xe356ff(0x4e8)][_0xe356ff(0x41f)],Window_StatusBase['prototype'][_0xe356ff(0x41f)]=function(_0x56ea08,_0x5a1d75,_0x3c7835){const _0x1467f3=_0xe356ff;if(this['isExpGaugeDrawn']())this[_0x1467f3(0x614)](_0x56ea08,_0x5a1d75,_0x3c7835);VisuMZ[_0x1467f3(0x64f)][_0x1467f3(0x3cb)][_0x1467f3(0x329)](this,_0x56ea08,_0x5a1d75,_0x3c7835);},Window_StatusBase[_0xe356ff(0x4e8)][_0xe356ff(0x563)]=function(){const _0x1ad567=_0xe356ff;return VisuMZ['CoreEngine']['Settings']['UI'][_0x1ad567(0x38a)];},Window_StatusBase['prototype'][_0xe356ff(0x614)]=function(_0x2e7b13,_0x541531,_0x589e09){const _0x3b0df7=_0xe356ff;if(!_0x2e7b13)return;if(!_0x2e7b13[_0x3b0df7(0x3fa)]())return;const _0x354f7e=0x80,_0x4ca66f=_0x2e7b13[_0x3b0df7(0x506)]();let _0x4ae7de=ColorManager['expGaugeColor1'](),_0x25654c=ColorManager[_0x3b0df7(0x5b9)]();_0x4ca66f>=0x1&&(_0x4ae7de=ColorManager[_0x3b0df7(0x5e2)](),_0x25654c=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x541531,_0x589e09,_0x354f7e,_0x4ca66f,_0x4ae7de,_0x25654c);},Window_EquipStatus[_0xe356ff(0x4e8)][_0xe356ff(0x583)]=function(){const _0x13a2bc=_0xe356ff;let _0x36e546=0x0;for(const _0x12c27e of VisuMZ['CoreEngine'][_0x13a2bc(0x5cf)][_0x13a2bc(0x366)][_0x13a2bc(0x20c)]){const _0x536b70=this[_0x13a2bc(0x3da)](),_0x44f770=this[_0x13a2bc(0x465)](_0x36e546);this['drawItem'](_0x536b70,_0x44f770,_0x12c27e),_0x36e546++;}},Window_EquipStatus[_0xe356ff(0x4e8)][_0xe356ff(0x5c4)]=function(_0x2baa3c,_0x27b119,_0x404dd6){const _0x4c8c44=_0xe356ff,_0x265dac=this[_0x4c8c44(0x253)]()-this[_0x4c8c44(0x3da)]()*0x2;this[_0x4c8c44(0x458)](_0x2baa3c,_0x27b119,_0x265dac,_0x404dd6,![]);},Window_EquipStatus['prototype'][_0xe356ff(0x680)]=function(_0x42a558,_0x214c91,_0x4a180d){const _0x400a7d=_0xe356ff,_0x543435=this[_0x400a7d(0x349)]();this[_0x400a7d(0x67e)](),this[_0x400a7d(0x3f2)](this[_0x400a7d(0x4b1)]['paramValueByName'](_0x4a180d,!![]),_0x42a558,_0x214c91,_0x543435,'right');},Window_EquipStatus[_0xe356ff(0x4e8)][_0xe356ff(0x4d5)]=function(_0x41be13,_0xb28d92){const _0x56a32d=_0xe356ff,_0x5bcc3a=this[_0x56a32d(0x4e0)]();this[_0x56a32d(0x4c5)](ColorManager[_0x56a32d(0x208)]());const _0x546b48=VisuMZ['CoreEngine'][_0x56a32d(0x5cf)]['UI'][_0x56a32d(0x68b)];this[_0x56a32d(0x3f2)](_0x546b48,_0x41be13,_0xb28d92,_0x5bcc3a,_0x56a32d(0x679));},Window_EquipStatus[_0xe356ff(0x4e8)][_0xe356ff(0x4c6)]=function(_0xd8865b,_0x3f7414,_0x205b31){const _0x284fc4=_0xe356ff,_0x27cbff=this[_0x284fc4(0x349)](),_0x4321f3=this[_0x284fc4(0x2aa)][_0x284fc4(0x36d)](_0x205b31),_0x42cc74=_0x4321f3-this[_0x284fc4(0x4b1)][_0x284fc4(0x36d)](_0x205b31);this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x42cc74)),this[_0x284fc4(0x3f2)](VisuMZ[_0x284fc4(0x3bd)](_0x4321f3,0x0,_0x205b31),_0xd8865b,_0x3f7414,_0x27cbff,'right');},VisuMZ[_0xe356ff(0x64f)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0xe356ff(0x4e8)]['isEnabled'],Window_EquipItem['prototype'][_0xe356ff(0x3c4)]=function(_0x43736d){const _0x4085a7=_0xe356ff;return _0x43736d&&this[_0x4085a7(0x4b1)]?this[_0x4085a7(0x4b1)]['canEquip'](_0x43736d):VisuMZ[_0x4085a7(0x64f)][_0x4085a7(0x708)][_0x4085a7(0x329)](this,_0x43736d);},Window_StatusParams[_0xe356ff(0x4e8)][_0xe356ff(0x69d)]=function(){const _0x3caa9d=_0xe356ff;return VisuMZ[_0x3caa9d(0x64f)][_0x3caa9d(0x5cf)][_0x3caa9d(0x366)]['DisplayedParams'][_0x3caa9d(0x437)];},Window_StatusParams[_0xe356ff(0x4e8)][_0xe356ff(0x2fe)]=function(_0x386590){const _0x59d853=_0xe356ff,_0x12b7ca=this['itemLineRect'](_0x386590),_0x5676ae=VisuMZ[_0x59d853(0x64f)][_0x59d853(0x5cf)]['Param'][_0x59d853(0x20c)][_0x386590],_0x552623=TextManager[_0x59d853(0x4c1)](_0x5676ae),_0x1bc1c4=this[_0x59d853(0x4b1)][_0x59d853(0x36d)](_0x5676ae,!![]);this[_0x59d853(0x458)](_0x12b7ca['x'],_0x12b7ca['y'],0xa0,_0x5676ae,![]),this['resetTextColor'](),this['drawText'](_0x1bc1c4,_0x12b7ca['x']+0xa0,_0x12b7ca['y'],0x3c,'right');};if(VisuMZ['CoreEngine']['Settings'][_0xe356ff(0x5e7)][_0xe356ff(0x5ba)]){VisuMZ['CoreEngine'][_0xe356ff(0x5cf)]['KeyboardInput']['QwertyLayout']&&(Window_NameInput[_0xe356ff(0x284)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0xe356ff(0x1aa),'OK']);;VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x3fc)]=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x374)],Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x374)]=function(_0x3db2c7){const _0xe93753=_0xe356ff;this[_0xe93753(0x4ae)]=this[_0xe93753(0x725)](),VisuMZ[_0xe93753(0x64f)]['Window_NameInput_initialize']['call'](this,_0x3db2c7),Input[_0xe93753(0x5c7)](),this[_0xe93753(0x62a)]();},Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x725)]=function(){const _0x49fefe=_0xe356ff;return VisuMZ[_0x49fefe(0x64f)]['Settings'][_0x49fefe(0x5e7)]['DefaultMode']||_0x49fefe(0x5d5);},VisuMZ[_0xe356ff(0x64f)]['Window_NameInput_processHandling']=Window_NameInput[_0xe356ff(0x4e8)]['processHandling'],Window_NameInput['prototype'][_0xe356ff(0x2b1)]=function(){const _0x3697e3=_0xe356ff;if(!this[_0x3697e3(0x5c8)]())return;if(!this[_0x3697e3(0x5ff)])return;if(Input['isSpecialCode'](_0x3697e3(0x3a2)))Input[_0x3697e3(0x5c7)](),this['processBack']();else{if(Input[_0x3697e3(0x488)](_0x3697e3(0x3d5)))Input['clear'](),this[_0x3697e3(0x4ae)]==='keyboard'?this[_0x3697e3(0x3ad)]('default'):this['switchModes']('keyboard');else{if(this[_0x3697e3(0x4ae)]===_0x3697e3(0x5d5))this[_0x3697e3(0x6b9)]();else Input[_0x3697e3(0x418)]('escape')?(Input['clear'](),this[_0x3697e3(0x3ad)](_0x3697e3(0x5d5))):VisuMZ[_0x3697e3(0x64f)][_0x3697e3(0x3ea)][_0x3697e3(0x329)](this);}}},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5ad)]=Window_NameInput[_0xe356ff(0x4e8)]['processTouch'],Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x533)]=function(){const _0x40ac02=_0xe356ff;if(!this['isOpenAndActive']())return;if(this['_mode']===_0x40ac02(0x5d5)){if(TouchInput[_0x40ac02(0x488)]()&&this[_0x40ac02(0x668)]())this[_0x40ac02(0x3ad)](_0x40ac02(0x645));else TouchInput[_0x40ac02(0x52b)]()&&this[_0x40ac02(0x3ad)]('default');}else VisuMZ[_0x40ac02(0x64f)][_0x40ac02(0x5ad)][_0x40ac02(0x329)](this);},Window_NameInput[_0xe356ff(0x4e8)]['processKeyboardHandling']=function(){const _0x39ec12=_0xe356ff;if(Input[_0x39ec12(0x418)](_0x39ec12(0x26b)))Input[_0x39ec12(0x5c7)](),this[_0x39ec12(0x726)]();else{if(Input['_inputString']!==undefined){let _0x3c68a8=Input[_0x39ec12(0x489)],_0x2ea8bf=_0x3c68a8[_0x39ec12(0x437)];for(let _0x1b322b=0x0;_0x1b322b<_0x2ea8bf;++_0x1b322b){this[_0x39ec12(0x3ec)]['add'](_0x3c68a8[_0x1b322b])?SoundManager[_0x39ec12(0x72a)]():SoundManager[_0x39ec12(0x1a8)]();}Input[_0x39ec12(0x5c7)]();}}},Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x3ad)]=function(_0x2cbbbc){const _0x891ecb=_0xe356ff;let _0x3b0f21=this['_mode'];this[_0x891ecb(0x4ae)]=_0x2cbbbc,_0x3b0f21!==this[_0x891ecb(0x4ae)]&&(this[_0x891ecb(0x468)](),SoundManager[_0x891ecb(0x72a)](),this[_0x891ecb(0x4ae)]===_0x891ecb(0x645)?this[_0x891ecb(0x452)](0x0):this[_0x891ecb(0x452)](-0x1));},VisuMZ['CoreEngine'][_0xe356ff(0x43b)]=Window_NameInput['prototype']['cursorDown'],Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x6e1)]=function(_0x4e746e){const _0x227640=_0xe356ff;if(this[_0x227640(0x4ae)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x227640(0x1c9)]())return;VisuMZ[_0x227640(0x64f)][_0x227640(0x43b)][_0x227640(0x329)](this,_0x4e746e),this[_0x227640(0x3ad)](_0x227640(0x645));},VisuMZ['CoreEngine'][_0xe356ff(0x4d8)]=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x53b)],Window_NameInput['prototype'][_0xe356ff(0x53b)]=function(_0x22964d){const _0xc73073=_0xe356ff;if(this[_0xc73073(0x4ae)]===_0xc73073(0x5d5)&&!Input[_0xc73073(0x243)]())return;if(Input[_0xc73073(0x1c9)]())return;VisuMZ[_0xc73073(0x64f)][_0xc73073(0x4d8)][_0xc73073(0x329)](this,_0x22964d),this[_0xc73073(0x3ad)]('default');},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x6fb)]=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x49a)],Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x49a)]=function(_0x22a0d5){const _0x2d39a9=_0xe356ff;if(this[_0x2d39a9(0x4ae)]===_0x2d39a9(0x5d5)&&!Input[_0x2d39a9(0x243)]())return;if(Input[_0x2d39a9(0x1c9)]())return;VisuMZ[_0x2d39a9(0x64f)][_0x2d39a9(0x6fb)][_0x2d39a9(0x329)](this,_0x22a0d5),this[_0x2d39a9(0x3ad)](_0x2d39a9(0x645));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x3c3)]=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x1a5)],Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x1a5)]=function(_0x421ba0){const _0x1f8b9e=_0xe356ff;if(this[_0x1f8b9e(0x4ae)]===_0x1f8b9e(0x5d5)&&!Input[_0x1f8b9e(0x243)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x1f8b9e(0x3c3)][_0x1f8b9e(0x329)](this,_0x421ba0),this[_0x1f8b9e(0x3ad)](_0x1f8b9e(0x645));},VisuMZ['CoreEngine'][_0xe356ff(0x350)]=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x6b3)],Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x6b3)]=function(){const _0xd37157=_0xe356ff;if(this[_0xd37157(0x4ae)]===_0xd37157(0x5d5))return;if(Input[_0xd37157(0x1c9)]())return;VisuMZ[_0xd37157(0x64f)][_0xd37157(0x350)][_0xd37157(0x329)](this),this[_0xd37157(0x3ad)](_0xd37157(0x645));},VisuMZ[_0xe356ff(0x64f)]['Window_NameInput_cursorPageup']=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x43d)],Window_NameInput['prototype']['cursorPageup']=function(){const _0x532e6c=_0xe356ff;if(this[_0x532e6c(0x4ae)]===_0x532e6c(0x5d5))return;if(Input[_0x532e6c(0x1c9)]())return;VisuMZ[_0x532e6c(0x64f)][_0x532e6c(0x57d)][_0x532e6c(0x329)](this),this[_0x532e6c(0x3ad)](_0x532e6c(0x645));},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x407)]=Window_NameInput[_0xe356ff(0x4e8)][_0xe356ff(0x468)],Window_NameInput[_0xe356ff(0x4e8)]['refresh']=function(){const _0x24254c=_0xe356ff;if(this[_0x24254c(0x4ae)]==='keyboard'){this[_0x24254c(0x6c3)]['clear'](),this[_0x24254c(0x63e)][_0x24254c(0x5c7)](),this['resetTextColor']();let _0x5c7556=VisuMZ[_0x24254c(0x64f)][_0x24254c(0x5cf)][_0x24254c(0x5e7)]['NameInputMessage']['split']('\x0a'),_0x521af0=_0x5c7556['length'],_0x47f71d=(this[_0x24254c(0x59e)]-_0x521af0*this['lineHeight']())/0x2;for(let _0xc96742=0x0;_0xc96742<_0x521af0;++_0xc96742){let _0xc42132=_0x5c7556[_0xc96742],_0x540ee1=this[_0x24254c(0x6cc)](_0xc42132)['width'],_0x1fe9c3=Math['floor']((this[_0x24254c(0x6c3)][_0x24254c(0x234)]-_0x540ee1)/0x2);this['drawTextEx'](_0xc42132,_0x1fe9c3,_0x47f71d),_0x47f71d+=this['lineHeight']();}}else VisuMZ[_0x24254c(0x64f)][_0x24254c(0x407)]['call'](this);};};VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5cc)]=Window_ShopSell['prototype'][_0xe356ff(0x3c4)],Window_ShopSell[_0xe356ff(0x4e8)]['isEnabled']=function(_0x3b8038){const _0x2fda67=_0xe356ff;return VisuMZ[_0x2fda67(0x64f)]['Settings'][_0x2fda67(0x69e)][_0x2fda67(0x478)]&&DataManager[_0x2fda67(0x491)](_0x3b8038)?![]:VisuMZ[_0x2fda67(0x64f)][_0x2fda67(0x5cc)][_0x2fda67(0x329)](this,_0x3b8038);},Window_NumberInput['prototype'][_0xe356ff(0x60b)]=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0xe356ff(0x5e7)][_0xe356ff(0x27a)]&&(VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x40d)]=Window_NumberInput[_0xe356ff(0x4e8)]['start'],Window_NumberInput[_0xe356ff(0x4e8)][_0xe356ff(0x302)]=function(){const _0xccf755=_0xe356ff;VisuMZ[_0xccf755(0x64f)][_0xccf755(0x40d)][_0xccf755(0x329)](this),this[_0xccf755(0x452)](this[_0xccf755(0x29d)]-0x1);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x2a6)]=Window_NumberInput['prototype'][_0xe356ff(0x455)],Window_NumberInput['prototype'][_0xe356ff(0x455)]=function(){const _0x5210f7=_0xe356ff;if(!this['isOpenAndActive']())return;if(Input['isNumpadPressed']())this['processKeyboardDigitChange']();else{if(Input[_0x5210f7(0x418)]('backspace'))this[_0x5210f7(0x4cd)]();else{if(Input[_0x5210f7(0x52e)]===0x2e)this[_0x5210f7(0x54c)]();else{if(Input[_0x5210f7(0x52e)]===0x24)this[_0x5210f7(0x620)]();else Input[_0x5210f7(0x52e)]===0x23?this['processKeyboardEnd']():(VisuMZ[_0x5210f7(0x64f)]['Window_NumberInput_processDigitChange'][_0x5210f7(0x329)](this),Input[_0x5210f7(0x5c7)]());}}}},Window_NumberInput[_0xe356ff(0x4e8)][_0xe356ff(0x48e)]=function(){const _0x474faa=_0xe356ff;if(!this[_0x474faa(0x624)]())return;Input[_0x474faa(0x1c9)]()?this[_0x474faa(0x414)]():Window_Selectable['prototype'][_0x474faa(0x48e)][_0x474faa(0x329)](this);},Window_NumberInput[_0xe356ff(0x4e8)][_0xe356ff(0x6fd)]=function(){},Window_NumberInput[_0xe356ff(0x4e8)][_0xe356ff(0x414)]=function(){const _0x21f361=_0xe356ff;if(String(this[_0x21f361(0x409)])[_0x21f361(0x437)]>=this['_maxDigits'])return;this[_0x21f361(0x409)]=Number(String(this[_0x21f361(0x409)])+Input[_0x21f361(0x489)]);const _0x11a709='9'['repeat'](this[_0x21f361(0x29d)]);this['_number']=this[_0x21f361(0x409)][_0x21f361(0x32b)](0x0,_0x11a709),Input[_0x21f361(0x5c7)](),this[_0x21f361(0x468)](),SoundManager['playCursor'](),this[_0x21f361(0x452)](this[_0x21f361(0x29d)]-0x1);},Window_NumberInput[_0xe356ff(0x4e8)][_0xe356ff(0x4cd)]=function(){const _0x3cf932=_0xe356ff;this[_0x3cf932(0x409)]=Number(String(this[_0x3cf932(0x409)])[_0x3cf932(0x328)](0x0,-0x1)),this[_0x3cf932(0x409)]=Math[_0x3cf932(0x29e)](0x0,this['_number']),Input['clear'](),this['refresh'](),SoundManager[_0x3cf932(0x48a)](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0xe356ff(0x4e8)]['processKeyboardDelete']=function(){const _0x1f289e=_0xe356ff;this['_number']=Number(String(this[_0x1f289e(0x409)])['substring'](0x1)),this['_number']=Math[_0x1f289e(0x29e)](0x0,this[_0x1f289e(0x409)]),Input[_0x1f289e(0x5c7)](),this['refresh'](),SoundManager[_0x1f289e(0x48a)](),this['select'](this[_0x1f289e(0x29d)]-0x1);});;Window_TitleCommand[_0xe356ff(0x1d3)]=VisuMZ[_0xe356ff(0x64f)]['Settings'][_0xe356ff(0x1f2)],Window_TitleCommand[_0xe356ff(0x4e8)]['makeCommandList']=function(){const _0x36abb1=_0xe356ff;this[_0x36abb1(0x6df)]();},Window_TitleCommand[_0xe356ff(0x4e8)][_0xe356ff(0x6df)]=function(){const _0x368486=_0xe356ff;for(const _0x4486d6 of Window_TitleCommand['_commandList']){if(_0x4486d6['ShowJS']['call'](this)){const _0x578d45=_0x4486d6[_0x368486(0x5dc)];let _0x12b317=_0x4486d6[_0x368486(0x4a3)];if(['','Untitled']['includes'](_0x12b317))_0x12b317=_0x4486d6[_0x368486(0x2e0)][_0x368486(0x329)](this);const _0x48bf8c=_0x4486d6[_0x368486(0x69b)][_0x368486(0x329)](this),_0x3f6be6=_0x4486d6[_0x368486(0x1f6)][_0x368486(0x329)](this);this[_0x368486(0x526)](_0x12b317,_0x578d45,_0x48bf8c,_0x3f6be6),this[_0x368486(0x67b)](_0x578d45,_0x4486d6[_0x368486(0x342)][_0x368486(0x4f1)](this,_0x3f6be6));}}},Window_GameEnd[_0xe356ff(0x1d3)]=VisuMZ['CoreEngine'][_0xe356ff(0x5cf)][_0xe356ff(0x2a7)][_0xe356ff(0x6b4)]['CommandList'],Window_GameEnd[_0xe356ff(0x4e8)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0xe356ff(0x4e8)]['makeCoreEngineCommandList']=function(){const _0x5d5ad6=_0xe356ff;for(const _0x10ade9 of Window_GameEnd[_0x5d5ad6(0x1d3)]){if(_0x10ade9[_0x5d5ad6(0x46a)]['call'](this)){const _0x23e0d3=_0x10ade9[_0x5d5ad6(0x5dc)];let _0x2ec32e=_0x10ade9[_0x5d5ad6(0x4a3)];if(['',_0x5d5ad6(0x550)]['includes'](_0x2ec32e))_0x2ec32e=_0x10ade9[_0x5d5ad6(0x2e0)]['call'](this);const _0x14765e=_0x10ade9[_0x5d5ad6(0x69b)][_0x5d5ad6(0x329)](this),_0x4652c3=_0x10ade9[_0x5d5ad6(0x1f6)]['call'](this);this[_0x5d5ad6(0x526)](_0x2ec32e,_0x23e0d3,_0x14765e,_0x4652c3),this[_0x5d5ad6(0x67b)](_0x23e0d3,_0x10ade9['CallHandlerJS'][_0x5d5ad6(0x4f1)](this,_0x4652c3));}}};function Window_ButtonAssist(){const _0x1e4f34=_0xe356ff;this[_0x1e4f34(0x374)](...arguments);}Window_ButtonAssist['prototype']=Object[_0xe356ff(0x4d1)](Window_Base['prototype']),Window_ButtonAssist[_0xe356ff(0x4e8)][_0xe356ff(0x255)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0xe356ff(0x374)]=function(_0x4b5112){const _0x36503c=_0xe356ff;this['_data']={},Window_Base[_0x36503c(0x4e8)][_0x36503c(0x374)][_0x36503c(0x329)](this,_0x4b5112),this[_0x36503c(0x1a7)](VisuMZ[_0x36503c(0x64f)][_0x36503c(0x5cf)][_0x36503c(0x3e1)][_0x36503c(0x1ab)]||0x0),this[_0x36503c(0x468)]();},Window_ButtonAssist['prototype'][_0xe356ff(0x2b7)]=function(){const _0x428362=_0xe356ff;this[_0x428362(0x6c3)][_0x428362(0x49d)]<=0x60&&(this[_0x428362(0x6c3)][_0x428362(0x49d)]+=0x6);},Window_ButtonAssist[_0xe356ff(0x4e8)][_0xe356ff(0x34e)]=function(){const _0x25c168=_0xe356ff;this[_0x25c168(0x6c3)][_0x25c168(0x49d)]>=0x18&&(this[_0x25c168(0x6c3)][_0x25c168(0x49d)]-=0x6);},Window_ButtonAssist[_0xe356ff(0x4e8)]['update']=function(){const _0x1a1ee4=_0xe356ff;Window_Base[_0x1a1ee4(0x4e8)]['update'][_0x1a1ee4(0x329)](this),this[_0x1a1ee4(0x698)]();},Window_ButtonAssist[_0xe356ff(0x4e8)][_0xe356ff(0x1e3)]=function(){const _0x3098ed=_0xe356ff;this[_0x3098ed(0x5ea)]=SceneManager[_0x3098ed(0x6d2)][_0x3098ed(0x200)]()!==_0x3098ed(0x5a0)?0x0:0x8;},Window_ButtonAssist[_0xe356ff(0x4e8)][_0xe356ff(0x698)]=function(){const _0x39934e=_0xe356ff,_0x602e0a=SceneManager['_scene'];for(let _0x22af7a=0x1;_0x22af7a<=0x5;_0x22af7a++){if(this[_0x39934e(0x4db)][_0x39934e(0x5be)[_0x39934e(0x560)](_0x22af7a)]!==_0x602e0a['buttonAssistKey%1'[_0x39934e(0x560)](_0x22af7a)]())return this[_0x39934e(0x468)]();if(this['_data']['text%1'[_0x39934e(0x560)](_0x22af7a)]!==_0x602e0a[_0x39934e(0x713)['format'](_0x22af7a)]())return this[_0x39934e(0x468)]();}},Window_ButtonAssist['prototype'][_0xe356ff(0x468)]=function(){const _0x268c44=_0xe356ff;this[_0x268c44(0x6c3)]['clear']();for(let _0x55f3ba=0x1;_0x55f3ba<=0x5;_0x55f3ba++){this['drawSegment'](_0x55f3ba);}},Window_ButtonAssist[_0xe356ff(0x4e8)]['drawSegment']=function(_0x372a01){const _0x67adf7=_0xe356ff,_0x4cd8f8=this[_0x67adf7(0x48d)]/0x5,_0x497fbc=SceneManager[_0x67adf7(0x6d2)],_0x25780d=_0x497fbc['buttonAssistKey%1'['format'](_0x372a01)](),_0x58275d=_0x497fbc['buttonAssistText%1'[_0x67adf7(0x560)](_0x372a01)]();this[_0x67adf7(0x4db)][_0x67adf7(0x5be)['format'](_0x372a01)]=_0x25780d,this[_0x67adf7(0x4db)][_0x67adf7(0x396)[_0x67adf7(0x560)](_0x372a01)]=_0x58275d;if(_0x25780d==='')return;if(_0x58275d==='')return;const _0xe96d06=_0x497fbc[_0x67adf7(0x731)[_0x67adf7(0x560)](_0x372a01)](),_0x106f08=this[_0x67adf7(0x3da)](),_0x3532f0=_0x4cd8f8*(_0x372a01-0x1)+_0x106f08+_0xe96d06,_0x1409ef=VisuMZ['CoreEngine'][_0x67adf7(0x5cf)]['ButtonAssist'][_0x67adf7(0x706)];this[_0x67adf7(0x71d)](_0x1409ef['format'](_0x25780d,_0x58275d),_0x3532f0,0x0,_0x4cd8f8-_0x106f08*0x2);},VisuMZ[_0xe356ff(0x41a)]=function(_0x47696e){const _0x353f23=_0xe356ff;if(Utils['isOptionValid'](_0x353f23(0x440))){var _0x216a7d=require(_0x353f23(0x463))['Window'][_0x353f23(0x37b)]();SceneManager[_0x353f23(0x362)]();if(_0x47696e)setTimeout(_0x216a7d[_0x353f23(0x6f4)]['bind'](_0x216a7d),0x190);}},VisuMZ['ApplyEasing']=function(_0x47c2a9,_0x3716c9){const _0x141155=_0xe356ff;_0x3716c9=_0x3716c9[_0x141155(0x68f)]();var _0x5b10a8=1.70158,_0x168055=0.7;switch(_0x3716c9){case _0x141155(0x1ae):return _0x47c2a9;case _0x141155(0x2ba):return-0x1*Math['cos'](_0x47c2a9*(Math['PI']/0x2))+0x1;case _0x141155(0x2d8):return Math[_0x141155(0x238)](_0x47c2a9*(Math['PI']/0x2));case _0x141155(0x37d):return-0.5*(Math['cos'](Math['PI']*_0x47c2a9)-0x1);case _0x141155(0x6c7):return _0x47c2a9*_0x47c2a9;case _0x141155(0x22e):return _0x47c2a9*(0x2-_0x47c2a9);case _0x141155(0x4e9):return _0x47c2a9<0.5?0x2*_0x47c2a9*_0x47c2a9:-0x1+(0x4-0x2*_0x47c2a9)*_0x47c2a9;case'INCUBIC':return _0x47c2a9*_0x47c2a9*_0x47c2a9;case _0x141155(0x683):var _0x3ba6d0=_0x47c2a9-0x1;return _0x3ba6d0*_0x3ba6d0*_0x3ba6d0+0x1;case _0x141155(0x233):return _0x47c2a9<0.5?0x4*_0x47c2a9*_0x47c2a9*_0x47c2a9:(_0x47c2a9-0x1)*(0x2*_0x47c2a9-0x2)*(0x2*_0x47c2a9-0x2)+0x1;case _0x141155(0x317):return _0x47c2a9*_0x47c2a9*_0x47c2a9*_0x47c2a9;case'OUTQUART':var _0x3ba6d0=_0x47c2a9-0x1;return 0x1-_0x3ba6d0*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0;case _0x141155(0x643):var _0x3ba6d0=_0x47c2a9-0x1;return _0x47c2a9<0.5?0x8*_0x47c2a9*_0x47c2a9*_0x47c2a9*_0x47c2a9:0x1-0x8*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0;case _0x141155(0x38f):return _0x47c2a9*_0x47c2a9*_0x47c2a9*_0x47c2a9*_0x47c2a9;case _0x141155(0x4de):var _0x3ba6d0=_0x47c2a9-0x1;return 0x1+_0x3ba6d0*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0;case'INOUTQUINT':var _0x3ba6d0=_0x47c2a9-0x1;return _0x47c2a9<0.5?0x10*_0x47c2a9*_0x47c2a9*_0x47c2a9*_0x47c2a9*_0x47c2a9:0x1+0x10*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0*_0x3ba6d0;case'INEXPO':if(_0x47c2a9===0x0)return 0x0;return Math[_0x141155(0x31b)](0x2,0xa*(_0x47c2a9-0x1));case _0x141155(0x38c):if(_0x47c2a9===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x47c2a9)+0x1;case _0x141155(0x1a9):if(_0x47c2a9===0x0||_0x47c2a9===0x1)return _0x47c2a9;var _0x27904a=_0x47c2a9*0x2,_0x231133=_0x27904a-0x1;if(_0x27904a<0x1)return 0.5*Math[_0x141155(0x31b)](0x2,0xa*_0x231133);return 0.5*(-Math[_0x141155(0x31b)](0x2,-0xa*_0x231133)+0x2);case _0x141155(0x23c):var _0x27904a=_0x47c2a9/0x1;return-0x1*(Math[_0x141155(0x495)](0x1-_0x27904a*_0x47c2a9)-0x1);case _0x141155(0x50c):var _0x3ba6d0=_0x47c2a9-0x1;return Math['sqrt'](0x1-_0x3ba6d0*_0x3ba6d0);case _0x141155(0x656):var _0x27904a=_0x47c2a9*0x2,_0x231133=_0x27904a-0x2;if(_0x27904a<0x1)return-0.5*(Math[_0x141155(0x495)](0x1-_0x27904a*_0x27904a)-0x1);return 0.5*(Math[_0x141155(0x495)](0x1-_0x231133*_0x231133)+0x1);case _0x141155(0x2b6):return _0x47c2a9*_0x47c2a9*((_0x5b10a8+0x1)*_0x47c2a9-_0x5b10a8);case _0x141155(0x41c):var _0x27904a=_0x47c2a9/0x1-0x1;return _0x27904a*_0x27904a*((_0x5b10a8+0x1)*_0x27904a+_0x5b10a8)+0x1;break;case _0x141155(0x5b3):var _0x27904a=_0x47c2a9*0x2,_0x2a6f98=_0x27904a-0x2,_0x1be52b=_0x5b10a8*1.525;if(_0x27904a<0x1)return 0.5*_0x27904a*_0x27904a*((_0x1be52b+0x1)*_0x27904a-_0x1be52b);return 0.5*(_0x2a6f98*_0x2a6f98*((_0x1be52b+0x1)*_0x2a6f98+_0x1be52b)+0x2);case _0x141155(0x6c0):if(_0x47c2a9===0x0||_0x47c2a9===0x1)return _0x47c2a9;var _0x27904a=_0x47c2a9/0x1,_0x231133=_0x27904a-0x1,_0x1f680e=0x1-_0x168055,_0x1be52b=_0x1f680e/(0x2*Math['PI'])*Math[_0x141155(0x36e)](0x1);return-(Math[_0x141155(0x31b)](0x2,0xa*_0x231133)*Math[_0x141155(0x238)]((_0x231133-_0x1be52b)*(0x2*Math['PI'])/_0x1f680e));case _0x141155(0x73e):var _0x1f680e=0x1-_0x168055,_0x27904a=_0x47c2a9*0x2;if(_0x47c2a9===0x0||_0x47c2a9===0x1)return _0x47c2a9;var _0x1be52b=_0x1f680e/(0x2*Math['PI'])*Math[_0x141155(0x36e)](0x1);return Math['pow'](0x2,-0xa*_0x27904a)*Math['sin']((_0x27904a-_0x1be52b)*(0x2*Math['PI'])/_0x1f680e)+0x1;case _0x141155(0x529):var _0x1f680e=0x1-_0x168055;if(_0x47c2a9===0x0||_0x47c2a9===0x1)return _0x47c2a9;var _0x27904a=_0x47c2a9*0x2,_0x231133=_0x27904a-0x1,_0x1be52b=_0x1f680e/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x27904a<0x1)return-0.5*(Math[_0x141155(0x31b)](0x2,0xa*_0x231133)*Math[_0x141155(0x238)]((_0x231133-_0x1be52b)*(0x2*Math['PI'])/_0x1f680e));return Math[_0x141155(0x31b)](0x2,-0xa*_0x231133)*Math[_0x141155(0x238)]((_0x231133-_0x1be52b)*(0x2*Math['PI'])/_0x1f680e)*0.5+0x1;case'OUTBOUNCE':var _0x27904a=_0x47c2a9/0x1;if(_0x27904a<0x1/2.75)return 7.5625*_0x27904a*_0x27904a;else{if(_0x27904a<0x2/2.75){var _0x2a6f98=_0x27904a-1.5/2.75;return 7.5625*_0x2a6f98*_0x2a6f98+0.75;}else{if(_0x27904a<2.5/2.75){var _0x2a6f98=_0x27904a-2.25/2.75;return 7.5625*_0x2a6f98*_0x2a6f98+0.9375;}else{var _0x2a6f98=_0x27904a-2.625/2.75;return 7.5625*_0x2a6f98*_0x2a6f98+0.984375;}}}case _0x141155(0x6ed):var _0x4598e1=0x1-VisuMZ[_0x141155(0x6e6)](0x1-_0x47c2a9,_0x141155(0x5a1));return _0x4598e1;case _0x141155(0x44c):if(_0x47c2a9<0.5)var _0x4598e1=VisuMZ[_0x141155(0x6e6)](_0x47c2a9*0x2,'inbounce')*0.5;else var _0x4598e1=VisuMZ[_0x141155(0x6e6)](_0x47c2a9*0x2-0x1,_0x141155(0x5a1))*0.5+0.5;return _0x4598e1;default:return _0x47c2a9;}},VisuMZ['GetParamIcon']=function(_0x42925a){const _0x14b00c=_0xe356ff;_0x42925a=String(_0x42925a)['toUpperCase']();const _0x275e83=VisuMZ[_0x14b00c(0x64f)]['Settings']['Param'];if(_0x42925a==='MAXHP')return _0x275e83[_0x14b00c(0x64d)];if(_0x42925a==='MAXMP')return _0x275e83['IconParam1'];if(_0x42925a==='ATK')return _0x275e83['IconParam2'];if(_0x42925a===_0x14b00c(0x637))return _0x275e83[_0x14b00c(0x2df)];if(_0x42925a===_0x14b00c(0x734))return _0x275e83[_0x14b00c(0x445)];if(_0x42925a===_0x14b00c(0x651))return _0x275e83[_0x14b00c(0x5f1)];if(_0x42925a===_0x14b00c(0x21a))return _0x275e83[_0x14b00c(0x4bb)];if(_0x42925a===_0x14b00c(0x1c7))return _0x275e83[_0x14b00c(0x5ae)];if(_0x42925a===_0x14b00c(0x19c))return _0x275e83[_0x14b00c(0x603)];if(_0x42925a===_0x14b00c(0x471))return _0x275e83[_0x14b00c(0x3fe)];if(_0x42925a===_0x14b00c(0x5fd))return _0x275e83[_0x14b00c(0x28d)];if(_0x42925a===_0x14b00c(0x584))return _0x275e83[_0x14b00c(0x1c2)];if(_0x42925a===_0x14b00c(0x6bd))return _0x275e83['IconXParam4'];if(_0x42925a===_0x14b00c(0x338))return _0x275e83[_0x14b00c(0x3d3)];if(_0x42925a===_0x14b00c(0x51d))return _0x275e83[_0x14b00c(0x5db)];if(_0x42925a===_0x14b00c(0x227))return _0x275e83[_0x14b00c(0x4a2)];if(_0x42925a===_0x14b00c(0x1af))return _0x275e83[_0x14b00c(0x74a)];if(_0x42925a===_0x14b00c(0x4a1))return _0x275e83[_0x14b00c(0x5eb)];if(_0x42925a==='TGR')return _0x275e83['IconSParam0'];if(_0x42925a==='GRD')return _0x275e83['IconSParam1'];if(_0x42925a===_0x14b00c(0x420))return _0x275e83[_0x14b00c(0x326)];if(_0x42925a===_0x14b00c(0x5ac))return _0x275e83[_0x14b00c(0x2e5)];if(_0x42925a===_0x14b00c(0x756))return _0x275e83[_0x14b00c(0x630)];if(_0x42925a==='TCR')return _0x275e83[_0x14b00c(0x422)];if(_0x42925a===_0x14b00c(0x49e))return _0x275e83[_0x14b00c(0x660)];if(_0x42925a===_0x14b00c(0x1a0))return _0x275e83[_0x14b00c(0x357)];if(_0x42925a==='FDR')return _0x275e83[_0x14b00c(0x403)];if(_0x42925a===_0x14b00c(0x6f5))return _0x275e83[_0x14b00c(0x5a9)];if(VisuMZ[_0x14b00c(0x64f)][_0x14b00c(0x728)][_0x42925a])return VisuMZ[_0x14b00c(0x64f)][_0x14b00c(0x728)][_0x42925a]||0x0;return 0x0;},VisuMZ[_0xe356ff(0x3bd)]=function(_0x2c502b,_0x653ffa,_0x182514){const _0x3e586f=_0xe356ff;if(_0x182514===undefined&&_0x2c502b%0x1===0x0)return _0x2c502b;if(_0x182514!==undefined&&[_0x3e586f(0x757),_0x3e586f(0x3c8),_0x3e586f(0x65c),_0x3e586f(0x637),_0x3e586f(0x734),'MDF',_0x3e586f(0x21a),_0x3e586f(0x1c7)][_0x3e586f(0x416)](String(_0x182514)[_0x3e586f(0x68f)]()[_0x3e586f(0x758)]()))return _0x2c502b;return _0x653ffa=_0x653ffa||0x0,String((_0x2c502b*0x64)[_0x3e586f(0x431)](_0x653ffa))+'%';},VisuMZ[_0xe356ff(0x240)]=function(_0x4603af){const _0x3b62c3=_0xe356ff;_0x4603af=String(_0x4603af);if(!_0x4603af)return _0x4603af;if(typeof _0x4603af!==_0x3b62c3(0x5bc))return _0x4603af;const _0x49cc8b=VisuMZ[_0x3b62c3(0x64f)][_0x3b62c3(0x5cf)]['QoL'][_0x3b62c3(0x6b7)]||_0x3b62c3(0x389),_0x479079={'maximumFractionDigits':0x6};_0x4603af=_0x4603af[_0x3b62c3(0x299)](/\[(.*?)\]/g,(_0x1707d3,_0x50c168)=>{const _0x327cde=_0x3b62c3;return VisuMZ[_0x327cde(0x399)](_0x50c168,'[',']');}),_0x4603af=_0x4603af['replace'](/<(.*?)>/g,(_0x1fd91b,_0x3b510b)=>{const _0x1b4f01=_0x3b62c3;return VisuMZ[_0x1b4f01(0x399)](_0x3b510b,'<','>');}),_0x4603af=_0x4603af[_0x3b62c3(0x299)](/\{\{(.*?)\}\}/g,(_0x23a7ae,_0x20eb65)=>{const _0x507903=_0x3b62c3;return VisuMZ[_0x507903(0x399)](_0x20eb65,'','');}),_0x4603af=_0x4603af['replace'](/(\d+\.?\d*)/g,(_0x47bc39,_0x335eea)=>{const _0x263a3f=_0x3b62c3;let _0x4fe79d=_0x335eea;if(_0x4fe79d[0x0]==='0')return _0x4fe79d;if(_0x4fe79d[_0x4fe79d[_0x263a3f(0x437)]-0x1]==='.')return Number(_0x4fe79d)['toLocaleString'](_0x49cc8b,_0x479079)+'.';else return _0x4fe79d[_0x4fe79d[_0x263a3f(0x437)]-0x1]===','?Number(_0x4fe79d)[_0x263a3f(0x687)](_0x49cc8b,_0x479079)+',':Number(_0x4fe79d)[_0x263a3f(0x687)](_0x49cc8b,_0x479079);});let _0x150fde=0x3;while(_0x150fde--){_0x4603af=VisuMZ['RevertPreserveNumbers'](_0x4603af);}return _0x4603af;},VisuMZ[_0xe356ff(0x399)]=function(_0x37c0c0,_0x230ae9,_0x19c724){const _0x5a7756=_0xe356ff;return _0x37c0c0=_0x37c0c0['replace'](/(\d)/gi,(_0x1a6b0,_0x5c42a6)=>_0x5a7756(0x528)[_0x5a7756(0x560)](Number(_0x5c42a6))),_0x5a7756(0x58b)[_0x5a7756(0x560)](_0x37c0c0,_0x230ae9,_0x19c724);},VisuMZ[_0xe356ff(0x504)]=function(_0x1bd646){return _0x1bd646=_0x1bd646['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x459e2c,_0x505692)=>Number(parseInt(_0x505692))),_0x1bd646;},VisuMZ[_0xe356ff(0x28e)]=function(_0x26eff3){const _0x2f8481=_0xe356ff;SoundManager[_0x2f8481(0x72a)]();if(!Utils[_0x2f8481(0x383)]()){const _0x43d05b=window['open'](_0x26eff3,_0x2f8481(0x353));}else{const _0x499bca=process[_0x2f8481(0x47a)]==_0x2f8481(0x2c6)?_0x2f8481(0x428):process[_0x2f8481(0x47a)]==_0x2f8481(0x712)?_0x2f8481(0x302):_0x2f8481(0x6c6);require('child_process')[_0x2f8481(0x4c2)](_0x499bca+'\x20'+_0x26eff3);}},Game_Picture['prototype'][_0xe356ff(0x306)]=function(){return this['_anchor'];},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x446)]=Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x1e7)],Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x1e7)]=function(){const _0x20dff3=_0xe356ff;VisuMZ[_0x20dff3(0x64f)][_0x20dff3(0x446)][_0x20dff3(0x329)](this),this[_0x20dff3(0x6f6)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x5f0)]=Game_Picture[_0xe356ff(0x4e8)]['updateMove'],Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x265)]=function(){const _0x14c71d=_0xe356ff;this['updateAnchor'](),VisuMZ[_0x14c71d(0x64f)][_0x14c71d(0x5f0)][_0x14c71d(0x329)](this);},VisuMZ['CoreEngine'][_0xe356ff(0x277)]=Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x752)],Game_Picture[_0xe356ff(0x4e8)]['show']=function(_0x4e37b1,_0x3cfb9a,_0xe865c4,_0x1315fd,_0x46edd1,_0x39a1c1,_0x24bc6e,_0x4caf77){const _0x5ca7f9=_0xe356ff;VisuMZ['CoreEngine'][_0x5ca7f9(0x277)][_0x5ca7f9(0x329)](this,_0x4e37b1,_0x3cfb9a,_0xe865c4,_0x1315fd,_0x46edd1,_0x39a1c1,_0x24bc6e,_0x4caf77),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3cfb9a]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0xe356ff(0x3e7)]=Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x508)],Game_Picture['prototype'][_0xe356ff(0x508)]=function(_0x1f7c82,_0x2307f3,_0x44a778,_0x35afaf,_0x445a69,_0x3b9e74,_0x17268d,_0x5b9405,_0x2bf539){const _0x57e166=_0xe356ff;VisuMZ[_0x57e166(0x64f)][_0x57e166(0x3e7)][_0x57e166(0x329)](this,_0x1f7c82,_0x2307f3,_0x44a778,_0x35afaf,_0x445a69,_0x3b9e74,_0x17268d,_0x5b9405,_0x2bf539),this[_0x57e166(0x3db)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1f7c82]||{'x':0x0,'y':0x0});},Game_Picture[_0xe356ff(0x4e8)]['updateAnchor']=function(){const _0x1a80b9=_0xe356ff;this[_0x1a80b9(0x32c)]>0x0&&(this['_anchor']['x']=this[_0x1a80b9(0x638)](this['_anchor']['x'],this[_0x1a80b9(0x61f)]['x']),this[_0x1a80b9(0x6f6)]['y']=this[_0x1a80b9(0x638)](this['_anchor']['y'],this['_targetAnchor']['y']));},Game_Picture[_0xe356ff(0x4e8)]['setAnchor']=function(_0x4ceee3){const _0x41784c=_0xe356ff;this[_0x41784c(0x6f6)]=_0x4ceee3,this[_0x41784c(0x61f)]=JsonEx[_0x41784c(0x56e)](this[_0x41784c(0x6f6)]);},Game_Picture[_0xe356ff(0x4e8)][_0xe356ff(0x3db)]=function(_0x27797a){const _0xa4dcf5=_0xe356ff;this[_0xa4dcf5(0x61f)]=_0x27797a;},VisuMZ[_0xe356ff(0x64f)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0xe356ff(0x4e8)]['updateOrigin'],Sprite_Picture[_0xe356ff(0x4e8)]['updateOrigin']=function(){const _0x2099d1=_0xe356ff,_0xc71e92=this['picture']();!_0xc71e92[_0x2099d1(0x306)]()?VisuMZ[_0x2099d1(0x64f)][_0x2099d1(0x3a0)]['call'](this):(this['anchor']['x']=_0xc71e92[_0x2099d1(0x306)]()['x'],this[_0x2099d1(0x306)]['y']=_0xc71e92[_0x2099d1(0x306)]()['y']);},Game_Action['prototype']['setEnemyAction']=function(_0x4f97a5){const _0x3d74bb=_0xe356ff;if(_0x4f97a5){const _0x4474e8=_0x4f97a5[_0x3d74bb(0x70a)];if(_0x4474e8===0x1&&this[_0x3d74bb(0x635)]()[_0x3d74bb(0x41e)]()!==0x1)this['setAttack']();else _0x4474e8===0x2&&this[_0x3d74bb(0x635)]()[_0x3d74bb(0x2f3)]()!==0x2?this['setGuard']():this['setSkill'](_0x4474e8);}else this['clear']();},Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x3a8)]=function(){const _0xcf2cea=_0xe356ff;return this[_0xcf2cea(0x34f)]()[_0xcf2cea(0x252)](_0x17571e=>this[_0xcf2cea(0x66e)](_0x17571e)&&this['skillTypes']()[_0xcf2cea(0x416)](_0x17571e['stypeId']));},Window_Base['prototype'][_0xe356ff(0x536)]=function(){const _0x424e3f=_0xe356ff;this[_0x424e3f(0x3dc)]=new Sprite(),this[_0x424e3f(0x3dc)]['bitmap']=new Bitmap(0x0,0x0),this[_0x424e3f(0x3dc)]['x']=0x0,this[_0x424e3f(0x1b8)](this[_0x424e3f(0x3dc)]);},Window_Base[_0xe356ff(0x4e8)][_0xe356ff(0x49b)]=function(){const _0x1cf3ae=_0xe356ff;if(this[_0x1cf3ae(0x3dc)]){const _0x1b1979=this['_dimmerSprite'][_0x1cf3ae(0x535)],_0x5765b6=this['width'],_0x175b19=this[_0x1cf3ae(0x5fb)],_0x1f7f9b=this[_0x1cf3ae(0x5ea)],_0x39bebe=ColorManager[_0x1cf3ae(0x1bb)](),_0x35e5e4=ColorManager['dimColor2']();_0x1b1979[_0x1cf3ae(0x3c9)](_0x5765b6,_0x175b19),_0x1b1979[_0x1cf3ae(0x2dc)](0x0,0x0,_0x5765b6,_0x1f7f9b,_0x35e5e4,_0x39bebe,!![]),_0x1b1979['fillRect'](0x0,_0x1f7f9b,_0x5765b6,_0x175b19-_0x1f7f9b*0x2,_0x39bebe),_0x1b1979['gradientFillRect'](0x0,_0x175b19-_0x1f7f9b,_0x5765b6,_0x1f7f9b,_0x39bebe,_0x35e5e4,!![]),this[_0x1cf3ae(0x3dc)]['setFrame'](0x0,0x0,_0x5765b6,_0x175b19);}},Game_Actor[_0xe356ff(0x4e8)][_0xe356ff(0x432)]=function(){const _0x5169b2=_0xe356ff;for(let _0xfe69d0=0x0;_0xfe69d0<this[_0x5169b2(0x3e3)]();_0xfe69d0++){const _0x3147a8=this[_0x5169b2(0x2f4)]();let _0x1ca52a=Number['MIN_SAFE_INTEGER'];this[_0x5169b2(0x24b)](_0xfe69d0,_0x3147a8[0x0]);for(const _0x2cbde8 of _0x3147a8){const _0x36b1b9=_0x2cbde8['evaluate']();_0x36b1b9>_0x1ca52a&&(_0x1ca52a=_0x36b1b9,this[_0x5169b2(0x24b)](_0xfe69d0,_0x2cbde8));}}this[_0x5169b2(0x628)](_0x5169b2(0x408));},Window_BattleItem['prototype'][_0xe356ff(0x3c4)]=function(_0x11f4ff){const _0x1237a2=_0xe356ff;return BattleManager[_0x1237a2(0x691)]()?BattleManager['actor']()[_0x1237a2(0x66e)](_0x11f4ff):Window_ItemList[_0x1237a2(0x4e8)][_0x1237a2(0x3c4)][_0x1237a2(0x329)](this,_0x11f4ff);},VisuMZ['CoreEngine'][_0xe356ff(0x454)]=Scene_Map[_0xe356ff(0x4e8)]['createSpriteset'],Scene_Map[_0xe356ff(0x4e8)]['createSpriteset']=function(){const _0x448834=_0xe356ff;VisuMZ['CoreEngine'][_0x448834(0x454)][_0x448834(0x329)](this);const _0x182ba2=this[_0x448834(0x260)][_0x448834(0x4ac)];if(_0x182ba2)this[_0x448834(0x618)](_0x182ba2);},VisuMZ[_0xe356ff(0x64f)][_0xe356ff(0x1f1)]=Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x1a2)],Scene_Battle[_0xe356ff(0x4e8)][_0xe356ff(0x1a2)]=function(){const _0x201de9=_0xe356ff;VisuMZ[_0x201de9(0x64f)][_0x201de9(0x1f1)]['call'](this);const _0x55bea5=this[_0x201de9(0x260)][_0x201de9(0x4ac)];if(_0x55bea5)this[_0x201de9(0x618)](_0x55bea5);};