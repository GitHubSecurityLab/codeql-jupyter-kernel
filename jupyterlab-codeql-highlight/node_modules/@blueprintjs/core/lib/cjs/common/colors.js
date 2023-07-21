"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
var tslib_1 = require("tslib");
var colors_1 = require("@blueprintjs/colors");
exports.Colors = tslib_1.__assign(tslib_1.__assign({}, colors_1.LegacyColors), { 
    // "cobalt" is becoming "cerulean" in Blueprint 4.0
    // for a smoother migration, we provide these aliases so that consumers
    // can reference the new names in 3.x
    CERULEAN1: colors_1.LegacyColors.COBALT1, CERULEAN2: colors_1.LegacyColors.COBALT2, CERULEAN3: colors_1.LegacyColors.COBALT3, CERULEAN4: colors_1.LegacyColors.COBALT4, CERULEAN5: colors_1.LegacyColors.COBALT5 });
//# sourceMappingURL=colors.js.map