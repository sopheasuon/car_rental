const locationController = require("express").Router();
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();


// const fetchLocations = async (req, res) => {
//   try {
//     const locations = await prisma.locations.findMany();
//     // res.json(locations);
//     res.render('pages/index', { locations });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

locationController.get("/location", async (req, res) => {
  try {
    const location = await prisma.locations.findUnique({ where: { location_id: parseInt(req.query.id) } });;
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

locationController.post("/", async (req, res) => {
  try {
    const {
      location_id,
      location_name,
      address  
    } = req.body || {}

    const createdRecord = await prisma.locations.create({
      data: {
        location_id,
        location_name,
        address 
      },
    });

    return res.send(createdRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

locationController.put("/:id", async (req, res) => {
  try {
    const {
      location_name,
      address  
    } = req.body || {}

    const updatedRecord = await prisma.locations.update({
      where: { location_id: parseInt(req.params.id) },
      data: {
        location_name,
        address  
      },
    });

    return res.send(updatedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

locationController.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await prisma.location.delete({
      where: { location_id: parseInt(req.params.id) },
    });

    return res.send(deletedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

locationController.get('/paginate', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const results = await prisma.locations.findMany({
      skip,
      take: limit,
    });

    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

locationController.get('/search', async (req, res) => {
  try {
    const { location_name } = req.query;
    const results = await prisma.locations.findMany({
      where: { location_name: { contains: location_name } },
    });

    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = {locationController};