import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ProductRow from './ProductRow';

enum RequestStatus {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

interface Product {
  name: string;
  price: string;
  id: number;
  count: number;
}

type Products = Product[];

export default function ProductTable() {
  const [products, setProducts] = useState<Products>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE,
  );

  const total = products.reduce((sum, product) => {
    return sum + Number(product.price) * product.count;
  }, 0);

  useEffect(() => {
    setRequestStatus(RequestStatus.PENDING);
    // 挂了
    // fetch('https://61c48e65f1af4a0017d9966d.mockapi.io/products')
    //   .then(res => res.json())
    //   .then((products: Products) => {
    //     setRequestStatus(RequestStatus.SUCCESS);
    //     setProducts(products);
    //   })
    //   .catch(() => {
    //     setRequestStatus(RequestStatus.PENDING);
    //   });
    
    // 这里用来模拟数据
    let products: Products = [
      {name: 'Sausage', price: '590', count: 5, id: 0},
      {name: 'Bacon', price: '171.00', count: 6, id: 1},
      {name: 'Hat', price: '718', count: 9, id: 2},
      {name: 'Sausage', price: '590', count: 5, id: 3},
      {name: 'Bacon', price: '171.00', count: 6, id: 4},
      {name: 'Hat', price: '718', count: 9, id: 5},
    ];
    setRequestStatus(RequestStatus.SUCCESS);
    setProducts(products);
  }, []);

  const getUpdatedProducts = (product: Product) => {
    const newProducts = [...products];
    for (let index = 0; index < products.length; index++) {
      if (products[index].id === product.id) {
        newProducts[index] = product;
      }
    }

    return newProducts;
  };

  const handleIncrement = (product: Product) => {
    const newProduct: Product = {...product, count: product.count + 1};
    console.log('%c 🍏 count: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', product.count);
    const newProducts: Products = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  const handleDecrement = (product: Product) => {
    const count = product.count - 1 >= 0 ? product.count - 1 : 0;
    console.log('%c 🦐 count: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', count);
    const newProduct: Product = {...product, count: count};
    const newProducts: Products = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  if (requestStatus === RequestStatus.ERROR) {
    return <Text>网络出错了</Text>;
  }
  if (requestStatus === RequestStatus.PENDING) {
    return <Text>加载中...</Text>;
  }
  return (
    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1, fontWeight: 'bold'}}>名称</Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>价格</Text>
        <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>数量</Text>
      </View>
      <View>
        {products.map(product => (
          <ProductRow
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            product={product}
            key={product.id}
          />
        ))}
      </View>
      <Text style={{marginTop: 30, fontWeight: 'bold'}}>总价:{total}</Text>
    </View>
  );
}
