const carController = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

carController.get("/car", async (req, res) => {
  try {
    const cars = await prisma.cars.findMany();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

carController.get("/car", async (req, res) => {
  try {
    const car = await prisma.cars.findUnique({ where: { car_id: req.query.id } });;
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

carController.post("/", async (req, res) => {
  try {
    const {
      car_id,
      make,        
      model,      
      year,       
      color,
      vehicle_type,
      status,
      image,
    } = req.body || {}

    const createdRecord = await prisma.cars.create({
      data: {
        car_id,
        make,
        model,
        year,
        color,
        vehicle_type,
        status,
        image,
      },
    });

    return res.send(createdRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

carController.put("/:id", async (req, res) => {
  try {
    const {
      make,        
      model,      
      year,       
      color,
      vehicle_type,
      status,
      image,
    } = req.body || {}

    const updatedRecord = await prisma.cars.update({
      where: { car_id: req.params.id },
      data: {
        make,
        model,
        year,
        color,
        vehicle_type,
        status,
        image,
      },
    });

    return res.send(updatedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

carController.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await prisma.cars.delete({
      where: { car_id: req.params.id },
    });

    return res.send(deletedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

carController.get("/paginate", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const results = await prisma.cars.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        car_id: 'asc',
      },
    });

    return res.json(results);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

carController.get("/search", async (req, res) => {
  try {
    const { make, model } = req.query || {};

    const results = await prisma.cars.findMany({
      where: {
        OR: [
          { make: { contains: make } },
          { model: { contains: model } },
        ],
      },
    });

    return res.json(results);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// const getAllCars = async (req, res) => {
//   try {
//     const cars = await prisma.cars.findMany();
//     // res.render('pages/index', { cars: cars });
//     // console.log(cars);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// Export the controller function
module.exports = carController;