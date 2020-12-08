import { Resolver, Query } from "@nestjs/graphql";
import { LessonType } from "./types/lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
    @Query(returns => LessonType)
    lesson() {
        return {
            id: 'superid',
            name: 'Physics Class',
            startDate: (new Date()).toISOString(),
            endDate: '',
        }
    }
}
