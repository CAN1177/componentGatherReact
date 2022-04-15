import React from 'react';
import {SafeAreaView} from 'react-native';
import ProductTable from './src/components/02_Component/ProductTable';

const PRODUCTS = [
  {category: '水果', price: '￥1', name: '香蕉🍌'},
  {category: '水果', price: '￥1', name: '火龙果🐲'},
  {category: '水果', price: '￥2', name: '百香果🍹'},
  {category: '蔬菜', price: '￥2', name: 'BoCai'},
  {category: '蔬菜', price: '￥4', name: 'NanGua'},
  {category: '蔬菜', price: '￥1', name: 'WanDou'},
];

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30}}>
      <ProductTable products={PRODUCTS} />
    </SafeAreaView>
  );
}