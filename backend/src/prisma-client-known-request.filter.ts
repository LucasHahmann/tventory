import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from './prisma-errors';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnownRequestFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientKnownRequestFilter.name);

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Log the error
    this.logger.error(exception);

    // Handle and return response
    response.status(500).json({
      statusCode: 500,
      message: 'An error occurred while processing your request.',
      error: 'Internal Server Error',
    });
  }
}
