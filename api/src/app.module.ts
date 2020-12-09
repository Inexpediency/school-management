import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entities/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://api-database/school',
            synchronize: true,
            useUnifiedTopology: true,
            entities: [Lesson, Student],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        LessonModule,
        StudentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
