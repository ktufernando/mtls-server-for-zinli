import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
	try {
        if (req.requestContext?.authentication?.clientCert) {
            
            const clientCert = req.requestContext.authentication.clientCert;
            
            if(!clientCert.issuerDN.includes('Zinli')){
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

app.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "certificate verified succesfully",
  });
});

export default app
