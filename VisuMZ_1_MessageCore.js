//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.13] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x3533=['FUNC','mainFontFace','center','canMove','easeIn','processPreviousColor','obtainGold','\x1bBOLD[0]','adjustShowChoiceExtension','setup','AddOption','processDrawCenteredPicture','ParseSkillNotetags','textWidth','AddAutoColor','Items','<BR>','textCodeCheck','isItem','AdjustRect','resetTextColor','choiceCols','ParseStateNotetags','SortObjectByKeyLength','JSON','TextMacros','Window_Help_refresh','setMessageWindowWidth','max','addContinuousShowTextCommands','MaxCols','_textColorStack','Scene_Boot_onDatabaseLoaded','process_VisuMZ_MessageCore_TextCodes_Action','round','add','updateEvents','name','replace','boxWidth','calcWindowHeight','Window_Base_update','setHelpWindowWordWrap','openness','Actors','getChoiceListMaxRows','Window_Base_textSizeEx','_messageWindow','CommonEvent','_centerMessageWindow','windowWidth','_autoSizeCheck','makeData','ChoiceWindowLineHeight','maxFontSizeInLine','<B>','1qBKerc','_resetRect','\x1bC[%1]%2\x1bPREVCOLOR[0]','Window_Options_addGeneralOptions','\x1bITALIC[0]','FontBiggerCap','version','TextColor','return\x20\x27','_moveTargetWidth','DefaultOutlineWidth','changePaintOpacity','Scene_Options_maxCommands','processCommonEvent','setBackground','outlineWidth','preFlushTextState','escapeStart','defeat','currentCommand','actorName','mainFontSize','resetFontSettings','map\x20party','convertLockColorsEscapeCharacters','_textDelay','getChoiceListMaxColumns','preemptive','_eventId','ConvertParams','close','format','getChoiceListTextAlign','processWrapBreak','convertFontSettingsEscapeCharacters','setLastGainedItemData','States','call','4541MszKkm','constructor','setWordWrap','prepareWordWrapEscapeCharacters','sort','changeValue','addExtraShowChoices','createContents','returnPreservedFontSettings','setChoiceListMaxColumns','LineBreakSpace','adjustShowChoiceDefault','getPreservedFontSettings','applyDatabaseAutoColor','statusText','convertBackslashCharacters','makeCommandList','\x1bBOLD[1]','Window_Message_isTriggered','exit','contents','isChoiceEnabled','ARRAYJSON','MessageCore','ConfigManager_makeData','numVisibleRows','setColorLock','Game_Map_initialize','isTriggered','54885dNJRSv','boxHeight','HIDE','rtl','MessageRows','_moveTargetX','processFsTextCode','_showFast','setTextAlignment','Window_NameBox_refresh','defaultColor','(((','setChoiceListTextAlign','setMessageWindowRows','substring','fontBold','itemLineRect','choices','processCharacter','obtainExp','Window_Message_processEscapeCharacter','StretchDimmedBg','STR','event','loadPicture','victory','PREVCOLOR','CreateAutoColorRegExpLists','getChoiceListLineHeight','addMessageCommonEvent','length','setupEvents','TextStr','updateAutoPosition','processMessageCoreEscapeActions','battle\x20enemy','Window_Message_clearFlags','\x1bTEXTALIGNMENT[3]','blt','index','colSpacing','[0]','FontSmallerCap','WRAPBREAK','ParseEnemyNotetags','MessageWidth','split','_lastGainedItemData','clearActorNameAutoColor','_colorLock','setupChoices','ParseWeaponNotetags','none','Skills','messageCoreTextSpeed','_moveDuration','AutoColor','messageRows','ARRAYEVAL','Default','isSceneBattle','processAutoPosition','convertVariableEscapeCharacters','contentsBack','updateOffsetPosition','processFontChangeItalic','textSpeed','_autoSizeRegexp','prepareShowTextCommand','activate','maxCommands','getLastGainedItemData','TextJS','findTargetSprite','Instant','moveBy','resetRect','startX','isChoiceVisible','updateRelativePosition','updateTransform','fontFace','_MessageCoreSettings','AutoColorRegExp','convertTextAlignmentEscapeCharacters','Window_Options_statusText','bind','prepareAutoSizeEscapeCharacters','Type','_commonEventId','floor','addWrapBreakAfterPunctuation','_textDelayCount','return\x200','stretchDimmerSprite','changeVolume','normalColor','_autoPosRegExp','isAutoColorAffected','clampPlacementPosition','_wordWrap','code','processFontChangeBold','currencyUnit','processEscapeCharacter','Window_Base_processNewLine','outputHeight','updateNameBoxMove','instantTextSpeed','map\x20actor','toUpperCase','\x1bi[%1]%2','Name','scale','CreateAutoColorRegExpListEntries','getMessageWindowRows','_cancelButton','textSizeEx','<WORDWRAP>','356293SDsJbx','MessageWindowProperties','lastGainedObjectName','1141573RFoOqF','Match','battle\x20actor','_nameBoxWindow','SWITCH','_index','ARRAYFUNC','Undefined','refreshDimmerBitmap','choiceLineHeight','initMessageCore','setFaceImage','DISABLE','windowX','addMessageCoreTextSpeedCommand','ITALIC','status','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Window_Base_changeTextColor','Game_System_initialize','shift','setChoiceListLineHeight','TextSpeed','addCommand','initTextAlignement','SWITCHES','_interpreter','itemRectWithPadding','ConfigManager_applyData','</CENTER>','Window_Base_processEscapeCharacter','2ZkcDOj','ARRAYNUM','_moveEasingType','fontItalic','placeCancelButton','list','setRelativePosition','resetPositionX','_indent','\x1bCOLORLOCK[1]','Width','registerActorNameAutoColorChanges','ParseItemNotetags','isBreakShowTextCommands','ParseClassNotetags','min','makeFontBigger','TightWrap','NameBoxWindowOffsetX','_autoPositionTarget','TextColor%1','processColorLock','Window_Base_processControlCharacter','addLoadListener','setMessageWindowWordWrap','processTextAlignmentChange','refresh','initialize','process_VisuMZ_MessageCore_TextCodes_Replace','newPage','<I>','processNewLine','value','choiceRows','addMessageCoreCommands','ARRAYSTR','prototype','processTextAlignmentX','ChoiceWindowTextAlign','addContinuousShowChoices','onDatabaseLoaded','maxLines','setChoiceListMaxRows','textColor','isHelpWindowWordWrap','updateAutoSizePosition','postFlushTextState','updatePlacement','PICTURE','WAIT','ConvertTextAutoColorRegExpFriendly','parameters','Game_Interpreter_setupChoices','processAutoSize','changeTextSpeed','\x1bCOLORLOCK[0]','clear','processStoredAutoColorChanges','isContinuePrepareShowTextCommands','faceName','Enemies','isVolumeSymbol','updateDimensions','parse','members','_wholeMoveDuration','Window_NameBox_updatePlacement','Window_ChoiceList_updatePlacement','processDrawPicture','Window_ChoiceList_windowX','setWaitMode','TextCodeReplace','messagePositionReset','preConvertEscapeCharacters','itemHeight','currentExt','EVAL','isWordWrapEnabled','process_VisuMZ_MessageCore_AutoColor','calcMoveEasing','type','59357DIEFrB','getConfigValue','convertBaseEscapeCharacters','prepareShowTextFollowups','start','addGeneralOptions','FastForwardKey','moveTo','TextManager_message','<RIGHT>','MessageTextDelay','description','flushTextState','commandSymbol','commandName','Game_Party_gainItem','COMMONEVENT','getMessageWindowWidth','drawing','right','setupItemChoice','test','map','convertMessageCoreEscapeActions','databaseObjectName','push','_texts','unshift','synchronizeNameBox','resetWordWrap','choiceTextAlign','convertTextMacros','substr','anchor','textSizeExWordWrap','Game_Party_initialize','\x1bWrapBreak[0]','easeInOut','message','\x1bTEXTALIGNMENT','isRunning','maxChoiceWidth','toLowerCase','</WORDWRAP>','_moveTargetY','RelativePXPY','map\x20event','Classes','convertEscapeCharacters','match','changeOutlineColor','412378JzEmCQ','startY','convertMessageCoreEscapeReplacements','faceWidth','createTextState','messageWidth','clamp','iconIndex','_dimmerSprite','Window_Options_changeVolume','nextEventCode','exec','MessageWindow','width','textSizeExTextAlignment','Armors','follower','Weapons','updateBackground','slice','updateOverlappingY','obtainEscapeParam','isSceneMap','Window_Options_isVolumeSymbol','processPyTextCode','TextCodeActions','registerCommand','drawBackPicture','messageCoreWindowX','paintOpacity','maxCols','registerResetRect','_messageCommonEvents','makeDeepCopy','partyMemberName','Window_Base_initialize','isBusy','\x1bTEXTALIGNMENT[0]','setTextDelay','<LEFT>','_relativePosition','General','processAllText','_spriteset','isPressed','TEXTALIGNMENT','levelUp','ChoiceWindowMaxRows','Settings','clearCommandList','processPxTextCode','outputWidth','_autoColorActorNames','_moveTargetHeight','helpWordWrap','makeFontSmaller','_data','outlineColor','gainItem','applyData','processActorNameAutoColorChanges','NUM','quantity','ARRAYSTRUCT','CreateAutoColorFor','messageWordWrap','Game_Map_setupEvents','WordWrap','selectDefault','update','startWait','lineHeight','ChoiceWindowProperties','process_VisuMZ_MessageCore_TextMacros','launchMessageCommonEvent','isRTL','ceil','isMessageWindowWordWrap','</I>','_scene','terminateMessage','changeTextColor','actor','<COLORLOCK>','indexOf','onNewPageMessageCore','processControlCharacter','onProcessCharacter','processCustomWait','includes','padding','Window_Message_newPage','Window_Message_synchronizeNameBox','trim','CENTERPICTURE','text','getTextAlignment','textSpeedStatusText','ParseArmorNotetags','obtainEscapeString','surprise','\x1bITALIC[1]','left','itemPadding','height','<%1>','COLORLOCK','fontSize','Game_Map_updateEvents','ParseAllNotetags','battle\x20party','postConvertEscapeCharacters','Window_Message_terminateMessage','updateMessageCommonEvents','752108GKctXm','setSpeakerName','_messagePositionReset','<CENTER>','default','clearFlags','callOkHandler','<LINE\x20BREAK>','AutoColorBypassList','map\x20player','textCodeResult','remove','messageWindowRect','setPositionType','_list','FontChangeValue','updateMove','mainSprite','outLineColor','applyMoveEasing','onChoice','_textAlignment','Window_Message_updatePlacement','442cYspYW','BOLD'];const _0x4e45=function(_0x333a61,_0x5ba0b7){_0x333a61=_0x333a61-0x1d0;let _0x353319=_0x3533[_0x333a61];return _0x353319;};const _0x43f6c5=_0x4e45;(function(_0x4e91d4,_0x1a2761){const _0x18366b=_0x4e45;while(!![]){try{const _0x1280bb=-parseInt(_0x18366b(0x1eb))+parseInt(_0x18366b(0x300))+-parseInt(_0x18366b(0x28e))+parseInt(_0x18366b(0x351))*parseInt(_0x18366b(0x25b))+parseInt(_0x18366b(0x394))+parseInt(_0x18366b(0x20a))*-parseInt(_0x18366b(0x1e8))+-parseInt(_0x18366b(0x377))*-parseInt(_0x18366b(0x317));if(_0x1280bb===_0x1a2761)break;else _0x4e91d4['push'](_0x4e91d4['shift']());}catch(_0x38a74a){_0x4e91d4['push'](_0x4e91d4['shift']());}}}(_0x3533,0x942d7));var label=_0x43f6c5(0x38e),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x293681){const _0x2c0139=_0x43f6c5;return _0x293681[_0x2c0139(0x1fb)]&&_0x293681['description'][_0x2c0139(0x2e7)]('['+label+']');})[0x0];VisuMZ[label][_0x43f6c5(0x2be)]=VisuMZ[label][_0x43f6c5(0x2be)]||{},VisuMZ[_0x43f6c5(0x36e)]=function(_0x3622dd,_0x229fef){const _0x29a538=_0x43f6c5;for(const _0x5aa47b in _0x229fef){if(_0x5aa47b[_0x29a538(0x28c)](/(.*):(.*)/i)){const _0x33cf93=String(RegExp['$1']),_0x375c48=String(RegExp['$2'])[_0x29a538(0x1df)]()['trim']();let _0xb81ccb,_0x25c8bd,_0x53e53b;switch(_0x375c48){case _0x29a538(0x2cb):_0xb81ccb=_0x229fef[_0x5aa47b]!==''?Number(_0x229fef[_0x5aa47b]):0x0;break;case _0x29a538(0x20b):_0x25c8bd=_0x229fef[_0x5aa47b]!==''?JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b]):[],_0xb81ccb=_0x25c8bd[_0x29a538(0x271)](_0x3e6ad3=>Number(_0x3e6ad3));break;case _0x29a538(0x256):_0xb81ccb=_0x229fef[_0x5aa47b]!==''?eval(_0x229fef[_0x5aa47b]):null;break;case _0x29a538(0x3ce):_0x25c8bd=_0x229fef[_0x5aa47b]!==''?JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b]):[],_0xb81ccb=_0x25c8bd[_0x29a538(0x271)](_0x27689a=>eval(_0x27689a));break;case _0x29a538(0x331):_0xb81ccb=_0x229fef[_0x5aa47b]!==''?JSON['parse'](_0x229fef[_0x5aa47b]):'';break;case _0x29a538(0x38d):_0x25c8bd=_0x229fef[_0x5aa47b]!==''?JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b]):[],_0xb81ccb=_0x25c8bd[_0x29a538(0x271)](_0x193649=>JSON[_0x29a538(0x249)](_0x193649));break;case _0x29a538(0x319):_0xb81ccb=_0x229fef[_0x5aa47b]!==''?new Function(JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b])):new Function(_0x29a538(0x3f1));break;case _0x29a538(0x1f1):_0x25c8bd=_0x229fef[_0x5aa47b]!==''?JSON['parse'](_0x229fef[_0x5aa47b]):[],_0xb81ccb=_0x25c8bd['map'](_0x1c9396=>new Function(JSON[_0x29a538(0x249)](_0x1c9396)));break;case _0x29a538(0x3aa):_0xb81ccb=_0x229fef[_0x5aa47b]!==''?String(_0x229fef[_0x5aa47b]):'';break;case _0x29a538(0x22d):_0x25c8bd=_0x229fef[_0x5aa47b]!==''?JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b]):[],_0xb81ccb=_0x25c8bd[_0x29a538(0x271)](_0x4b3419=>String(_0x4b3419));break;case'STRUCT':_0x53e53b=_0x229fef[_0x5aa47b]!==''?JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b]):{},_0x3622dd[_0x33cf93]={},VisuMZ[_0x29a538(0x36e)](_0x3622dd[_0x33cf93],_0x53e53b);continue;case _0x29a538(0x2cd):_0x25c8bd=_0x229fef[_0x5aa47b]!==''?JSON[_0x29a538(0x249)](_0x229fef[_0x5aa47b]):[],_0xb81ccb=_0x25c8bd[_0x29a538(0x271)](_0xfacd32=>VisuMZ['ConvertParams']({},JSON[_0x29a538(0x249)](_0xfacd32)));break;default:continue;}_0x3622dd[_0x33cf93]=_0xb81ccb;}}return _0x3622dd;},(_0x1026da=>{const _0x4b09ff=_0x43f6c5,_0x55a26c=_0x1026da[_0x4b09ff(0x33e)];for(const _0x14c126 of dependencies){if(!Imported[_0x14c126]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x55a26c,_0x14c126)),SceneManager['exit']();break;}}const _0x3119a8=_0x1026da[_0x4b09ff(0x266)];if(_0x3119a8['match'](/\[Version[ ](.*?)\]/i)){const _0x5af904=Number(RegExp['$1']);_0x5af904!==VisuMZ[label][_0x4b09ff(0x357)]&&(alert(_0x4b09ff(0x1fc)[_0x4b09ff(0x370)](_0x55a26c,_0x5af904)),SceneManager[_0x4b09ff(0x38a)]());}if(_0x3119a8[_0x4b09ff(0x28c)](/\[Tier[ ](\d+)\]/i)){const _0x3dcfed=Number(RegExp['$1']);_0x3dcfed<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x55a26c,_0x3dcfed,tier)),SceneManager[_0x4b09ff(0x38a)]()):tier=Math[_0x4b09ff(0x335)](_0x3dcfed,tier);}VisuMZ[_0x4b09ff(0x36e)](VisuMZ[label][_0x4b09ff(0x2be)],_0x1026da[_0x4b09ff(0x23d)]);})(pluginData),PluginManager[_0x43f6c5(0x2a8)](pluginData[_0x43f6c5(0x33e)],_0x43f6c5(0x2d6),_0xb535e4=>{const _0x416173=_0x43f6c5;VisuMZ['ConvertParams'](_0xb535e4,_0xb535e4);const _0x2bd9df=_0xb535e4['LineHeight']||$gameSystem[_0x416173(0x3b0)]()||0x1,_0x52014f=_0xb535e4['MaxRows']||$gameSystem['getChoiceListMaxRows']()||0x1,_0x48f052=_0xb535e4[_0x416173(0x337)]||$gameSystem[_0x416173(0x36b)]()||0x1,_0x5bc6f9=_0xb535e4['TextAlign'][_0x416173(0x285)]()||_0x416173(0x304);$gameSystem[_0x416173(0x200)](_0x2bd9df),$gameSystem[_0x416173(0x234)](_0x52014f),$gameSystem[_0x416173(0x380)](_0x48f052),$gameSystem[_0x416173(0x3a0)](_0x5bc6f9);}),PluginManager[_0x43f6c5(0x2a8)](pluginData[_0x43f6c5(0x33e)],_0x43f6c5(0x1e9),_0x30cb47=>{const _0x582562=_0x43f6c5;VisuMZ[_0x582562(0x36e)](_0x30cb47,_0x30cb47);const _0x2e24a3=_0x30cb47['Rows']||$gameSystem['getMessageWindowRows']()||0x1,_0x2a9144=_0x30cb47[_0x582562(0x214)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x582562(0x34a)]=_0x30cb47['Center']||![];const _0x36b7ad=_0x30cb47[_0x582562(0x2d1)][_0x582562(0x285)]();$gameSystem['setMessageWindowRows'](_0x2e24a3),$gameSystem['setMessageWindowWidth'](_0x2a9144);['true','false'][_0x582562(0x2e7)](_0x36b7ad)&&$gameSystem[_0x582562(0x222)](eval(_0x36b7ad));const _0x5e1fb0=SceneManager[_0x582562(0x2dd)][_0x582562(0x348)];_0x5e1fb0&&(_0x5e1fb0[_0x582562(0x278)](),_0x5e1fb0[_0x582562(0x248)](),_0x5e1fb0[_0x582562(0x37e)]());}),VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x339)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot['prototype'][_0x43f6c5(0x232)]=function(){const _0x16e5b6=_0x43f6c5;VisuMZ[_0x16e5b6(0x38e)][_0x16e5b6(0x339)][_0x16e5b6(0x376)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x16e5b6(0x226)](),this[_0x16e5b6(0x2d7)](),this[_0x16e5b6(0x258)]();},VisuMZ['MessageCore'][_0x43f6c5(0x330)]=function(_0x4a9df0){const _0x42dfa1=_0x43f6c5,_0x9b5ebd=VisuMZ[_0x42dfa1(0x38e)][_0x42dfa1(0x2be)][_0x4a9df0];_0x9b5ebd['sort']((_0x571f7b,_0x4cf2a0)=>{const _0x12c593=_0x42dfa1;if(!_0x571f7b||!_0x4cf2a0)return-0x1;return _0x4cf2a0[_0x12c593(0x1ec)][_0x12c593(0x3b2)]-_0x571f7b[_0x12c593(0x1ec)]['length'];});},Scene_Boot['prototype'][_0x43f6c5(0x33a)]=function(){const _0xa5e832=_0x43f6c5;VisuMZ[_0xa5e832(0x38e)]['SortObjectByKeyLength'](_0xa5e832(0x2a7));for(const _0x5cc93f of VisuMZ['MessageCore']['Settings'][_0xa5e832(0x2a7)]){_0x5cc93f[_0xa5e832(0x1ec)]=_0x5cc93f[_0xa5e832(0x1ec)]['toUpperCase'](),_0x5cc93f[_0xa5e832(0x32a)]=new RegExp('\x1b'+_0x5cc93f['Match'],'gi'),_0x5cc93f[_0xa5e832(0x30a)]='\x1b'+_0x5cc93f[_0xa5e832(0x1ec)];if(_0x5cc93f[_0xa5e832(0x3ec)]==='')_0x5cc93f['textCodeResult']+=_0xa5e832(0x3bd);}},Scene_Boot[_0x43f6c5(0x22e)][_0x43f6c5(0x226)]=function(){const _0x200ae0=_0x43f6c5;VisuMZ['MessageCore'][_0x200ae0(0x330)](_0x200ae0(0x251));for(const _0x54874f of VisuMZ['MessageCore']['Settings']['TextCodeReplace']){_0x54874f[_0x200ae0(0x32a)]=new RegExp('\x1b'+_0x54874f['Match']+_0x54874f[_0x200ae0(0x3ec)],'gi'),_0x54874f[_0x200ae0(0x3b4)]!==''&&_0x54874f[_0x200ae0(0x3b4)]!==_0x200ae0(0x1f2)?_0x54874f[_0x200ae0(0x30a)]=new Function(_0x200ae0(0x359)+_0x54874f[_0x200ae0(0x3b4)]['replace'](/\\/g,'\x1b')+'\x27'):_0x54874f['textCodeResult']=_0x54874f[_0x200ae0(0x3dc)];}},Scene_Boot[_0x43f6c5(0x22e)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x37049d=_0x43f6c5;for(const _0x3fa8ac of VisuMZ[_0x37049d(0x38e)][_0x37049d(0x2be)][_0x37049d(0x332)]){_0x3fa8ac[_0x37049d(0x32a)]=new RegExp('\x5c['+_0x3fa8ac[_0x37049d(0x1ec)]+'\x5c]','gi'),_0x3fa8ac[_0x37049d(0x3b4)]!==''&&_0x3fa8ac['TextStr']!==_0x37049d(0x1f2)?_0x3fa8ac['textCodeResult']=new Function('return\x20\x27'+_0x3fa8ac[_0x37049d(0x3b4)][_0x37049d(0x33f)](/\\/g,'\x1b')+'\x27'):_0x3fa8ac[_0x37049d(0x30a)]=_0x3fa8ac[_0x37049d(0x3dc)];}},Scene_Boot[_0x43f6c5(0x22e)][_0x43f6c5(0x258)]=function(){const _0x1d298f=_0x43f6c5,_0x3329cd=VisuMZ['MessageCore']['Settings'][_0x1d298f(0x3cc)];!VisuMZ[_0x1d298f(0x2fb)]&&(VisuMZ[_0x1d298f(0x38e)][_0x1d298f(0x327)]($dataClasses,_0x3329cd[_0x1d298f(0x28a)]),VisuMZ[_0x1d298f(0x38e)][_0x1d298f(0x327)]($dataSkills,_0x3329cd[_0x1d298f(0x3c9)]),VisuMZ['MessageCore']['AddAutoColor']($dataItems,_0x3329cd[_0x1d298f(0x328)]),VisuMZ[_0x1d298f(0x38e)][_0x1d298f(0x327)]($dataWeapons,_0x3329cd['Weapons']),VisuMZ[_0x1d298f(0x38e)]['AddAutoColor']($dataArmors,_0x3329cd['Armors']),VisuMZ[_0x1d298f(0x38e)]['AddAutoColor']($dataEnemies,_0x3329cd[_0x1d298f(0x246)]),VisuMZ['MessageCore'][_0x1d298f(0x327)]($dataStates,_0x3329cd[_0x1d298f(0x375)])),VisuMZ[_0x1d298f(0x38e)][_0x1d298f(0x3af)]();},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x308)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x43f6c5(0x350),'</B>',_0x43f6c5(0x228),_0x43f6c5(0x2dc),_0x43f6c5(0x2b5),'</LEFT>',_0x43f6c5(0x303),_0x43f6c5(0x208),_0x43f6c5(0x264),'</RIGHT>',_0x43f6c5(0x2e1),'</COLORLOCK>',_0x43f6c5(0x39f),')))',_0x43f6c5(0x1e7),_0x43f6c5(0x286),_0x43f6c5(0x329),_0x43f6c5(0x307),_0x43f6c5(0x23a),_0x43f6c5(0x2ec),_0x43f6c5(0x26b),_0x43f6c5(0x23b),'SHOW',_0x43f6c5(0x396),'ENABLE',_0x43f6c5(0x1f7),_0x43f6c5(0x1ef),_0x43f6c5(0x204),'ALL','ANY'],VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x327)]=function(_0x4d93a8,_0x297ce2){const _0x3960ca=_0x43f6c5;if(_0x297ce2<=0x0)return;const _0x5e8c72=_0x4d93a8;for(const _0x27aaa2 of _0x5e8c72){if(!_0x27aaa2)continue;VisuMZ[_0x3960ca(0x38e)][_0x3960ca(0x2ce)](_0x27aaa2,_0x297ce2);}},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x3af)]=function(){const _0x2a6c72=_0x43f6c5;VisuMZ[_0x2a6c72(0x38e)][_0x2a6c72(0x3e7)]=[];for(let _0x56b5ab=0x1;_0x56b5ab<=0x1f;_0x56b5ab++){const _0x8f3824=_0x2a6c72(0x21e)[_0x2a6c72(0x370)](_0x56b5ab),_0x5d06d0=VisuMZ['MessageCore'][_0x2a6c72(0x2be)][_0x2a6c72(0x3cc)][_0x8f3824];_0x5d06d0[_0x2a6c72(0x37b)]((_0x2c60d0,_0x1a7754)=>{const _0x1b2894=_0x2a6c72;if(!_0x2c60d0||!_0x1a7754)return-0x1;return _0x1a7754[_0x1b2894(0x3b2)]-_0x2c60d0['length'];}),this[_0x2a6c72(0x1e3)](_0x5d06d0,_0x56b5ab);}},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x1e3)]=function(_0x23490f,_0x23addf){const _0x416491=_0x43f6c5;for(const _0x1cd931 of _0x23490f){if(_0x1cd931[_0x416491(0x3b2)]<=0x0)continue;if(/^\d+$/['test'](_0x1cd931))continue;let _0x32c0cf=VisuMZ[_0x416491(0x38e)]['ConvertTextAutoColorRegExpFriendly'](_0x1cd931);if(_0x1cd931['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x4ffd65=new RegExp(_0x32c0cf,'i');else var _0x4ffd65=new RegExp('\x5cb'+_0x32c0cf+'\x5cb','g');VisuMZ['MessageCore']['AutoColorRegExp']['push']([_0x4ffd65,_0x416491(0x353)[_0x416491(0x370)](_0x23addf,_0x1cd931)]);}},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x23c)]=function(_0x54a957){const _0x50165e=_0x43f6c5;return _0x54a957=_0x54a957[_0x50165e(0x33f)](/(\W)/gi,(_0x445327,_0x2a31e7)=>'\x5c%1'['format'](_0x2a31e7)),_0x54a957;},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x218)]=VisuMZ[_0x43f6c5(0x218)],VisuMZ[_0x43f6c5(0x218)]=function(_0x40fb76){const _0x5f5d0d=_0x43f6c5;VisuMZ[_0x5f5d0d(0x38e)]['ParseClassNotetags']['call'](this,_0x40fb76);const _0x287d40=VisuMZ[_0x5f5d0d(0x38e)][_0x5f5d0d(0x2be)][_0x5f5d0d(0x3cc)];VisuMZ[_0x5f5d0d(0x38e)]['CreateAutoColorFor'](_0x40fb76,_0x287d40[_0x5f5d0d(0x28a)]);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x325)]=VisuMZ[_0x43f6c5(0x325)],VisuMZ[_0x43f6c5(0x325)]=function(_0x45118f){const _0x39e805=_0x43f6c5;VisuMZ[_0x39e805(0x38e)][_0x39e805(0x325)][_0x39e805(0x376)](this,_0x45118f);const _0x2e972a=VisuMZ['MessageCore'][_0x39e805(0x2be)]['AutoColor'];VisuMZ[_0x39e805(0x38e)][_0x39e805(0x2ce)](_0x45118f,_0x2e972a['Skills']);},VisuMZ['MessageCore']['ParseItemNotetags']=VisuMZ[_0x43f6c5(0x216)],VisuMZ[_0x43f6c5(0x216)]=function(_0x57e52c){const _0x56673d=_0x43f6c5;VisuMZ[_0x56673d(0x38e)][_0x56673d(0x216)][_0x56673d(0x376)](this,_0x57e52c);const _0x470004=VisuMZ[_0x56673d(0x38e)][_0x56673d(0x2be)][_0x56673d(0x3cc)];VisuMZ[_0x56673d(0x38e)][_0x56673d(0x2ce)](_0x57e52c,_0x470004[_0x56673d(0x328)]);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x3c7)]=VisuMZ[_0x43f6c5(0x3c7)],VisuMZ[_0x43f6c5(0x3c7)]=function(_0x49719e){const _0x3deb89=_0x43f6c5;VisuMZ['MessageCore'][_0x3deb89(0x3c7)]['call'](this,_0x49719e);const _0x18233f=VisuMZ[_0x3deb89(0x38e)][_0x3deb89(0x2be)]['AutoColor'];VisuMZ['MessageCore'][_0x3deb89(0x2ce)](_0x49719e,_0x18233f['Weapons']);},VisuMZ[_0x43f6c5(0x38e)]['ParseArmorNotetags']=VisuMZ[_0x43f6c5(0x2f0)],VisuMZ[_0x43f6c5(0x2f0)]=function(_0x57fb44){const _0x216b83=_0x43f6c5;VisuMZ[_0x216b83(0x38e)]['ParseArmorNotetags'][_0x216b83(0x376)](this,_0x57fb44);const _0x1a4101=VisuMZ[_0x216b83(0x38e)][_0x216b83(0x2be)][_0x216b83(0x3cc)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x57fb44,_0x1a4101['Armors']);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x3c0)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x43f6c5(0x3c0)]=function(_0x53f1d1){const _0x353025=_0x43f6c5;VisuMZ[_0x353025(0x38e)][_0x353025(0x3c0)]['call'](this,_0x53f1d1);const _0x3fe193=VisuMZ['MessageCore'][_0x353025(0x2be)][_0x353025(0x3cc)];VisuMZ[_0x353025(0x38e)]['CreateAutoColorFor'](_0x53f1d1,_0x3fe193[_0x353025(0x246)]);},VisuMZ['MessageCore'][_0x43f6c5(0x32f)]=VisuMZ[_0x43f6c5(0x32f)],VisuMZ[_0x43f6c5(0x32f)]=function(_0x196405){const _0x495ea1=_0x43f6c5;VisuMZ[_0x495ea1(0x38e)]['ParseStateNotetags'][_0x495ea1(0x376)](this,_0x196405);const _0x589f23=VisuMZ[_0x495ea1(0x38e)]['Settings'][_0x495ea1(0x3cc)];VisuMZ[_0x495ea1(0x38e)][_0x495ea1(0x2ce)](_0x196405,_0x589f23[_0x495ea1(0x375)]);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2ce)]=function(_0x6e76b4,_0x26c065){const _0x451604=_0x43f6c5;if(_0x26c065<=0x0)return;const _0x5680dc=VisuMZ[_0x451604(0x38e)]['Settings'][_0x451604(0x3cc)][_0x451604(0x358)+_0x26c065];let _0x12f72d=_0x6e76b4[_0x451604(0x33e)]['trim']();if(/^\d+$/[_0x451604(0x270)](_0x12f72d))return;if(VisuMZ[_0x451604(0x38e)][_0x451604(0x308)]['includes'](_0x12f72d[_0x451604(0x1df)]()))return;_0x12f72d=_0x12f72d[_0x451604(0x33f)](/\\I\[(\d+)\]/gi,''),_0x12f72d=_0x12f72d[_0x451604(0x33f)](/\x1bI\[(\d+)\]/gi,'');if(_0x12f72d[_0x451604(0x3b2)]<=0x0)return;if(_0x12f72d[_0x451604(0x28c)](/-----/i))return;_0x5680dc['push'](_0x12f72d);},SceneManager[_0x43f6c5(0x3d0)]=function(){const _0x28adbd=_0x43f6c5;return this[_0x28adbd(0x2dd)]&&this[_0x28adbd(0x2dd)][_0x28adbd(0x378)]===Scene_Battle;},SceneManager[_0x43f6c5(0x2a4)]=function(){const _0x37c246=_0x43f6c5;return this[_0x37c246(0x2dd)]&&this[_0x37c246(0x2dd)][_0x37c246(0x378)]===Scene_Map;},VisuMZ['MessageCore'][_0x43f6c5(0x263)]=TextManager[_0x43f6c5(0x281)],TextManager[_0x43f6c5(0x281)]=function(_0x24d8bc){const _0x448500=_0x43f6c5,_0x2c7107=[_0x448500(0x2bc),'emerge',_0x448500(0x36c),_0x448500(0x2f2),_0x448500(0x3ad),_0x448500(0x363),_0x448500(0x362),_0x448500(0x3a7),_0x448500(0x31f),'obtainItem'];let _0x5d625a=VisuMZ[_0x448500(0x38e)][_0x448500(0x263)][_0x448500(0x376)](this,_0x24d8bc);return _0x2c7107[_0x448500(0x2e7)](_0x24d8bc)&&(_0x5d625a=_0x448500(0x286)+_0x5d625a),_0x5d625a;},ConfigManager[_0x43f6c5(0x3d6)]=VisuMZ['MessageCore'][_0x43f6c5(0x2be)][_0x43f6c5(0x201)][_0x43f6c5(0x3cf)],VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x38f)]=ConfigManager[_0x43f6c5(0x34d)],ConfigManager[_0x43f6c5(0x34d)]=function(){const _0x2b2e87=_0x43f6c5,_0x2573e8=VisuMZ[_0x2b2e87(0x38e)][_0x2b2e87(0x38f)][_0x2b2e87(0x376)](this);return _0x2573e8['textSpeed']=this[_0x2b2e87(0x3d6)],_0x2573e8;},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x207)]=ConfigManager[_0x43f6c5(0x2c9)],ConfigManager[_0x43f6c5(0x2c9)]=function(_0x2fa20b){const _0x53a9a5=_0x43f6c5;VisuMZ[_0x53a9a5(0x38e)][_0x53a9a5(0x207)][_0x53a9a5(0x376)](this,_0x2fa20b),'textSpeed'in _0x2fa20b?this[_0x53a9a5(0x3d6)]=Number(_0x2fa20b[_0x53a9a5(0x3d6)])[_0x53a9a5(0x294)](0x1,0xb):this[_0x53a9a5(0x3d6)]=VisuMZ[_0x53a9a5(0x38e)][_0x53a9a5(0x2be)][_0x53a9a5(0x201)][_0x53a9a5(0x3cf)];},TextManager[_0x43f6c5(0x3ca)]=VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2be)]['TextSpeed'][_0x43f6c5(0x1e1)],TextManager[_0x43f6c5(0x1dd)]=VisuMZ['MessageCore']['Settings'][_0x43f6c5(0x201)][_0x43f6c5(0x3de)],VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x1fe)]=Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x225)],Game_System['prototype'][_0x43f6c5(0x225)]=function(){const _0x2e3d30=_0x43f6c5;VisuMZ['MessageCore'][_0x2e3d30(0x1fe)]['call'](this),this[_0x2e3d30(0x1f5)]();},Game_System['prototype'][_0x43f6c5(0x1f5)]=function(){const _0x23b238=_0x43f6c5,_0x103061=VisuMZ[_0x23b238(0x38e)][_0x23b238(0x2be)][_0x23b238(0x2b7)],_0x30a938=VisuMZ['MessageCore'][_0x23b238(0x2be)][_0x23b238(0x2d1)];this[_0x23b238(0x3e6)]={'messageRows':_0x103061[_0x23b238(0x398)],'messageWidth':_0x103061[_0x23b238(0x3c1)],'messageWordWrap':_0x30a938[_0x23b238(0x29a)],'helpWordWrap':_0x30a938['HelpWindow'],'choiceLineHeight':_0x103061[_0x23b238(0x34e)],'choiceRows':_0x103061[_0x23b238(0x2bd)],'choiceCols':_0x103061['ChoiceWindowMaxCols'],'choiceTextAlign':_0x103061[_0x23b238(0x230)]};},Game_System[_0x43f6c5(0x22e)]['getMessageWindowRows']=function(){const _0x107c47=_0x43f6c5;if(this[_0x107c47(0x3e6)]===undefined)this[_0x107c47(0x1f5)]();if(this[_0x107c47(0x3e6)][_0x107c47(0x3cd)]===undefined)this[_0x107c47(0x1f5)]();return this['_MessageCoreSettings'][_0x107c47(0x3cd)];},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x3a1)]=function(_0x2aab66){const _0xb2b9dc=_0x43f6c5;if(this[_0xb2b9dc(0x3e6)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0xb2b9dc(0x3cd)]===undefined)this[_0xb2b9dc(0x1f5)]();this[_0xb2b9dc(0x3e6)][_0xb2b9dc(0x3cd)]=_0x2aab66||0x1;},Game_System['prototype'][_0x43f6c5(0x26c)]=function(){const _0x5936f7=_0x43f6c5;if(this[_0x5936f7(0x3e6)]===undefined)this[_0x5936f7(0x1f5)]();if(this['_MessageCoreSettings'][_0x5936f7(0x293)]===undefined)this[_0x5936f7(0x1f5)]();return this[_0x5936f7(0x3e6)][_0x5936f7(0x293)];},Game_System[_0x43f6c5(0x22e)]['setMessageWindowWidth']=function(_0x4f804d){const _0x33a985=_0x43f6c5;if(this[_0x33a985(0x3e6)]===undefined)this[_0x33a985(0x1f5)]();if(this[_0x33a985(0x3e6)][_0x33a985(0x293)]===undefined)this[_0x33a985(0x1f5)]();this[_0x33a985(0x3e6)]['messageWidth']=_0x4f804d||0x1;},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x2db)]=function(){const _0x2d6dfd=_0x43f6c5;if(this[_0x2d6dfd(0x3e6)]===undefined)this['initMessageCore']();if(this[_0x2d6dfd(0x3e6)][_0x2d6dfd(0x2cf)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings']['messageWordWrap'];},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x222)]=function(_0x5a3253){const _0x3c7a07=_0x43f6c5;if(this[_0x3c7a07(0x3e6)]===undefined)this[_0x3c7a07(0x1f5)]();if(this['_MessageCoreSettings'][_0x3c7a07(0x2cf)]===undefined)this[_0x3c7a07(0x1f5)]();this['_MessageCoreSettings'][_0x3c7a07(0x2cf)]=_0x5a3253;},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x236)]=function(){const _0x100066=_0x43f6c5;if(this[_0x100066(0x3e6)]===undefined)this['initMessageCore']();if(this[_0x100066(0x3e6)][_0x100066(0x2c4)]===undefined)this['initMessageCore']();return this[_0x100066(0x3e6)][_0x100066(0x2c4)];},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x343)]=function(_0x3ea491){const _0x3b5da7=_0x43f6c5;if(this[_0x3b5da7(0x3e6)]===undefined)this[_0x3b5da7(0x1f5)]();if(this[_0x3b5da7(0x3e6)][_0x3b5da7(0x2c4)]===undefined)this['initMessageCore']();this[_0x3b5da7(0x3e6)]['helpWordWrap']=_0x3ea491;},Game_System['prototype']['getChoiceListLineHeight']=function(){const _0x361ea7=_0x43f6c5;if(this['_MessageCoreSettings']===undefined)this[_0x361ea7(0x1f5)]();if(this[_0x361ea7(0x3e6)][_0x361ea7(0x1f4)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x361ea7(0x1f4)];},Game_System['prototype']['setChoiceListLineHeight']=function(_0x3bf3e8){const _0x2df957=_0x43f6c5;if(this[_0x2df957(0x3e6)]===undefined)this[_0x2df957(0x1f5)]();if(this[_0x2df957(0x3e6)][_0x2df957(0x1f4)]===undefined)this[_0x2df957(0x1f5)]();this[_0x2df957(0x3e6)][_0x2df957(0x1f4)]=_0x3bf3e8||0x1;},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x346)]=function(){const _0x32b66d=_0x43f6c5;if(this['_MessageCoreSettings']===undefined)this[_0x32b66d(0x1f5)]();if(this[_0x32b66d(0x3e6)][_0x32b66d(0x22b)]===undefined)this['initMessageCore']();return this[_0x32b66d(0x3e6)][_0x32b66d(0x22b)];},Game_System['prototype'][_0x43f6c5(0x234)]=function(_0x42d258){const _0x52cb7f=_0x43f6c5;if(this['_MessageCoreSettings']===undefined)this[_0x52cb7f(0x1f5)]();if(this[_0x52cb7f(0x3e6)][_0x52cb7f(0x22b)]===undefined)this['initMessageCore']();this[_0x52cb7f(0x3e6)]['choiceRows']=_0x42d258||0x1;},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x36b)]=function(){const _0x344917=_0x43f6c5;if(this[_0x344917(0x3e6)]===undefined)this[_0x344917(0x1f5)]();if(this['_MessageCoreSettings'][_0x344917(0x32e)]===undefined)this[_0x344917(0x1f5)]();return this['_MessageCoreSettings'][_0x344917(0x32e)];},Game_System[_0x43f6c5(0x22e)]['setChoiceListMaxColumns']=function(_0x3f848d){const _0x305019=_0x43f6c5;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceCols']===undefined)this[_0x305019(0x1f5)]();this[_0x305019(0x3e6)][_0x305019(0x32e)]=_0x3f848d||0x1;},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x371)]=function(){const _0x1b9446=_0x43f6c5;if(this[_0x1b9446(0x3e6)]===undefined)this['initMessageCore']();if(this[_0x1b9446(0x3e6)][_0x1b9446(0x279)]===undefined)this[_0x1b9446(0x1f5)]();return this[_0x1b9446(0x3e6)]['choiceTextAlign'];},Game_System[_0x43f6c5(0x22e)][_0x43f6c5(0x3a0)]=function(_0x25eb36){const _0x284691=_0x43f6c5;if(this[_0x284691(0x3e6)]===undefined)this[_0x284691(0x1f5)]();if(this[_0x284691(0x3e6)][_0x284691(0x279)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x284691(0x279)]=_0x25eb36[_0x284691(0x285)]();},VisuMZ['MessageCore'][_0x43f6c5(0x27e)]=Game_Party[_0x43f6c5(0x22e)][_0x43f6c5(0x225)],Game_Party['prototype'][_0x43f6c5(0x225)]=function(){const _0x4dfb31=_0x43f6c5;VisuMZ['MessageCore'][_0x4dfb31(0x27e)]['call'](this),this[_0x4dfb31(0x1f5)]();},Game_Party[_0x43f6c5(0x22e)][_0x43f6c5(0x1f5)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x43f6c5(0x22e)]['getLastGainedItemData']=function(){const _0x3b887e=_0x43f6c5;if(this['_lastGainedItemData']===undefined)this[_0x3b887e(0x1f5)]();return this[_0x3b887e(0x3c3)];},Game_Party[_0x43f6c5(0x22e)][_0x43f6c5(0x374)]=function(_0x540bea,_0x2ecff6){const _0x46fa31=_0x43f6c5;if(this['_lastGainedItemData']===undefined)this[_0x46fa31(0x1f5)]();if(!_0x540bea)return;if(DataManager[_0x46fa31(0x32b)](_0x540bea))this[_0x46fa31(0x3c3)][_0x46fa31(0x25a)]=0x0;else{if(DataManager['isWeapon'](_0x540bea))this['_lastGainedItemData'][_0x46fa31(0x25a)]=0x1;else DataManager['isArmor'](_0x540bea)&&(this['_lastGainedItemData'][_0x46fa31(0x25a)]=0x2);}this[_0x46fa31(0x3c3)]['id']=_0x540bea['id'],this['_lastGainedItemData'][_0x46fa31(0x2cc)]=_0x2ecff6;},VisuMZ['MessageCore'][_0x43f6c5(0x26a)]=Game_Party[_0x43f6c5(0x22e)][_0x43f6c5(0x2c8)],Game_Party[_0x43f6c5(0x22e)]['gainItem']=function(_0x346d88,_0x2c56e8,_0x585318){const _0xd2d9e5=_0x43f6c5;VisuMZ[_0xd2d9e5(0x38e)][_0xd2d9e5(0x26a)][_0xd2d9e5(0x376)](this,_0x346d88,_0x2c56e8,_0x585318),_0x2c56e8>0x0&&this['setLastGainedItemData'](_0x346d88,_0x2c56e8);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x392)]=Game_Map['prototype'][_0x43f6c5(0x225)],Game_Map[_0x43f6c5(0x22e)][_0x43f6c5(0x225)]=function(){const _0x1f5364=_0x43f6c5;VisuMZ[_0x1f5364(0x38e)]['Game_Map_initialize']['call'](this),this[_0x1f5364(0x2ae)]=[];},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2d0)]=Game_Map[_0x43f6c5(0x22e)][_0x43f6c5(0x3b3)],Game_Map['prototype'][_0x43f6c5(0x3b3)]=function(){const _0x489c20=_0x43f6c5;VisuMZ[_0x489c20(0x38e)][_0x489c20(0x2d0)]['call'](this),this['_messageCommonEvents']=[];},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2fa)]=Game_Map['prototype'][_0x43f6c5(0x33d)],Game_Map['prototype'][_0x43f6c5(0x33d)]=function(){const _0x3536bb=_0x43f6c5;VisuMZ['MessageCore'][_0x3536bb(0x2fa)][_0x3536bb(0x376)](this),this[_0x3536bb(0x2ff)]();},Game_Map[_0x43f6c5(0x22e)]['addMessageCommonEvent']=function(_0x43272d){const _0xafbd19=_0x43f6c5;this['_messageCommonEvents']=this[_0xafbd19(0x2ae)]||[];const _0x2b087d=this[_0xafbd19(0x205)][_0xafbd19(0x36d)],_0x152210=new Game_MessageCommonEvent(_0x43272d,_0x2b087d);this[_0xafbd19(0x2ae)][_0xafbd19(0x274)](_0x152210);},Game_Map[_0x43f6c5(0x22e)][_0x43f6c5(0x2ff)]=function(){const _0x3ef6d7=_0x43f6c5;this[_0x3ef6d7(0x2ae)]=this['_messageCommonEvents']||[];for(const _0x67c5d6 of this['_messageCommonEvents']){!_0x67c5d6[_0x3ef6d7(0x205)]?this['_messageCommonEvents'][_0x3ef6d7(0x30b)](_0x67c5d6):_0x67c5d6[_0x3ef6d7(0x2d3)]();}},Game_Interpreter[_0x43f6c5(0x22e)]['command101']=function(_0x389b69){const _0x34092a=_0x43f6c5;if($gameMessage[_0x34092a(0x2b2)]())return![];return this[_0x34092a(0x3d8)](_0x389b69),this[_0x34092a(0x336)](_0x389b69),this[_0x34092a(0x25e)](_0x389b69),this[_0x34092a(0x250)](_0x34092a(0x281)),!![];},Game_Interpreter['prototype']['prepareShowTextCommand']=function(_0x42a19f){const _0x230623=_0x43f6c5;$gameMessage[_0x230623(0x1f6)](_0x42a19f[0x0],_0x42a19f[0x1]),$gameMessage[_0x230623(0x35f)](_0x42a19f[0x2]),$gameMessage[_0x230623(0x30d)](_0x42a19f[0x3]),$gameMessage[_0x230623(0x301)](_0x42a19f[0x4]);},Game_Interpreter[_0x43f6c5(0x22e)][_0x43f6c5(0x336)]=function(_0x434513){const _0x51f0a1=_0x43f6c5;while(this['isContinuePrepareShowTextCommands']()){this[_0x51f0a1(0x1f0)]++;this[_0x51f0a1(0x364)]()[_0x51f0a1(0x1d6)]===0x191&&$gameMessage[_0x51f0a1(0x33c)](this['currentCommand']()[_0x51f0a1(0x23d)][0x0]);if(this[_0x51f0a1(0x217)]())break;}},Game_Interpreter[_0x43f6c5(0x22e)][_0x43f6c5(0x244)]=function(){const _0x12c814=_0x43f6c5;return this['nextEventCode']()===0x65&&$gameSystem[_0x12c814(0x1e4)]()>0x4?!![]:this[_0x12c814(0x298)]()===0x191;},Game_Interpreter['prototype'][_0x43f6c5(0x217)]=function(){const _0xd9d595=_0x43f6c5;return $gameMessage[_0xd9d595(0x275)][_0xd9d595(0x3b2)]>=$gameSystem[_0xd9d595(0x1e4)]()&&this[_0xd9d595(0x298)]()!==0x191;},Game_Interpreter[_0x43f6c5(0x22e)][_0x43f6c5(0x25e)]=function(_0x4593b3){const _0x15a1f5=_0x43f6c5;switch(this[_0x15a1f5(0x298)]()){case 0x66:this[_0x15a1f5(0x1f0)]++,this['setupChoices'](this[_0x15a1f5(0x364)]()[_0x15a1f5(0x23d)]);break;case 0x67:this[_0x15a1f5(0x1f0)]++,this['setupNumInput'](this[_0x15a1f5(0x364)]()['parameters']);break;case 0x68:this['_index']++,this[_0x15a1f5(0x26f)](this[_0x15a1f5(0x364)]()['parameters']);break;}},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x23e)]=Game_Interpreter[_0x43f6c5(0x22e)][_0x43f6c5(0x3c6)],Game_Interpreter[_0x43f6c5(0x22e)][_0x43f6c5(0x3c6)]=function(_0x48ad34){const _0x3b48a5=_0x43f6c5;_0x48ad34=this[_0x3b48a5(0x231)](),VisuMZ['MessageCore'][_0x3b48a5(0x23e)][_0x3b48a5(0x376)](this,_0x48ad34);},Game_Interpreter['prototype'][_0x43f6c5(0x231)]=function(){const _0x3efdd9=_0x43f6c5,_0x193688=this[_0x3efdd9(0x1f0)],_0x1549bd=[];let _0x42d57c=0x0;this[_0x3efdd9(0x1f0)]++;while(this[_0x3efdd9(0x1f0)]<this[_0x3efdd9(0x30e)]['length']){if(this[_0x3efdd9(0x364)]()['indent']===this[_0x3efdd9(0x212)]){if(this[_0x3efdd9(0x364)]()['code']===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x3efdd9(0x364)]()[_0x3efdd9(0x1d6)]===0x66)this[_0x3efdd9(0x321)](_0x42d57c,this[_0x3efdd9(0x364)](),_0x193688),this[_0x3efdd9(0x1f0)]-=0x2;else this['currentCommand']()[_0x3efdd9(0x1d6)]===0x192&&(this[_0x3efdd9(0x364)]()[_0x3efdd9(0x23d)][0x0]=_0x42d57c,_0x42d57c++);}}this[_0x3efdd9(0x1f0)]++;}return this[_0x3efdd9(0x1f0)]=_0x193688,this[_0x3efdd9(0x364)]()[_0x3efdd9(0x23d)];},Game_Interpreter['prototype'][_0x43f6c5(0x321)]=function(_0x27e5cf,_0x4f84d6,_0xc8c350){const _0x46a9dd=_0x43f6c5;this[_0x46a9dd(0x382)](_0x27e5cf,_0x4f84d6,_0xc8c350),this['adjustShowChoiceCancel'](_0x27e5cf,_0x4f84d6,_0xc8c350),this['addExtraShowChoices'](_0x4f84d6,_0xc8c350);},Game_Interpreter[_0x43f6c5(0x22e)][_0x43f6c5(0x382)]=function(_0x9bd02d,_0x388bc5,_0x48e8b2){const _0x140c16=_0x43f6c5;if(_0x388bc5[_0x140c16(0x23d)][0x2]<0x0)return;const _0x31fb35=_0x388bc5[_0x140c16(0x23d)][0x2]+_0x9bd02d;this[_0x140c16(0x30e)][_0x48e8b2][_0x140c16(0x23d)][0x2]=_0x31fb35;},Game_Interpreter[_0x43f6c5(0x22e)]['adjustShowChoiceCancel']=function(_0x39532a,_0x687243,_0x4eda2d){const _0x301175=_0x43f6c5;if(_0x687243['parameters'][0x1]>=0x0){var _0x2fe522=_0x687243[_0x301175(0x23d)][0x1]+_0x39532a;this['_list'][_0x4eda2d]['parameters'][0x1]=_0x2fe522;}else _0x687243[_0x301175(0x23d)][0x1]===-0x2&&(this[_0x301175(0x30e)][_0x4eda2d]['parameters'][0x1]=_0x687243[_0x301175(0x23d)][0x1]);},Game_Interpreter['prototype'][_0x43f6c5(0x37d)]=function(_0x4d9454,_0x5ece52){const _0x2f1bc7=_0x43f6c5;for(const _0x58c716 of _0x4d9454['parameters'][0x0]){this[_0x2f1bc7(0x30e)][_0x5ece52]['parameters'][0x0][_0x2f1bc7(0x274)](_0x58c716);}this[_0x2f1bc7(0x30e)]['splice'](this[_0x2f1bc7(0x1f0)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x49330b=_0x43f6c5;this[_0x49330b(0x225)](...arguments);}Game_MessageCommonEvent[_0x43f6c5(0x22e)][_0x43f6c5(0x225)]=function(_0x1d653c,_0x4cbe9b){this['_commonEventId']=_0x1d653c,this['_eventId']=_0x4cbe9b||0x0,this['refresh']();},Game_MessageCommonEvent[_0x43f6c5(0x22e)][_0x43f6c5(0x3ab)]=function(){const _0x3f9671=_0x43f6c5;return $dataCommonEvents[this[_0x3f9671(0x3ed)]];},Game_MessageCommonEvent['prototype'][_0x43f6c5(0x20f)]=function(){const _0x4d7ee9=_0x43f6c5;return this[_0x4d7ee9(0x3ab)]()['list'];},Game_MessageCommonEvent[_0x43f6c5(0x22e)][_0x43f6c5(0x224)]=function(){const _0x3a1b9e=_0x43f6c5;this['_interpreter']=new Game_Interpreter(),this[_0x3a1b9e(0x205)][_0x3a1b9e(0x322)](this[_0x3a1b9e(0x20f)](),this['_eventId']);},Game_MessageCommonEvent[_0x43f6c5(0x22e)][_0x43f6c5(0x2d3)]=function(){const _0x18726a=_0x43f6c5;this[_0x18726a(0x205)]&&(this[_0x18726a(0x205)][_0x18726a(0x283)]()?this['_interpreter'][_0x18726a(0x2d3)]():this[_0x18726a(0x242)]());},Game_MessageCommonEvent[_0x43f6c5(0x22e)][_0x43f6c5(0x242)]=function(){const _0x36875c=_0x43f6c5;this[_0x36875c(0x205)]=null;},Scene_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x30c)]=function(){const _0x3b1afd=_0x43f6c5,_0x362fe7=Math[_0x3b1afd(0x219)](Graphics['width'],$gameSystem[_0x3b1afd(0x26c)]()),_0xb975c0=$gameSystem[_0x3b1afd(0x1e4)](),_0x59558f=this[_0x3b1afd(0x341)](_0xb975c0,![]),_0x18918e=(Graphics[_0x3b1afd(0x340)]-_0x362fe7)/0x2,_0x316623=0x0;return new Rectangle(_0x18918e,_0x316623,_0x362fe7,_0x59558f);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x35d)]=Scene_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x3da)],Scene_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x3da)]=function(){const _0x1ec9c3=_0x43f6c5;let _0x59f65d=VisuMZ[_0x1ec9c3(0x38e)]['Scene_Options_maxCommands'][_0x1ec9c3(0x376)](this);const _0x19ee3b=VisuMZ[_0x1ec9c3(0x38e)][_0x1ec9c3(0x2be)];if(_0x19ee3b[_0x1ec9c3(0x201)]['AddOption']&&_0x19ee3b[_0x1ec9c3(0x201)][_0x1ec9c3(0x32c)])_0x59f65d++;return _0x59f65d;},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2b1)]=Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x225)],Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x225)]=function(_0x14a200){const _0x32c4e1=_0x43f6c5;this[_0x32c4e1(0x1f5)](_0x14a200),VisuMZ[_0x32c4e1(0x38e)][_0x32c4e1(0x2b1)]['call'](this,_0x14a200);},Window_Base['prototype'][_0x43f6c5(0x1f5)]=function(_0x564d2d){const _0x194804=_0x43f6c5;this['initTextAlignement'](),this[_0x194804(0x278)](),this['registerResetRect'](_0x564d2d);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x203)]=function(){const _0x1e31e4=_0x43f6c5;this[_0x1e31e4(0x39c)](_0x1e31e4(0x304));},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x39c)]=function(_0x1e5286){this['_textAlignment']=_0x1e5286;},Window_Base[_0x43f6c5(0x22e)]['getTextAlignment']=function(){const _0x5d2885=_0x43f6c5;return this[_0x5d2885(0x315)];},VisuMZ[_0x43f6c5(0x38e)]['Window_Base_textSizeEx']=Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x1e6)],Window_Base['prototype'][_0x43f6c5(0x1e6)]=function(_0x193add){const _0x43eec3=_0x43f6c5;return this[_0x43eec3(0x278)](),VisuMZ[_0x43eec3(0x38e)][_0x43eec3(0x347)][_0x43eec3(0x376)](this,_0x193add);},VisuMZ[_0x43f6c5(0x38e)]['Window_Base_processAllText']=Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2b8)],Window_Base['prototype']['processAllText']=function(_0x18f3c5){const _0x2a51bb=_0x43f6c5;VisuMZ[_0x2a51bb(0x38e)]['Window_Base_processAllText'][_0x2a51bb(0x376)](this,_0x18f3c5);if(_0x18f3c5[_0x2a51bb(0x26d)])this[_0x2a51bb(0x39c)](_0x2a51bb(0x304));},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x278)]=function(){const _0x152f64=_0x43f6c5;this[_0x152f64(0x379)](![]);},Window_Base['prototype']['isWordWrapEnabled']=function(){return this['_wordWrap'];},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x379)]=function(_0x7df82f){const _0x469bd8=_0x43f6c5;return this[_0x469bd8(0x1d5)]=_0x7df82f,'';},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2ad)]=function(_0x4af729){const _0x27b475=_0x43f6c5;this[_0x27b475(0x352)]=JsonEx[_0x27b475(0x2af)](_0x4af729);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x367)]=function(){const _0x3f573e=_0x43f6c5;this['contents']['fontFace']=$gameSystem[_0x3f573e(0x31a)](),this['contents'][_0x3f573e(0x2f9)]=$gameSystem[_0x3f573e(0x366)](),this[_0x3f573e(0x38b)]['fontBold']=![],this[_0x3f573e(0x38b)][_0x3f573e(0x20d)]=![],this[_0x3f573e(0x32d)]();},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x32d)]=function(){const _0x19024c=_0x43f6c5;this[_0x19024c(0x2df)](ColorManager[_0x19024c(0x1d1)]()),this[_0x19024c(0x28d)](ColorManager[_0x19024c(0x2c7)]());const _0x268919=VisuMZ[_0x19024c(0x38e)][_0x19024c(0x2be)][_0x19024c(0x2b7)];_0x268919[_0x19024c(0x35b)]===undefined&&(_0x268919[_0x19024c(0x35b)]=0x3),this[_0x19024c(0x38b)]['outlineWidth']=_0x268919['DefaultOutlineWidth'],this['setColorLock'](![]);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x391)]=function(_0x4d1d90){const _0x389b10=_0x43f6c5;this[_0x389b10(0x3c5)]=_0x4d1d90;},Window_Base[_0x43f6c5(0x22e)]['isColorLocked']=function(){return this['_colorLock'];},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x1d3)]=function(){return![];},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x383)]=function(){const _0x510f9d=_0x43f6c5,_0x4604b9=[_0x510f9d(0x3e5),_0x510f9d(0x2f9),_0x510f9d(0x3a3),_0x510f9d(0x20d),_0x510f9d(0x235),_0x510f9d(0x312),_0x510f9d(0x360),_0x510f9d(0x2ab)];let _0x364550={};for(const _0x9ebf2c of _0x4604b9){_0x364550[_0x9ebf2c]=this[_0x510f9d(0x38b)][_0x9ebf2c];}return _0x364550;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x37f)]=function(_0x10b8ad){const _0x479811=_0x43f6c5;for(const _0x3caa19 in _0x10b8ad){this[_0x479811(0x38b)][_0x3caa19]=_0x10b8ad[_0x3caa19];}},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x342)]=Window_Base[_0x43f6c5(0x22e)]['update'],Window_Base['prototype'][_0x43f6c5(0x2d3)]=function(){const _0x55767b=_0x43f6c5;VisuMZ[_0x55767b(0x38e)][_0x55767b(0x342)][_0x55767b(0x376)](this),this[_0x55767b(0x310)]();},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x31c)]=function(){return![];},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x310)]=function(){const _0x2d4421=_0x43f6c5;this[_0x2d4421(0x3cb)]>0x0&&(this[_0x2d4421(0x31c)]()&&(this['x']=this[_0x2d4421(0x313)](this['x'],this['_moveTargetX']),this['y']=this[_0x2d4421(0x313)](this['y'],this[_0x2d4421(0x287)]),this[_0x2d4421(0x29b)]=this[_0x2d4421(0x313)](this[_0x2d4421(0x29b)],this[_0x2d4421(0x35a)]),this['height']=this[_0x2d4421(0x313)](this['height'],this['_moveTargetHeight']),this[_0x2d4421(0x1d4)]()),this[_0x2d4421(0x3cb)]--);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x1d4)]=function(_0x296b51,_0x327bec){const _0x40ddae=_0x43f6c5;!_0x296b51&&(this[_0x40ddae(0x29b)]=Math[_0x40ddae(0x219)](this[_0x40ddae(0x29b)],Graphics[_0x40ddae(0x29b)]),this[_0x40ddae(0x2f6)]=Math[_0x40ddae(0x219)](this[_0x40ddae(0x2f6)],Graphics['height']));if(!_0x327bec){const _0x49aeeb=-(Math[_0x40ddae(0x3ee)](Graphics[_0x40ddae(0x29b)]-Graphics[_0x40ddae(0x340)])/0x2),_0x5973b7=_0x49aeeb+Graphics[_0x40ddae(0x29b)]-this[_0x40ddae(0x29b)],_0xd7b498=-(Math[_0x40ddae(0x3ee)](Graphics['height']-Graphics['boxHeight'])/0x2),_0x35f078=_0xd7b498+Graphics[_0x40ddae(0x2f6)]-this[_0x40ddae(0x2f6)];this['x']=this['x'][_0x40ddae(0x294)](_0x49aeeb,_0x5973b7),this['y']=this['y']['clamp'](_0xd7b498,_0x35f078);}},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x313)]=function(_0x216ca5,_0x51b4d0){const _0x323dce=_0x43f6c5,_0x55039e=this[_0x323dce(0x3cb)],_0x3c8468=this['_wholeMoveDuration'],_0x7b5383=this[_0x323dce(0x259)]((_0x3c8468-_0x55039e)/_0x3c8468),_0x2f48d5=this[_0x323dce(0x259)]((_0x3c8468-_0x55039e+0x1)/_0x3c8468),_0x15585a=(_0x216ca5-_0x51b4d0*_0x7b5383)/(0x1-_0x7b5383);return _0x15585a+(_0x51b4d0-_0x15585a)*_0x2f48d5;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x259)]=function(_0x145383){const _0x3eed7b=_0x43f6c5,_0x5bb466=0x2;switch(this['_moveEasingType']){case 0x0:return _0x145383;case 0x1:return this[_0x3eed7b(0x31d)](_0x145383,_0x5bb466);case 0x2:return this['easeOut'](_0x145383,_0x5bb466);case 0x3:return this[_0x3eed7b(0x280)](_0x145383,_0x5bb466);default:return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x3eed7b(0x313)](_0x145383,this['_moveEasingType']):_0x145383;}},Window_Base[_0x43f6c5(0x22e)]['moveTo']=function(_0x23c63e,_0x4207eb,_0x492581,_0x1d9848,_0x126a63,_0x1f6ef){const _0x411e4d=_0x43f6c5;this[_0x411e4d(0x399)]=_0x23c63e,this[_0x411e4d(0x287)]=_0x4207eb,this[_0x411e4d(0x35a)]=_0x492581||this['width'],this[_0x411e4d(0x2c3)]=_0x1d9848||this[_0x411e4d(0x2f6)],this[_0x411e4d(0x3cb)]=_0x126a63||0x1;if(this[_0x411e4d(0x3cb)]<=0x0)this[_0x411e4d(0x3cb)]=0x1;this[_0x411e4d(0x24b)]=this[_0x411e4d(0x3cb)],this[_0x411e4d(0x20c)]=_0x1f6ef||0x0;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x3df)]=function(_0x512655,_0x28df77,_0x3daa55,_0x7029e2,_0x1d4d17,_0x1580d7){const _0x3117ad=_0x43f6c5;this[_0x3117ad(0x399)]=this['x']+_0x512655,this[_0x3117ad(0x287)]=this['y']+_0x28df77,this['_moveTargetWidth']=this[_0x3117ad(0x29b)]+(_0x3daa55||0x0),this['_moveTargetHeight']=this['height']+(_0x7029e2||0x0),this[_0x3117ad(0x3cb)]=_0x1d4d17||0x1;if(this[_0x3117ad(0x3cb)]<=0x0)this[_0x3117ad(0x3cb)]=0x1;this[_0x3117ad(0x24b)]=this[_0x3117ad(0x3cb)],this['_moveEasingType']=_0x1580d7||0x0;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x3e0)]=function(_0x4b1cb0,_0x35057f){const _0x3ecfd5=_0x43f6c5;this[_0x3ecfd5(0x262)](this[_0x3ecfd5(0x352)]['x'],this[_0x3ecfd5(0x352)]['y'],this[_0x3ecfd5(0x352)][_0x3ecfd5(0x29b)],this[_0x3ecfd5(0x352)][_0x3ecfd5(0x2f6)],_0x4b1cb0,_0x35057f);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x1fd)]=Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2df)],Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2df)]=function(_0x29ad73){const _0x117a68=_0x43f6c5;if(this['isColorLocked']())return;_0x29ad73=_0x29ad73[_0x117a68(0x33f)](/\,/g,''),this[_0x117a68(0x338)]=this['_textColorStack']||[],this[_0x117a68(0x338)][_0x117a68(0x276)](this[_0x117a68(0x38b)]['textColor']),VisuMZ['MessageCore']['Window_Base_changeTextColor']['call'](this,_0x29ad73);},Window_Base[_0x43f6c5(0x22e)]['processPreviousColor']=function(_0x2d37b4){const _0x247eb3=_0x43f6c5;this[_0x247eb3(0x2a3)](_0x2d37b4);if(this['isColorLocked']())return;_0x2d37b4[_0x247eb3(0x26d)]&&(this['_textColorStack']=this[_0x247eb3(0x338)]||[],this[_0x247eb3(0x38b)][_0x247eb3(0x235)]=this[_0x247eb3(0x338)][_0x247eb3(0x1ff)]()||ColorManager[_0x247eb3(0x1d1)]());},Window_Base['prototype'][_0x43f6c5(0x28b)]=function(_0x51c530){const _0x23c2aa=_0x43f6c5;return _0x51c530=this['convertTextMacros'](_0x51c530),_0x51c530=this[_0x23c2aa(0x386)](_0x51c530),_0x51c530=this[_0x23c2aa(0x3d2)](_0x51c530),_0x51c530=this['preConvertEscapeCharacters'](_0x51c530),_0x51c530=this['convertShowChoiceEscapeCodes'](_0x51c530),_0x51c530=this[_0x23c2aa(0x373)](_0x51c530),_0x51c530=this[_0x23c2aa(0x3e8)](_0x51c530),_0x51c530=this[_0x23c2aa(0x369)](_0x51c530),_0x51c530=this[_0x23c2aa(0x25d)](_0x51c530),_0x51c530=this['convertMessageCoreEscapeActions'](_0x51c530),_0x51c530=this[_0x23c2aa(0x290)](_0x51c530),_0x51c530=this[_0x23c2aa(0x2fd)](_0x51c530),_0x51c530=this[_0x23c2aa(0x3d2)](_0x51c530),_0x51c530=this['processAutoColorWords'](_0x51c530),_0x51c530=this[_0x23c2aa(0x37a)](_0x51c530),_0x51c530;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x27a)]=function(_0x170433){const _0x1dfe51=_0x43f6c5;for(const _0x596b00 of VisuMZ[_0x1dfe51(0x38e)]['Settings'][_0x1dfe51(0x332)]){_0x170433['match'](_0x596b00['textCodeCheck'])&&(_0x170433=_0x170433['replace'](_0x596b00['textCodeCheck'],_0x596b00['textCodeResult']['bind'](this)));}return _0x170433;},Window_Base['prototype'][_0x43f6c5(0x386)]=function(_0x5cc0da){const _0x126810=_0x43f6c5;return _0x5cc0da=_0x5cc0da['replace'](/\\/g,'\x1b'),_0x5cc0da=_0x5cc0da[_0x126810(0x33f)](/\x1b\x1b/g,'\x5c'),_0x5cc0da;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x3d2)]=function(_0x36920c){const _0x391163=_0x43f6c5;for(;;){if(_0x36920c[_0x391163(0x28c)](/\\V\[(\d+)\]/gi))_0x36920c=_0x36920c['replace'](/\\V\[(\d+)\]/gi,(_0x4275de,_0xefbb4b)=>this[_0x391163(0x386)](String($gameVariables[_0x391163(0x22a)](parseInt(_0xefbb4b)))));else{if(_0x36920c[_0x391163(0x28c)](/\x1bV\[(\d+)\]/gi))_0x36920c=_0x36920c[_0x391163(0x33f)](/\x1bV\[(\d+)\]/gi,(_0x20a4a1,_0x343dff)=>this[_0x391163(0x386)](String($gameVariables[_0x391163(0x22a)](parseInt(_0x343dff)))));else break;}}return _0x36920c;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x253)]=function(_0x56b6c6){const _0x454828=_0x43f6c5;return this[_0x454828(0x215)](),_0x56b6c6;},Window_Base['prototype'][_0x43f6c5(0x2fd)]=function(_0x53712f){return _0x53712f;},Window_Base[_0x43f6c5(0x22e)]['convertShowChoiceEscapeCodes']=function(_0x5878b4){const _0x4bd255=_0x43f6c5;return _0x5878b4=_0x5878b4['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x5878b4=_0x5878b4[_0x4bd255(0x33f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x5878b4=_0x5878b4[_0x4bd255(0x33f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x5878b4;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x373)]=function(_0x49fcde){const _0xe2e8c3=_0x43f6c5;return _0x49fcde=_0x49fcde[_0xe2e8c3(0x33f)](/<B>/gi,_0xe2e8c3(0x388)),_0x49fcde=_0x49fcde[_0xe2e8c3(0x33f)](/<\/B>/gi,_0xe2e8c3(0x320)),_0x49fcde=_0x49fcde[_0xe2e8c3(0x33f)](/<I>/gi,_0xe2e8c3(0x2f3)),_0x49fcde=_0x49fcde['replace'](/<\/I>/gi,_0xe2e8c3(0x355)),_0x49fcde;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x3e8)]=function(_0x246829){const _0x24448=_0x43f6c5;return _0x246829=_0x246829[_0x24448(0x33f)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x246829=_0x246829[_0x24448(0x33f)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x246829=_0x246829['replace'](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x246829=_0x246829[_0x24448(0x33f)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x246829=_0x246829[_0x24448(0x33f)](/<RIGHT>/gi,_0x24448(0x3b9)),_0x246829=_0x246829['replace'](/<\/RIGHT>/gi,_0x24448(0x2b3)),_0x246829;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x369)]=function(_0x230854){const _0x3413da=_0x43f6c5;return _0x230854=_0x230854[_0x3413da(0x33f)](/<COLORLOCK>/gi,_0x3413da(0x213)),_0x230854=_0x230854['replace'](/<\/COLORLOCK>/gi,_0x3413da(0x241)),_0x230854=_0x230854[_0x3413da(0x33f)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x230854=_0x230854[_0x3413da(0x33f)](/\)\)\)/gi,_0x3413da(0x241)),_0x230854;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x25d)]=function(_0x12ea3a){const _0x1ded70=_0x43f6c5;return _0x12ea3a=_0x12ea3a[_0x1ded70(0x33f)](/\x1bN\[(\d+)\]/gi,(_0x293fd8,_0x32e638)=>this[_0x1ded70(0x365)](parseInt(_0x32e638))),_0x12ea3a=_0x12ea3a[_0x1ded70(0x33f)](/\x1bP\[(\d+)\]/gi,(_0x3f0c9f,_0x2309f9)=>this[_0x1ded70(0x2b0)](parseInt(_0x2309f9))),_0x12ea3a=_0x12ea3a['replace'](/\x1bG/gi,TextManager[_0x1ded70(0x1d8)]),_0x12ea3a;},Window_Base['prototype'][_0x43f6c5(0x272)]=function(_0x449479){const _0x3dc074=_0x43f6c5;for(const _0x5c3440 of VisuMZ[_0x3dc074(0x38e)][_0x3dc074(0x2be)][_0x3dc074(0x2a7)]){_0x449479[_0x3dc074(0x28c)](_0x5c3440['textCodeCheck'])&&(_0x449479=_0x449479[_0x3dc074(0x33f)](_0x5c3440['textCodeCheck'],_0x5c3440[_0x3dc074(0x30a)]),_0x449479=this[_0x3dc074(0x3d2)](_0x449479));}return _0x449479;},Window_Base['prototype']['convertMessageCoreEscapeReplacements']=function(_0x3f5714){const _0x2b0c13=_0x43f6c5;for(const _0xd12be8 of VisuMZ[_0x2b0c13(0x38e)]['Settings'][_0x2b0c13(0x251)]){_0x3f5714[_0x2b0c13(0x28c)](_0xd12be8[_0x2b0c13(0x32a)])&&(_0x3f5714=_0x3f5714[_0x2b0c13(0x33f)](_0xd12be8[_0x2b0c13(0x32a)],_0xd12be8[_0x2b0c13(0x30a)]['bind'](this)),_0x3f5714=this[_0x2b0c13(0x3d2)](_0x3f5714));}return _0x3f5714;},Window_Base[_0x43f6c5(0x22e)]['actorName']=function(_0x53efd2){const _0x5cd713=_0x43f6c5,_0xa17380=_0x53efd2>=0x1?$gameActors[_0x5cd713(0x2e0)](_0x53efd2):null,_0x5fdd9c=_0xa17380?_0xa17380['name']():'',_0x5bd358=Number(VisuMZ[_0x5cd713(0x38e)][_0x5cd713(0x2be)][_0x5cd713(0x3cc)]['Actors']);return this[_0x5cd713(0x1d3)]()&&_0x5bd358!==0x0?_0x5cd713(0x353)['format'](_0x5bd358,_0x5fdd9c):_0x5fdd9c;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2b0)]=function(_0x268cf1){const _0x3b6928=_0x43f6c5,_0x213f91=_0x268cf1>=0x1?$gameParty[_0x3b6928(0x24a)]()[_0x268cf1-0x1]:null,_0x56d632=_0x213f91?_0x213f91[_0x3b6928(0x33e)]():'',_0x24a804=Number(VisuMZ[_0x3b6928(0x38e)][_0x3b6928(0x2be)]['AutoColor'][_0x3b6928(0x345)]);return this[_0x3b6928(0x1d3)]()&&_0x24a804!==0x0?_0x3b6928(0x353)[_0x3b6928(0x370)](_0x24a804,_0x56d632):_0x56d632;},Window_Base[_0x43f6c5(0x22e)]['processAutoColorWords']=function(_0x47cbdd){const _0x9b0b31=_0x43f6c5;return this[_0x9b0b31(0x1d3)]()&&(_0x47cbdd=this['processStoredAutoColorChanges'](_0x47cbdd),_0x47cbdd=this[_0x9b0b31(0x2ca)](_0x47cbdd)),_0x47cbdd;},Window_Base['prototype'][_0x43f6c5(0x243)]=function(_0x3ed597){const _0xd37fc=_0x43f6c5;for(autoColor of VisuMZ[_0xd37fc(0x38e)][_0xd37fc(0x3e7)]){_0x3ed597=_0x3ed597[_0xd37fc(0x33f)](autoColor[0x0],autoColor[0x1]);}return _0x3ed597;},Window_Base[_0x43f6c5(0x22e)]['clearActorNameAutoColor']=function(){const _0x4c6aa1=_0x43f6c5;this[_0x4c6aa1(0x2c2)]=[];},Window_Base['prototype'][_0x43f6c5(0x215)]=function(){const _0x5b4a58=_0x43f6c5;this['clearActorNameAutoColor']();const _0x3d7c30=VisuMZ['MessageCore']['Settings']['AutoColor'],_0x4c7a9d=_0x3d7c30[_0x5b4a58(0x345)];if(_0x4c7a9d<=0x0)return;for(const _0x341f67 of $gameActors[_0x5b4a58(0x2c6)]){if(!_0x341f67)continue;const _0x2f515e=_0x341f67[_0x5b4a58(0x33e)]();if(_0x2f515e['trim']()[_0x5b4a58(0x3b2)]<=0x0)continue;if(/^\d+$/[_0x5b4a58(0x270)](_0x2f515e))continue;if(_0x2f515e[_0x5b4a58(0x28c)](/-----/i))continue;let _0x45bb53=VisuMZ['MessageCore']['ConvertTextAutoColorRegExpFriendly'](_0x2f515e);const _0x403179=new RegExp('\x5cb'+_0x45bb53+'\x5cb','g'),_0x2ea7d3=_0x5b4a58(0x353)[_0x5b4a58(0x370)](_0x4c7a9d,_0x2f515e);this[_0x5b4a58(0x2c2)]['push']([_0x403179,_0x2ea7d3]);}},Window_Base[_0x43f6c5(0x22e)]['processActorNameAutoColorChanges']=function(_0x956bc6){const _0x3ae23f=_0x43f6c5;this[_0x3ae23f(0x2c2)]===undefined&&this['registerActorNameAutoColorChanges']();for(autoColor of this[_0x3ae23f(0x2c2)]){_0x956bc6=_0x956bc6[_0x3ae23f(0x33f)](autoColor[0x0],autoColor[0x1]);}return _0x956bc6;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x273)]=function(_0x38c6a0,_0x248da5,_0x4bd4a8){const _0x5adb8b=_0x43f6c5;if(!_0x38c6a0)return'';const _0x29770a=_0x38c6a0[_0x248da5];let _0x323d0c='';if(_0x29770a&&_0x4bd4a8&&_0x29770a['iconIndex']){const _0x354592=_0x5adb8b(0x1e0);_0x323d0c=_0x354592[_0x5adb8b(0x370)](_0x29770a[_0x5adb8b(0x295)],_0x29770a[_0x5adb8b(0x33e)]);}else _0x29770a?_0x323d0c=_0x29770a[_0x5adb8b(0x33e)]:_0x323d0c='';return this[_0x5adb8b(0x1d3)]()&&(_0x323d0c=this[_0x5adb8b(0x384)](_0x323d0c,_0x38c6a0)),_0x323d0c;},Window_Base['prototype'][_0x43f6c5(0x1ea)]=function(_0x2d63cd){const _0x53b6ca=_0x43f6c5,_0x5b8fb5=$gameParty['getLastGainedItemData']();if(_0x5b8fb5['id']<0x0)return'';let _0x5b8983=null;if(_0x5b8fb5[_0x53b6ca(0x25a)]===0x0)_0x5b8983=$dataItems[_0x5b8fb5['id']];if(_0x5b8fb5[_0x53b6ca(0x25a)]===0x1)_0x5b8983=$dataWeapons[_0x5b8fb5['id']];if(_0x5b8fb5[_0x53b6ca(0x25a)]===0x2)_0x5b8983=$dataArmors[_0x5b8fb5['id']];if(!_0x5b8983)return'';return _0x2d63cd?_0x53b6ca(0x1e0)[_0x53b6ca(0x370)](_0x5b8983['iconIndex'],_0x5b8983[_0x53b6ca(0x33e)]):_0x5b8983[_0x53b6ca(0x33e)];},Window_Base[_0x43f6c5(0x22e)]['lastGainedObjectQuantity']=function(){const _0x9af321=_0x43f6c5,_0x4db101=$gameParty[_0x9af321(0x3db)]();if(_0x4db101['id']<=0x0)return'';return _0x4db101[_0x9af321(0x2cc)];},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x384)]=function(_0xb685c3,_0x113ccc){const _0x548ee8=_0x43f6c5,_0x5b3aa3=VisuMZ[_0x548ee8(0x38e)][_0x548ee8(0x2be)][_0x548ee8(0x3cc)];let _0x4ba06f=0x0;if(_0x113ccc===$dataActors)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x345)];if(_0x113ccc===$dataClasses)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x28a)];if(_0x113ccc===$dataSkills)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x3c9)];if(_0x113ccc===$dataItems)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x328)];if(_0x113ccc===$dataWeapons)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x29f)];if(_0x113ccc===$dataArmors)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x29d)];if(_0x113ccc===$dataEnemies)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x246)];if(_0x113ccc===$dataStates)_0x4ba06f=_0x5b3aa3[_0x548ee8(0x375)];return _0x4ba06f>0x0&&(_0xb685c3='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x548ee8(0x370)](_0x4ba06f,_0xb685c3)),_0xb685c3;},Window_Base['prototype'][_0x43f6c5(0x37a)]=function(_0x42beb9){const _0x150d7a=_0x43f6c5;_0x42beb9=_0x42beb9[_0x150d7a(0x33f)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x14163e,_0x477e77)=>this[_0x150d7a(0x379)](!![])),_0x42beb9=_0x42beb9[_0x150d7a(0x33f)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1057e9,_0x394f9b)=>this[_0x150d7a(0x379)](![])),_0x42beb9=_0x42beb9['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x40fb78,_0x2e2701)=>this[_0x150d7a(0x379)](![]));if(_0x42beb9[_0x150d7a(0x28c)](Window_Message['_autoSizeRegexp']))this['setWordWrap'](![]);else _0x42beb9['match'](Window_Message[_0x150d7a(0x1d2)])&&this[_0x150d7a(0x379)](![]);if(!this[_0x150d7a(0x257)]())return _0x42beb9;if(_0x42beb9[_0x150d7a(0x3b2)]<=0x0)return _0x42beb9;return VisuMZ['MessageCore'][_0x150d7a(0x2be)][_0x150d7a(0x2d1)][_0x150d7a(0x381)]?(_0x42beb9=_0x42beb9['replace'](/[\n\r]+/g,'\x20'),_0x42beb9=_0x42beb9[_0x150d7a(0x33f)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x42beb9=_0x42beb9[_0x150d7a(0x33f)](/[\n\r]+/g,''),_0x42beb9=_0x42beb9[_0x150d7a(0x33f)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x42beb9=this[_0x150d7a(0x3ef)](_0x42beb9),_0x42beb9=_0x42beb9[_0x150d7a(0x3c2)]('\x20')['join'](_0x150d7a(0x27f)),_0x42beb9=_0x42beb9[_0x150d7a(0x33f)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x42beb9=_0x42beb9['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x42beb9;},Window_Base['prototype'][_0x43f6c5(0x3ef)]=function(_0x209c3e){return _0x209c3e;},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x1da)]=Window_Base[_0x43f6c5(0x22e)]['processNewLine'],Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x229)]=function(_0x59b40a){const _0x56f753=_0x43f6c5;VisuMZ[_0x56f753(0x38e)][_0x56f753(0x1da)][_0x56f753(0x376)](this,_0x59b40a),this[_0x56f753(0x22f)](_0x59b40a);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x220)]=Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2e4)],Window_Base['prototype']['processControlCharacter']=function(_0x2af115,_0xb7f94e){const _0x2a7a25=_0x43f6c5;VisuMZ[_0x2a7a25(0x38e)][_0x2a7a25(0x220)][_0x2a7a25(0x376)](this,_0x2af115,_0xb7f94e),_0xb7f94e===_0x2a7a25(0x27f)&&this[_0x2a7a25(0x372)](_0x2af115);},Window_Base['prototype'][_0x43f6c5(0x2f1)]=function(_0x5f39a3){const _0x10f70c=_0x43f6c5;var _0xda649e=/^\<(.*?)\>/[_0x10f70c(0x299)](_0x5f39a3[_0x10f70c(0x2ed)][_0x10f70c(0x2a1)](_0x5f39a3[_0x10f70c(0x3bb)]));return _0xda649e?(_0x5f39a3[_0x10f70c(0x3bb)]+=_0xda649e[0x0][_0x10f70c(0x3b2)],String(_0xda649e[0x0][_0x10f70c(0x2a1)](0x1,_0xda649e[0x0][_0x10f70c(0x3b2)]-0x1))):'';},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x209)]=Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x1d9)],Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x1d9)]=function(_0x16490c,_0xdc16fc){const _0x5c7050=_0x43f6c5;switch(_0x16490c){case'C':_0xdc16fc['drawing']?VisuMZ['MessageCore'][_0x5c7050(0x209)][_0x5c7050(0x376)](this,_0x16490c,_0xdc16fc):this[_0x5c7050(0x2a3)](_0xdc16fc);break;case'I':case'{':case'}':VisuMZ[_0x5c7050(0x38e)][_0x5c7050(0x209)][_0x5c7050(0x376)](this,_0x16490c,_0xdc16fc);break;case'FS':this['processFsTextCode'](_0xdc16fc);break;case'PX':this[_0x5c7050(0x2c0)](_0xdc16fc);break;case'PY':this['processPyTextCode'](_0xdc16fc);break;case _0x5c7050(0x318):this[_0x5c7050(0x1d7)](this[_0x5c7050(0x2a3)](_0xdc16fc));break;case _0x5c7050(0x2ec):this[_0x5c7050(0x324)](_0xdc16fc);break;case _0x5c7050(0x2f8):this[_0x5c7050(0x21f)](_0xdc16fc);break;case'COMMONEVENT':this[_0x5c7050(0x35e)](_0xdc16fc);break;case _0x5c7050(0x1fa):this[_0x5c7050(0x3d5)](this[_0x5c7050(0x2a3)](_0xdc16fc));break;case _0x5c7050(0x23a):this[_0x5c7050(0x24e)](_0xdc16fc);break;case _0x5c7050(0x3ae):this[_0x5c7050(0x31e)](_0xdc16fc);break;case _0x5c7050(0x2bb):this[_0x5c7050(0x223)](_0xdc16fc);break;case _0x5c7050(0x23b):this['processCustomWait'](_0xdc16fc);break;case _0x5c7050(0x3bf):this[_0x5c7050(0x372)](_0xdc16fc);break;default:this[_0x5c7050(0x3b6)](_0x16490c,_0xdc16fc);}},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x3b6)]=function(_0x3fb0eb,_0x359682){const _0x1d260c=_0x43f6c5;for(const _0xb678cf of VisuMZ[_0x1d260c(0x38e)][_0x1d260c(0x2be)][_0x1d260c(0x2a7)]){if(_0xb678cf[_0x1d260c(0x1ec)]===_0x3fb0eb){if(_0xb678cf[_0x1d260c(0x3ec)]==='')this[_0x1d260c(0x2a3)](_0x359682);_0xb678cf['ActionJS'][_0x1d260c(0x376)](this,_0x359682);if(this[_0x1d260c(0x378)]===Window_Message){const _0x3f6e9f=_0xb678cf[_0x1d260c(0x349)]||0x0;if(_0x3f6e9f>0x0)this[_0x1d260c(0x2d8)](_0x3f6e9f);}}}},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x21a)]=function(){const _0x496847=_0x43f6c5;this['contents']['fontSize']+=VisuMZ['MessageCore'][_0x496847(0x2be)][_0x496847(0x2b7)][_0x496847(0x30f)],this[_0x496847(0x38b)]['fontSize']=Math['min'](this[_0x496847(0x38b)]['fontSize'],VisuMZ[_0x496847(0x38e)]['Settings'][_0x496847(0x2b7)][_0x496847(0x356)]);},Window_Base['prototype'][_0x43f6c5(0x2c5)]=function(){const _0xdf0c3b=_0x43f6c5;this[_0xdf0c3b(0x38b)][_0xdf0c3b(0x2f9)]-=VisuMZ[_0xdf0c3b(0x38e)][_0xdf0c3b(0x2be)][_0xdf0c3b(0x2b7)]['FontChangeValue'],this['contents']['fontSize']=Math[_0xdf0c3b(0x335)](this['contents'][_0xdf0c3b(0x2f9)],VisuMZ[_0xdf0c3b(0x38e)][_0xdf0c3b(0x2be)]['General'][_0xdf0c3b(0x3be)]);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x39a)]=function(_0x53b3bb){const _0x36d93e=_0x43f6c5,_0x3a8d1c=this[_0x36d93e(0x2a3)](_0x53b3bb);this[_0x36d93e(0x38b)][_0x36d93e(0x2f9)]=_0x3a8d1c[_0x36d93e(0x294)](VisuMZ['MessageCore'][_0x36d93e(0x2be)][_0x36d93e(0x2b7)][_0x36d93e(0x3be)],VisuMZ['MessageCore'][_0x36d93e(0x2be)][_0x36d93e(0x2b7)][_0x36d93e(0x356)]);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x34f)]=function(_0x49ed7b){const _0x191c15=_0x43f6c5;let _0xb71952=this['contents'][_0x191c15(0x2f9)];const _0x228d7a=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x2d0ffe=_0x228d7a[_0x191c15(0x299)](_0x49ed7b);if(!_0x2d0ffe)break;const _0xe4bf=String(_0x2d0ffe[0x1])[_0x191c15(0x1df)]();if(_0xe4bf==='{')this['makeFontBigger']();else{if(_0xe4bf==='}')this[_0x191c15(0x2c5)]();else _0xe4bf==='FS'&&(this[_0x191c15(0x38b)][_0x191c15(0x2f9)]=parseInt(_0x2d0ffe[0x3])[_0x191c15(0x294)](VisuMZ[_0x191c15(0x38e)]['Settings'][_0x191c15(0x2b7)][_0x191c15(0x3be)],VisuMZ[_0x191c15(0x38e)][_0x191c15(0x2be)][_0x191c15(0x2b7)][_0x191c15(0x356)]));}this[_0x191c15(0x38b)]['fontSize']>_0xb71952&&(_0xb71952=this['contents']['fontSize']);}return _0xb71952;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2c0)]=function(_0x4a8758){const _0xd39d92=_0x43f6c5;_0x4a8758['x']=this['obtainEscapeParam'](_0x4a8758),VisuMZ[_0xd39d92(0x38e)][_0xd39d92(0x2be)][_0xd39d92(0x2b7)][_0xd39d92(0x288)]&&(_0x4a8758['x']+=_0x4a8758[_0xd39d92(0x3e1)]);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2a6)]=function(_0x5c10cc){const _0x4a4f60=_0x43f6c5;_0x5c10cc['y']=this['obtainEscapeParam'](_0x5c10cc),VisuMZ[_0x4a4f60(0x38e)][_0x4a4f60(0x2be)][_0x4a4f60(0x2b7)][_0x4a4f60(0x288)]&&(_0x5c10cc['y']+=_0x5c10cc['startY']);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x1d7)]=function(_0x52913d){const _0x547946=_0x43f6c5;this[_0x547946(0x38b)][_0x547946(0x3a3)]=!!_0x52913d;},Window_Base['prototype']['processFontChangeItalic']=function(_0x34f8d8){this['contents']['fontItalic']=!!_0x34f8d8;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x223)]=function(_0x3b02c1){const _0xe7c1fc=_0x43f6c5,_0x48534a=this[_0xe7c1fc(0x2a3)](_0x3b02c1);if(!_0x3b02c1[_0xe7c1fc(0x26d)])return;switch(_0x48534a){case 0x0:this[_0xe7c1fc(0x39c)](_0xe7c1fc(0x304));return;case 0x1:this['setTextAlignment'](_0xe7c1fc(0x2f4));break;case 0x2:this[_0xe7c1fc(0x39c)](_0xe7c1fc(0x31b));break;case 0x3:this[_0xe7c1fc(0x39c)](_0xe7c1fc(0x26e));break;}this['processTextAlignmentX'](_0x3b02c1);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x22f)]=function(_0x24f24e){const _0x57b416=_0x43f6c5;if(!_0x24f24e[_0x57b416(0x26d)])return;if(_0x24f24e[_0x57b416(0x397)])return;if(this[_0x57b416(0x2ee)]()===_0x57b416(0x304))return;let _0x5b0c85=_0x24f24e['text']['indexOf'](_0x57b416(0x282),_0x24f24e[_0x57b416(0x3bb)]+0x1),_0x3eb849=_0x24f24e[_0x57b416(0x2ed)]['indexOf']('\x0a',_0x24f24e[_0x57b416(0x3bb)]+0x1);if(_0x5b0c85<0x0)_0x5b0c85=_0x24f24e['text'][_0x57b416(0x3b2)]+0x1;if(_0x3eb849>0x0)_0x5b0c85=Math[_0x57b416(0x219)](_0x5b0c85,_0x3eb849);const _0x3aa2d7=_0x24f24e[_0x57b416(0x2ed)][_0x57b416(0x3a2)](_0x24f24e['index'],_0x5b0c85),_0xef3b2e=this['textSizeExTextAlignment'](_0x3aa2d7)['width'],_0x283a35=_0x24f24e[_0x57b416(0x29b)]||this['innerWidth'],_0x1383b1=this['constructor']===Window_Message&&$gameMessage[_0x57b416(0x245)]()!=='';switch(this[_0x57b416(0x2ee)]()){case _0x57b416(0x2f4):_0x24f24e['x']=_0x24f24e['startX'];break;case'center':_0x24f24e['x']=_0x24f24e[_0x57b416(0x3e1)],_0x24f24e['x']+=Math[_0x57b416(0x3ee)]((_0x283a35-_0xef3b2e)/0x2);_0x1383b1&&(_0x24f24e['x']-=_0x24f24e[_0x57b416(0x3e1)]/0x2);break;case _0x57b416(0x26e):_0x24f24e['x']=_0x283a35-_0xef3b2e+_0x24f24e[_0x57b416(0x3e1)];_0x1383b1&&(_0x24f24e['x']-=_0x24f24e[_0x57b416(0x3e1)]);break;}},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x29c)]=function(_0x544db2){const _0x5ccded=_0x43f6c5;_0x544db2=_0x544db2[_0x5ccded(0x33f)](/\x1b!/g,''),_0x544db2=_0x544db2[_0x5ccded(0x33f)](/\x1b\|/g,''),_0x544db2=_0x544db2[_0x5ccded(0x33f)](/\x1b\./g,'');const _0x2259b7=this[_0x5ccded(0x292)](_0x544db2,0x0,0x0,0x0),_0x118a95=this['getPreservedFontSettings']();return _0x2259b7['drawing']=![],this[_0x5ccded(0x2b8)](_0x2259b7),this[_0x5ccded(0x37f)](_0x118a95),{'width':_0x2259b7[_0x5ccded(0x2c1)],'height':_0x2259b7[_0x5ccded(0x1db)]};},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x372)]=function(_0x58a058){const _0x1bf859=_0x43f6c5,_0xeb06b8=(_0x58a058[_0x1bf859(0x397)]?-0x1:0x1)*this[_0x1bf859(0x326)]('\x20');_0x58a058['x']+=_0xeb06b8;if(this[_0x1bf859(0x2a3)](_0x58a058)>0x0)_0x58a058['x']+=_0xeb06b8;if(_0x58a058[_0x1bf859(0x397)])return;let _0x2ec465=_0x58a058[_0x1bf859(0x2ed)][_0x1bf859(0x2e2)](_0x1bf859(0x27f),_0x58a058[_0x1bf859(0x3bb)]+0x1),_0x443021=_0x58a058[_0x1bf859(0x2ed)][_0x1bf859(0x2e2)]('\x0a',_0x58a058['index']+0x1);if(_0x2ec465<0x0)_0x2ec465=_0x58a058[_0x1bf859(0x2ed)][_0x1bf859(0x3b2)]+0x1;if(_0x443021>0x0)_0x2ec465=Math[_0x1bf859(0x219)](_0x2ec465,_0x443021);const _0x38768d=_0x58a058[_0x1bf859(0x2ed)][_0x1bf859(0x3a2)](_0x58a058[_0x1bf859(0x3bb)],_0x2ec465),_0x395740=this['textSizeExWordWrap'](_0x38768d)[_0x1bf859(0x29b)];let _0x1d1740=_0x58a058['width']||this['innerWidth'];if(this['constructor']===Window_Message){const _0x4b0aad=$gameMessage[_0x1bf859(0x245)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x1d1740-=_0x4b0aad,VisuMZ['MessageCore'][_0x1bf859(0x2be)]['WordWrap'][_0x1bf859(0x21b)]&&(_0x1d1740-=_0x4b0aad);}let _0x29cc0a=![];if(_0x58a058['x']+_0x395740>_0x58a058['startX']+_0x1d1740)_0x29cc0a=!![];if(_0x395740===0x0)_0x29cc0a=!![];_0x29cc0a&&(_0x58a058[_0x1bf859(0x2ed)]=_0x58a058['text'][_0x1bf859(0x2a1)](0x0,_0x58a058[_0x1bf859(0x3bb)])+'\x0a'+_0x58a058['text'][_0x1bf859(0x27b)](_0x58a058[_0x1bf859(0x3bb)]));},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x27d)]=function(_0x36b05b){const _0x308c1d=_0x43f6c5,_0x436c13=this[_0x308c1d(0x292)](_0x36b05b,0x0,0x0,0x0),_0x5b9fbd=this[_0x308c1d(0x383)]();return _0x436c13['drawing']=![],this[_0x308c1d(0x379)](![]),this[_0x308c1d(0x2b8)](_0x436c13),this[_0x308c1d(0x379)](!![]),this[_0x308c1d(0x37f)](_0x5b9fbd),{'width':_0x436c13[_0x308c1d(0x2c1)],'height':_0x436c13[_0x308c1d(0x1db)]};},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x35e)]=function(_0x244659){return this['obtainEscapeParam'](_0x244659);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x24e)]=function(_0x3490a2){const _0x258295=_0x43f6c5,_0x30a154=this[_0x258295(0x2f1)](_0x3490a2)[_0x258295(0x3c2)](',');if(!_0x3490a2[_0x258295(0x26d)])return;const _0x177380=_0x30a154[0x0][_0x258295(0x2eb)](),_0x5dd08c=_0x30a154[0x1]||0x0,_0x11fd62=_0x30a154[0x2]||0x0,_0x5dc7cc=ImageManager[_0x258295(0x3ac)](_0x177380),_0x9d768f=this[_0x258295(0x38b)][_0x258295(0x2ab)];_0x5dc7cc['addLoadListener'](this[_0x258295(0x2a9)][_0x258295(0x3ea)](this,_0x5dc7cc,_0x3490a2['x'],_0x3490a2['y'],_0x5dd08c,_0x11fd62,_0x9d768f));},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2a9)]=function(_0x45196c,_0x105733,_0x3610e6,_0x4bd693,_0x6eec5,_0x11bcfe){const _0xf42c5d=_0x43f6c5;_0x4bd693=_0x4bd693||_0x45196c['width'],_0x6eec5=_0x6eec5||_0x45196c[_0xf42c5d(0x2f6)],this[_0xf42c5d(0x3d3)][_0xf42c5d(0x2ab)]=_0x11bcfe,this[_0xf42c5d(0x3d3)][_0xf42c5d(0x3ba)](_0x45196c,0x0,0x0,_0x45196c[_0xf42c5d(0x29b)],_0x45196c[_0xf42c5d(0x2f6)],_0x105733,_0x3610e6,_0x4bd693,_0x6eec5),this[_0xf42c5d(0x3d3)][_0xf42c5d(0x2ab)]=0xff;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x324)]=function(_0x40a528){const _0x230b47=_0x43f6c5,_0x29255e=this['obtainEscapeString'](_0x40a528)['split'](',');if(!_0x40a528[_0x230b47(0x26d)])return;const _0x132834=_0x29255e[0x0][_0x230b47(0x2eb)](),_0x484b07=ImageManager['loadPicture'](_0x132834),_0x3475e7=JsonEx[_0x230b47(0x2af)](_0x40a528),_0x3a8c96=this[_0x230b47(0x38b)][_0x230b47(0x2ab)];_0x484b07[_0x230b47(0x221)](this['drawBackCenteredPicture'][_0x230b47(0x3ea)](this,_0x484b07,_0x3475e7,_0x3a8c96));},Window_Base[_0x43f6c5(0x22e)]['drawBackCenteredPicture']=function(_0x2888ce,_0x47231f,_0x3c934f){const _0x59cbf0=_0x43f6c5,_0x51a025=_0x47231f[_0x59cbf0(0x29b)]||this['innerWidth'],_0x4e153c=this[_0x59cbf0(0x1f0)]!==undefined?this[_0x59cbf0(0x254)]():this['innerHeight'],_0x49c576=_0x51a025/_0x2888ce['width'],_0xc86859=_0x4e153c/_0x2888ce[_0x59cbf0(0x2f6)],_0x3d5fb2=Math[_0x59cbf0(0x219)](_0x49c576,_0xc86859,0x1),_0x113510=this[_0x59cbf0(0x1f0)]!==undefined?(this[_0x59cbf0(0x206)](0x0)[_0x59cbf0(0x2f6)]-this[_0x59cbf0(0x2d5)]())/0x2:0x0,_0x4c68c1=_0x2888ce['width']*_0x3d5fb2,_0x3bc3a3=_0x2888ce[_0x59cbf0(0x2f6)]*_0x3d5fb2,_0x19eda1=Math[_0x59cbf0(0x3ee)]((_0x51a025-_0x4c68c1)/0x2)+_0x47231f[_0x59cbf0(0x3e1)],_0x579ac2=Math[_0x59cbf0(0x3ee)]((_0x4e153c-_0x3bc3a3)/0x2)+_0x47231f[_0x59cbf0(0x28f)]-_0x113510*0x2;this[_0x59cbf0(0x3d3)][_0x59cbf0(0x2ab)]=_0x3c934f,this['contentsBack'][_0x59cbf0(0x3ba)](_0x2888ce,0x0,0x0,_0x2888ce['width'],_0x2888ce[_0x59cbf0(0x2f6)],_0x19eda1,_0x579ac2,_0x4c68c1,_0x3bc3a3),this['contentsBack']['paintOpacity']=0xff;},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x21f)]=function(_0x536817){const _0x44bffc=_0x43f6c5,_0x520990=this[_0x44bffc(0x2a3)](_0x536817);if(_0x536817['drawing'])this[_0x44bffc(0x391)](_0x520990>0x0);},Window_Base[_0x43f6c5(0x22e)][_0x43f6c5(0x2e6)]=function(_0x397754){const _0x174c3c=_0x43f6c5,_0x52199a=this[_0x174c3c(0x2a3)](_0x397754);this[_0x174c3c(0x378)]===Window_Message&&_0x397754[_0x174c3c(0x26d)]&&this[_0x174c3c(0x2d4)](_0x52199a);},Window_Help[_0x43f6c5(0x22e)][_0x43f6c5(0x278)]=function(){this['setWordWrap']($gameSystem['isHelpWindowWordWrap']());},Window_Help['prototype'][_0x43f6c5(0x1d3)]=function(){return!![];},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x333)]=Window_Help[_0x43f6c5(0x22e)][_0x43f6c5(0x224)],Window_Help[_0x43f6c5(0x22e)]['refresh']=function(){const _0x2e8e6a=_0x43f6c5;this[_0x2e8e6a(0x3c4)](),VisuMZ[_0x2e8e6a(0x38e)][_0x2e8e6a(0x333)][_0x2e8e6a(0x376)](this),this['resetWordWrap']();},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x354)]=Window_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x260)],Window_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x260)]=function(){const _0x8d1ba3=_0x43f6c5;VisuMZ[_0x8d1ba3(0x38e)][_0x8d1ba3(0x354)][_0x8d1ba3(0x376)](this),this['addMessageCoreCommands']();},Window_Options['prototype'][_0x43f6c5(0x22c)]=function(){const _0xb4a53a=_0x43f6c5;VisuMZ[_0xb4a53a(0x38e)][_0xb4a53a(0x2be)][_0xb4a53a(0x201)][_0xb4a53a(0x323)]&&this[_0xb4a53a(0x1f9)]();},Window_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x1f9)]=function(){const _0x2ef963=_0x43f6c5,_0x32446f=TextManager[_0x2ef963(0x3ca)],_0x26657b='textSpeed';this[_0x2ef963(0x202)](_0x32446f,_0x26657b);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x3e9)]=Window_Options[_0x43f6c5(0x22e)]['statusText'],Window_Options['prototype'][_0x43f6c5(0x385)]=function(_0x40b99f){const _0x33088a=_0x43f6c5,_0x3c97c1=this[_0x33088a(0x268)](_0x40b99f);if(_0x3c97c1===_0x33088a(0x3d6))return this[_0x33088a(0x2ef)]();return VisuMZ[_0x33088a(0x38e)][_0x33088a(0x3e9)][_0x33088a(0x376)](this,_0x40b99f);},VisuMZ[_0x43f6c5(0x38e)]['Window_Options_isVolumeSymbol']=Window_Options['prototype'][_0x43f6c5(0x247)],Window_Options['prototype'][_0x43f6c5(0x247)]=function(_0x35537d){const _0x9b006f=_0x43f6c5;if(_0x35537d===_0x9b006f(0x3d6))return!![];return VisuMZ['MessageCore'][_0x9b006f(0x2a5)][_0x9b006f(0x376)](this,_0x35537d);},Window_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x2ef)]=function(){const _0x1b6bfa=_0x43f6c5,_0x43e8b4=this[_0x1b6bfa(0x25c)](_0x1b6bfa(0x3d6));return _0x43e8b4>0xa?TextManager['instantTextSpeed']:_0x43e8b4;},VisuMZ['MessageCore']['Window_Options_changeVolume']=Window_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x1d0)],Window_Options[_0x43f6c5(0x22e)][_0x43f6c5(0x1d0)]=function(_0x38b786,_0x458158,_0x500a3c){const _0x2b1dcb=_0x43f6c5;if(_0x38b786===_0x2b1dcb(0x3d6))return this[_0x2b1dcb(0x240)](_0x38b786,_0x458158,_0x500a3c);VisuMZ['MessageCore'][_0x2b1dcb(0x297)]['call'](this,_0x38b786,_0x458158,_0x500a3c);},Window_Options['prototype'][_0x43f6c5(0x240)]=function(_0x2e15f7,_0x4e58ac,_0x5a9f01){const _0x33e859=_0x43f6c5,_0x4bd657=this[_0x33e859(0x25c)](_0x2e15f7),_0x5a3feb=0x1,_0x35593a=_0x4bd657+(_0x4e58ac?_0x5a3feb:-_0x5a3feb);_0x35593a>0xb&&_0x5a9f01?this[_0x33e859(0x37c)](_0x2e15f7,0x1):this[_0x33e859(0x37c)](_0x2e15f7,_0x35593a[_0x33e859(0x294)](0x1,0xb));},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x1f3)]=function(){const _0x20d1ca=_0x43f6c5;Window_Base['prototype'][_0x20d1ca(0x1f3)][_0x20d1ca(0x376)](this),VisuMZ[_0x20d1ca(0x38e)][_0x20d1ca(0x2be)][_0x20d1ca(0x2b7)][_0x20d1ca(0x3a9)]&&this[_0x20d1ca(0x3f2)]();},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x3f2)]=function(){const _0x1de18e=_0x43f6c5;this[_0x1de18e(0x296)]['x']=Math['round'](this[_0x1de18e(0x29b)]/0x2),this[_0x1de18e(0x296)][_0x1de18e(0x27c)]['x']=0.5,this[_0x1de18e(0x296)][_0x1de18e(0x1e2)]['x']=Graphics[_0x1de18e(0x29b)];},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x3b8)]=Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x305)],Window_Message[_0x43f6c5(0x22e)]['clearFlags']=function(){const _0x5cde1d=_0x43f6c5;VisuMZ['MessageCore'][_0x5cde1d(0x3b8)][_0x5cde1d(0x376)](this),this[_0x5cde1d(0x3c4)](),this[_0x5cde1d(0x278)](),this[_0x5cde1d(0x391)](![]),this[_0x5cde1d(0x39c)](_0x5cde1d(0x304)),this['setTextDelay'](VisuMZ[_0x5cde1d(0x38e)][_0x5cde1d(0x2be)][_0x5cde1d(0x2b7)][_0x5cde1d(0x265)]);},Window_Message[_0x43f6c5(0x22e)]['resetWordWrap']=function(){const _0x2787ff=_0x43f6c5;this[_0x2787ff(0x379)]($gameSystem[_0x2787ff(0x2db)]());},Window_Message[_0x43f6c5(0x22e)]['isAutoColorAffected']=function(){return!![];},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x2b4)]=function(_0x4ca752){const _0x572166=_0x43f6c5,_0x1454db=0xb-ConfigManager[_0x572166(0x3d6)];_0x4ca752=Math[_0x572166(0x33b)](_0x4ca752*_0x1454db),this[_0x572166(0x3f0)]=_0x4ca752,this[_0x572166(0x36a)]=_0x4ca752;},VisuMZ['MessageCore']['Window_Message_isTriggered']=Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x393)],Window_Message['prototype'][_0x43f6c5(0x393)]=function(){const _0x37d75c=_0x43f6c5;return VisuMZ[_0x37d75c(0x38e)][_0x37d75c(0x389)]['call'](this)||Input[_0x37d75c(0x2ba)](VisuMZ[_0x37d75c(0x38e)][_0x37d75c(0x2be)]['General'][_0x37d75c(0x261)]);},VisuMZ['MessageCore'][_0x43f6c5(0x316)]=Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x239)],Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x239)]=function(){const _0x953ab9=_0x43f6c5;let _0xeac516=this['y'];VisuMZ[_0x953ab9(0x38e)]['Window_Message_updatePlacement'][_0x953ab9(0x376)](this);if(this['_autoPositionTarget'])this['y']=_0xeac516;this['clampPlacementPosition']();},VisuMZ['MessageCore'][_0x43f6c5(0x2e9)]=Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x227)],Window_Message['prototype']['newPage']=function(_0x30d566){const _0x466c02=_0x43f6c5;this['onNewPageMessageCore'](_0x30d566),VisuMZ[_0x466c02(0x38e)]['Window_Message_newPage'][_0x466c02(0x376)](this,_0x30d566),this[_0x466c02(0x37e)]();},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x2e3)]=function(_0x59681d){const _0x5675ae=_0x43f6c5;this[_0x5675ae(0x3eb)](_0x59681d),this['updateDimensions']();},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2fe)]=Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x2de)],Window_Message[_0x43f6c5(0x22e)]['terminateMessage']=function(){const _0x28912a=_0x43f6c5;VisuMZ[_0x28912a(0x38e)][_0x28912a(0x2fe)]['call'](this),this['clearFlags']();if(this[_0x28912a(0x302)])this[_0x28912a(0x252)]();},Window_Message[_0x43f6c5(0x22e)]['updateDimensions']=function(){const _0x39a2fe=_0x43f6c5;this['width']=$gameSystem[_0x39a2fe(0x26c)](),this[_0x39a2fe(0x29b)]=Math[_0x39a2fe(0x219)](Graphics[_0x39a2fe(0x29b)],this[_0x39a2fe(0x29b)]);const _0x1adb91=$gameSystem['getMessageWindowRows']();this[_0x39a2fe(0x2f6)]=SceneManager[_0x39a2fe(0x2dd)][_0x39a2fe(0x341)](_0x1adb91,![]),this[_0x39a2fe(0x2f6)]=Math[_0x39a2fe(0x219)](Graphics[_0x39a2fe(0x2f6)],this[_0x39a2fe(0x2f6)]);if($gameTemp[_0x39a2fe(0x34a)])this[_0x39a2fe(0x211)]();},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x211)]=function(){const _0x3915e=_0x43f6c5;this['x']=(Graphics[_0x3915e(0x340)]-this[_0x3915e(0x29b)])/0x2,$gameTemp[_0x3915e(0x34a)]=undefined,this[_0x3915e(0x1d4)]();},Window_Message[_0x43f6c5(0x22e)]['updateMove']=function(){const _0x2f1c7e=_0x43f6c5,_0x450e21={'x':this['x'],'y':this['y']};Window_Base[_0x2f1c7e(0x22e)][_0x2f1c7e(0x310)][_0x2f1c7e(0x376)](this),this[_0x2f1c7e(0x1dc)](_0x450e21);},Window_Message[_0x43f6c5(0x22e)]['canMove']=function(){return!![];},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x1dc)]=function(_0x5965fd){const _0x3fa4e8=_0x43f6c5;this[_0x3fa4e8(0x1ee)]&&(this[_0x3fa4e8(0x1ee)]['x']+=this['x']-_0x5965fd['x'],this['_nameBoxWindow']['y']+=this['y']-_0x5965fd['y']);},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x3e0)]=function(_0x5c5ddf,_0x496a0b){const _0x159eae=_0x43f6c5;this[_0x159eae(0x262)](this[_0x159eae(0x352)]['x'],this['_positionType']*(Graphics[_0x159eae(0x395)]-this[_0x159eae(0x2f6)])/0x2,this[_0x159eae(0x352)][_0x159eae(0x29b)],this[_0x159eae(0x352)][_0x159eae(0x2f6)],_0x5c5ddf,_0x496a0b);},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x35e)]=function(_0x284664){const _0xea475c=_0x43f6c5,_0x514ad2=Window_Base[_0xea475c(0x22e)][_0xea475c(0x35e)][_0xea475c(0x376)](this,_0x284664);this[_0xea475c(0x2d8)](_0x514ad2);},Window_Message[_0x43f6c5(0x22e)]['launchMessageCommonEvent']=function(_0x458d7b){const _0x3cd39a=_0x43f6c5;if($gameParty['inBattle']()){}else $gameMap[_0x3cd39a(0x3b1)](_0x458d7b);},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x3a6)]=function(_0x5eb81a){const _0x2bf1b3=_0x43f6c5;this[_0x2bf1b3(0x3f0)]--,this[_0x2bf1b3(0x3f0)]<=0x0&&(this[_0x2bf1b3(0x2e5)](_0x5eb81a),Window_Base[_0x2bf1b3(0x22e)][_0x2bf1b3(0x3a6)]['call'](this,_0x5eb81a));},Window_Message['prototype'][_0x43f6c5(0x2e5)]=function(_0x12e6af){const _0x390cba=_0x43f6c5;this[_0x390cba(0x3f0)]=this[_0x390cba(0x36a)];if(this['_textDelay']<=0x0)this[_0x390cba(0x39b)]=!![];},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x3a8)]=Window_Message[_0x43f6c5(0x22e)]['processEscapeCharacter'],Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x1d9)]=function(_0xb699be,_0x457921){const _0x3a9fe7=_0x43f6c5;!_0x457921['drawing']?Window_Base[_0x3a9fe7(0x22e)][_0x3a9fe7(0x1d9)][_0x3a9fe7(0x376)](this,_0xb699be,_0x457921):VisuMZ['MessageCore']['Window_Message_processEscapeCharacter'][_0x3a9fe7(0x376)](this,_0xb699be,_0x457921);},Window_Message['prototype'][_0x43f6c5(0x3eb)]=function(_0x4bbf67){const _0x439977=_0x43f6c5;let _0x401ed9=_0x4bbf67['text'];_0x401ed9=_0x401ed9[_0x439977(0x33f)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x3a299d=_0x439977;return this[_0x3a299d(0x23f)](_0x401ed9,!![],!![]),this[_0x3a299d(0x3d1)](_0x3a299d(0x3c8)),'';}),_0x401ed9=_0x401ed9[_0x439977(0x33f)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x3aa5f2=_0x439977;return this[_0x3aa5f2(0x23f)](_0x401ed9,!![],![]),this[_0x3aa5f2(0x3d1)](_0x3aa5f2(0x3c8)),'';}),_0x401ed9=_0x401ed9['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x1c59cd=_0x439977;return this[_0x1c59cd(0x23f)](_0x401ed9,![],!![]),this[_0x1c59cd(0x3d1)](_0x1c59cd(0x3c8)),'';});if(SceneManager[_0x439977(0x3d0)]())_0x401ed9=_0x401ed9[_0x439977(0x33f)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4939bb,_0x566cc8)=>{const _0x4527bb=_0x439977;return this['processAutoSize'](_0x401ed9,!![],!![]),this[_0x4527bb(0x3d1)](_0x4527bb(0x1ed),Number(_0x566cc8)||0x1),'';}),_0x401ed9=_0x401ed9['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3b79cc,_0x5459b7)=>{const _0x53734d=_0x439977;return this[_0x53734d(0x23f)](_0x401ed9,!![],!![]),this['processAutoPosition']('battle\x20party',Number(_0x5459b7)||0x0),'';}),_0x401ed9=_0x401ed9['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2fd3dc,_0x3aed9e)=>{const _0x199310=_0x439977;return this['processAutoSize'](_0x401ed9,!![],!![]),this[_0x199310(0x3d1)](_0x199310(0x3b7),Number(_0x3aed9e)||0x0),'';});else SceneManager[_0x439977(0x2a4)]()&&(_0x401ed9=_0x401ed9[_0x439977(0x33f)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0xb64969,_0x5528ff)=>{const _0x327c97=_0x439977;return this['processAutoSize'](_0x401ed9,!![],!![]),this['processAutoPosition'](_0x327c97(0x309),0x0),'';}),_0x401ed9=_0x401ed9['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x13d20f,_0x5dc8ad)=>{const _0x26493f=_0x439977;return this[_0x26493f(0x23f)](_0x401ed9,!![],!![]),this[_0x26493f(0x3d1)](_0x26493f(0x1de),Number(_0x5dc8ad)||0x1),'';}),_0x401ed9=_0x401ed9[_0x439977(0x33f)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x281472,_0x112600)=>{const _0x5f2188=_0x439977;return this[_0x5f2188(0x23f)](_0x401ed9,!![],!![]),this[_0x5f2188(0x3d1)]('map\x20party',Number(_0x112600)||0x0),'';}),_0x401ed9=_0x401ed9['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x199bab,_0x148914)=>{const _0x360c45=_0x439977;return this[_0x360c45(0x23f)](_0x401ed9,!![],!![]),this[_0x360c45(0x3d1)](_0x360c45(0x289),Number(_0x148914)||0x0),'';}));_0x4bbf67[_0x439977(0x2ed)]=_0x401ed9;},Window_Message[_0x43f6c5(0x3d7)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x43f6c5(0x1d2)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x43f6c5(0x23f)]=function(_0x312eeb,_0x2fe6d5,_0x3348ce){const _0x2ddb06=_0x43f6c5;_0x312eeb=_0x312eeb[_0x2ddb06(0x33f)](Window_Message[_0x2ddb06(0x3d7)],''),_0x312eeb=_0x312eeb['replace'](Window_Message[_0x2ddb06(0x1d2)],''),this[_0x2ddb06(0x34c)]=!![];const _0x19de8a=this[_0x2ddb06(0x1e6)](_0x312eeb);if(_0x2fe6d5){let _0x31951c=_0x19de8a[_0x2ddb06(0x29b)]+$gameSystem['windowPadding']()*0x2+0x6;const _0x231b43=$gameMessage[_0x2ddb06(0x245)]()!=='',_0x571af2=ImageManager[_0x2ddb06(0x291)],_0x1100d5=0x14;_0x31951c+=_0x231b43?_0x571af2+_0x1100d5:0x4,$gameSystem[_0x2ddb06(0x334)](_0x31951c);}if(_0x3348ce){let _0x52252f=Math[_0x2ddb06(0x2da)](_0x19de8a[_0x2ddb06(0x2f6)]/this[_0x2ddb06(0x2d5)]());$gameSystem[_0x2ddb06(0x3a1)](_0x52252f);}this[_0x2ddb06(0x237)](),this[_0x2ddb06(0x34c)]=![],this['_messagePositionReset']=!![];},Window_Message['prototype']['updateAutoSizePosition']=function(){const _0x4f26e7=_0x43f6c5;this['updateDimensions'](),this[_0x4f26e7(0x239)](),this['resetPositionX'](),this[_0x4f26e7(0x3e4)](),this[_0x4f26e7(0x38b)][_0x4f26e7(0x242)](),this[_0x4f26e7(0x37e)]();},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x3d1)]=function(_0x4c2470,_0x225118){const _0x496cfb=_0x43f6c5;switch(_0x4c2470[_0x496cfb(0x285)]()['trim']()){case _0x496cfb(0x1ed):this[_0x496cfb(0x21d)]=$gameActors['actor'](_0x225118);break;case _0x496cfb(0x2fc):this[_0x496cfb(0x21d)]=$gameParty[_0x496cfb(0x24a)]()[_0x225118-0x1];break;case _0x496cfb(0x3b7):this['_autoPositionTarget']=$gameTroop[_0x496cfb(0x24a)]()[_0x225118-0x1];break;case _0x496cfb(0x309):this['_autoPositionTarget']=$gamePlayer;break;case'map\x20actor':const _0x14ded3=$gameActors[_0x496cfb(0x2e0)](_0x225118)['index']();_0x14ded3===0x0?this[_0x496cfb(0x21d)]=$gamePlayer:this[_0x496cfb(0x21d)]=$gamePlayer['followers']()[_0x496cfb(0x29e)](_0x14ded3-0x1);break;case _0x496cfb(0x368):_0x225118===0x1?this[_0x496cfb(0x21d)]=$gamePlayer:this[_0x496cfb(0x21d)]=$gamePlayer['followers']()['follower'](_0x225118-0x2);break;case _0x496cfb(0x289):this[_0x496cfb(0x21d)]=$gameMap['event'](_0x225118);break;}this[_0x496cfb(0x21d)]&&this[_0x496cfb(0x3b5)]();},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x2ea)]=Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x277)],Window_Message[_0x43f6c5(0x22e)]['synchronizeNameBox']=function(){const _0xce5912=_0x43f6c5;this[_0xce5912(0x3b5)](),VisuMZ[_0xce5912(0x38e)][_0xce5912(0x2ea)][_0xce5912(0x376)](this);},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x3b5)]=function(){const _0x41ed93=_0x43f6c5;if(!this['_autoPositionTarget'])return;const _0x1b671e=SceneManager[_0x41ed93(0x2dd)];if(!_0x1b671e)return;if(!_0x1b671e[_0x41ed93(0x2b9)])return;const _0x46dc1a=_0x1b671e[_0x41ed93(0x2b9)][_0x41ed93(0x3dd)](this[_0x41ed93(0x21d)]);if(!_0x46dc1a)return;let _0x127614=_0x46dc1a['x'];_0x127614-=this[_0x41ed93(0x29b)]/0x2,_0x127614-=(Graphics[_0x41ed93(0x29b)]-Graphics[_0x41ed93(0x340)])/0x2;let _0x58dfcd=_0x46dc1a['y'];_0x58dfcd-=this[_0x41ed93(0x2f6)],_0x58dfcd-=(Graphics[_0x41ed93(0x2f6)]-Graphics[_0x41ed93(0x395)])/0x2,_0x46dc1a[_0x41ed93(0x311)]?_0x58dfcd-=_0x46dc1a[_0x41ed93(0x311)]()[_0x41ed93(0x2f6)]+0x18:_0x58dfcd-=_0x46dc1a[_0x41ed93(0x2f6)]+0x8,this['x']=Math[_0x41ed93(0x33b)](_0x127614),this['y']=Math['round'](_0x58dfcd),this[_0x41ed93(0x1d4)](!![],![]),this[_0x41ed93(0x1ee)][_0x41ed93(0x239)]();},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x252)]=function(){const _0x54bc9e=_0x43f6c5;this[_0x54bc9e(0x302)]=![],this[_0x54bc9e(0x21d)]=undefined,$gameSystem[_0x54bc9e(0x1f5)](),this[_0x54bc9e(0x237)](),this[_0x54bc9e(0x344)]=0x0;},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x253)]=function(_0x1a5642){const _0x511775=_0x43f6c5;return Window_Base[_0x511775(0x22e)]['preConvertEscapeCharacters']['call'](this,_0x1a5642);},Window_Message['prototype']['postConvertEscapeCharacters']=function(_0x1beb72){const _0x2ef69c=_0x43f6c5;return Window_Base[_0x2ef69c(0x22e)][_0x2ef69c(0x2fd)][_0x2ef69c(0x376)](this,_0x1beb72);},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x267)]=function(_0x3ca258){const _0x410777=_0x43f6c5;this[_0x410777(0x361)](_0x3ca258),Window_Base[_0x410777(0x22e)][_0x410777(0x267)][_0x410777(0x376)](this,_0x3ca258),this[_0x410777(0x238)](_0x3ca258);},Window_Message[_0x43f6c5(0x22e)][_0x43f6c5(0x361)]=function(_0xf0c72b){},Window_Message['prototype'][_0x43f6c5(0x238)]=function(_0x2f6632){},Window_NameBox[_0x43f6c5(0x22e)][_0x43f6c5(0x1d3)]=function(){return![];},Window_NameBox[_0x43f6c5(0x22e)][_0x43f6c5(0x32d)]=function(){const _0x41dce3=_0x43f6c5;Window_Base[_0x41dce3(0x22e)][_0x41dce3(0x32d)]['call'](this),this[_0x41dce3(0x2df)](this[_0x41dce3(0x39e)]());},Window_NameBox['prototype'][_0x43f6c5(0x39e)]=function(){const _0xc8c848=_0x43f6c5,_0x3cf37f=VisuMZ[_0xc8c848(0x38e)][_0xc8c848(0x2be)][_0xc8c848(0x2b7)]['NameBoxWindowDefaultColor'];return ColorManager[_0xc8c848(0x235)](_0x3cf37f);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x24c)]=Window_NameBox[_0x43f6c5(0x22e)]['updatePlacement'],Window_NameBox['prototype']['updatePlacement']=function(){const _0x390eda=_0x43f6c5;VisuMZ[_0x390eda(0x38e)]['Window_NameBox_updatePlacement']['call'](this),this[_0x390eda(0x3e3)](),this[_0x390eda(0x3d4)](),this[_0x390eda(0x1d4)](),this[_0x390eda(0x2a2)]();},Window_NameBox[_0x43f6c5(0x22e)][_0x43f6c5(0x253)]=function(_0x34348f){const _0x4de644=_0x43f6c5;return _0x34348f=_0x34348f[_0x4de644(0x33f)](/<LEFT>/gi,this['setRelativePosition']['bind'](this,0x0)),_0x34348f=_0x34348f[_0x4de644(0x33f)](/<CENTER>/gi,this['setRelativePosition']['bind'](this,0x5)),_0x34348f=_0x34348f[_0x4de644(0x33f)](/<RIGHT>/gi,this[_0x4de644(0x210)][_0x4de644(0x3ea)](this,0xa)),_0x34348f=_0x34348f[_0x4de644(0x33f)](/<POSITION:[ ](\d+)>/gi,(_0x4d9914,_0x4072e2)=>this[_0x4de644(0x210)](parseInt(_0x4072e2))),_0x34348f=_0x34348f[_0x4de644(0x33f)](/<\/LEFT>/gi,''),_0x34348f=_0x34348f[_0x4de644(0x33f)](/<\/CENTER>/gi,''),_0x34348f=_0x34348f[_0x4de644(0x33f)](/<\/RIGHT>/gi,''),Window_Base[_0x4de644(0x22e)]['preConvertEscapeCharacters'][_0x4de644(0x376)](this,_0x34348f);},Window_NameBox[_0x43f6c5(0x22e)][_0x43f6c5(0x210)]=function(_0x4332f0){return this['_relativePosition']=_0x4332f0,'';},Window_NameBox[_0x43f6c5(0x22e)]['updateRelativePosition']=function(){const _0x422fbf=_0x43f6c5;if($gameMessage[_0x422fbf(0x2d9)]())return;this[_0x422fbf(0x2b6)]=this['_relativePosition']||0x0;const _0x378f83=this['_messageWindow'],_0x150117=Math['floor'](_0x378f83[_0x422fbf(0x29b)]*this['_relativePosition']/0xa);this['x']=_0x378f83['x']+_0x150117-Math[_0x422fbf(0x3ee)](this[_0x422fbf(0x29b)]/0x2),this['x']=this['x'][_0x422fbf(0x294)](_0x378f83['x'],_0x378f83['x']+_0x378f83[_0x422fbf(0x29b)]-this[_0x422fbf(0x29b)]);},Window_NameBox[_0x43f6c5(0x22e)][_0x43f6c5(0x3d4)]=function(){const _0x15151f=_0x43f6c5;if($gameMessage['isRTL']())return;this['_relativePosition']=this[_0x15151f(0x2b6)]||0x0;const _0x106246=VisuMZ[_0x15151f(0x38e)][_0x15151f(0x2be)][_0x15151f(0x2b7)][_0x15151f(0x21c)],_0x49499a=VisuMZ[_0x15151f(0x38e)][_0x15151f(0x2be)][_0x15151f(0x2b7)]['NameBoxWindowOffsetY'],_0x45c493=(0x5-this[_0x15151f(0x2b6)])/0x5;this['x']+=Math[_0x15151f(0x3ee)](_0x106246*_0x45c493),this['y']+=_0x49499a;},Window_NameBox['prototype'][_0x43f6c5(0x2a2)]=function(){const _0x2140cd=_0x43f6c5,_0x36e8fa=this[_0x2140cd(0x348)],_0x13c248=_0x36e8fa['y'],_0x4ecd52=VisuMZ[_0x2140cd(0x38e)]['Settings']['General']['NameBoxWindowOffsetY'];_0x13c248>this['y']&&_0x13c248<this['y']+this[_0x2140cd(0x2f6)]-_0x4ecd52&&(this['y']=_0x36e8fa['y']+_0x36e8fa[_0x2140cd(0x2f6)]);},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x39d)]=Window_NameBox[_0x43f6c5(0x22e)][_0x43f6c5(0x224)],Window_NameBox['prototype'][_0x43f6c5(0x224)]=function(){const _0x3cbb51=_0x43f6c5;this[_0x3cbb51(0x2b6)]=0x0,VisuMZ[_0x3cbb51(0x38e)][_0x3cbb51(0x39d)][_0x3cbb51(0x376)](this);},Window_ChoiceList['prototype'][_0x43f6c5(0x257)]=function(){return![];},Window_ChoiceList[_0x43f6c5(0x22e)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList['prototype']['lineHeight']=function(){const _0x1e58a4=_0x43f6c5;return $gameSystem[_0x1e58a4(0x3b0)]();},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x2ac)]=function(){const _0x166eb5=_0x43f6c5;return $gameSystem[_0x166eb5(0x36b)]();},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x25f)]=function(){const _0x280eb5=_0x43f6c5;this[_0x280eb5(0x224)](),this[_0x280eb5(0x2d2)](),this['open'](),this[_0x280eb5(0x3d9)]();},Window_ChoiceList['prototype'][_0x43f6c5(0x224)]=function(){const _0x49bcf2=_0x43f6c5;this[_0x49bcf2(0x2bf)](),this[_0x49bcf2(0x387)](),this['_messageWindow']&&(this[_0x49bcf2(0x239)](),this[_0x49bcf2(0x20e)]()),this[_0x49bcf2(0x37e)](),this[_0x49bcf2(0x2a0)](),this['refreshDimmerBitmap'](),Window_Selectable[_0x49bcf2(0x22e)]['refresh'][_0x49bcf2(0x376)](this);},Window_ChoiceList['prototype'][_0x43f6c5(0x387)]=function(){const _0x58574d=_0x43f6c5,_0x555ef5=$gameMessage[_0x58574d(0x3a5)]();let _0x4244be=0x0;for(const _0x196e59 of _0x555ef5){if(this[_0x58574d(0x3e2)](_0x196e59)){const _0x5e0aa0=_0x196e59,_0xa3c1f0=this['isChoiceEnabled'](_0x196e59);this['addCommand'](_0x5e0aa0,'choice',_0xa3c1f0,_0x4244be);}_0x4244be++;}},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x3e2)]=function(_0x258d69){const _0x326334=_0x43f6c5;if(_0x258d69[_0x326334(0x28c)](/<HIDE>/i))return![];if(_0x258d69[_0x326334(0x28c)](/<SHOW>/i))return!![];if(_0x258d69[_0x326334(0x28c)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x300398=JSON[_0x326334(0x249)]('['+RegExp['$1'][_0x326334(0x28c)](/\d+/g)+']');for(const _0x355162 of _0x300398){if(!$gameSwitches[_0x326334(0x22a)](_0x355162))return![];}return!![];}if(_0x258d69[_0x326334(0x28c)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7890e7=JSON[_0x326334(0x249)]('['+RegExp['$1'][_0x326334(0x28c)](/\d+/g)+']');for(const _0x4b5c18 of _0x7890e7){if(!$gameSwitches['value'](_0x4b5c18))return![];}return!![];}if(_0x258d69[_0x326334(0x28c)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x121009=JSON[_0x326334(0x249)]('['+RegExp['$1'][_0x326334(0x28c)](/\d+/g)+']');for(const _0x24b553 of _0x121009){if($gameSwitches[_0x326334(0x22a)](_0x24b553))return!![];}return![];}if(_0x258d69[_0x326334(0x28c)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x285acf=JSON[_0x326334(0x249)]('['+RegExp['$1'][_0x326334(0x28c)](/\d+/g)+']');for(const _0x5374f8 of _0x285acf){if(!$gameSwitches['value'](_0x5374f8))return!![];}return![];}if(_0x258d69['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a2939=JSON[_0x326334(0x249)]('['+RegExp['$1'][_0x326334(0x28c)](/\d+/g)+']');for(const _0x5f055f of _0x2a2939){if(!$gameSwitches[_0x326334(0x22a)](_0x5f055f))return!![];}return![];}if(_0x258d69[_0x326334(0x28c)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59cec2=JSON[_0x326334(0x249)]('['+RegExp['$1'][_0x326334(0x28c)](/\d+/g)+']');for(const _0x3732bf of _0x59cec2){if($gameSwitches[_0x326334(0x22a)](_0x3732bf))return![];}return!![];}return!![];},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x38c)]=function(_0x2a6c99){const _0x2b70ea=_0x43f6c5;if(_0x2a6c99[_0x2b70ea(0x28c)](/<DISABLE>/i))return![];if(_0x2a6c99[_0x2b70ea(0x28c)](/<ENABLE>/i))return!![];if(_0x2a6c99[_0x2b70ea(0x28c)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x294b77=JSON['parse']('['+RegExp['$1'][_0x2b70ea(0x28c)](/\d+/g)+']');for(const _0x452996 of _0x294b77){if(!$gameSwitches[_0x2b70ea(0x22a)](_0x452996))return![];}return!![];}if(_0x2a6c99[_0x2b70ea(0x28c)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x537d3f=JSON[_0x2b70ea(0x249)]('['+RegExp['$1'][_0x2b70ea(0x28c)](/\d+/g)+']');for(const _0x1240c7 of _0x537d3f){if(!$gameSwitches[_0x2b70ea(0x22a)](_0x1240c7))return![];}return!![];}if(_0x2a6c99[_0x2b70ea(0x28c)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24fe3a=JSON[_0x2b70ea(0x249)]('['+RegExp['$1'][_0x2b70ea(0x28c)](/\d+/g)+']');for(const _0x44d47a of _0x24fe3a){if($gameSwitches['value'](_0x44d47a))return!![];}return![];}if(_0x2a6c99[_0x2b70ea(0x28c)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x450474=JSON[_0x2b70ea(0x249)]('['+RegExp['$1'][_0x2b70ea(0x28c)](/\d+/g)+']');for(const _0x22df67 of _0x450474){if(!$gameSwitches[_0x2b70ea(0x22a)](_0x22df67))return!![];}return![];}if(_0x2a6c99[_0x2b70ea(0x28c)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa2710a=JSON[_0x2b70ea(0x249)]('['+RegExp['$1'][_0x2b70ea(0x28c)](/\d+/g)+']');for(const _0x31388f of _0xa2710a){if(!$gameSwitches['value'](_0x31388f))return!![];}return![];}if(_0x2a6c99['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52713c=JSON[_0x2b70ea(0x249)]('['+RegExp['$1'][_0x2b70ea(0x28c)](/\d+/g)+']');for(const _0x1723da of _0x52713c){if($gameSwitches['value'](_0x1723da))return![];}return!![];}return!![];},VisuMZ[_0x43f6c5(0x38e)][_0x43f6c5(0x24d)]=Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x239)],Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x239)]=function(){const _0x19e16b=_0x43f6c5;VisuMZ[_0x19e16b(0x38e)]['Window_ChoiceList_updatePlacement'][_0x19e16b(0x376)](this),this[_0x19e16b(0x1d4)]();},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x20e)]=function(){const _0x4c4a5d=_0x43f6c5;if(!this[_0x4c4a5d(0x1e5)])return;const _0x26b9b2=0x8,_0x89ebf2=this[_0x4c4a5d(0x1e5)],_0x3b2daa=this['x']+this[_0x4c4a5d(0x29b)],_0x8fc794=Math['floor']((Graphics[_0x4c4a5d(0x29b)]-Graphics[_0x4c4a5d(0x340)])/0x2);_0x3b2daa>=Graphics[_0x4c4a5d(0x340)]+_0x8fc794-_0x89ebf2[_0x4c4a5d(0x29b)]+_0x26b9b2?_0x89ebf2['x']=-_0x89ebf2[_0x4c4a5d(0x29b)]-_0x26b9b2:_0x89ebf2['x']=this[_0x4c4a5d(0x29b)]+_0x26b9b2,_0x89ebf2['y']=this[_0x4c4a5d(0x2f6)]/0x2-_0x89ebf2[_0x4c4a5d(0x2f6)]/0x2;},VisuMZ['MessageCore'][_0x43f6c5(0x24f)]=Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x1f8)],Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x1f8)]=function(){const _0x43f23e=_0x43f6c5;return this['_messageWindow']?this['messageCoreWindowX']():VisuMZ[_0x43f23e(0x38e)][_0x43f23e(0x24f)][_0x43f23e(0x376)](this);},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x2aa)]=function(){const _0x10b0e1=_0x43f6c5,_0x283653=$gameMessage['choicePositionType']();if(_0x283653===0x1)return(Graphics[_0x10b0e1(0x340)]-this['windowWidth']())/0x2;else return _0x283653===0x2?this[_0x10b0e1(0x348)]['x']+this[_0x10b0e1(0x348)][_0x10b0e1(0x29b)]-this['windowWidth']():this[_0x10b0e1(0x348)]['x'];},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x34b)]=function(){const _0xde6b=_0x43f6c5,_0x4e8ce6=(this[_0xde6b(0x284)]()+this[_0xde6b(0x3bc)]())*this['maxCols']()+this[_0xde6b(0x2e8)]*0x2;return Math[_0xde6b(0x219)](_0x4e8ce6,Graphics[_0xde6b(0x29b)]);},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x390)]=function(){const _0x136324=_0x43f6c5,_0x3796a5=Math[_0x136324(0x2da)]($gameMessage[_0x136324(0x3a5)]()[_0x136324(0x3b2)]/this['maxCols']());return Math['min'](_0x3796a5,this[_0x136324(0x233)]());},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x233)]=function(){const _0x1c7369=_0x43f6c5,_0xf9e081=this[_0x1c7369(0x348)],_0x807a41=_0xf9e081?_0xf9e081['y']:0x0,_0x1fb424=_0xf9e081?_0xf9e081[_0x1c7369(0x2f6)]:0x0,_0xf594af=Graphics[_0x1c7369(0x395)]/0x2;return _0x807a41<_0xf594af&&_0x807a41+_0x1fb424>_0xf594af?0x4:$gameSystem[_0x1c7369(0x346)]();},Window_ChoiceList['prototype']['maxChoiceWidth']=function(){const _0x478a0d=_0x43f6c5;let _0x3a3227=0x60;for(const _0x166b35 of this['_list']){const _0x46a301=_0x166b35['name'],_0x5bb487=this['textSizeEx'](_0x46a301)[_0x478a0d(0x29b)],_0x2156e2=Math[_0x478a0d(0x2da)](_0x5bb487)+this[_0x478a0d(0x2f5)]()*0x2;_0x3a3227<_0x2156e2&&(_0x3a3227=_0x2156e2);}return _0x3a3227;},Window_ChoiceList[_0x43f6c5(0x22e)]['drawItem']=function(_0x136d92){const _0x35d166=_0x43f6c5,_0x1dc60b=this[_0x35d166(0x3a4)](_0x136d92),_0x35ebce=$gameSystem[_0x35d166(0x371)]()!=='default'?_0x35d166(0x2f7)['format']($gameSystem[_0x35d166(0x371)]()):'',_0x539cc5=_0x35ebce+this[_0x35d166(0x269)](_0x136d92);this[_0x35d166(0x35c)](this['isCommandEnabled'](_0x136d92)),this['drawTextEx'](_0x539cc5,_0x1dc60b['x'],_0x1dc60b['y'],_0x1dc60b[_0x35d166(0x29b)]);},Window_ChoiceList[_0x43f6c5(0x22e)][_0x43f6c5(0x306)]=function(){const _0x2eb566=_0x43f6c5;$gameMessage[_0x2eb566(0x314)](this[_0x2eb566(0x255)]()),this[_0x2eb566(0x348)]['terminateMessage'](),this[_0x2eb566(0x36f)]();};