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
exports.id = "app/api/chat/sessions/route";
exports.ids = ["app/api/chat/sessions/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/sessions/route.ts":
/*!****************************************!*\
  !*** ./app/api/chat/sessions/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n// Mock database - replace with actual database implementation\nconst chatSessions = [];\nlet sessionIdCounter = 1;\nasync function GET() {\n    try {\n        // In a real app, this would query your database\n        // const sessions = await db.chatSessions.findMany({\n        //   where: { userId: currentUser.id },\n        //   orderBy: { lastMessage: 'desc' }\n        // })\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            sessions: chatSessions.sort((a, b)=>new Date(b.lastMessage).getTime() - new Date(a.lastMessage).getTime())\n        });\n    } catch (error) {\n        console.error(\"Error fetching chat sessions:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch chat sessions\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const { title } = await request.json();\n        const newSession = {\n            id: `chat_${sessionIdCounter++}`,\n            title: title || \"New Chat\",\n            lastMessage: new Date().toISOString(),\n            messageCount: 1,\n            createdAt: new Date().toISOString()\n        };\n        chatSessions.push(newSession);\n        // In a real app, this would save to your database\n        // const session = await db.chatSessions.create({\n        //   data: {\n        //     userId: currentUser.id,\n        //     title,\n        //     lastMessage: new Date(),\n        //     messageCount: 1\n        //   }\n        // })\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            chatId: newSession.id,\n            session: newSession\n        });\n    } catch (error) {\n        console.error(\"Error creating chat session:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to create chat session\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvc2Vzc2lvbnMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTREO0FBRTVELDhEQUE4RDtBQUM5RCxNQUFNQyxlQUFzQixFQUFFO0FBQzlCLElBQUlDLG1CQUFtQjtBQUVoQixlQUFlQztJQUNwQixJQUFJO1FBQ0YsZ0RBQWdEO1FBQ2hELG9EQUFvRDtRQUNwRCx1Q0FBdUM7UUFDdkMscUNBQXFDO1FBQ3JDLEtBQUs7UUFFTCxPQUFPSCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTO1lBQ1RDLFVBQVVMLGFBQWFNLElBQUksQ0FBQyxDQUFDQyxHQUFHQyxJQUFNLElBQUlDLEtBQUtELEVBQUVFLFdBQVcsRUFBRUMsT0FBTyxLQUFLLElBQUlGLEtBQUtGLEVBQUVHLFdBQVcsRUFBRUMsT0FBTztRQUMzRztJQUNGLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsaUNBQWlDQTtRQUMvQyxPQUFPYixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVTLE9BQU87UUFBZ0MsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDckY7QUFDRjtBQUVPLGVBQWVDLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1ELFFBQVFiLElBQUk7UUFFcEMsTUFBTWUsYUFBYTtZQUNqQkMsSUFBSSxDQUFDLEtBQUssRUFBRWxCLG9CQUFvQjtZQUNoQ2dCLE9BQU9BLFNBQVM7WUFDaEJQLGFBQWEsSUFBSUQsT0FBT1csV0FBVztZQUNuQ0MsY0FBYztZQUNkQyxXQUFXLElBQUliLE9BQU9XLFdBQVc7UUFDbkM7UUFFQXBCLGFBQWF1QixJQUFJLENBQUNMO1FBRWxCLGtEQUFrRDtRQUNsRCxpREFBaUQ7UUFDakQsWUFBWTtRQUNaLDhCQUE4QjtRQUM5QixhQUFhO1FBQ2IsK0JBQStCO1FBQy9CLHNCQUFzQjtRQUN0QixNQUFNO1FBQ04sS0FBSztRQUVMLE9BQU9uQixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTO1lBQ1RvQixRQUFRTixXQUFXQyxFQUFFO1lBQ3JCTSxTQUFTUDtRQUNYO0lBQ0YsRUFBRSxPQUFPTixPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU9iLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFBRVMsT0FBTztRQUFnQyxHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUNyRjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGtvdHRhXFxIYWNrYXRob25cXGRpbGVlcFxcZmluYW5jaWFsLWFuYWx5dGljcy1hcHBcXGFwcFxcYXBpXFxjaGF0XFxzZXNzaW9uc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcblxuLy8gTW9jayBkYXRhYmFzZSAtIHJlcGxhY2Ugd2l0aCBhY3R1YWwgZGF0YWJhc2UgaW1wbGVtZW50YXRpb25cbmNvbnN0IGNoYXRTZXNzaW9uczogYW55W10gPSBbXVxubGV0IHNlc3Npb25JZENvdW50ZXIgPSAxXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgLy8gSW4gYSByZWFsIGFwcCwgdGhpcyB3b3VsZCBxdWVyeSB5b3VyIGRhdGFiYXNlXG4gICAgLy8gY29uc3Qgc2Vzc2lvbnMgPSBhd2FpdCBkYi5jaGF0U2Vzc2lvbnMuZmluZE1hbnkoe1xuICAgIC8vICAgd2hlcmU6IHsgdXNlcklkOiBjdXJyZW50VXNlci5pZCB9LFxuICAgIC8vICAgb3JkZXJCeTogeyBsYXN0TWVzc2FnZTogJ2Rlc2MnIH1cbiAgICAvLyB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBzZXNzaW9uczogY2hhdFNlc3Npb25zLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGIubGFzdE1lc3NhZ2UpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEubGFzdE1lc3NhZ2UpLmdldFRpbWUoKSksXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgY2hhdCBzZXNzaW9uczpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNoYXQgc2Vzc2lvbnNcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHRpdGxlIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgY29uc3QgbmV3U2Vzc2lvbiA9IHtcbiAgICAgIGlkOiBgY2hhdF8ke3Nlc3Npb25JZENvdW50ZXIrK31gLFxuICAgICAgdGl0bGU6IHRpdGxlIHx8IFwiTmV3IENoYXRcIixcbiAgICAgIGxhc3RNZXNzYWdlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBtZXNzYWdlQ291bnQ6IDEsIC8vIFN0YXJ0IHdpdGggMSBmb3IgdGhlIHdlbGNvbWUgbWVzc2FnZVxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfVxuXG4gICAgY2hhdFNlc3Npb25zLnB1c2gobmV3U2Vzc2lvbilcblxuICAgIC8vIEluIGEgcmVhbCBhcHAsIHRoaXMgd291bGQgc2F2ZSB0byB5b3VyIGRhdGFiYXNlXG4gICAgLy8gY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGRiLmNoYXRTZXNzaW9ucy5jcmVhdGUoe1xuICAgIC8vICAgZGF0YToge1xuICAgIC8vICAgICB1c2VySWQ6IGN1cnJlbnRVc2VyLmlkLFxuICAgIC8vICAgICB0aXRsZSxcbiAgICAvLyAgICAgbGFzdE1lc3NhZ2U6IG5ldyBEYXRlKCksXG4gICAgLy8gICAgIG1lc3NhZ2VDb3VudDogMVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGNoYXRJZDogbmV3U2Vzc2lvbi5pZCxcbiAgICAgIHNlc3Npb246IG5ld1Nlc3Npb24sXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgY2hhdCBzZXNzaW9uOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIGNoYXQgc2Vzc2lvblwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNoYXRTZXNzaW9ucyIsInNlc3Npb25JZENvdW50ZXIiLCJHRVQiLCJqc29uIiwic3VjY2VzcyIsInNlc3Npb25zIiwic29ydCIsImEiLCJiIiwiRGF0ZSIsImxhc3RNZXNzYWdlIiwiZ2V0VGltZSIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwidGl0bGUiLCJuZXdTZXNzaW9uIiwiaWQiLCJ0b0lTT1N0cmluZyIsIm1lc3NhZ2VDb3VudCIsImNyZWF0ZWRBdCIsInB1c2giLCJjaGF0SWQiLCJzZXNzaW9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/sessions/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_kotta_Hackathon_dileep_financial_analytics_app_app_api_chat_sessions_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/sessions/route.ts */ \"(rsc)/./app/api/chat/sessions/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/sessions/route\",\n        pathname: \"/api/chat/sessions\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/sessions/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\kotta\\\\Hackathon\\\\dileep\\\\financial-analytics-app\\\\app\\\\api\\\\chat\\\\sessions\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_kotta_Hackathon_dileep_financial_analytics_app_app_api_chat_sessions_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGc2Vzc2lvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNoYXQlMkZzZXNzaW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNoYXQlMkZzZXNzaW9ucyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNrb3R0YSU1Q0hhY2thdGhvbiU1Q2RpbGVlcCU1Q2ZpbmFuY2lhbC1hbmFseXRpY3MtYXBwJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNrb3R0YSU1Q0hhY2thdGhvbiU1Q2RpbGVlcCU1Q2ZpbmFuY2lhbC1hbmFseXRpY3MtYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnRDtBQUM3SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxca290dGFcXFxcSGFja2F0aG9uXFxcXGRpbGVlcFxcXFxmaW5hbmNpYWwtYW5hbHl0aWNzLWFwcFxcXFxhcHBcXFxcYXBpXFxcXGNoYXRcXFxcc2Vzc2lvbnNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NoYXQvc2Vzc2lvbnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jaGF0L3Nlc3Npb25zXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGF0L3Nlc3Npb25zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxca290dGFcXFxcSGFja2F0aG9uXFxcXGRpbGVlcFxcXFxmaW5hbmNpYWwtYW5hbHl0aWNzLWFwcFxcXFxhcHBcXFxcYXBpXFxcXGNoYXRcXFxcc2Vzc2lvbnNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckotta%5CHackathon%5Cdileep%5Cfinancial-analytics-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();