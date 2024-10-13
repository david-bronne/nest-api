import { Injectable } from '@nestjs/common';
import { Ninja } from './entities/ninja.entity';
import { throwError } from 'rxjs';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
private ninjas: Array<Ninja> = [
    { id: 0, name: 'Leornardo', weapon: 'stars' },
    { id: 1, name: 'Rafaelo', weapon: 'nunchucks'}
];

public getNinjas(weapon?: 'stars' | 'nunchucks'): Array<Ninja> {
    if (weapon) {
        return this.ninjas.filter(n => n.weapon === weapon)
    } 
    return this.ninjas;
}

public getOneNinja(id: number): Ninja {
    const ninja: Ninja | undefined = this.ninjas.find(n => n.id === id);
    if (!ninja) {
        throw new Error ('ninja nout found');
    }
    return ninja;
}

public createNinja( createNinja: CreateNinjaDto): Ninja {
const newNinja: Ninja = {
    ...createNinja,
    id: Date.now()
};
    this.ninjas.push(newNinja);
    return newNinja;
}

public updateNinja(id: number, updateNinja: UpdateNinjaDto): Ninja {
    this.ninjas = this.ninjas.map( n => {
        if (n.id === id) {
            return {
                ...n,
                ...updateNinja
            };
        }
        return n
    })
    return this.getOneNinja(id)
};

public deleteNinja(id: number,): Ninja {
    const removedNinja: Ninja = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter( n => n.id !== id);
    return removedNinja
}
}
