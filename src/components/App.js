import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProctectedRoute from './ProtectedRoute';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import apiAuth from '../utils/AuthApi';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isLoggenedIn, setIsLoggenedIn] = useState(false);
  const [isRegisterStatus, setIsRegisterStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [cards, setCards] = useState([]);
  const [selectCard, setSelectCard] = useState(null);
  /*   Для попапа подтверждения удаления карточки */
  const [cardDelete, setCardDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsloading] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardPopupClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  function handleImgPopupClick(card) {
    setSelectCard(card);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectCard(null);
  }

  /* возвращение значения кнопки сабмита */
  function handleSubmitButtonChange() {
    setIsloading(true);
  }

  /*лайк/дизлайк */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => c._id === card._id ? newCard : c)
          })
        }
        )
        .catch((err) => console.log(`Ошибка постановки лайка ${err}`))
    } else {
      api.dislikeCard(card)
        .then((newCard) => {
          setCards((state) => { return state.map((c) => c._id === card._id ? newCard : c) })
        })
        .catch((err) => console.log(`Ошибка удаления лайка ${err}`))
    }
  }

  /*функция удаления карточки */
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          setCards((cards) => { return cards.filter((c) => c._id !== card._id) })
          closeAllPopup();
        })
        .catch((err) => console.log(`Ошибка удаления карточки ${err}`))
        .finally(() => setIsloading(false))
    }
  }

  /*обновление данных пользователя */
  function handleUpdateUser(data) {
    api.setUserInfoApi(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка сохранения информации о пользователе ${err}`))
      .finally(() => setIsloading(false))
  }

  /* обновление аватара */
  function handleUpdateAvatar(link) {
    api.sendUserAvatar(link)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка изменения аватара: ${err}`))
      .finally(() => setIsloading(false))
  }

  function handleAddPlace(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(`Ошибка создания карточки ${err}`))
      .finally(() => setIsloading(false))
  }

  /*регистрация и присвоение данных пользователю*/
  function handleRegister(dataRegister) {
    apiAuth.register(dataRegister).then((res) => {
      if (res) {
        navigate("/sign-in");
        setIsInfoTooltip(true);
        setIsRegisterStatus(true);
      }
    })
      .catch(err => {
        console.log(`Ошибка регистрации пользователя ${err}`);
        setIsInfoTooltip(true);
        setIsRegisterStatus(false);
      })
  }

  /*авторизация*/
  function handleLogin(dataLogin) {
    apiAuth.login(dataLogin).then(() => {
      setIsLoggenedIn(true)
      navigate("/");
      setUserEmail(dataLogin.email);
    })
      .catch(err => {
        console.log(`Ошибка авторизации пользователя ${err}`)
        setIsInfoTooltip(true);
        setIsRegisterStatus(false);
      })
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      if(jwt) {
        apiAuth.getContent(jwt)
        .then((res) => {
          if(res) {
            setIsLoggenedIn(true);
            setUserEmail(res.data.email);
            navigate("/", {replace: true});
          }
        })
        .catch((err) => console.log("Ошибка проверки токена:", err))
      }
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate("/sign-in", {replace: true});
  }

  /*получение карточек с сервера*/
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка подрузки карточек: ${err}`)
      })
  }, [])

  /*реализация закрытия попапа через esc */
  useEffect(() => {
    function handleEscClosePopup(evt) {
      if (evt.key === 'Escape') {
        closeAllPopup();
      }
    }
    document.addEventListener('keydown', handleEscClosePopup);
    return () => {
      document.removeEventListener('keydown', handleEscClosePopup);
    }
  })

  /*реализация закрытия попапа через оверлей */
  useEffect(() => {
    function handleCloseOverlayPopup(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopup();
      }
    }
    document.addEventListener('click', handleCloseOverlayPopup);
    return () => {
      document.removeEventListener('click', handleCloseOverlayPopup);
    }
  })

  /*получение данных о пользователе */
  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка подрузки данных пользователя: ${err}`)
      })
  }, [])


  /*проверка токена*/
  useEffect(() => {
    tokenCheck();
  }, [isLoggenedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>


      <div className="page">
        <Routes>
          <Route path="/sign-in" element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login onLogin={handleLogin} />
              <InfoTooltip isOpen={isInfoTooltip}
                isSuccess={isRegisterStatus}
                onClose={closeAllPopup}
              />
            </>
          } />

          <Route path='/sign-up' element={
            <>
              <Header title="Вход" route="/sign-in" />
              <Register onRegister={handleRegister} />
              <InfoTooltip isOpen={isInfoTooltip}
                isSuccess={isRegisterStatus}
                onClose={closeAllPopup}
              />

            </>
          } />

          <Route path='/' element={
            <>
              <Header title="Выйти" 
                      route="/sign-in"
                      onClick={signOut}
                      email={userEmail}
              />
              <ProctectedRoute path="/" isLogged={isLoggenedIn} component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleImgPopupClick}
                onDeleteClick={handleDeleteCardPopupClick}
                onCardLike={handleCardLike}
              />
              <Footer />

              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopup}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
                onButton={handleSubmitButtonChange}
              />

              <AddPlacePopup isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopup}
                onAddPlace={handleAddPlace}
                isLoading={isLoading}
                onButton={handleSubmitButtonChange} />

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopup}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
                onButton={handleSubmitButtonChange}
              />

              <DeleteCardPopup isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopup}
                onCardDelete={handleCardDelete}
                card={cardDelete}
                onCardClick={handleDeleteCardPopupClick}
                isLoading={isLoading}
                onButton={handleSubmitButtonChange}
              />

              <ImagePopup name={"image"}
                card={selectCard}
                onClose={closeAllPopup}
              />
{/* 
              <InfoTooltip
                isOpen={isInfoTooltip}
                isSuccess={isRegisterStatus}
                onClose={closeAllPopup}
              /> */}
            </>
          }
          />

        </Routes>
      </div>

      <script type="module" src="./index.js"></script>


    </CurrentUserContext.Provider>
  );
}

export default App;