export const ErrorChart: React.FC<{
  text: string
}> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      height: '100%',
      zIndex: 100,
      background: 'rgba(125,125,125,0.1)'
    }}
  >
    <h1>{text}</h1>
  </div>
)

export const NotEnoughtData: React.FC = () => 
  <ErrorChart text="Недостаточно данных для посторения графика" />

export const FailedRequest: React.FC = () =>
  <ErrorChart text="Что-то пошло не так(( Не удалось выполнить запрос" />