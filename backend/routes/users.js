const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers, getCurrentUser, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }).unknown(true),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/^https?:\/\/(www\.)*([a-z\d\-]+\.[a-z]+)(\/?\w+)+/),
  }),
}), updateUserAvatar);

module.exports = router;
