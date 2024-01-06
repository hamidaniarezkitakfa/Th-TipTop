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
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from 'src/users/guards/auth-guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { RolesGuard } from 'src/users/guards/RolesGuard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Blog } from './entities/blog.entity';
import { MailchimpService } from './mailchimp/mailchimp.service';
import { SubscribeDto } from './mailchimp/dto/create-mailchimp.dto';

@Controller('blogs')
//@UseGuards(JwtAuthGuard)
@ApiTags('Blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private mailchimpService: MailchimpService,
  ) {}

  @Post('addSubscriber')
  @ApiBody({ type: SubscribeDto })
  @ApiResponse({ status: 200, description: 'Subscription successful.' })
  @ApiResponse({ status: 400, description: 'Invalid email provided.' })
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.mailchimpService.addSubscriber(subscribeDto.email);
  }

  @Post()
  @ApiBearerAuth('jwt')
  create(@Body() createBlogDto: CreateBlogDto, @CurrentUser() user: User) {
    return this.blogsService.create(createBlogDto, user);
  }

  @Get('countNewBlog')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ type: Blog, description: 'Count all NewProdcut' })
  countNewProdcut() {
    return this.blogsService.countNewBlog();
  }

  @Get('findAllwithFilters')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'title blog to search for',
  })
  @ApiQuery({
    name: 'user',
    required: false,
    type: String,
    description: 'user name to search with',
  })
  findAllwithFilters(
    @Query('title') title?: string,
    @Query('user') user?: string,
  ) {
    return this.blogsService.findAllwithFilters(title, user);
  }

  @Get()
  @ApiBearerAuth('jwt')
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
