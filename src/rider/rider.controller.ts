import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { RiderService } from './rider.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('rider')
export class RiderController {
  constructor(
    private riderService: RiderService,
  ) { }

  @Get()
  @Roles(Role.Admin)
  getAll() {
    return this.riderService.getAll();
  }

  @Get('myRiders')
  findMyRiders(@Request() { user }) {
    const { _id: accountId } = user._doc;
    return this.riderService.findMyRiders(accountId);
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
    const accountId = req.user._doc._id;
    try {
      return await this.riderService.createRider(newRider.name, newRider.items, accountId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteRider(@Param('id') id: string, @Request() { user }) {
    const rider = this.riderService.deleteRider(id, user._doc._id);
    if (!rider) new NotFoundException('Rider not found');
  }
}
