import { Field, ObjectType } from "@nestjs/graphql";
import { UserDto } from "../..//model/user.model";

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => UserDto)
  user: UserDto;
}