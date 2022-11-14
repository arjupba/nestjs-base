import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VegetablesService } from './vegetables.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { NotFoundInterceptor } from '../../lib/notFoundInterceptor';
import { QueryMen } from '../../lib/queryMenDecorator';

@ApiTags('vegetables')
@UseGuards(JwtAuthGuard)
@Controller('vegetables')
export class VegetablesController {
  constructor(private readonly vegetablesService: VegetablesService) {}

  @Post()
  create(@Body() createVegetableDto: CreateVegetableDto) {
    return this.vegetablesService.create(createVegetableDto);
  }

  @Get()
  findAll(@QueryMen() { query, select, cursor }) {
    return this.vegetablesService.findAll(query, select, cursor);
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  findOne(@Param('id') id: string) {
    return this.vegetablesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  update(
    @Param('id') id: string,
    @Body() updateVegetableDto: UpdateVegetableDto,
  ) {
    return this.vegetablesService.update(id, updateVegetableDto);
  }

  @Delete(':id')
  @UseInterceptors(new NotFoundInterceptor('No vegetable found for given Id'))
  remove(@Param('id') id: string) {
    return this.vegetablesService.remove(id);
  }
}
