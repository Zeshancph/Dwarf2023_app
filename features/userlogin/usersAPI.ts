import axios from "axios";
import { Platform } from "react-native";
import { UserEntity } from "./userEntity";

export class UsersAPI {
    static baseUrl: string = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    static async create(user: UserEntity) {
        try {
            console.log("hello abc", user);

            // const result = await axios.post("http://" + this.baseUrl + ':3003/problems', problem);+
           // const result = await axios.post('https://cfa1-5-179-80-204.eu.ngrok.io/auth/signup', {"username": user.username, "password": user.password});
            const result = await axios.post('https://cfa1-5-179-80-204.eu.ngrok.io'+'/auth/signup', user);

            console.log(result);
            return result.data;
        }
        catch(error) {
            console.log("error occured in post" , error);
        }
    }

    static async login(user: UserEntity) {
        // try {
            const result = await axios.post('https://cfa1-5-179-80-204.eu.ngrok.io'+'/auth/login', user);
            
            return result.data;
        // }
  
    }
}