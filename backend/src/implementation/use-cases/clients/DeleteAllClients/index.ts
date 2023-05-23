import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractDeleteAllClients } from "@domain/use-cases/clients/AbstractDeleteAllClients";

export class DeleteAllClients extends AbstractDeleteAllClients{

    constructor(
        protected clientRepository:IClientRepository
    ){
        super()
    }

    async execute(): Promise<void> {
       await this.clientRepository.deleteAll() 
    }

}