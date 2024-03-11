import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Dummy } from '../constants/const';

export default function Categories({ activeCategory, handelChangeCategory }) {
     useEffect(() => {
          // console.log(activeCategory)
          console.warn(activeCategory)
     }, [activeCategory])
     return (
          <Animated.View entering={FadeInDown.duration(500).springify()}>
               <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    className="space-x-4"
                    contentContainerStyle={{ paddingHorizontal: 15 }}
               >
                    {
                         Dummy.map((cat, index) => {
                              let isActive = cat.name === activeCategory;
                              let activeClassButton = isActive ? 'bg-[#f61313]' : 'bg-black/10'
                              return (
                                   <TouchableOpacity
                                        key={index}
                                        onPress={() => handelChangeCategory(cat.name)}
                                        className='flex items-center space-y-1'>
                                        <View className={"rounded-full p-[6px] m-5 " + activeClassButton}>
                                             <Image
                                                  source={{ uri: cat.i, }}
                                                  style={{ width: hp(7), height: hp(7) }}
                                                  className="rounded-full" />
                                        </View>
                                        <Text className='text-neutral-700' style={{ fontSize: hp(2.6) }}>
                                             {cat.name}
                                        </Text>
                                   </TouchableOpacity>
                              )
                         })
                    }
               </ScrollView>
          </Animated.View>
     )
}