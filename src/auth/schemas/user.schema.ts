import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'User with same email already registered.'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  following: [string];

  @Prop()
  followers: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
