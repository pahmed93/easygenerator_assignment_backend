import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get('')
  async home(
    @Res() res: any
  ){
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      status: true,
      data: null,
      error: null,
      message: "Nestjs Backend is working",
    });
  }

  @Post('signup')
  async signup(
    @Body() userData: { email_address: string, name: string, password: string },
    @Res() res: any,
  ) {

    try{
      const { email_address, name, password } = userData;
      const user = await this.userService.createUser(email_address, name, password);
      const result = await this.userService.validateUser(email_address, user.password);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        status: true,
        data: {token: result.token, username: result.username},
        error: null,
        message: result.message,
      });
    }
    catch(error)
    {
      console.log("Error=> ",error.message);
      return res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.OK,
        status: true,
        data: null,
        error: error.message,
        message: "Unable to create user",
      });
    }
  }

  @Post('signin')
  async signin(
    @Body() userData: { email_address: string, password: string },
    @Res() res: any,
  ) {
    try{
      const { email_address, password } = userData;
      const result = await this.userService.validateUser(email_address, password);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        status: true,
        data: {token: result.token, username: result.username},
        error: null,
        message: result.message,
      });
    }
    catch(error)
    {
      console.log("Error=> ",error.message);
      return res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.OK,
        status: true,
        data: null,
        error: error.message,
        message: "Unable to login user",
      });
    }
  }
}
