import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';

function App() {

  const [isEditProfileActive, setEditProfileActive] = React.useState(false);
  const [isAddPlaceActive, setAddPlaceActive] = React.useState(false);
  const [isUpdateAvatarActive, setUpdateAvatarActive] = React.useState(false);
  const [isConfirmDeleteActive, setConfirmDeleteActive] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipActive, setInfoTooltipActive] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  

  // проверка токена, авторизация и регистрация

  const handleLogin = ({email, password}) => {
    return auth.authorize({email, password})
    .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
          if (data.token) {
            setLoggedIn(true)
            localStorage.setItem('jwt', data.token)
            history.push('/cards')
            return data
        }
    })
};

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
        let jwt = localStorage.getItem('jwt');
        auth.getContent(jwt)
        .then((res) => {
            if (res) {
                setLoggedIn(true)
                setEmail(res.data.email)
                history.push('/')
                return res
            }
        })
        .catch((err) => console.log(err));
    }
};

  const handleRegister = ({email, password}) => {
      return auth.register({email, password})
      .then((res) => {
          if (res) {
              setIsRegistered(true)
              setInfoTooltipActive(true)
              history.push('/')
              return res
          }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false)
        setInfoTooltipActive(true)
      });  
  };

  React.useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [history, loggedIn])

  // загрузка карточек и данных о пользоватете

  React.useEffect(() => {
    if (loggedIn) {
      let token = localStorage.getItem('jwt');
      console.log(token);
      Promise.all([api.getUserData(token), api.getInitialCards(token)])
      .then(([myData, initialCards]) => {
        console.log(myData);
        setCurrentUser(myData);
        if (Array.isArray(initialCards)) {
          setCards(initialCards);
        }
      })
      .catch((err) => console.log(err));
    }    
    }, [loggedIn]);

// закрытие попапов по нажатию на Esc

React.useEffect(() => {
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closePopups();
    }
  }

  document.addEventListener('keydown', handleEscClose);

  return () => {
    document.removeEventListener('keydown', handleEscClose);
  }
}, []);


// обработчики кликов

function handleEditProfileClick() {
  setEditProfileActive(true)
};

function handleAddPlaceClick() {
  setAddPlaceActive(true)
};

function handleEditAvatarClick() {
  setUpdateAvatarActive(true)
};

function handleCardClick(card) {
    setSelectedCard(card)
};

// лайк карточки 

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i === currentUser._id);
  
  if (isLiked) {
    api.removeLikeCard(card._id)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  } else {
    api.addLikeCard(card._id)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }
} 

// удаление карточки

function handleCardDelete() {
    api.deleteCard(deletedCard._id)
    .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== deletedCard._id));
        closePopups()
    })
    .catch((err) => console.log(err));
} 

function handleConfirmDelete(card) {
  setConfirmDeleteActive(true)
  setDeletedCard(card)
};

// добавление карточки

function handleAddPlaceSubmit(place) {
  api.addCard(place)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closePopups()
  })
  .catch((err) => {
    console.log(err)
  });
}

// обновление информации о пользователе

function handleUpdateUser(user) {

  api.changeUserData(user)
  .then((data) => {
    setCurrentUser(data);
    closePopups()
  })
  .catch((err) => {
    console.log(err);
  });
}

function handleUpdateAvatar(user) {
  api.editAvatar(user)
  .then((data) => {
    setCurrentUser(data);
    closePopups()
  })
  .catch((err) => {
    console.log(err);
  });
}

// закрытие попапов

function closePopups() {
  setEditProfileActive(false)
  setAddPlaceActive(false)
  setUpdateAvatarActive(false)
  setConfirmDeleteActive(false)
  setSelectedCard(null)
  setInfoTooltipActive(false)
};

  return (
   
      <CurrentUserContext.Provider value={currentUser}>
        <Header
        email={email}>
        </Header>
        <Switch>
            <ProtectedRoute
                exact path="/"
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDelete}>
            </ProtectedRoute>
            <Route
                path="/signup">
                    <Register onRegister={handleRegister}/>
            </Route>
            <Route
                path="/signin">
                    <Login onLogin={handleLogin}/>
            </Route>
            <Route>
            {loggedIn ? <Redirect to="/users/me" /> : <Redirect to="/signin" />}
            </Route>
        </Switch>
            <EditProfilePopup 
            isOpen={isEditProfileActive} 
            onClose={closePopups}
            onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>
        <AddPlacePopup 
            isOpen={isAddPlaceActive} 
            onClose={closePopups}
            onAddPlace={handleAddPlaceSubmit}>
        </AddPlacePopup>
        <EditAvatarPopup 
            isOpen={isUpdateAvatarActive}
            onClose={closePopups}
            onUpdateAvatar={handleUpdateAvatar}>
        </EditAvatarPopup>
        <ImagePopup 
            card={selectedCard}
            onClose={closePopups}>
        </ImagePopup> 
        <ConfirmPopup
            isOpen={isConfirmDeleteActive}
            onClose={closePopups}
            onConfirmDetete={handleCardDelete}>
        </ConfirmPopup>
        <InfoTooltip 
        isOpen={isInfoTooltipActive} 
        onClose={closePopups} 
        isRegistered={isRegistered} 
        />
        <Footer />
        </CurrentUserContext.Provider>
  )
};

export default App;