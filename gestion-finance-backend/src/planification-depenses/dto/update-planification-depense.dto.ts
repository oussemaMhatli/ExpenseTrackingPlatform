import { PartialType } from '@nestjs/swagger';
import { CreatePlanificationDepenseDto } from './create-planification-depense.dto';

export class UpdatePlanificationDepenseDto extends PartialType(CreatePlanificationDepenseDto) {}
