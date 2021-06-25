'use strict';
/* global PIXI   */
/* global Bitmap */
/* global PluginManager  */
/* global ImageManager   */
/* global SceneManager   */
/* global Graphics       */
/* global Scene_Map      */
/* global Sprite         */
/* global TouchInput     */
/* global $gameTemp      */
/* global Window_Message */
//=============================================================================
// IconButton.js
//=============================================================================


/*:
 * @target MZ
 * @plugindesc IconButton plugin.
 * @author BananaPepperTK
 *
 * @help Turn the system icon into a button.
 * 
 * For more information
 *   https://github.com/sevenspice/IconButton
 *
 * @param FreeCoordinates
 * @desc How to specify the position of icons. If it is true, specify the display position directly by command.
 * @default false
 *
 * @param IconSet
 * @desc The name of the sprite sheet for the icon set to be used. If nothing is specified, the default icon set will be used.
 *
 * @param IconSize
 * @desc The number of pixels per side of the icon in the spritesheet.
 * @default 32
 *
 * @param IconCount
 * @desc The maximum number of horizontal rows of icons in the spritesheet.
 * @default 16
 *
 * @param IconMarginLeft
 * @desc Left margin of the icon.
 * @default 10
 *
 * @param IconMarginRight
 * @desc Right margin of the icon.。
 * @default 10
 *
 * @param IconMarginTop
 * @desc Top margin of the icon.
 * @default 10
 *
 * @param IconMarginBottom
 * @desc Bottom margin of the icon.
 * @default 10
 *
 * @command create
 * @text create
 * @desc Generate icon.
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 *
 * @arg eventId
 * @type common_event
 * @text CommonEventID
 * @desc The common event ID to be executed.
 *
 * @arg iconId
 * @type number
 * @text IconID
 * @desc The ID of the icon to be displayed.
 *
 * @arg location
 * @type string
 * @default rightBottom
 * @text location
 * @desc Place it somewhere in the four corners of the screen. leftTop or leftBottom or rightTop or rightBottom
 *
 * @arg x
 * @type number
 * @default 0
 * @text x-coordinate
 * @desc Direct designation.
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y-coordinate
 * @desc Direct designation.
 * 
 * @arg scale
 * @type number
 * @default 1.0
 * @text Rate of expansion and contraction
 * @desc Zoom in/out ratio of the displayed icon.
 *
 * @arg text
 * @type string
 * @text text
 * @desc The text to be displayed at the bottom of the icon.
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text fontsize
 * @desc Font size of the text to be displayed at the bottom of the icon.
 *
 * @command show
 * @text show
 * @desc Show icon.
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 *
 * @command update
 * @text update
 * @desc Update icon.
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 *
 * @arg x
 * @type number
 * @default 0
 * @text x-coordinate
 * @desc Direct designation.
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y-coordinate
 * @desc Direct designation.
 *
 * @arg scale
 * @type number
 * @default 1.0
 * @text Rate of expansion and contraction
 * @desc Zoom in/out ratio of the displayed icon.
 *
 * @arg text
 * @type string
 * @text text
 * @desc The text to be displayed at the bottom of the icon.
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text fontsize
 * @desc Font size of the text to be displayed at the bottom of the icon.
 *
 * @command hide
 * @text hide
 * @desc Hide icon。
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc アイコンボタンプラグイン。
 * @author BananaPepperTK
 *
 * @help システムアイコンをボタン化します。
 *
 * 詳細
 *   https://github.com/sevenspice/IconButton
 *
 * @param FreeCoordinates
 * @desc アイコンの配置指定方法。 true なら表示位置をコマンドで直接指定する。
 * @default false
 *
 * @param IconSet
 * @desc 使用するアイコンセットのスプライトシート名。何も指定されない場合はデフォルトのアイコンセットが使用される。
 *
 * @param IconSize
 * @desc スプライトシートにあるアイコンの1辺のピクセル数。
 * @default 32
 *
 * @param IconCount
 * @desc スプライトシートにあるアイコンの横一列の最大数。
 * @default 16
 *
 * @param IconMarginLeft
 * @desc アイコンの左マージン。
 * @default 10
 *
 * @param IconMarginRight
 * @desc アイコンの右マージン。
 * @default 10
 *
 * @param IconMarginTop
 * @desc アイコンの上マージン
 * @default 10
 *
 * @param IconMarginBottom
 * @desc アイコンの下マージン
 * @default 10
 *
 * @command create
 * @text 生成
 * @desc アイコンを生成します。
 *
 * @arg id
 * @type number
 * @text ボタンID
 * @desc ボタンを識別するID値。
 *
 * @arg eventId
 * @type common_event
 * @text コモンイベントID
 * @desc 実行するコモンイベントID。
 *
 * @arg iconId
 * @type number
 * @text アイコンID
 * @desc 表示するアイコンのID。
 *
 * @arg location
 * @type string
 * @default rightBottom
 * @text 配置箇所
 * @desc 画面の四隅のどこかに配置する。 leftTop or leftBottom or rightTop or rightBottom
 *
 * @arg x
 * @type number
 * @default 0
 * @text x座標
 * @desc 直接指定。
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y座標
 * @desc 直接指定。
 * 
 * @arg scale
 * @type number
 * @default 1.0
 * @text 拡大・縮小率
 * @desc 表示するアイコンの拡大・縮小率。
 *
 * @arg text
 * @type string
 * @text テキスト
 * @desc アイコンの下部に表示するテキスト。
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text フォントサイズ
 * @desc アイコンの下部に表示するテキストのフォントサイズ。
 *
 * @command show
 * @text 表示
 * @desc アイコンを表示します。
 *
 * @arg id
 * @type number
 * @text ボタンID
 * @desc ボタンを識別するID値。
 *
 * @command update
 * @text 更新
 * @desc アイコンを更新します。
 *
 * @arg id
 * @type number
 * @text ボタンID
 * @desc ボタンを識別するID値。
 *
 * @arg x
 * @type number
 * @default 0
 * @text x座標
 * @desc 直接指定。
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y座標
 * @desc 直接指定。
 *
 * @arg scale
 * @type number
 * @default 1.0
 * @text 拡大・縮小率
 * @desc 表示するアイコンの拡大・縮小率。
 *
 * @arg text
 * @type string
 * @text テキスト
 * @desc アイコンの下部に表示するテキスト。
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text フォントサイズ
 * @desc アイコンの下部に表示するテキストのフォントサイズ。
 *
 * @command hide
 * @text 非表示
 * @desc アイコンを非表示にします。
 *
 * @arg id
 * @type number
 * @text ボタンID
 * @desc ボタンを識別するID値。
 * 
 */

// グローバル変数を追加する
// このプラグインを有効化すると追加されるため競合に注意すること
window.$gameItemSlot = null;

( function() {
    const pluginName = 'IconButton';
    let iconSet = null;

    // プラグイン初期化
    // コマンドパラメーターの取得
    const parameters = PluginManager.parameters(pluginName);
    let freeCoordinates = parameters['FreeCoordinates'];
    if(freeCoordinates == 'true') freeCoordinates = true;
    else freeCoordinates = false;

    const _iconSet = parameters['IconSet'];
    if (_iconSet) iconSet = ImageManager.loadSystem(_iconSet);
    else iconSet = ImageManager.loadSystem('IconSet');

    const iconSize = parseInt(parameters['IconSize']);
    const baseIconWidth  = iconSize;
    const baseIconHeight = iconSize;

    const iconCount = parseInt(parameters['IconCount']);

    const iconMarginLeft   = parseInt(parameters['IconMarginLeft']);
    const iconMarginRight  = parseInt(parameters['IconMarginRight']);
    const iconMarginTop    = parseInt(parameters['IconMarginTop']);
    const iconMarginBottom = parseInt(parameters['IconMarginBottom']);

    let iconButtons = {};
    let iconButtonEnables = {};

    // プラグインで使用する関数群
    /**
     * アイテムのアイコン画像を取得する巻数
     * @param {Bitmap}  iconset    アイコン一覧のスプライト
     * @param {integer} iconIdex   アイコン番号
     * @param {integer} iconWidth  アイコン幅
     * @param {integer} iconHeight アイコン高さ
     * @param {integer} iconCount  スプライトシート横一列の最大アイコン数
     * @return {Bitmap} アイコンのビットマップを返却
     */
    const getIcon = (iconset, iconIdex, iconWidth, iconHeight, iconCount) => {
        const iconX  = (iconIdex % iconCount) * iconWidth;
        const iconY  = Math.floor(iconIdex / iconCount) * iconHeight;
        const bitmap = new Bitmap(iconWidth, iconHeight);
        bitmap.blt(iconset, iconX, iconY, iconWidth, iconHeight, 0, 0, iconWidth, iconHeight);
        return bitmap;
    };

    /**
     * アイコンボタンクラス。
     */
    class IconButton {
        constructor(
            _eventId
            , _iconSet
            , _iconIndex
            , _x
            , _y
            , _baseIconWidth
            , _baseIconHeight
            , _iconCount
            , _scale
            , _text
            , _fontSize
            , _location
            , _iconMarginLeft
            , _iconMarginRight
            , _iconMarginTop
            , _iconMarginBottom
            , _freeCoordinates
        ) {
            this.eventId   = _eventId;
            this.iconSet   = _iconSet;
            this.iconIndex = _iconIndex;

            this.x = _x;
            this.y = _y;

            this.baseIconWidth  = _baseIconWidth;
            this.baseIconHeight = _baseIconHeight;
            this.iconCount      = _iconCount;

            this.scale = _scale;
            this.originScale = _scale;


            this.width  = Math.floor(this.baseIconWidth  * this.scale);
            this.height = Math.floor(this.baseIconHeight * this.scale);

            this.iconMarginLeft   = _iconMarginLeft;
            this.iconMarginRight  = _iconMarginRight;
            this.iconMarginTop    = _iconMarginTop;
            this.iconMarginBottom = _iconMarginBottom;

            this.location = _location;
            this.freeCoordinates = _freeCoordinates;

            this.text = _text;
            this.fontSize  = _fontSize;
            this.fontStyle = null;

            this.icon = null;
            this.underText = null;
        }

        /**
         * アイコンの表示位置を返却する。
         * @param {integer} _x 直接指定されたx座標
         * @param {integer} _y 直接指定されたy座標
         * @param {string}  location   文字列での位置指定
         * @param {integer} iconWidth  アイコン幅
         * @param {integer} iconHeight アイコン高さ
         * @param {integer} iconMarginLeft   アイコンの左マージン
         * @param {integer} iconMarginRight  アイコンの右マージン
         * @param {integer} iconMarginTop    アイコンの上マージン
         * @param {integer} iconMarginBottom アイコンの下マージン
         * @param {boolean} freeCoordinates  座標直接指定か否か
         * @return {object} アイコンの表示位置を返却。
         */
        static coordinates (
            _x
            , _y
            , location
            , iconWidth
            , iconHeight
            , iconMarginLeft
            , iconMarginRight
            , iconMarginTop
            , iconMarginBottom
            , freeCoordinates
        ) {
            if (!freeCoordinates) {
                let x = 0;
                let y = 0;
                switch(location) {
                case 'rightBottom':
                    x = Graphics.width  - (iconWidth  + iconMarginLeft + iconMarginRight);
                    y = Graphics.height - (iconHeight + iconMarginTop  + iconMarginBottom);
                    break;
                case 'leftBottom':
                    x = iconMarginLeft + iconMarginRight;
                    y = Graphics.height - (iconHeight + iconMarginTop  + iconMarginBottom);
                    break;
                case 'rightTop':
                    x = iconMarginLeft + iconMarginRight;
                    y = iconMarginTop  + iconMarginBottom;
                    break;
                case 'leftTop':
                    x = Graphics.width - (iconWidth  + iconMarginLeft + iconMarginRight);
                    y = iconMarginTop  + iconMarginBottom;
                    break;
                default:
                    break;
                }

                return { x: x, y: y };
            } else {
                return { x: _x, y: _y };
            }
        }

        /**
         * アイコンを描画する。
         * @return {undefined}
         */
        show () {
            if (this.icon      != null) SceneManager._scene.removeChild(this.icon);
            if (this.underText != null) SceneManager._scene.removeChild(this.underText);

            // マップ画面でのみ描画
            if (SceneManager._scene instanceof Scene_Map) {
                let icon = null;
                let text = null;

                // 表示するアイコン生成
                icon = new Sprite();
                icon.bitmap = getIcon(this.iconSet, this.iconIndex, this.baseIconWidth, this.baseIconHeight, this.iconCount);
                const iconX = this.x;
                const iconY = this.y;
                icon.x = iconX;
                icon.y = iconY;
                icon.scale = new PIXI.Point(this.scale, this.scale);

                // 下部に表示するテキストを生成
                if (this.text) {
                    this.fontStyle = new PIXI.TextStyle({
                        fill: 'white'
                        , fontWeight: 'bold'
                        , strokeThickness: 4
                        , miterLimit: 15
                        , align : 'center'
                        , fontSize: parseInt(this.fontSize)
                    });

                    text = new PIXI.Text(this.text, this.fontStyle);

                    // テキストの表示位置
                    text.x = iconX + Math.floor(Math.abs(this.width - text.width) / 2);
                    text.y = (iconY + this.height) - (this.iconMarginBottom + this.iconMarginTop);
                }

                if (icon != null) this.icon      = SceneManager._scene.addChild(icon);
                if (text != null) this.underText = SceneManager._scene.addChild(text);
            }
        }

        /**
         * アイコンの描画を更新する。
         * @param {double}  scale 拡大・縮小率
         * @param {integer} _x 直接指定するx座標
         * @param {integer} _y 直接指定するy座標
         * @param {string}  text     ボタンに表示する文言
         * @param {integer} fontSize 文言のフォントサイズ
         * @return {undefined}
         */
        update (scale, _x, _y, text, fontSize) {
            this.scale  = scale;
            this.text   = text;
            this.fontSize = fontSize;

            this.width  = Math.floor(this.baseIconWidth  * this.scale);
            this.height = Math.floor(this.baseIconHeight * this.scale);

            // 表示位置の計算
            const { x, y } = IconButton.coordinates(
                _x
                , _y
                , this.location
                , this.width
                , this.height
                , this.iconMarginLeft
                , this.iconMarginRight
                , this.iconMarginTop
                , this.iconMarginBottom
                , this.freeCoordinates
            );

            // 表示位置の更新
            this.x = x;
            this.y = y;

            // 描画
            this.show();
        }

        /**
         * アイコンを消す。
         * @return {undefined}
         */
        hide() {
            if (this.icon      != null) SceneManager._scene.removeChild(this.icon);
            if (this.underText != null) SceneManager._scene.removeChild(this.underText);
        }
    }

    // ------------------------------------
    // 以下はプラグインコマンド実行処理群
    // ------------------------------------
    /**
     * アイコンボタンの生成
     */
    PluginManager.registerCommand(pluginName, 'create', function(args) {
        const id = args.id;

        if (!iconButtons[id]) {
            const eventId    = args.eventId;
            const iconId     = args.iconId;
            const location   = args.location;
            const text       = args.text;
            const fontSize   = args.fontSize;
            const scale      = args.scale;
            const iconWidth  = Math.floor(baseIconWidth  * scale);
            const iconHeight = Math.floor(baseIconHeight * scale);

            const { x, y } = IconButton.coordinates(
                args.x
                , args.y
                , location
                , iconWidth
                , iconHeight
                , iconMarginLeft
                , iconMarginRight
                , iconMarginTop
                , iconMarginBottom
            );

            iconButtons[id] = { button: new IconButton(
                eventId
                , iconSet
                , iconId
                , x
                , y
                , baseIconWidth
                , baseIconHeight
                , iconCount
                , scale
                , text
                , fontSize
                , location
                , iconMarginLeft
                , iconMarginRight
                , iconMarginTop
                , iconMarginBottom
                , freeCoordinates
            )};

            iconButtons[id].button.show();
            iconButtonEnables[id] = true;
        }
    });

    /**
     * アイコンボタン表示
     */
    PluginManager.registerCommand(pluginName, 'show', function(args) {
        const id = args.id;
        const button = iconButtons[id].button;
        if (button) {
            button.show();
            iconButtonEnables[id] = true;
        }
    });

    /**
     * アイコンボタン更新
     */
    PluginManager.registerCommand(pluginName, 'update', function(args) {
        const id = args.id;
        const x = args.x;
        const y = args.y;
        const scale = args.scale;
        const text  = args.text;
        const fontSize = args.fontSize;
        const button = iconButtons[id].button;
        if (button) {
            button.update(scale, x, y, text, fontSize);
            iconButtonEnables[id] = true;
        }
    });

    /**
     * アイコンボタン非表示
     */
    PluginManager.registerCommand(pluginName, 'hide', function(args) {
        const id = args.id;
        const button = iconButtons[id].button;
        if (button) {
            button.hide();
            iconButtonEnables[id] = false;
        }
    });

    // -------------------------------------------
    // 以下はツクールMZにある機能を改造する処理群
    // -------------------------------------------
    /**
     * シーン更新時の挙動を改造する
     * 入力判定系の処理を追加する
     */
    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _SceneManager_updateMain.apply(this, arguments);
        const keys   = Object.keys(iconButtons);
        const clickX = TouchInput.x;
        const clickY = TouchInput.y;

        if(SceneManager._scene instanceof Scene_Map && TouchInput.isTriggered()) {
            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                const button = iconButtons[id].button;

                if (
                    button
                    && iconButtonEnables[id]
                    && (clickX >= button.x && clickX <= (button.x + button.width))
                    && (clickY >= button.y && clickY <= (button.y + button.height))
                ) {
                    // ボタンを押された表現
                    button.originScale = button.scale;
                    const scale = button.scale * 0.90;
                    button.update(scale, button.x, button.y, button.text, button.fontSize);

                    // コモンイベント呼び出し
                    $gameTemp.reserveCommonEvent(button.eventId);
                }
            }
        } else if (SceneManager._scene instanceof Scene_Map && TouchInput.isReleased()) {
            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                const button = iconButtons[id].button;

                if (
                    button
                    && iconButtonEnables[id]
                    && (clickX >= button.x && clickX <= (button.x + button.width))
                    && (clickY >= button.y && clickY <= (button.y + button.height))
                ) {
                    // ボタンを押された表現
                    const scale = button.originScale;
                    button.update(scale, button.x, button.y, button.text, button.fontSize);
                }
            }
        }
    };

    /**
     * マップをタッチされた際の挙動を改造する
     * アイコンをクリックされた場合は移動させない
     */
    const _Scene_Map_prototype_onMapTouch = Scene_Map.prototype.onMapTouch;
    Scene_Map.prototype.onMapTouch = function() {
        const keys  = Object.keys(iconButtons);
        let canMove = true;
        if(SceneManager._scene instanceof Scene_Map) {
            const clickX = TouchInput.x;
            const clickY = TouchInput.y;
            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                const button = iconButtons[id].button;

                if (
                    button
                    && iconButtonEnables[id]
                    && (clickX >= button.x && clickX <= (button.x + button.width))
                    && (clickY >= button.y && clickY <= (button.y + button.height))
                ) {
                    canMove = false;
                }
            }
        }

        if (canMove) return _Scene_Map_prototype_onMapTouch.apply(this, arguments);
    };

    /**
     * マップシーン開始時の挙動を改造する。
     * マップシーン開始時にアイテムスロットも更新する。
     */
    const _Scene_Map_prototype_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_prototype_start.apply(this, arguments);
        const keys  = Object.keys(iconButtons);

        if(SceneManager._scene instanceof Scene_Map) {
            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                const button = iconButtons[id].button;

                if(
                    button
                    && iconButtonEnables[id]
                ) {
                    button.update(button.scale, button.x, button.y, button.text, button.fontSize);
                }
            }
        }
    };

    /**
     * メッセージウィンドウ表示時の挙動を改造する。
     * メッセージウィンドウ表示時はアイテムスロットは表示しない。
     */
    const _Window_Message_prototype_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_prototype_startMessage.apply(this, arguments);
        const keys = Object.keys(iconButtons);
        if (SceneManager._scene instanceof Scene_Map) {
            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                const button = iconButtons[id].button;

                if(
                    button
                    && iconButtonEnables[id]
                ) {
                    button.hide();
                }
            }
        }
    };

    /**
     * メッセージウィンドウ終了時の挙動を改造する。
     * メッセージウィンドウ終了時はアイテムスロットは表示する。
     */
    const _Window_Message_prototype_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        _Window_Message_prototype_terminateMessage.apply(this, arguments);
        const keys = Object.keys(iconButtons);
        if (SceneManager._scene instanceof Scene_Map ) {
            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                const button = iconButtons[id].button;

                if(
                    button
                    && iconButtonEnables[id]
                ) {
                    button.update(button.scale, button.x, button.y, button.text, button.fontSize);
                }
            }
        }
    };
})();
