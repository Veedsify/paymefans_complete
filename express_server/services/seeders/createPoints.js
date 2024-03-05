const { v4: uuidv4 } = require("uuid");
const prismaQuery = require("../../utils/prisma");

const pointSeeding = [
  {
    id: uuidv4(),
    points: 5,
    amount: 500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 10,
    amount: 1000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 15,
    amount: 1500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 20,
    amount: 2000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 25,
    amount: 2500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 30,
    amount: 3000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 35,
    amount: 3500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 40,
    amount: 4000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 45,
    amount: 4500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 50,
    amount: 5000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 55,
    amount: 5500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 60,
    amount: 6000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 65,
    amount: 6500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 70,
    amount: 7000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 75,
    amount: 7500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 80,
    amount: 8000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 85,
    amount: 8500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 90,
    amount: 9000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 95,
    amount: 9500,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 100,
    amount: 10000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 150,
    amount: 15000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 200,
    amount: 20000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 250,
    amount: 25000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 300,
    amount: 30000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 350,
    amount: 35000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 400,
    amount: 40000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 450,
    amount: 45000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 500,
    amount: 50000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 550,
    amount: 55000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 600,
    amount: 60000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 650,
    amount: 65000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 700,
    amount: 70000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 750,
    amount: 75000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 800,
    amount: 80000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 850,
    amount: 85000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 900,
    amount: 90000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 950,
    amount: 95000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 1000,
    amount: 100000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 1500,
    amount: 150000,
    currency: "NGN",
    conversion_rate: 100,
  },
  {
    id: uuidv4(),
    points: 2000,
    amount: 200000,
    currency: "NGN",
    conversion_rate: 100,
  },
];

const createPoints = async () => {
  try {
    for (let point of pointSeeding) {
      await prismaQuery.globalPointsBuy.create({
        data: {
          points_buy_id: point.id,
          points: point.points,
          amount: point.amount,
          currency: point.currency,
          conversion_rate: point.conversion_rate,
        },
      });
    }

    console.log("Points created");
  } catch (error) {
    console.log(error);
  }
};

createPoints();
