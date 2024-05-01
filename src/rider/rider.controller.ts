import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { RiderService } from './rider.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { UpdateRiderDto } from './dto/update-rider-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRiderNameDto } from './dto/update-rider-name.dto';
import { UpdateRiderPublicDto } from './dto/update-rider-public.dto';
import { UpdateRiderFavoriteDto } from './dto/update-rider-favorite.dto';

@Controller('rider')
@ApiTags('Rider')
@ApiBearerAuth('XYZ')
export class RiderController {
  constructor(
    private riderService: RiderService,
  ) { }

  @Get('private/all')
  @Roles(Role.Admin)
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.riderService.getAll(limit, page);
  }

  @Get('my-riders')
  findMyRiders(@Request() { user }) {
    return this.riderService.findMyRiders(user.id);
  }

  @Get(':id')
  async findOne(@Param("id") id: string, @Request() { user }) {
    const rider = await this.riderService.findOne(id);
    const accountId = user.id;
    if (rider.accountId.toString() !== accountId || !rider.isPublic) {
      throw new NotFoundException('Rider not found');
    }
    return rider;
  }

  @Post()
  async createRider(@Body() newRider: CreateRiderDto, @Request() req) {
    const accountId = req.user.id;
    try {
      return await this.riderService.createRider(newRider.name, newRider.items, accountId);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update-name-rider/:id')
  async updateRiderName(@Param('id') id: string, @Body() updateRiderName: UpdateRiderNameDto, @Request() { user }) {
    const { id: accountId } = user;
    const rider = await this.riderService.findOne(id);
    if (rider?.accountId === accountId) {
      return await this.riderService.updateRiderOneField(id, updateRiderName)
    } else {
      throw new NotFoundException('Rider not found');
    }
  }

  @Patch('update-favorite-rider/:id')
  async updateRiderFavorite(@Param('id') id: string, @Body() updateRiderfavorite: UpdateRiderFavoriteDto, @Request() { user }) {
    const { id: accountId } = user;
    const rider = await this.riderService.findOne(id);
    if (rider?.accountId === accountId) {
      return await this.riderService.updateRiderOneField(id, updateRiderfavorite)
    } else {
      throw new NotFoundException('Rider not found');
    }
  }

  @Patch('update-public-rider/:id')
  async updateRiderPublic(@Param('id') id: string, @Body() updateRiderPublic: UpdateRiderPublicDto, @Request() { user }) {
    const { id: accountId } = user;
    const rider = await this.riderService.findOne(id);
    if (rider?.accountId === accountId) {
      return await this.riderService.updateRiderOneField(id, updateRiderPublic)
    } else {
      throw new NotFoundException('Rider not found');
    }
  }

  @Patch(':id')
  async updateRider(@Param('id') id: string, @Body() updateFields: UpdateRiderDto, @Request() req) {
    const accountId = req.user.id;
    const rider = await this.riderService.findOne(id);

    if (rider.accountId === accountId) {
      try {
        return await this.riderService.updateRider(id, updateFields);
      } catch (error) {
        throw new NotFoundException('Error search rider');
      }
    } else {
      throw new NotFoundException('Rider not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteRider(@Param('id') id: string, @Request() { user }) {
    const findRider = await this.riderService.findOne(id);
    if (findRider.accountId === user?.id) {
      return this.riderService.deleteRider(id);
    } else {
      throw new NotFoundException('Rider not found');
    }
  }
}
