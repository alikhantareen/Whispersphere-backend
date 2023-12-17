import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './Interfaces/blogs.interface';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-blog-dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}
  async findAll(): Promise<Blog[]> {
    return await this.blogModel.find();
  }

  async findOne(id: string): Promise<Blog> {
    return await this.blogModel.findById({
      _id: id,
    });
  }

  async findUserBlogs(id: string): Promise<Blog[]> {
    return await this.blogModel.find({ author: id });
  }

  async createBlog(blog: Blog): Promise<Blog> {
    const newBlog = new this.blogModel(blog);
    return await newBlog.save();
  }

  async deleteBlog(id: string): Promise<any> {
    return await this.blogModel.deleteOne({
      _id: id,
    });
  }

  async updateBlog(id: string, blog: Blog): Promise<Blog> {
    return await this.blogModel.findByIdAndUpdate(id, blog, {
      new: true,
    });
  }

  async addComment(blog: Blog, comment: any): Promise<Blog> {
    blog.comments.push(comment);
    const new_blog = new this.blogModel(blog);
    return await new_blog.save();
  }
}
