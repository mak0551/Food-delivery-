const taskmodel = require("../../model/taskmodel/taskmodel");

const getAllTask = async (req, res) => {
  try {
    const gettask = await taskmodel.find({},{__v:0});
    const getcount = gettask.length;
    res.status(200).json({ count: getcount, data: gettask });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const gettask = await taskmodel.find({ _id: id });
    res.status(200).json({ data: gettask });
  } catch (err) {
    res.status(500).send(err);
  }
};

const postTask = async (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.description) {
        res.status(400).json({ message: "enter all the required fields" });
        return;
    }
    body.createdDate = new Date();
    body.updatedDate = new Date();
    const task = new taskmodel(body);
    const newTask = await task.save();
    res.status(200).send(newTask);
  } catch (err) {
    res.status(500).send('internal server error');
  }
};

const updateTask = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const updatedobj = {};
    if (!body.title || !body.description) {
      res.status(400).json({ message: "enter all the required fields" });
      return;
    }
    body.updatedDate = new Date()
    for (let key in body) {
      updatedobj[key] = body[key];
    }
    await taskmodel.updateOne({ _id: id }, { $set: updatedobj });
    res.status(204).send("updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteTask = async (req, res) => {
    try{
        const {id} = req.params;
        const findUser = await taskmodel.findOne({_id: id});
        if(!findUser){
            res.status(404).send('user not exist')
            return
        }
        await taskmodel.deleteOne({_id : id});
        res.status(200).send('deleted successfully')
    }catch(err){
        res.status(500).send('internal server err', err)
    }
};
module.exports = { getAllTask, getTaskById, postTask, updateTask, deleteTask };
