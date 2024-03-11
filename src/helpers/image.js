import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";

export const CachedImage = (props) => {
     const [cachedSource, setCachedSource] = useState();
     const { uri } = props
     useEffect(() => {
          const getCachedSource = async () => {
               try {
                    const cachedImageData = await AsyncStorage.getItem(uri)
                    if (cachedImageData) {
                         setCachedSource({ uri: cachedImageData })
                    } else {
                         const response = await fetch(uri)
                         const imageBlob = await response.blob()
                         const base64Data = await new Promise((resolve, reject) => {
                              const reader = new FileReader();
                              reader.readAsDataURL(imageBlob);
                              reader.onload = () => {
                                   resolve(reader.result)
                              };
                         });
                         await AsyncStorage.setItem(uri, base64Data)
                         setCachedSource({uri, base64Data})
                    }
               } catch (error) {
                    console.error("Image caching problem ",error)
                    setCachedSource({uri})
               }
          }
          getCachedSource();
     },[]);
     return <Animated.Image source={cachedSource} {...props} />
}