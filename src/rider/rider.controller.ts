import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { RiderService } from './rider.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('rider')
export class RiderController {
  constructor(
    private riderService: RiderService,
  ) {}

  @Get()
  @Roles(Role.Admin)
  getAll() {
    return this.riderService.getAll();
  }


  @Get(':id')
  async findOne(@Param("id") id:string) {
    const task = await this.riderService.findOne(id);
    if (!task) throw new NotFoundException('Rider not found');
    return task;
  }

  @Get()
  findMyRiders(@Request() req) {
    
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
  async deleteRider(@Param('id') id:string){
    const rider = this.riderService.deleteRider(id);
    if(!rider) new NotFoundException('Rider not found');
  }
}
