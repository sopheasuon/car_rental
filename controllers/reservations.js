const reservationController = require("express").Router();
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

reservationController.get("/", async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationController.get("/reservation", async (req, res) => {
  try {
    const reservation = await prisma.reservation.findUnique({ where: { reservation_id: parseInt(req.query.id) } });;
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationController.post("/", async (req, res) => {
  try {
    const {
      reservation_id,
      customer_id,
      car_type,
      pickup_location_id,
      pickup_date,
      return_location_id,
      return_date
    } = req.body || {}

    const createdRecord = await prisma.reservation.create({
      data: {
        reservation_id,
        customer_id,
        car_type,
        pickup_location_id,
        pickup_date,
        return_location_id,
        return_date
      },
    });

    return res.send(createdRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationController.put("/:id", async (req, res) => {
  try {
    const {
      customer_id,
      car_type,
      pickup_location_id,
      pickup_date,
      return_location_id,
      return_date
    } = req.body || {}

    const updatedRecord = await prisma.reservation.update({
      where: { reservation_id: parseInt(req.params.id) },
      data: {
        customer_id,
        car_type,
        pickup_location_id,
        pickup_date,
        return_location_id,
        return_date
      },
    });

    return res.send(updatedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationController.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await prisma.reservation.delete({
      where: { reservation_id: parseInt(req.params.id) },
    });

    return res.send(deletedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationController.get("/paginate", async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const results = await prisma.reservation.findMany({
      skip,
      take: limit,
      orderBy: { reservation_id: "asc" },
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationController.get("/search", async (req, res) => {
  try {
    const { customer_id, car_type, pickup_date, return_date } = req.query;

    const results = await prisma.reservation.findMany({
      where: {
        customer_id: { equals: parseInt(customer_id) },
        car_type: { equals: car_type },
        OR: [
          { pickup_date: { gte: new Date(pickup_date) } },
          { return_date: { lte: new Date(return_date) } },
        ],
      },
    });

    return res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = reservationController;

