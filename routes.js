const express = require("express");
const Country = require("./models/Country");
const router = express.Router();


router.get("/countries", async (req, res) => {
  const countries = await Country.find({deleted:false});
  res.send(countries);
});

router.post("/countries", async (req, res) => {

if(!req.body.name) {
  res.status(404);
  res.send({ error: "name is not provided" });
}

if(!req.body.nameAR) {
  res.status(404);
  res.send({ error: "nameAR is not provided" });
}

  const country = new Country({
    name: req.body.name,
    timeZone: req.body.timeZone,
    nameAR: req.body.nameAR,
    phoneCode: req.body.phoneCode,
    currency: req.body.currency,
    flag: req.body.flag,
    status:"Active",
    deleted:false
  });
  await country.save();
  res.send(country);
});

router.get("/countries/:id", async (req, res) => {
  try {
    const Country = await Country.findOne({ _id: req.params.id });
    res.send(Country);
  } catch {
    res.status(404);
    res.send({ error: "Country doesn't exist!" });
  }
});

router.put("/countries/:id", async (req, res) => {
  try {

    console.log("asdfadfsadfsdfsdf",req.params.id)

    const country = await Country.findOne({ _id: req.params.id });
    console.log("country")

    console.log("country", req.body)

    Country.findOneAndUpdate({'_id': req.params.id}, req.body, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
  } catch (e){
    console.log(e)
    res.status(404).send({ error: "Country doesn't exist!" })
  }
});

router.delete("/countries/:id", async (req, res) => {
  try {
    await Country.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Country doesn't exist!" });
  }
});

module.exports = router;
