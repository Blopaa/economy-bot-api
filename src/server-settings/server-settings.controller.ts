import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ServerSettingsService } from './server-settings.service';
import { CreateServerSettingDto } from './dto/create-server-setting.dto';
import { UpdateServerSettingDto } from './dto/update-server-setting.dto';

@Controller('server-settings')
export class ServerSettingsController {
  constructor(private readonly serverSettingsService: ServerSettingsService) {}

  @Post()
  create(@Body() createServerSettingDto: CreateServerSettingDto) {
    return this.serverSettingsService.create(createServerSettingDto);
  }

  @Get()
  findAll() {
    return this.serverSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverSettingsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServerSettingDto: UpdateServerSettingDto) {
    return this.serverSettingsService.update(+id, updateServerSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverSettingsService.remove(+id);
  }
}
