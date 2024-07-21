import { Injectable, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors = []) => {
      if (this.isDetailedOutputDisabled) {
        return new WsException('Bad request.');
      }

      const errors = this.flattenValidationErrors(validationErrors);
      return new WsException(errors);
    };
  }
}

@Injectable()
export class RpcValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors = []) => {
      if (this.isDetailedOutputDisabled) {
        return new RpcException('Bad request.');
      }

      const errors = this.flattenValidationErrors(validationErrors);
      return new RpcException(errors);
    };
  }
}
