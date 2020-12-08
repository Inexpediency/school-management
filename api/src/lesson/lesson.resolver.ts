import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonInput } from './inputs/lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(private readonly lessonService: LessonService) {}

    @Query((returns) => LessonType)
    lesson(@Args('id') id: string): Promise<Lesson> {
        return this.lessonService.getLesson(id);
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
}
