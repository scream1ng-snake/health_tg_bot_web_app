import React from 'react';
import './App.css';
import { DoctorPage, PatientPage } from './components/pages';
import useTelegram from './hooks/useTelegram';

function App() {
  const isDoctor = true;
  return (
    <div className="App">
      <IsTelegramApp>
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

   const { queryId = true, user = true } = useTelegram();
   // const { queryId, user } = useTelegram(); todo

  const text = `
    Данные аккаунта Telegram не были получены. 
    Возможно приложение запущено не через Telegram
  `
  return(
    <>
      {!user || !queryId
        ? <ErrorPage text={text} />
        : props.children
      }
    </>
  )
}


const ErrorPage: React.FC<{ text: string }> = (props) => {
  return(
    <div style={{ textAlign: 'center' }}>
      <h1>Ошибка!!!</h1>
      <hr />
      <p>{props.text}</p>
    </div>
  )
}