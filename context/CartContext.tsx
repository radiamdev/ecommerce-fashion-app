import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react'

// Define the structure of a cart item
interface CartItem {
  id: string
  title: string
  price: number
  image: string
  size: string
  color: string
}

// Define the structure of the CartContext
interface CartContextType {
  cartItems: CartItem[]
  totalPrice: number
  addToCartItem: (item: CartItem) => Promise<void>
  deleteCartItem: (id: string) => Promise<void>
}

// Define the provider props
interface CartProviderProps {
  children: ReactNode
}

// Create the CartContext with an undefined default value
export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = async () => {
    let storedCartItems = await AsyncStorage.getItem('cart')
    const parsedCartItems: CartItem[] = storedCartItems
      ? JSON.parse(storedCartItems)
      : []
    setCartItems(parsedCartItems)
    calculateTotalPrice(parsedCartItems)
  }

  const addToCartItem = async (item: CartItem) => {
    let storedCartItems = await AsyncStorage.getItem('cart')
    const parsedCartItems: CartItem[] = storedCartItems
      ? JSON.parse(storedCartItems)
      : []
    const isExist = parsedCartItems.findIndex((cart) => cart.id === item.id)

    if (isExist === -1) {
      const updatedCartItems = [...parsedCartItems, item]
      setCartItems(updatedCartItems)
      calculateTotalPrice(updatedCartItems)
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems))
    }
  }

  const deleteCartItem = async (id: string) => {
    let storedCartItems = await AsyncStorage.getItem('cart')
    const parsedCartItems: CartItem[] = storedCartItems
      ? JSON.parse(storedCartItems)
      : []
    const updatedCartItems = parsedCartItems.filter((item) => item.id !== id)

    setCartItems(updatedCartItems)
    calculateTotalPrice(updatedCartItems)
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems))
  }

  const calculateTotalPrice = (cartItems: CartItem[]) => {
    const totalSum = cartItems.reduce((total, item) => total + item.price, 0)
    setTotalPrice(parseFloat(totalSum.toFixed(2))) // Ensure the total is a number with two decimal places
  }

  const value: CartContextType = {
    cartItems,
    totalPrice,
    addToCartItem,
    deleteCartItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to access the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
