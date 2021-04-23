import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

import Color from "./Color";
import EditMenu from "./EditMenu";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then( res => {
        console.log(res.data);
        const updatedColors = colors.map( item => {
          if (item.id === colorToEdit.id) {
            return res.data;
          } else {
            return item;
          }
        });
        console.log(updatedColors);
        updateColors(updatedColors);
        console.log(colors);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const deleteColor = color => {
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.