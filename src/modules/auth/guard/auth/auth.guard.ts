import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class JWTProtect implements CanActivate {


  constructor(jwtService:JwtService){

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    
    console.log(token)
    
   
   
   
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
