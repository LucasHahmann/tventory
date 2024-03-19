export class PrismaKnownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrismaKnownError';
  }
}

export class PrismaClientKnownRequestError extends PrismaKnownError {
  constructor(message: string) {
    super(message);
    this.name = 'PrismaClientKnownRequestError';
  }
}
