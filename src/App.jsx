import { Route, Routes } from "react-router-dom"
import { MyProductsScreen, LoginScreen, RegisterScreen, ValidateEmailScreen, ForgotPasswordScreen, HomeScreen, CartScreen } from "./Screens"
import ResetPasswordScreen from "./Screens/ResetPasswordScreen.jsx/ResetPasswordScreen"
import PruebaScreen from "./Screens/PruebaScreen/PruebaScreen"
import DetailScreen from "./Screens/DetailScreen/DetailScreen"
import AgregarProductoScreen from "./Screens/AgregarProductoScreen/AgregarProductoScreen"
import ProtectedRoute from "./Components/ProtectedRoute"


function App() {
	return (
		<Routes>
			<Route path='/register' element={<RegisterScreen />} />
			<Route path='/login' element={<LoginScreen />} />
			<Route path='/forgot-password' element={<ForgotPasswordScreen />} />
			<Route path='/reset-password/:resetToken' element={<ResetPasswordScreen />} />
			<Route path='/' element={<HomeScreen />} />
			<Route path='/detail/:productId' element={<DetailScreen />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/myProducts' element={<MyProductsScreen />} />
				<Route path='/prueba' element={<PruebaScreen />} />
				<Route path='/add-product' element={<AgregarProductoScreen />} />
				<Route path='/validate-email/:validationToken' element={<ValidateEmailScreen />} />
				<Route path='/cart' element={<CartScreen />} />
			</Route>
		</Routes>
	)
}

export default App
