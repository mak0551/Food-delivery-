const user = require("../../model/usermodels/user.model");

const getAll = async (req, res) => {
  try {
    const data = await user.find();
    const count = data.length;
    metadata = { count, data: data };
    res.status(200).json(metadata);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await user.find({ _id: id });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  try {
    const body = req.body;
    const duplicateEmail = await user.find({email: body.email});
    if(duplicateEmail){
      res.status(400).json({message: 'email already exists'})
      return
    }

    if (!body.firstname || !body.email || !body.number) {
      res.status(400).json({ message: "enter the required fields" });
      return
    }
    const data = new user(body);
    await data.save();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await user.updateOne({ _id: id }, body);
    res.status(200).send('updated successfully');
  } catch (err) {
    res.status(500).send(err);
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateobj = {};
    for (let key in body) {
      updateobj[key] = body[key];
    }
    await user.updateOne({ _id: id }, { $set: updateobj });
    res.status(200).send("successfully updated");
  } catch (err) {
    res.status(500).send(err);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await user.deleteOne({ _id: id });
    res.status(204).send(); // no content
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAll, getById, create, update, edit, remove };
