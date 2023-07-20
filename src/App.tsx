import React from 'react';
import './App.css';
import { DoctorPage, PatientPage } from './components/pages';
import { useStore } from './hooks';
import useTelegram from './hooks/useTelegram';
import { StoreProvider } from './store/StoreProvider';

function App() {
  return (
    <div className="App">
      <IsTelegramApp>
        <StoreProvider>
          <IsDoctorPage />
        </StoreProvider>
      </IsTelegramApp>
    </div>
  );
}

export default App;

const IsDoctorPage: React.FC = () => {
  const { isDoctor } = useStore();
  if(isDoctor) {
    return <DoctorPage />
  } else {
    return <PatientPage />
  }
}

const IsTelegramApp: React.FC<{
  children: React.ReactNode
}> = (props) => {

  const { isInTelegram } = useTelegram();

  // const text = `
  //   Данные аккаунта Telegram не были получены. 
  //   Возможно приложение запущено не через Telegram \n
  //   **Для открытия приложения необходимо использовать inline_keyboard,
  //   вместо пользовательской клавиатуры**
  // `
  return (
    <>
      {!isInTelegram()
        ? props.children //<ErrorPage text={text} />
        : props.children
      }
    </>
  )
}


// const ErrorPage: React.FC<{ text: string }> = (props) => {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1>Ошибка!!!</h1>
//       <hr />
//       <p>{props.text}</p>
//     </div>
//   )
// }

