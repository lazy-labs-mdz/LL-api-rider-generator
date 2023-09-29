import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { PresetService } from './preset.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { CreatePresetDto } from './dto/create-preset.dto';
import { UpdatePresetDto } from './dto/update-preset.dto';

@Controller('preset')
export class PresetController {
  constructor(private presetService: PresetService) { }

  @Get()
  @Roles(Role.Admin)
  getAllPresets() {
    return this.presetService.getAllPresets();
  }
  @Get('myPresets')
  @Roles(Role.Admin, Role.UserPremium)
  getMyPreset(@Request() { user }) {
    const { _id } = user._doc;
    return this.presetService.getMyPreset(_id);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.UserPremium)
  async getById(@Param('id') id: string, @Request() { user }) {
    const { _id, roles } = user._doc;
    const preset = await this.presetService.getById(id);
    if (!preset) throw new NotFoundException('Preset not found');
    if (preset.accountId === _id || roles.includes(Role.Admin)) {
      return preset;
    } else {
      throw new ForbiddenException({ message: 'You do not have permissions to perform this action' });
    }
  }

  @Post()
  @Roles(Role.Admin, Role.UserPremium)
  async create(@Body() newPreset: CreatePresetDto, @Request() { user }) {
    const { _id } = user._doc;
    try {
      return await this.presetService.create(newPreset.name, newPreset.items, _id, newPreset.favorite, newPreset.icon);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.UserPremium)
  async update(@Param('id') id: string, @Body() updatePreset: UpdatePresetDto, @Request() { user }) {
    const { _id, roles } = user._doc;
    const preset = await this.presetService.getById(id);
    if (!preset) throw new NotFoundException('Preset not found');
    if (preset.accountId === _id || roles.includes(Role.Admin)) {
      try {
        return await this.presetService.update(id, updatePreset);
      } catch (error) {
        throw error;
      }
    } else {
      throw new ForbiddenException({ message: "You do not have permissions to perform this action" });
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.Admin, Role.UserPremium)
  async deletePreset(@Param('id') id: string, @Request() { user }) {
    const { _id, roles } = user._doc;
    const preset = await this.presetService.getById(id);
    if (!preset) throw new NotFoundException('Preset not found');
    if (preset.accountId === _id || roles.includes(Role.Admin)) {
      try {
        return await this.presetService.deletePreset(id);
      } catch (error) {
        throw error;
      }
    } else {
      throw new ForbiddenException({ message: "You do not have permissions to perform this action" });
    }
  }
}
