import axios from "axios";

const ROOT_URL = 'http://localhost:4000';

class Papilo {
  
    static async getAllProducts() {
        return await axios({
            method: 'POST',
            url: 'http://localhost:4000/product/get',
            headers: {'Content-Type': 'application/json'}
        })
        //    .then(response => response.data.products[0].productName)
        //    .catch(error => error)
        // console.log(data)
        // return data
   }
}

export default Papilo;