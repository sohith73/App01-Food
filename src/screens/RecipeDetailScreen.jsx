import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, ClockIcon, FireIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '../components/Loading';


export default function RecipeDetailScreen(props) {
     let item = props.route.params
     const [favorite, setFavorite] = useState(false)
     const navigation = useNavigation()
     const [meal, setMeal] = useState(null)
     const [loading, setLoading] = useState(true)
     useEffect(() => {
          getRecipes(item.idMeal)
     }, [])
     const getRecipes = async (id) => {
          try {
               const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
               // console.log(response.data)
               setMeal(response.data.meals[0])
               setLoading(false);
          } catch (error) {
               console.log(error.message)
          }
     }
     return (
          <ScrollView className=""
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ paddingBottom: 30 }}>
               <StatusBar barStyle={"light-content"} />
               <View className="flex-row justify-center" >
                    <CachedImage
                         uri={item.strMealThumb}
                         style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomRightRadius: 60, borderBottomRightRadius: 60, marginTop: 5 }} />
               </View>
               <View className="w-full absolute flex-row justify-between items-center pt-14">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-4 bg-white">
                         <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#f61313" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFavorite(!favorite)} className="p-2 rounded-full mr-4 bg-white">
                         <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={favorite ? "red" : "gray"} />
                    </TouchableOpacity>
               </View>
               {
                    loading ? (
                         <Loading size="large" className="mt-20 " />
                    ) : (
                         <View className="px-4 flex justify-between space-y-4 pt-8 ">
                              <View className="space-y-2">
                                   <Text className="font-bold flex-1 text-neutral-700 " style={{ fontSize: hp(4) }}>
                                        {meal?.strMeal}
                                   </Text>
                                   <Text className="font-medium flex-1 text-neutral-400 " style={{ fontSize: hp(2.9) }}>
                                        {meal?.strArea}
                                   </Text>
                              </View>
                              <View className="flex-row justify-around">
                                   <View className="flex rounded-full bg-[#f61313] p-2">
                                        <View style={{ height: hp(6.5), width: hp(6.5) }}
                                             className="bg-white/95 flex items-center justify-center rounded-full ">
                                             <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                        </View>
                                        <View className="flex items-center py-2 space-y-1">
                                             <Text className="font-bold text-white/75" style={{ fontSize: hp(2) }}>
                                                  30
                                             </Text>
                                             <Text className="font-bold text-white/75" style={{ fontSize: hp(1.7) }}>
                                                  Mins
                                             </Text>
                                        </View>
                                   </View>
                                   <View className="flex rounded-full bg-[#f61313] p-2">
                                        <View style={{ height: hp(6.5), width: hp(6.5) }}
                                             className="bg-white/95 flex items-center justify-center rounded-full ">
                                             <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                        </View>
                                        <View className="flex items-center py-2 space-y-1">
                                             <Text className="font-bold text-white/75" style={{ fontSize: hp(2) }}>
                                                  3
                                             </Text>
                                             <Text className="font-bold text-white/75" style={{ fontSize: hp(1.7) }}>
                                                  Servings
                                             </Text>
                                        </View>
                                   </View>
                                   <View className="flex rounded-full bg-[#f61313] p-2">
                                        <View style={{ height: hp(6.5), width: hp(6.5) }}
                                             className="bg-white/95 flex items-center justify-center rounded-full ">
                                             <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                        </View>
                                        <View className="flex items-center py-2 space-y-1">
                                             <Text className="font-bold text-white/75" style={{ fontSize: hp(2) }}>
                                                  300
                                             </Text>
                                             <Text className="font-bold text-white/75" style={{ fontSize: hp(1.7) }}>
                                                  Cal
                                             </Text>
                                        </View>
                                   </View>
                              </View>
                              <View></View>
                         </View>
                    )
               }
          </ScrollView>
     )
}