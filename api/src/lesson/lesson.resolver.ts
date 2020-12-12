import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './entities/lesson.entity';
import { AssignStudentsInput } from './inputs/assing-students.input';
import { GetLessonInput } from './inputs/get-lesson.input';
import { CreateLessonInput } from './inputs/lesson.input';
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
    lesson(@Args('getLessonInput') getLessonInput: GetLessonInput): Promise<Lesson> {
        this.logger.log(`Getting lesson with data: ${JSON.stringify(getLessonInput)}`);

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
        this.logger.log(`Creation lesson with data: ${JSON.stringify(createLessonInput)}`)

        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation((returns) => LessonType)
    assignStudents(
        @Args('assignStudentsInput') assingStudentsInput: AssignStudentsInput,
    ): Promise<Lesson> {
        this.logger.log(`Assigning students to lesson with data: ${JSON.stringify(assingStudentsInput)}`);

        return this.lessonService.assignStudents(assingStudentsInput);
    }

    @ResolveField()
    students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}
