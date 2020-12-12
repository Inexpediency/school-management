import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetLessonInput {
    @IsUUID()
    @Field()
    id: string;
}