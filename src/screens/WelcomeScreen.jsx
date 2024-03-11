import { View, Text, StatusBar,Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
     const ring1 = useSharedValue(0)
     const ring2 = useSharedValue(0)
     const navigate = useNavigation()

     useEffect(()=>{
          ring1.value= 0;
          ring2.value= 0;
          setTimeout(() => ring1.value = withSpring(ring1.value +hp(5)),100);
          setTimeout(() => ring2.value = withSpring(ring2.value +hp(5.5)),350);
          setTimeout(() => navigate.navigate('main'),1500)
     },[])
     return (
          <View className='bg-[#f61313] h-full flex-1 space-y-10 justify-center items-center'>
               <StatusBar  barStyle={'dark-content'} />
               <Animated.View className='bg-white/20 rounded-full ' style={{padding : ring1}}>
                    <Animated.View className="bg-white/20 rounded-full "style={{padding : ring2}}>
                         <Image className='rounded-full' source={require('../assets/logo.png')} style={{width : hp(20),height :hp(20)}}/>
                    </Animated.View>
               </Animated.View>
               <View className="flex items-center space-y-2">
                    <Text style={{fontSize:hp(7)}} className="font-bold text-white tracking-widest">
                    COOKZ 
                    </Text>
                    <Text  style={{fontSize:hp(2)}} className="font-semibold text-white tracking-widest">
                         where we prepare food
                    </Text>
               </View>
          </View>
     )
}