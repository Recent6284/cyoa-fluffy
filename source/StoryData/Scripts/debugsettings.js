/*
        Debug Settings.

(function () {
        Setting.addHeader("Debug Settings");

        function initSettingDebug() {
                Config.debug = settings.debug;
        }
        Setting.addToggle("debug", {
                label    : "Enable test/debug mode?",
                default  : false,
                onInit   : initSettingDebug,
                onChange : function () {
                        initSettingDebug();
                        window.location.reload();
                }
        });
})();
*/