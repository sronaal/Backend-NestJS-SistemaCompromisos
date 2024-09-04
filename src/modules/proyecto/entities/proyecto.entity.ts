import { Cliente } from 'src/modules/cliente/entities/cliente.entity'
import { Observaciones } from 'src/modules/observaciones/entities/observacione.entity'
import { Usuario } from 'src/modules/usuario/entities/usuario.entity'
import { Column, PrimaryGeneratedColumn,Entity, CreateDateColumn, OneToMany, ManyToOne, DeleteDateColumn, JoinColumn } from 'typeorm'


@Entity()

export class Proyecto {


    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string

    @Column()
    descripcion: string

    @Column({nullable:true})
    contenido: string

    @Column({default:'ASIGNADO'})
    estado:string

    @Column()
    prioridad: string

    @Column()
    @CreateDateColumn()
    InicioProyecto: Date

    @Column()
    @DeleteDateColumn()
    deleteColum: Date

    @Column()
    @CreateDateColumn()
    createColum : Date

    @Column({nullable:true})
    FinProyecto: Date 

    @Column({default:0})
    porcentaje: number

    @Column()
    origen: string

    fechaInicio: string
    fechaFin: string

    @ManyToOne(  () => Cliente, (cliente) => cliente.proyectos,{cascade:true})
    cliente: Cliente;

    @ManyToOne(() => Usuario, (usuario) => usuario.proyectosAsignados,{cascade:true}, )
    responsable: Usuario

    @OneToMany(() => Observaciones, observacion => observacion.proyecto,{cascade:true})
    observaciones: Observaciones[]
    
    
}
