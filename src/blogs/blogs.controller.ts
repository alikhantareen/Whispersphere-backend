import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog-dto';
import { Blog } from './Interfaces/blogs.interface';

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
  createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogServices.createBlog(createBlogDto);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id): Promise<Blog> {
    return this.blogServices.deleteBlog(id);
  }

  @Put(':id')
  update(@Body() updateBlog: CreateBlogDto, @Param('id') id): Promise<Blog> {
    return this.blogServices.updateBlog(id, updateBlog);
  }
}
