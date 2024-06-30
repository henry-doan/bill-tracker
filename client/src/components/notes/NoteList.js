import { CommentGroup } from "semantic-ui-react";

import NoteItem from "./NoteItem";

const NoteList = ({ notes}) => (
  <CommentGroup>
    { notes.map( n => 
      <NoteItem
        {...n}
      />
    )}   
  </CommentGroup>
)

export default NoteList;