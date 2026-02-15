const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const {v4:uuid} = require('uuid')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const mongoose = require('mongoose')
const {shareModel} = require('../models/share.model')


const createFood = async (req, res) => {
    const {name, description} = req.body
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name,
        description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id 
    })
    res.status(201).json({
        message:"food created successfully",
        food: foodItem
    })
}

const getFoodItems = async (req, res) => {
  const userId = req.user?._id;
  const foods = await foodModel.find({}).sort({ createdAt: -1 }).lean();

  const foodIds = foods.map((f) => f._id);

  const [likeCounts, userLikes] = await Promise.all([
    likeModel.aggregate([
      { $match: { food: { $in: foodIds } } },
      { $group: { _id: '$food', count: { $sum: 1 } } }
    ]),
    userId
      ? likeModel.find({ user: userId, food: { $in: foodIds } }).select('food').lean()
      : []
  ]);

  const countMap = new Map(likeCounts.map((x) => [String(x._id), x.count]));
  const likedSet = new Set((userLikes || []).map((x) => String(x.food)));

  const foodItem = foods.map((f) => ({
    ...f,
    likeCount: countMap.get(String(f._id)) || 0,
    isLiked: likedSet.has(String(f._id))
  }));

  return res.status(200).json({ foodItem });
};

const foodLike = async(req, res) => {
    const {foodId} = req.body
    const user = req.user

    const isFoodLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isFoodLiked){
        await likeModel.deleteOne({
            user:user._id,
            food: foodId
        })
        
        const realCount = await likeModel.countDocuments({ food: foodId });

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: realCount }
        }, {new:true})

        return res.status(200).json({
            message:"Food unliked sucessfully",
            isLiked:false,
            likeCount: Number(updatedFood?.likeCount?? 0),
            foodItem:updatedFood
        })
    }

    await likeModel.create({
        user:user._id,
        food: foodId
    })

    const realCount = await likeModel.countDocuments({ food: foodId });
    const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: realCount }
    }, {new: true})

    return res.status(200).json({
        message:"Food liked sucessfully",
        isLiked:true,
        likeCount: Number(updatedFood?.likeCount?? 0),
        foodItem:updatedFood
    })
}

const foodSave = async (req, res) => {
  try {
    const { foodId } = req.body
    const user = req.user

    if (!foodId || !mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: 'Invalid foodId' })
    }

    const existing = await saveModel.findOne({ user: user._id, food: foodId })

    // if already saved -> unsave
    if (existing) {
      await saveModel.deleteOne({ _id: existing._id })
      const foodItem = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { saveCount: -1 } },
        { new: true }
      );
      return res.status(200).json({
        message: 'Food unsaved successfully',
        isSaved: false,
        saveCount: Math.max(0, foodItem?.saveCount || 0),
        foodItem,
      });
    }

    // if not saved -> save
    await saveModel.create({ user: user._id, food: foodId })
    const foodItem = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { saveCount: 1 } },
      { new: true }
    );

    return res.status(200).json({
      message: 'Food saved successfully',
      isSaved: true,
      saveCount: foodItem?.saveCount || 0,
      foodItem,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

const shareFood = async (req, res) =>{
    try{
        const userId = req.user._id
        const {foodId, platform} = req.body

        if (!foodId || !mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ message: 'Invalid foodId' })
        }

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const food = await foodModel.findById(foodId)
        if (!food){
            return res.status(400).json({
                message:"Video not found"

            })
        }

        try {
            await shareModel.create({
                user: userId,
                food: foodId,
                platform: platform || 'copylink',
            });
        } catch (err) {
            if (err.code !== 11000) throw err
        }


        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { shareCount: 1 } },
            { new: true, runValidators: false }
        )

        return res.status(200).json({
        message: 'Reel shared successfully',
        shareCount: updatedFood?.shareCount || 0,
        foodItem: updatedFood,
        });



    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createFood,
    getFoodItems,
    foodLike,
    foodSave,
    shareFood,
}