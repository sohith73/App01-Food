import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dummy2 } from '../constants/const';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';



export default function Recipes({ meals }) {
     const navigation = useNavigation()
     return (
          <View className="mx-4 space-y-4">
               <Text style={{ fontSize: hp(4) }} className="font-semibold text-neutral-600 text-xl">Recipes</Text>
               <View>
                    {meals.length == 0 ? (
                         <Loading size="large" className="" />
                    ) : (<MasonryList
                         data={meals}
                         keyExtractor={(item) => item.idMeal}
                         numColumns={2}
                         showsVerticalScrollIndicator={false}
                         renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                         // refreshing={isLoadingNext}
                         // onRefresh={() => refetch({ first: ITEM_CNT })}
                         onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                    />)}
                    {/* <MasonryList
                         data={Dummy2}
                         keyExtractor={(item) => item.id}
                         numColumns={2}
                         showsVerticalScrollIndicator={false}
                         renderItem={({ item ,i}) => <RecipeCard  item={item} index={i}/>}
                         // refreshing={isLoadingNext}
                         // onRefresh={() => refetch({ first: ITEM_CNT })}
                         onEndReachedThreshold={0.1}
                         // onEndReached={() => loadNext(ITEM_CNT)}
                    /> */}
               </View>
          </View>
     )
}

const RecipeCard = ({ item, index, navigation }) => {
     let isEven = index % 2 == 0;
     return (
          <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
               <Pressable style={{ width: "100%", paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                    className="flex justify-center mb-4 space-y-2"
                    onPress={()=>navigation.navigate('RecipeDetail',{...item})}>
                    {/* <Image
                         source={{ uri: item.strMealThumb }}
                         style={{ width: "100%", height: index % 3 == 0 ? hp(35) : hp(45), borderRadius: 33 }}
                         className="bg-black/5" /> */}
                    <CachedImage
                         uri={item.strMealThumb}
                         style={{ width: "100%", height: index % 3 == 0 ? hp(35) : hp(45), borderRadius: 33 }}
                         className="bg-black/5" />
                    <Text style={{ fontSize: hp(2.6) }} className="font-semibold ml-2 text-neutral-700">
                         {item.strMeal.length > 20 ? item.strMeal.slice(0, 17) + "..." : item.strMeal}
                    </Text>
               </Pressable>
          </Animated.View>
     )
}