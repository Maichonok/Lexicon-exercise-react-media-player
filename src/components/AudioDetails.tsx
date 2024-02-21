import "./AudioDetails.css";

type Props = {
  title: string;
  author: string;
  thumbnail: string;
};
export const AudioDetails = ({ title, author, thumbnail }: Props) => {
  return (
    <div className="wrapper">
      <div className="container">
        <img
          src={thumbnail}
          alt=""
          width="150"
          height="150"
          className="image"
        />

        <div className="content">
          <p className="title">{title}</p>

          <p className="author">{author}</p>
        </div>
      </div>
    </div>
  );
};
