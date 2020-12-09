import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
    constructor(private readonly StudentService: StudentService) {}

    @Mutation((returns) => StudentType)
    createStudent(
        @Args('createStudentinput') createStudentinput: CreateStudentInput,
    )
}
