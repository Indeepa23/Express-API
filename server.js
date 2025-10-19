import express from 'express';
import userRoutes from './routes/userRoute.js'
import productRoutes from './routes/productRoute.js'

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(3000, () => console.log(`Server running on port 3000`));