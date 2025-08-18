import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      message = res.message || res || message;
    } else if (exception instanceof Error) {
      message = exception.message;
      // ✅ log an toàn, không dùng template literal với unknown
      this.logger.error('Unhandled exception', exception.stack);
    }

    response.status(status).json({
      status: 'error',
      message,
      data: null,
    });
  }
}
