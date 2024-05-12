import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  @InjectModel('Tag') private readonly tagModel: Model<Tag>

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    return await createdTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }
  

  async findOne(id: string): Promise<Tag> {
    return await this.tagModel.findById(id).exec();
  }
  


  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return await this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
  }
  

  async remove(id: string): Promise<Tag> {
    return await this.tagModel.findByIdAndDelete(id);
  }
  
}
