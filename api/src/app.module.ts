import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entities/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';
import { configModule } from './configure.root';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        configModule,
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mongodb',
                url: configService.get<string>('MONGODB_CONNECTION_URL'),
                synchronize: true,
                useUnifiedTopology: true,
                entities: [Lesson, Student],
            }),
            inject: [ConfigService], 
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
