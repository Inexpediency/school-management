import { Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";

export class CreateStudentInput {
    @MinLength(2)
    @Field()
    name: string;

    @MinLength(2)
    @Field()
    lastName: string;
}
