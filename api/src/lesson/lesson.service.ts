import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/lesson.input';
import { AssignStudentsInput } from './inputs/assing-students.input';
import { GetLessonInput } from './inputs/get-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) {}

    getLesson(getLessonInput: GetLessonInput): Promise<Lesson> {
        return this.lessonRepository.findOne({ id: getLessonInput.id });
    }

    getLessons(): Promise<Array<Lesson>> {
        return this.lessonRepository.find();
    }

    createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        return this.lessonRepository.save(lesson);
    }

    async assignStudents(assignStudentsInput: AssignStudentsInput): Promise<Lesson> {
        const { lessonId, studentsIds: students } = assignStudentsInput;

        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [
            ...lesson.students,
            ...students,
        ];

        return this.lessonRepository.save(lesson);
    }
}
