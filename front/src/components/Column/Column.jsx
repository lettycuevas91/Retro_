import React, { useState } from 'react'
import styles from './Column.module.css'
import Card from '../Card/Card'
import InputCard from '../Inputcard/Inputcard'
import { BlockPicker } from 'react-color'

const Column = ({ category, posts, color, setColor }) => {
  const [toggleInputCard, setToggleInputCard] = useState(false)
  const [colorPicker, setColorPicker] = useState(false)

  const colorsPalette = ['#0fadd4', '#F47375', '#697679', '#37D57A', '#2CCCE4', '#555555', '#DA627D', '#ff8a65', '#ba68c8',]

  const title =
    category === 'wentWell'
      ? 'Went Well'
      : category === 'toImprove'
      ? 'To Improve'
      : 'Action Items'

  const handleAddClick = () => {
    setToggleInputCard(toggleInputCard ? false : true)
  }

  const toggleColorPicker = () => {
    setColorPicker(colorPicker ? false : true)
  }

  const handleColorChange = (color) => {
    setColor(color.hex)
    setColorPicker(false)
  }

  return (
    <div className={styles.column}>
      <div className={styles['column-header']}>
        <div className={styles['colorPicker-container']}>
          <h2>{title}</h2>
          <div
            className={styles.colorPicker}
            style={{ backgroundColor: color }}
            onClick={toggleColorPicker}
          >
            {colorPicker && (
              <div className={styles.colorPickerBlock}>
                <BlockPicker
                  onChangeComplete={handleColorChange}
                  colors={colorsPalette}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={styles.addButton}
          onClick={handleAddClick}
          style={{ backgroundColor: color }}
        >
          <span className="material-symbols-outlined">Agregar</span>
        </div>
      </div>
      {toggleInputCard && (
        //actions are comment or create
        <InputCard
          action="create"
          category={category}
          toggleInputCard={toggleInputCard}
          setToggleInputCard={setToggleInputCard}
          color={color}
        />
      )}
      {posts[category]?.map((post, index) => (
        <Card
          key={`${category}-${index}`}
          content={post.content}
          id={post._id}
          likes={post.likes}
          color={color}
          comments={post.comments}
        />
      ))}
    </div>
  )
}

export default Column