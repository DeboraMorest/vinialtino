import editVini from '../assets/editVini.mp4';
import coracao from '../assets/coracao.png';
import './Video.css';

function Video() {
  return (
    <section className="videoPage">
      <div className="videoLayout">
        <video
          className="videoStyle"
          src={editVini}
          controls
          poster={coracao}
        ></video>
      </div>
    </section>
  );
}
export default Video;
