"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const serverOptions = {
    // Certificate Settings
    ca: fs_1.default.readFileSync(path_1.default.join(__dirname, 'certs/ca.crt')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, 'certs/server.crt')),
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, 'certs/server.key')),
    // Cert-Based Mutual Auth settings
    requestCert: true,
    rejectUnauthorized: false,
};
const server = new https_1.default.Server(serverOptions, app);
app.use((req, res, next) => {
    try {
        // Get the Certificate the User provided
        let cert = (req.socket).getPeerCertificate();
        // The Certificate is VALID
        if (req.client.authorized) {
            console.log(`Certificate "${cert.subject.CN}" is VALID and was issued by "${cert.issuer.CN}"`);
            next();
        }
        // The Certificate is NOT VALID
        else if (cert.subject) {
            console.log(`Certificates from "${cert.issuer.CN}" are NOT VALID. User "${cert.subject.CN}"`);
            res.sendStatus(403).send(`Certificate is not valid`);
        }
        // A Certificate was NOT PROVIDED
        else {
            console.log(`No Certificate provided by the client`);
            res.status(403).send(`Certificate required`);
        }
    }
    catch (err) {
        res.sendStatus(404);
    }
});
app.get("/api/test", (req, res, next) => {
    res.status(200).json({
        message: "certificate verified succesfully",
    });
});
//server.listen(port, () => {
//    console.log(`[-] Server Listening on Port ${port}`);
//});
exports.default = server;
