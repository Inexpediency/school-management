import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) {}

    getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    getLessons(): Promise<Array<Lesson>> {
        return this.lessonRepository.find();
    }

    createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
        });

        return this.lessonRepository.save(lesson);
    }
}
