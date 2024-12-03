// index.ts
import app from './app'; 
const PORT = process.env.PORT || 5000;

if (!process.env.PORT) {
  console.warn('⚠️  PORT environment variable is not defined. Defaulting to 3000.');
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server; 
