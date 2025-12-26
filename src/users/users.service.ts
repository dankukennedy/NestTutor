import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'Alice', email: 'alice@example.com', role: 'ENGINEER'},
        {id: 2, name: 'Bob', email: 'bob@example.com', role: 'INTERN'},
        {id: 3, name: 'Emmah', email: 'emmah@example.com', role: 'ENGINEER'},
        {id: 4, name: 'Charlie', email: 'charlie@example.com', role: 'ADMIN'},
        {id: 5, name: 'Ken', email: 'ken@example.com', role: 'INTERN'}, 
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }

        return this.users;
  }

  findOne(id:number){
    const user = this.users.find(user => user.id === id);
    return user;
  }

  create(user: {name:string, email:string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser ={
        id: userByHighestId[0].id + 1,
        ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id:number, userUpdate: {name?:string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    this.users = this.users.map(user => {
        if(user.id === id){
            return { ...user, ...userUpdate  };
        }
         return user;
    })
     return this.findOne(id);
    }

    delete(id:number){
        const userToDelete = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return userToDelete;
    }   

}