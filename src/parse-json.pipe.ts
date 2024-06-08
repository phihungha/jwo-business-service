import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ParseJsonPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    try {
      return JSON.parse(value);
    } catch {
      throw new WsException(`Property ${metadata.data} contains invalid JSON`);
    }
  }
}
