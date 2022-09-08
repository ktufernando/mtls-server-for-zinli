export {};

declare global {
  namespace Express {
    interface Request {
      client: any;
    }
  }
}