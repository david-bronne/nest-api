import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './entities/ninja.entity';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {

    constructor(private readonly ninjasService: NinjasService){}

    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks'): Array<Ninja> {
    return this.ninjasService.getNinjas(weapon);
    }

    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number): Ninja  {
        try {
            return this.ninjasService.getOneNinja(+id);
        } catch(err) {
            // if (err instanceof xxx)
            throw new NotFoundException;
        }
    }

    @Post() 
    createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto): Ninja {
    return this.ninjasService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id', ParseIntPipe) id: number, @Body() updateNinjaDto: UpdateNinjaDto ): Ninja {
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }
    
    @Delete(':id')
    deleteNinja(@Param('id', ParseIntPipe) id: number): Ninja  {
        return this.ninjasService.deleteNinja(+id);
    }
}

