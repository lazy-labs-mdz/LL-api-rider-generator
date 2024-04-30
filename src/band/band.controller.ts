import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BandService } from './band.service';
import { CreateBandDto } from './dto/create-band.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateBasicBandDto, UpdateRiderIdsDto, UpdateShareAccountDto } from './dto/update-band.dto';
import { UpdateRiderDto } from 'src/rider/dto/update-rider-dto';

@Controller('band')
@ApiTags('Band')
@ApiBearerAuth('XYZ')
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateBandDto,
    description: "Crear Banda"
  })
  @Post()
  create(@Body() createBandDto: CreateBandDto) {
    return this.bandService.create(createBandDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('my-bands/:id')
  findOne(@Param('id') id: string) {
    return this.bandService.findOne(+id);
  }


  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UpdateBasicBandDto,
    description: "Actualizar titulo y descripcion"
  })
  @Patch('update-basic/:id')
  updateBasic(@Param('id') id: string, @Body() UpdateBasicBandDto: UpdateBasicBandDto) {
    return this.bandService.update(+id, UpdateBasicBandDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UpdateShareAccountDto,
    description: "Actualizar titulo y descripcion"
  })
  @Patch('share-account/:id')
  updateShareAccount(@Param('id') id: string, @Body() UpdateShareAccountDto: UpdateShareAccountDto) {
    return this.bandService.update(+id, UpdateShareAccountDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UpdateRiderIdsDto,
    description: "Actualizar titulo y descripcion"
  })
  @Patch('rider-ids/:id')
  updateRiderIds(@Param('id') id: string, @Body() UpdateRiderIdsDto: UpdateRiderIdsDto) {
    return this.bandService.update(+id, UpdateRiderDto);
  }

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bandService.remove(+id);
  }
}
