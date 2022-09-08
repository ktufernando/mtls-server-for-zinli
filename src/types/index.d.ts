export {};

declare global {
  namespace Express {
    interface Request {
        requestContext: any;
    }
  }
}