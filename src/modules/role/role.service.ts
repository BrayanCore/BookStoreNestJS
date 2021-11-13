import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) {

    }

    async get(id: number): Promise<Role> {
        
        if(!id) {
            throw new BadRequestException('ID must be sent')
        }

        const role = await this._roleRepository.findOne(id, {
            where: { status: 'ACTIVE' }
        });

        if(!role) {
            throw new NotFoundException();
        }

       return role;

    }

    async getAll(): Promise<Role[]> {

        const roles = await this._roleRepository.find(
            {
                where: { status: 'ACTIVE' }
            }
        );

        // const rolesDTO: roleDto[];
        // return this._mapperService.map<Role[], Role[]>(roles, rolesDTO);
        return roles;

    }

    async create(role: Role): Promise<Role> {

        const savedRole = await this._roleRepository.save(role);

        return savedRole;

    }

    async update(id: number, role: Role): Promise<void> {

        await this._roleRepository.update(id, role);

    }

    async delete(id: number): Promise<void> {

        const roleExists = await this._roleRepository.findOne(
            id, { where: {
                status: 'ACTIVE'
            } }
        );

        if(!roleExists) {
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, 
            {
                status: 'INACTIVE'
            }
        );

    }

}