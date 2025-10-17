"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewLookupCode = generateNewLookupCode;
const lookup_code_model_1 = __importDefault(require("../models/lookups-models/lookup-code.model"));
function generateNewLookupCode(type) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(type, 'type');
        const lookupCodeDoc = yield lookup_code_model_1.default.findOne({ type });
        // console.log(lookupCodeDoc, "lookupCOde");
        if (!lookupCodeDoc) {
            throw new Error(`No lookup code found for type: ${type}`);
        }
        let lastNumber = lookupCodeDoc.lastNumber;
        let newNumber;
        if (lastNumber === 0) {
            newNumber = lookupCodeDoc.firstNumber + 1;
        }
        else {
            newNumber = lastNumber + 1;
        }
        const newNumberString = newNumber.toString().padStart(2, '0');
        const newCode = `${lookupCodeDoc.code}${newNumberString}`;
        yield lookup_code_model_1.default.updateOne({ type }, { lastNumber: newNumber });
        return newCode;
    });
}
