const { Router } = require("express");
const router = Router();

// Import routers;
const allProducts = require("./allProducts-route");
const categories = require("./getCategory-route");
const user = require("./createUser-route");
const editUser = require("./EditUser")
const newCategory = require("./newCategory-route");
const newProduct = require("./newProduct-route");
const login = require("./userLogin-route");
const update = require("./updateProduct-route");
const productDetail = require("./productDetail-route");
const googleLogin = require("../utils/googleLogin-utils");
const createOrder = require("./createOrder-route");
const deleteUser = require("./deleteUser-route")
const allOrders = require("./getOrders-route");
const orderRoute = require("./getOrder-route")
const postReview = require("./newReview-route");
const allUsers = require("./getUsers-route");
const userRole = require("./userRole-route")
const orderStatus = require("./orderStatus-route")
const deleteProduct = require("./deleteProduct-route");
const { createOrderMP, notificationOrder, savePayment } = require("../utils/mpController");
const allRoles = require("./getRoles-route");
const setNewPass = require("./setNewPassword-route");
const allReviews = require("./getReviews-route");
const updateUser = require("./updateAccount-route");
const TwoFA = require("./set2FA");
const visitedProducts = require("./getProductsVisited-route");
const discount = require("./createDiscount-route");
const wishlist = require("./manageWishlist-route");
const store = require('./store')

// Middlewares
const auth = require("./authenticate-route");
const verifyGoogleToken = require("../utils/verifyGoogleToken");
const { isAuthenticated } = require('../utils/isAuthenticated');
const adminOnly = require('../utils/adminOnly');
const superAdminOnly = require("../utils/superAdminOnly");
const payment = require("./getPayment-route");

// Config routers
// Example: router.use('/users', getUsers);
router.use("/products", allProducts);

router.use("/order", createOrder);

router.use("/order", orderRoute)

router.use("/order/status", adminOnly, orderStatus)

router.use("/category", newCategory);

router.use("/product", newProduct);

router.use("/user", user);

router.use("/user/role", superAdminOnly, userRole)

router.use("/user/edit", adminOnly, editUser);

router.use("/user/update", updateUser);

router.use("/user", adminOnly, deleteUser)

router.use("/categories", categories);

router.use("/login", login);

router.use("/googleLogin", verifyGoogleToken, googleLogin);

router.use("/authenticate", isAuthenticated, auth);

router.use("/product", update);

router.use("/product", productDetail);

router.use("/orders", allOrders);

router.use('/createPayment',  createOrderMP)

router.use('/notification', notificationOrder)

router.use("/users", allUsers);

router.use("/review", postReview);

router.use('/reviews', allReviews);

router.use("/product", adminOnly, deleteProduct)

router.use("/admin/authenticate", adminOnly, auth)

router.use("/roles", allRoles);

router.use("/password", setNewPass);

router.use("/twofa", TwoFA);

router.use("/visited", visitedProducts);

router.use("/discount", discount);

router.use("/wishlist", wishlist);

router.use("/stores", store);

router.use("/payment", payment);


module.exports = router;
