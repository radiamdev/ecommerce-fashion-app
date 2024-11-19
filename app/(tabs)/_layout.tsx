import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { Image } from 'expo-image';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { CartContext, CartProvider } from '@/context/CartContext';

const { width, height } = Dimensions.get('window');
const ICON_SIZE = width * 0.06;

// Move TabBarIcon outside of TabLayout
const TabBarIcon = ({
  focused,
  focusedSource,
  defaultSource,
}: {
  focused: boolean;
  focusedSource: any;
  defaultSource: any;
}) => (
  <Image
    source={focused ? focusedSource : defaultSource}
    contentFit="contain"
    style={{
      height: ICON_SIZE,
      width: ICON_SIZE,
    }}
  />
);

// Move CartTabBarIcon outside of TabLayout
const CartTabBarIcon = ({
  focused,
  cartItemsCount,
}: {
  focused: boolean;
  cartItemsCount: number;
}) => (
  <View style={{ position: 'relative' }}>
    <Image
      source={
        focused
          ? require('@/assets/images/focused/shopping_cart.png')
          : require('@/assets/images/normal/shopping_cart.png')
      }
      contentFit="contain"
      style={{
        height: ICON_SIZE,
        width: ICON_SIZE,
      }}
    />
    <View
      style={{
        position: 'absolute',
        right: -3,
        bottom: 22,
        height: 14,
        width: 14,
        backgroundColor: focused ? '#E96E6E' : '#C0C0C0',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThemedText type="xs" c="white">
        {cartItemsCount}
      </ThemedText>
    </View>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarLabel: '',
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: [
            Platform.select({
              ios: {
                position: 'absolute',
              },
              default: {},
            }),
            {
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: Platform.OS === 'ios' ? 20 : 0,
              paddingTop: 10,
            },
          ],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                focusedSource={require('@/assets/images/focused/home.png')}
                defaultSource={require('@/assets/images/normal/home.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="reorder"
          options={{
            title: 'ReOrder',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                focusedSource={require('@/assets/images/focused/reorder.png')}
                defaultSource={require('@/assets/images/normal/reorder.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ focused }) => {
              const cartContext = useContext(CartContext);

              if (!cartContext) {
                throw new Error(
                  'CartContext must be used within a CartProvider.'
                );
              }

              const { cartItems } = cartContext;

              return (
                <CartTabBarIcon
                  focused={focused}
                  cartItemsCount={cartItems.length}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                focusedSource={require('@/assets/images/focused/account.png')}
                defaultSource={require('@/assets/images/normal/account.png')}
              />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
