import { Logger } from '@nestjs/common';
import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { IdImpl } from 'src/student/interfaces/id.interface';
import { StudentService } from 'src/student/student.service';
import { IdType } from 'src/student/types/id.type';
import { Lesson } from './entities/lesson.entity';
import { AssignStudentsInput } from './inputs/assing-students.input';
import { DeleteLessonInput } from './inputs/delete-lesson.input';
import { GetLessonInput } from './inputs/get-lesson.input';
import { CreateLessonInput } from './inputs/lesson.input';
import { UnassignStudentsInput } from './inputs/unassign-students.input';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
    private readonly logger = new Logger(LessonResolver.name);

    constructor(
        private readonly lessonService: LessonService,
        private readonly studentService: StudentService,
    ) {}

    @Query((returns) => LessonType)
    lesson(
        @Args('getLessonInput') getLessonInput: GetLessonInput,
    ): Promise<Lesson> {
        this.logger.log(
            `Getting lesson with data: ${JSON.stringify(getLessonInput)}`,
        );

        return this.lessonService.getLesson(getLessonInput);
    }

    @Query((returns) => [LessonType])
    lessons(): Promise<Array<Lesson>> {
        this.logger.log('Getting all lessons');

        return this.lessonService.getLessons();
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ): Promise<Lesson> {
        this.logger.log(
            `Creation lesson with data: ${JSON.stringify(createLessonInput)}`,
        );

        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation((returns) => IdType)
    deleteLesson(
        @Args('deleteLessonInput') deleteLessonInput: DeleteLessonInput,
    ): IdImpl {
        this.logger.log(
            `Deleting lesson with data: ${JSON.stringify(deleteLessonInput)}`,
        );

        return this.lessonService.deleteLesson(deleteLessonInput);
    }

    @Mutation((returns) => LessonType)
    assignStudents(
        @Args('assignStudentsInput') assingStudentsInput: AssignStudentsInput,
    ): Promise<Lesson> {
        this.logger.log(
            `Assigning students to lesson with data: ${JSON.stringify(
                assingStudentsInput,
            )}`,
        );

        return this.lessonService.assignStudents(assingStudentsInput);
    }

    @Mutation((returns) => LessonType)
    unassignStudents(
        @Args('unassignStudentsInput')
        unassignStudentsInput: UnassignStudentsInput,
    ): Promise<Lesson> {
        this.logger.log(
            `Unassigning students to lesson with data: ${JSON.stringify(
                unassignStudentsInput,
            )}`,
        );

        return this.lessonService.unassignStudents(unassignStudentsInput);
    }

    @ResolveField()
    students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}
