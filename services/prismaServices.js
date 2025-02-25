const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

// Fetch posts from the database
async function getLocations() {
  try {
    return await prisma.locations.findMany();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCars() {
  try {
    return await prisma.cars.findMany();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getRentals() {
  try {
    return await prisma.rental.findMany({
      include: {
        car: true,
      },
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const customer = await prisma.customer.findUnique({ where: { email: req.body.email, password: req.body.password } });
    if (!customer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = { getLocations, getCars, getRentals, login };
