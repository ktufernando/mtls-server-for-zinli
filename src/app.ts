import fs from "fs";
import path from "path";
import https from "https";
import {TLSSocket} from "tls"
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(cors());

const serverOptions = {
	// Certificate Settings
    ca: fs.readFileSync(path.join(__dirname, '../../certs/ca.crt')),
	cert: fs.readFileSync(path.join(__dirname, '../../certs/server.crt')),
	key: fs.readFileSync(path.join(__dirname, '../../certs/server.key')),

	// Cert-Based Mutual Auth settings
	requestCert: true,
	rejectUnauthorized: false,
}

const server = new https.Server(serverOptions, app);

app.use((req: Request, res: Response, next: NextFunction) => {
	try {
		// Get the Certificate the User provided
		let cert = ((req.socket) as TLSSocket).getPeerCertificate();

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
	} catch (err) {
		res.sendStatus(404);
	}
});

app.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "certificate verified succesfully",
  });
});

//server.listen(port, () => {
//    console.log(`[-] Server Listening on Port ${port}`);
//});

export default server
