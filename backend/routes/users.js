const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateAvatar,
  updateInfo,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
  }),
}), updateAvatar);

module.exports = router;
