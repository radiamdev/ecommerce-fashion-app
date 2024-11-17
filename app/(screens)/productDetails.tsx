import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { fonts } from "@/constants/Fonts";
import { CartContext } from "@/context/CartContext"; // Correct import
import { Image } from "expo-image";

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

export default function ProductDetailsScreen() {
  // Safely accessing the CartContext
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { addToCartItem } = cartContext;

  const { id, title, price, image } = useLocalSearchParams(); // Fetch params from the route
  const router = useRouter();

  // Safely extract values from useLocalSearchParams()
  const productId = Array.isArray(id) ? id[0] : id; // Get the first value if it's an array
  const productTitle = Array.isArray(title) ? title[0] : title;
  const productPrice = Array.isArray(price) ? price[0] : price;
  const productImage = Array.isArray(image) ? image[0] : image;

  // Define selected properties
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");

  // Add to cart handler
  const handleAddToCart = () => {
    const product = {
      id: productId, // Now it's a string
      title: productTitle,
      price: parseFloat(productPrice), // Ensure price is a number
      image: productImage,
      size: selectedSize,
      color: selectedColor,
    };

    addToCartItem(product); // Safely called after checking context
    router.push("/cart");
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isCart={false} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: productImage }} contentFit='cover' style={styles.coverImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fontText}>{productTitle}</Text>
          <Text style={styles.fontText}>${productPrice}</Text>
        </View>
        <Text style={[styles.fontText, styles.sizeText]}>Size</Text>
        {/* Size Container */}
        <View style={styles.sizeContainer}>
          {["S", "M", "L", "XL"].map((size) => (
            <TouchableOpacity
              key={size}
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === size && styles.selectedText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Color Container */}
        <View style={styles.colorContainer}>
          {colorsArray.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}
            >
              <View
                style={[
                  styles.borderColorCircle,
                  selectedColor === color && {
                    borderColor: color,
                    borderWidth: 2,
                    borderRadius: 24,
                  },
                ]}
              >
                <View
                  style={[styles.colorCircle, { backgroundColor: color }]}
                ></View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Add to Cart Button */}
        <View>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 420,
    width: "100%",
  },
  coverImage: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
