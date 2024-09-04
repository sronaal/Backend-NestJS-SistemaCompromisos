import { Observaciones } from "src/modules/observaciones/entities/observacione.entity";
import { Proyecto } from "src/modules/proyecto/entities/proyecto.entity";
import { Rol } from "src/modules/rol/entities/rol.entity";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, Unique, BeforeInsert, } from "typeorm";
import * as hash from 'md5'
import { Compromiso } from "src/modules/compromisos/entities/compromiso.entity";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_google?: string;

  @Column()
  nombre_completo: string;

  @Column()
  usuario: string;


  @Column()
  correo: string;

  @Column()
  password: string;



  @ManyToOne(() => Rol)
  rol: Rol

  @OneToMany(() => Proyecto, proyecto => proyecto.responsable)
  proyectosAsignados: Proyecto[];

  @OneToMany(() => Observaciones, observacion => observacion.usuario)
  observaciones: Observaciones[]

  @OneToMany(() => Compromiso, (compromiso) => compromiso.responsable)
  compromisos : Compromiso;
 
 
 
  @BeforeInsert()
  hashPassword() {
    let hashPassword = hash(this.password)
    this.password = hashPassword
  }
P
  @BeforeInsert()
  asignacionRol() {
   
   if(!this.rol) {

    this.rol = new Rol()
    this.rol.id = 1

   }
  }

 
 


 
 



}

