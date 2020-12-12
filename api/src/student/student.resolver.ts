import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './inputs/create-student.input';
import { DeleteStudentInput } from './inputs/delete-student.input';
import { GetStudentInput } from './inputs/get-student.input';
import { IdImpl } from './interfaces/id.dto';
import { StudentService } from './student.service';
import { IdType } from './types/id.type';
import { StudentType } from './types/student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
    private readonly logger = new Logger(StudentResolver.name);

    constructor(private readonly studentService: StudentService) {}

    @Query((returns) => StudentType)
    student(
        @Args('getStudentInput') getStudentInput: GetStudentInput,
    ): Promise<StudentType> {
        this.logger.log(
            `Getting student with data: ${JSON.stringify(getStudentInput)}`,
        );

        return this.studentService.getStudent(getStudentInput);
    }

    @Query((returns) => [StudentType])
    students(): Promise<StudentType[]> {
        this.logger.log('Getting all students');

        return this.studentService.getStudents();
    }

    @Mutation((returns) => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ): Promise<Student> {
        this.logger.log(
            `Creating student with data: ${JSON.stringify(createStudentInput)}`,
        );

        return this.studentService.createStudent(createStudentInput);
    }

    @Mutation((returns) => IdType)
    deleteStudent(
        @Args('deleteStudentInput') deleteStudentInput: DeleteStudentInput,
    ): IdImpl {
        this.logger.log(
            `Deleting student with data: ${JSON.stringify(deleteStudentInput)}`,
        );

        return this.studentService.deleteStudent(deleteStudentInput);
    }
}
