/**
 * 
 * APLICANDO OS PRINCÍPIOS SOLID
 *  
 * */

import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProviders";
import { IUsersRespository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
       private usersRepository: IUsersRespository,
       private mailProvider: IMailProvider,


    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists.");
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe',
                email: 'equipe@equipe.com',
            },
            subject: 'Seja Bem Vindo',
            body: '<h1>Você já pode acessar a plataforma</h1>'
        })

    }
}