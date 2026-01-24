import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { InstancesService } from './instances.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('instances')
export class InstancesController {
    constructor(private readonly instancesService: InstancesService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getMyInstances(@Req() req: any) {
        return this.instancesService.findAll(req.user.email);
    }
}
