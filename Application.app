{
	"_Name": "DemoAppMDK",
	"Version": "/DemoAppMDK/Globals/AppDefinition_Version.global",
	"MainPage": "/DemoAppMDK/Pages/Main.page",
	"OnLaunch": [
		"/DemoAppMDK/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/DemoAppMDK/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/DemoAppMDK/Actions/Service/InitializeOffline.action",
	"Styles": "/DemoAppMDK/Styles/Styles.less",
	"Localization": "/DemoAppMDK/i18n/i18n.properties",
	"_SchemaVersion": "23.8"
}