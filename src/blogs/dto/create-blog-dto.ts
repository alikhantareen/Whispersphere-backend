export class CreateBlogDto {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly author: string;
  readonly comments: [string];
  readonly likes: [string];
  readonly readTime: string;
  readonly views: [string];
}

export class CreateCommentDto {
  readonly comment: string;
  readonly user: string;
}
