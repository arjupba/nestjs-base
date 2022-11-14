import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class QueryMenExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();

    if (req.querymen && req.querymen.error) {
      res.status(400).json(req.querymen.error);
    } else {
      res.status(exception.status).json(exception.response);
    }
  }
}
