import { ID, Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Id')
export class IdType {
    @Field((type) => ID)
    id: string;
}
