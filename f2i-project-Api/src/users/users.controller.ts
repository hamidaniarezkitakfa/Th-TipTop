import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeLogginDto } from './dto/serialize.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LogginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/auth-guard';
import { User } from './entities/user.entity';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLogginDto } from './dto/google-login.dto';
import { RolesGuard } from './guards/RolesGuard';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FacebookLoginDto } from './dto/facebook-login.dto';

//const to get the info of the google auth
// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
// );

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
@Serialize(SerializeLogginDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('auth')
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiTags('auth')
  @ApiCreatedResponse({ type: LogginDto })
  @ApiBadRequestResponse()
  @Post('login')
  loggin(@Body() logginDto: LogginDto) {
    return this.authService.login(logginDto);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {}

  //@ApiTags('auth')
  @ApiCreatedResponse({ type: FacebookLoginDto })
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/login/callback')
  async facebookLoggin(@Req() req) {
    const { email, username, picture } = req.user;

    const data = await this.authService.facebookLogin({
      email: email,
      username: username,
      image: picture,
    });
    return data;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  //@ApiTags('auth')
  @ApiCreatedResponse({ type: GoogleLogginDto })
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard('google'))
  @Get('google/login/callback')
  async googleLoggin(@Req() req) {
    const { email, username, picture } = req.user;

    const data = await this.authService.googleLogin({
      email: email,
      username: username,
      image: picture,
    });
    return data;
  }

  @Get('filtredUsers')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({
    name: 'username',
    required: false,
    type: String,
    description: 'Username to search for',
  })
  @ApiQuery({
    name: 'isAdmin',
    required: false,
    type: Boolean,
    description: 'Filter by admin status',
  })
  @ApiQuery({
    name: 'isWorker',
    required: false,
    type: Boolean,
    description: 'Filter by worker status',
  })
  findAllWithFilter(
    @Query('username') username?: string,
    @Query('isAdmin') isAdmin?: boolean,
    @Query('isWorker') isWorker?: boolean,
  ) {
    return this.usersService.findAllWithFilter(username, isAdmin, isWorker);
  }

  @Get('countNewUsers')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ type: User, description: 'Count all NewUsers' })
  countNewUsers() {
    return this.usersService.countNewUsers();
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User, description: 'Get a user with id' })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User, description: 'update a user with id' })
  @ApiNotFoundResponse()
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User, description: 'delete a user with id' })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
