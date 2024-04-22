"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.listen(3000, function () {
    console.log('Running on port 3000');
});
