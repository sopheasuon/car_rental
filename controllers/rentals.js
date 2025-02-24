const rentalController = require("express").Router();
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

rentalController.get("/", async (req, res) => {
  try {
    const rentals = await prisma.rental.findMany();
    res.json(rentals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

rentalController.get("/rental", async (req, res) => {
  try {
    const rental = await prisma.rental.findUnique({
      where: { rental_id: parseInt(req.query.id) },
    });

    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

rentalController.post("/", async (req, res) => {
  try {
    const {
      rental_id,
      rental_start_date,
      rental_end_date,
      return_date,
      rental_cost,
      carId,
      customerId
    } = req.body || {}

    const createdRecord = await prisma.rental.create({
      data: {
        rental_id,
        rental_start_date,
        rental_end_date,
        return_date,
        rental_cost,
        carId,
        customerId
      },
    });

    return res.send(createdRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

rentalController.put("/:id", async (req, res) => {
  try {
    const {
      rental_start_date,
      rental_end_date,
      return_date,
      rental_cost,
      carId,
      customerId
    } = req.body || {}

    const updatedRecord = await prisma.rental.update({
      where: { rental_id: parseInt(req.params.id) },
      data: {
        rental_start_date,
        rental_end_date,
        return_date,
        rental_cost,
        carId,
        customerId
      },
    });

    return res.send(updatedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

rentalController.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await prisma.rental.delete({
      where: { rental_id: parseInt(req.params.id) },
    });

    return res.send(deletedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

rentalController.get("/paginate", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const results = await prisma.rental.findMany({
      skip,
      take: limit,
    });

    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

rentalController.get("/sreach", async (req, res) => {
  try {
    const { rental_start_date, rental_end_date, customerId } = req.query || {};
    const customer_id = parseInt(customerId)

    const results = await prisma.rental.findMany({
      where: {
        OR: [
          { rental_start_date: { gte: rental_start_date } },
          { rental_end_date: { lte: rental_end_date } },
          { customerId: parseInt(customerId) },
        ],
      },
    });

    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = rentalController;