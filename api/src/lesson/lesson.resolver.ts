import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './entities/lesson.entity';
import { AssignStudentsInput } from './inputs/assing-students.input';
import { GetLessonInput } from './inputs/get-lesson.input';
import { CreateLessonInput } from './inputs/lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(
        private readonly lessonService: LessonService,
        private readonly studentService: StudentService,
    ) {}

    @Query((returns) => LessonType)
    lesson(@Args('getLessonInput') getLessonInput: GetLessonInput): Promise<Lesson> {
        return this.lessonService.getLesson(getLessonInput);
    }

    @Query((returns) => [LessonType])
    lessons(): Promise<Array<Lesson>> {
        return this.lessonService.getLessons();
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ): Promise<Lesson> {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation((returns) => LessonType)
    assignStudents(
        @Args('assignStudentsInput') assingStudentsInput: AssignStudentsInput,
    ): Promise<Lesson> {
        return this.lessonService.assignStudents(assingStudentsInput);
    }

    @ResolveField()
    students(@Parent() lesson: Lesson) {
        console.log(lesson);
        return this.studentService.getManyStudents(lesson.students);
    }
}
