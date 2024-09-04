import {Column,  PrimaryGeneratedColumn,Entity, CreateDateColumn, OneToMany, OneToOne,} from "typeorm";

import { Usuario } from "src/modules/usuario/entities/usuario.entity";


@Entity()
export class Rol {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    rol: string


    



}
