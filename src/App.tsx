import React from 'react';
import './App.css';
import { DoctorPage, PatientPage } from './components/pages';
import useTelegram from './hooks/useTelegram';

function App() {
  const isDoctor = true; // todo убрать, тут нет никаких докторов
  return (
    <div className="App">
      <IsTelegramApp>
        <Bar />
        {isDoctor
          ? <DoctorPage />
          : <PatientPage />
        }
      </IsTelegramApp>
    </div>
  );
}

export default App;

const IsTelegramApp: React.FC<{
  children: React.ReactNode
}> = (props) => {

  const { isInTelegram } = useTelegram();

  const text = `
    Данные аккаунта Telegram не были получены. 
    Возможно приложение запущено не через Telegram \n
    **Для открытия приложения необходимо использовать inline_keyboard,
    вместо пользовательской клавиатуры**
  `
  return (
    <>
      {!isInTelegram()
        ? <ErrorPage text={text} />
        : props.children
      }
    </>
  )
}


const ErrorPage: React.FC<{ text: string }> = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Ошибка!!!</h1>
      <hr />
      <p>{props.text}</p>
    </div>
  )
}

const Bar: React.FC = () => {
  const { username } = useTelegram();
  return <h3 className='hint'>{`Результаты пользователя: '${username}'`}</h3>
}