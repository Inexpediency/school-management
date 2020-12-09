import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './inputs/create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {}

    @Mutation((returns) => StudentType)
    createStudent(
        @Args('createStudentinput') createStudentinput: CreateStudentInput,
    ) {
        this.studentService
    }
}
