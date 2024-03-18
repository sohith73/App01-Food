import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, ClockIcon, FireIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown , FadeIn} from 'react-native-reanimated';

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
     const ingredientsIndex = (meal) => {
          if (!meal) return []
          let indexes = []
          for (let i = 0; i < 20; i++) {
               if (meal['strIngredient' + i]) {
                    indexes.push(i);
               }
          }
          return indexes
     }
     const getYoutubeVideoId = url =>{
          const regex = /[?&]v=([^&]+)/;
          const match = url.match(regex);
          if(match && match[1]){
               return match[1];
          }
          return null;
     }
     return (
          <ScrollView className=""
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ paddingBottom: 30 }}>
               <StatusBar barStyle={"light-content"} />
               <View className="flex-row justify-center" >
                    <CachedImage
                         uri={item.strMealThumb}
                         sharedTransitionTag = {item.strMeal}
                         style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomRightRadius: 60, borderBottomRightRadius: 60, marginTop: 5 }} />
               </View>
               <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-4 bg-white">
                         <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#f61313" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFavorite(!favorite)} className="p-2 rounded-full mr-4 bg-white">
                         <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={favorite ? "red" : "gray"} />
                    </TouchableOpacity>
               </Animated.View>
               {
                    loading ? (
                         <Loading size="large" className="mt-20 " />
                    ) : (
                         <View className="px-4 flex justify-between space-y-4 pt-8 ">
                              <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="space-y-2">
                                   <Text className="font-bold flex-1 text-neutral-700 " style={{ fontSize: hp(4) }}>
                                        {meal?.strMeal}
                                   </Text>
                                   <Text className="font-medium flex-1 text-neutral-500 " style={{ fontSize: hp(2.9) }}>
                                        {meal?.strArea}
                                   </Text>
                              </Animated.View>
                              <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="flex-row justify-around">
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
                              </Animated.View>
                              <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                                   <Text className="text-xl font-bold flex-1 text-black/70">Ingredients</Text>
                                   <View className="space-y-2 ml-3">
                                        {
                                             ingredientsIndex(meal).map(i => {
                                                  return (
                                                       <View key={i} className="flex-row space-x-4">
                                                            <View style={{ height: hp(1.5), width: hp(1.5) }}
                                                                 className="bg-[#f61313] rounded full" />
                                                            <View className="flex-row space-x-2">
                                                                 <Text style={{ fontSize: hp(2.4) }} className="font-extrabold text-neutral-700">{meal['strMeasure' + i]}</Text>
                                                                 <Text style={{ fontSize: hp(2.4) }} className="font-medium text-neutral-600">{meal['strIngredient' + i]}</Text>
                                                            </View>
                                                       </View>
                                                  )
                                             })
                                        }
                                   </View>
                              </Animated.View>
                              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                                   <Text className="text-xl font-bold flex-1 text-black/70">Instructions</Text>
                                   <Text style={{ fontSize: hp(2.6) }}>{
                                        meal?.strInstructions}</Text>
                              </Animated.View>
                              {
                                   meal.strYoutube && (
                                        <View className="space-y-4 ">
                                             <Text className="text-xl font-bold flex-1 text-black/70">YT video</Text>
                                             <View>
                                                  <YoutubeIframe videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)}>
                                                  </YoutubeIframe>
                                             </View>
                                        </View>
                                   )
                              }
                         </View>
                    )
               }
          </ScrollView>
     )
}