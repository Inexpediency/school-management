import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class DeleteLessonInput {
    @IsUUID()
    @Field()
    id: string;
}
