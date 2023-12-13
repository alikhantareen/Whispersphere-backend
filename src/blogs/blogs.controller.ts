import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog-dto';
import { Blog } from './Interfaces/blogs.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/blogs')
export class BlogsController {
  constructor(private readonly blogServices: BlogsService) {}

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Blog> {
    return this.blogServices.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogServices.createBlog(createBlogDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteBlog(@Param('id') id): Promise<Blog> {
    return this.blogServices.deleteBlog(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Body() updateBlog: CreateBlogDto, @Param('id') id): Promise<Blog> {
    return this.blogServices.updateBlog(id, updateBlog);
  }
}
