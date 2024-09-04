import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity'
import { Usuario } from 'src/modules/usuario/entities/usuario.entity'
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,ManyToOne, ManyToMany} from 'typeorm'


@Entity()
export class Observaciones {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    observacion: string

    @Column()
    @CreateDateColumn()
    fecha: Date

    
    @ManyToOne(() => Usuario, (usuario) => usuario.observaciones)
    usuario: Usuario

    @ManyToOne(() => Proyecto,(proyecto) => proyecto.observaciones)
    proyecto: Proyecto
}
