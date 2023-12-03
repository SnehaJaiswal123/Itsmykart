const express=require('express')
const app=express()

app.use(express.json())

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("db connected successfully");
})
.catch((e)=>{
    console.log(e);
})

const Schema=mongoose.Schema({
    "name": String,
    "category": String,
    "variations": Array
})

const Product=mongoose.model('Product',Schema)

app.post('/create',async (req,res)=>{
    try{
        const product={
            "name": "XYZ",
            "category": "T-shirt",
            "variations": [
              {
                "size": "L",
                "color": "Red",
                "price": 100
              },
              {
                "size": "M",
                "color": "Red",
                "price": 150
              },
              {
                "size": "L",
                "color": "Green",
                "price": 200
              },
              {
                "size": "M",
                "color": "Green",
                "price": 250
              }
            ]
          }
    
          await Product.create(product)
          res.send(product)
    }
    catch(e){
        res.status(400).send(e)
    }
      
})

app.listen(5000,()=>console.log("Server is running on port 5000"))