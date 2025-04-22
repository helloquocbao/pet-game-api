// src/common/interceptors/transform-response.interceptor.ts

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { BaseResponseDto } from '../dto/base-response.dto';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, BaseResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: 200,
          message: 'OK',
          data,
        };
      }),
    );
  }
}
