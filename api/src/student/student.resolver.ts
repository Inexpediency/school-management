import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './inputs/create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
    constructor(private readonly studentService: StudentService) {}

    @Query((returns) => StudentType)
    student(@Args('id') id: string): Promise<StudentType> {
        return this.studentService.getStudent(id);
    }

    @Query((returns) => [StudentType])
    students(): Promise<StudentType[]> {
        return this.studentService.getStudents();
    }

    @Mutation((returns) => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ): Promise<Student> {
        return this.studentService.createStudent(createStudentInput);
    }
}
