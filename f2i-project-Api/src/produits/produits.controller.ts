import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Query,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { JwtAuthGuard } from 'src/users/guards/auth-guard';
import { User } from 'src/users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/users/guards/RolesGuard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Produit } from './entities/produit.entity';

@Controller('produits')
@UseGuards(JwtAuthGuard)
@ApiTags('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(
    @Body() createProduitDto: CreateProduitDto,
    @CurrentUser() user: User,
  ) {
    return this.produitsService.create(createProduitDto, user);
  }

  @Get('countNewProdcut')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ type: Produit, description: 'Count all NewProdcut' })
  countNewProdcut() {
    return this.produitsService.countNewProdcut();
  }

  @Get()
  @ApiBearerAuth('jwt')
  findAll() {
    return this.produitsService.findAll();
  }

  @Get('newproduct')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiQuery({
    name: 'nomDeProduit',
    required: false,
    type: String,
    description: 'Product name to search for',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date of the range',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'End date of the range',
  })
  findAlNewproductl(
    @Query('nomDeProduit') nomDeProduit?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.produitsService.findAlNewproductl(
      nomDeProduit,
      startDate,
      endDate,
    );
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  findOne(@Param('id') id: string) {
    return this.produitsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitsService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.produitsService.remove(+id);
  }
}
