import Task from '../Model/Task.model.js';

// Create Task
export const createTask = async (req, res)=>{
    try{
        const {tittle,description,startTime,endTime}=req.body;
        const userId =req.user.id // for verified user 

        const newTask = await Task.create({   // task create ho rha h model me file ki help se in database
            tittle,
            description,
            startTime,
            endTime,
            userId:userId

        })
        res.status(201).json({message:"task created successfully", task:newTask}) //task create ho gya
    } catch(error){
        return res.status(500).json({message:"internal server error",error: error.massage})
    }
}

//get the tasks
export  const getAllTasks = async(req,res)=>{ 
    try{
        const userId=req.user.id; //verified user id
        const tasks=await Task.find({userId}) // databse me find krra h verified user ko
        res.status(200).json({message:"tasks fetched succuessfully",tasks}) // id match kr gyi to us id ka data taskks me bejh rhe h frotend ko 
    }
    catch(error){
        return res.status(500).json({message:"error fetching tasks",error:error.message})
    }
    
}

// Update Task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask); // ye frotend ko update task bejh rha h 
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error });
    }
};

//search filter 

export const searchFilter = async (req, res) => {
  try {
      const userId =req.user.id// Token se mila hua userId
    const { q } = req.query;     // URL se aaya hua search text (?q=coding)

    const tasks = await Task.find({
      userId,
      $or: [
        { tittle: { $regex: q, $options: "i" } },       // title me search
        { description: { $regex: q, $options: "i" } } // description me search
      ]
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error in searching tasks", details: error.message });
  }
};

// filter and sort 

export const filterandSort = async (req,res)=>{
  try {
    const userId = req.user.id ;
    const {status,sort} = req.query;
    let filter = {userId}
    if (status){
        filter.status = status;

    } 
    let sortOption = {};
    if(sort === "asc"){
        sortOption.createdAt=1  ;
      } else if (sort === "desc"){
        sortOption.createdAt = -1;
      }
      
      const tasks = await Task.find(filter).sort(sortOption)
      res.json(tasks)

  } catch (error) {
    console.error("Error in filtering tasks :",error)
    res.status(500).json({error:"Error in filtering tasks"})
  }
}
 


