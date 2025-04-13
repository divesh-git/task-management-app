import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description?: string;

  @Prop({ required: true, default: false }) // default value for isCompleted
  @Field()
  isCompleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field()
  userId: string;  // This will be the user's ID

}
export const TaskSchema = SchemaFactory.createForClass(Task);
