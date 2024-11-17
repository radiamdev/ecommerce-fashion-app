import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  isFavorite?: boolean;
};

type ProductCardProps = {
  item: Product;
  handleProductClick: (item: Product) => void;
  toggleFavorite: (item: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  handleProductClick,
  toggleFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleProductClick(item)}
    >
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Image
            source={
              item.isFavorite
                ? require("@/assets/images/favoriteFilled.png")
                : require("@/assets/images/favorite.png")
            }
            style={styles.favorite}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coverImage: {
    height: 256,
    width: "100%",
    borderRadius: 20,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444",
  },
  price: {
    fontSize: 18,
    color: "#444",
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  favorite: {
    height: 20,
    width: 20,
  },
});
