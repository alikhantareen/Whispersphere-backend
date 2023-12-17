export class CreateBlogDto {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly author: string;
  readonly comments: [string];
  readonly likes: number;
  readonly readTime: string;
  readonly views: number;
}

export class CreateCommentDto {
  readonly comment: string;
  readonly user: string;
}
