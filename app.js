"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    var _a, _b;
    try {
        if ((_b = (_a = req.requestContext) === null || _a === void 0 ? void 0 : _a.authentication) === null || _b === void 0 ? void 0 : _b.clientCert) {
            const clientCert = req.requestContext.authentication.clientCert;
            if (!clientCert.issuerDN.includes('Zinli')) {
                console.log('Certificate is not from Zinli');
                return res.status(403).send('Certificate is not valid');
            }
            //TODO: Validar fecha -> clientCert.validity
            //{
            //	"notAfter": "Aug  5 00:28:21 2120 GMT",
            //	"notBefore": "Aug 29 00:28:21 2020 GMT"
            //}
            // The Certificate is VALID
            console.log(`Certificate is VALID and was issued by "${clientCert.issuerDN}" ${clientCert.subjectDN}`);
            next();
        }
        // A Certificate was NOT PROVIDED
        else {
            console.log(`No Certificate provided by the client`);
            return res.status(403).send(`Certificate required`);
        }
    }
    catch (err) {
        return res.sendStatus(404);
    }
});
app.get("/api/test", (req, res, next) => {
    res.status(200).json({
        message: "certificate verified succesfully",
    });
});
exports.default = app;
