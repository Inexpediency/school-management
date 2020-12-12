import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class DeleteStudentInput {
    @IsUUID()
    @Field()
    id: string;
}
