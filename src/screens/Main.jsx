import { View, Text, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import axios from 'axios';
import { ColorSchemeStore } from 'nativewind/dist/style-sheet/color-scheme';

export default function Main() {
     const [activeCategory,setActiveCategory] = useState('harsh')
     const [category,setCategory] = useState([])
     useEffect(() =>{
          getCategory();
     },[])

     const getCategory = async ()=>{
          try {
               const response  = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
               if(response && response.data){
                    setCategory(response.data.categories)
               }
          } catch (error) {
               console.warn(error.message)
          }
     }

     return (
          <View className="flex-1 bg-white">
               <StatusBar barStyle={'dark-content'} />
               <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    className="pt-8 space-y-6">
                    <View className="flex-row justify-between items-center mx-4 mb-2 ">
                         <Image className='rounded-full' source={require("../assets/avatar.png")} style={{ height: hp(6), width: hp(6.8) }} />
                         <BellIcon color='gray' size={hp(5)} />
                    </View>
                    <View className="mx-4 space-y-2 mb-2">
                         <Text className="text-neutral-600" style={{fontSize:hp(2.7)}}>Hello, <Text className="text-[#f61313]">BSC!</Text> </Text>
                         <View>
                              <Text style={{fontSize:hp(3.9)}} className="font-semibold text-neutral-700">Make your own food</Text>
                              <Text style={{fontSize:hp(3.9)}} className="font-semibold text-neutral-700">With <Text className="text-[#f61313]">JOY</Text></Text>
                         </View>
                    </View>
                    <View className='flex-row items-center ring-fuchsia-500 rounded-full bg-black/5 p-[6px] mx-2'>
                         <TextInput placeholder='Search any dish here'
                         placeholderTextColor={'gray'}
                         style={{fontSize:hp(2.7)}}
                         className='px-6 flex-1 tracking-tighter'
                         ></TextInput>
                         <View className="bg-[#f61313] rounded-full p-3">
                              <MagnifyingGlassIcon size={hp(3.5)} strokeWidth={4} color={'white'} />
                         </View>
                    </View>
                    <View>
                         <Categories categories={category} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                    </View>
               </ScrollView>
          </View>
     )
}