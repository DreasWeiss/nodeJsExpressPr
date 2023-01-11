const fs = require('fs');
const path = require('path');

const p = path.join(require.main.path,'data','cart.json');

class Cart {

    static async add(course){
        const cart = await Cart.fetch();

        const idx = cart.courses.findIndex(c => c.id === course.id);
        const candidate = cart.courses[idx];

        if ( candidate ) {
            // has it already
            candidate.count++;
            cart.courses[idx] = candidate;
        } else {
            // need to  be added
            course.count = 1;
            cart.courses.push(course);
        }

        cart.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static async fetch(){
        return new Promise((resolve, reject) => {
           fs.readFile(p, 'utf-8', (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(content));
            }
           });
        });
    }
}

module.exports = Cart;