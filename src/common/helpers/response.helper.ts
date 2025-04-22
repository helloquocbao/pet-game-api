// src/common/helpers/response.helper.ts
import { BaseResponseDto } from '../dto/base-response.dto';

export function successResponse<T>(data: T, message = 'Success'): BaseResponseDto<T> {
  return {
    statusCode: 200,
    message,
    data,
  };
}

export function errorResponse(
  message = 'Something went wrong',
  statusCode = 400,
  error?: string,
): BaseResponseDto<null> {
  return {
    statusCode,
    message,
    data: null,
    error,
  };
}
