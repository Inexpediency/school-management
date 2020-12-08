import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './entities/lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(private readonly lessonService: LessonService) {}

    @Query((returns) => LessonType)
    lesson(
        @Args('id') id: string,
    ): Promise<Lesson> {
        return this.lessonService.getLesson(id);
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string,
    ): Promise<Lesson> {
        return this.lessonService.createLesson(name, startDate, endDate);
    }
}
