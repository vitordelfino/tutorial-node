declare namespace Express {
  interface Request {
    id: string;
    user: {
      _id: string;
      document: string;
      name: string;
    };
  }
}
