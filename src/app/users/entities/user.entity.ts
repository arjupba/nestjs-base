import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';

export type UserDocument = User & Document;
export enum RoleEnum {
  Manager = 'mngr',
  User = 'user',
  Admin = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ type: [String], enum: RoleEnum, default: RoleEnum.User })
  roles: string[];

  @Prop({})
  isEnabled: Boolean;

  view: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseKeywords, {
  paths: ['email', 'firstName', 'lastName'],
});

UserSchema.methods.view = function (full) {
  const view = {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    avatar: this.avatar,
    roles: this.roles,
    isEnabled: this.isEnabled,
  };

  return full
    ? {
        ...view,
        password: this.password,
      }
    : view;
};
