/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View, Image, Text, StyleSheet} from 'react-native';
import ProductTable from './src/components/02_Component/ProductTable';

import ProductTable1 from './src/components/04_state/ProductTable';

const PRODUCTS = [
  {category: '水果', price: '￥1', name: '香蕉🍌'},
  {category: '水果', price: '￥1', name: '火龙果🐲'},
  {category: '水果', price: '￥2', name: '百香果🍹'},
  {category: '蔬菜', price: '￥2', name: '白菜🥬'},
  {category: '蔬菜', price: '￥4', name: '南瓜🎃'},
  {category: '蔬菜', price: '￥1', name: '豌豆'},
];

export default function App() {
  return (
    <SafeAreaView style={{marginHorizontal: 30, flex: 1}}>
      <ProductTable products={PRODUCTS} />
      <View style={styles.container}>
        <Image
          style={styles.container.img}
          source={{
            uri: 'https://cdn.nlark.com/yuque/0/2020/png/395710/1590987048061-avatar/a97b553a-0c70-42b4-a2e6-cccbac9e75f0.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_320%2Ch_320%2Fformat%2Cpng',
          }}
        />
        <Text style={styles.container.name_text}>教父</Text>
      </View>
      <ProductTable1 />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    img: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    name_text: {
      flex: 1,
      fontSize: 18,
      marginLeft: 10,
      color: 'black',
    },
  },
});
