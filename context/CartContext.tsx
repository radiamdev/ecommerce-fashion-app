import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react'

// Define the structure of a cart item
export type CartItemType = {
  id: string | number
  title: string
  price: number
  image: string
  size: string
  color: string
}

// Define the structure of the CartContext
interface CartContextType {
  cartItems: CartItemType[]
  totalPrice: number
  addToCartItem: (item: CartItemType) => Promise<void>
  deleteCartItem: (id: string | number) => Promise<void>
  clearCart: () => Promise<void>
}

// Create the CartContext with an undefined default value
export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  // Load cart items from AsyncStorage on component mount
  useEffect(() => {
    loadCartItems()
  }, [])

  // Load cart items from AsyncStorage
  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cart')
      const parsedCartItems: CartItemType[] = storedCartItems
        ? JSON.parse(storedCartItems)
        : []

      // Ensure there are no duplicates or invalid items
      const uniqueCartItems = Array.isArray(parsedCartItems)
        ? parsedCartItems.filter(
            (item, index, self) =>
              self.findIndex((i) => i.id === item.id) === index,
          )
        : []

      setCartItems(uniqueCartItems)
    } catch (error) {
      console.error('Failed to load cart items:', error)
    }
  }

  // Add a new item to the cart
  const addToCartItem = async (item: CartItemType) => {
    setCartItems((prev) => {
      const isExist = prev.some((cart) => cart.id === item.id)
      if (isExist) return prev

      const updatedCartItems = [...prev, item]

      // Synchronize AsyncStorage
      AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems)).catch(
        (error) => {
          console.error(
            'Failed to update AsyncStorage after adding an item:',
            error,
          )
        },
      )

      return updatedCartItems
    })
  }

  // Delete an item from the cart
  const deleteCartItem = async (id: string | number) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.filter((item) => item.id !== id)

      // Synchronize AsyncStorage
      AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems)).catch(
        (error) => {
          console.error('Failed to update AsyncStorage after deletion:', error)
        },
      )

      return updatedCartItems
    })
  }

  // Clear the entire cart
  const clearCart = async () => {
    await AsyncStorage.removeItem('cart')
    setCartItems([])
  }

  // Automatically update the total price whenever cartItems changes
  useEffect(() => {
    const totalSum = cartItems.reduce((total, item) => total + item.price, 0)
    setTotalPrice(parseFloat(totalSum.toFixed(2)))
  }, [cartItems])

  const value = useMemo(
    () => ({
      cartItems,
      totalPrice,
      addToCartItem,
      deleteCartItem,
      clearCart,
    }),
    [cartItems, totalPrice],
  )

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
