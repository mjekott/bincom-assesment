import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getAllPollingCenters() {
    const polling_units = await this.appService.getAllPollingCenters();
    return { polling_units };
  }

  @Get('/polling/:id/result/:name')
  @Render('polling_result')
  async getResultPollingCenter(@Param() param) {
    const results = await this.appService.getResultPollingCenter(param.id);
    const name = param.name;
    return { results, name };
  }

  @Get('/lga')
  @Render('lga')
  async getAllLga(@Query('name') name) {
    let parties = [];
    const lgas = await this.appService.getAllLga();
    if (name) {
      parties = await this.appService.getResultPerLga(name);
    }

    return { lgas, parties, name };
  }

  @Get('/add')
  @Render('add')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async addPollingUnitPage(@Req() req) {
    const parties = await this.appService.getAllParties();
    const polling_units = await this.appService.getAllPollingCenters();
    const messages = await req.consumeFlash('info');
    return { parties, polling_units, messages };
  }

  @Post('/add')
  async createPollingUnit(@Body() body, @Req() req, @Res() res) {
    body['user_ip_address'] = req.ip;
    body['date_entered'] = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const success = await this.appService.createPuResult(body);
    if (success) {
      await req.flash('info', 'Vote Added Successfully');
      res.redirect('/add');
    } else {
      await req.flash('info', 'Failes');
      res.redirect('/add');
    }
  }
}
