import { Compromiso } from 'src/modules/compromisos/entities/compromiso.entity'
import { Proyecto } from 'src/modules/proyecto/entities/proyecto.entity'
import { Column, PrimaryGeneratedColumn,Entity, CreateDateColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

@Entity()
export class Cliente {


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nit:string

    @Column()
    empresa:string

    @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
    proyectos: Proyecto[]

    @OneToMany(() => Compromiso, (compromiso) => compromiso.responsable)
    compromisos: Compromiso;
}
