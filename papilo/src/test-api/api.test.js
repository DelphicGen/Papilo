
import '@testing-library/jest-dom/extend-expect'
import Papilo from './api';

jest.mock('axios');
const mockLoadData = (Papilo.getAllProducts = jest.fn());

test('get produts successfully', async () => {
    mockLoadData.mockResolvedValue({
        products: [
            {
                id: 1,
                price: 10000,
                productName: "Celana",
                sellerId: 1,
                stock: 100,
                type: "Celana"
            }
        ]
    });
    const products = await Papilo.getAllProducts();
    expect(products.products[0].price).toEqual(10000);
})