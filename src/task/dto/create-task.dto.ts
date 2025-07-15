import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateTaskDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  isCompleted: boolean;

  @Field({ nullable: true })
  imageUrl?: string;

}
