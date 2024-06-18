import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSignup(): string {
    return 'Signup done';
  }
  getSignin(): string {
    return 'Signup done';
  }
}
