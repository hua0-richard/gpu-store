import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from "express";
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  create(@Body() newUser: Record<string, any>) {
    return this.authService.createUser(newUser.email, newUser.password, newUser.name);
  }

  @Post("refresh")
  refresh(@Req() req: Request) {
    const refreshToken = req.cookies?.refresh;
    const user = req.cookies?.user; // only if you actually store this (often you shouldn't)
    return this.authService.refreshAccessToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
