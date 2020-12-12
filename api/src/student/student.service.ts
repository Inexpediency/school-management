import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './inputs/create-student.input';
import { v4 as uuid } from 'uuid';
import { GetStudentInput } from './inputs/get-student.input';
import { DeleteStudentInput } from './inputs/delete-student.input';
import { IdImpl } from './interfaces/id.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    async getStudent(getStudentInput: GetStudentInput): Promise<Student> {
        const student = await this.studentRepository.findOne({
            id: getStudentInput.id,
        });
        if (!student) {
            throw new BadRequestException('No such ID in database');
        }

        return student;
    }

    getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async createStudent(
        createStudentInput: CreateStudentInput,
    ): Promise<Student> {
        const { firstName, lastName } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
        });

        const found = await this.findExist(student);

        return !!found ? found : this.studentRepository.save(student);
    }

    getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                },
            },
        });
    }

    deleteStudent(deleteStudentInput: DeleteStudentInput): IdImpl {
        this.studentRepository.delete({ id: deleteStudentInput.id });

        return { id: deleteStudentInput.id } as IdImpl;
    }

    private async findExist(student: Student): Promise<Student> {
        return this.studentRepository.findOne({
            where: {
                firstName: student.firstName,
                lastName: student.lastName,
            },
        });
    }
}
