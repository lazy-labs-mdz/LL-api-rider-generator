import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { RiderService } from './rider.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { UpdateRiderDto } from './dto/update-rider-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('rider')
@ApiTags('Rider')
@ApiBearerAuth('XYZ')
export class RiderController {
  constructor(
    private riderService: RiderService,
  ) { }

  @Get('all')
  @Roles(Role.Admin)
  getAll() {
    return this.riderService.getAll();
  }

  @Get('my-riders')
  findMyRiders(@Request() { user }) {
    return this.riderService.findMyRiders(user.id);
  }

  @Get(':id')
  async findOne(@Param("id") id: string, @Request() { user }) {
    const rider = await this.riderService.findOne(id);
    const { _id: accountId, roles } = user._doc;
    if (!rider) throw new NotFoundException('Rider not found');
    if (rider.accountId.toString() !== accountId &&
      !roles.includes(Role.Admin) &&
      !rider.isPublic) {
      throw new ForbiddenException({ message: 'You do not have permission to access this riders.' })
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

  @Patch(':id')
  async updateRider(@Param('id') id: string, @Body() updateFields: UpdateRiderDto, @Request() { user }) {
    const { _id, roles } = user._doc;
    const rider = await this.riderService.findOne(id);
    if (!rider) throw new NotFoundException('Rider not found');
    if (rider.accountId === _id || roles.includes(Role.Admin)) {
      try {
        return await this.riderService.updateRider(id, updateFields);
      } catch (error) {
        throw error;
      }
    } else {
      throw new ForbiddenException({ message: "You do not have permissions to perform this action" });
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteRider(@Param('id') id: string) {
    const rider = await this.riderService.deleteRider(id);
    if (!rider) throw new NotFoundException('Rider not found');
  }
}
