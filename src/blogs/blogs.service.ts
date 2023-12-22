import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './Interfaces/blogs.interface';
import { Model } from 'mongoose';

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

  async incrementLikes(blog: Blog, user_id: string): Promise<any> {
    if (blog.likes.indexOf(user_id) !== -1) {
      throw new UnauthorizedException('Already liked this post');
    }
    blog.likes.push(user_id);
    const new_blog = new this.blogModel(blog);
    return await new_blog.save();
  }

  async incrementViews(blog: Blog, user_id: string): Promise<boolean> {
    if (blog.views.indexOf(user_id) !== -1) {
      return false;
    }
    blog.views.push(user_id);
    const new_blog = new this.blogModel(blog);
    await new_blog.save();
    return true;
  }
}
