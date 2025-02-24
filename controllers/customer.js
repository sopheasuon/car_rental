const customerController = require("express").Router();
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

customerController.get("/", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

customerController.get("/customer", async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({ where: { customer_id: parseInt(req.query.id) } });;
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

customerController.post("/", async (req, res) => {
  try {
    const {
      customer_id,
      first_name,
      last_name,
      address ,
      phone,
      email,
      password,
      driver_license,
    } = req.body || {}

    const createdRecord = await prisma.customer.create({
      data: {
        customer_id,
        first_name,
        last_name,
        address ,
        phone,
        email,
        password,
        driver_license,
      },
    });

    return res.send(createdRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

customerController.put("/:id", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      address ,
      phone,
      email,
      password,
      driver_license,
    } = req.body || {}

    const updatedRecord = await prisma.customer.update({
      where: { customer_id: parseInt(req.params.id) },
      data: {
        first_name,
        last_name,
        address ,
        phone,
        email,
        password,
        driver_license,
      },
    });

    return res.send(updatedRecord);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

customerController.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await prisma.customer.delete({ where: { customer_id: parseInt(req.params.id) } });
    if (!deletedRecord) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.send(deletedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

customerController.get("/paginate", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const results = await prisma.customer.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        customer_id: 'asc',
      },
    });

    return res.json(results);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

customerController.get("/search", async (req, res) => {
  try {
    const { first_name, last_name, address, phone, email } = req.query;

    const results = await prisma.customer.findMany({
      where: {
        OR: [
          { first_name: { contains: first_name } },
          { last_name: { contains: last_name } },
          { address: { contains: address } },
          { phone: { contains: phone } },
          { email: { contains: email } },
        ],
      },
    });

    return res.json(results);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = customerController;