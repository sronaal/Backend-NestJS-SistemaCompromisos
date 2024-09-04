import { IsDate, IsInt, IsString } from 'class-validator'
import { Cliente } from 'src/modules/cliente/entities/cliente.entity'
import { Usuario } from 'src/modules/usuario/entities/usuario.entity'
import { Column, PrimaryGeneratedColumn,Entity, CreateDateColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

@Entity()
export class Compromiso {


    @PrimaryGeneratedColumn()
    id: number


    @Column()
    @IsString()
    nombre: string
    
    @Column({default:''})
    @IsString()
    estado:string

    @IsDate()
    @Column()    
    fechaEntrega: Date

    @CreateDateColumn()
    fechaCreacion: Date

    @IsInt()
    @Column()
    porcentaje:number


    @ManyToOne(() => Cliente, (cliente) => cliente.compromisos, {cascade:true})
    cliente: Cliente

    @ManyToOne(() => Usuario, (usuario) =>  usuario.compromisos, {cascade:true})
    responsable: Usuario
}
