import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.shema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTask: CreateTaskDto) {
    const newTask = new this.taskModel(createTask);
    return await newTask.save();
  }

  findAll() {
    return this.taskModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(
        `Task with ID ${id} is not a valid ObjectId.`,
      );
    }
    return this.taskModel.findById(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
    return task;
  }

  remove(id: string) {
    const task = this.taskModel.findByIdAndDelete(id);
    return task;
  }
}
