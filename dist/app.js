"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./api"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(api_1.default);
mongoose_1.default.connect(uri, {}).then(() => console.log('Connected to MongoDB')).catch((error) => console.error('Error connecting to MongoDB:', error));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
