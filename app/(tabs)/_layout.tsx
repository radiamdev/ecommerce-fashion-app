import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { Platform, View } from "react-native";
import { Image } from "expo-image";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { CartContext, CartProvider } from "@/context/CartContext";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <Image
                    source={require("@/assets/images/focused/home.png")}
                    contentFit='contain'
                    style={{
                      height: size,
                      width: size,
                    }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("@/assets/images/normal/home.png")}
                    contentFit='contain'
                    style={{
                      height: size,
                      width: size,
                    }}
                  />
                );
              }
            },
          }}
        />
        <Tabs.Screen
          name="reorder"
          options={{
            title: "ReOrder",
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <Image
                    source={require("@/assets/images/focused/reorder.png")}
                    contentFit='contain'
                    style={{
                      height: size,
                      width: size,
                    }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("@/assets/images/normal/reorder.png")}
                    contentFit='contain'
                    style={{
                      height: size,
                      width: size,
                    }}
                  />
                );
              }
            },
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused, size }) => {
              const cartContext = useContext(CartContext);

              if (!cartContext) {
                throw new Error(
                  "CartContext must be used within a CartProvider."
                );
              }

              const { cartItems } = cartContext;

              if (focused) {
                return (
                  <View style={{ position: "relative" }}>
                    <Image
                      source={require("@/assets/images/focused/shopping_cart.png")}
                      contentFit='contain'
                      style={{
                        height: size,
                        width: size,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: -3,
                        bottom: 22,
                        height: 14,
                        width: 14,
                        backgroundColor: "#E96E6E",
                        borderRadius: 7,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ThemedText type="xs" c="white">
                        {cartItems.length}
                      </ThemedText>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={{ position: "relative" }}>
                    <Image
                      source={require("@/assets/images/normal/shopping_cart.png")}
                      contentFit='contain'
                      style={{
                        height: size,
                        width: size,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: -3,
                        bottom: 22,
                        height: 14,
                        width: 14,
                        backgroundColor: "#C0C0C0",
                        borderRadius: 7,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ThemedText type="xs" c="white">
                        {cartItems.length}
                      </ThemedText>
                    </View>
                  </View>
                );
              }
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ focused, size }) => {
              if (focused) {
                return (
                  <Image
                    source={require("@/assets/images/focused/account.png")}
                    contentFit='contain'
                    style={{
                      height: size,
                      width: size,
                    }}
                  />
                );
              } else {
                return (
                  <Image
                    source={require("@/assets/images/normal/account.png")}
                    contentFit= 'contain'
                    style={{
                      height: size,
                      width: size,
                    }}
                  />
                );
              }
            },
          }}
        />
      </Tabs>
   </CartProvider>
  );
}
