/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/sessions/[id]/route";
exports.ids = ["app/api/chat/sessions/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/sessions/[id]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/chat/sessions/[id]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n// Mock database - replace with actual database implementation\nlet chatSessions = [];\nasync function PATCH(request, { params }) {\n    try {\n        const { title } = await request.json();\n        const sessionId = params.id;\n        // Find and update session\n        const sessionIndex = chatSessions.findIndex((s)=>s.id === sessionId);\n        if (sessionIndex !== -1) {\n            chatSessions[sessionIndex] = {\n                ...chatSessions[sessionIndex],\n                title,\n                lastMessage: new Date().toISOString()\n            };\n        }\n        // In a real app, this would update your database\n        // await db.chatSessions.update({\n        //   where: { id: sessionId },\n        //   data: { title, lastMessage: new Date() }\n        // })\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            session: chatSessions[sessionIndex]\n        });\n    } catch (error) {\n        console.error(\"Error updating chat session:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to update chat session\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    try {\n        const sessionId = params.id;\n        // Remove session and its messages\n        chatSessions = chatSessions.filter((s)=>s.id !== sessionId);\n        // In a real app, this would delete from your database\n        // await db.chatSessions.delete({\n        //   where: { id: sessionId }\n        // })\n        // await db.chatMessages.deleteMany({\n        //   where: { chatSessionId: sessionId }\n        // })\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Error deleting chat session:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to delete chat session\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvc2Vzc2lvbnMvW2lkXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEQ7QUFFNUQsOERBQThEO0FBQzlELElBQUlDLGVBQXNCLEVBQUU7QUFFckIsZUFBZUMsTUFBTUMsT0FBb0IsRUFBRSxFQUFFQyxNQUFNLEVBQThCO0lBQ3RGLElBQUk7UUFDRixNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1GLFFBQVFHLElBQUk7UUFDcEMsTUFBTUMsWUFBWUgsT0FBT0ksRUFBRTtRQUUzQiwwQkFBMEI7UUFDMUIsTUFBTUMsZUFBZVIsYUFBYVMsU0FBUyxDQUFDLENBQUNDLElBQU1BLEVBQUVILEVBQUUsS0FBS0Q7UUFDNUQsSUFBSUUsaUJBQWlCLENBQUMsR0FBRztZQUN2QlIsWUFBWSxDQUFDUSxhQUFhLEdBQUc7Z0JBQzNCLEdBQUdSLFlBQVksQ0FBQ1EsYUFBYTtnQkFDN0JKO2dCQUNBTyxhQUFhLElBQUlDLE9BQU9DLFdBQVc7WUFDckM7UUFDRjtRQUVBLGlEQUFpRDtRQUNqRCxpQ0FBaUM7UUFDakMsOEJBQThCO1FBQzlCLDZDQUE2QztRQUM3QyxLQUFLO1FBRUwsT0FBT2QscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUN2QlMsU0FBUztZQUNUQyxTQUFTZixZQUFZLENBQUNRLGFBQWE7UUFDckM7SUFDRixFQUFFLE9BQU9RLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBT2pCLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRVcsT0FBTztRQUFnQyxHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUNyRjtBQUNGO0FBRU8sZUFBZUMsT0FBT2pCLE9BQW9CLEVBQUUsRUFBRUMsTUFBTSxFQUE4QjtJQUN2RixJQUFJO1FBQ0YsTUFBTUcsWUFBWUgsT0FBT0ksRUFBRTtRQUUzQixrQ0FBa0M7UUFDbENQLGVBQWVBLGFBQWFvQixNQUFNLENBQUMsQ0FBQ1YsSUFBTUEsRUFBRUgsRUFBRSxLQUFLRDtRQUVuRCxzREFBc0Q7UUFDdEQsaUNBQWlDO1FBQ2pDLDZCQUE2QjtRQUM3QixLQUFLO1FBQ0wscUNBQXFDO1FBQ3JDLHdDQUF3QztRQUN4QyxLQUFLO1FBRUwsT0FBT1AscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUN2QlMsU0FBUztRQUNYO0lBQ0YsRUFBRSxPQUFPRSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU9qQixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVXLE9BQU87UUFBZ0MsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDckY7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxrb3R0YVxcSGFja2F0aG9uXFxkaWxlZXBcXGZpbmFuY2lhbC1hbmFseXRpY3MtYXBwXFxhcHBcXGFwaVxcY2hhdFxcc2Vzc2lvbnNcXFtpZF1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5cbi8vIE1vY2sgZGF0YWJhc2UgLSByZXBsYWNlIHdpdGggYWN0dWFsIGRhdGFiYXNlIGltcGxlbWVudGF0aW9uXG5sZXQgY2hhdFNlc3Npb25zOiBhbnlbXSA9IFtdXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChyZXF1ZXN0OiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgaWQ6IHN0cmluZyB9IH0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHRpdGxlIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgIGNvbnN0IHNlc3Npb25JZCA9IHBhcmFtcy5pZFxuXG4gICAgLy8gRmluZCBhbmQgdXBkYXRlIHNlc3Npb25cbiAgICBjb25zdCBzZXNzaW9uSW5kZXggPSBjaGF0U2Vzc2lvbnMuZmluZEluZGV4KChzKSA9PiBzLmlkID09PSBzZXNzaW9uSWQpXG4gICAgaWYgKHNlc3Npb25JbmRleCAhPT0gLTEpIHtcbiAgICAgIGNoYXRTZXNzaW9uc1tzZXNzaW9uSW5kZXhdID0ge1xuICAgICAgICAuLi5jaGF0U2Vzc2lvbnNbc2Vzc2lvbkluZGV4XSxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGxhc3RNZXNzYWdlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW4gYSByZWFsIGFwcCwgdGhpcyB3b3VsZCB1cGRhdGUgeW91ciBkYXRhYmFzZVxuICAgIC8vIGF3YWl0IGRiLmNoYXRTZXNzaW9ucy51cGRhdGUoe1xuICAgIC8vICAgd2hlcmU6IHsgaWQ6IHNlc3Npb25JZCB9LFxuICAgIC8vICAgZGF0YTogeyB0aXRsZSwgbGFzdE1lc3NhZ2U6IG5ldyBEYXRlKCkgfVxuICAgIC8vIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHNlc3Npb246IGNoYXRTZXNzaW9uc1tzZXNzaW9uSW5kZXhdLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGNoYXQgc2Vzc2lvbjpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSBjaGF0IHNlc3Npb25cIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXF1ZXN0OiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgaWQ6IHN0cmluZyB9IH0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSBwYXJhbXMuaWRcblxuICAgIC8vIFJlbW92ZSBzZXNzaW9uIGFuZCBpdHMgbWVzc2FnZXNcbiAgICBjaGF0U2Vzc2lvbnMgPSBjaGF0U2Vzc2lvbnMuZmlsdGVyKChzKSA9PiBzLmlkICE9PSBzZXNzaW9uSWQpXG5cbiAgICAvLyBJbiBhIHJlYWwgYXBwLCB0aGlzIHdvdWxkIGRlbGV0ZSBmcm9tIHlvdXIgZGF0YWJhc2VcbiAgICAvLyBhd2FpdCBkYi5jaGF0U2Vzc2lvbnMuZGVsZXRlKHtcbiAgICAvLyAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uSWQgfVxuICAgIC8vIH0pXG4gICAgLy8gYXdhaXQgZGIuY2hhdE1lc3NhZ2VzLmRlbGV0ZU1hbnkoe1xuICAgIC8vICAgd2hlcmU6IHsgY2hhdFNlc3Npb25JZDogc2Vzc2lvbklkIH1cbiAgICAvLyB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgY2hhdCBzZXNzaW9uOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gZGVsZXRlIGNoYXQgc2Vzc2lvblwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNoYXRTZXNzaW9ucyIsIlBBVENIIiwicmVxdWVzdCIsInBhcmFtcyIsInRpdGxlIiwianNvbiIsInNlc3Npb25JZCIsImlkIiwic2Vzc2lvbkluZGV4IiwiZmluZEluZGV4IiwicyIsImxhc3RNZXNzYWdlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwic3VjY2VzcyIsInNlc3Npb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJERUxFVEUiLCJmaWx0ZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/sessions/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&page=%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&page=%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_kotta_Hackathon_dileep_financial_analytics_app_app_api_chat_sessions_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/sessions/[id]/route.ts */ \"(rsc)/./app/api/chat/sessions/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/sessions/[id]/route\",\n        pathname: \"/api/chat/sessions/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/sessions/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\kotta\\\\Hackathon\\\\dileep\\\\financial-analytics-app\\\\app\\\\api\\\\chat\\\\sessions\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_kotta_Hackathon_dileep_financial_analytics_app_app_api_chat_sessions_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGc2Vzc2lvbnMlMkYlNUJpZCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY2hhdCUyRnNlc3Npb25zJTJGJTVCaWQlNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjaGF0JTJGc2Vzc2lvbnMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNrb3R0YSU1Q0hhY2thdGhvbiU1Q2RpbGVlcCU1Q2ZpbmFuY2lhbC1hbmFseXRpY3MtYXBwJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNrb3R0YSU1Q0hhY2thdGhvbiU1Q2RpbGVlcCU1Q2ZpbmFuY2lhbC1hbmFseXRpY3MtYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzRDtBQUNuSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxca290dGFcXFxcSGFja2F0aG9uXFxcXGRpbGVlcFxcXFxmaW5hbmNpYWwtYW5hbHl0aWNzLWFwcFxcXFxhcHBcXFxcYXBpXFxcXGNoYXRcXFxcc2Vzc2lvbnNcXFxcW2lkXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hhdC9zZXNzaW9ucy9baWRdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2hhdC9zZXNzaW9ucy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGF0L3Nlc3Npb25zL1tpZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxrb3R0YVxcXFxIYWNrYXRob25cXFxcZGlsZWVwXFxcXGZpbmFuY2lhbC1hbmFseXRpY3MtYXBwXFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxzZXNzaW9uc1xcXFxbaWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&page=%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&page=%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();