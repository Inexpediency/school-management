import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/lesson.input';
import { AssignStudentsInput } from './inputs/assing-students.input';
import { GetLessonInput } from './inputs/get-lesson.input';
import { IdImpl } from 'src/student/interfaces/id.interface';
import { DeleteLessonInput } from './inputs/delete-lesson.input';
import { IdType } from 'src/student/types/id.type';
import { UnassignStudentsInput } from './inputs/unassign-students.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) {}

    async getLesson(getLessonInput: GetLessonInput): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOne({
            id: getLessonInput.id,
        });
        if (!lesson) {
            throw new BadRequestException('No such Id in database');
        }

        return lesson;
    }

    getLessons(): Promise<Array<Lesson>> {
        return this.lessonRepository.find();
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        const found = await this.findExist(lesson);
        if (found) {
            found.students = [...found.students, ...students];

            await this.lessonRepository.update({ id: found.id }, found);

            return found;
        }

        return this.lessonRepository.save(lesson);
    }

    deleteLesson(deleteLessonInput: DeleteLessonInput): IdImpl {
        this.lessonRepository.delete({ id: deleteLessonInput.id });

        return { id: deleteLessonInput.id } as IdImpl;
    }

    async assignStudents(
        assignStudentsInput: AssignStudentsInput,
    ): Promise<Lesson> {
        const { lessonId, studentsIds: students } = assignStudentsInput;

        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        if (!lesson) {
            throw new BadRequestException(
                'No lesson with such {id} in database',
            );
        }

        lesson.students = [...lesson.students, ...students];

        return this.lessonRepository.save(lesson);
    }

    async unassignStudents(
        unassignStudentsInput: UnassignStudentsInput,
    ): Promise<Lesson> {
        const { lessonId, studentsIds } = unassignStudentsInput;

        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = lesson.students.filter(
            (sId) => !studentsIds.includes(sId),
        );

        return this.lessonRepository.save(lesson);
    }

    private async findExist(lesson: Lesson): Promise<Lesson> {
        return this.lessonRepository.findOne({
            where: {
                name: lesson.name,
                startDate: lesson.startDate,
                endDate: lesson.endDate,
            },
        });
    }
}
