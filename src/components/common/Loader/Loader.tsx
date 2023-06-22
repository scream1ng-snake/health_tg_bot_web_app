import './Loader.css';
interface LoaderProps {
  isLoad: boolean
}

export const LoaderFullscreen: React.FC<LoaderProps> = ({ isLoad }) =>
  !isLoad
    ? null
    : <div className="rotatingBackground">
      {!isLoad
        ? null
        : <img
          src="./Loader.png"
          alt="Loading..."
          className="rotating fixed"
        />
      }
    </div>
export const LoaderChart: React.FC<LoaderProps> = ({ isLoad }) =>
  !isLoad
    ? null
    : <div className="rotatingInChart">
      <Loader isLoad={isLoad} />
    </div>

export const Loader: React.FC<LoaderProps> = ({ isLoad }) =>
  !isLoad
    ? null
    : <img
      src="./Loader.png"
      alt="Loading..."
      className="rotating"
    />