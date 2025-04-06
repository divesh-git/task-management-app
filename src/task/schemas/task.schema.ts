import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}
export const TaskSchema = SchemaFactory.createForClass(Task);
