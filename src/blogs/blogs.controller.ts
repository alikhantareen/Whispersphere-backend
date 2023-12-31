import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, CreateCommentDto } from './dto/create-blog-dto';
import { Blog } from './Interfaces/blogs.interface';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';

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

  @Get('/user-profile/:id')
  findUserBlogs(@Param('id') id): Promise<Blog[]> {
    return this.blogServices.findUserBlogs(id);
  }

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './public/images/' });
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      success: true,
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post()
  @UseGuards(AuthGuard())
  createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogServices.createBlog(createBlogDto);
  }

  @Post('/comment/:id')
  @UseGuards(AuthGuard())
  async addComment(
    @Body() comment_data: CreateCommentDto,
    @Param('id') id,
  ): Promise<Blog> {
    const blog = await this.blogServices.findOne(id);
    return this.blogServices.addComment(blog, comment_data);
  }

  @Post('/like/:id')
  @UseGuards(AuthGuard())
  async increment_likes(@Body() data: any, @Param('id') id): Promise<any> {
    const blog = await this.blogServices.findOne(id);
    return this.blogServices.incrementLikes(blog, data.userID);
  }

  @Post('/views/:id')
  @UseGuards(AuthGuard())
  async increment_views(@Body() data: any, @Param('id') id): Promise<boolean> {
    const blog = await this.blogServices.findOne(id);
    return this.blogServices.incrementViews(blog, data.userID);
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
