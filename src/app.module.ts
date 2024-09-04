import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservacionesModule } from './modules/observaciones/observaciones.module';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import { Observaciones } from './modules/observaciones/entities/observacione.entity';
import { Proyecto } from './modules/proyecto/entities/proyecto.entity';
import { ClienteModule } from './modules/cliente/cliente.module';
import { RolModule } from './modules/rol/rol.module';
import { Rol } from './modules/rol/entities/rol.entity';
import { CompromisosModule } from './modules/compromisos/compromisos.module';
import { AuthModule } from './modules/auth/auth.module';

console.log(process.env.db_user)

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.db_ip,
      port:3306,
      username:process.env.db_user,
      password:process.env.db_password,
      database: process.env.db_name,
      entities:[Usuario, Observaciones,Proyecto, Rol],
      autoLoadEntities:true,
      synchronize:true
    }),

    UsuarioModule, 
    ProyectoModule, ObservacionesModule, ClienteModule, RolModule, CompromisosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  
}
