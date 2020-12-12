import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetStudentInput {
    @IsUUID()
    @Field()
    id: string;
}
