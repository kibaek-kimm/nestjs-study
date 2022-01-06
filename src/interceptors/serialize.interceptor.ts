import { 
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler 
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    console.log("Im running before the handler", context);

    return handler.handle().pipe(
      map((data: any) => {
        // first arg is Dto, second is Entity
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    )
  }
}