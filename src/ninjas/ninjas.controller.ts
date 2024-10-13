import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjasController {
    @Get()
    getNinjas(@Query('type') type: string) {
    return [{type}];
    }

    @Get(':id')
    getNinja(@Param('id') id: string)  {
        return {};
    }

    @Post() 
    createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return {name: createNinjaDto.name};
    }

    @Put()
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return {
        id,
        name: updateNinjaDto.name};
    }
    
    @Delete(':id')
    deleteNinja(@Param('id') id: string)  {
        return {id};
    }
}

