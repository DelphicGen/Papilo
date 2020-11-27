import axios from "axios";

const ROOT_URL = 'http://localhost:4000';

class Papilo {
  
    static async getAllProducts() {
        return await axios({
            method: 'POST',
            url: 'http://localhost:4000/product/get',
            headers: {'Content-Type': 'application/json'}
        })
   }
}

export default Papilo;