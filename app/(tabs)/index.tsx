import React, { useState } from "react";
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native";
import Header from "@/components/Header";
import data from "@/data/data.json";
import { LinearGradient } from "expo-linear-gradient";
import Tags from "@/components/Tags";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import useThemeColor from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  isFavorite?: boolean;
};

export default function HomeScreen() {
  const one = useThemeColor("pinkGradientOne");
  const two = useThemeColor("pinkGradientTwo");

  const [products, setProducts] = useState<Product[]>(data.products);
  const navigation = useRouter();

  const handleProductDetails = (item: Product) => {
    navigation.push({
      pathname: "/productDetails",
      params: {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      },
    });
  };

  const toggleFavorite = (item: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === item.id ? { ...prod, isFavorite: !prod.isFavorite } : prod
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <LinearGradient colors={[one, two]} style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              {/* Header */}
              <Header isCart={false} />
              <View style={styles.searchWrapper}>
                <ThemedText
                  type="title"
                  style={{ fontFamily: "Poppins-Regular", paddingVertical: 10 }}
                >
                  Match Your Style
                </ThemedText>
                {/* Search ... */}
                <View style={styles.inputContainer}>
                  <Image
                    source={require("@/assets/images/search.png")}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    placeholder="Search"
                    style={styles.textInput}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
              <Tags />
            </>
          }
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              handleProductClick={handleProductDetails}
              toggleFavorite={toggleFavorite}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchWrapper: {
    marginVertical: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
});
