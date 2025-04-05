import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateTaskInput {
    @Field(() => String)
    id: Types.ObjectId;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    isCompleted: boolean;

}
