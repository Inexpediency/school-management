import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entities/lesson.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://api-database/school',
            synchronize: true,
            useUnifiedTopology: true,
            entities: [Lesson],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        LessonModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
