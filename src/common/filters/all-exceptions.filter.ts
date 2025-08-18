import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { logger } from '../logger/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      message = res.message || res || message;
    } else if (exception instanceof Error) {
      message = exception.message;
      logger.error('Unhandled exception', { message, stack: exception.stack });
    }

    response.status(status).json({
      status: 'error',
      message,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
