(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/DemoAppMDK/i18n/i18n.properties":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/i18n/i18n.properties ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Rules/AppUpdateFailure.js":
/*!****************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Rules/AppUpdateFailure.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/DemoAppMDK/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Rules/AppUpdateSuccess.js":
/*!****************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Rules/AppUpdateSuccess.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoAppMDK/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoAppMDK/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/DemoAppMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Rules/OnWillUpdate.js":
/*!************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Rules/OnWillUpdate.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/DemoAppMDK/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/DemoAppMDK/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Rules/ResetAppSettingsAndLogout.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Rules/ResetAppSettingsAndLogout.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/DemoAppMDK/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Rules/onValutaChange.js":
/*!**************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Rules/onValutaChange.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onValutaChange)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function onValutaChange(clientAPI) {
  let valuta = clientAPI.getPageProxy().getControl("valutaProp");
  let valutaChange = clientAPI.getPageProxy().getControl("altraValutaPicker");
  let valutaChangeValue = valutaChange.value();
  valuta.setValue(valutaChangeValue);
}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Styles/Styles.css":
/*!********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Styles/Styles.css ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/DemoAppMDK/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoAppMDK/Styles/Styles.less":
/*!*********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Styles/Styles.less ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/DemoAppMDK/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoAppMDK/Styles/Styles.nss":
/*!********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Styles/Styles.nss ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js":
/*!************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/api.js ***!
  \************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.11.0/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_List.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Pages/Main.page":
/*!******************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Pages/Main.page ***!
  \******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Name":"SectionButton0","Title":"Aggiungi Spesa","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://add","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/DemoAppMDK/Actions/NavToadd_spesa.action"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}],"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/DemoAppMDK/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/DemoAppMDK/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/DemoAppMDK/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Pages/add_spesa.page":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Pages/add_spesa.page ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"Inserisci la data","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsVisible":true,"Separator":true,"Caption":"Data","IsEditable":true,"Mode":"Date"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Scegli Causale","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":["A/R Aeroporto","Ristorante","Hotel"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsVisible":true,"Separator":true,"Caption":"Importo","PlaceHolder":"0","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"valutaProp","IsVisible":true,"Separator":true,"Caption":"Valuta","PlaceHolder":"Euro","Enabled":true,"IsEditable":false},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"altraValutaPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Altra Valuta","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","OnValueChange":"/DemoAppMDK/Rules/onValutaChange.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":["Euro","Dollaro","Sterlina"]},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty2","IsVisible":true,"Separator":true,"Caption":"Cambio","PlaceHolder":"0","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty3","IsVisible":true,"Separator":true,"Caption":"Importo in Euro","PlaceHolder":"0","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.Attachment","_Name":"FormCellAttachment0","IsVisible":true,"Separator":true,"AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AttachmentTitle":"Foto Ricevuta"}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"add_spesa","Caption":"Aggiungi Spesa","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Inserisci spesa","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/DemoAppMDK/Actions/InsOK.action"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"DemoAppMDK","Version":"/DemoAppMDK/Globals/AppDefinition_Version.global","MainPage":"/DemoAppMDK/Pages/Main.page","OnLaunch":["/DemoAppMDK/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/DemoAppMDK/Rules/OnWillUpdate.js","OnDidUpdate":"/DemoAppMDK/Actions/Service/InitializeOffline.action","Styles":"/DemoAppMDK/Styles/Styles.less","Localization":"/DemoAppMDK/i18n/i18n.properties","_SchemaVersion":"23.8","StyleSheets":{"Styles":{"css":"/DemoAppMDK/Styles/Styles.css","ios":"/DemoAppMDK/Styles/Styles.nss","android":"/DemoAppMDK/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/AppUpdate.action":
/*!***************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/AppUpdate.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DemoAppMDK/Rules/AppUpdateFailure.js","OnSuccess":"/DemoAppMDK/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/AppUpdateFailureMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/AppUpdateFailureMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/AppUpdateProgressBanner.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/AppUpdateProgressBanner.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DemoAppMDK/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/AppUpdateSuccessMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/AppUpdateSuccessMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/ClosePage.action":
/*!***************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/ClosePage.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/InsOK.action":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/InsOK.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"InsOK"},"OnSuccess":"/DemoAppMDK/Actions/NavToMain.action","Message":"Spesa inserita correttamente","NumberOfLines":1}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Logout.action":
/*!************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Logout.action ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/LogoutMessage.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/LogoutMessage.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/DemoAppMDK/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/NavToMain.action":
/*!***************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/NavToMain.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMain"},"PageToOpen":"/DemoAppMDK/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/NavToadd_spesa.action":
/*!********************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/NavToadd_spesa.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToadd_spesa"},"PageToOpen":"/DemoAppMDK/Pages/add_spesa.page"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/OnWillUpdate.action":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/OnWillUpdate.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/CloseOffline.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/CloseOffline.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/DemoAppMDK/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/DemoAppMDK/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/CloseOfflineFailureMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/CloseOfflineFailureMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/CloseOfflineSuccessMessage.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/DownloadOffline.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/DownloadOffline.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"ProductCategories","Query":"ProductCategories"},{"Name":"Products","Query":"Products"},{"Name":"ProductTexts","Query":"ProductTexts"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Stock","Query":"Stock"},{"Name":"Suppliers","Query":"Suppliers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/DemoAppMDK/Actions/Service/SyncFailureMessage.action","OnSuccess":"/DemoAppMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/DownloadStartedMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/DownloadStartedMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/DemoAppMDK/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/InitializeOffline.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/InitializeOffline.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"ProductCategories","Query":"ProductCategories"},{"Name":"Products","Query":"Products"},{"Name":"ProductTexts","Query":"ProductTexts"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Stock","Query":"Stock"},{"Name":"Suppliers","Query":"Suppliers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/DemoAppMDK/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/DemoAppMDK/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/InitializeOfflineFailureMessage.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/SyncFailureMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/SyncFailureMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/SyncStartedMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/SyncStartedMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/DemoAppMDK/Actions/Service/UploadOffline.action","OnFailure":"/DemoAppMDK/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/SyncSuccessMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/SyncSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Actions/Service/UploadOffline.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Actions/Service/UploadOffline.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/DemoAppMDK/Actions/Service/DownloadStartedMessage.action","OnFailure":"/DemoAppMDK/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Globals/AppDefinition_Version.global":
/*!***************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Globals/AppDefinition_Version.global ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"com.sap.edm.sampleservice.v2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let demoappmdk_actions_appupdate_action = __webpack_require__(/*! ./DemoAppMDK/Actions/AppUpdate.action */ "./build.definitions/DemoAppMDK/Actions/AppUpdate.action")
let demoappmdk_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/AppUpdateFailureMessage.action */ "./build.definitions/DemoAppMDK/Actions/AppUpdateFailureMessage.action")
let demoappmdk_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./DemoAppMDK/Actions/AppUpdateProgressBanner.action */ "./build.definitions/DemoAppMDK/Actions/AppUpdateProgressBanner.action")
let demoappmdk_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/DemoAppMDK/Actions/AppUpdateSuccessMessage.action")
let demoappmdk_actions_closepage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/ClosePage.action */ "./build.definitions/DemoAppMDK/Actions/ClosePage.action")
let demoappmdk_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./DemoAppMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/DemoAppMDK/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let demoappmdk_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let demoappmdk_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/DemoAppMDK/Actions/ErrorArchive/NavToErrorArchive_List.action")
let demoappmdk_actions_insok_action = __webpack_require__(/*! ./DemoAppMDK/Actions/InsOK.action */ "./build.definitions/DemoAppMDK/Actions/InsOK.action")
let demoappmdk_actions_logout_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Logout.action */ "./build.definitions/DemoAppMDK/Actions/Logout.action")
let demoappmdk_actions_logoutmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/LogoutMessage.action */ "./build.definitions/DemoAppMDK/Actions/LogoutMessage.action")
let demoappmdk_actions_navtoadd_spesa_action = __webpack_require__(/*! ./DemoAppMDK/Actions/NavToadd_spesa.action */ "./build.definitions/DemoAppMDK/Actions/NavToadd_spesa.action")
let demoappmdk_actions_navtomain_action = __webpack_require__(/*! ./DemoAppMDK/Actions/NavToMain.action */ "./build.definitions/DemoAppMDK/Actions/NavToMain.action")
let demoappmdk_actions_onwillupdate_action = __webpack_require__(/*! ./DemoAppMDK/Actions/OnWillUpdate.action */ "./build.definitions/DemoAppMDK/Actions/OnWillUpdate.action")
let demoappmdk_actions_service_closeoffline_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/CloseOffline.action */ "./build.definitions/DemoAppMDK/Actions/Service/CloseOffline.action")
let demoappmdk_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/CloseOfflineFailureMessage.action")
let demoappmdk_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/CloseOfflineSuccessMessage.action")
let demoappmdk_actions_service_downloadoffline_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/DownloadOffline.action */ "./build.definitions/DemoAppMDK/Actions/Service/DownloadOffline.action")
let demoappmdk_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/DownloadStartedMessage.action")
let demoappmdk_actions_service_initializeoffline_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/InitializeOffline.action */ "./build.definitions/DemoAppMDK/Actions/Service/InitializeOffline.action")
let demoappmdk_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/InitializeOfflineFailureMessage.action")
let demoappmdk_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/InitializeOfflineSuccessMessage.action")
let demoappmdk_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/SyncFailureMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/SyncFailureMessage.action")
let demoappmdk_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/SyncStartedMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/SyncStartedMessage.action")
let demoappmdk_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/DemoAppMDK/Actions/Service/SyncSuccessMessage.action")
let demoappmdk_actions_service_uploadoffline_action = __webpack_require__(/*! ./DemoAppMDK/Actions/Service/UploadOffline.action */ "./build.definitions/DemoAppMDK/Actions/Service/UploadOffline.action")
let demoappmdk_globals_appdefinition_version_global = __webpack_require__(/*! ./DemoAppMDK/Globals/AppDefinition_Version.global */ "./build.definitions/DemoAppMDK/Globals/AppDefinition_Version.global")
let demoappmdk_i18n_i18n_properties = __webpack_require__(/*! ./DemoAppMDK/i18n/i18n.properties */ "./build.definitions/DemoAppMDK/i18n/i18n.properties")
let demoappmdk_jsconfig_json = __webpack_require__(/*! ./DemoAppMDK/jsconfig.json */ "./build.definitions/DemoAppMDK/jsconfig.json")
let demoappmdk_pages_add_spesa_page = __webpack_require__(/*! ./DemoAppMDK/Pages/add_spesa.page */ "./build.definitions/DemoAppMDK/Pages/add_spesa.page")
let demoappmdk_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./DemoAppMDK/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_Detail.page")
let demoappmdk_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./DemoAppMDK/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/DemoAppMDK/Pages/ErrorArchive/ErrorArchive_List.page")
let demoappmdk_pages_main_page = __webpack_require__(/*! ./DemoAppMDK/Pages/Main.page */ "./build.definitions/DemoAppMDK/Pages/Main.page")
let demoappmdk_rules_appupdatefailure_js = __webpack_require__(/*! ./DemoAppMDK/Rules/AppUpdateFailure.js */ "./build.definitions/DemoAppMDK/Rules/AppUpdateFailure.js")
let demoappmdk_rules_appupdatesuccess_js = __webpack_require__(/*! ./DemoAppMDK/Rules/AppUpdateSuccess.js */ "./build.definitions/DemoAppMDK/Rules/AppUpdateSuccess.js")
let demoappmdk_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./DemoAppMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/DemoAppMDK/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let demoappmdk_rules_onvalutachange_js = __webpack_require__(/*! ./DemoAppMDK/Rules/onValutaChange.js */ "./build.definitions/DemoAppMDK/Rules/onValutaChange.js")
let demoappmdk_rules_onwillupdate_js = __webpack_require__(/*! ./DemoAppMDK/Rules/OnWillUpdate.js */ "./build.definitions/DemoAppMDK/Rules/OnWillUpdate.js")
let demoappmdk_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./DemoAppMDK/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/DemoAppMDK/Rules/ResetAppSettingsAndLogout.js")
let demoappmdk_services_com_sap_edm_sampleservice_v2_service = __webpack_require__(/*! ./DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service */ "./build.definitions/DemoAppMDK/Services/com_sap_edm_sampleservice_v2.service")
let demoappmdk_styles_styles_css = __webpack_require__(/*! ./DemoAppMDK/Styles/Styles.css */ "./build.definitions/DemoAppMDK/Styles/Styles.css")
let demoappmdk_styles_styles_json = __webpack_require__(/*! ./DemoAppMDK/Styles/Styles.json */ "./build.definitions/DemoAppMDK/Styles/Styles.json")
let demoappmdk_styles_styles_less = __webpack_require__(/*! ./DemoAppMDK/Styles/Styles.less */ "./build.definitions/DemoAppMDK/Styles/Styles.less")
let demoappmdk_styles_styles_nss = __webpack_require__(/*! ./DemoAppMDK/Styles/Styles.nss */ "./build.definitions/DemoAppMDK/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	demoappmdk_actions_appupdate_action : demoappmdk_actions_appupdate_action,
	demoappmdk_actions_appupdatefailuremessage_action : demoappmdk_actions_appupdatefailuremessage_action,
	demoappmdk_actions_appupdateprogressbanner_action : demoappmdk_actions_appupdateprogressbanner_action,
	demoappmdk_actions_appupdatesuccessmessage_action : demoappmdk_actions_appupdatesuccessmessage_action,
	demoappmdk_actions_closepage_action : demoappmdk_actions_closepage_action,
	demoappmdk_actions_errorarchive_errorarchive_syncfailure_action : demoappmdk_actions_errorarchive_errorarchive_syncfailure_action,
	demoappmdk_actions_errorarchive_navtoerrorarchive_detail_action : demoappmdk_actions_errorarchive_navtoerrorarchive_detail_action,
	demoappmdk_actions_errorarchive_navtoerrorarchive_list_action : demoappmdk_actions_errorarchive_navtoerrorarchive_list_action,
	demoappmdk_actions_insok_action : demoappmdk_actions_insok_action,
	demoappmdk_actions_logout_action : demoappmdk_actions_logout_action,
	demoappmdk_actions_logoutmessage_action : demoappmdk_actions_logoutmessage_action,
	demoappmdk_actions_navtoadd_spesa_action : demoappmdk_actions_navtoadd_spesa_action,
	demoappmdk_actions_navtomain_action : demoappmdk_actions_navtomain_action,
	demoappmdk_actions_onwillupdate_action : demoappmdk_actions_onwillupdate_action,
	demoappmdk_actions_service_closeoffline_action : demoappmdk_actions_service_closeoffline_action,
	demoappmdk_actions_service_closeofflinefailuremessage_action : demoappmdk_actions_service_closeofflinefailuremessage_action,
	demoappmdk_actions_service_closeofflinesuccessmessage_action : demoappmdk_actions_service_closeofflinesuccessmessage_action,
	demoappmdk_actions_service_downloadoffline_action : demoappmdk_actions_service_downloadoffline_action,
	demoappmdk_actions_service_downloadstartedmessage_action : demoappmdk_actions_service_downloadstartedmessage_action,
	demoappmdk_actions_service_initializeoffline_action : demoappmdk_actions_service_initializeoffline_action,
	demoappmdk_actions_service_initializeofflinefailuremessage_action : demoappmdk_actions_service_initializeofflinefailuremessage_action,
	demoappmdk_actions_service_initializeofflinesuccessmessage_action : demoappmdk_actions_service_initializeofflinesuccessmessage_action,
	demoappmdk_actions_service_syncfailuremessage_action : demoappmdk_actions_service_syncfailuremessage_action,
	demoappmdk_actions_service_syncstartedmessage_action : demoappmdk_actions_service_syncstartedmessage_action,
	demoappmdk_actions_service_syncsuccessmessage_action : demoappmdk_actions_service_syncsuccessmessage_action,
	demoappmdk_actions_service_uploadoffline_action : demoappmdk_actions_service_uploadoffline_action,
	demoappmdk_globals_appdefinition_version_global : demoappmdk_globals_appdefinition_version_global,
	demoappmdk_i18n_i18n_properties : demoappmdk_i18n_i18n_properties,
	demoappmdk_jsconfig_json : demoappmdk_jsconfig_json,
	demoappmdk_pages_add_spesa_page : demoappmdk_pages_add_spesa_page,
	demoappmdk_pages_errorarchive_errorarchive_detail_page : demoappmdk_pages_errorarchive_errorarchive_detail_page,
	demoappmdk_pages_errorarchive_errorarchive_list_page : demoappmdk_pages_errorarchive_errorarchive_list_page,
	demoappmdk_pages_main_page : demoappmdk_pages_main_page,
	demoappmdk_rules_appupdatefailure_js : demoappmdk_rules_appupdatefailure_js,
	demoappmdk_rules_appupdatesuccess_js : demoappmdk_rules_appupdatesuccess_js,
	demoappmdk_rules_errorarchive_errorarchive_checkforsyncerror_js : demoappmdk_rules_errorarchive_errorarchive_checkforsyncerror_js,
	demoappmdk_rules_onvalutachange_js : demoappmdk_rules_onvalutachange_js,
	demoappmdk_rules_onwillupdate_js : demoappmdk_rules_onwillupdate_js,
	demoappmdk_rules_resetappsettingsandlogout_js : demoappmdk_rules_resetappsettingsandlogout_js,
	demoappmdk_services_com_sap_edm_sampleservice_v2_service : demoappmdk_services_com_sap_edm_sampleservice_v2_service,
	demoappmdk_styles_styles_css : demoappmdk_styles_styles_css,
	demoappmdk_styles_styles_json : demoappmdk_styles_styles_json,
	demoappmdk_styles_styles_less : demoappmdk_styles_styles_less,
	demoappmdk_styles_styles_nss : demoappmdk_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/DemoAppMDK/Styles/Styles.json":
/*!*********************************************************!*\
  !*** ./build.definitions/DemoAppMDK/Styles/Styles.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/DemoAppMDK/jsconfig.json":
/*!****************************************************!*\
  !*** ./build.definitions/DemoAppMDK/jsconfig.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map