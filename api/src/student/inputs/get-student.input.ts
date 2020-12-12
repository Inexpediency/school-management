import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class GetStudentInput {
    @IsUUID()
    @Field((type) => ID)
    id: string;
}
