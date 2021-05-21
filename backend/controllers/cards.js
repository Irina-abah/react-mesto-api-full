const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const RESPONSE_OK = 200;

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(RESPONSE_OK).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .populate('likes');
      res.status(RESPONSE_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Не удалось создать карточку');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new Error('NotFound'))
    .then((card) => {
      if (card) {
        return res.status(RESPONSE_OK).send({ message: 'Карточка была успешно удалена' });
      }
      if (!card.owner.equals(req.user._id)) {
        throw new BadRequestError('У Вас нет доступа к управлению чужими карточками');
      }
      return card;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Не удалось найти и удалить карточку');
      } if (err.message === 'NotFound') {
        throw new NotFoundError('Не удалось найти карточку');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => res.status(RESPONSE_OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Не удалось поставить лайк карточке');
      } if (err.message === 'NotFound') {
        throw new NotFoundError('Не удалось найти карточку');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => res.status(RESPONSE_OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Не удалось убрать лайк с карточки');
      } if (err.message === 'NotFound') {
        throw new NotFoundError('Не удалось найти карточку');
      }
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
