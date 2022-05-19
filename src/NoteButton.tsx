import { FC } from "react";

type NoteButtonProps = {
  note: any;
  isActive: any;
};
const NoteButton: FC<NoteButtonProps> = ({ note, isActive, ...rest }) => {
  const classes = isActive ? "note note--active" : "note";
  return (
    <>
      <button className={classes} {...rest}></button>
    </>
  );
};

export default NoteButton;
