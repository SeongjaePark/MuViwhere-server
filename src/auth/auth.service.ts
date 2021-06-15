import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRound = 10;

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRound);
  }
}
